"use client";

import { useState } from "react";
import {
  Zap,
  BookOpen,
  Wand2,
  PenTool,
  Copy,
  Check,
  Wallet,
  ArrowRight,
  Star,
  Download,
  Shield,
} from "lucide-react";

const BNB_WALLET = process.env.NEXT_PUBLIC_BNB_WALLET || "";

const PRODUCTS = [
  {
    id: "prompt-bible",
    name: "AI Prompt Engineering Bible",
    tagline: "500+ Professional Prompts — Copy, Paste, Profit",
    price: "$9.99",
    bnb: "0.016 BNB",
    icon: BookOpen,
    color: "from-amber-500 to-orange-600",
    features: [
      "500+ battle-tested prompts for ChatGPT, Claude & Gemini",
      "9 categories: Business, Marketing, SEO, Dev, Resume, Email, Social, Image, Creative",
      "Ready to copy-paste — no editing needed",
      "Works with ANY AI model",
      "Lifetime access + free updates",
    ],
    popular: true,
  },
  {
    id: "maxai-pro",
    name: "MaxAI Writer Pro",
    tagline: "6 AI Writing Tools — Unlimited Access",
    price: "$4.99",
    bnb: "0.008 BNB",
    icon: PenTool,
    color: "from-violet-500 to-purple-600",
    features: [
      "AI Resume Builder",
      "Cover Letter Generator",
      "Professional Email Writer",
      "LinkedIn Bio Optimizer",
      "Product Description Writer",
      "Blog Outline Generator",
    ],
    link: "https://maxai-writer-pro-tools.netlify.app/pro",
    popular: false,
  },
  {
    id: "promptcraft-pro",
    name: "PromptCraft AI Pro",
    tagline: "AI Image Prompt Generator — Unlimited",
    price: "$3.99",
    bnb: "0.006 BNB",
    icon: Wand2,
    color: "from-rose-500 to-pink-600",
    features: [
      "Unlimited prompt generation",
      "Optimized for Midjourney, DALL-E 3, Stable Diffusion, Flux",
      "15+ art styles & 10 moods",
      "Platform-specific formatting",
      "Lifetime access",
    ],
    link: "https://promptcraft-ai-gen.netlify.app",
    popular: false,
  },
];

const BUNDLE = {
  name: "Complete AI Power Bundle",
  tagline: "All 3 products at 40% off",
  originalPrice: "$18.97",
  price: "$11.99",
  bnb: "0.019 BNB",
};

