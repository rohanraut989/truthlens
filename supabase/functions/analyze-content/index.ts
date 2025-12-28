import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const systemPrompt = `You are a crisis-time fake news verification assistant.

Your task is to help users evaluate the credibility of online information WITHOUT censoring or deleting content.

Analyze the provided content using the following RULE-BASED checks:

1. Source Credibility
   - Is the source official, well-known, or verified?
   - Is the source missing, unclear, or anonymous?

2. Time Relevance
   - Is a clear date or time mentioned?
   - Could the information be outdated or recycled?

3. Language Analysis
   - Detect emotional, panic-inducing, or sensational language.
   - Look for excessive capitalization, urgent calls, or fear-based wording.

4. Evidence & Verification
   - Are official references, data, or confirmations mentioned?
   - Are claims vague or unsupported?

5. Crisis Context
   - Does the content relate to an ongoing crisis?
   - Could sharing this cause panic or misinformation?

---

### OUTPUT FORMAT (STRICT JSON):

Return ONLY valid JSON in this exact structure:

{
  "credibilityScore": <number between 0-100>,
  "credibilityLevel": "<High | Medium | Low>",
  "reasons": [
    "<reason 1>",
    "<reason 2>",
    "<reason 3>",
    "<reason 4>"
  ],
  "criticalThinkingPrompt": "<A short sentence encouraging the user to verify before sharing>",
  "sharingAdvice": "<Safe to share | Verify with official sources before sharing | Avoid sharing to prevent panic>",
  "checklistResults": {
    "sourceCredibility": { "passed": <boolean>, "details": "<brief explanation>" },
    "timeRelevance": { "passed": <boolean>, "details": "<brief explanation>" },
    "languageAnalysis": { "passed": <boolean>, "details": "<brief explanation>" },
    "evidenceVerification": { "passed": <boolean>, "details": "<brief explanation>" },
    "crisisContext": { "passed": <boolean>, "details": "<brief explanation>" }
  }
}

IMPORTANT: Return ONLY the JSON object, no markdown, no explanation, no code blocks.`;

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

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const userMessage = contentType === "url" 
      ? `Please analyze the credibility of content from this URL: ${content}\n\nNote: Analyze based on the URL structure, domain reputation, and any observable patterns.`
      : `Please analyze the credibility of the following content:\n\n${content}`;

    console.log("Analyzing content:", contentType, content.substring(0, 100));

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add funds to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content;

    if (!aiResponse) {
      throw new Error("No response from AI");
    }

    console.log("AI Response:", aiResponse);

    // Parse the JSON response
    let analysisResult;
    try {
      // Clean the response - remove any markdown code blocks if present
      const cleanedResponse = aiResponse
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      analysisResult = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      throw new Error("Failed to parse analysis result");
    }

    return new Response(
      JSON.stringify(analysisResult),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in analyze-content:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
