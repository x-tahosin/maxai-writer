"use client";

import Link from "next/link";
import { Sparkles, Zap } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight">
            Max<span className="gradient-text">AI</span>
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/tools"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            Tools
          </Link>
          <Link
            href="/pro"
            className="flex items-center gap-1.5 rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent-light hover:bg-accent/20 transition-colors"
          >
            <Zap className="h-3.5 w-3.5" />
            Go Pro
          </Link>
        </nav>
      </div>
    </header>
  );
}
