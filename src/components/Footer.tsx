import { Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent">
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-base font-bold">
              Max<span className="gradient-text">AI</span> Writer
            </span>
          </div>
          <p className="text-sm text-muted max-w-md">
            Professional AI writing tools that help you create stunning content
            in seconds. Free to start, Pro for power users.
          </p>
          <div className="flex gap-6 text-xs text-muted mt-2">
            <span>&copy; {new Date().getFullYear()} MaxAI</span>
            <span>Built with AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
