import { Policy, Constraint } from '../types';

// Base shared constraints
const sharedConstraints: Constraint[] = [
  {
    id: 'audit-log',
    name: 'Audit Logging',
    description: 'All transactions must be logged with full context',
    type: 'require',
    isShared: true,
  },
  {
    id: 'rate-limit-base',
    name: 'Base Rate Limit',
    description: 'Maximum 100 transactions per hour',
    type: 'limit',
    parameter: 100,
    isShared: true,
  },
];

// Spend-related constraints
const spendConstraintsPermissive: Constraint[] = [
  {
    id: 'spend-limit-permissive',
    name: 'Transaction Limit',
    description: 'Individual transactions up to $10,000 allowed',
    type: 'limit',
    parameter: 10000,
    category: 'SPEND',
  },
  {
    id: 'daily-limit-permissive',
    name: 'Daily Aggregate Limit',
    description: 'Daily spend limit of $50,000',
    type: 'limit',
    parameter: 50000,
    category: 'SPEND',
  },
  {
    id: 'new-vendor-permissive',
    name: 'New Vendor Policy',
    description: 'Allow new vendors with basic verification',
    type: 'require',
    parameter: 'basic-verification',
    category: 'SPEND',
  },
  {
    id: 'urgent-transfer-permissive',
    name: 'Urgent Transfer Override',
    description: 'Allow expedited transfers with executive approval signal',
    type: 'require',
    parameter: 'executive-signal',
    category: 'SPEND',
  },
];

const spendConstraintsRestrictive: Constraint[] = [
  {
    id: 'spend-limit-restrictive',
    name: 'Transaction Limit',
    description: 'Individual transactions up to $1,000 allowed',
    type: 'limit',
    parameter: 1000,
    category: 'SPEND',
  },
  {
    id: 'daily-limit-restrictive',
    name: 'Daily Aggregate Limit',
    description: 'Daily spend limit of $5,000',
    type: 'limit',
    parameter: 5000,
    category: 'SPEND',
  },
  {
    id: 'new-vendor-restrictive',
    name: 'New Vendor Policy',
    description: 'Require human approval for all new vendors',
    type: 'escalate',
    parameter: 'human-approval',
    category: 'SPEND',
  },
  {
    id: 'urgent-transfer-restrictive',
    name: 'Urgent Transfer Override',
    description: 'No expedited transfers without full approval chain',
    type: 'deny',
    parameter: 'full-chain-required',
    category: 'SPEND',
  },
  {
    id: 'velocity-check',
    name: 'Velocity Check',
    description: 'Flag unusual transaction patterns',
    type: 'require',
    parameter: 'pattern-analysis',
    category: 'SPEND',
  },
];

// Sign-related constraints
const signConstraintsPermissive: Constraint[] = [
  {
    id: 'signature-permissive',
    name: 'Signature Threshold',
    description: 'Single signature for amounts under $25,000',
    type: 'limit',
    parameter: 25000,
    category: 'SIGN',
  },
  {
    id: 'approval-chain-permissive',
    name: 'Approval Chain',
    description: 'Standard approval for routine requests',
    type: 'require',
    parameter: 'standard-flow',
    category: 'SIGN',
  },
  {
    id: 'signer-verification-permissive',
    name: 'Signer Verification',
    description: 'Basic identity verification for known signers',
    type: 'require',
    parameter: 'basic-identity',
    category: 'SIGN',
  },
];

const signConstraintsRestrictive: Constraint[] = [
  {
    id: 'signature-restrictive',
    name: 'Signature Threshold',
    description: 'Dual signature for amounts over $500',
    type: 'limit',
    parameter: 500,
    category: 'SIGN',
  },
  {
    id: 'approval-chain-restrictive',
    name: 'Approval Chain',
    description: 'Full verification for all approval requests',
    type: 'escalate',
    parameter: 'full-verification',
    category: 'SIGN',
  },
  {
    id: 'signer-verification-restrictive',
    name: 'Signer Verification',
    description: 'Multi-factor authentication for all signers',
    type: 'require',
    parameter: 'mfa-required',
    category: 'SIGN',
  },
  {
    id: 'phantom-detection-restrictive',
    name: 'Phantom Request Detection',
    description: 'Detect and block requests from unverified sources',
    type: 'deny',
    parameter: 'source-verification',
    category: 'SIGN',
  },
];

