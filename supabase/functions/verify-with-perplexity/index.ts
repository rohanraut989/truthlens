import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { content, contentType } = await req.json();

    if (!content) {
      return new Response(
        JSON.stringify({ error: "Content is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const PERPLEXITY_API_KEY = Deno.env.get("PERPLEXITY_API_KEY");
    if (!PERPLEXITY_API_KEY) {
      console.error("PERPLEXITY_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "Perplexity API key not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create a search query based on content type
    const searchQuery = contentType === "url"
      ? `Fact check and verify information from this source: ${content}. Find any fact-checks, news reports, or official statements about claims from this URL.`
      : `Fact check and verify the following claim or information: "${content.substring(0, 500)}". Find fact-checks, news reports, or official statements that confirm or debunk this.`;

    console.log("Perplexity search query:", searchQuery.substring(0, 100));

    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PERPLEXITY_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "sonar",
        messages: [
          {
            role: "system",
            content: "You are a fact-checking assistant. Search the web for relevant fact-checks, news reports, and official sources to verify the given claim or content. Be concise and factual. Focus on finding credible sources that either support or contradict the claim."
          },
          {
            role: "user",
            content: searchQuery
          }
        ],
        search_recency_filter: "month",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Perplexity API error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      throw new Error(`Perplexity API error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Perplexity response received");

    const searchSummary = data.choices?.[0]?.message?.content || "No verification results found.";
    const citations = data.citations || [];

    return new Response(
      JSON.stringify({
        searchSummary,
        citations,
        verifiedAt: new Date().toISOString(),
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in verify-with-perplexity:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
