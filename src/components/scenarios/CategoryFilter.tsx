import { cn } from '@/lib/utils';
import { Category } from '@/lib/types';
import { Wallet, PenTool, Shield, Layers } from 'lucide-react';

type FilterOption = 'ALL' | Category;

interface CategoryFilterProps {
  selected: FilterOption;
  onChange: (category: FilterOption) => void;
  counts: Record<FilterOption, number>;
}

const filters: { value: FilterOption; label: string; icon: React.ReactNode; color: string }[] = [
  { value: 'ALL', label: 'All Scenarios', icon: <Layers className="h-4 w-4" />, color: 'text-foreground' },
  { value: 'SPEND', label: 'Spend', icon: <Wallet className="h-4 w-4" />, color: 'text-primary' },
  { value: 'SIGN', label: 'Sign', icon: <PenTool className="h-4 w-4" />, color: 'text-escalate' },
  { value: 'DEFENSE', label: 'Defense', icon: <Shield className="h-4 w-4" />, color: 'text-block' },
];

export function CategoryFilter({ selected, onChange, counts }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {filters.map((filter, index) => {
        const isSelected = selected === filter.value;
        
        return (
          <button
            key={filter.value}
            onClick={() => onChange(filter.value)}
            className={cn(
              "relative flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-all duration-300 animate-fade-in",
              isSelected 
                ? "border-primary/50 bg-primary/10" 
                : "border-border/50 bg-card/30 hover:bg-card/60 hover:border-border",
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <span className={cn(
              "transition-colors",
              isSelected ? filter.color : "text-muted-foreground"
            )}>
              {filter.icon}
            </span>
            <span className={cn(
              "text-sm font-medium transition-colors",
              isSelected ? "text-foreground" : "text-muted-foreground"
            )}>
              {filter.label}
            </span>
            <span className={cn(
              "text-xs font-mono px-1.5 py-0.5 rounded-full transition-colors",
              isSelected ? "bg-primary/20 text-primary" : "bg-muted/50 text-muted-foreground"
            )}>
              {counts[filter.value]}
            </span>
            
            {/* Animated underline */}
            <div className={cn(
              "absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary rounded-full transition-all duration-300",
              isSelected ? "w-8 opacity-100" : "w-0 opacity-0"
            )} />
          </button>
        );
      })}
    </div>
  );
}
