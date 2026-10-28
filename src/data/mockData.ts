import { 
  AnalysisResult, 
  CommunityReport, 
  VoiceIntelItem, 
  EnterpriseIncident, 
  ScamGraphNode, 
  RiskTier,
  GuardrailIntervention,
  ThreatVectorMetric
} from '../types/scamshield';

export const SAMPLE_ANALYZER_TEST_CASES = [
  {
    id: 'test-1',
    label: 'MTN MoMo KYC Suspension',
    category: 'Fake Suspension / Credential Harvester',
    riskTier: 'high_risk' as RiskTier,
    text: 'URGENT NOTICE: Your MTN MoMo wallet will be suspended in 2 hours due to unverified Ghana Card details. Visit http://mtn-kyc-verify-gh.cc immediately to update or reply with your 6-digit OTP to prevent permanent wallet forfeiture.'
  },
  {
    id: 'test-2',
    label: 'Fake Reversal Trap (CSA Alert)',
    category: 'Accidental Transfer Social Engineering',
    riskTier: 'high_risk' as RiskTier,
    text: 'Hello Agent! I made a huge mistake and sent 850 GHS to your wallet just now for my sick mother at Ridge Hospital. Please be merciful and reverse the 850 GHS immediately to my husband 0244198234 right now before network locks it!'
  },
  {
    id: 'test-3',
    label: 'PIN Leak & Shortened Link',
    category: 'Guardrail Interception Test',
    riskTier: 'high_risk' as RiskTier,
    text: 'MTN Security Alert: To confirm account ownership, please click https://bit.ly/momo-auth-gh and enter your secret PIN 4829 alongside the SMS verification code.'
  },
  {
    id: 'test-4',
    label: 'Ecobank Instant Loan Offer',
    category: 'Upfront Fee / Advance Fee Fraud',
    riskTier: 'high_risk' as RiskTier,
    text: 'Congratulations! You are pre-approved for GHS 15,000 instant loan from Ecobank Ghana. Zero collateral required. Pay 180 GHS processing fee to Agent Wallet 0244198234 to initiate instant disbursement within 5 minutes.'
  },
  {
    id: 'test-5',
    label: 'GRA Recruitment Fee',
    category: 'Employment Impersonation',
    riskTier: 'suspicious' as RiskTier,
    text: 'Ghana Revenue Authority (GRA) shortlist: You have been shortlisted for Customs Officer Level 2. Send 95 GHS clearance form fee via Telecel Cash to 0508821943. Interview date next Tuesday at Accra head office.'
  },
  {
    id: 'test-6',
    label: 'Standard Bank Debit Notification',
    category: 'Legitimate Financial Ledger Notification',
    riskTier: 'low_concern' as RiskTier,
    text: 'Stanbic Bank: GHS 320.00 debited from Acct ending **8821 at Accra Mall POS on 28-Oct 14:12. Avail Bal: GHS 4,890.20. If unauthorized, call customer care at +233 302 815 700 immediately.'
  },
  {
    id: 'test-7',
    label: 'Foreign Parcel Tracking Link',
    category: 'Unverified Delivery Domain',
    riskTier: 'unable_to_assess' as RiskTier,
    text: 'DHL GH: Your delivery package cannot be cleared at the harbor. Please verify parcel tracking ref GH-8829 at http://delivery-customs-hub.xyz/trace'
  }
];

