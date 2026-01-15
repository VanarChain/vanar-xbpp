import { useState, useMemo } from 'react';
import { 
  Play, CheckCircle, XCircle, AlertCircle, DollarSign, User, Zap, Shield, 
  AlertTriangle, Globe, Fuel, Clock, Lock, Skull, Activity, ChevronDown, ChevronUp,
  Layers, RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { PolicyConfig, Posture } from '@/lib/types';
import { 
  TransactionInput, 
  ExtendedPolicyConfig, 
  EvaluationResult,
  evaluateTransaction, 
  getDefaultTransactionInput,
  getReasonCodeInfo
} from '@/lib/xbppEvaluator';
import { cn } from '@/lib/utils';

interface AdvancedVerdictSimulatorProps {
  config: PolicyConfig;
}

const getPostureConfig = (posture: Posture) => {
  switch (posture) {
    case 'AGGRESSIVE':
      return { icon: Zap, color: 'text-escalate', bg: 'bg-escalate/10' };
    case 'BALANCED':
      return { icon: Shield, color: 'text-primary', bg: 'bg-primary/10' };
    case 'CAUTIOUS':
      return { icon: AlertTriangle, color: 'text-allow', bg: 'bg-allow/10' };
  }
};

const CHAINS = [
  { value: 'base', label: 'Base' },
  { value: 'ethereum', label: 'Ethereum' },
  { value: 'arbitrum', label: 'Arbitrum' },
  { value: 'optimism', label: 'Optimism' },
  { value: 'polygon', label: 'Polygon' },
  { value: 'unknown', label: 'Unknown Chain' },
];

const CURRENCIES = [
  { value: 'USDC', label: 'USDC' },
  { value: 'USDT', label: 'USDT' },
  { value: 'ETH', label: 'ETH' },
  { value: 'DAI', label: 'DAI' },
  { value: 'UNKNOWN', label: 'Unknown Token' },
];

export function AdvancedVerdictSimulator({ config }: AdvancedVerdictSimulatorProps) {
  const [input, setInput] = useState<TransactionInput>(getDefaultTransactionInput());
  const [hasRun, setHasRun] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const extendedConfig: ExtendedPolicyConfig = {
    ...config,
    maxWeekly: config.maxWeekly,
    allowedChains: ['base', 'ethereum', 'arbitrum', 'optimism'],
  };

  const result = useMemo(() => {
    if (!hasRun) return null;
    return evaluateTransaction(input, extendedConfig);
  }, [input, extendedConfig, hasRun]);

  const handleRun = () => {
    setHasRun(true);
  };

  const handleReset = () => {
    setInput(getDefaultTransactionInput());
    setHasRun(false);
  };

  const updateInput = <K extends keyof TransactionInput>(key: K, value: TransactionInput[K]) => {
    setInput(prev => ({ ...prev, [key]: value }));
    setHasRun(false);
  };

  const postureConfig = getPostureConfig(config.posture);

  return (
    <div className="space-y-6">
      {/* Policy Summary */}
      <div className="p-4 rounded-lg bg-muted/30 border border-border">
        <p className="text-sm text-muted-foreground mb-2">Testing against policy with:</p>
        <div className="flex flex-wrap gap-3 text-sm">
          <span className={cn("px-2 py-0.5 rounded font-mono", postureConfig.bg, postureConfig.color)}>
            {config.posture}
          </span>
          <span className="text-muted-foreground">Max: <span className="text-foreground font-mono">${config.maxSingle.toLocaleString()}</span></span>
          <span className="text-muted-foreground">Daily: <span className="text-foreground font-mono">${config.maxDaily.toLocaleString()}</span></span>
          <span className="text-muted-foreground">Human above: <span className="text-foreground font-mono">${config.requireHumanAbove.toLocaleString()}</span></span>
        </div>
      </div>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic" className="flex items-center gap-1">
            <DollarSign className="h-3 w-3" />
            Basic
          </TabsTrigger>
          <TabsTrigger value="chain" className="flex items-center gap-1">
            <Globe className="h-3 w-3" />
            Chain
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-1">
            <Skull className="h-3 w-3" />
            Security
          </TabsTrigger>
          <TabsTrigger value="rate" className="flex items-center gap-1">
            <Activity className="h-3 w-3" />
            Rate
          </TabsTrigger>
        </TabsList>

        {/* Basic Tab */}
        <TabsContent value="basic" className="space-y-4 mt-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-primary" />
                Transaction Amount
              </Label>
              <Input
                id="amount"
                type="number"
                value={input.amount}
                onChange={(e) => updateInput('amount', parseFloat(e.target.value) || 0)}
                className="bg-muted/30 font-mono"
              />
            </div>

            <div className="space-y-2">
              <Label>Currency</Label>
              <Select value={input.currency} onValueChange={(v) => updateInput('currency', v)}>
                <SelectTrigger className="bg-muted/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CURRENCIES.map(c => (
                    <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dailySpent">Already Spent Today</Label>
              <Input
                id="dailySpent"
                type="number"
                value={input.dailySpent}
                onChange={(e) => updateInput('dailySpent', parseFloat(e.target.value) || 0)}
                className="bg-muted/30 font-mono"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confidence">Agent Confidence (0-1)</Label>
              <Input
                id="confidence"
                type="number"
                step="0.05"
                min="0"
                max="1"
                value={input.confidence}
                onChange={(e) => updateInput('confidence', parseFloat(e.target.value) || 0.85)}
                className="bg-muted/30 font-mono"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border">
              <Label htmlFor="newCounterparty" className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                New Counterparty
              </Label>
              <Switch
                id="newCounterparty"
                checked={input.isNewCounterparty}
                onCheckedChange={(v) => updateInput('isNewCounterparty', v)}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border">
              <Label htmlFor="verified" className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
                Verified Recipient
              </Label>
              <Switch
                id="verified"
                checked={input.isVerified}
                onCheckedChange={(v) => updateInput('isVerified', v)}
              />
            </div>
          </div>
        </TabsContent>

        {/* Chain Tab */}
        <TabsContent value="chain" className="space-y-4 mt-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-primary" />
                Destination Chain
              </Label>
              <Select value={input.chain} onValueChange={(v) => updateInput('chain', v)}>
                <SelectTrigger className="bg-muted/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CHAINS.map(c => (
                    <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contractAge">Contract Age (hours)</Label>
              <Input
                id="contractAge"
                type="number"
                value={input.contractAgeHours}
                onChange={(e) => updateInput('contractAgeHours', parseFloat(e.target.value) || 0)}
                className="bg-muted/30 font-mono"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border">
              <Label className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-muted-foreground" />
                Cross-Chain Transaction
              </Label>
              <Switch
                checked={input.isCrossChain}
                onCheckedChange={(v) => updateInput('isCrossChain', v)}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border">
              <Label className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 text-muted-foreground" />
                Bridge Transaction
              </Label>
              <Switch
                checked={input.isBridge}
                onCheckedChange={(v) => updateInput('isBridge', v)}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border">
              <Label className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                Agent-to-Agent Payment
              </Label>
              <Switch
                checked={input.isAgentToAgent}
                onCheckedChange={(v) => updateInput('isAgentToAgent', v)}
              />
            </div>
          </div>

          {/* Gas Section */}
          <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between">
                <span className="flex items-center gap-2">
                  <Fuel className="h-4 w-4" />
                  Gas Settings
                </span>
                {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 pt-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gasEstimate">Gas Estimate ($)</Label>
                  <Input
                    id="gasEstimate"
                    type="number"
                    value={input.gasEstimate}
                    onChange={(e) => updateInput('gasEstimate', parseFloat(e.target.value) || 0)}
                    className="bg-muted/30 font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gasMax">Gas Max Willing ($)</Label>
                  <Input
                    id="gasMax"
                    type="number"
                    value={input.gasMaxWilling}
                    onChange={(e) => updateInput('gasMaxWilling', parseFloat(e.target.value) || 0)}
                    className="bg-muted/30 font-mono"
                  />
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-4 mt-4">
          <p className="text-sm text-muted-foreground">
            Toggle security threat flags to test how the policy responds to known attack patterns.
          </p>
          
          <div className="grid md:grid-cols-2 gap-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-block/5 border border-block/20">
              <Label className="flex items-center gap-2">
                <Skull className="h-4 w-4 text-block" />
                Address Poisoning
              </Label>
              <Switch
                checked={input.addressPoisoning}
                onCheckedChange={(v) => updateInput('addressPoisoning', v)}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-block/5 border border-block/20">
              <Label className="flex items-center gap-2">
                <Skull className="h-4 w-4 text-block" />
                Drainer Contract
              </Label>
              <Switch
                checked={input.drainerContract}
                onCheckedChange={(v) => updateInput('drainerContract', v)}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-block/5 border border-block/20">
              <Label className="flex items-center gap-2">
                <Skull className="h-4 w-4 text-block" />
                Honeypot Token
              </Label>
              <Switch
                checked={input.honeypotToken}
                onCheckedChange={(v) => updateInput('honeypotToken', v)}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-block/5 border border-block/20">
              <Label className="flex items-center gap-2">
                <Skull className="h-4 w-4 text-block" />
                Phishing Signature
              </Label>
              <Switch
                checked={input.phishingSignature}
                onCheckedChange={(v) => updateInput('phishingSignature', v)}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-escalate/5 border border-escalate/20">
              <Label className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-escalate" />
                Unverified Contract
              </Label>
              <Switch
                checked={input.unverifiedContract}
                onCheckedChange={(v) => updateInput('unverifiedContract', v)}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-escalate/5 border border-escalate/20">
              <Label className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-escalate" />
                Admin Key Detected
              </Label>
              <Switch
                checked={input.adminKeyDetected}
                onCheckedChange={(v) => updateInput('adminKeyDetected', v)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fragmentation">Recent Actions to Same Address</Label>
            <Input
              id="fragmentation"
              type="number"
              value={input.recentActionsToSameAddress}
              onChange={(e) => updateInput('recentActionsToSameAddress', parseInt(e.target.value) || 0)}
              className="bg-muted/30 font-mono"
              placeholder="0"
            />
            <p className="text-xs text-muted-foreground">
              Fragmentation detection triggers at 5+ rapid actions to same address
            </p>
          </div>
        </TabsContent>

        {/* Rate Limits Tab */}
        <TabsContent value="rate" className="space-y-4 mt-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="actionsMinute" className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                Actions This Minute
              </Label>
              <Input
                id="actionsMinute"
                type="number"
                value={input.actionsThisMinute}
                onChange={(e) => updateInput('actionsThisMinute', parseInt(e.target.value) || 0)}
                className="bg-muted/30 font-mono"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="actionsHour">Actions This Hour</Label>
              <Input
                id="actionsHour"
                type="number"
                value={input.actionsThisHour}
                onChange={(e) => updateInput('actionsThisHour', parseInt(e.target.value) || 0)}
                className="bg-muted/30 font-mono"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="actionsDay">Actions Today</Label>
              <Input
                id="actionsDay"
                type="number"
                value={input.actionsToday}
                onChange={(e) => updateInput('actionsToday', parseInt(e.target.value) || 0)}
                className="bg-muted/30 font-mono"
              />
            </div>
          </div>

          <div className="p-4 rounded-lg bg-muted/30 border border-border">
            <h4 className="text-sm font-medium mb-3">Recurring Payment</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4 text-muted-foreground" />
                  Is Recurring Payment
                </Label>
                <Switch
                  checked={input.isRecurring}
                  onCheckedChange={(v) => updateInput('isRecurring', v)}
                />
              </div>

              {input.isRecurring && (
                <>
                  <div className="flex items-center justify-between">
                    <Label>First Instance</Label>
                    <Switch
                      checked={input.isFirstRecurring}
                      onCheckedChange={(v) => updateInput('isFirstRecurring', v)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="variance">Price Variance from Original (%)</Label>
                    <Input
                      id="variance"
                      type="number"
                      step="0.01"
                      value={input.recurringVariance * 100}
                      onChange={(e) => updateInput('recurringVariance', (parseFloat(e.target.value) || 0) / 100)}
                      className="bg-muted/30 font-mono"
                      placeholder="0"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button onClick={handleRun} className="flex-1" size="lg">
          <Play className="h-4 w-4 mr-2" />
          Evaluate Transaction
        </Button>
        <Button onClick={handleReset} variant="outline" size="lg">
          Reset
        </Button>
      </div>

      {/* Result Display */}
      {hasRun && result && (
        <div className="space-y-4">
          {/* Verdict Card */}
          <div className={cn(
            "p-6 rounded-xl border-2 text-center",
            result.verdict === 'ALLOW' && "bg-allow/10 border-allow/50",
            result.verdict === 'BLOCK' && "bg-block/10 border-block/50",
            result.verdict === 'ESCALATE' && "bg-escalate/10 border-escalate/50"
          )}>
            <div className="flex items-center justify-center gap-3 mb-2">
              {result.verdict === 'ALLOW' && <CheckCircle className="h-8 w-8 text-allow" />}
              {result.verdict === 'BLOCK' && <XCircle className="h-8 w-8 text-block" />}
              {result.verdict === 'ESCALATE' && <AlertCircle className="h-8 w-8 text-escalate" />}
              <span className={cn(
                "text-3xl font-mono font-bold",
                result.verdict === 'ALLOW' && "text-allow",
                result.verdict === 'BLOCK' && "text-block",
                result.verdict === 'ESCALATE' && "text-escalate"
              )}>
                {result.verdict}
              </span>
            </div>
            <Badge variant="outline" className="mb-2">{result.phase}</Badge>
            <p className="text-sm text-muted-foreground">{result.explanation}</p>
          </div>

          {/* Reason Codes */}
          {result.reasonCodes.length > 0 && (
            <div className="p-4 rounded-lg bg-muted/30 border border-border">
              <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">Reason Codes</p>
              <div className="flex flex-wrap gap-2">
                {result.reasonCodes.map((code) => {
                  const info = getReasonCodeInfo(code);
                  return (
                    <div
                      key={code}
                      className={cn(
                        "px-2 py-1 rounded text-xs font-mono",
                        result.verdict === 'ALLOW' && "bg-allow/20 text-allow",
                        result.verdict === 'BLOCK' && "bg-block/20 text-block",
                        result.verdict === 'ESCALATE' && "bg-escalate/20 text-escalate"
                      )}
                      title={info?.description}
                    >
                      {code}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Checks Summary */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-allow/5 border border-allow/20">
              <p className="text-xs font-mono uppercase tracking-wider text-allow mb-2">
                Checks Passed ({result.checksPassed.length})
              </p>
              <div className="flex flex-wrap gap-1">
                {result.checksPassed.map((check) => (
                  <Badge key={check} variant="outline" className="text-allow border-allow/30 text-xs">
                    {check}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="p-4 rounded-lg bg-block/5 border border-block/20">
              <p className="text-xs font-mono uppercase tracking-wider text-block mb-2">
                Checks Failed ({result.checksFailed.length})
              </p>
              <div className="flex flex-wrap gap-1">
                {result.checksFailed.length === 0 ? (
                  <span className="text-xs text-muted-foreground">None</span>
                ) : (
                  result.checksFailed.map((check) => (
                    <Badge key={check} variant="outline" className="text-block border-block/30 text-xs">
                      {check}
                    </Badge>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
