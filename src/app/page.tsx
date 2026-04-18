import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  FileText,
  Mail,
  Send,
  User,
  ShoppingBag,
  BookOpen,
  Zap,
  ArrowRight,
  Check,
  Star,
  Shield,
  Clock,
} from "lucide-react";

const tools = [
  {
    icon: FileText,
    name: "Resume Builder",
    desc: "ATS-optimized resumes that land interviews",
  },
  {
    icon: Mail,
    name: "Cover Letter",
    desc: "Tailored cover letters for any job posting",
  },
  {
    icon: Send,
    name: "Email Writer",
    desc: "Professional emails for any occasion",
  },
  {
    icon: User,
    name: "LinkedIn Bio",
    desc: "Stand-out headlines and summaries",
  },
  {
    icon: ShoppingBag,
    name: "Product Description",
    desc: "High-converting product copy",
  },
  {
    icon: BookOpen,
    name: "Blog Outline",
    desc: "SEO-optimized blog structures",
  },
];

const stats = [
  { value: "10K+", label: "Generations" },
  { value: "6", label: "AI Tools" },
  { value: "< 5s", label: "Per Generation" },
  { value: "Free", label: "To Start" },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Hero */}
      <section className="hero-gradient relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 pt-24 pb-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs text-muted mb-8">
            <Zap className="h-3 w-3 text-accent" />
            Free AI writing tools — no sign-up required
          </div>
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
            Write like a <span className="gradient-text">pro</span>
            <br />
            in seconds
          </h1>
          <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
            Professional AI writing tools that generate resumes, cover letters,
            emails, and more. Start free — upgrade when you need more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tools"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white hover:bg-accent-light transition-colors animate-pulse-glow"
            >
              Start Writing Free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/pro"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-8 py-3.5 text-sm font-medium text-foreground hover:bg-surface transition-colors"
            >
              View Pro Plans
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-surface/50">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-bold gradient-text">{s.value}</div>
                <div className="text-xs text-muted mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              6 AI tools, <span className="gradient-text">one platform</span>
            </h2>
            <p className="text-muted max-w-xl mx-auto">
              Everything you need to write professional content. Each tool is
              fine-tuned for its specific use case.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map((tool) => (
              <Link
                key={tool.name}
                href="/tools"
                className="group gradient-border rounded-2xl p-6 hover:glow-sm transition-all duration-300"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 mb-4 group-hover:bg-accent/20 transition-colors">
                  <tool.icon className="h-5 w-5 text-accent-light" />
                </div>
                <h3 className="font-semibold mb-1.5">{tool.name}</h3>
                <p className="text-sm text-muted">{tool.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 border-t border-border bg-surface/30">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              How it works
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Choose a tool",
                desc: "Pick from 6 specialized AI writing tools.",
              },
              {
                step: "2",
                title: "Fill in details",
                desc: "Provide your information and preferences.",
              },
              {
                step: "3",
                title: "Get results",
                desc: "AI generates professional content in seconds.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent-light font-bold text-lg mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Simple pricing
            </h2>
            <p className="text-muted">Start free. Upgrade when you need more.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Free */}
            <div className="rounded-2xl border border-border bg-surface p-8">
              <h3 className="font-semibold text-lg mb-1">Free</h3>
              <div className="text-3xl font-bold mb-1">$0</div>
              <p className="text-sm text-muted mb-6">5 generations forever</p>
              <ul className="space-y-3 mb-8">
                {[
                  "All 6 AI tools",
                  "5 free generations",
                  "Copy & export results",
                  "No sign-up required",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-success" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/tools"
                className="block w-full rounded-full border border-border py-2.5 text-center text-sm font-medium hover:bg-surface-hover transition-colors"
              >
                Get Started
              </Link>
            </div>

            {/* Pro */}
            <div className="gradient-border rounded-2xl p-8 glow relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-0.5 text-xs font-semibold text-white">
                POPULAR
              </div>
              <h3 className="font-semibold text-lg mb-1">Pro</h3>
              <div className="text-3xl font-bold mb-1">
                $4<span className="text-lg">.99</span>
              </div>
              <p className="text-sm text-muted mb-6">
                Unlimited generations
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Everything in Free",
                  "Unlimited generations",
                  "Priority AI processing",
                  "Pay with crypto (BNB)",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-success" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/pro"
                className="block w-full rounded-full bg-accent py-2.5 text-center text-sm font-semibold text-white hover:bg-accent-light transition-colors"
              >
                Upgrade to Pro
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-16 border-t border-border bg-surface/30">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            {[
              {
                icon: Shield,
                title: "Secure & Private",
                desc: "Your data is never stored or shared.",
              },
              {
                icon: Clock,
                title: "Instant Results",
                desc: "AI generates content in under 5 seconds.",
              },
              {
                icon: Star,
                title: "Pro Quality",
                desc: "Powered by the latest AI models.",
              },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center">
                <item.icon className="h-6 w-6 text-accent-light mb-3" />
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 hero-gradient">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to write <span className="gradient-text">better</span>?
          </h2>
          <p className="text-muted mb-8 max-w-md mx-auto">
            Join thousands of professionals using MaxAI to create stunning
            content. Start free today.
          </p>
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white hover:bg-accent-light transition-colors"
          >
            Start Writing Free
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
