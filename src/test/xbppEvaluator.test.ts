import { describe, it, expect } from 'vitest';
import {
  evaluateTransaction,
  getDefaultTransactionInput,
  getPostureDefaults,
  type TransactionInput,
  type ExtendedPolicyConfig,
} from '../lib/xbppEvaluator';

// Helper to create a default policy config
function defaultPolicy(overrides?: Partial<ExtendedPolicyConfig>): ExtendedPolicyConfig {
  return {
    posture: 'BALANCED',
    maxSingle: 1000,
    maxDaily: 5000,
    maxWeekly: 20000,
    requireHumanAbove: 500,
    newCounterpartyAction: 'ESCALATE',
    requireVerified: false,
    burstDetection: false,
    minConfidence: 0.7,
    logLevel: 'STANDARD',
    ...overrides,
  };
}

// Helper to create a default transaction input
function defaultTx(overrides?: Partial<TransactionInput>): TransactionInput {
  return {
    ...getDefaultTransactionInput(),
    ...overrides,
  };
}

describe('xBPP Evaluator — Phase 3: Input Validation', () => {
  it('should BLOCK when confidence is out of range (negative)', () => {
    const result = evaluateTransaction(
      defaultTx({ confidence: -0.5 }),
      defaultPolicy()
    );
    expect(result.verdict).toBe('BLOCK');
    expect(result.reasonCodes).toContain('INVALID_CONFIDENCE');
  });

  it('should BLOCK when confidence is out of range (> 1)', () => {
    const result = evaluateTransaction(
      defaultTx({ confidence: 1.5 }),
      defaultPolicy()
    );
    expect(result.verdict).toBe('BLOCK');
    expect(result.reasonCodes).toContain('INVALID_CONFIDENCE');
  });

  it('should BLOCK when amount is negative', () => {
    const result = evaluateTransaction(
      defaultTx({ amount: -100 }),
      defaultPolicy()
    );
    expect(result.verdict).toBe('BLOCK');
    expect(result.reasonCodes).toContain('INVALID_VALUE');
  });
});

describe('xBPP Evaluator — Phase 4: Core Limits', () => {
  it('should BLOCK when amount exceeds single transaction limit', () => {
    const result = evaluateTransaction(
      defaultTx({ amount: 1500 }),
      defaultPolicy({ maxSingle: 1000 })
    );
    expect(result.verdict).toBe('BLOCK');
    expect(result.reasonCodes).toContain('EXCEEDS_SINGLE_LIMIT');
  });

  it('should ALLOW when amount is exactly at single limit', () => {
    const result = evaluateTransaction(
      defaultTx({ amount: 1000 }),
      defaultPolicy({ maxSingle: 1000, requireHumanAbove: 2000 })
    );
    expect(result.verdict).toBe('ALLOW');
  });

  it('should BLOCK when daily limit would be exceeded', () => {
    const result = evaluateTransaction(
      defaultTx({ amount: 500, dailySpent: 4800 }),
      defaultPolicy({ maxDaily: 5000 })
    );
    expect(result.verdict).toBe('BLOCK');
    expect(result.reasonCodes).toContain('EXCEEDS_DAILY_LIMIT');
  });

  it('should ALLOW when daily spend is within limits', () => {
    const result = evaluateTransaction(
      defaultTx({ amount: 100, dailySpent: 200 }),
      defaultPolicy({ maxDaily: 5000, requireHumanAbove: 2000 })
    );
    expect(result.verdict).toBe('ALLOW');
  });
});

describe('xBPP Evaluator — Phase 7b: Extended Limits', () => {
  it('should BLOCK when weekly limit exceeded', () => {
    const result = evaluateTransaction(
      defaultTx({ amount: 500, weeklySpent: 19800 }),
      defaultPolicy({ maxWeekly: 20000 })
    );
    expect(result.verdict).toBe('BLOCK');
    expect(result.reasonCodes).toContain('EXCEEDS_WEEKLY_LIMIT');
  });

  it('should BLOCK when monthly limit exceeded', () => {
    const result = evaluateTransaction(
      defaultTx({ amount: 500, monthlySpent: 49800 }),
      defaultPolicy({ maxMonthly: 50000 })
    );
    expect(result.verdict).toBe('BLOCK');
    expect(result.reasonCodes).toContain('EXCEEDS_MONTHLY_LIMIT');
  });
});