export const INITIAL_COMMUNITY_REPORTS: CommunityReport[] = [
  {
    id: 'rep-001',
    timestamp: '14 mins ago',
    category: 'MoMo Fraud',
    targetIdentifier: '+233 24 419 8234',
    telecomOrPlatform: 'MTN MoMo',
    description: 'Impersonating MTN MoMo customer support claiming wrong transfer of GHS 800 was sent and demanding immediate cash refund.',
    riskTier: 'high_risk',
    location: 'Kumasi Kejetia Market',
    corroboratedCount: 18,
    status: 'Escalated to CSA'
  },
  {
    id: 'rep-002',
    timestamp: '42 mins ago',
    category: 'Phishing URL',
    targetIdentifier: 'http://mtn-kyc-verify-gh.cc',
    telecomOrPlatform: 'SMS',
    description: 'SMS blast mimicking official MoMo compliance portal asking users to enter their MoMo PIN and Ghana Card number.',
    riskTier: 'high_risk',
    location: 'Accra Greater Area',
    corroboratedCount: 34,
    status: 'Escalated to CSA'
  },
  {
    id: 'rep-003',
    timestamp: '2 hours ago',
    category: 'Fake Job/Scholarship',
    targetIdentifier: '+233 50 882 1943',
    telecomOrPlatform: 'Telecel Cash',
    description: 'Purported Ghana Revenue Authority recruitment officer charging 95 GHS upfront examination fee via personal wallet.',
    riskTier: 'suspicious',
    location: 'Tamale Central',
    corroboratedCount: 7,
    status: 'Corroborated'
  },
  {
    id: 'rep-004',
    timestamp: '3 hours ago',
    category: 'Investment Ponzi',
    targetIdentifier: 't.me/ghana_crypto_mining_vip',
    telecomOrPlatform: 'Telegram',
    description: 'WhatsApp/Telegram group promising 300% return on mobile money deposits within 24 hours via automated trading bot.',
    riskTier: 'high_risk',
    location: 'Takoradi Harbor',
    corroboratedCount: 12,
    status: 'Corroborated'
  },
  {
    id: 'rep-005',
    timestamp: '5 hours ago',
    category: 'Impersonation',
    targetIdentifier: '+233 26 910 4422',
    telecomOrPlatform: 'AT Money',
    description: 'Caller claiming to be hospital physician claiming relative was in motor accident and requires emergency blood deposit.',
    riskTier: 'high_risk',
    location: 'Tema Community 1',
    corroboratedCount: 9,
    status: 'Corroborated'
  },
  {
    id: 'rep-006',
    timestamp: '8 hours ago',
    category: 'Phishing URL',
    targetIdentifier: 'http://delivery-customs-hub.xyz',
    telecomOrPlatform: 'Web',
    description: 'Fake shipping portal demanding customs release duty via unverified checkout page.',
    riskTier: 'unable_to_assess',
    location: 'Cape Coast',
    corroboratedCount: 2,
    status: 'Unverified'
  }
];

export const INITIAL_VOICE_INTEL: VoiceIntelItem[] = [
  {
    id: 'voice-001',
    title: 'Emergency Medical Bail Impersonation',
    callerInfo: '+233 24 991 0244 (Unregistered SIM)',
    duration: '01:14',
    receivedDate: 'Today, 11:24 AM',
    transcript: "Agent, listen carefully! Your brother Kwame was involved in a severe hit-and-run at Circle interchange! The police sergeant here says unless you deposit 1,200 GHS right now on this MoMo wallet, they will remand him in custody and seize the vehicle! Do not call him, his phone is confiscated, send the money immediately!",
    audioTone: 'High-stress acoustic pressure, synthetic background sirens, coercive emotional urgency',
    detectedTriggers: ['Severe hit-and-run', 'Police sergeant bail demand', 'Do not call him', 'Send money immediately', 'Remand custody threat'],
    riskTier: 'high_risk',
    recommendedCounterAction: 'Immediate halt. Do not dispatch MoMo funds. Advise caller that Ghana Police Service does not accept mobile money bail at police posts. Contact relative through independent channel.'
  },
  {
    id: 'voice-002',
    title: 'Impersonated MoMo Headquarters Support Calling for PIN',
    callerInfo: '+233 55 401 9882 (Caller ID Spoofed)',
    duration: '00:48',
    receivedDate: 'Yesterday, 16:45 PM',
    transcript: "Good day, I am calling from the MTN Risk and Fraud Unit in Ridge. We detected an unauthorized transaction attempt on your agent wallet. We have placed a temporary block. To reverse this, we are sending an approval prompt to your phone. Kindly confirm with your 4-digit secret PIN right now so we can restore your agent float.",
    audioTone: 'Authoritative bureaucratic cadence, corporate call-center simulation',
    detectedTriggers: ['MTN Risk and Fraud Unit', 'Confirm with secret PIN', 'Approval prompt', 'Restore agent float'],
    riskTier: 'high_risk',
    recommendedCounterAction: 'Severe threat. Official telecom operators never request secret PINs or approval prompt approvals over phone calls. Terminate call immediately and lock merchant terminal.'
  },
  {
    id: 'voice-003',
    title: 'Unusual Bulk Float Cashout Request',
    callerInfo: '+233 20 119 4567 (Telecel Cash)',
    duration: '01:32',
    receivedDate: '26-Oct, 09:15 AM',
    transcript: "Hello agent, I am sending someone to your kiosk to withdraw 8,500 GHS cash. I have sent the MoMo already, but my network has delayed the SMS. Please pay out the cash to the young man in the white cap, the money is already in transit from the bank server.",
    audioTone: 'Persuasive, hurried, dismissive of protocol',
    detectedTriggers: ['SMS delayed', 'Pay out cash immediately', 'Money in transit', 'Third-party courier collection'],
    riskTier: 'suspicious',
    recommendedCounterAction: 'Strict hold. Never dispense physical cash without receiving a confirmed, cryptographic operator SMS or verifying physical balance on POS balance ledger.'
  }
];

