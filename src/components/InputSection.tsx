import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Link, Loader2, Search } from "lucide-react";

interface InputSectionProps {
  onAnalyze: (content: string, type: "text" | "url") => void;
  isLoading: boolean;
}

export function InputSection({ onAnalyze, isLoading }: InputSectionProps) {
  const [textContent, setTextContent] = useState("");
  const [urlContent, setUrlContent] = useState("");
  const [activeTab, setActiveTab] = useState<"text" | "url">("text");

  const handleSubmit = () => {
    const content = activeTab === "text" ? textContent : urlContent;
    if (content.trim()) {
      onAnalyze(content.trim(), activeTab);
    }
  };

  const isDisabled = activeTab === "text" ? !textContent.trim() : !urlContent.trim();

  return (
    <div className="w-full space-y-4">
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "text" | "url")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="text" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Paste Text
          </TabsTrigger>
          <TabsTrigger value="url" className="flex items-center gap-2">
            <Link className="h-4 w-4" />
            Enter URL
          </TabsTrigger>
        </TabsList>

        <TabsContent value="text" className="mt-4">
          <Textarea
            placeholder="Paste the article, social media post, or claim you want to verify..."
            value={textContent}
            onChange={(e) => setTextContent(e.target.value)}
            className="min-h-[160px] resize-none"
            disabled={isLoading}
          />
        </TabsContent>

        <TabsContent value="url" className="mt-4">
          <Input
            type="url"
            placeholder="https://example.com/article"
            value={urlContent}
            onChange={(e) => setUrlContent(e.target.value)}
            disabled={isLoading}
          />
          <p className="mt-2 text-sm text-muted-foreground">
            Enter the URL of the article or post you want to analyze
          </p>
        </TabsContent>
      </Tabs>

      <Button
        onClick={handleSubmit}
        disabled={isDisabled || isLoading}
        className="w-full"
        size="lg"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            <Search className="mr-2 h-4 w-4" />
            Verify Content
          </>
        )}
      </Button>
    </div>
  );
}
