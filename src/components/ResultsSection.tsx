import { AnalysisResult } from "@/types/analysis";
import { CredibilityScore } from "./CredibilityScore";
import { AnalysisChecklist } from "./AnalysisChecklist";
import { AlertTriangle, CheckCircle, Info, Lightbulb, RotateCcw, ExternalLink, Globe, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";

interface ResultsSectionProps {
  result: AnalysisResult;
  onReset: () => void;
}

export function ResultsSection({ result, onReset }: ResultsSectionProps) {
  const [sourcesOpen, setSourcesOpen] = useState(false);

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
      return "bg-success/10 border-l-4 border-l-success border-y border-r border-success/20 text-success";
    if (result.sharingAdvice.includes("Avoid")) 
      return "bg-destructive/10 border-l-4 border-l-destructive border-y border-r border-destructive/20 text-destructive";
    return "bg-warning/10 border-l-4 border-l-warning border-y border-r border-warning/20 text-warning";
  };

  const SharingIcon = getSharingIcon();

  const formatDomain = (url: string) => {
    try {
      const domain = new URL(url).hostname.replace('www.', '');
      return domain;
    } catch {
      return url;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="space-y-6">
      {/* Credibility Score */}
      <div className="animate-fade-in-up stagger-1">
        <CredibilityScore score={result.credibilityScore} level={result.credibilityLevel} />
      </div>

      {/* Sharing Advice */}
      <div className={cn("flex items-center gap-4 rounded-xl p-5 glass-card transition-all duration-300 animate-fade-in-up stagger-2", getSharingStyles())}>
        <SharingIcon className="h-6 w-6 flex-shrink-0" />
        <div>
          <div className="font-semibold text-base">Sharing Advice</div>
          <div className="text-sm opacity-90 mt-0.5">{result.sharingAdvice}</div>
        </div>
      </div>

      {/* Web Sources - Collapsible */}
      {result.webSources && result.webSources.citations.length > 0 && (
        <Collapsible open={sourcesOpen} onOpenChange={setSourcesOpen} className="animate-fade-in-up stagger-3">
          <CollapsibleTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between h-12 border-border/50 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span>View Sources ({result.webSources.citations.length})</span>
              </div>
              <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", sourcesOpen && "rotate-180")} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3">
            <div className="glass-card glow-border rounded-2xl p-5 space-y-4">
              {/* Search Summary */}
              <div className="text-sm text-muted-foreground">
                {result.webSources.searchSummary}
              </div>
              
              {/* Citation Links */}
              <div className="space-y-2">
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Sources</div>
                <ul className="space-y-2">
                  {result.webSources.citations.map((citation, index) => (
                    <li key={index}>
                      <a
                        href={citation}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 hover:underline transition-colors group"
                      >
                        <ExternalLink className="h-3 w-3 flex-shrink-0 opacity-60 group-hover:opacity-100" />
                        <span className="truncate">{formatDomain(citation)}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Verification Timestamp */}
              <div className="pt-2 border-t border-border/30">
                <div className="text-xs text-muted-foreground">
                  Verified: {formatDate(result.webSources.verifiedAt)}
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}

      {/* Analysis Findings */}
      <div className="glass-card glow-border rounded-2xl p-6 card-hover animate-fade-in-up stagger-3">
        <h3 className="flex items-center gap-2 text-base font-semibold mb-4">
          <Info className="h-4 w-4 text-primary" />
          Why this score?
        </h3>
        <ul className="space-y-3">
          {result.reasons.map((reason, index) => (
            <li key={index} className="flex items-start gap-3 text-sm">
              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/50" />
              <span className="text-muted-foreground">{reason}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Critical Thinking Prompt */}
      <div className="flex items-start gap-4 rounded-xl bg-primary/5 border border-primary/20 p-5 glass-card card-hover animate-fade-in-up stagger-4">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <Lightbulb className="h-5 w-5 text-primary" />
        </div>
        <div>
          <div className="font-semibold text-foreground">Think Before You Share</div>
          <p className="mt-1 text-sm text-muted-foreground">{result.criticalThinkingPrompt}</p>
        </div>
      </div>

      {/* Checklist */}
      <div className="animate-fade-in-up stagger-5">
        <AnalysisChecklist items={checklistItems} />
      </div>

      {/* Reset Button */}
      <Button 
        variant="outline" 
        onClick={onReset} 
        className="w-full h-12 border-border/50 hover:bg-primary/10 hover:text-primary hover:border-primary/30 btn-glow btn-press transition-all duration-300"
      >
        <RotateCcw className="mr-2 h-4 w-4" />
        Analyze Another Content
      </Button>
    </div>
  );
}
