# ScamShield — Detailed Technical Documentation

**Document Version:** 3.2  
**Target Platform:** Mobile Money (MoMo) Agents, Bank Branch Tellers, Compliance Stations & Subscribers  
**Jurisdiction:** Ghana (Cyber Security Authority 292, Bank of Ghana Guidelines)

---

## 1. System Architecture Overview

ScamShield is engineered as a touch-first, high-contrast, sub-second latency fraud triage and intelligence platform. The architecture separates client-side guardrail protection, rule-based heuristic evaluation, audio speech processing, and local threat persistence.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        SCAMSHIELD WEB APPLET                           │
├────────────────────────────────┬───────────────────────────────────────┤
│       PRESENTATION LAYER       │         THREAT & GUARDRAIL LAYER      │
│  - Landing Page & Onboarding   │  - Confidential PIN Auto-Redaction    │
│  - Simplified Header & Nav     │  - Dangerous Payload Sanitization     │
│  - Threat & MoMo POS Triage    │  - 6-Vector Heuristic Engine (CSA GH) │
│  - Speech Waveform Player      │  - Missing Evidence Gap Analyzer      │
│  - Syndicate Graph Canvas      │  - Explanatory Directive Formulator   │
├────────────────────────────────┴───────────────────────────────────────┤
│                          PERSISTENCE LAYER                             │
│  - Browser LocalStorage Synchronization (Reports, Incidents, Cache)    │
│  - Export Adapters (Formatted Police CID Dossier .txt, Case Ledger .csv)│
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Technology Stack

- **Framework:** React 19 (`react: ^19.0.1`, `react-dom: ^19.0.1`)
- **Build System & Dev Server:** Vite 8 (`vite: ^8.3.0`, `@vitejs/plugin-react: ^6.1.1`)
- **Language:** TypeScript 7 (`typescript: ^7.0.2`, strict mode enabled)
- **Styling & Design System:** Tailwind CSS v4 (`@tailwindcss/vite: ^4.3.3`)
- **Iconography:** Lucide React (`lucide-react: ^0.546.0`)
- **Speech & Audio:** Browser SpeechSynthesis Web API + HTML5 Audio Frequency Spectrum
- **Server Environment:** Node.js (Express server compatibility ready)

---

## 3. Strict Input Guardrails Specification

To ensure end-user data safety and defend against both malicious payloads and accidental credential disclosure, every input processed by ScamShield passes through two active guardrails before evaluation:

### Guardrail 1: Confidential MoMo PIN Interception & Auto-Masking
- **Trigger Pattern:**
  ```regex
  \b(pin|pin code|passcode|secret code|secret pin)\s*(?:is|[:=]|\s+)\s*(\d{4,6})\b
  ```
- **Behavior:**
  - If a user inadvertently pastes their 4-digit or 6-digit secret PIN, the engine intercepts the pattern.
  - The sensitive token is redacted in memory and replaced with `[GUARDRAIL REDACTED SENSITIVE PIN]`.
  - Dispatches an in-UI alert: *"Your raw secret PIN was automatically redacted to protect your wallet. Never disclose your PIN to callers, SMS prompts, or roadside agents."*
  - The unredacted PIN is **never** logged or transmitted.

### Guardrail 2: Active Script & Code Injection Neutralizer
- **Trigger Pattern:**
  ```regex
  <script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>|javascript:|onerror=|onload=
  ```
- **Behavior:**
  - Detects cross-site scripting (XSS) payloads or executable markup embedded in suspicious message payloads.
  - Strips and neutralizes tags into harmless plaintext strings.

---

## 4. The 6-Dimensional Threat Vector Matrix (CSA Ghana Grounded)

Every submitted message, URL, or payment request is evaluated against six threat vectors synthesized from official **Cyber Security Authority (CSA) Ghana** advisories:

| Vector | Taxonomy Category | Weight | Indicators & Detection Logic | Actionable Counter Directive |
| :--- | :--- | :--- | :--- | :--- |
| **Vector 1** | Credential & Secret Exfiltration | 30% | Demands for 4-digit PINs, OTP codes, approval prompts, and Ghana Card bio-data. | **Strict Zero-Disclosure:** Official telecom operators and banks will NEVER ask for your secret PIN or OTP. |
| **Vector 2** | Fake Reversal & Float Extraction | 25% | Pleas of "accidental wrong transfer" demanding immediate cash refunds or return transfers. | **No Manual Refunds:** Never return funds or pay cash. Demand that the caller log a carrier dispute ticket. |
| **Vector 3** | Psychological Coercion & Urgency | 20% | Artificial time limits (*"within 10 minutes"*, *"immediate remand"*, *"vehicle seized"*). | **Deliberate Pause:** High time pressure is manufactured to bypass critical thinking. Verify independently. |
| **Vector 4** | Deceptive Domain & Smishing Links | 25% | Anonymized links (`bit.ly`, `tinyurl.com`), generic TLDs (`.cc`, `.xyz`), brand typosquatting. | **Domain Integrity:** Legitimate government portals end in `.gov.gh`; official telcos use `.com.gh`. |
| **Vector 5** | Institutional Authority Spoofing | 15% | Posing as MTN Risk Unit, Telecel, Bank of Ghana, GRA, or Ghana Police CID. | **Sender Provenance:** Corporate telecom notices arrive via 3-digit SMS sender IDs, not personal 10-digit SIMs. |
| **Vector 6** | Advance-Fee Fraud & Ponzi Lures | 15% | Processing fees for jobs/grants, 300% trading yield promises, lotto forecasts. | **Upfront Fee Ban:** Legitimate state recruitment and regulated banks never charge upfront fees to personal wallets. |

