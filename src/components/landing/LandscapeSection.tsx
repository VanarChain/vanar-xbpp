import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { DollarSign, Blocks, ShoppingCart, TrendingUp, Zap, Shield, ExternalLink } from 'lucide-react';

const categories = [
  {
    id: 'earners',
    title: 'The Earners',
    subtitle: 'Service Agents',
    icon: DollarSign,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
    description: 'Agents that sell digital resources. Low-risk — they receive money, not spend it.',
    examples: [
      { name: 'AInalyst', stat: '~$350k volume', desc: 'Crypto intelligence on Virtuals' },
      { name: 'Prixe', stat: 'Financial APIs', desc: 'Stock data & reports' },
      { name: 'Weather Bots', stat: '$0.001/call', desc: 'Hyper-local data' },
    ],
    percentage: 90,
  },
  {
    id: 'enablers',
    title: 'The Enablers',
    subtitle: 'Infrastructure',
    icon: Blocks,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
    description: 'The Visa/Stripe layer for agents. Handles complex crypto signing.',
    examples: [
      { name: 'Crossmint', stat: 'Enterprise', desc: 'Wallets for Agents' },
      { name: 'Kite AI', stat: 'L1 Chain', desc: 'Agentic Internet layer' },
      { name: 'Questflow', stat: 'Orchestration', desc: 'Multi-agent swarms' },
    ],
    percentage: null,
  },
  {
    id: 'spenders',
    title: 'The Spenders',
    subtitle: 'Autonomous Buyers',
    icon: ShoppingCart,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20',
    description: 'The smallest group. Why? Because xBPP doesn\'t exist yet.',
    examples: [
      { name: 'Virtuals', stat: 'Walled Gardens', desc: 'Gaming economies only' },
      { name: 'XMTP Demos', stat: 'Hackathons', desc: 'Not production-ready' },
    ],
    percentage: 10,
    blocked: true,
  },
];

const trends = [
  {
    icon: TrendingUp,
    title: 'DeFi as an API',
    description: 'Agents treating protocols as paid services, not UIs.',
  },
  {
    icon: Zap,
    title: 'Pay-Per-Inference',
    description: 'Death of SaaS. Pay 0.0004 USDC for exactly 500 tokens.',
  },
  {
    icon: Shield,
    title: 'The Trust Wall',
    description: '"Agents can pay, but should they?" — The hype hits reality.',
  },
];

export function LandscapeSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showTrends, setShowTrends] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setShowCategories(true), 400);
          setTimeout(() => setShowTrends(true), 800);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className={cn(
          "text-center mb-16 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <span className="inline-block px-3 py-1 text-xs font-mono text-primary/80 bg-primary/10 rounded-full mb-4">
            The x402 Ecosystem — January 2026
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            High Growth. <span className="text-primary">Low Governance.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            x402 has moved from "experimental" to "early adoption." But the market is lopsided.
          </p>
        </div>

        {/* 90/10 Split Visualization */}
        <div className={cn(
          "mb-16 transition-all duration-700 delay-200",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="relative h-16 rounded-xl overflow-hidden bg-muted/30 border border-border/50">
            {/* 90% Bar */}
            <div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500/30 to-emerald-500/10 flex items-center justify-start pl-6 transition-all duration-1000 ease-out"
              style={{ width: isVisible ? '90%' : '0%' }}
            >
              <span className="text-emerald-400 font-mono font-bold text-lg">90%</span>
              <span className="text-emerald-400/70 ml-2 text-sm hidden sm:inline">Agents Selling (Safe)</span>
            </div>
            
            {/* 10% Bar with pulse */}
            <div 
              className="absolute inset-y-0 right-0 bg-gradient-to-l from-amber-500/30 to-amber-500/10 flex items-center justify-end pr-6 transition-all duration-1000 ease-out delay-300"
              style={{ width: isVisible ? '10%' : '0%' }}
            >
              <span className="text-amber-400 font-mono font-bold text-lg animate-pulse">10%</span>
            </div>
            
            {/* Divider */}
            <div 
              className="absolute inset-y-0 bg-border/50 w-px transition-all duration-1000 ease-out"
              style={{ left: isVisible ? '90%' : '0%' }}
            />
          </div>
          
          <div className="flex justify-between mt-3 text-xs text-muted-foreground font-mono">
            <span>← Earners (Low Risk)</span>
            <span className="text-amber-400">Spenders (High Risk) →</span>
          </div>
        </div>

        {/* The Big Three Categories */}
        <div className={cn(
          "grid md:grid-cols-3 gap-6 mb-16 transition-all duration-700",
          showCategories ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={cn(
                "relative p-6 rounded-2xl border backdrop-blur-sm transition-all duration-500",
                category.bgColor,
                category.borderColor,
                category.blocked && "ring-1 ring-amber-500/30"
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Blocked indicator */}
              {category.blocked && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full">
                  <span className="text-xs font-mono text-amber-400">BLOCKED BY TRUST GAP</span>
                </div>
              )}
              
              <div className="flex items-center gap-3 mb-4">
                <div className={cn("p-2 rounded-lg", category.bgColor)}>
                  <category.icon className={cn("w-5 h-5", category.color)} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">{category.title}</h3>
                  <span className="text-xs text-muted-foreground">{category.subtitle}</span>
                </div>
                {category.percentage && (
                  <span className={cn("ml-auto font-mono font-bold", category.color)}>
                    {category.percentage}%
                  </span>
                )}
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                {category.description}
              </p>
              
              <div className="space-y-2">
                {category.examples.map((example) => (
                  <div 
                    key={example.name}
                    className="flex items-center justify-between py-2 px-3 rounded-lg bg-background/50 border border-border/30"
                  >
                    <div>
                      <span className="text-sm font-medium text-foreground">{example.name}</span>
                      <span className="text-xs text-muted-foreground ml-2">{example.desc}</span>
                    </div>
                    <span className={cn("text-xs font-mono", category.color)}>{example.stat}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Trends */}
        <div className={cn(
          "mb-12 transition-all duration-700",
          showTrends ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <h3 className="text-center text-sm font-mono text-muted-foreground mb-6">
            CURRENT TRENDS
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {trends.map((trend, index) => (
              <div
                key={trend.title}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/30 border border-border/50",
                  "hover:bg-muted/50 hover:border-border transition-all duration-300",
                  trend.title === 'The Trust Wall' && "border-amber-500/30 bg-amber-500/5"
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <trend.icon className={cn(
                  "w-4 h-4",
                  trend.title === 'The Trust Wall' ? "text-amber-400" : "text-primary"
                )} />
                <div>
                  <span className="font-medium text-foreground text-sm">{trend.title}</span>
                  <p className="text-xs text-muted-foreground">{trend.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The Punchline */}
        <div className={cn(
          "text-center max-w-3xl mx-auto transition-all duration-700",
          showTrends ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <blockquote className="text-lg md:text-xl text-muted-foreground italic mb-6">
            "The market is desperate for the 'Buyer Side' to grow — but it won't happen until a CFO can say:{' '}
            <span className="text-foreground font-medium not-italic">
              'I know for a fact this agent won't drain our wallet.'"
            </span>
          </blockquote>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <span className="text-primary font-medium">xBPP is the safety catch that unlocks the Spenders.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