export const INITIAL_ENTERPRISE_INCIDENTS: EnterpriseIncident[] = [
  {
    id: 'inc-1092',
    caseNumber: 'CASE-GH-2026-8819',
    timestamp: '2026-10-28 12:45',
    customerMsisdn: '+233 24 819 2201',
    counterAgentId: 'AGT-ACC-402',
    branchLocation: 'Accra Central (Makola Kiosk 14)',
    transactionAmountGhs: 3400.00,
    fraudVector: 'Social Engineering / Fake Reversal Call',
    status: 'Session Frozen',
    riskTier: 'high_risk',
    timeline: [
      { time: '12:40:11', event: 'Customer approached counter under distressed phone call guidance', user: 'AGT-ACC-402' },
      { time: '12:42:05', event: 'Destination MSISDN flagged in CSA central blocklist syndicate #44', user: 'ScamShield Engine' },
      { time: '12:43:20', event: 'Agent engaged Counter Freeze action; cash disbursement blocked', user: 'AGT-ACC-402' },
      { time: '12:45:00', event: 'Case escalated to Central Compliance Desk & CSA Ghana', user: 'System' }
    ],
    evidenceNotes: 'Customer was told by an incoming caller that her daughter was detained at Ridge Hospital. Destination wallet registered 4 days prior under mismatched Ghana Card bio-record.'
  },
  {
    id: 'inc-1093',
    caseNumber: 'CASE-GH-2026-8820',
    timestamp: '2026-10-28 11:15',
    customerMsisdn: '+233 50 119 8452',
    counterAgentId: 'AGT-KUM-118',
    branchLocation: 'Kumasi Kejetia Terminal 3',
    transactionAmountGhs: 1200.00,
    fraudVector: 'Fake Ghana Card KYC Phishing SMS',
    status: 'Under Investigation',
    riskTier: 'suspicious',
    timeline: [
      { time: '11:10:02', event: 'SMS link http://mtn-kyc-verify-gh.cc submitted for agent triage', user: 'AGT-KUM-118' },
      { time: '11:12:40', event: 'Domain heuristic flagged: registered 14 hours ago in foreign registrar', user: 'ScamShield Engine' },
      { time: '11:15:00', event: 'Customer counseled to reset MoMo PIN via official *170# USSD', user: 'AGT-KUM-118' }
    ],
    evidenceNotes: 'Phishing domain payload matches known campaign "Operation Gold Coast Bait". No funds lost.'
  },
  {
    id: 'inc-1094',
    caseNumber: 'CASE-GH-2026-8815',
    timestamp: '2026-10-27 15:30',
    customerMsisdn: '+233 27 773 0041',
    counterAgentId: 'AGT-TAK-092',
    branchLocation: 'Takoradi Harbor Market',
    transactionAmountGhs: 500.00,
    fraudVector: 'Recruitment Registration Fee',
    status: 'Escalated to Compliance',
    riskTier: 'high_risk',
    timeline: [
      { time: '15:20:10', event: 'Payment request targeting purported harbor security clearance', user: 'AGT-TAK-092' },
      { time: '15:25:33', event: 'Counter agent noticed wallet name mismatch: personal account vs claimed state entity', user: 'AGT-TAK-092' },
      { time: '15:30:00', event: 'Report filed and forwarded to Port Authority security desk', user: 'AGT-TAK-092' }
    ],
    evidenceNotes: 'Account owner identified as recurrent scammer in Western Region.'
  },
  {
    id: 'inc-1095',
    caseNumber: 'CASE-GH-2026-8802',
    timestamp: '2026-10-26 10:00',
    customerMsisdn: '+233 24 330 9182',
    counterAgentId: 'AGT-TMA-201',
    branchLocation: 'Tema Community 4 Branch',
    transactionAmountGhs: 8000.00,
    fraudVector: 'Merchant Float Reversal Attempt',
    status: 'Audit Complete',
    riskTier: 'high_risk',
    timeline: [
      { time: '09:45:12', event: 'Caller claimed errant transfer into agent float of GHS 8,000', user: 'AGT-TMA-201' },
      { time: '09:50:20', event: 'Agent verified core telecom ledger; no incoming debit existed', user: 'AGT-TMA-201' },
      { time: '10:00:00', event: 'Fraud attempt documented; caller MSISDN added to network watch list', user: 'Central Ops' }
    ],
    evidenceNotes: 'Classic social engineering reversal attack. Agent protocol followed cleanly.'
  }
];

