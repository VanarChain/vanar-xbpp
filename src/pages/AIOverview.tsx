import { Link } from 'react-router-dom';
import { SEOHead, StructuredData, schemas } from '@/components/seo';
import { AnimatedBackground } from '@/components/effects';

export default function AIOverview() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <SEOHead
        title="xBPP AI Overview — What It Is, Why It Matters, How To Use It"
        description="A concise AI-first overview of xBPP: governance-before-execution for autonomous agent payments, verdict model, reason codes, and implementation path."
        path="/ai-overview"
      />
      <StructuredData data={schemas.softwareApplication} />
      <StructuredData data={schemas.webSite} />
      <AnimatedBackground variant="subtle" />

      <main className="pt-28 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-medium mb-6" style={{ fontFamily: "'Akira Expanded', 'Arial Black', sans-serif", color: '#282B35' }}>
            xBPP — AI Overview
          </h1>

          <p className="text-lg text-muted-foreground mb-8">
            xBPP (Execution Boundary Permission Protocol) is an open standard that determines whether an autonomous
            payment request should be <strong className="text-foreground">ALLOW</strong>, <strong className="text-foreground">BLOCK</strong>, or <strong className="text-foreground">ESCALATE</strong> before execution.
          </p>

          <section className="mb-8 p-6 rounded-xl border border-primary/20 bg-primary/5">
            <h2 className="text-2xl font-medium mb-4">Why it exists</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>• AI agents can initiate transactions, but need deterministic governance.</li>
              <li>• Static allowlists are too brittle for real-world autonomous behavior.</li>
              <li>• Teams need auditable policy verdicts and reason codes for trust and compliance.</li>
            </ul>
          </section>

          <section className="mb-8 p-6 rounded-xl border border-border bg-card/50">
            <h2 className="text-2xl font-medium mb-4">Core model</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Input: payment intent + policy context</li>
              <li>• Engine: policy evaluation + rule checks + guardrails</li>
              <li>• Output: verdict + reason codes + audit metadata</li>
            </ul>
          </section>

          <section className="mb-8 p-6 rounded-xl border border-border bg-card/50">
            <h2 className="text-2xl font-medium mb-4">Implementation path</h2>
            <ol className="space-y-2 text-muted-foreground list-decimal pl-5">
              <li>Simulate policies with realistic scenarios.</li>
              <li>Calibrate thresholds and escalation boundaries.</li>
              <li>Enforce in production with observability and reason-code tracing.</li>
            </ol>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-medium mb-4">Start here</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <Link className="p-4 rounded-lg border border-border hover:border-primary transition-colors" to="/learn/quick-start">Quick Start</Link>
              <Link className="p-4 rounded-lg border border-border hover:border-primary transition-colors" to="/spec">Technical Spec</Link>
              <Link className="p-4 rounded-lg border border-border hover:border-primary transition-colors" to="/playground">Playground</Link>
              <Link className="p-4 rounded-lg border border-border hover:border-primary transition-colors" to="/test-suite">Test Suite</Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
