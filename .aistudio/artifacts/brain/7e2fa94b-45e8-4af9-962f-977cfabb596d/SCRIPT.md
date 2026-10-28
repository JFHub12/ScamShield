# ScamShield — Complete Presentation & Demo Script

This script is structured for a 4-to-5 minute hackathon judging presentation, investor pitch, or stakeholder product walkthrough.

---

## 🎙️ Act 1: The Problem & The Frontline Reality (Minute 0:00 – 1:00)

**Speaker Line:**
> "Judges and colleagues, in Ghana today, Mobile Money (MoMo) is the lifeblood of our economy. Over 20 million active wallets process billions of cedis every month.
>
> But as our transactions moved to the counter, so did the fraudsters. Today, fraud is not about breaking complex cryptographic algorithms—it is about **social engineering**. Roadside merchants at Makola Market, Kejetia in Kumasi, and bank branch tellers are targeted daily with high-pressure phone calls, fake accidental reversal pleas, emergency bail extortion, and fake Ghana Card KYC update smishing links.
>
> When a merchant is under the midday sun with ten customers in line, they make decisions in seconds. A single wrong transfer can wipe out their week’s operating float.
>
> This is why we built **ScamShield**: an enterprise-grade frontline defense system and intelligence network engineered specifically for Ghana's mobile money merchants, tellers, and subscribers."

---

## 💻 Act 2: Landing Page & The "Zero-Complacency" Doctrine (Minute 1:00 – 1:45)

**Action on Screen:**
- Start on the **Landing Page** (`/`).
- Point out the official **Shield Emblem**, real-time metrics ticker (*₵1.48M Float Preserved, 32,400+ Merchant Terminals, <300ms Decision Latency*), and the CSA Ghana 292 direct hotline badge.

**Speaker Line:**
> "Notice our design philosophy: we call it the **'Zero-Complacency' Doctrine**. 
>
> In real-world fraud environments, displaying the word 'Safe' or green checkmarks is dangerous—it lulls agents into a false sense of finality when scammers can switch SIMs within hours. ScamShield strictly bans the word 'Safe' and never uses green affirmations. Instead, we evaluate every single signal through empirical risk states: **Low Concern**, **Suspicious**, **High Risk**, and **Unable to Assess**."

**Action on Screen:**
- Click **"Start Guided Tour"** or **"Launch Operational Defense System"** to enter the workspace.

---

## 🔍 Act 3: Live Threat & MoMo Counter Analyzer (Minute 1:45 – 2:45)

**Action on Screen:**
- In the **Threat & MoMo Check** tab, demonstrate the **Message & Link Checker**.
- Click the 1-click test case: **"PIN Leak & Shortened Link"** or **"MTN MoMo KYC Suspension"**.

**Speaker Line:**
> "Let’s test an actual smishing payload. A scammer sends an SMS claiming wallet suspension with a shortened link and asks for an OTP or PIN.
>
> Watch what happened the moment we loaded the text: our **Active Input Guardrail** automatically intercepted the user's secret PIN, masked it as `[GUARDRAIL REDACTED SENSITIVE PIN]`, and raised a critical alert: *Official telecom operators will NEVER ask for your secret PIN or OTP.*"

**Action on Screen:**
- Show the **Right Column Verdict**:
  - Point to the **High Risk Vector** badge and 94% confidence.
  - Switch between the progressive sub-tabs: **Signals Flagged**, **CSA 6-Vector Matrix**, and **Missing Evidence**.

**Speaker Line:**
> "Instead of giving an arbitrary black-box score, ScamShield is completely explainable. Our **6-Dimensional Threat Matrix**—grounded in official Cyber Security Authority Ghana research—measures Credential Theft, Fake Reversals, Psychological Urgency, Deceptive Domains, Institutional Spoofing, and Advance Fees. Every vector provides an actionable directive for the counter agent."

**Action on Screen:**
- Click the sub-mode toggle: **"MoMo Cash-Out Check (POS Mode)"**.
- Select **MTN MoMo**, enter phone `0244198234`, and amount `₵1,500`. Click **Verify Recipient Wallet**.

**Speaker Line:**
> "Now put yourself in the shoes of a kiosk merchant. A customer walks up demanding an urgent cashout. The merchant enters the phone number and amount.
>
> Instantly, ScamShield checks central fraud registries: this MSISDN matches **Syndicate #44** with an anomalous 14 cashouts in the last 3 hours. The agent immediately clicks **'HALT CASH-OUT / FREEZE SESSION'**, saving the merchant float and generating a formal CSA incident reference."

---

## 🎙️ Act 4: Voice Intelligence & Audio Note Screener (Minute 2:45 – 3:30)

**Action on Screen:**
- Click the **Voice Intel** tab.
- Click **"Listen to Recording"** on the *Emergency Medical Bail Impersonation* audio note.

**Speaker Line:**
> "One of the most devastating fraud vectors in Ghana is the emergency bail call: scammers call an agent or mother claiming her son was in a hit-and-run at Circle and police will remand him unless 1,200 GHS is sent immediately.
>
> ScamShield includes a dedicated **Voice Intelligence Engine**. With speech-to-text and acoustic cadence screening, it animates the frequency spectrum, flags synthetic sirens and coercive keywords ('Severe hit-and-run', 'Police sergeant bail demand'), and advises the teller: *Ghana Police Service never accepts mobile money bail at police posts.*"

---

## 🌐 Act 5: Community Feed, Social Bot & Emergency Recovery (Minute 3:30 – 4:30)

**Action on Screen:**
- Quick tour through the remaining tabs:
  1. **Community Feed:** Show field reports from Accra, Kumasi, and Tamale. Click **"Corroborate (+1)"**.
  2. **Bot Simulator:** Click quick bait **"Phishing Link"**; show ScamShield automated WhatsApp bot warning card appearing in <600ms.
  3. **Emergency Recovery:** Point to official USSD codes (`*170#`, `*110#`) and click **"Download Report (.txt)"** to generate a formatted formal police dossier for Ghana Police CID.
  4. **Ops Desk & Syndicate Map:** Highlight the multi-branch case management table and the interactive Scam DNA graph linking burner SIMs to mule cash-out wallets.

**Speaker Line:**
> "Finally, ScamShield turns every field encounter into shared defense:
> - Community reports update our nationwide threat feed in real time.
> - Our simulated social bot shows how these heuristics protect family WhatsApp groups before scams spread.
> - And if a victim has already lost funds, our Recovery Assistant provides instant USSD emergency locks and generates a certified Police Dossier ready for CID investigation.
> - In our Ops Desk and Syndicate Graph, compliance teams can trace interconnected mule wallets across networks."

---

## 🏆 Act 6: Conclusion & Vision (Minute 4:30 – 5:00)

**Speaker Line:**
> "To conclude: ScamShield is not just an algorithm; it is a frontline shield. It takes complex threat intelligence and puts it into the hands of the merchant behind the kiosk counter, protecting Ghanaian livelihoods one transaction at a time.
>
> Every line of code is live, running, and accessible right now on the cloud. Thank you, and we welcome your questions!"