export const SCAM_GRAPH_NODES: ScamGraphNode[] = [
  {
    id: 'node-camp-1',
    label: 'Campaign: Operation Gold Coast Bait',
    type: 'campaign',
    riskTier: 'high_risk',
    details: 'Coordinated SMS phishing targeting Ghana Card MoMo re-registration across Accra & Kumasi.',
    connections: ['node-url-1', 'node-url-2', 'node-phone-1', 'node-org-1']
  },
  {
    id: 'node-org-1',
    label: 'Impersonated: MTN Ghana MoMo',
    type: 'entity',
    riskTier: 'high_risk',
    details: 'Official telecom brand used without authorization to instill false urgency.',
    connections: ['node-camp-1', 'node-url-1', 'node-phone-1']
  },
  {
    id: 'node-url-1',
    label: 'http://mtn-kyc-verify-gh.cc',
    type: 'url',
    riskTier: 'high_risk',
    details: 'Malicious credential harvester spoofing MTN Ghana logo and requesting 4-digit PIN.',
    connections: ['node-camp-1', 'node-wallet-1']
  },
  {
    id: 'node-url-2',
    label: 'http://delivery-customs-hub.xyz',
    type: 'url',
    riskTier: 'suspicious',
    details: 'Fake customs tracking portal hosting deceptive fee payment forms.',
    connections: ['node-camp-1']
  },
  {
    id: 'node-phone-1',
    label: '+233 24 419 8234',
    type: 'phone',
    riskTier: 'high_risk',
    details: 'High-velocity outbound caller making 180+ emergency bail extortion attempts daily.',
    connections: ['node-camp-1', 'node-wallet-1', 'node-wallet-2']
  },
  {
    id: 'node-phone-2',
    label: '+233 50 882 1943',
    type: 'phone',
    riskTier: 'suspicious',
    details: 'Flagged by 7 community members for fake GRA civil service application fees.',
    connections: ['node-org-2', 'node-wallet-2']
  },
  {
    id: 'node-org-2',
    label: 'Impersonated: Ghana Revenue Authority',
    type: 'entity',
    riskTier: 'suspicious',
    details: 'State revenue agency targeted in public recruitment scam vectors.',
    connections: ['node-phone-2']
  },
  {
    id: 'node-wallet-1',
    label: 'Wallet: 0244198234 (K. Agyeman)',
    type: 'wallet',
    riskTier: 'high_risk',
    details: 'Cash-out recipient wallet with anomalous velocity spike (>GHS 42,000 in 48 hours).',
    connections: ['node-url-1', 'node-phone-1']
  },
  {
    id: 'node-wallet-2',
    label: 'Wallet: 0508821943 (E. Mensah)',
    type: 'wallet',
    riskTier: 'suspicious',
    details: 'Secondary mule wallet linked to unauthorized recruitment processing fees.',
    connections: ['node-phone-1', 'node-phone-2']
  }
];

/**
 * Strict Input Guardrail & Threat Intelligence Evaluation Engine
 * Grounded in Cyber Security Authority (CSA) Ghana & Bank of Ghana MoMo fraud directives.
 */
