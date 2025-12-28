import { CheckCircle2, XCircle, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

interface ChecklistItem {
  label: string;
  passed: boolean;
  details: string;
}

interface AnalysisChecklistProps {
  items: ChecklistItem[];
}

export function AnalysisChecklist({ items }: AnalysisChecklistProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newOpen = new Set(openItems);
    if (newOpen.has(index)) {
      newOpen.delete(index);
    } else {
      newOpen.add(index);
    }
    setOpenItems(newOpen);
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
        Analysis Checklist
      </h3>
      <div className="space-y-2">
        {items.map((item, index) => (
          <Collapsible
            key={index}
            open={openItems.has(index)}
            onOpenChange={() => toggleItem(index)}
          >
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-4 text-left transition-all hover:bg-secondary/30">
              <div className="flex items-center gap-3">
                {item.passed ? (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-success/10">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  </div>
                ) : (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-destructive/10">
                    <XCircle className="h-4 w-4 text-destructive" />
                  </div>
                )}
                <span className="font-medium text-sm">{item.label}</span>
              </div>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-muted-foreground transition-transform duration-200",
                  openItems.has(index) && "rotate-180"
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 py-3 text-sm text-muted-foreground ml-9">
              {item.details}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  );
}