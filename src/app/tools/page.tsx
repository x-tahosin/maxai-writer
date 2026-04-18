"use client";

import { useState, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TOOLS, FREE_USAGE_LIMIT, STORAGE_KEY } from "@/lib/tools";
import type { Tool } from "@/lib/tools";
import {
  FileText,
  Mail,
  Send,
  User,
  ShoppingBag,
  BookOpen,
  Loader2,
  Copy,
  Check,
  Zap,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  FileText,
  Mail,
  Send,
  User,
  ShoppingBag,
  BookOpen,
};

function getUsageCount(): number {
  if (typeof window === "undefined") return 0;
  return parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);
}

function incrementUsage(): number {
  const count = getUsageCount() + 1;
  localStorage.setItem(STORAGE_KEY, count.toString());
  return count;
}

function isProUser(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("maxai_pro") === "true";
}

export default function ToolsPage() {
  const [selectedTool, setSelectedTool] = useState<Tool>(TOOLS[0]);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [usageCount, setUsageCount] = useState(0);
  const [isPro, setIsPro] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setUsageCount(getUsageCount());
    setIsPro(isProUser());
  }, []);

  const handleToolChange = useCallback((tool: Tool) => {
    setSelectedTool(tool);
    setFormData({});
    setResult("");
    setError("");
  }, []);

  const handleGenerate = async () => {
    if (!isPro && usageCount >= FREE_USAGE_LIMIT) {
      setError("You've used all free generations. Upgrade to Pro for unlimited access!");
      return;
    }

    const missingRequired = selectedTool.fields
      .filter((f) => f.required)
      .find((f) => !formData[f.name]?.trim());

    if (missingRequired) {
      setError(`Please fill in: ${missingRequired.label}`);
      return;
    }

    setLoading(true);
    setError("");
    setResult("");

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) throw new Error("AI service not configured");

      const userMessage = Object.entries(formData)
        .filter(([, value]) => value)
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n");

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `${selectedTool.systemPrompt}\n\n---\n\nUser input:\n${userMessage}` }] }],
            generationConfig: { maxOutputTokens: 2000, temperature: 0.7 },
          }),
        }
      );

      if (!res.ok) throw new Error("AI generation failed. Please try again.");

      const data = await res.json();
      const content = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
      if (!content) throw new Error("No content generated");

      setResult(content);
      const newCount = incrementUsage();
      setUsageCount(newCount);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const remaining = Math.max(0, FREE_USAGE_LIMIT - usageCount);
  const Icon = ICON_MAP[selectedTool.icon];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden md:flex w-64 flex-col border-r border-border bg-surface/50 p-4 gap-1 overflow-y-auto">
          <div className="text-xs font-semibold text-muted uppercase tracking-wider mb-3 px-3">
            AI Tools
          </div>
          {TOOLS.map((tool) => {
            const ToolIcon = ICON_MAP[tool.icon];
            return (
              <button
                key={tool.id}
                onClick={() => handleToolChange(tool)}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-left transition-colors ${
                  selectedTool.id === tool.id
                    ? "bg-accent/10 text-accent-light"
                    : "text-muted hover:text-foreground hover:bg-surface-hover"
                }`}
              >
                {ToolIcon && <ToolIcon className="h-4 w-4 shrink-0" />}
                {tool.name}
              </button>
            );
          })}

          <div className="mt-auto pt-4 border-t border-border">
            {isPro ? (
              <div className="flex items-center gap-2 px-3 py-2 text-xs text-success">
                <Check className="h-3.5 w-3.5" />
                Pro Active
              </div>
            ) : (
              <div className="px-3">
                <div className="text-xs text-muted mb-2">
                  {remaining} / {FREE_USAGE_LIMIT} free uses left
                </div>
                <div className="h-1.5 rounded-full bg-border overflow-hidden mb-3">
                  <div
                    className="h-full rounded-full bg-accent transition-all"
                    style={{
                      width: `${(usageCount / FREE_USAGE_LIMIT) * 100}%`,
                    }}
                  />
                </div>
                <Link
                  href="/pro"
                  className="flex items-center justify-center gap-1.5 rounded-lg bg-accent/10 px-3 py-2 text-xs font-medium text-accent-light hover:bg-accent/20 transition-colors"
                >
                  <Zap className="h-3 w-3" />
                  Upgrade to Pro
                </Link>
              </div>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-3xl px-4 py-8">
            {/* Mobile tool selector */}
            <div className="md:hidden mb-6">
              <select
                value={selectedTool.id}
                onChange={(e) => {
                  const tool = TOOLS.find((t) => t.id === e.target.value);
                  if (tool) handleToolChange(tool);
                }}
                className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm"
              >
                {TOOLS.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Tool Header */}
            <div className="flex items-start gap-4 mb-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 shrink-0">
                {Icon && <Icon className="h-6 w-6 text-accent-light" />}
              </div>
              <div>
                <h1 className="text-xl font-bold">{selectedTool.name}</h1>
                <p className="text-sm text-muted mt-0.5">
                  {selectedTool.description}
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="space-y-5 mb-6">
              {selectedTool.fields.map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium mb-2">
                    {field.label}
                    {field.required && (
                      <span className="text-red-400 ml-1">*</span>
                    )}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      value={formData[field.name] || ""}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          [field.name]: e.target.value,
                        }))
                      }
                      placeholder={field.placeholder}
                      rows={4}
                      className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm placeholder:text-muted/60 focus:outline-none focus:border-accent/50 resize-none transition-colors"
                    />
                  ) : field.type === "select" ? (
                    <select
                      value={formData[field.name] || ""}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          [field.name]: e.target.value,
                        }))
                      }
                      className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm focus:outline-none focus:border-accent/50 transition-colors"
                    >
                      <option value="">{field.placeholder}</option>
                      {field.options?.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={formData[field.name] || ""}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          [field.name]: e.target.value,
                        }))
                      }
                      placeholder={field.placeholder}
                      className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm placeholder:text-muted/60 focus:outline-none focus:border-accent/50 transition-colors"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-400 mb-4">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
                {!isPro && usageCount >= FREE_USAGE_LIMIT && (
                  <Link
                    href="/pro"
                    className="ml-auto text-accent-light hover:underline text-xs font-medium"
                  >
                    Upgrade
                  </Link>
                )}
              </div>
            )}

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full rounded-xl bg-accent py-3.5 text-sm font-semibold text-white hover:bg-accent-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4" />
                  Generate
                </>
              )}
            </button>

            {/* Usage indicator (mobile) */}
            {!isPro && (
              <div className="md:hidden mt-3 text-center text-xs text-muted">
                {remaining} free generations remaining
              </div>
            )}

            {/* Result */}
            {result && (
              <div className="mt-8">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-semibold">Result</h2>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs text-muted hover:text-foreground hover:bg-surface transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-success" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <div className="rounded-xl border border-border bg-surface p-6 text-sm leading-relaxed whitespace-pre-wrap">
                  {result}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
