import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AnalysisResult, WebSources } from "@/types/analysis";

export function useAnalysis() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyze = async (content: string, contentType: "text" | "url") => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      // Step 1: Get web verification from Perplexity
      let webSources: WebSources | undefined;
      try {
        const { data: perplexityData, error: perplexityError } = await supabase.functions.invoke("verify-with-perplexity", {
          body: { content, contentType },
        });

        if (!perplexityError && perplexityData && !perplexityData.error) {
          webSources = {
            citations: perplexityData.citations || [],
            searchSummary: perplexityData.searchSummary || "",
            verifiedAt: perplexityData.verifiedAt || new Date().toISOString(),
          };
        } else {
          console.warn("Perplexity verification failed:", perplexityError || perplexityData?.error);
        }
      } catch (perplexityErr) {
        console.warn("Perplexity verification error:", perplexityErr);
        // Continue without web sources if Perplexity fails
      }

      // Step 2: Get AI analysis from Gemini
      const { data, error: fnError } = await supabase.functions.invoke("analyze-content", {
        body: { content, contentType },
      });

      if (fnError) {
        throw new Error(fnError.message);
      }

      if (data.error) {
        throw new Error(data.error);
      }

      // Combine results
      const analysisResult: AnalysisResult = {
        ...data,
        webSources,
      };

      setResult(analysisResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to analyze content");
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
  };

  return { analyze, isLoading, result, error, reset, setResult };
}
