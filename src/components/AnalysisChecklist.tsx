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
    <div className="space-y-2">
      <h3 className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
        Analysis Checklist
      </h3>
      <div className="space-y-2">
        {items.map((item, index) => (
          <Collapsible
            key={index}
            open={openItems.has(index)}
            onOpenChange={() => toggleItem(index)}
          >
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border bg-card p-3 text-left transition-colors hover:bg-muted/50">
              <div className="flex items-center gap-3">
                {item.passed ? (
                  <CheckCircle2 className="h-5 w-5 text-success" />
                ) : (
                  <XCircle className="h-5 w-5 text-destructive" />
                )}
                <span className="font-medium">{item.label}</span>
              </div>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-muted-foreground transition-transform",
                  openItems.has(index) && "rotate-180"
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-11 py-2 text-sm text-muted-foreground">
              {item.details}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  );
}
