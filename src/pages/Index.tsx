import { Shield, ShieldCheck, Lock, Eye } from "lucide-react";
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
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary glow-primary">
                <ShieldCheck className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">Crisis News Credibility Checker</h1>
              <p className="text-xs text-muted-foreground">Verify information before sharing during emergencies</p>
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
      <main className="container mx-auto px-4 py-10">
        <div className="mx-auto max-w-2xl space-y-8">
          {/* Hero Text */}
          {!result && (
            <div className="text-center animate-fade-in">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Verify Before You Share
              </h2>
              <p className="mt-3 text-lg text-muted-foreground">
                During crises, misinformation spreads fast. Use AI-powered analysis to check the credibility of news, posts, and claims.
              </p>
            </div>
          )}

          {/* Error Alert */}
          {error && (
            <Alert variant="destructive" className="animate-fade-in">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Input or Results */}
          {result ? (
            <div className="animate-fade-in">
              <ResultsSection result={result} onReset={reset} />
            </div>
          ) : (
            <div className="space-y-8 animate-fade-in">
              <InputSection onAnalyze={handleAnalyze} isLoading={isLoading} />
              <EducationalTips />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30 py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span className="text-xs">No Censorship</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span className="text-xs">Transparency</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                <span className="text-xs">Privacy First</span>
              </div>
            </div>
            <div className="text-center text-sm text-muted-foreground max-w-md">
              <p>This tool does not censor content. It assists users in evaluating credibility.</p>
              <p className="mt-1">Always verify with official sources during emergencies.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;