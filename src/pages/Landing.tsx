import { SEOHead, StructuredData, schemas } from '@/components/seo';
import { AnimatedBackground, ScrollReveal } from '@/components/effects';
import {
  HeroSection,
  ProblemSection,
  WhatIsSection,
  ParadigmShiftSection,
  HowItWorksSection,
  UseCaseCarousel,
  PlaygroundPreview,
  WhyMattersSection,
  WhyNowSection,
  WhoIsForSection,
  FinalCTASection,
  FAQSection,
  Footer,
} from '@/components/landing';

export default function Landing() {
  return (
    <div className="relative overflow-hidden">
      <SEOHead title="xBPP — AI Agent Payment Governance | Open Standard" description="The open standard for governing autonomous AI agent payments. Built for x402. Define your rules once — every transaction follows them. By VanarChain." path="/" />
      <StructuredData data={schemas.webSite} />
      <StructuredData data={schemas.softwareApplication} />
      <StructuredData
        data={schemas.faqPage([
          {
            question: 'What is xBPP?',
            answer: 'xBPP is an open standard for governing autonomous AI agent payments before execution using deterministic policy verdicts.',
          },
          {
            question: 'How does xBPP relate to x402?',
            answer: 'xBPP provides governance and policy enforcement, while x402 handles payment execution. They are complementary layers.',
          },
          {
            question: 'Is xBPP production-ready?',
            answer: 'xBPP v1 is publicly available with spec, playground, tests, and reference flow. Teams should adopt via staged rollout.',
          },
        ])}
      />
      <AnimatedBackground variant="default" />
      
      {/* 1. Hero - The hook (no scroll animation - already has mount animation) */}
      <HeroSection />
      
      {/* 2. Problem - The Agentic Gap */}
      <ScrollReveal variant="fade-up">
        <ProblemSection />
      </ScrollReveal>
      
      {/* 3. Solution - What is xBPP */}
      <ScrollReveal variant="fade-up" delay={50}>
        <WhatIsSection />
      </ScrollReveal>
      
      {/* 4. Paradigm Shift - Before/After comparison */}
      <ScrollReveal variant="scale">
        <ParadigmShiftSection />
      </ScrollReveal>
      
      {/* 5. How It Works - Architecture of Trust */}
      <ScrollReveal variant="fade-up">
        <HowItWorksSection />
      </ScrollReveal>
      
      {/* 6. Use Cases - Interactive carousel */}
      <ScrollReveal variant="fade-left">
        <UseCaseCarousel />
      </ScrollReveal>
      
      {/* 7. Playground Preview - Interactive demo teaser */}
      <ScrollReveal variant="scale" delay={100}>
        <PlaygroundPreview />
      </ScrollReveal>
      
      {/* 8. Why It Matters */}
      <ScrollReveal variant="fade-up">
        <WhyMattersSection />
      </ScrollReveal>

      {/* 9. Why Now */}
      <ScrollReveal variant="fade-up">
        <WhyNowSection />
      </ScrollReveal>

      {/* 10. Who It's For - Target personas */}
      <ScrollReveal variant="fade-up">
        <WhoIsForSection />
      </ScrollReveal>
      
      {/* 9. FAQ */}
      <ScrollReveal variant="fade-up">
        <FAQSection />
      </ScrollReveal>

      {/* 10. Final CTA */}
      <ScrollReveal variant="blur">
        <FinalCTASection />
      </ScrollReveal>
      
      {/* Footer */}
      <ScrollReveal variant="fade-up" threshold={0.05}>
        <Footer />
      </ScrollReveal>
    </div>
  );
}