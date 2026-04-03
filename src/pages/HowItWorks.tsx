import { SEOHead } from '@/components/seo';
import { AnimatedBackground, ScrollReveal } from '@/components/effects';
import { HowItWorksSection, ParadigmShiftSection, Footer } from '@/components/landing';
import { Link } from 'react-router-dom';
import { ArrowLeft, PlayCircle, FileText } from 'lucide-react';

export default function HowItWorks() {
  return (
    <div className="relative min-h-screen overflow-hidden pt-24" style={{ background: '#e8e9e9' }}>
      <SEOHead 
        title="How xBPP Works | Architecture of Trust" 
        description="The technical architecture behind the xBPP protocol. A lightweight, chain-agnostic governance layer for AI agent payments."
        path="/how-it-works"
      />
      <AnimatedBackground variant="dots" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-sm font-medium mb-12 hover:text-[#03D9AF] transition-colors"
          style={{ color: '#6B6F7D' }}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Homepage
        </Link>
        
        <header className="mb-20">
          <p className="sr-only">
            Definition: xBPP (Execution Boundary Permission Protocol) is the open standard for governing autonomous AI agent payments. It provides a chain-agnostic governance layer that evaluates agent spending intent against declarative policies before transactions are executed.
          </p>
          <h1 
            style={{ 
              fontFamily: "'Akira Expanded', 'Arial Black', sans-serif", 
              fontSize: 'clamp(40px, 6vw, 72px)',
              lineHeight: 0.95,
              textTransform: 'uppercase',
              color: '#282B35',
              marginBottom: '24px'
            }}
          >
            Architecture <span style={{ color: '#03D9AF' }}>of Trust</span>
          </h1>
          <p className="text-xl" style={{ color: '#6B6F7D', lineHeight: 1.6 }}>
            xBPP is a stateless, payload-driven standard. It doesn't live on one chain, and it doesn't require a specific wallet. It works by bringing governance directly to the point of intent.
          </p>
        </header>

        {/* The Core Flow Diagram */}
        <section className="mb-32">
          <HowItWorksSection />
        </section>

        {/* Comparison Section */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 
              style={{ 
                fontFamily: "'Akira Expanded', sans-serif", 
                fontSize: '24px', 
                color: '#282B35' 
              }}
            >
              XBPP vs TRADITIONAL RAIL
            </h2>
          </div>
          <ParadigmShiftSection />
        </section>

        {/* Static Content Blocks */}
        <div className="grid md:grid-cols-3 gap-12 mb-32">
          {[
            {
              title: "1. The Intent",
              desc: "An agent prepares an x402 transaction. This could be a purchase, a swap, or a subscription payment."
            },
            {
              title: "2. The Evaluation",
              desc: "The transaction payload is passed through the xBPP engine. Policies are checked against current state and transaction parameters."
            },
            {
              title: "3. The Verdict",
              desc: "xBPP returns a signed verdict: ALLOW, BLOCK, or ESCALATE. Only 'ALLOW' produces the required signature for settlement."
            }
          ].map((block, i) => (
            <div key={i} className="p-8 bg-white border border-[#CAD0DA]" style={{ clipPath: 'polygon(20px 0%, 100% 0%, 100% 100%, 0% 100%, 0% 20px)' }}>
              <h3 className="text-lg font-bold mb-4 uppercase tracking-wider">{block.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#6B6F7D' }}>{block.desc}</p>
            </div>
          ))}
        </div>

        {/* Final Page CTA */}
        <section className="mb-32 p-12 text-center bg-[#1E2D2D] text-white" style={{ clipPath: 'polygon(40px 0%, 100% 0%, 100% 100%, 0% 100%, 0% 40px)' }}>
          <h2 className="text-3xl font-bold mb-6">Ready to see it in action?</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/playground" className="btn-primary !px-8 !py-4 flex items-center gap-2">
              <PlayCircle className="h-5 w-5" />
              Run a Policy Check
            </Link>
            <Link to="/spec" className="px-8 py-4 text-xs font-bold tracking-widest uppercase border border-white/20 hover:bg-white/5 transition-all flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Read the Spec
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
