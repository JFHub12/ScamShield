import React, { useState } from 'react';
import { Logo } from './Logo';
import { 
  Search, 
  AudioWaveform, 
  Radio, 
  Share2, 
  FileWarning, 
  Building2, 
  Network, 
  PhoneCall, 
  Home, 
  Sparkles,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';

export type ActiveTab = 'analyzer' | 'voice' | 'feed' | 'bot' | 'recovery' | 'enterprise' | 'graph';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  reportCount: number;
  onOpenLanding: () => void;
  onOpenOnboarding: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  activeTab, 
  setActiveTab, 
  reportCount, 
  onOpenLanding, 
  onOpenOnboarding 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'analyzer' as const, label: 'Threat & MoMo Check', icon: Search, badge: null },
    { id: 'voice' as const, label: 'Voice Intel', icon: AudioWaveform, badge: null },
    { id: 'feed' as const, label: 'Community Feed', icon: Radio, badge: reportCount > 0 ? reportCount : null },
    { id: 'bot' as const, label: 'Bot Simulator', icon: Share2, badge: null },
    { id: 'recovery' as const, label: 'Emergency Recovery', icon: FileWarning, badge: '292' },
    { id: 'enterprise' as const, label: 'Ops Desk', icon: Building2, badge: null },
    { id: 'graph' as const, label: 'Syndicate Map', icon: Network, badge: null },
  ];

  return (
    <header className="bg-[#0F2A47] text-white border-b border-[#1E3A5F] sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Brand & Logo */}
          <div className="flex items-center gap-3">
            <button 
              onClick={onOpenLanding}
              className="flex items-center gap-2.5 text-left focus:outline-none group"
              title="Return to Home Landing"
            >
              <Logo size="md" />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-bold tracking-tight text-white group-hover:text-[#0E9F8E] transition">
                    SCAMSHIELD
                  </span>
                  <span className="bg-[#001722] text-[#0E9F8E] border border-[#0E9F8E]/30 text-[9px] font-bold px-1.5 py-0.2 rounded uppercase tracking-wider">
                    GH
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium hidden md:block">
                  Frontline Fraud Defense
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#0E9F8E] text-[#0F2A47] shadow-xs font-bold'
                      : 'text-slate-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-[#0F2A47] text-[#0E9F8E]' : 'bg-[#0E9F8E]/20 text-[#0E9F8E]'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Direct Toll-Free */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={onOpenOnboarding}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-medium border border-white/10 transition"
              title="Review Frontline Guide"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#0E9F8E]" />
              <span className="hidden xl:inline">Onboarding</span>
              <span>Guide</span>
            </button>

            <a
              href="tel:292"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-950/40 hover:bg-amber-900/60 text-[#F2A33A] text-xs font-bold border border-[#F2A33A]/40 transition"
              title="Cyber Security Authority Ghana Toll-Free Emergency Hotline"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>CSA 292</span>
            </a>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href="tel:292"
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-950/40 text-[#F2A33A] text-xs font-bold border border-[#F2A33A]/40"
            >
              <PhoneCall className="w-3 h-3" />
              <span>292</span>
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/10 text-slate-200 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-[#1E3A5F] space-y-1 animate-in fade-in">
            <div className="grid grid-cols-2 gap-1.5 pb-2">
              <button
                onClick={() => {
                  onOpenLanding();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 text-slate-200 text-xs font-medium"
              >
                <Home className="w-4 h-4 text-[#0E9F8E]" />
                <span>Landing Page</span>
              </button>
              <button
                onClick={() => {
                  onOpenOnboarding();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 text-slate-200 text-xs font-medium"
              >
                <Sparkles className="w-4 h-4 text-[#0E9F8E]" />
                <span>Onboarding Guide</span>
              </button>
            </div>

            <div className="space-y-1 pt-1 border-t border-[#1E3A5F]">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold ${
                      isActive
                        ? 'bg-[#0E9F8E] text-[#0F2A47] font-bold'
                        : 'text-slate-200 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/20">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
