import { SEOHead } from '@/components/seo';
import { AnimatedBackground, ScrollReveal } from '@/components/effects';
import { Footer } from '@/components/landing';
import { Check, X, Shield, Zap, Lock, CreditCard } from 'lucide-react';

export default function CompareXbppVsX402() {
  const tableData = [
    {
      feature: "Primary Function",
      x402: "Payment Execution (How to pay)",
      xbpp: "Payment Governance (Should we pay?)",
      highlight: true
    },
    {
      feature: "Analogy",
      x402: "The Engine & Transmission",
      xbpp: "The Steering Wheel & Brakes"
    },
    {
      feature: "Protocol Type",
      x402: "Stateless HTTP 402 Flow",
      xbpp: "Policy-driven Boundary Standard"
    },
    {
      feature: "Control Mechanism",
      x402: "Direct Settlement Rails",
      xbpp: "Signed Verdicts (Allow/Block/Escalate)"
    },
    {
      feature: "Compliance",
      x402: "Transfers value only",
      xbpp: "Enforces AML/KYC & Spending Limits"
    }
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 relative overflow-hidden" style={{ background: '#e8e9e9' }}>
      <SEOHead 
        title="xBPP vs x402 | The Governance Layer for AI Agent Payments" 
        description="Understanding the relationship between xBPP and x402. Learn why x402 needs xBPP to solve the accountability gap in AI agentic payments."
        path="/compare/xbpp-vs-x402"
      />
      <AnimatedBackground variant="grid" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <header className="mb-16 text-center">
          <div className="section-label justify-center mb-6">COMPARISON</div>
          <h1 className="text-4xl md:text-6xl font-medium mb-6" style={{ fontFamily: "'Akira Expanded', sans-serif" }}>
            XBPP <span style={{ color: '#03D9AF' }}>VS</span> X402
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            x402 enabled autonomous payments. xBPP enables autonomous <span className="text-[#282B35] font-bold italic">accountability</span>.
          </p>
        </header>

        {/* Comparison Table */}
        <div className="bg-white border border-[#CAD0DA] overflow-hidden mb-20" style={{ clipPath: 'polygon(30px 0%, 100% 0%, 100% 100%, 0% 100%, 0% 30px)' }}>
          <div className="grid grid-cols-[1fr_1.5fr_1.5fr] text-sm font-mono uppercase tracking-wider border-b border-[#CAD0DA] bg-[#EDEDEA]">
            <div className="p-6 border-r border-[#CAD0DA]">Feature</div>
            <div className="p-6 border-r border-[#CAD0DA] text-[#6B6F7D]">x402 (Execution)</div>
            <div className="p-6 text-[#03D9AF]">xBPP (Governance)</div>
          </div>
          
          {tableData.map((row, i) => (
            <div key={i} className={cn(
              "grid grid-cols-[1fr_1.5fr_1.5fr] text-sm border-b border-[#CAD0DA] last:border-0",
              row.highlight ? "bg-[#03D9AF]/5" : ""
            )}>
              <div className="p-6 border-r border-[#CAD0DA] font-bold text-[#282B35]">{row.feature}</div>
              <div className="p-6 border-r border-[#CAD0DA] text-[#6B6F7D]">{row.x402}</div>
              <div className="p-6 text-[#282B35] font-medium">{row.xbpp}</div>
            </div>
          ))}
        </div>

        {/* Deep Dive Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-32">
          <div className="p-10 bg-white border border-[#CAD0DA]" style={{ clipPath: 'polygon(30px 0%, 100% 0%, 100% 100%, 0% 100%, 0% 30px)' }}>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Zap className="h-6 w-6 text-[#6B6F7D]" />
              The x402 Limit
            </h3>
            <p className="text-[#6B6F7D] leading-relaxed mb-6">
              x402 is an incredible engineering feat for <span className="text-[#282B35] font-bold">capability</span>. It allows an agent to see an HTTP 402 error, find a payment rail, and settle the invoice autonomously.
            </p>
            <p className="text-[#6B6F7D] leading-relaxed">
              However, x402 does not care <span className="text-[#F87171] font-bold italic">why</span> the agent is paying or <span className="text-[#F87171] font-bold italic">if</span> it should. It is pure execution.
            </p>
          </div>

          <div className="p-10 bg-[#1E2D2D] text-white" style={{ clipPath: 'polygon(30px 0%, 100% 0%, 100% 100%, 0% 100%, 0% 30px)' }}>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Shield className="h-6 w-6 text-[#03D9AF]" />
              The xBPP Safety Catch
            </h3>
            <p className="text-[#E2E2DE] leading-relaxed mb-6">
              xBPP is the <span className="text-[#03D9AF] font-bold">accountability</span> layer. It sits before the x402 fetch. It evaluates the agent's intent against a signed policy.
            </p>
            <p className="text-[#E2E2DE] leading-relaxed">
              If the agent tries to spend $500 but the policy limit is $100, xBPP <span className="text-white font-bold underline decoration-[#03D9AF]">blocks it</span> before the x402 payment rail is even touched.
            </p>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

import { cn } from '@/lib/utils';