export default function ShopPage() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [activated, setActivated] = useState(false);

  const handleCopyWallet = () => {
    navigator.clipboard.writeText(BNB_WALLET);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const [verifying, setVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState("");

  const handleActivate = async () => {
    if (!txHash.trim()) return;
    setVerifying(true);
    setVerifyError("");

    try {
      const res = await fetch("https://bsc-dataseed.binance.org/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "eth_getTransactionByHash",
          params: [txHash.trim()],
          id: 1,
        }),
      });
      const data = await res.json();
      const tx = data?.result;

      if (!tx || !tx.to) {
        setVerifyError("Transaction not found. Check your TX hash.");
        setVerifying(false);
        return;
      }

      if (tx.to.toLowerCase() !== BNB_WALLET.toLowerCase()) {
        setVerifyError("Payment sent to wrong address.");
        setVerifying(false);
        return;
      }

      const valueBNB = parseInt(tx.value, 16) / 1e18;
      const minBNB = selectedProduct === "bundle" ? 0.018 : 0.005;
      if (valueBNB < minBNB) {
        setVerifyError(`Only ${valueBNB.toFixed(4)} BNB received. Minimum: ${minBNB} BNB.`);
        setVerifying(false);
        return;
      }

      if (selectedProduct === "bundle") {
        localStorage.setItem("maxai_pro", "true");
        localStorage.setItem("pc_pro", "true");
        localStorage.setItem("prompt_bible", "true");
      } else if (selectedProduct) {
        localStorage.setItem(`${selectedProduct}_purchased`, "true");
      }
      localStorage.setItem("tx_hash", txHash);
      setActivated(true);
    } catch {
      setVerifyError("Verification failed. Try again.");
    }
    setVerifying(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="mx-auto max-w-6xl flex items-center justify-between h-14 px-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-lg">
              Max<span className="gradient-text">AI</span> Shop
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              Writer
            </a>
            <a
              href="https://promptcraft-ai-gen.netlify.app"
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              PromptCraft
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="hero-gradient">
          <div className="mx-auto max-w-4xl px-4 pt-20 pb-12 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 border border-accent/20 px-4 py-1.5 text-sm text-accent-light mb-6">
              <Star className="h-3.5 w-3.5" />
              Launch Special — Limited Time Pricing
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              AI Tools That <span className="gradient-text">Actually Work</span>
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Professional AI writing tools, image prompt generator, and 500+ curated prompts.
              One-time payment. No subscriptions. Crypto accepted.
            </p>
          </div>
        </section>

        {/* Bundle Deal */}
        <section className="mx-auto max-w-4xl px-4 -mt-4 mb-12">
          <div className="relative rounded-2xl border-2 border-accent/40 bg-surface p-6 glow">
            <div className="absolute -top-3 left-6 rounded-full bg-accent px-4 py-1 text-xs font-bold text-black">
              BEST VALUE — SAVE 40%
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold mb-1">{BUNDLE.name}</h2>
                <p className="text-sm text-muted">{BUNDLE.tagline}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-sm text-muted line-through">
                    {BUNDLE.originalPrice}
                  </span>
                  <span className="text-2xl font-bold gradient-text">
                    {BUNDLE.price}
                  </span>
                  <span className="text-xs text-muted">({BUNDLE.bnb})</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedProduct("bundle")}
                className="shrink-0 rounded-xl bg-accent px-8 py-3.5 text-sm font-bold text-black hover:bg-accent-light transition-colors flex items-center gap-2"
              >
                <Wallet className="h-4 w-4" />
                Buy Bundle
              </button>
            </div>
          </div>
        </section>

        {/* Individual Products */}
        <section className="mx-auto max-w-4xl px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-8">
            Or Buy Individually
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {PRODUCTS.map((product) => (
              <div
                key={product.id}
                className={`relative rounded-2xl border bg-surface p-5 flex flex-col ${
                  product.popular
                    ? "border-accent/40 glow"
                    : "border-border"
                }`}
              >
                {product.popular && (
                  <div className="absolute -top-2.5 right-4 rounded-full bg-accent px-3 py-0.5 text-xs font-bold text-black">
                    MOST POPULAR
                  </div>
                )}
                <div
                  className={`h-10 w-10 rounded-xl bg-gradient-to-br ${product.color} flex items-center justify-center mb-4`}
                >
                  <product.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-bold mb-1">{product.name}</h3>
                <p className="text-xs text-muted mb-4">{product.tagline}</p>
                <ul className="space-y-1.5 mb-5 flex-1">
                  {product.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-xs text-muted"
                    >
                      <Check className="h-3 w-3 text-success shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl font-bold">{product.price}</span>
                  <span className="text-xs text-muted">({product.bnb})</span>
                </div>
                <button
                  onClick={() => setSelectedProduct(product.id)}
                  className="w-full rounded-xl bg-surface-hover border border-border py-2.5 text-sm font-medium hover:border-accent/50 transition-colors flex items-center justify-center gap-1.5"
                >
                  Buy Now <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Trust */}
        <section className="border-t border-border bg-surface py-12">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Shield className="h-5 w-5 text-accent" />
              <h2 className="text-lg font-bold">Secure Crypto Payment</h2>
            </div>
            <p className="text-sm text-muted max-w-lg mx-auto">
              Pay with BNB on BSC network. Instant activation after payment.
              No personal data needed. Just send crypto and paste your TX hash.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6">
        <div className="text-center text-xs text-muted">
          &copy; {new Date().getFullYear()} MaxAI &middot; All products are
          digital downloads
        </div>
      </footer>

      {/* Payment Modal */}
      {selectedProduct && !activated && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="rounded-2xl border border-border bg-surface p-6 max-w-md w-full">
            <h3 className="text-lg font-bold mb-1">Complete Your Purchase</h3>
            <p className="text-sm text-muted mb-4">
              Send{" "}
              <strong className="text-foreground">
                {selectedProduct === "bundle"
                  ? BUNDLE.bnb
                  : PRODUCTS.find((p) => p.id === selectedProduct)?.bnb}
              </strong>{" "}
              on <strong className="text-foreground">BSC (BNB) network</strong>{" "}
              to:
            </p>
            <div className="rounded-xl bg-background border border-border p-3 mb-4">
              <code className="text-xs font-mono break-all text-accent-light">
                {BNB_WALLET}
              </code>
              <button
                onClick={handleCopyWallet}
                className="mt-2 flex items-center gap-1 text-xs text-muted hover:text-foreground"
              >
                {copied ? (
                  <Check className="h-3 w-3 text-success" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}{" "}
                {copied ? "Copied!" : "Copy address"}
              </button>
            </div>
            <div className="mb-4">
              <label className="text-sm font-medium mb-1 block">
                Paste TX Hash to activate:
              </label>
              <input
                type="text"
                value={txHash}
                onChange={(e) => setTxHash(e.target.value)}
                placeholder="0x..."
                className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm font-mono focus:outline-none focus:border-accent/50"
              />
            </div>
            {verifyError && (
              <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-3 py-2 text-xs text-red-400 mb-3">
                {verifyError}
              </div>
            )}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setSelectedProduct(null);
                  setTxHash("");
                  setVerifyError("");
                }}
                className="flex-1 rounded-xl border border-border py-2.5 text-sm hover:bg-surface-hover transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleActivate}
                disabled={verifying}
                className="flex-1 rounded-xl bg-accent py-2.5 text-sm font-bold text-black hover:bg-accent-light transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                {verifying ? "Verifying on BSC..." : <><Download className="h-3.5 w-3.5" /> Verify & Activate</>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {activated && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="rounded-2xl border border-border bg-surface p-6 max-w-md w-full text-center">
            <div className="h-14 w-14 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
              <Check className="h-7 w-7 text-success" />
            </div>
            <h3 className="text-lg font-bold mb-2">Purchase Activated!</h3>
            <p className="text-sm text-muted mb-6">
              Your access has been activated. Enjoy your products!
            </p>
            <div className="space-y-3">
              <a
                href="/tools"
                className="block w-full rounded-xl bg-accent py-3 text-sm font-bold text-black hover:bg-accent-light transition-colors"
              >
                Open MaxAI Writer
              </a>
              <a
                href="https://promptcraft-ai-gen.netlify.app"
                className="block w-full rounded-xl border border-border py-3 text-sm hover:bg-surface-hover transition-colors"
              >
                Open PromptCraft AI
              </a>
              <button
                onClick={() => {
                  setActivated(false);
                  setSelectedProduct(null);
                  setTxHash("");
                }}
                className="text-sm text-muted hover:text-foreground"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
