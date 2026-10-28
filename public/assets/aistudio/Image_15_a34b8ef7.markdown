---
name: Frontline Defense System
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf6'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e6eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4ff'
  on-surface: '#0b1c30'
  on-surface-variant: '#43474d'
  inverse-surface: '#213146'
  inverse-on-surface: '#eaf1ff'
  outline: '#74777e'
  outline-variant: '#c4c6ce'
  surface-tint: '#486080'
  primary: '#00152c'
  on-primary: '#ffffff'
  primary-container: '#0f2a47'
  on-primary-container: '#7a92b4'
  inverse-primary: '#b0c8ed'
  secondary: '#006b5f'
  on-secondary: '#ffffff'
  secondary-container: '#7ef3e0'
  on-secondary-container: '#006f63'
  tertiary: '#001722'
  on-tertiary: '#ffffff'
  tertiary-container: '#002d3e'
  on-tertiary-container: '#4699bf'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d3e4ff'
  primary-fixed-dim: '#b0c8ed'
  on-primary-fixed: '#001c38'
  on-primary-fixed-variant: '#304867'
  secondary-fixed: '#81f6e3'
  secondary-fixed-dim: '#63dac7'
  on-secondary-fixed: '#00201c'
  on-secondary-fixed-variant: '#005047'
  tertiary-fixed: '#c1e8ff'
  tertiary-fixed-dim: '#81d0f8'
  on-tertiary-fixed: '#001e2b'
  on-tertiary-fixed-variant: '#004d67'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4ff'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-lg-medium:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-md-medium:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.03em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.05em
  data-mono:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 22px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 1.5rem
  margin-desktop: 2.5rem
  space-2xs: 0.25rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
---

## Brand & Style

This design system serves frontline mobile money (MoMo) merchants, bank branch agents, and compliance operators facing social engineering fraud across Ghana. The interface reflects uncompromising institutional vigilance: vigilant, precise, authoritative, and unambiguous under fast-paced, high-stress counter transactions.

The visual direction combines **Corporate/Modern FinTech** rigor with field-grade operational utility. The aesthetic balances deep banking authority with swift cognitive processing, avoiding decorative trends, playful animations, or low-contrast stylistic flourishes.

### Critical Behavioral and Tone Mandates
- **Absolute Exclusion of "Safe":** The concept of "absolute safety" creates dangerous complacency in dynamic fraud environments. The system never displays the word "Safe", "Secure", "Cleared", or "Verified Safe". Instead, state conditions empirically using objective risk states (e.g., "Low Concern", "Suspicious", "Elevated Risk").
- **Strict Prohibition of Green Affirmations:** Never render green shields, green badges, green rings, or green checkmarks. Green signals false finality. The lowest tier of concern is represented strictly through calm, analytical blue.
- **Operational Reality:** Field interactions occur on mobile devices under direct equatorial sunlight or inside crowded kiosks. Components must feature bold visual hierarchy, immediate contrast, and large tactile boundaries that minimize human error.

## Colors

The palette establishes an immediate operational hierarchy anchored by sovereign institutional navy and clinical risk gradations.

### Core Brand & Surfaces
- **Primary Navy (`#0F2A47`):** The institutional anchor. Used for primary CTAs, persistent navigation, primary headers, and high-priority interface shells.
- **Accent Teal (`#0E9F8E`):** Used deliberately for active states, navigational selections, focus rings, progress tracks, and non-verdict interactive accents.
- **Canvas Surface (`#F6F8FB`):** A cool, glare-resistant background tone designed for high-glare environments.
- **Card Surface (`#FFFFFF`):** High-clarity elevated ground for threat modules, transaction details, and entry forms.
- **Border Default (`#E2E8F0`):** Defines clean containment boundaries across interactive cards and inputs.
- **Text Primary (`#0F172A`):** Deep slate tone ensuring AAA contrast against white cards and neutral fields.
- **Text Secondary (`#5B6B82`):** Calm, accessible neutral for meta-labels, timestamps, and secondary operational details.

