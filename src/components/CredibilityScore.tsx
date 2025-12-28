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

  const getBgColor = () => {
    if (level === "High") return "bg-success/10 border-success/30";
    if (level === "Medium") return "bg-warning/10 border-warning/30";
    return "bg-destructive/10 border-destructive/30";
  };

  const getProgressColor = () => {
    if (level === "High") return "bg-success";
    if (level === "Medium") return "bg-warning";
    return "bg-destructive";
  };

  return (
    <div className={cn("rounded-xl border-2 p-6 text-center", getBgColor())}>
      <div className="mb-2 text-sm font-medium uppercase tracking-wide text-muted-foreground">
        Credibility Score
      </div>
      <div className={cn("text-5xl font-bold", getColor())}>{score}</div>
      <div className="mt-2 text-sm text-muted-foreground">out of 100</div>

      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={cn("h-full transition-all duration-500", getProgressColor())}
          style={{ width: `${score}%` }}
        />
      </div>

      <div
        className={cn(
          "mt-4 inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold",
          level === "High" && "bg-success text-success-foreground",
          level === "Medium" && "bg-warning text-warning-foreground",
          level === "Low" && "bg-destructive text-destructive-foreground"
        )}
      >
        {level} Credibility
      </div>
    </div>
  );
}
