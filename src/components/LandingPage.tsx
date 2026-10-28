import React from 'react';
import { Logo } from './Logo';
import { RiskBadge } from './RiskBadge';
import { 
  ShieldAlert, 
  Search, 
  PhoneCall, 
  Lock, 
  RotateCcw, 
  AudioWaveform, 
  Share2, 
  Network, 
  FileWarning, 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight, 
  Sparkles,
  Layers,
  MapPin,
  Clock,
  ShieldCheck,
  Smartphone
} from 'lucide-react';

interface LandingPageProps {
  onEnterApp: () => void;
  onOpenOnboarding: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp, onOpenOnboarding }) => {
  return (
    <div className="min-h-screen bg-[#F6F8FB] text-[#0F172A] flex flex-col font-sans">
      {/* Top Persistent Bar */}
      <nav className="bg-[#0F2A47] text-white border-b border-[#1E3A5F] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={onEnterApp}>
            <Logo size="md" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-white">SCAMSHIELD</span>
                <span className="bg-[#001722] text-[#0E9F8E] border border-[#0E9F8E]/40 text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wider">
                  GHANA DEFENSE
                </span>
              </div>
              <p className="text-[11px] text-[#94A3B8] font-medium hidden sm:block">
                National Frontline Anti-Social Engineering Network
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenOnboarding}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-600 hover:border-[#0E9F8E] hover:bg-[#1A385C] text-xs font-semibold text-slate-200 transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#0E9F8E]" />
              <span>Guided Tour</span>
            </button>

            <a
              href="tel:292"
              className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-950/40 border border-[#F2A33A]/40 text-[#F2A33A] text-xs font-bold transition hover:bg-amber-900/60"
              title="Cyber Security Authority Ghana Direct Emergency Hotline"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>CSA 292</span>
            </a>

            <button
              onClick={onEnterApp}
              className="px-5 py-2.5 rounded-xl bg-[#0E9F8E] hover:bg-[#0ca392] active:scale-[0.99] text-[#0F2A47] font-bold text-xs sm:text-sm transition flex items-center gap-2 shadow-sm"
            >
              <span>Launch Console</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-[#E2E8F0] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Mission & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E6EEFF] border border-[#CBD5E1] text-[#0F2A47] text-xs font-bold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-[#0E9F8E] animate-pulse"></span>
                <span>INTER-TELECOM MOMO INTEGRITY FRAMEWORK</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0F172A] leading-tight">
                National Fraud Shield for Ghana's Mobile Money & Banking Frontline.
              </h1>

              <p className="text-sm sm:text-base text-[#5B6B82] leading-relaxed max-w-2xl">
                Protecting counter agents, kiosk tellers, and subscribers across Greater Accra, Ashanti, and the Northern regions against coercive social engineering, fake accidental reversals, and smishing credential harvesting.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={onEnterApp}
                  className="min-h-[52px] px-8 bg-[#0F2A47] hover:bg-[#081A2D] active:scale-[0.99] text-white font-bold rounded-xl text-sm transition shadow-md flex items-center justify-center gap-2.5"
                >
                  <span>Launch Operational Defense System</span>
                  <ArrowRight className="w-4 h-4 text-[#0E9F8E]" />
                </button>

                <button
                  onClick={onOpenOnboarding}
                  className="min-h-[52px] px-6 bg-white hover:bg-slate-50 active:scale-[0.99] text-[#0F2A47] font-bold rounded-xl text-sm border-1.5 border-[#E2E8F0] hover:border-[#0E9F8E] transition flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#0E9F8E]" />
                  <span>Start Guided Onboarding</span>
                </button>
              </div>

              {/* National Partner Alignment */}
              <div className="pt-4 flex items-center gap-6 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#0E9F8E]" />
                  <span>CSA 292 Integration</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-[#0E9F8E]" />
                  <span>Zero-Complacency Doctrine</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-[#0E9F8E]" />
                  <span>MTN, Telecel, AT Link</span>
                </span>
              </div>
            </div>

            {/* Right Column: Interactive Card Mockup with Official Logo */}
            <div className="lg:col-span-5">
              <div className="bg-[#0F2A47] rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-[#1E3A5F] space-y-6 relative overflow-hidden">
                {/* Visual glow element */}
                <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-[#0E9F8E]/20 blur-3xl pointer-events-none" />

                <div className="flex items-center justify-between pb-4 border-b border-[#1E3A5F]">
                  <div className="flex items-center gap-3">
                    <Logo size="lg" />
                    <div>
                      <h3 className="text-base font-bold text-white leading-tight">Live Counter Radar</h3>
                      <p className="text-[11px] text-[#0E9F8E] font-mono">NODE ACC-MAKOLA-14</p>
                    </div>
                  </div>
                  <RiskBadge tier="high_risk" size="sm" />
                </div>

                {/* Simulated threat intercept snippet */}
                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-[#091B30] border border-[#1E3A5F] space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                      <span>INTERCEPTED PAYLOAD</span>
                      <span className="text-[#F2A33A]">CONFIDENTIAL PIN MASKED</span>
                    </div>
                    <p className="text-xs text-slate-200 font-mono leading-relaxed">
                      "MTN MoMo Alert: Wallet suspended in 2 hours. Update at http://mtn-kyc.cc or share [PIN REDACTED]."
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-[10px] text-slate-400 uppercase font-mono block">Threat Vector</span>
                      <strong className="text-red-400 font-semibold text-xs">Credential Exfiltration</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-[10px] text-slate-400 uppercase font-mono block">Empirical Risk</span>
                      <strong className="text-red-400 font-semibold text-xs">94% Confidence</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={onEnterApp}
                    className="w-full py-3 bg-[#0E9F8E] hover:bg-[#0ca392] text-[#0F2A47] font-bold rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Test Full Diagnostic Engine in Console</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Statistics Ticker */}
      <section className="bg-[#0B1C30] text-white py-8 border-b border-[#1E3A5F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tnum">₵ 1.48M</span>
              <p className="text-xs text-slate-400 uppercase tracking-wider">MoMo Float Preserved</p>
            </div>
            <div className="space-y-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#0E9F8E] font-mono tnum">32,400+</span>
              <p className="text-xs text-slate-400 uppercase tracking-wider">Frontline Kiosk Terminals</p>
            </div>
            <div className="space-y-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tnum">6-Vector</span>
              <p className="text-xs text-slate-400 uppercase tracking-wider">CSA Heuristic Matrix</p>
            </div>
            <div className="space-y-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#F2A33A] font-mono tnum">&lt; 300ms</span>
              <p className="text-xs text-slate-400 uppercase tracking-wider">Decision Latency</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Core Defense Capabilities */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-[#0E9F8E] uppercase tracking-wider">
            Enterprise Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
            Comprehensive Threat Mitigation Across Every Counter Touchpoint
          </h2>
          <p className="text-xs sm:text-sm text-[#5B6B82]">
            Field-tested tools designed specifically for mobile money agents, compliance officers, and everyday consumers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div 
            onClick={onEnterApp}
            className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm hover:shadow-md transition cursor-pointer space-y-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#0F2A47] text-[#0E9F8E] flex items-center justify-center">
              <Smartphone className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#0E9F8E] transition">
              MoMo Counter Cash-Out Check
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Screen Ghanaian recipient MSISDNs (+233), verify SIM activation age, and spot anomalous cash-out velocity spikes before physical notes leave the counter.
            </p>
            <div className="pt-2 text-xs font-bold text-[#0F2A47] flex items-center gap-1">
              <span>Explore POS Mode</span>
              <ChevronRight className="w-4 h-4 text-[#0E9F8E]" />
            </div>
          </div>

          {/* Card 2 */}
          <div 
            onClick={onEnterApp}
            className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm hover:shadow-md transition cursor-pointer space-y-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#0F2A47] text-[#0E9F8E] flex items-center justify-center">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#0E9F8E] transition">
              Smishing & URL Risk Analyser
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Inspect suspicious SMS, WhatsApp demands, or shortened links. Features automated 4-digit PIN redaction and brand mimicry domain heuristics.
            </p>
            <div className="pt-2 text-xs font-bold text-[#0F2A47] flex items-center gap-1">
              <span>Test Smishing Engine</span>
              <ChevronRight className="w-4 h-4 text-[#0E9F8E]" />
            </div>
          </div>

          {/* Card 3 */}
          <div 
            onClick={onEnterApp}
            className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm hover:shadow-md transition cursor-pointer space-y-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#0F2A47] text-[#0E9F8E] flex items-center justify-center">
              <AudioWaveform className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#0E9F8E] transition">
              Voice Note Intelligence
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Acoustic stress and speech-to-text transcription engine flagging urgent bail extortion, fake police threats, and coercive emotional pressure.
            </p>
            <div className="pt-2 text-xs font-bold text-[#0F2A47] flex items-center gap-1">
              <span>Play Audio Intercepts</span>
              <ChevronRight className="w-4 h-4 text-[#0E9F8E]" />
            </div>
          </div>

          {/* Card 4 */}
          <div 
            onClick={onEnterApp}
            className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm hover:shadow-md transition cursor-pointer space-y-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#0F2A47] text-[#0E9F8E] flex items-center justify-center">
              <Network className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#0E9F8E] transition">
              Scam DNA Syndicate Graph
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Correlate recurring burner phone numbers, spoofed domains, and mule mobile money cashout wallets into unified visual fraud campaign graphs.
            </p>
            <div className="pt-2 text-xs font-bold text-[#0F2A47] flex items-center gap-1">
              <span>Explore Syndicate Map</span>
              <ChevronRight className="w-4 h-4 text-[#0E9F8E]" />
            </div>
          </div>

          {/* Card 5 */}
          <div 
            onClick={onEnterApp}
            className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm hover:shadow-md transition cursor-pointer space-y-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#0F2A47] text-[#0E9F8E] flex items-center justify-center">
              <Share2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#0E9F8E] transition">
              Social Community Bot Simulator
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Simulate WhatsApp and Telegram group chat bots providing instant, automated scam-warning advisories whenever phishing links are shared.
            </p>
            <div className="pt-2 text-xs font-bold text-[#0F2A47] flex items-center gap-1">
              <span>Simulate Group Chat</span>
              <ChevronRight className="w-4 h-4 text-[#0E9F8E]" />
            </div>
          </div>

          {/* Card 6 */}
          <div 
            onClick={onEnterApp}
            className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm hover:shadow-md transition cursor-pointer space-y-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#0F2A47] text-[#0E9F8E] flex items-center justify-center">
              <FileWarning className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#0E9F8E] transition">
              Emergency USSD & Police Dossier
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Direct emergency wallet lock codes (*170#, *110#), 24/7 CSA Ghana 292 hotline link, and 1-click formal Police CID report generation.
            </p>
            <div className="pt-2 text-xs font-bold text-[#0F2A47] flex items-center gap-1">
              <span>View Recovery Tools</span>
              <ChevronRight className="w-4 h-4 text-[#0E9F8E]" />
            </div>
          </div>
        </div>
      </section>

      {/* The Zero-Complacency Behavioral Doctrine Section */}
      <section className="bg-[#0F2A47] text-white py-16 md:py-20 border-y border-[#1E3A5F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#0E9F8E] uppercase tracking-wider">
                <Lock className="w-4 h-4" />
                <span>Non-Negotiable Behavioral Mandate</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                The "Zero-Complacency" Defense Doctrine
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In real-world fraud environments, "cleared" badges create fatal cognitive blindspots. Scammers frequently switch sender IDs and SIM cards within hours. Therefore, ScamShield enforces three strict systemic rules:
              </p>

              <div className="space-y-3 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <strong className="text-white block">1. Absolute Exclusion of "Safe":</strong>
                  <span className="text-slate-300">The words "Safe", "Secure", and "Cleared" are banned across the entire platform. Conditions are expressed strictly as objective risk states.</span>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <strong className="text-white block">2. Strict Prohibition of Green Affirmations:</strong>
                  <span className="text-slate-300">Green signals false finality. The lowest tier of concern is represented strictly through calm analytical blue (#2E86AB).</span>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <strong className="text-white block">3. Transparent Evidence vs. Inference:</strong>
                  <span className="text-slate-300">Every verdict explicitly presents uncorroborated gaps so frontline tellers know exactly what remains unverified.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-[#091B30] rounded-2xl p-6 sm:p-8 border border-[#1E3A5F] space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Risk Matrix Scale</span>
                  <span className="text-[11px] font-mono text-[#0E9F8E]">CSA Standard</span>
                </div>

                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-500/30 flex items-center justify-between">
                    <div>
                      <strong className="text-blue-300 text-xs block">LOW CONCERN</strong>
                      <span className="text-[11px] text-slate-400">Baseline condition; no elevated flags</span>
                    </div>
                    <RiskBadge tier="low_concern" size="sm" showIcon={false} />
                  </div>

                  <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 flex items-center justify-between">
                    <div>
                      <strong className="text-amber-300 text-xs block">SUSPICIOUS</strong>
                      <span className="text-[11px] text-slate-400">Anomaly detected; demand physical ID</span>
                    </div>
                    <RiskBadge tier="suspicious" size="sm" showIcon={false} />
                  </div>

                  <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/30 flex items-center justify-between">
                    <div>
                      <strong className="text-red-300 text-xs block">HIGH RISK</strong>
                      <span className="text-[11px] text-slate-400">Known vector; halt transaction</span>
                    </div>
                    <RiskBadge tier="high_risk" size="sm" showIcon={false} />
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-between">
                    <div>
                      <strong className="text-slate-300 text-xs block">UNABLE TO ASSESS</strong>
                      <span className="text-[11px] text-slate-400">Ambiguous snippet; seek corroboration</span>
                    </div>
                    <RiskBadge tier="unable_to_assess" size="sm" showIcon={false} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Direct Call to Action Footer Banner */}
      <section className="py-16 bg-white border-t border-[#E2E8F0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <Logo size="xl" className="mx-auto" />

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
            Equip Your Counter Terminal with ScamShield Today
          </h2>

          <p className="text-xs sm:text-sm text-[#5B6B82] max-w-xl mx-auto leading-relaxed">
            Join thousands of Ghanaian merchants and financial compliance agents protecting mobile money integrity.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={onEnterApp}
              className="w-full sm:w-auto min-h-[50px] px-8 bg-[#0F2A47] hover:bg-[#081A2D] text-white font-bold rounded-xl text-sm transition flex items-center justify-center gap-2 shadow-md"
            >
              <span>Enter Operational Workspace</span>
              <ArrowRight className="w-4 h-4 text-[#0E9F8E]" />
            </button>

            <button
              onClick={onOpenOnboarding}
              className="w-full sm:w-auto min-h-[50px] px-6 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-sm transition"
            >
              <span>Review 4-Step Onboarding Tour</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0B1C30] text-slate-400 py-6 border-t border-slate-800 text-xs text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Logo size="sm" />
            <span className="text-white font-bold">SCAMSHIELD GHANA</span>
            <span>• Frontline Anti-Social Engineering Network</span>
          </div>

          <span className="text-[11px] text-slate-500 font-mono">
            Direct CSA Hotline: 292 | Operational v3.2
          </span>
        </div>
      </footer>
    </div>
  );
};
