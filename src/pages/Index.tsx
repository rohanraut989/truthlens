import { Shield } from "lucide-react";
import { InputSection } from "@/components/InputSection";
import { ResultsSection } from "@/components/ResultsSection";
import { EducationalTips } from "@/components/EducationalTips";
import { HistoryPanel } from "@/components/HistoryPanel";
import { useAnalysis } from "@/hooks/useAnalysis";
import { useAnalysisHistory, HistoryEntry } from "@/hooks/useAnalysisHistory";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useEffect, useRef } from "react";

const Index = () => {
  const { analyze, isLoading, result, error, reset, setResult } = useAnalysis();
  const { history, saveAnalysis, deleteEntry, clearHistory } = useAnalysisHistory();
  const lastAnalyzedContent = useRef<{ content: string; type: "text" | "url" } | null>(null);

  // Auto-save analysis to history when result changes
  useEffect(() => {
    if (result && lastAnalyzedContent.current) {
      saveAnalysis(
        lastAnalyzedContent.current.content,
        lastAnalyzedContent.current.type,
        result
      );
      lastAnalyzedContent.current = null;
    }
  }, [result, saveAnalysis]);

  const handleAnalyze = (content: string, type: "text" | "url") => {
    lastAnalyzedContent.current = { content, type };
    analyze(content, type);
  };

  const handleSelectHistory = (entry: HistoryEntry) => {
    setResult(entry.result);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold">Crisis Verifier</h1>
              <p className="text-xs text-muted-foreground">Fact-check before you share</p>
            </div>
          </div>
          <HistoryPanel
            history={history}
            onSelect={handleSelectHistory}
            onDelete={deleteEntry}
            onClear={clearHistory}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-2xl space-y-8">
          {/* Hero Text */}
          {!result && (
            <div className="text-center">
              <h2 className="text-2xl font-bold sm:text-3xl">
                Verify Before You Share
              </h2>
              <p className="mt-2 text-muted-foreground">
                During crises, misinformation spreads fast. Use AI-powered analysis to check the credibility of news, posts, and claims.
              </p>
            </div>
          )}

          {/* Error Alert */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Input or Results */}
          {result ? (
            <ResultsSection result={result} onReset={reset} />
          ) : (
            <>
              <InputSection onAnalyze={handleAnalyze} isLoading={isLoading} />
              <EducationalTips />
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>This tool helps evaluate information credibility but doesn't censor content.</p>
          <p className="mt-1">Always verify with official sources during emergencies.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
