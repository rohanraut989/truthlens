export interface ChecklistResult {
  passed: boolean;
  details: string;
}

export interface AnalysisResult {
  credibilityScore: number;
  credibilityLevel: "High" | "Medium" | "Low";
  reasons: string[];
  criticalThinkingPrompt: string;
  sharingAdvice: string;
  checklistResults: {
    sourceCredibility: ChecklistResult;
    timeRelevance: ChecklistResult;
    languageAnalysis: ChecklistResult;
    evidenceVerification: ChecklistResult;
    crisisContext: ChecklistResult;
  };
}