// Defense-related constraints  
const defenseConstraintsPermissive: Constraint[] = [
  {
    id: 'access-pattern-permissive',
    name: 'Access Pattern Monitoring',
    description: 'Log unusual access patterns for review',
    type: 'require',
    parameter: 'logging-only',
    category: 'DEFENSE',
  },
  {
    id: 'data-access-permissive',
    name: 'Data Access Scope',
    description: 'Allow broad read access for operational efficiency',
    type: 'limit',
    parameter: 'broad-read',
    category: 'DEFENSE',
  },
  {
    id: 'insider-trust-permissive',
    name: 'Insider Access Policy',
    description: 'Trust internal actors with standard permissions',
    type: 'require',
    parameter: 'standard-trust',
    category: 'DEFENSE',
  },
];

const defenseConstraintsRestrictive: Constraint[] = [
  {
    id: 'access-pattern-restrictive',
    name: 'Access Pattern Monitoring',
    description: 'Block and alert on unusual access patterns',
    type: 'deny',
    parameter: 'active-blocking',
    category: 'DEFENSE',
  },
  {
    id: 'data-access-restrictive',
    name: 'Data Access Scope',
    description: 'Restrict access to minimum necessary data',
    type: 'limit',
    parameter: 'minimal-access',
    category: 'DEFENSE',
  },
  {
    id: 'insider-trust-restrictive',
    name: 'Insider Access Policy',
    description: 'Verify all internal actors on each request',
    type: 'escalate',
    parameter: 'zero-trust',
    category: 'DEFENSE',
  },
  {
    id: 'exfiltration-detection-restrictive',
    name: 'Exfiltration Detection',
    description: 'Block systematic data retrieval patterns',
    type: 'deny',
    parameter: 'pattern-block',
    category: 'DEFENSE',
  },
  {
    id: 'suggestion-filter-restrictive',
    name: 'Suggestion Filtering',
    description: 'Verify external suggestions against known-good sources',
    type: 'require',
    parameter: 'source-verification',
    category: 'DEFENSE',
  },
];

export const permissivePolicy: Policy = {
  id: 'policy-permissive-v1',
  name: 'Permissive Standard',
  type: 'BPP',
  version: '1.0.0',
  description: 'A balanced policy that prioritizes operational efficiency while maintaining basic safety guardrails.',
  posture_summary: 'Trust efficiency. Escalate only when necessary.',
  constraints: [
    ...sharedConstraints,
    ...spendConstraintsPermissive,
    ...signConstraintsPermissive,
    ...defenseConstraintsPermissive,
  ],
  raw_json: {
    version: '1.0.0',
    type: 'BPP',
    posture: 'permissive',
    rules: {
      transaction_limit: 10000,
      daily_aggregate: 50000,
      new_vendor: 'allow_with_basic_verification',
      signature_threshold: 25000,
      escalation_trigger: 'high_risk_only',
    },
  },
  hash: 'bpp-7a3f9c2e',
};

export const restrictivePolicy: Policy = {
  id: 'policy-restrictive-v1',
  name: 'Restrictive Standard',
  type: 'DBP',
  version: '1.0.0',
  description: 'A cautious policy that prioritizes verification and human oversight for all significant decisions.',
  posture_summary: 'Verify everything. Ask when uncertain.',
  constraints: [
    ...sharedConstraints,
    ...spendConstraintsRestrictive,
    ...signConstraintsRestrictive,
    ...defenseConstraintsRestrictive,
  ],
  raw_json: {
    version: '1.0.0',
    type: 'DBP',
    posture: 'restrictive',
    rules: {
      transaction_limit: 1000,
      daily_aggregate: 5000,
      new_vendor: 'require_human_approval',
      signature_threshold: 500,
      velocity_check: true,
      escalation_trigger: 'any_uncertainty',
    },
  },
  hash: 'dbp-2b8e4d1f',
};

export const policies: Policy[] = [permissivePolicy, restrictivePolicy];

export function getPolicyById(id: string): Policy | undefined {
  return policies.find(p => p.id === id);
}

// Get constraints relevant to a specific scenario category
export function getConstraintsForCategory(policy: Policy, category: 'SPEND' | 'SIGN' | 'DEFENSE'): Constraint[] {
  return policy.constraints.filter(c => c.category === category || c.isShared);
}