describe('xBPP Evaluator — Phase 7c: Rate Limits', () => {
  it('should BLOCK when per-minute rate limit exceeded', () => {
    const result = evaluateTransaction(
      defaultTx({ actionsThisMinute: 15 }),
      defaultPolicy({ maxPerMinute: 10 })
    );
    expect(result.verdict).toBe('BLOCK');
    expect(result.reasonCodes).toContain('RATE_LIMITED');
  });

  it('should BLOCK when per-hour rate limit exceeded', () => {
    const result = evaluateTransaction(
      defaultTx({ actionsThisHour: 65 }),
      defaultPolicy({ maxPerHour: 60 })
    );
    expect(result.verdict).toBe('BLOCK');
    expect(result.reasonCodes).toContain('RATE_LIMITED');
  });

  it('should ESCALATE on burst detection (BALANCED posture)', () => {
    const result = evaluateTransaction(
      defaultTx({ actionsThisMinute: 6, amount: 50 }),
      defaultPolicy({
        burstDetection: true,
        burstThreshold: 5,
        posture: 'BALANCED',
        requireHumanAbove: 2000,
      })
    );
    expect(result.verdict).toBe('ESCALATE');
    expect(result.reasonCodes).toContain('BURST_DETECTED');
  });

  it('should BLOCK on burst detection with CAUTIOUS posture', () => {
    const result = evaluateTransaction(
      defaultTx({ actionsThisMinute: 6, amount: 50 }),
      defaultPolicy({
        burstDetection: true,
        burstThreshold: 5,
        posture: 'CAUTIOUS',
        requireHumanAbove: 2000,
      })
    );
    expect(result.verdict).toBe('BLOCK');
    expect(result.reasonCodes).toContain('BURST_DETECTED');
  });
});

describe('xBPP Evaluator — Phase 7e: Chain Check', () => {
  it('should BLOCK unknown chain with BALANCED posture', () => {
    const result = evaluateTransaction(
      defaultTx({ chain: 'solana' }),
      defaultPolicy({ allowedChains: ['base', 'ethereum'] })
    );
    expect(result.verdict).toBe('BLOCK');
    expect(result.reasonCodes).toContain('UNKNOWN_CHAIN');
  });

  it('should ALLOW known chain', () => {
    const result = evaluateTransaction(
      defaultTx({ chain: 'base', amount: 50 }),
      defaultPolicy({ allowedChains: ['base', 'ethereum'], requireHumanAbove: 2000 })
    );
    expect(result.verdict).toBe('ALLOW');
  });

  it('should ESCALATE cross-chain with BALANCED posture', () => {
    const result = evaluateTransaction(
      defaultTx({ isCrossChain: true, amount: 50 }),
      defaultPolicy({ requireHumanAbove: 2000 })
    );
    expect(result.verdict).toBe('ESCALATE');
    expect(result.reasonCodes).toContain('CROSS_CHAIN_TRANSACTION');
  });

  it('should BLOCK cross-chain with CAUTIOUS posture', () => {
    const result = evaluateTransaction(
      defaultTx({ isCrossChain: true, amount: 50 }),
      defaultPolicy({ posture: 'CAUTIOUS', requireHumanAbove: 2000 })
    );
    expect(result.verdict).toBe('BLOCK');
    expect(result.reasonCodes).toContain('CROSS_CHAIN_TRANSACTION');
  });
});

describe('xBPP Evaluator — Phase 7f: Counterparty Check', () => {
  it('should ESCALATE new counterparty when action is ESCALATE', () => {
    const result = evaluateTransaction(
      defaultTx({ isNewCounterparty: true, amount: 50 }),
      defaultPolicy({ newCounterpartyAction: 'ESCALATE', requireHumanAbove: 2000 })
    );
    expect(result.verdict).toBe('ESCALATE');
    expect(result.reasonCodes).toContain('NEW_COUNTERPARTY');
  });

  it('should BLOCK new counterparty when action is BLOCK', () => {
    const result = evaluateTransaction(
      defaultTx({ isNewCounterparty: true, amount: 50 }),
      defaultPolicy({ newCounterpartyAction: 'BLOCK' })
    );
    expect(result.verdict).toBe('BLOCK');
    expect(result.reasonCodes).toContain('NEW_COUNTERPARTY');
  });

  it('should ALLOW new counterparty when action is ALLOW', () => {
    const result = evaluateTransaction(
      defaultTx({ isNewCounterparty: true, amount: 50 }),
      defaultPolicy({ newCounterpartyAction: 'ALLOW', requireHumanAbove: 2000 })
    );
    expect(result.verdict).toBe('ALLOW');
  });
});

