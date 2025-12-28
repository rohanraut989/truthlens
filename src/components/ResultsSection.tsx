import { AnalysisResult } from "@/types/analysis";
import { CredibilityScore } from "./CredibilityScore";
import { AnalysisChecklist } from "./AnalysisChecklist";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, Info, Share2, Lightbulb } from "lucide-react";
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

  const getSharingColor = () => {
    if (result.sharingAdvice.includes("Safe")) return "bg-success/10 border-success/30 text-success";
    if (result.sharingAdvice.includes("Avoid")) return "bg-destructive/10 border-destructive/30 text-destructive";
    return "bg-warning/10 border-warning/30 text-warning";
  };

  const SharingIcon = getSharingIcon();

  return (
    <div className="space-y-6">
      <CredibilityScore score={result.credibilityScore} level={result.credibilityLevel} />

      {/* Sharing Advice */}
      <div className={cn("flex items-center gap-3 rounded-lg border-2 p-4", getSharingColor())}>
        <SharingIcon className="h-5 w-5 flex-shrink-0" />
        <div>
          <div className="font-semibold">Sharing Advice</div>
          <div className="text-sm opacity-90">{result.sharingAdvice}</div>
        </div>
      </div>

      {/* Reasons */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Info className="h-4 w-4" />
            Analysis Findings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {result.reasons.map((reason, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                {reason}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Critical Thinking Prompt */}
      <div className="flex items-start gap-3 rounded-lg bg-primary/5 border border-primary/20 p-4">
        <Lightbulb className="h-5 w-5 flex-shrink-0 text-primary mt-0.5" />
        <div>
          <div className="font-medium text-primary">Think Before You Share</div>
          <p className="mt-1 text-sm text-muted-foreground">{result.criticalThinkingPrompt}</p>
        </div>
      </div>

      {/* Checklist */}
      <AnalysisChecklist items={checklistItems} />

      {/* Reset Button */}
      <Button variant="outline" onClick={onReset} className="w-full">
        Analyze Another Content
      </Button>
    </div>
  );
}
