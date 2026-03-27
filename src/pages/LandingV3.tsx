import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Shield, Zap, Lock, Eye, Users, GitBranch, 
  Check, ChevronDown, ChevronRight, Star, FileText, Code,
  AlertTriangle, Clock, Database, Cpu
} from 'lucide-react';
import { TracedWizard } from '@/components/visualization';

/* =============================================================================
   GREPTILE PIXEL-PERFECT CLONE FOR xBPP
   Based on https://www.greptile.com/ captured 2026-03-27
   ============================================================================= */

// Design tokens extracted from Greptile
const COLORS = {
  bg: '#F5F4F0',
  bgDark: '#1A1A1A',
  green: '#2F6B4F',
  greenLight: '#3D8B6A',
  greenAccent: '#3ECFA5', // xBPP accent
  text: '#1A1A1A',
  textSecondary: '#6B6B6B',
  textTertiary: '#9B9B9B',
  border: '#E5E5E0',
  borderDark: '#D5D5D0',
};

// ============================================================================
// NAVBAR - exact Greptile style
// ============================================================================
function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#F5F4F0] border-b border-[#E5E5E0]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-[#2F6B4F]" />
            <span className="font-semibold text-[#1A1A1A] text-lg">xBPP</span>
          </Link>
          
          {/* Center links */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/spec" className="text-sm text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors">Spec</Link>
            <Link to="/playground" className="text-sm text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors">Playground</Link>
            <Link to="/library" className="text-sm text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors">Library</Link>
            <Link to="/test-suite" className="text-sm text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors">Test Suite</Link>
          </div>
          
          {/* Right buttons */}
          <div className="flex items-center gap-4">
            <Link to="/spec" className="text-sm text-[#6B6B6B] hover:text-[#1A1A1A] hidden sm:block">
              Documentation
            </Link>
            <Link 
              to="/playground"
              className="bg-[#2F6B4F] text-white px-4 py-2 rounded text-sm font-medium hover:bg-[#3D8B6A] transition-colors"
            >
              Try Playground
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

// ============================================================================
// HERO SECTION - Split layout with mascot
// ============================================================================
function HeroSection() {
  const [isEvaluating, setIsEvaluating] = useState(false);

  return (
    <section className="border-x border-[#E5E5E0] mx-6 lg:mx-12">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Eyebrow text - Greptile style */}
              <p className="text-sm font-mono text-[#2F6B4F] mb-4 tracking-wide">
                AI AGENTS THAT PROVE THEIR INTENT BEFORE SPENDING
              </p>
              
              {/* Main headline */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium text-[#1A1A1A] leading-[1.05] tracking-tight">
                The Agent<br />Gatekeeper
              </h1>
              
              {/* Description */}
              <p className="mt-6 text-lg text-[#6B6B6B] max-w-md leading-relaxed">
                xBPP is the Execution Boundary Permission Protocol — a trust layer 
                that verifies AI agent transactions before execution.
              </p>
              
              {/* CTA Buttons */}
              <div className="mt-8 flex flex-wrap gap-3">
                <Link 
                  to="/playground"
                  className="inline-flex items-center gap-2 bg-[#2F6B4F] text-white px-5 py-2.5 rounded text-sm font-medium hover:bg-[#3D8B6A] transition-colors"
                >
                  Try the Playground
                </Link>
                <Link 
                  to="/spec"
                  className="inline-flex items-center gap-2 border border-[#E5E5E0] text-[#1A1A1A] px-5 py-2.5 rounded text-sm font-medium hover:border-[#D5D5D0] hover:bg-white/50 transition-colors"
                >
                  Read the Spec
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              
              {/* Trust badges - Greptile style */}
              <div className="mt-12 flex items-center gap-6">
                <div className="flex items-center gap-2 text-sm text-[#6B6B6B]">
                  <div className="flex">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="w-4 h-4 text-[#2F6B4F] fill-[#2F6B4F]" />
                    ))}
                  </div>
                  <span>Open Standard</span>
                </div>
                <div className="h-4 w-px bg-[#E5E5E0]" />
                <div className="text-sm text-[#6B6B6B]">Built on VanarChain</div>
              </div>
            </motion.div>
          </div>
          
          {/* Right - Wizard mascot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
            onMouseEnter={() => setIsEvaluating(true)}
            onMouseLeave={() => setIsEvaluating(false)}
          >
            <div className="relative">
              <TracedWizard 
                width={450} 
                height={400} 
                isEvaluating={isEvaluating}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// SECTION WRAPPER with borders
// ============================================================================
function Section({ children, className = '', dark = false }: { 
  children: React.ReactNode; 
  className?: string;
  dark?: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className={`border-x border-[#E5E5E0] mx-6 lg:mx-12 ${dark ? 'bg-[#1A1A1A]' : ''} ${className}`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 py-16 lg:py-20">
        {children}
      </div>
    </motion.section>
  );
}

// ============================================================================
// FEATURE CARD with corner squares
// ============================================================================
function FeatureCard({ title, description, icon: Icon }: {
  title: string;
  description: string;
  icon: React.ElementType;
}) {
  return (
    <div className="relative border border-[#E5E5E0] bg-white/50 p-6 group hover:border-[#D5D5D0] transition-colors">
      {/* Corner squares */}
      <div className="absolute top-0 left-0 w-2 h-2 bg-[#E5E5E0] group-hover:bg-[#2F6B4F] transition-colors" />
      <div className="absolute top-0 right-0 w-2 h-2 bg-[#E5E5E0] group-hover:bg-[#2F6B4F] transition-colors" />
      <div className="absolute bottom-0 left-0 w-2 h-2 bg-[#E5E5E0] group-hover:bg-[#2F6B4F] transition-colors" />
      <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#E5E5E0] group-hover:bg-[#2F6B4F] transition-colors" />
      
      <Icon className="w-6 h-6 text-[#2F6B4F] mb-4" />
      <h3 className="text-lg font-medium text-[#1A1A1A] mb-2">{title}</h3>
      <p className="text-sm text-[#6B6B6B] leading-relaxed">{description}</p>
    </div>
  );
}

