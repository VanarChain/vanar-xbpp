import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Lock, Globe, Building2, Cpu, CreditCard, Landmark } from 'lucide-react';

const ecosystemPlayers = [
  {
    name: 'Crossmint',
    icon: Building2,
    action: 'Building wallets for agents',
    color: '#3B82F6',
  },
  {
    name: 'Kite AI',
    icon: Cpu,
    action: 'Building the Agentic Internet layer',
    color: '#10B981',
  },
  {
    name: 'Visa',
    icon: CreditCard,
    action: 'Researching Trusted Agent Registries',
    color: '#8B5CF6',
  },
  {
    name: 'Coinbase',
    icon: Landmark,
    action: 'Exploring agent authentication standards',
    color: '#F59E0B',
  },
];

export function WhyNowSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPlayers, setShowPlayers] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setShowPlayers(true), 600);
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
    <section ref={sectionRef} className="py-24 md:py-32 px-6 lg:px-12 relative overflow-hidden" style={{ background: '#EDEDEA' }}>
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(62, 207, 165, 0.08) 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="section-label justify-center mb-6">THE VISION</div>
          <h2
            className={cn(
              "transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
            style={{
              fontFamily: "'Bebas Neue', Impact, sans-serif",
              fontSize: 'clamp(32px, 6vw, 56px)',
              lineHeight: 0.95,
              fontStyle: 'italic',
              letterSpacing: '-1px',
              textTransform: 'uppercase',
              color: '#1E2D2D',
            }}
          >
            IN THE NEAR FUTURE, NO AUTONOMOUS AGENT
            <br />
            WILL EXECUTE WITHOUT A <span style={{ color: '#3ECFA5' }}>SIGNED VERDICT</span>.
          </h2>
        </div>

        {/* Ecosystem Context */}
        <div className={cn(
          "mb-12 transition-all duration-700 delay-200",
          showPlayers ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <p className="text-center text-sm font-mono uppercase tracking-widest mb-10" style={{ color: '#9E9E98' }}>
            Market Context: The Agentic Economy
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {ecosystemPlayers.map((player, index) => (
              <div
                key={player.name}
                className="relative p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                  background: 'white',
                  border: '1px solid #E2E2DE',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                }}
              >
                <div className="p-2.5 rounded-lg w-fit mb-4" style={{ background: `${player.color}15` }}>
                  <player.icon className="w-5 h-5" style={{ color: player.color }} />
                </div>
                <h4 className="font-bold text-sm mb-2 uppercase tracking-wider" style={{ color: '#1E2D2D' }}>{player.name}</h4>
                <p className="text-xs leading-relaxed" style={{ color: '#6B6B67' }}>{player.action}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm mt-10 italic max-w-2xl mx-auto" style={{ color: '#6B6B67' }}>
            Emerging platforms are standardizing infrastructure. They're all waiting for the same missing piece: <span style={{ color: '#1E2D2D', fontStyle: 'normal', fontWeight: 500 }}>a shared standard for agent governance.</span>
          </p>
        </div>

        <div className={cn(
          "flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 mb-12 transition-all duration-700 delay-300",
          isVisible ? "opacity-100" : "opacity-0"
        )}>
          <div className="flex items-center gap-3 px-6 py-4 rounded-xl ferron-card">
            <Lock className="h-6 w-6" style={{ color: '#6B6B67' }} />
            <div>
              <p className="text-sm" style={{ color: '#9E9E98' }}>SSL</p>
              <p className="font-medium" style={{ color: '#1E2D2D' }}>Standard for moving data</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-6 py-4 rounded-xl" style={{ background: 'rgba(62, 207, 165, 0.1)', border: '1px solid rgba(62, 207, 165, 0.3)' }}>
            <Globe className="h-6 w-6" style={{ color: '#3ECFA5' }} />
            <div>
              <p className="text-sm" style={{ color: '#3ECFA5' }}>xBPP</p>
              <p className="font-medium" style={{ color: '#1E2D2D' }}>Standard for moving value</p>
            </div>
          </div>
        </div>

        <div className={cn(
          "text-center transition-all duration-700 delay-500",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <p className="text-xl mb-4" style={{ color: '#6B6B67' }}>
            xBPP transforms the "Wild West" of on-chain agents into a
          </p>
          <p className="text-2xl md:text-3xl font-medium" style={{ color: '#1E2D2D' }}>
            reliable, <span style={{ color: '#4ADE80' }}>insurable</span>, and <span style={{ color: '#3ECFA5' }}>scalable</span> economy.
          </p>
        </div>
      </div>
    </section>
  );
}
