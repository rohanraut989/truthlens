import { AnalysisResult } from "@/types/analysis";
import { CredibilityScore } from "./CredibilityScore";
import { AnalysisChecklist } from "./AnalysisChecklist";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, Info, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ResultsSectionProps {
  result: AnalysisResult;
  onReset: () => void;
}

export function ResultsSection({ result, onReset }: ResultsSectionProps) {
  const checklistItems = [
    {
      label: "Source Credibility",
      passed: result.checklistResults.sourceCredibility.passed,
      details: result.checklistResults.sourceCredibility.details,
    },
    {
      label: "Time Relevance",
      passed: result.checklistResults.timeRelevance.passed,
      details: result.checklistResults.timeRelevance.details,
    },
    {
      label: "Language Analysis",
      passed: result.checklistResults.languageAnalysis.passed,
      details: result.checklistResults.languageAnalysis.details,
    },
    {
      label: "Evidence & Verification",
      passed: result.checklistResults.evidenceVerification.passed,
      details: result.checklistResults.evidenceVerification.details,
    },
    {
      label: "Crisis Context",
      passed: result.checklistResults.crisisContext.passed,
      details: result.checklistResults.crisisContext.details,
    },
  ];

  const getSharingIcon = () => {
    if (result.sharingAdvice.includes("Safe")) return CheckCircle;
    if (result.sharingAdvice.includes("Avoid")) return AlertTriangle;
    return Info;
  };

  const getSharingStyles = () => {
    if (result.sharingAdvice.includes("Safe")) 
      return "bg-success/10 border-success/30 text-success glow-success";
    if (result.sharingAdvice.includes("Avoid")) 
      return "bg-destructive/10 border-destructive/30 text-destructive glow-destructive";
    return "bg-warning/10 border-warning/30 text-warning glow-warning";
  };

  const SharingIcon = getSharingIcon();

  return (
    <div className="space-y-6">
      {/* Credibility Score */}
      <CredibilityScore score={result.credibilityScore} level={result.credibilityLevel} />

      {/* Sharing Advice */}
      <div className={cn("flex items-center gap-4 rounded-xl border-2 p-5 transition-all", getSharingStyles())}>
        <SharingIcon className="h-6 w-6 flex-shrink-0" />
        <div>
          <div className="font-semibold text-base">Sharing Advice</div>
          <div className="text-sm opacity-90 mt-0.5">{result.sharingAdvice}</div>
        </div>
      </div>

      {/* Analysis Findings */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Info className="h-4 w-4 text-primary" />
            Why this score?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {result.reasons.map((reason, index) => (
              <li key={index} className="flex items-start gap-3 text-sm">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                <span className="text-muted-foreground">{reason}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Critical Thinking Prompt */}
      <div className="flex items-start gap-4 rounded-xl bg-primary/5 border border-primary/20 p-5">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <Lightbulb className="h-5 w-5 text-primary" />
        </div>
        <div>
          <div className="font-semibold text-primary">Think Before You Share</div>
          <p className="mt-1 text-sm text-muted-foreground">{result.criticalThinkingPrompt}</p>
        </div>
      </div>

      {/* Checklist */}
      <AnalysisChecklist items={checklistItems} />

      {/* Reset Button */}
      <Button 
        variant="outline" 
        onClick={onReset} 
        className="w-full h-12 border-border/50 hover:bg-secondary/50 transition-all"
      >
        Analyze Another Content
      </Button>
    </div>
  );
}