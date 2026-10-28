import React, { useState } from 'react';
import { Logo } from './Logo';
import { RiskBadge } from './RiskBadge';
import { 
  ShieldAlert, 
  Lock, 
  RotateCcw, 
  PhoneCall, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  ArrowLeft, 
  X,
  Smartphone,
  Eye,
  Building2,
  Sparkles
} from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const steps = [
    {
      title: 'Institutional Vigilance & Zero-Complacency Doctrine',
      subtitle: 'Why ScamShield never uses the word "Safe" or green checkmarks',
      icon: ShieldAlert,
      content: (
        <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
          <p>
            In dynamic fraud environments like Ghana's mobile money ecosystem, false affirmations create dangerous counter complacency. The system never displays <strong>"Safe"</strong>, <strong>"Secure"</strong>, or <strong>"Cleared"</strong>.
          </p>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="font-bold text-[#0F172A] block uppercase tracking-wide text-[11px]">
              Empirical Risk Scale (Strict Semantic Adherence):
            </span>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200">
                <RiskBadge tier="low_concern" size="sm" showIcon={false} />
                <span className="text-[11px] text-slate-600">No elevated flags detected</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200">
                <RiskBadge tier="suspicious" size="sm" showIcon={false} />
                <span className="text-[11px] text-slate-600">Verification needed before payout</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200">
                <RiskBadge tier="high_risk" size="sm" showIcon={false} />
                <span className="text-[11px] text-slate-600">Known scam vector; freeze session</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200">
                <RiskBadge tier="unable_to_assess" size="sm" showIcon={false} />
                <span className="text-[11px] text-slate-600">Ambiguous or insufficient input</span>
              </div>
            </div>
          </div>

          <p className="text-slate-500 text-[11px] italic">
            Calm analytical blue represents the baseline condition. Green symbols are strictly forbidden to prevent fraudulent finality.
          </p>
        </div>
      )
    },
    {
      title: 'MoMo Counter Verification & Fake Reversal Defense',
      subtitle: 'Screen customer MSISDNs and prevent cashout float drainage',
      icon: Smartphone,
      content: (
        <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
          <p>
            Frontline merchants at Makola, Kejetia, and regional kiosks face relentless <strong>"Accidental Transfer"</strong> and <strong>"Delayed SMS"</strong> social engineering attacks.
          </p>

          <div className="space-y-2.5">
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 space-y-1">
              <strong className="text-red-950 block">The Fake Reversal Scam Rule:</strong>
              <p className="text-red-900 text-[11px]">
                If a caller or walk-in claims they "mistakenly sent MoMo to your wallet" and begs for immediate cash refund, <strong>NEVER</strong> reverse it manually or disburse cash. Demand that they file an official telecom dispute through their network provider.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <strong className="text-[#0F172A] block">SIM Activation Age & Velocity Telemetry:</strong>
              <p className="text-slate-600 text-[11px]">
                ScamShield checks recipient MSISDNs for newly registered SIMs (&lt;14 days) and abnormal cashout velocity spikes, warning merchants before cash leaves the counter.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Active Input Guardrails & Sensitive PIN Redaction',
      subtitle: 'Zero-leak boundary: never expose secret credentials',
      icon: Lock,
      content: (
        <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
          <p>
            ScamShield features automated client-side and server-side privacy guardrails that inspect every message, URL, and payment snippet:
          </p>

          <div className="p-3.5 rounded-xl bg-amber-50/90 border border-amber-300 space-y-2">
            <div className="flex items-center gap-2 text-amber-950 font-bold text-xs uppercase tracking-wide">
              <Lock className="w-4 h-4 text-[#F2A33A]" />
              <span>Automated PIN Masking Guardrail</span>
            </div>
            <p className="text-amber-900 text-[11px]">
              If any text contains a 4-to-6 digit PIN (e.g., "my PIN is 4829"), ScamShield instantly intercepts and replaces it with:
            </p>
            <div className="p-2 bg-white rounded-lg border border-amber-200 font-mono text-xs text-amber-800 font-bold">
              [GUARDRAIL REDACTED SENSITIVE PIN]
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-[11px]">
            <strong className="text-slate-800 block mb-1">CSA National Golden Rule:</strong>
            Legitimate telecom customer care representatives, bank managers, and police officers will <strong>NEVER</strong> ask for your secret PIN or SMS verification OTP.
          </div>
        </div>
      )
    },
    {
      title: 'Emergency USSD Codes & CSA Hotline Integration',
      subtitle: 'Immediate containment protocols following suspected fraud',
      icon: PhoneCall,
      content: (
        <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
          <p>
            When an account has been compromised or a victim approaches your counter in distress, execute the 3-step rapid response:
          </p>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <strong className="text-slate-900 block">1. Self-Service USSD Lock</strong>
                <span className="text-[11px] text-slate-500">Dial *170# (MTN) or *110# (Telecel/AT) immediately</span>
              </div>
              <span className="font-mono font-bold text-[#0F2A47] bg-white px-2.5 py-1 rounded border">Instant</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <strong className="text-slate-900 block">2. Cyber Security Authority 24/7</strong>
                <span className="text-[11px] text-slate-500">Call national emergency toll-free line 292</span>
              </div>
              <span className="font-mono font-bold text-[#D64545] bg-red-50 px-2.5 py-1 rounded border border-red-200">Dial 292</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <strong className="text-slate-900 block">3. Generate Police Dossier</strong>
                <span className="text-[11px] text-slate-500">Export formatted evidence packet for Ghana Police CID</span>
              </div>
              <span className="font-mono font-bold text-[#0E9F8E] bg-teal-50 px-2.5 py-1 rounded border border-teal-200">ScamShield PDF</span>
            </div>
          </div>
        </div>
      )
    }
  ];

  const current = steps[currentStep];
  const StepIcon = current.icon;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F172A]/75 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-xl p-6 sm:p-8 shadow-2xl border border-slate-200 flex flex-col space-y-6 relative overflow-hidden">
        {/* Subtle accent header line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0F2A47] via-[#0E9F8E] to-[#2E86AB]" />

        {/* Top Header */}
        <div className="flex items-center justify-between pt-1">
          <Logo size="md" showText={true} />
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
            title="Close tour"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Ticker */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-100 pb-2">
          <span>OPERATIONAL ONBOARDING GUIDE</span>
          <span className="font-bold text-[#0F2A47]">STEP {currentStep + 1} OF {steps.length}</span>
        </div>

        {/* Step Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#0F2A47] text-[#0E9F8E]">
              <StepIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#0F172A] leading-tight">
                {current.title}
              </h3>
              <p className="text-xs text-[#5B6B82] font-medium">{current.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Dynamic Body Content */}
        <div className="min-h-[220px]">
          {current.content}
        </div>

        {/* Progress Dots and Action Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <div className="flex items-center gap-1.5">
            {steps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentStep(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentStep
                    ? 'w-6 bg-[#0E9F8E]'
                    : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
                title={`Go to step ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            {currentStep > 0 && (
              <button
                onClick={handlePrev}
                className="px-3.5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            )}

            <button
              onClick={handleNext}
              className="px-5 py-2.5 rounded-xl bg-[#0F2A47] hover:bg-[#081A2D] text-white text-xs font-bold transition flex items-center gap-2 shadow-sm"
            >
              <span>{currentStep === steps.length - 1 ? 'Enter Operational Workspace' : 'Continue'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#0E9F8E]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
