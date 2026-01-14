import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Scenario, Category, RiskLevel } from '@/lib/types';
import { CategoryIcon } from './CategoryIcon';
import { useRef, useState } from 'react';

interface ScenarioCardProps {
  scenario: Scenario;
  index: number;
  featured?: boolean;
}

const categoryColors: Record<Category, { border: string; bg: string; text: string; glow: string }> = {
  SPEND: { 
    border: 'border-primary/30', 
    bg: 'bg-primary/5', 
    text: 'text-primary',
    glow: 'hover:shadow-[0_0_40px_-10px_hsl(var(--primary)/0.4)]'
  },
  SIGN: { 
    border: 'border-escalate/30', 
    bg: 'bg-escalate/5', 
    text: 'text-escalate',
    glow: 'hover:shadow-[0_0_40px_-10px_hsl(var(--decision-escalate)/0.4)]'
  },
  DEFENSE: { 
    border: 'border-block/30', 
    bg: 'bg-block/5', 
    text: 'text-block',
    glow: 'hover:shadow-[0_0_40px_-10px_hsl(var(--decision-block)/0.4)]'
  },
};

const riskConfig: Record<RiskLevel, { bg: string; text: string; pulse: boolean }> = {
  LOW: { bg: 'bg-allow/15', text: 'text-allow', pulse: false },
  MEDIUM: { bg: 'bg-escalate/15', text: 'text-escalate', pulse: false },
  HIGH: { bg: 'bg-block/15', text: 'text-block', pulse: true },
};

export function ScenarioCard({ scenario, index, featured = false }: ScenarioCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const colors = categoryColors[scenario.category];
  const risk = riskConfig[scenario.risk_level];

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    setMousePosition({ x, y });
  };

  return (
    <Link
      ref={cardRef}
      to={`/compare?scenario=${scenario.id}`}
      className={cn(
        "group block animate-fade-in relative",
        featured && "md:col-span-2"
      )}
      style={{ 
        animationDelay: `${index * 80}ms`,
        transform: isHovered ? `perspective(1000px) rotateX(${-mousePosition.y}deg) rotateY(${mousePosition.x}deg)` : 'none',
        transition: 'transform 0.1s ease-out'
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
    >
      <div 
        className={cn(
          "h-full rounded-xl border bg-card/50 backdrop-blur-sm transition-all duration-500 overflow-hidden",
          colors.border,
          colors.glow,
          "hover:bg-card/80 hover:border-opacity-60",
          featured ? "p-10" : "p-8"
        )}
      >
        {/* Animated gradient border effect */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className={cn(
            "absolute inset-0 rounded-xl",
            "bg-gradient-to-br from-transparent via-transparent to-transparent",
            scenario.category === 'SPEND' && "group-hover:bg-gradient-to-br group-hover:from-primary/10 group-hover:via-transparent group-hover:to-primary/5",
            scenario.category === 'SIGN' && "group-hover:bg-gradient-to-br group-hover:from-escalate/10 group-hover:via-transparent group-hover:to-escalate/5",
            scenario.category === 'DEFENSE' && "group-hover:bg-gradient-to-br group-hover:from-block/10 group-hover:via-transparent group-hover:to-block/5"
          )} />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Top row: Category + Risk + Icon */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex flex-col gap-3">
              <span className={cn(
                "inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono uppercase tracking-wider w-fit",
                colors.border, colors.bg, colors.text
              )}>
                {scenario.category}
              </span>
              <span className={cn(
                "inline-flex items-center px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider relative w-fit",
                risk.bg, risk.text
              )}>
                {risk.pulse && (
                  <span className="absolute inset-0 rounded-full bg-block/20 animate-pulse" />
                )}
                <span className="relative">{scenario.risk_level} RISK</span>
              </span>
            </div>
            
            {/* Animated category icon */}
            <div className="opacity-50 group-hover:opacity-100 transition-opacity">
              <CategoryIcon category={scenario.category} size={featured ? "lg" : "md"} />
            </div>
          </div>
          
          {/* Title */}
          <h2 className={cn(
            "font-medium mb-4 group-hover:text-primary transition-colors",
            featured ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl"
          )}>
            {scenario.name}
          </h2>
          
          {/* Narrative */}
          <p className={cn(
            "text-muted-foreground leading-relaxed mb-6",
            featured ? "text-lg" : "text-base"
          )}>
            "{scenario.narrative}"
          </p>

          {/* Event timeline preview on hover */}
          <div className={cn(
            "flex items-center gap-1.5 mb-6 h-2 transition-opacity",
            isHovered ? "opacity-100" : "opacity-0"
          )}>
            {scenario.event_stream.slice(0, 8).map((event, i) => (
              <div
                key={event.id}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  event.type === 'decision' ? "w-3 bg-primary" : "w-1.5 bg-muted-foreground/30",
                )}
                style={{ transitionDelay: `${i * 30}ms` }}
              />
            ))}
            {scenario.event_stream.length > 8 && (
              <span className="text-xs text-muted-foreground ml-1">+{scenario.event_stream.length - 8}</span>
            )}
          </div>
          
          {/* CTA */}
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm font-medium text-primary">
              <Sparkles className="mr-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="group-hover:translate-x-1 transition-transform">
                Compare policies
              </span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
            </div>
            
            {/* Event count */}
            <span className="text-xs font-mono text-muted-foreground/50">
              {scenario.event_stream.length} events
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
