import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Link, Loader2, Eye } from "lucide-react";

interface InputSectionProps {
  onAnalyze: (content: string, type: "text" | "url") => void;
  isLoading: boolean;
}

const crisisTypes = [
  { value: "general", label: "General" },
  { value: "disaster", label: "Natural Disaster" },
  { value: "health", label: "Health Crisis" },
  { value: "political", label: "Political Event" },
  { value: "emergency", label: "Emergency" },
];

export function InputSection({ onAnalyze, isLoading }: InputSectionProps) {
  const [textContent, setTextContent] = useState("");
  const [urlContent, setUrlContent] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [crisisType, setCrisisType] = useState("general");
  const [activeTab, setActiveTab] = useState<"text" | "url">("text");

  const handleSubmit = () => {
    const content = activeTab === "text" ? textContent : urlContent;
    if (content.trim()) {
      onAnalyze(content.trim(), activeTab);
    }
  };

  const isDisabled = activeTab === "text" ? !textContent.trim() : !urlContent.trim();

  return (
    <div className="glass-card glow-border rounded-2xl p-6 space-y-5">
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "text" | "url")}>
        <TabsList className="grid w-full grid-cols-2 bg-secondary/30 border border-border/50">
          <TabsTrigger value="text" className="flex items-center gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-all duration-300">
            <FileText className="h-4 w-4" />
            Paste Text
          </TabsTrigger>
          <TabsTrigger value="url" className="flex items-center gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-all duration-300">
            <Link className="h-4 w-4" />
            Enter URL
          </TabsTrigger>
        </TabsList>

        <TabsContent value="text" className="mt-4 space-y-4">
          <Textarea
            placeholder="Paste the article, social media post, or claim you want to verify..."
            value={textContent}
            onChange={(e) => setTextContent(e.target.value)}
            className="min-h-[160px] resize-none bg-background/30 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300 placeholder:text-muted-foreground/50"
            disabled={isLoading}
          />
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Source URL (optional)</label>
            <Input
              type="url"
              placeholder="https://example.com/article"
              value={sourceUrl}
              onChange={(e) => setSourceUrl(e.target.value)}
              disabled={isLoading}
              className="bg-background/30 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
            />
          </div>
        </TabsContent>

        <TabsContent value="url" className="mt-4">
          <Input
            type="url"
            placeholder="https://example.com/article"
            value={urlContent}
            onChange={(e) => setUrlContent(e.target.value)}
            disabled={isLoading}
            className="bg-background/30 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
          />
          <p className="mt-2 text-sm text-muted-foreground">
            Enter the URL of the article or post you want to analyze
          </p>
        </TabsContent>
      </Tabs>

      {/* Crisis Type Selector */}
      <div className="space-y-2">
        <label className="text-sm text-muted-foreground">Crisis Type</label>
        <Select value={crisisType} onValueChange={setCrisisType} disabled={isLoading}>
          <SelectTrigger className="bg-background/30 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300">
            <SelectValue placeholder="Select crisis type" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border glass-card">
            {crisisTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={isDisabled || isLoading}
        className="w-full h-12 text-base font-semibold shimmer-button btn-glow btn-press transition-all duration-300"
        size="lg"
      >
        {isLoading ? (
          <div className="flex items-center gap-3">
            <div className="relative">
              <Loader2 className="h-5 w-5 animate-spin" />
              <div className="absolute inset-0 loading-pulse rounded-full" />
            </div>
            <span>Analyzing credibility...</span>
          </div>
        ) : (
          <>
            <Eye className="mr-2 h-5 w-5" />
            Verify Now
          </>
        )}
      </Button>
    </div>
  );
}
