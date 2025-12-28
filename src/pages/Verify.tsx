import { Eye, Shield, Lock, Sparkles, ArrowLeft } from "lucide-react";
import { InputSection } from "@/components/InputSection";
import { ResultsSection } from "@/components/ResultsSection";
import { EducationalTips } from "@/components/EducationalTips";
import { HistoryPanel } from "@/components/HistoryPanel";
import { useAnalysis } from "@/hooks/useAnalysis";
import { useAnalysisHistory, HistoryEntry } from "@/hooks/useAnalysisHistory";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Verify = () => {
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
    <div className="min-h-screen bg-background gradient-mesh">
      {/* Header */}
      <header className="border-b border-border/30 bg-background/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Home</span>
            </Link>
            <div className="h-6 w-px bg-border/50" />
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                  <Eye className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="absolute -inset-1 rounded-xl bg-primary/30 blur-lg -z-10" />
              </div>
              <div>
                <h1 className="text-lg font-bold tracking-tight">TruthLens</h1>
                <p className="text-xs text-muted-foreground">Verify content</p>
              </div>
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
      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-2xl space-y-8">
          {/* Error Alert */}
          {error && (
            <Alert variant="destructive" className="animate-fade-in glass-card alert-calm border-l-destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Input or Results */}
          {result ? (
            <div className="animate-fade-in-up">
              <ResultsSection result={result} onReset={reset} />
            </div>
          ) : (
            <div className="space-y-8 animate-fade-in">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">Verify Content</h2>
                <p className="text-muted-foreground">
                  Paste text or enter a URL to analyze its credibility
                </p>
              </div>
              <InputSection onAnalyze={handleAnalyze} isLoading={isLoading} />
              <EducationalTips />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/30 bg-background/50 backdrop-blur-xl py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span className="text-xs">No Censorship</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                <span className="text-xs">AI Powered</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                <span className="text-xs">Privacy First</span>
              </div>
            </div>
            <div className="text-center text-sm text-muted-foreground max-w-md">
              <p>TruthLens does not censor content. It assists users in evaluating credibility.</p>
              <p className="mt-1 text-xs opacity-70">Always verify with official sources during emergencies.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Verify;
