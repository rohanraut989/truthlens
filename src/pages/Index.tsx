import { Eye, Shield, Lock, Sparkles, Zap, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
  return (
    <div className="min-h-screen bg-background gradient-mesh">
      {/* Header */}
      <header className="border-b border-border/30 bg-background/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                <Eye className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="absolute -inset-1 rounded-xl bg-primary/30 blur-lg -z-10" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">TruthLens</h1>
              <p className="text-xs text-muted-foreground">See the truth clearly</p>
            </div>
          </div>
          <Link to="/verify">
            <Button variant="outline" className="gap-2 btn-glow btn-press">
              Verify Now
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-2xl space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-6 animate-fade-in">
            {/* Logo Animation */}
            <div className="inline-flex items-center justify-center mb-4">
              <div className="relative">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary float">
                  <Eye className="h-10 w-10 text-primary-foreground" />
                </div>
                <div className="absolute -inset-2 rounded-2xl bg-primary/20 blur-2xl animate-glow-pulse" />
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
                  className="feature-card card-hover group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{feature.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Get Started Button */}
            <div className="pt-8">
              <Link to="/verify">
                <Button 
                  size="lg" 
                  className="shimmer-button btn-glow btn-press gap-3 text-lg px-8 py-6 h-auto font-semibold"
                >
                  Get Started
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
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