---

## 5. Frontline Defense Design System & Semantic Color Tokens

The visual design system combines institutional banking authority with field-grade operational utility:

### Semantic Risk Scale
- **Low Concern (`#2E86AB`):** Calm analytical blue. Indicates baseline empirical stability.
- **Suspicious (`#F2A33A`):** Amber caution. Signals anomaly detection or uncorroborated velocity; demands physical Ghana Card inspection before payout.
- **High Risk (`#D64545`):** High-alert red. Denotes known scam vectors, blocklist matches, or active coercion; triggers an explicit transaction freeze.
- **Unable to Assess (`#7A869A`):** Slate grey. Treats ambiguous or truncated input with defensive neutrality.

### Non-Negotiable Behavioral Mandates
- **Absolute Exclusion of "Safe":** The words "Safe", "Secure", "Cleared", or "Verified Safe" are banned to prevent dangerous complacency.
- **Strict Prohibition of Green Affirmations:** Green checkmarks and shields are prohibited. Analytical blue (`#2E86AB`) represents the lowest concern tier.
- **Tabular Numbers (`tnum`):** Ghanaian phone numbers (`+233 XX XXX XXXX`) and financial figures use fixed-width tabular characters (`font-variant-numeric: tabular-nums`) for vertical ledger alignment.

---

## 6. Data Models & Local Storage Persistence

### 1. Analysis Result Schema (`AnalysisResult`)
```typescript
interface AnalysisResult {
  inputType: 'message' | 'url' | 'payment_momo';
  rawInput: string;
  sanitizedInput: string;
  isPiiRedacted: boolean;
  guardrailInterventions: GuardrailIntervention[];
  riskTier: 'low_concern' | 'suspicious' | 'high_risk' | 'unable_to_assess';
  confidenceScore: number; // 0 - 100
  riskLabel: string;
  summary: string;
  detectedSignals: DetectedSignal[];
  vectorMetrics: ThreatVectorMetric[];
  missingEvidence: string[];
  recommendedAction: string;
  technicalIndicators: {
    urgencyDetected: boolean;
    credentialRequest: boolean;
    upfrontFeeRequest: boolean;
    fakeReversalPattern: boolean;
    urlShortenerOrRiskyTld: boolean;
    impersonatedEntity?: string;
    domainReputation?: string;
    momoNetwork?: 'MTN' | 'Telecel' | 'AT' | 'Unknown';
  };
}
```

### 2. Community Report Schema (`CommunityReport`)
```typescript
interface CommunityReport {
  id: string;
  timestamp: string;
  category: 'MoMo Fraud' | 'Phishing URL' | 'Fake Job/Scholarship' | 'Impersonation' | 'Investment Ponzi';
  targetIdentifier: string;
  telecomOrPlatform: 'MTN MoMo' | 'Telecel Cash' | 'AT Money' | 'WhatsApp' | 'Telegram' | 'SMS' | 'Web';
  description: string;
  riskTier: RiskTier;
  location: string;
  corroboratedCount: number;
  status: 'Unverified' | 'Corroborated' | 'Escalated to CSA';
}
```

### 3. LocalStorage Synchronization
- Reports persist in `scamshield_community_reports`.
- Onboarding status persists in `scamshield_has_onboarded`.

---

## 7. Future Production Roadmap

- **Stage 1 (Current Prototype):** Rule-based heuristics, active guardrails, speech synthesis audio note screening, simulated social bot, and local report feeds.
- **Stage 2 (Backend & Curated Feeds):** FastAPI / Node backend, PostgreSQL database, and automated sync with Cyber Security Authority (CSA) and Bank of Ghana threat feeds.
- **Stage 3 (Native Mobile App):** Android application utilizing CallScreeningService and SMS filtering roles under narrow, user-consented operating system permissions.
- **Stage 4 (Official Connectors):** Approved WhatsApp Cloud API webhooks and Telegram bot tokens for automatic community group screening.
- **Stage 5 (Carrier Telco Integration):** Direct USSD reversal API linkages with MTN MoMo, Telecel Cash, and AT Money.