### Risk Status Scale (Strict Semantic Adherence)
Status colors must not be substituted, augmented with gradients, or accompanied by green accents:
- **Low Concern (`#2E86AB`):** Calm analytical blue. Indicates no elevated indicators currently flagged. Accompanied exclusively by informational or calm state iconography.
- **Suspicious (`#F2A33A`):** Amber caution. Signals anomaly detection, unusual velocity, cross-network mismatch, or new SIM activity. Demands merchant verification before payout.
- **High Risk (`#D64545`):** High-alert red. Denotes known scam vectors, blocklist matches, or active social engineering signals. Triggers explicit freeze actions.
- **Unable to Assess (`#7A869A`):** Slate grey. Signals low network telemetry, foreign prefix unverified, or offline verification mode. Treats ambiguity with defensive neutrality.

## Typography

The type system relies completely on **Inter** to ensure maximum legibility across lower-tier mobile displays, high ambient brightness, and dense numerical layouts.

### Usage Standards
- **Numerical Rigor:** Transaction amounts, wallet IDs, and Ghanaian mobile numbers (`+233 XX XXX XXXX`) use tabular numbers (`tnum`) to keep digits vertically aligned during live ledger entry.
- **Risk Typography:** Threat statuses must use `label-md` or `label-sm` in all-caps uppercase styling with positive letter-spacing (`0.03em` to `0.05em`) to ensure instant recognition at a glance.
- **Hierarchy Density:** Never drop body text below 14px on mobile scanning screens. Field agents require instantaneous visual parsing while interacting with end-customers.

## Layout & Spacing

The layout is architected around a fluid, touch-first column grid designed to accommodate quick one-handed mobile use by agent networks while expanding to structured panels on tablet and desktop compliance stations.

### Grid & Breakpoints
- **Mobile (0 – 599px):** 4-column layout with `16px` margins and `16px` gutters. Critical actions are anchored to the bottom sheet or bottom viewport boundary.
- **Tablet / Counter POS (600 – 1023px):** 8-column layout with `24px` margins and `16px` gutters. Two-pane split workflow (Live Threat Lookup on left; Customer Verification details on right).
- **Desktop / Ops Center (1024px+):** 12-column layout with `40px` margins and `24px` gutters. Max-width container capped at `1280px` to maintain tight visual tracking during audit workflows.

### Spacing Philosophy
Spacing prioritizes immediate optical separation between verification tiers. Form fields and critical decision triggers are decoupled by `space-lg` (`24px`) to prevent fat-finger mistakes during cash-in and cash-out authorization flows.

## Elevation & Depth

Visual hierarchy is communicated via clean structural framing and crisp tonal layering rather than deep stylistic shadows. Heavy drop shadows reduce screen contrast under sunlight; therefore, this system relies on low-contrast structural outlines bolstered by micro ambient shadows.

### Surface Hierarchy
- **Base Canvas (`#F6F8FB`):** Ground level. Houses all global templates, persistent navigation bars, and page-level metadata.
- **Surface Level 1 (`#FFFFFF`):** Base cards, data tables, and input forms. Framed with a 1px solid border (`#E2E8F0`) and an ambient micro-shadow: `0 1px 3px rgba(15, 42, 71, 0.05)`.
- **Surface Level 2 (Elevated Assessment Cards):** Used for dynamic threat assessment outputs and verification overlays. Framed with a 1px border (`#CBD5E1`) and a directional lift shadow: `0 4px 12px rgba(15, 42, 71, 0.08)`.
- **Surface Level 3 (Action Modals & Risk Sheets):** Critical intervention modals and freeze alerts. Shadow: `0 12px 32px rgba(15, 23, 42, 0.16)`. Combined with a backdrop overlay of `#0F172A` at 60% opacity.

### Risk Elevation Strips
High-priority threat cards apply a persistent 4px solid left border in the respective risk color (`#D64545`, `#F2A33A`, `#2E86AB`, or `#7A869A`) to anchor scanning priority without coloring entire card backgrounds.

## Shapes

The design uses a 16px (`1rem`) foundational curve across primary structural surfaces. This balances modern software approachability with the visual discipline expected of banking and risk infrastructure.