export function analyzeThreatInput(textOrUrl: string, type: 'message' | 'url' | 'payment_momo' = 'message'): AnalysisResult {
  let raw = textOrUrl.trim();
  const guardrails: GuardrailIntervention[] = [];
  let isPiiRedacted = false;
  let sanitized = raw;

  if (!raw) {
    return {
      inputType: type,
      rawInput: textOrUrl,
      sanitizedInput: '',
      isPiiRedacted: false,
      guardrailInterventions: [],
      riskTier: 'unable_to_assess',
      confidenceScore: 0,
      riskLabel: 'UNABLE TO ASSESS',
      summary: 'No substantive content or identifier provided for inspection.',
      detectedSignals: [],
      vectorMetrics: [],
      missingEvidence: ['No text, URL, or mobile money identifier detected.'],
      recommendedAction: 'Enter a valid message snippet, website URL, or Ghanaian MoMo MSISDN (+233).',
      technicalIndicators: {
        urgencyDetected: false,
        credentialRequest: false,
        upfrontFeeRequest: false,
        fakeReversalPattern: false,
        urlShortenerOrRiskyTld: false
      }
    };
  }

  // --- GUARDRAIL 1: Active Script / Code Injection Neutralizer ---
  const scriptRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>|javascript:|onerror=|onload=/gi;
  if (scriptRegex.test(sanitized)) {
    guardrails.push({
      type: 'script_injection',
      severity: 'critical',
      title: 'Malicious Script Payload Neutralized',
      message: 'Active executable markup or javascript URI detected in input. Neutralized by input boundary guardrail.',
      actionTaken: 'Input sanitized and HTML entities stripped.'
    });
    sanitized = sanitized.replace(scriptRegex, '[SANITIZED SCRIPT PAYLOAD]');
  }

  // --- GUARDRAIL 2: Sensitive PIN / Credential Redaction ---
  // Detect explicit user PIN leakage (e.g., "pin: 1234", "pin is 4829", "pin 4920")
  const pinLeakRegex = /\b(pin|pin code|passcode|secret code|secret pin)\s*(?:is|[:=]|\s+)\s*(\d{4,6})\b/gi;
  if (pinLeakRegex.test(sanitized)) {
    isPiiRedacted = true;
    sanitized = sanitized.replace(pinLeakRegex, '$1 [GUARDRAIL REDACTED SENSITIVE PIN]');
    guardrails.push({
      type: 'pin_redacted',
      severity: 'critical',
      title: 'Confidential MoMo PIN Intercepted & Masked',
      message: 'You included a raw 4-to-6 digit secret PIN in the input text. ScamShield has automatically masked this credential to protect your wallet.',
      actionTaken: 'PIN masked with [GUARDRAIL REDACTED SENSITIVE PIN]. NEVER disclose your PIN to any caller, agent, or website.'
    });
  }

  const normalized = sanitized.toLowerCase();
  const signals: Array<{ id: string; category: string; description: string; severity: 'low' | 'medium' | 'high' }> = [];
  const missingEvidence: string[] = [];

  // --- RESEARCH-BACKED 6-VECTOR DETECTION MATRIX ---

  // VECTOR 1: Credential & Secret Exfiltration (Weight: 30%)
  const credKeywords = ['otp', 'pin', 'password', 'passcode', 'verification code', 'secret code', 'ghana card details', 'ghana card number', 'enter otp', 'share otp', 'approval prompt'];
  const matchedCreds = credKeywords.filter(k => normalized.includes(k));
  const hasCredentialRequest = matchedCreds.length > 0;
  const vector1Score = hasCredentialRequest ? Math.min(100, 60 + matchedCreds.length * 15) : 0;

  if (hasCredentialRequest) {
    signals.push({
      id: 'sig-cred',
      category: 'Credential / Secret Exfiltration',
      description: `Demands secret authentication tokens ("${matchedCreds.slice(0, 3).join('", "')}"). Official telecom staff and banks NEVER ask for your secret PIN or OTP over calls or SMS.`,
      severity: 'high'
    });
  }

  // VECTOR 2: Fake Reversal & Float Extraction (Weight: 25%)
  const reversalKeywords = ['wrong transfer', 'sent by mistake', 'mistakenly sent', 'reverse immediately', 'reverse the money', 'refund my momo', 'accidental transfer', 'sms delayed', 'money in transit', 'courier outside', 'pay out cash'];
  const matchedReversal = reversalKeywords.filter(k => normalized.includes(k));
  const hasFakeReversal = matchedReversal.length > 0;
  const vector2Score = hasFakeReversal ? Math.min(100, 70 + matchedReversal.length * 10) : 0;

  if (hasFakeReversal) {
    signals.push({
      id: 'sig-reversal',
      category: 'Fake Reversal / Float Extraction Trick',
      description: `Exhibits classic accidental transfer plea ("${matchedReversal.slice(0, 2).join('", "')}"). Scammers coerce victims into sending legitimate personal funds before an official telecom reversal audit is conducted.`,
      severity: 'high'
    });
  }

  // VECTOR 3: High-Pressure Coercion & Panic Engineering (Weight: 20%)
  const urgencyKeywords = ['urgent', 'immediately', 'suspended in', 'within 2 hours', 'within 5 minutes', 'within 10 minutes', 'forfeiture', 'emergency', 'arrested', 'police station', 'remand', 'right now', 'act now', 'seize', 'court warrant'];
  const matchedUrgency = urgencyKeywords.filter(k => normalized.includes(k));
  const hasUrgency = matchedUrgency.length > 0;
  const vector3Score = hasUrgency ? Math.min(100, 50 + matchedUrgency.length * 15) : 0;

  if (hasUrgency) {
    signals.push({
      id: 'sig-urgency',
      category: 'Artificial Psychological Urgency',
      description: `Manufactures acute time pressure or legal intimidation ("${matchedUrgency.slice(0, 2).join('", "')}") designed to bypass critical deliberation and provoke rash cash transfer.`,
      severity: 'high'
    });
  }

  // VECTOR 4: Deceptive Domain, Smishing Links & Shorteners (Weight: 25%)
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9-]+\.(cc|xyz|tk|top|buzz|click|info|live|shop|cf|ml|ga|rest|site|online))/i;
  const urlMatch = normalized.match(urlRegex);
  const shortenerRegex = /(bit\.ly|tinyurl\.com|cutt\.ly|is\.gd|t\.co|rb\.gy|shorturl\.at)/i;
  const shortenerMatch = normalized.match(shortenerRegex);
  
  let hasRiskyUrl = false;
  let vector4Score = 0;
  let domainReputation = 'None Detected';

  if (shortenerMatch) {
    hasRiskyUrl = true;
    vector4Score = 88;
    domainReputation = `Shortened Anonymized URL (${shortenerMatch[0]})`;
    signals.push({
      id: 'sig-shortener',
      category: 'Obfuscated URL Shortener',
      description: `Contains URL shortener [${shortenerMatch[0]}] masking the actual destination host. Widely used in smishing blasts to conceal rogue landing pages.`,
      severity: 'high'
    });
  } else if (urlMatch) {
    const domainStr = urlMatch[0];
    const suspiciousTlds = ['.cc', '.xyz', '.top', '.click', '.info', '.biz', '.tk', '.cf', '.buzz', '.rest', '.online', '.site'];
    const hasSusTld = suspiciousTlds.some(tld => domainStr.includes(tld));
    const hasMimicry = domainStr.includes('kyc') || domainStr.includes('verify') || domainStr.includes('mtn') || domainStr.includes('momo') || domainStr.includes('auth');

    if (hasSusTld || hasMimicry) {
      hasRiskyUrl = true;
      vector4Score = 92;
      domainReputation = `Unverified Phishing Domain (${domainStr})`;
      signals.push({
        id: 'sig-url-deceptive',
        category: 'Brand Mimicry Phishing Domain',
        description: `Link [${domainStr}] employs high-risk generic TLD or deceptive brand keywords. Official Ghanaian entities operate on .gov.gh, .com.gh, or verified corporate domains.`,
        severity: 'high'
      });
    } else {
      vector4Score = 35;
      domainReputation = `External Destination (${domainStr})`;
      signals.push({
        id: 'sig-url-info',
        category: 'External Hyperlink Present',
        description: `Message references external destination [${domainStr}]. Verify digital certificate before opening.`,
        severity: 'medium'
      });
    }
  }

  // VECTOR 5: Institutional & Brand Impersonation (Weight: 15%)
  let impersonationEntity: string | undefined = undefined;
  if (normalized.includes('mtn') || normalized.includes('momo')) impersonationEntity = 'MTN MoMo';
  else if (normalized.includes('telecel') || normalized.includes('vodafone')) impersonationEntity = 'Telecel Cash';
  else if (normalized.includes('at money') || normalized.includes('airteltigo')) impersonationEntity = 'AT Money';
  else if (normalized.includes('ecobank')) impersonationEntity = 'Ecobank Ghana';
  else if (normalized.includes('gra') || normalized.includes('ghana revenue authority')) impersonationEntity = 'Ghana Revenue Authority';
  else if (normalized.includes('stanbic')) impersonationEntity = 'Stanbic Bank';
  else if (normalized.includes('ghana police') || normalized.includes('police sergeant') || normalized.includes('cid')) impersonationEntity = 'Ghana Police Service';
  else if (normalized.includes('csa') || normalized.includes('cyber security authority')) impersonationEntity = 'Cyber Security Authority';

  let vector5Score = 0;
  if (impersonationEntity && (hasUrgency || hasCredentialRequest || hasRiskyUrl || hasFakeReversal)) {
    vector5Score = 85;
    signals.push({
      id: 'sig-impersonation',
      category: 'Institutional Authority Spoofing',
      description: `Claims authority on behalf of ${impersonationEntity} while requesting credentials, urgent funds, or unverified links. Official corporate SMS originates from 3-digit shortcodes, not mobile SIMs.`,
      severity: 'high'
    });
  }

  // VECTOR 6: Advance-Fee Fraud & Ponzi Lures (Weight: 15%)
  const upfrontKeywords = ['processing fee', 'clearance fee', 'registration fee', 'approved for ghs', 'zero collateral', 'pay fee to', 'pre-approved', 'won a prize', 'draw winner', 'dispatch fee', 'clearance form', '300%', 'crypto mining', 'double your money', 'airtime bonus'];
  const matchedUpfront = upfrontKeywords.filter(k => normalized.includes(k));
  const hasUpfrontFee = matchedUpfront.length > 0;
  const vector6Score = hasUpfrontFee ? Math.min(100, 65 + matchedUpfront.length * 10) : 0;

  if (hasUpfrontFee) {
    signals.push({
      id: 'sig-upfront',
      category: 'Advance-Fee / Ponzi Pattern',
      description: `Demands upfront fee before promised benefits ("${matchedUpfront.slice(0, 2).join('", "')}"). Common in fake government recruitment, prize draws, and quick-loan scams.`,
      severity: 'high'
    });
  }

  // Missing Evidence Analysis
  if (!urlMatch && !shortenerMatch) {
    missingEvidence.push('No verifiable hyperlink or web host present in the provided snippet.');
  }
  if (!normalized.includes('+233') && !normalized.match(/0(2|5)[0-9]{8}/)) {
    missingEvidence.push('No sender MSISDN mobile number detected for telecom ledger provenance cross-check.');
  }

  // Network identification for Ghana numbers
  let network: 'MTN' | 'Telecel' | 'AT' | 'Unknown' = 'Unknown';
  if (normalized.includes('024') || normalized.includes('054') || normalized.includes('055') || normalized.includes('059') || normalized.includes('mtn')) {
    network = 'MTN';
  } else if (normalized.includes('020') || normalized.includes('050') || normalized.includes('telecel') || normalized.includes('vodafone')) {
    network = 'Telecel';
  } else if (normalized.includes('026') || normalized.includes('056') || normalized.includes('027') || normalized.includes('at')) {
    network = 'AT';
  }

  // Calculate Overall Risk Tier & Confidence
  const compositeScore = Math.max(
    vector1Score,
    vector2Score,
    vector4Score,
    (vector3Score * 0.4 + vector5Score * 0.3 + vector6Score * 0.3)
  );

  let tier: RiskTier = 'low_concern';
  let label = 'LOW CONCERN';
  let summary = 'No prominent threat vectors or aggressive credential requests were detected in this sample.';
  let recommendedAction = 'Standard operational vigilance. Note: lack of flagged indicators does not establish absolute safety.';
  let confidence = 75;

  if (hasCredentialRequest || hasFakeReversal || hasRiskyUrl || (hasUrgency && hasUpfrontFee)) {
    tier = 'high_risk';
    label = 'HIGH RISK VECTOR';
    confidence = Math.min(99, Math.max(88, compositeScore));
    summary = 'Severe indicators of social engineering, credential theft, or fraudulent transfer manipulation detected.';
    recommendedAction = 'HALT TRANSACTION. Do NOT share OTP, PIN, or Ghana Card credentials. Do NOT send funds for mistaken transfers without official carrier reversal.';
  } else if (hasUrgency || hasUpfrontFee || signals.some(s => s.severity === 'medium')) {
    tier = 'suspicious';
    label = 'SUSPICIOUS INDICATOR';
    confidence = 82;
    summary = 'Anomalous behavioral patterns detected such as urgency or advance fee requests. Counter verification required.';
    recommendedAction = 'Proceed with defensive caution. Independently verify caller or sender via verified corporate directory before payout.';
  } else if (normalized.length < 20) {
    tier = 'unable_to_assess';
    label = 'UNABLE TO ASSESS';
    confidence = 35;
    summary = 'Sample is too brief or ambiguous to reliably extract threat signals.';
    recommendedAction = 'Provide additional contextual information, full message body, or sender phone number.';
  } else {
    tier = 'low_concern';
    label = 'LOW CONCERN';
    confidence = 78;
    summary = 'No common fraud patterns (OTP demands, threats, unverified URLs, or fee requests) were detected.';
    recommendedAction = 'Observe routine counter checks. Remember that lack of detected indicators does not guarantee safety.';
  }

  // Build the 6-vector metrics array
  const vectorMetrics: ThreatVectorMetric[] = [
    {
      id: 'vec-cred',
      name: 'Credential & Secret Exfiltration',
      category: 'Authentication Integrity',
      riskScore: vector1Score,
      status: vector1Score >= 60 ? 'Critical Alert' : vector1Score > 0 ? 'Suspicious Vector' : 'Nominal Baseline',
      matchedKeywords: matchedCreds,
      findings: hasCredentialRequest 
        ? `Explicit demand for authentication tokens detected (${matchedCreds.join(', ')}).`
        : 'No direct requests for PIN, OTP, or secret passcodes identified.',
      csaGuideline: 'CSA Directive: Legitimate financial and telecom operators will NEVER request your secret PIN or OTP.'
    },
    {
      id: 'vec-reversal',
      name: 'Fake Reversal & Errant Transfer Trap',
      category: 'Social Engineering',
      riskScore: vector2Score,
      status: vector2Score >= 60 ? 'Critical Alert' : vector2Score > 0 ? 'Suspicious Vector' : 'Nominal Baseline',
      matchedKeywords: matchedReversal,
      findings: hasFakeReversal
        ? `Matches accidental MoMo transfer plea (${matchedReversal.join(', ')}).`
        : 'No errant transfer or manual refund demands detected.',
      csaGuideline: 'CSA Directive: Never manually reverse funds or pay cash. Direct caller to request an official telecom reversal.'
    },
    {
      id: 'vec-urgency',
      name: 'Psychological Coercion & Urgency Pressure',
      category: 'Behavioral Manipulation',
      riskScore: vector3Score,
      status: vector3Score >= 60 ? 'Critical Alert' : vector3Score > 0 ? 'Suspicious Vector' : 'Nominal Baseline',
      matchedKeywords: matchedUrgency,
      findings: hasUrgency
        ? `Artificial deadline or panic engineering identified (${matchedUrgency.join(', ')}).`
        : 'Neutral tone; no coercive temporal or legal intimidation noted.',
      csaGuideline: 'CSA Directive: Scammers manufacture urgency to induce panic. Pause and verify independently.'
    },
    {
      id: 'vec-url',
      name: 'Deceptive Domain & Smishing Links',
      category: 'Technical Origin',
      riskScore: vector4Score,
      status: vector4Score >= 60 ? 'Critical Alert' : vector4Score > 0 ? 'Suspicious Vector' : 'Nominal Baseline',
      matchedKeywords: shortenerMatch ? [shortenerMatch[0]] : urlMatch ? [urlMatch[0]] : [],
      findings: hasRiskyUrl
        ? `High-risk URL, shortened hyperlink, or suspicious generic TLD present (${domainReputation}).`
        : 'No deceptive or anonymized hyperlinks identified in text.',
      csaGuideline: 'CSA Directive: Official Ghana government domains end with .gov.gh; legitimate telecom portals use .com.gh.'
    },
    {
      id: 'vec-impersonation',
      name: 'Institutional Authority Spoofing',
      category: 'Trust Exploitation',
      riskScore: vector5Score,
      status: vector5Score >= 60 ? 'Critical Alert' : vector5Score > 0 ? 'Suspicious Vector' : 'Nominal Baseline',
      matchedKeywords: impersonationEntity ? [impersonationEntity] : [],
      findings: impersonationEntity
        ? `Claims association with ${impersonationEntity} under elevated threat conditions.`
        : 'No unauthorized institutional identity claims detected.',
      csaGuideline: 'CSA Directive: Official corporate notices arrive through verified 3-character SMS headers.'
    },
    {
      id: 'vec-advancefee',
      name: 'Advance-Fee Fraud & Ponzi Lures',
      category: 'Financial Enticement',
      riskScore: vector6Score,
      status: vector6Score >= 60 ? 'Critical Alert' : vector6Score > 0 ? 'Suspicious Vector' : 'Nominal Baseline',
      matchedKeywords: matchedUpfront,
      findings: hasUpfrontFee
        ? `Demands advance fees or promises improbable financial yield (${matchedUpfront.join(', ')}).`
        : 'No advance processing fees or unrealistic investment yields flagged.',
      csaGuideline: 'CSA Directive: Legitimate recruiters and banks do not charge upfront fees to personal mobile money wallets.'
    }
  ];

  return {
    inputType: type,
    rawInput: textOrUrl,
    sanitizedInput: sanitized,
    isPiiRedacted,
    guardrailInterventions: guardrails,
    riskTier: tier,
    confidenceScore: confidence,
    riskLabel: label,
    summary,
    detectedSignals: signals,
    vectorMetrics,
    missingEvidence,
    recommendedAction,
    technicalIndicators: {
      urgencyDetected: hasUrgency,
      credentialRequest: hasCredentialRequest,
      upfrontFeeRequest: hasUpfrontFee,
      fakeReversalPattern: hasFakeReversal,
      urlShortenerOrRiskyTld: hasRiskyUrl,
      impersonatedEntity: impersonationEntity,
      domainReputation,
      momoNetwork: network
    }
  };
}
