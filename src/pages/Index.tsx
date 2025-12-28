import { Eye, Shield, Lock, Sparkles, Zap, ShieldCheck } from "lucide-react";
import { InputSection } from "@/components/InputSection";
import { ResultsSection } from "@/components/ResultsSection";
import { EducationalTips } from "@/components/EducationalTips";
import { HistoryPanel } from "@/components/HistoryPanel";
import { useAnalysis } from "@/hooks/useAnalysis";
import { useAnalysisHistory, HistoryEntry } from "@/hooks/useAnalysisHistory";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useEffect, useRef } from "react";

const features = [
  {
    icon: Zap,
    title: "Instant AI Analysis",
    description: "Get credibility insights in seconds with advanced AI processing",
  },
  {
    icon: ShieldCheck,
    title: "Crisis Ready",
    description: "Built for high-stakes verification during emergencies",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "Your data stays secure. No tracking, no storage",
  },
];

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
    <div className="min-h-screen bg-background gradient-mesh">
      {/* Header */}
      <header className="border-b border-border/30 bg-background/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground">
                <Eye className="h-5 w-5 text-background" />
              </div>
              <div className="absolute -inset-1 rounded-xl bg-foreground/20 blur-lg -z-10" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">TruthLens</h1>
              <p className="text-xs text-muted-foreground">See the truth clearly</p>
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
        <div className="mx-auto max-w-2xl space-y-12">
          {/* Hero Section */}
          {!result && (
            <div className="text-center space-y-6 animate-fade-in">
              {/* Logo Animation */}
              <div className="inline-flex items-center justify-center mb-4">
                <div className="relative">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-foreground float">
                    <Eye className="h-10 w-10 text-background" />
                  </div>
                  <div className="absolute -inset-2 rounded-2xl bg-foreground/10 blur-2xl animate-glow-pulse" />
                </div>
              </div>

              {/* Main Heading */}
              <div className="space-y-3">
                <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight gradient-text">
                  TruthLens
                </h2>
                <p className="text-xl text-muted-foreground">
                  See the truth clearly. Verify before you share.
                </p>
              </div>

              {/* Subtitle */}
              <p className="text-muted-foreground max-w-md mx-auto">
                During crises, misinformation spreads fast. Use AI-powered analysis to check the credibility of news, posts, and claims.
              </p>

              {/* Feature Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="feature-card group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex flex-col items-center text-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/50 group-hover:bg-secondary transition-colors">
                        <feature.icon className="h-6 w-6 text-foreground/80" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">{feature.title}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Error Alert */}
          {error && (
            <Alert variant="destructive" className="animate-fade-in glass-card">
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
            <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
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

export default Index;