// ============================================================================
// SECTION: Your second pair of eyes (Feature Grid)
// ============================================================================
function FeaturesSection() {
  return (
    <Section>
      {/* Header */}
      <div className="mb-12">
        <p className="text-sm font-mono text-[#2F6B4F] mb-3">[ THE PROTOCOL ]</p>
        <h2 className="text-4xl font-medium text-[#1A1A1A] mb-4">Your transaction gatekeeper.</h2>
        <p className="text-lg text-[#6B6B6B] max-w-2xl">
          xBPP evaluates every agent transaction against your policy before execution.
        </p>
      </div>
      
      {/* 2x2 Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FeatureCard 
          icon={Shield}
          title="9-Phase Evaluation"
          description="Every transaction passes through identity, scope, limits, risk, anomaly, context, escalation, audit, and verdict phases."
        />
        <FeatureCard 
          icon={FileText}
          title="Policy-as-Code"
          description="Define your trust boundaries in code. Version control your agent permissions like infrastructure."
        />
        <FeatureCard 
          icon={Eye}
          title="Real-time Monitoring"
          description="Watch transactions flow through evaluation. See exactly why each was allowed, blocked, or escalated."
        />
        <FeatureCard 
          icon={Users}
          title="Human Escalation"
          description="High-risk transactions route to human approval. You stay in control of what matters."
        />
      </div>
    </Section>
  );
}

// ============================================================================
// SECTION: Full Codebase Context (Dark section with visualization)
// ============================================================================
function ContextSection() {
  return (
    <Section dark>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-sm font-mono text-[#3ECFA5] mb-3">[ FULL CONTEXT ]</p>
          <h2 className="text-4xl font-medium text-white mb-4">Trust is the product.</h2>
          <p className="text-lg text-gray-400 mb-6 leading-relaxed">
            In the near future, no autonomous agent will execute a transaction 
            without a trust receipt. xBPP is building that future.
          </p>
          <ul className="space-y-3">
            {[
              'Immutable audit trail for every decision',
              'Cryptographic proof of policy compliance',
              'On-chain verification via VanarChain',
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-300">
                <Check className="w-5 h-5 text-[#3ECFA5]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        
        {/* Network visualization placeholder */}
        <div className="relative h-80 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Animated circles representing trust network */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute border border-[#3ECFA5]/30 rounded-full"
                style={{
                  width: 150 + i * 80,
                  height: 150 + i * 80,
                }}
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />
            ))}
            <div className="relative z-10 w-16 h-16 bg-[#3ECFA5] rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ============================================================================
