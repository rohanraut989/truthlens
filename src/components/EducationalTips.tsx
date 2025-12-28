import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <BookOpen className="h-4 w-4 text-primary" />
          Tips for Spotting Misinformation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2">
          {tips.map((tip, index) => (
            <div key={index} className="flex gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
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
      </CardContent>
    </Card>
  );
}