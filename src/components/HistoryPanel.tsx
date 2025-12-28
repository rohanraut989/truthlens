import { HistoryEntry } from "@/hooks/useAnalysisHistory";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { History, Trash2, Clock, ExternalLink, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface HistoryPanelProps {
  history: HistoryEntry[];
  onSelect: (entry: HistoryEntry) => void;
  onDelete: (id: string) => void;
  onClear: () => void;
}

export function HistoryPanel({ history, onSelect, onDelete, onClear }: HistoryPanelProps) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "High":
        return "bg-success/20 text-success border-success/30";
      case "Medium":
        return "bg-warning/20 text-warning border-warning/30";
      case "Low":
        return "bg-destructive/20 text-destructive border-destructive/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative hover:bg-secondary/50">
          <History className="h-5 w-5" />
          {history.length > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-[10px] font-bold text-background">
              {history.length > 9 ? "9+" : history.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md border-border/30 bg-background/95 backdrop-blur-xl">
        <SheetHeader className="space-y-1">
          <SheetTitle className="flex items-center gap-2">
            <History className="h-5 w-5 text-muted-foreground" />
            Analysis History
          </SheetTitle>
          {history.length > 0 && (
            <p className="text-sm text-muted-foreground">
              {history.length} saved {history.length === 1 ? "analysis" : "analyses"}
            </p>
          )}
        </SheetHeader>

        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary/30">
              <Clock className="h-8 w-8 text-muted-foreground/50" />
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              No history yet. Analyzed content will appear here.
            </p>
          </div>
        ) : (
          <>
            <ScrollArea className="mt-6 h-[calc(100vh-220px)]">
              <div className="space-y-3 pr-4">
                {history.map((entry) => (
                  <div
                    key={entry.id}
                    className="group rounded-xl border border-border/30 bg-secondary/10 p-4 transition-all hover:bg-secondary/20 cursor-pointer"
                    onClick={() => onSelect(entry)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        {entry.contentType === "url" ? (
                          <ExternalLink className="h-3.5 w-3.5" />
                        ) : (
                          <FileText className="h-3.5 w-3.5" />
                        )}
                        <span>{formatDate(entry.createdAt)}</span>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={cn("text-xs font-semibold", getLevelColor(entry.result.credibilityLevel))}
                      >
                        {entry.result.credibilityScore}%
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm line-clamp-2 text-foreground/80">
                      {entry.contentPreview}
                    </p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="mt-2 h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-destructive/10"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(entry.id);
                      }}
                    >
                      <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="mt-4 border-t border-border/30 pt-4">
              <Button
                variant="outline"
                size="sm"
                className="w-full text-destructive hover:text-destructive hover:bg-destructive/10 border-border/30"
                onClick={onClear}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Clear All History
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}