// SECTION: Your house, your rules (Policy examples)
// ============================================================================
function PolicySection() {
  return (
    <Section>
      <div className="mb-12">
        <p className="text-sm font-mono text-[#2F6B4F] mb-3">[ YOUR RULES ]</p>
        <h2 className="text-4xl font-medium text-[#1A1A1A] mb-4">Your house, your rules.</h2>
        <p className="text-lg text-[#6B6B6B] max-w-2xl">
          Define exactly what your agents can and cannot do. Every transaction is evaluated against your policy.
        </p>
      </div>
      
      {/* Policy examples */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border border-[#E5E5E0] bg-[#1A1A1A] rounded overflow-hidden">
          <div className="px-4 py-2 border-b border-gray-800 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-xs text-gray-500 ml-2 font-mono">policy.yaml</span>
          </div>
          <pre className="p-4 text-sm text-gray-300 font-mono overflow-x-auto">
{`posture: BALANCED

limits:
  daily_spend: 1000 USDC
  single_tx: 100 USDC
  
escalation:
  threshold: 50 USDC
  require: human_approval
  
block:
  - unknown_counterparty
  - after_hours`}
          </pre>
        </div>
        
        <div className="border border-[#E5E5E0] bg-white/50 p-6">
          <h3 className="text-lg font-medium text-[#1A1A1A] mb-4">What this policy does:</h3>
          <ul className="space-y-3 text-sm text-[#6B6B6B]">
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-[#2F6B4F] mt-0.5 flex-shrink-0" />
              <span>Allows up to $1,000/day in agent spending</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <span>Escalates any transaction over $50 to human approval</span>
            </li>
            <li className="flex items-start gap-3">
              <Lock className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
              <span>Blocks transactions to unknown parties or outside business hours</span>
            </li>
          </ul>
        </div>
      </div>
    </Section>
  );
}

// ============================================================================
// SECTION: How it works (9 phases)
// ============================================================================
function HowItWorksSection() {
  const phases = [
    { num: 1, name: 'Identity Check', desc: 'Verify agent credentials' },
    { num: 2, name: 'Scope Match', desc: 'Confirm action is permitted' },
    { num: 3, name: 'Limit Check', desc: 'Validate spending caps' },
    { num: 4, name: 'Risk Score', desc: 'Calculate exposure' },
    { num: 5, name: 'Anomaly Scan', desc: 'Detect deviations' },
    { num: 6, name: 'Context Window', desc: 'Evaluate patterns' },
    { num: 7, name: 'Escalation', desc: 'Route if needed' },
    { num: 8, name: 'Audit Log', desc: 'Record decision' },
    { num: 9, name: 'Verdict', desc: 'ALLOW / BLOCK / ESCALATE' },
  ];

  return (
    <Section>
      <div className="mb-12 text-center">
        <p className="text-sm font-mono text-[#2F6B4F] mb-3">[ THE 9 PHASES ]</p>
        <h2 className="text-4xl font-medium text-[#1A1A1A] mb-4">How xBPP evaluates transactions</h2>
      </div>
      
      <div className="grid grid-cols-3 md:grid-cols-9 gap-4">
        {phases.map((phase) => (
          <div key={phase.num} className="text-center">
            <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-[#2F6B4F]/10 flex items-center justify-center text-[#2F6B4F] font-mono font-medium">
              {phase.num}
            </div>
            <p className="text-xs font-medium text-[#1A1A1A]">{phase.name}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ============================================================================
// SECTION: Who it's for
// ============================================================================
function AudienceSection() {
  const audiences = [
    { title: 'AI Agent Developers', desc: 'Ship agents that prove their intent', icon: Code },
    { title: 'Payment Providers', desc: 'Add trust verification to agent transactions', icon: Cpu },
    { title: 'Enterprises', desc: 'Govern AI spending with policy-as-code', icon: Database },
    { title: 'Compliance Teams', desc: 'Immutable audit trails for every decision', icon: FileText },
  ];

  return (
    <Section>
      <div className="mb-12 text-center">
        <p className="text-sm font-mono text-[#2F6B4F] mb-3">[ WHO IT'S FOR ]</p>
        <h2 className="text-4xl font-medium text-[#1A1A1A]">Built for builders who know how systems behave.</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {audiences.map((item, i) => (
          <FeatureCard key={i} icon={item.icon} title={item.title} description={item.desc} />
        ))}
      </div>
    </Section>
  );
}

// ============================================================================
// SECTION: CTA
// ============================================================================
function CTASection() {
  return (
    <Section>
      <div className="text-center py-8">
        <h2 className="text-4xl md:text-5xl font-medium text-[#1A1A1A] mb-6">
          Build agents worth trusting.
        </h2>
        <div className="flex justify-center gap-4">
          <Link 
            to="/playground"
            className="inline-flex items-center gap-2 bg-[#2F6B4F] text-white px-6 py-3 rounded text-sm font-medium hover:bg-[#3D8B6A] transition-colors"
          >
            <Zap className="w-4 h-4" />
            Try the Playground
          </Link>
          <Link 
            to="/spec"
            className="inline-flex items-center gap-2 border border-[#E5E5E0] text-[#1A1A1A] px-6 py-3 rounded text-sm font-medium hover:bg-white/50 transition-colors"
          >
            Read the Full Spec
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </Section>
  );
}

// ============================================================================
// FAQ Section
// ============================================================================
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const faqs = [
    {
      q: 'What is xBPP?',
      a: 'xBPP (Execution Boundary Permission Protocol) is an open standard for verifying AI agent transactions before execution. It provides a trust layer between AI agents and payment systems.',
    },
    {
      q: 'How does the 9-phase evaluation work?',
      a: 'Every transaction passes through 9 phases: identity verification, scope matching, limit checking, risk scoring, anomaly detection, context analysis, escalation logic, audit logging, and final verdict (ALLOW/BLOCK/ESCALATE).',
    },
    {
      q: 'Is xBPP open source?',
      a: 'Yes, xBPP is an open standard built on VanarChain. The specification, reference implementations, and tooling are all open source.',
    },
    {
      q: 'How do I integrate xBPP?',
      a: 'Start with the Playground to understand the evaluation flow, then read the Spec for implementation details. SDKs are available for common languages.',
    },
  ];

  return (
    <Section>
      <div className="mb-12">
        <p className="text-sm font-mono text-[#2F6B4F] mb-3">[ FAQ ]</p>
        <h2 className="text-4xl font-medium text-[#1A1A1A]">Frequently Asked Questions</h2>
      </div>
      
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="border border-[#E5E5E0] rounded">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between p-4 text-left"
            >
              <span className="font-medium text-[#1A1A1A]">{faq.q}</span>
              <ChevronDown className={`w-5 h-5 text-[#6B6B6B] transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
            </button>
            {openIndex === i && (
              <div className="px-4 pb-4 text-[#6B6B6B]">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}

// ============================================================================
// FOOTER
// ============================================================================
function Footer() {
  return (
    <footer className="border-t border-[#E5E5E0] bg-[#F5F4F0]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-6 h-6 text-[#2F6B4F]" />
              <span className="font-semibold text-[#1A1A1A]">xBPP</span>
            </div>
            <p className="text-sm text-[#6B6B6B]">
              The Execution Boundary Permission Protocol
            </p>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="font-medium text-[#1A1A1A] mb-3">Protocol</h4>
            <ul className="space-y-2 text-sm text-[#6B6B6B]">
              <li><Link to="/spec" className="hover:text-[#1A1A1A]">Specification</Link></li>
              <li><Link to="/playground" className="hover:text-[#1A1A1A]">Playground</Link></li>
              <li><Link to="/library" className="hover:text-[#1A1A1A]">Library</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-[#1A1A1A] mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-[#6B6B6B]">
              <li><a href="https://github.com/vanarchain/xbpp" className="hover:text-[#1A1A1A]">GitHub</a></li>
              <li><a href="https://vanarchain.com" className="hover:text-[#1A1A1A]">VanarChain</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-[#1A1A1A] mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-[#6B6B6B]">
              <li><a href="https://vanarchain.com" className="hover:text-[#1A1A1A]">About</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-[#E5E5E0] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#9B9B9B]">© 2026 VanarChain. All rights reserved.</p>
          <p className="text-sm text-[#9B9B9B]">Built on VanarChain</p>
        </div>
      </div>
    </footer>
  );
}

// ============================================================================
// MAIN PAGE
// ============================================================================
export default function LandingV3() {
  return (
    <div className="min-h-screen bg-[#F5F4F0]">
      <Navbar />
      <main>
        <HeroSection />
        <hr className="border-[#E5E5E0] mx-6 lg:mx-12" />
        <FeaturesSection />
        <hr className="border-[#E5E5E0] mx-6 lg:mx-12" />
        <ContextSection />
        <hr className="border-[#E5E5E0] mx-6 lg:mx-12" />
        <PolicySection />
        <hr className="border-[#E5E5E0] mx-6 lg:mx-12" />
        <HowItWorksSection />
        <hr className="border-[#E5E5E0] mx-6 lg:mx-12" />
        <AudienceSection />
        <hr className="border-[#E5E5E0] mx-6 lg:mx-12" />
        <FAQSection />
        <hr className="border-[#E5E5E0] mx-6 lg:mx-12" />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
