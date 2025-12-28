import { useState, useEffect, useCallback } from "react";
import { AnalysisResult } from "@/types/analysis";

export interface HistoryEntry {
  id: string;
  content: string;
  contentType: "text" | "url";
  contentPreview: string;
  result: AnalysisResult;
  createdAt: string;
}

const STORAGE_KEY = "crisis-verifier-history";
const MAX_ENTRIES = 50;

export function useAnalysisHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load history:", error);
    }
  }, []);

  // Save to localStorage whenever history changes
  const persistHistory = useCallback((entries: HistoryEntry[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch (error) {
      console.error("Failed to save history:", error);
    }
  }, []);

  const saveAnalysis = useCallback((
    content: string,
    contentType: "text" | "url",
    result: AnalysisResult
  ) => {
    const entry: HistoryEntry = {
      id: crypto.randomUUID(),
      content,
      contentType,
      contentPreview: content.slice(0, 100) + (content.length > 100 ? "..." : ""),
      result,
      createdAt: new Date().toISOString(),
    };

    setHistory((prev) => {
      const newHistory = [entry, ...prev].slice(0, MAX_ENTRIES);
      persistHistory(newHistory);
      return newHistory;
    });
  }, [persistHistory]);

  const deleteEntry = useCallback((id: string) => {
    setHistory((prev) => {
      const newHistory = prev.filter((entry) => entry.id !== id);
      persistHistory(newHistory);
      return newHistory;
    });
  }, [persistHistory]);

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    history,
    saveAnalysis,
    deleteEntry,
    clearHistory,
  };
}
