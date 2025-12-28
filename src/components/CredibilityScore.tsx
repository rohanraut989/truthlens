import { cn } from "@/lib/utils";

interface CredibilityScoreProps {
  score: number;
  level: "High" | "Medium" | "Low";
}

export function CredibilityScore({ score, level }: CredibilityScoreProps) {
  const getColor = () => {
    if (level === "High") return "text-success";
    if (level === "Medium") return "text-warning";
    return "text-destructive";
  };

  const getStrokeColor = () => {
    if (level === "High") return "stroke-success";
    if (level === "Medium") return "stroke-warning";
    return "stroke-destructive";
  };

  const getGlowClass = () => {
    if (level === "High") return "glow-success";
    if (level === "Medium") return "glow-warning";
    return "glow-destructive";
  };

  const getBadgeColor = () => {
    if (level === "High") return "bg-success/20 text-success border border-success/30";
    if (level === "Medium") return "bg-warning/20 text-warning border border-warning/30";
    return "bg-destructive/20 text-destructive border border-destructive/30";
  };

  // SVG circle calculations
  const size = 180;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className={cn("glass-card glow-border rounded-2xl p-8 text-center transition-all duration-500", getGlowClass())}>
      <div className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
        Credibility Score
      </div>
      
      {/* Circular Score Indicator */}
      <div className="relative mx-auto" style={{ width: size, height: size }}>
        {/* Background circle */}
        <svg className="absolute inset-0 -rotate-90" width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-secondary/50"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            className={cn("score-ring-transition", getStrokeColor())}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: strokeDashoffset,
            }}
          />
        </svg>
        
        {/* Score text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("text-5xl font-bold transition-colors duration-500", getColor())}>{score}</span>
          <span className="text-sm text-muted-foreground">out of 100</span>
        </div>
      </div>

      {/* Credibility Badge */}
      <div
        className={cn(
          "mt-6 inline-flex items-center rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300",
          getBadgeColor()
        )}
      >
        {level} Credibility
      </div>
    </div>
  );
}
