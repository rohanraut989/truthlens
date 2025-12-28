import { BookOpen, AlertCircle, Search, Clock, Users } from "lucide-react";

const tips = [
  {
    icon: Search,
    title: "Verify the Source",
    description: "Check if the information comes from a reputable, verified source. Look for official websites and established news organizations.",
  },
  {
    icon: Clock,
    title: "Check the Date",
    description: "Old news can be recycled during crises. Always verify when the information was originally published.",
  },
  {
    icon: AlertCircle,
    title: "Watch for Emotional Language",
    description: "Sensational headlines and panic-inducing language are red flags. Credible sources use measured, factual tones.",
  },
  {
    icon: Users,
    title: "Cross-Reference",
    description: "If a story is real, multiple credible sources will report it. One source alone isn't enough during a crisis.",
  },
];

export function EducationalTips() {
  return (
    <div className="glass-card glow-border rounded-2xl p-6">
      <h3 className="flex items-center gap-2 text-base font-semibold mb-4">
        <BookOpen className="h-4 w-4 text-primary" />
        Tips for Spotting Misinformation
      </h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {tips.map((tip, index) => (
          <div 
            key={index} 
            className="flex gap-3 p-3 rounded-xl bg-secondary/20 hover:bg-primary/10 transition-all duration-300 border border-border/30 hover:border-primary/30 card-hover"
          >
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <tip.icon className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-sm">{tip.title}</h4>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{tip.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
