# Implementation Plan - ScamShield Frontline Defense System

ScamShield is an advanced fraud-protection and intelligence platform tailored for frontline merchants, bank branch agents, and consumers facing social engineering fraud (MoMo scams, phishing, fake OTP requests) in Ghana.

## Architectural & Design Principles
- **Strict Semantic Risk Scale**: Low Concern (`#2E86AB`), Suspicious (`#F2A33A`), High Risk (`#D64545`), Unable to Assess (`#7A869A`).
- **Absolute Exclusion of Green / "Safe"**: No green checkmarks or "Safe" / "Cleared" affirmations. Analytical blue (`#2E86AB`) is the lowest concern tier.
- **Frontline UI / Design System**: Sovereign navy (`#0F2A47`), accent teal (`#0E9F8E`), high-contrast cards, tabular numbers for MoMo numbers and amounts, bold operational typography.

## Planned Modules & Navigation
1. **Live Threat Analyzer (Consumer & MoMo)**:
   - Text, URL, and Payment Request inspection.
   - Pre-loaded test cases (Suspicious MoMo KYC update, Fake loan scam, Legitimate bank alert).
   - Detailed evidence breakdown (urgency, credential requests, unverified links) with actionable guidance.
   - MoMo Merchant Counter Verification lookup (`+233 XX XXX XXXX`, network selector MTN/Telecel/AT, agent SIM status).
2. **Voice Intelligence & Audio Note Analysis**:
   - Simulated voice note / call transcript analysis with tone flags (urgency, panic, OTP demand) and audio waveform visualizer.
3. **Intelligence Feed & Community Reports**:
   - Live feed of reports with filtering by risk level.
   - Form to submit new community reports stored in browser local storage.
4. **Social Bot Preview**:
   - Interactive WhatsApp / Telegram group scam-warning bot simulation.
5. **Recovery Assistant**:
   - Step-by-step actionable guide after a suspected fraud loss (e.g. `*170#` PIN reset, bank blocking, evidence preservation).
6. **Enterprise Case Management**:
   - Incident tracking table, case statuses (Investigating, Frozen, Escalated, Resolved), timeline, and audit logs.
7. **Scam DNA Graph Explorer**:
   - Visual map of connected scam phone numbers, domains, and phishing campaigns.

## Implementation Steps
1. **Setup Core Data & Types (`/src/types/scamshield.ts`, `/src/data/mockData.ts`)**: Define analysis rules, test cases, feed items, case items, and graph nodes.
2. **Component Architecture (`/src/components/`)**:
   - `Navbar.tsx` & `Header.tsx` with institutional branding and stats ticker.
   - `AnalyzerTab.tsx` (Message/URL and MoMo verification).
   - `VoiceIntelTab.tsx` (Audio notes & transcript analysis).
   - `FeedTab.tsx` & `ReportModal.tsx` (Community intelligence feed & submission).
   - `SocialBotTab.tsx` (Group chat bot preview).
   - `RecoveryTab.tsx` (Step-by-step recovery guides).
   - `EnterpriseTab.tsx` (Merchant/Bank case management dashboard).
   - `ScamGraphTab.tsx` (Scam DNA visualizer).
3. **App Shell & State Integration (`/src/App.tsx`)**: Tab routing, local storage persistence for reports and cases, and responsive layout.
4. **Polish & Verification**: Tailwind styling adherence to Frontline Defense System specs, tabular numbers, zero green affirmations check, compile & build verification.