### Geometry Rules
- **Cards and Containers:** Standardized at `rounded-lg` (16px / `1rem`). This forms a distinct silhouette on mobile displays.
- **Buttons and Inputs:** Standardized at 12px (`0.75rem`) corner radius. This keeps interactive elements visually distinct from the larger 16px cards containing them.
- **Status Badges & Pill Indicators:** Standardized at full-pill format (`9999px`) to maintain universal visual distinction from structural cards and interactive inputs.
- **Internal Alert Banners:** Set to 8px (`0.5rem`) within cards to nest properly within the primary 16px parent border radius.

## Components

### Buttons & Interactive Triggers
- **Tap Targets:** Every button maintains a strict minimum height of `48px` (recommended `52px` for primary triggers) with a minimum tap width of `48px`.
- **Primary Action (Deep Navy):** Background `#0F2A47`, text `#FFFFFF`, border-radius 12px. Active press state shifts to `#081A2D`. Focused with a 2px outline in `#0E9F8E` offset by 2px.
- **Destructive/Freeze Action (High Risk):** Background `#D64545`, text `#FFFFFF`, border-radius 12px. Used exclusively for "Halt Payout", "Flag Suspicious Caller", or "Freeze Session".
- **Secondary Action:** Background `#FFFFFF`, border 1.5px solid `#E2E8F0`, text `#0F2A47`.
- **Tertiary Action:** Flat background, text `#0E9F8E`, font weight 600, with minimum padding ensuring the 48px hit boundary.

### Risk Assessment Badges (Chips)
Badges communicate live risk states without celebratory or green motifs:
- **Low Concern Chip:** Background `rgba(46, 134, 171, 0.10)`, text `#2E86AB`, border 1px solid `rgba(46, 134, 171, 0.30)`. Icon: Analytical info circle or shield outline (in `#2E86AB`).
- **Suspicious Chip:** Background `rgba(242, 163, 58, 0.12)`, text `#9C5B08`, border 1px solid `rgba(242, 163, 58, 0.40)`. Icon: Triangular alert outline.
- **High Risk Chip:** Background `rgba(214, 69, 69, 0.12)`, text `#D64545`, border 1px solid `rgba(214, 69, 69, 0.40)`. Icon: Octagonal or raised-hand stop icon.
- **Unable to Assess Chip:** Background `rgba(122, 134, 154, 0.12)`, text `#4A5568`, border 1px solid `rgba(122, 134, 154, 0.35)`. Icon: Disconnected node or query symbol.

### Form Inputs & MoMo Lookup Fields
- **Container Height:** `52px` baseline height to prevent mis-taps.
- **Default State:** Background `#FFFFFF`, border 1.5px solid `#E2E8F0`, text `#0F172A`, placeholder `#7A869A`, radius 12px.
- **Focus State:** Border 2px solid `#0E9F8E` with an outer focus halo of `0 0 0 3px rgba(14, 159, 142, 0.15)`.
- **Dial Code & Wallet Prefix Field:** Fixed leading block with solid separator line (`#E2E8F0`) displaying Ghana country code (`+233`) and telecom network provider pills (MTN, Telecel, AT) with clear monospaced alignment.

### Cards & Threat Detail Panels
- **Structure:** Background `#FFFFFF`, 16px corner radius, 1px border `#E2E8F0`, interior padding `20px` (mobile) to `24px` (desktop).
- **Incident Summary Strip:** The top edge or left border features a 4px accent line matching the threat tier. Includes explicit threat labels: "INDICATOR DETECTED", "UNREGISTERED AGENT SIM", or "MATCHES KNOWN FRAUD RING".

### Checkboxes & Verification Toggles
- **Scale:** Minimum check box size of `24x24px` with a hit box of `48x48px`.
- **Active State:** Background `#0F2A47` with a clean white cross-check mark. **Never use green checks.** In operational inspection lists, checked states represent verified checklist items rendered in `#0F2A47` or `#0E9F8E`.

### Data Lists & Ledger Feed
- **Row Spacing:** Minimum row height of `56px`. Rows are demarcated by 1px bottom border `#E2E8F0`.
- **Layout:** Leading icon indicates verification outcome (using the 4 risk tokens); title displays MSISDN/Account ID; trailing section displays timestamp and risk badge.