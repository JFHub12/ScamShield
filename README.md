# ScamShield — Frontline Defense System

![ScamShield Shield Logo](https://res.cloudinary.com/jsg7ebov/image/upload/v1793200255/Shield_illustration_isolated_on_white_background_virtual_security_concept_shield_illustration___Premium_AI-generated_image.jpg)

**Enterprise-Grade Fraud Intelligence & Mobile Money (MoMo) Protection for Ghana's Frontline.**

ScamShield is a specialized fraud-detection and counter-verification platform built for mobile money agents, bank branch tellers, compliance officers, and subscribers facing social engineering, smishing, and fake accidental reversals across Ghana.

---

## 🚀 Quick Start (Running Locally)

Follow these steps to run the complete ScamShield application on your local machine:

### 1. Prerequisites
- **Node.js**: Version `18.0.0` or higher (Node 20+ recommended).
  Check with:
  ```bash
  node -v
  ```
- **npm** (comes with Node) or **pnpm** / **yarn**.

### 2. Installation
Open your terminal in the project root directory and install dependencies:
```bash
npm install
```

### 3. Environment Configuration
Create a local `.env` file (optional for offline rule-based triage; required for future Gemini integrations):
```bash
cp .env.example .env
```
*(Defaults in `.env.example` are pre-configured for local testing).*

### 4. Start Local Development Server
Run the local Vite development server:
```bash
npm run dev
```
The server will boot instantly on:
👉 **`http://localhost:3000`** (or `http://localhost:5173` if port 3000 is occupied).

Open that URL in your browser to interact with the full app!

---

## 🛠 Available NPM Scripts

| Script | Command | Purpose |
| :--- | :--- | :--- |
| **Start Dev Server** | `npm run dev` | Runs the Vite local dev server with hot reload |
| **Type Check / Lint** | `npm run lint` | Runs `tsc --noEmit` to validate TypeScript types |
| **Production Build** | `npm run build` | Compiles optimized static assets to `/dist` |
| **Preview Production** | `npm run preview` | Serves the production build locally to test output |

---

## 🛡 Key Features & Modules

1. **Institutional Landing Page & Onboarding Guide:**
   - Visual introduction to the Ghana MoMo integrity framework with real-time statistics (₵1.48M float preserved, 32.4k merchant terminals).
   - 4-step interactive onboarding walkthrough educating users on frontline fraud patterns and zero-complacency rules.

2. **Message & Link Risk Analyser:**
   - Detects smishing links, high-urgency psychological coercion, and advance-fee lures.
   - Built-in 1-click field test scenarios (*MTN MoMo KYC alert*, *Ecobank loan fee*, *GRA recruitment*, *Stanbic bank debit*, *Foreign parcel link*).
   - **Active PIN Guardrail:** Automatically intercepts and redacts 4-digit PINs (`[GUARDRAIL REDACTED SENSITIVE PIN]`).
   - Progressive disclosure tabs for **Detected Signals**, **CSA 6-Vector Matrix**, and **Missing Evidence**.

3. **Frontline MoMo Counter Check (POS Terminal Mode):**
   - Screen recipient MSISDNs (`+233 XX XXX XXXX`) across **MTN MoMo**, **Telecel Cash**, and **AT Money**.
   - Live telemetry checking SIM activation age, velocity anomalies, and central blacklist matches.
   - Direct counter actions: **Halt Cash-Out / Freeze Session** and **Demand Physical Ghana Card Verification**.

4. **Voice Note Intelligence & Audio Screener:**
   - Speech-to-text transcription engine flagging urgent bail extortion and fake police threats.
   - Speech synthesis audio playback with interactive acoustic waveform frequency visualizer.

5. **Community Scam Intelligence Feed:**
   - Crowdsourced field reports with real-time risk filtering and location tagging (Accra, Kumasi, Tamale, Takoradi).
   - Interactive report submission modal persisting entries to browser `localStorage`.
   - Community corroboration (+1) counters.

6. **Social Bot Simulator (WhatsApp & Telegram Preview):**
   - Simulates automated group chat bots intercepting phishing links and deceptive payment demands in <600ms.
   - 1-click test chips for common scam baits (*Phishing Link*, *OTP Theft*, *Job Fee*, *Routine Chat*).

7. **Post-Incident Recovery Assistant:**
   - Immediate USSD emergency self-lock codes (`*170#` for MTN, `*110#` for Telecel/AT).
   - Direct registry for Cyber Security Authority (CSA 292) and Ghana Police CID Cyber Crime Unit.
   - Generates and exports formal Police Incident Dossiers (Clipboard copy & `.txt` download).

8. **Enterprise Case Management Desk:**
   - Compliance dashboard for tracking incidents, multi-agent investigation timelines, and status transitions (*Session Frozen*, *Under Investigation*, *Escalated to Compliance*, *Audit Complete*).
   - One-click CSV ledger export.

9. **Scam DNA Syndicate Graph:**
   - Interactive relational node map linking phishing campaigns, spoofed institutions, burner SIMs, and mule wallets.

---

## 🎨 Frontline Defense Design System Principles

- **Absolute Exclusion of "Safe":** The word "Safe", "Secure", or "Cleared" never appears in verdicts to prevent dangerous complacency.
- **Strict Prohibition of Green Affirmations:** Green checkmarks and badges are banned. The lowest tier of concern is calm analytical blue (`#2E86AB`).
- **Empirical Risk Tiers:**
  - 🔵 **Low Concern (`#2E86AB`):** Baseline condition; no elevated flags detected.
  - 🟡 **Suspicious (`#F2A33A`):** Behavioral anomaly detected; verification required.
  - 🔴 **High Risk (`#D64545`):** Known scam vector; immediate transaction freeze.
  - ⚫ **Unable to Assess (`#7A869A`):** Ambiguous or insufficient input.
- **Tabular Numbers (`tnum`):** Ghanaian phone numbers (`+233 XX XXX XXXX`) and financial figures use fixed-width tabular figures for instant visual scanning.

---

## 📂 Project Directory Structure

```
├── .env.example              # Environment variables template
├── index.html                # HTML entry point with Inter font & shield favicon
├── metadata.json             # Applet identity and capabilities metadata
├── package.json              # Project dependencies and npm scripts
├── tsconfig.json             # TypeScript strict compiler configuration
├── vite.config.ts            # Vite bundler configuration with Tailwind CSS v4
├── src/
│   ├── main.tsx              # React DOM entry point
│   ├── App.tsx               # App shell with dual-mode navigation & storage
│   ├── index.css             # Tailwind v4 theme tokens & tabular numbers
│   ├── types/
│   │   └── scamshield.ts     # TypeScript interfaces (Analysis, Reports, Vectors)
│   ├── data/
│   │   └── mockData.ts       # 6-Vector heuristic engine & seed field data
│   └── components/
│       ├── Logo.tsx          # Official shield logo component
│       ├── Header.tsx        # Sleek, modern header with emergency toll-free link
│       ├── LandingPage.tsx   # Institutional landing page with stats ticker
│       ├── OnboardingModal.tsx # 4-step guided frontline onboarding tour
│       ├── RiskBadge.tsx     # Standardized semantic risk badge (zero-green)
│       ├── AnalyzerTab.tsx   # Message/URL analyzer & MoMo counter POS mode
│       ├── VoiceIntelTab.tsx # Audio note player & acoustic stress screener
│       ├── FeedTab.tsx       # Community intelligence feed & report modal
│       ├── SocialBotTab.tsx  # WhatsApp/Telegram group chat bot simulator
│       ├── RecoveryTab.tsx   # USSD lock guide & police dossier generator
│       ├── EnterpriseTab.tsx # Compliance desk case management & CSV export
│       └── ScamGraphTab.tsx  # Scam DNA relational campaign explorer
```

---

## 📞 Official Emergency Contact (Ghana)
- **Cyber Security Authority (CSA) Toll-Free Hotline:** Dial **292** (24/7 National CERT-GH)
- **CSA WhatsApp Line:** 050 160 3111
- **Email:** report@csa.gov.gh
