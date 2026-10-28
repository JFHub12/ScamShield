export type RiskTier = 'low_concern' | 'suspicious' | 'high_risk' | 'unable_to_assess';

export interface DetectedSignal {
  id: string;
  category: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
}

export interface GuardrailIntervention {
  type: 'pin_redacted' | 'credential_leak' | 'script_injection' | 'dangerous_url' | 'high_entropy_secret';
  severity: 'warning' | 'critical';
  title: string;
  message: string;
  actionTaken: string;
}

export interface ThreatVectorMetric {
  id: string;
  name: string;
  category: string;
  riskScore: number; // 0 - 100
  status: 'Critical Alert' | 'Suspicious Vector' | 'Nominal Baseline';
  matchedKeywords: string[];
  findings: string;
  csaGuideline: string;
}

export interface AnalysisResult {
  inputType: 'message' | 'url' | 'payment_momo';
  rawInput: string;
  sanitizedInput: string;
  isPiiRedacted: boolean;
  guardrailInterventions: GuardrailIntervention[];
  riskTier: RiskTier;
  confidenceScore: number;
  riskLabel: string;
  summary: string;
  detectedSignals: DetectedSignal[];
  vectorMetrics: ThreatVectorMetric[];
  missingEvidence: string[];
  recommendedAction: string;
  technicalIndicators: {
    urgencyDetected: boolean;
    credentialRequest: boolean; // OTP, PIN, password
    upfrontFeeRequest: boolean;
    fakeReversalPattern: boolean;
    urlShortenerOrRiskyTld: boolean;
    impersonatedEntity?: string;
    domainReputation?: string;
    momoNetwork?: 'MTN' | 'Telecel' | 'AT' | 'Unknown';
    simAge?: string;
    mismatchFlag?: boolean;
    blacklistedAccount?: boolean;
  };
}

export interface CommunityReport {
  id: string;
  timestamp: string;
  category: 'MoMo Fraud' | 'Phishing URL' | 'Fake Job/Scholarship' | 'Impersonation' | 'Investment Ponzi';
  targetIdentifier: string; // phone number, domain, or short link
  telecomOrPlatform: 'MTN MoMo' | 'Telecel Cash' | 'AT Money' | 'WhatsApp' | 'Telegram' | 'SMS' | 'Web';
  description: string;
  riskTier: RiskTier;
  location: string;
  corroboratedCount: number;
  status: 'Unverified' | 'Corroborated' | 'Escalated to CSA';
}

export interface VoiceIntelItem {
  id: string;
  title: string;
  callerInfo: string;
  duration: string;
  receivedDate: string;
  transcript: string;
  audioTone: string;
  detectedTriggers: string[];
  riskTier: RiskTier;
  recommendedCounterAction: string;
  audioSimulationUrl?: string;
}

export interface EnterpriseIncident {
  id: string;
  caseNumber: string;
  timestamp: string;
  customerMsisdn: string;
  counterAgentId: string;
  branchLocation: string;
  transactionAmountGhs: number;
  fraudVector: string;
  status: 'Under Investigation' | 'Session Frozen' | 'Escalated to Compliance' | 'Audit Complete';
  riskTier: RiskTier;
  timeline: Array<{ time: string; event: string; user: string }>;
  evidenceNotes: string;
}

export interface ScamGraphNode {
  id: string;
  label: string;
  type: 'phone' | 'url' | 'entity' | 'wallet' | 'campaign';
  riskTier: RiskTier;
  details: string;
  connections: string[]; // Node IDs
}
