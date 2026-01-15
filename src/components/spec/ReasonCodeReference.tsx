import { useState } from 'react';
import { Search, Filter, ChevronDown, ChevronRight, Shield, AlertTriangle, XCircle, Info } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  reasonCodeDatabase, 
  getReasonCodeCategories,
  ReasonCodeInfo 
} from '@/lib/xbppEvaluator';
import { cn } from '@/lib/utils';

interface ReasonCodeReferenceProps {
  onSelectCode?: (code: string) => void;
}

const categoryIcons: Record<string, React.ElementType> = {
  Limits: Shield,
  Validation: AlertTriangle,
  Verification: Shield,
  Escalation: AlertTriangle,
  Policy: Info,
  System: Info,
  Emergency: XCircle,
  Currency: Info,
  Gas: Info,
  Chain: Info,
  Counterparty: Info,
  Rate: Info,
  Recurring: Info,
  Preauth: Info,
  Security: XCircle,
  Confidence: AlertTriangle,
  Adversarial: XCircle,
  Resolution: Info,
};

const decisionColors: Record<string, { bg: string; text: string; border: string }> = {
  ALLOW: { bg: 'bg-allow/10', text: 'text-allow', border: 'border-allow/30' },
  BLOCK: { bg: 'bg-block/10', text: 'text-block', border: 'border-block/30' },
  ESCALATE: { bg: 'bg-escalate/10', text: 'text-escalate', border: 'border-escalate/30' },
  varies: { bg: 'bg-muted', text: 'text-muted-foreground', border: 'border-border' },
};

export function ReasonCodeReference({ onSelectCode }: ReasonCodeReferenceProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDecision, setSelectedDecision] = useState<string>('all');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['Limits', 'Security']));

  const categories = getReasonCodeCategories();

  const filteredCodes = reasonCodeDatabase.filter(code => {
    const matchesSearch = searchQuery === '' || 
      code.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      code.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || code.category === selectedCategory;
    const matchesDecision = selectedDecision === 'all' || code.defaultDecision === selectedDecision;

    return matchesSearch && matchesCategory && matchesDecision;
  });

  const groupedCodes = categories.reduce((acc, category) => {
    const codes = filteredCodes.filter(c => c.category === category);
    if (codes.length > 0) {
      acc[category] = codes;
    }
    return acc;
  }, {} as Record<string, ReasonCodeInfo[]>);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  const expandAll = () => {
    setExpandedCategories(new Set(categories));
  };

  const collapseAll = () => {
    setExpandedCategories(new Set());
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h3 className="text-lg font-semibold">xBPP Reason Codes</h3>
          <p className="text-sm text-muted-foreground">
            {filteredCodes.length} of {reasonCodeDatabase.length} reason codes
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={expandAll}>
            Expand All
          </Button>
          <Button variant="ghost" size="sm" onClick={collapseAll}>
            Collapse All
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search reason codes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-muted/30"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-48 bg-muted/30">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(cat => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedDecision} onValueChange={setSelectedDecision}>
          <SelectTrigger className="w-full md:w-48 bg-muted/30">
            <SelectValue placeholder="Decision" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Decisions</SelectItem>
            <SelectItem value="BLOCK">BLOCK</SelectItem>
            <SelectItem value="ESCALATE">ESCALATE</SelectItem>
            <SelectItem value="ALLOW">ALLOW</SelectItem>
            <SelectItem value="varies">Varies by Posture</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Decision Legend */}
      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-block" />
          <span className="text-muted-foreground">Always BLOCK</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-escalate" />
          <span className="text-muted-foreground">Always ESCALATE</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-allow" />
          <span className="text-muted-foreground">Always ALLOW</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-allow via-escalate to-block" />
          <span className="text-muted-foreground">Varies by Posture</span>
        </div>
      </div>

      {/* Grouped Codes */}
      <div className="space-y-4">
        {Object.entries(groupedCodes).map(([category, codes]) => {
          const Icon = categoryIcons[category] || Info;
          const isExpanded = expandedCategories.has(category);

          return (
            <Collapsible key={category} open={isExpanded} onOpenChange={() => toggleCategory(category)}>
              <CollapsibleTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="w-full justify-between p-4 h-auto hover:bg-muted/30"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-primary" />
                    <span className="font-medium">{category}</span>
                    <Badge variant="outline" className="text-xs">
                      {codes.length}
                    </Badge>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-2">
                <div className="grid gap-2 pl-4">
                  {codes.map((code) => {
                    const colors = decisionColors[code.defaultDecision];
                    return (
                      <div
                        key={code.code}
                        className={cn(
                          "p-3 rounded-lg border cursor-pointer transition-colors hover:bg-muted/50",
                          colors.border
                        )}
                        onClick={() => onSelectCode?.(code.code)}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <code className="text-sm font-mono font-semibold">
                                {code.code}
                              </code>
                              <Badge 
                                variant="outline" 
                                className={cn("text-xs", colors.bg, colors.text, colors.border)}
                              >
                                {code.defaultDecision}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {code.description}
                            </p>
                          </div>
                          <Badge variant="outline" className="text-xs shrink-0">
                            {code.phase}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CollapsibleContent>
            </Collapsible>
          );
        })}
      </div>

      {filteredCodes.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Search className="h-12 w-12 mx-auto mb-4 opacity-30" />
          <p>No reason codes match your filters</p>
        </div>
      )}
    </div>
  );
}
