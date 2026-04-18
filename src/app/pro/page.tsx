"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  Zap,
  Check,
  Copy,
  ArrowRight,
  Shield,
  Wallet,
  ExternalLink,
} from "lucide-react";

const BNB_WALLET = process.env.NEXT_PUBLIC_BNB_WALLET || "YOUR_BNB_WALLET_HERE";
const BNB_AMOUNT = "0.008";
const USD_PRICE = "$4.99";

export default function ProPage() {
  const [copied, setCopied] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [activating, setActivating] = useState(false);
  const [activated, setActivated] = useState(false);
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    setIsPro(localStorage.getItem("maxai_pro") === "true");
  }, []);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(BNB_WALLET);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const [verifyError, setVerifyError] = useState("");

  const handleActivate = async () => {
    if (!txHash.trim()) return;
    setActivating(true);
    setVerifyError("");

    try {
      const res = await fetch(
        `https://api.bscscan.com/api?module=proxy&action=eth_getTransactionByHash&txhash=${txHash.trim()}&apikey=YourApiKeyToken`
      );
      const data = await res.json();
      const tx = data?.result;

      if (!tx || !tx.to) {
        setVerifyError("Transaction not found. Check your TX hash.");
        setActivating(false);
        return;
      }

      if (tx.to.toLowerCase() !== BNB_WALLET.toLowerCase()) {
        setVerifyError("Payment sent to wrong address.");
        setActivating(false);
        return;
      }

      const valueBNB = parseInt(tx.value, 16) / 1e18;
      if (valueBNB < 0.007) {
        setVerifyError(`Only ${valueBNB.toFixed(4)} BNB received. Minimum is 0.008 BNB.`);
        setActivating(false);
        return;
      }

      const licenseKey = btoa(`maxai_pro_${txHash.slice(0, 16)}_${Date.now()}`);
      localStorage.setItem("maxai_pro", "true");
      localStorage.setItem("maxai_pro_tx", txHash);
      localStorage.setItem("maxai_license", licenseKey);
      setActivated(true);
      setActivating(false);
      setIsPro(true);
    } catch {
      setVerifyError("Verification failed. Try again.");
      setActivating(false);
    }
  };

  if (isPro && !activated) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-success/10 mb-6">
              <Check className="h-8 w-8 text-success" />
            </div>
            <h1 className="text-2xl font-bold mb-2">You&apos;re already Pro!</h1>
            <p className="text-muted mb-6">
              You have unlimited access to all MaxAI tools.
            </p>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-light transition-colors"
            >
              Go to Tools
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-4 py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent-light mb-6">
              <Zap className="h-3 w-3" />
              Upgrade to Pro
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">
              Unlock <span className="gradient-text">unlimited</span> power
            </h1>
            <p className="text-muted">
              One-time payment. Unlimited AI generations forever.
            </p>
          </div>

          {activated ? (
            <div className="text-center">
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-success/10 mb-6 animate-pulse-glow">
                <Check className="h-10 w-10 text-success" />
              </div>
              <h2 className="text-2xl font-bold mb-2">
                Pro Activated!
              </h2>
              <p className="text-muted mb-8">
                You now have unlimited access to all MaxAI tools.
              </p>
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white hover:bg-accent-light transition-colors"
              >
                Start Using Pro Tools
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <>
              {/* What you get */}
              <div className="gradient-border rounded-2xl p-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold">MaxAI Pro</h2>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{USD_PRICE}</div>
                    <div className="text-xs text-muted">one-time</div>
                  </div>
                </div>
                <ul className="space-y-2.5">
                  {[
                    "Unlimited AI generations",
                    "All 6 professional writing tools",
                    "Priority processing speed",
                    "Lifetime access — pay once",
                    "No account required",
                  ].map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2.5 text-sm"
                    >
                      <Check className="h-4 w-4 text-success shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Payment */}
              <div className="rounded-2xl border border-border bg-surface p-6 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Wallet className="h-5 w-5 text-accent-light" />
                  <h2 className="font-semibold">Pay with BNB (BSC)</h2>
                </div>
                <p className="text-sm text-muted mb-4">
                  Send exactly <strong className="text-foreground">{BNB_AMOUNT} BNB</strong> to the
                  address below on the <strong className="text-foreground">BNB Smart Chain (BSC)</strong> network.
                </p>

                {/* Wallet Address */}
                <div className="rounded-xl bg-background border border-border p-4 mb-4">
                  <div className="text-xs text-muted mb-1">BNB Address (BSC)</div>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-sm font-mono break-all text-accent-light">
                      {BNB_WALLET}
                    </code>
                    <button
                      onClick={handleCopyAddress}
                      className="shrink-0 rounded-lg p-2 hover:bg-surface-hover transition-colors"
                      title="Copy address"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-success" />
                      ) : (
                        <Copy className="h-4 w-4 text-muted" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-2 rounded-xl bg-accent/5 border border-accent/10 p-3 mb-6 text-xs text-muted">
                  <Shield className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <span>
                    Make sure you send on <strong className="text-foreground">BSC (BEP-20)</strong> network.
                    After sending, paste your transaction hash below to activate Pro.
                  </span>
                </div>

                {/* Tx verification */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium">
                    Transaction Hash
                  </label>
                  <input
                    type="text"
                    value={txHash}
                    onChange={(e) => setTxHash(e.target.value)}
                    placeholder="0x..."
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm font-mono placeholder:text-muted/40 focus:outline-none focus:border-accent/50 transition-colors"
                  />
                  {verifyError && (
                    <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-3 py-2 text-xs text-red-400">
                      {verifyError}
                    </div>
                  )}
                  <button
                    onClick={handleActivate}
                    disabled={!txHash.trim() || activating}
                    className="w-full rounded-xl bg-accent py-3.5 text-sm font-semibold text-white hover:bg-accent-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                  >
                    {activating ? (
                      "Verifying on BSCScan..."
                    ) : (
                      <>
                        Verify & Activate Pro
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* BSCScan link */}
              <div className="text-center">
                <a
                  href={`https://bscscan.com/address/${BNB_WALLET}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-foreground transition-colors"
                >
                  Verify address on BSCScan
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