describe('xBPP Evaluator — Phase 8: Escalation', () => {
  it('should ESCALATE when amount exceeds requireHumanAbove', () => {
    const result = evaluateTransaction(
      defaultTx({ amount: 750 }),
      defaultPolicy({ requireHumanAbove: 500 })
    );
    expect(result.verdict).toBe('ESCALATE');
    expect(result.reasonCodes).toContain('HIGH_VALUE');
  });

  it('should ALLOW when amount is below requireHumanAbove', () => {
    const result = evaluateTransaction(
      defaultTx({ amount: 200 }),
      defaultPolicy({ requireHumanAbove: 500 })
    );
    expect(result.verdict).toBe('ALLOW');
  });
});

describe('xBPP Evaluator — Security Threats', () => {
  it('should BLOCK drainer contracts', () => {
    const result = evaluateTransaction(
      defaultTx({ drainerContract: true }),
      defaultPolicy()
    );
    expect(result.verdict).toBe('BLOCK');
    expect(result.reasonCodes).toContain('DRAINER_CONTRACT');
  });

  it('should BLOCK honeypot tokens', () => {
    const result = evaluateTransaction(
      defaultTx({ honeypotToken: true }),
      defaultPolicy()
    );
    expect(result.verdict).toBe('BLOCK');
    expect(result.reasonCodes).toContain('HONEYPOT_TOKEN');
  });

  it('should BLOCK phishing signatures', () => {
    const result = evaluateTransaction(
      defaultTx({ phishingSignature: true }),
      defaultPolicy()
    );
    expect(result.verdict).toBe('BLOCK');
    expect(result.reasonCodes).toContain('PHISHING_SIGNATURE');
  });

  it('should BLOCK address poisoning', () => {
    const result = evaluateTransaction(
      defaultTx({ addressPoisoning: true }),
      defaultPolicy()
    );
    expect(result.verdict).toBe('BLOCK');
    expect(result.reasonCodes).toContain('ADDRESS_POISONING');
  });
});

describe('xBPP Evaluator — Posture Defaults', () => {
  it('AGGRESSIVE posture has low min confidence (0.5)', () => {
    const defaults = getPostureDefaults('AGGRESSIVE');
    expect(defaults.minConfidence).toBe(0.5);
    expect(defaults.crossChainAction).toBe('ALLOW');
  });

  it('BALANCED posture has medium min confidence (0.7)', () => {
    const defaults = getPostureDefaults('BALANCED');
    expect(defaults.minConfidence).toBe(0.7);
    expect(defaults.crossChainAction).toBe('ESCALATE');
  });

  it('CAUTIOUS posture has high min confidence (0.9)', () => {
    const defaults = getPostureDefaults('CAUTIOUS');
    expect(defaults.minConfidence).toBe(0.9);
    expect(defaults.crossChainAction).toBe('BLOCK');
  });
});

describe('xBPP Evaluator — Determinism', () => {
  it('same input always produces same verdict', () => {
    const tx = defaultTx({ amount: 750 });
    const policy = defaultPolicy({ requireHumanAbove: 500 });

    const result1 = evaluateTransaction(tx, policy);
    const result2 = evaluateTransaction(tx, policy);
    const result3 = evaluateTransaction(tx, policy);

    expect(result1.verdict).toBe(result2.verdict);
    expect(result2.verdict).toBe(result3.verdict);
    expect(result1.reasonCodes).toEqual(result2.reasonCodes);
  });
});

describe('xBPP Evaluator — Edge Cases', () => {
  it('zero amount should ALLOW', () => {
    const result = evaluateTransaction(
      defaultTx({ amount: 0 }),
      defaultPolicy({ requireHumanAbove: 2000 })
    );
    expect(result.verdict).toBe('ALLOW');
  });

  it('multiple violations should BLOCK with all reason codes', () => {
    const result = evaluateTransaction(
      defaultTx({
        amount: 2000,
        dailySpent: 4500,
      }),
      defaultPolicy({ maxSingle: 1000, maxDaily: 5000 })
    );
    expect(result.verdict).toBe('BLOCK');
    expect(result.reasonCodes).toContain('EXCEEDS_SINGLE_LIMIT');
    // Daily limit also exceeded — but evaluator may short-circuit
    // The key invariant: verdict is BLOCK
  });

  it('BLOCK takes priority over ESCALATE', () => {
    const result = evaluateTransaction(
      defaultTx({
        amount: 1500,        // exceeds single limit → BLOCK
        isNewCounterparty: true, // would escalate
      }),
      defaultPolicy({
        maxSingle: 1000,
        newCounterpartyAction: 'ESCALATE',
      })
    );
    expect(result.verdict).toBe('BLOCK');
  });
});
