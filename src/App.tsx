/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header, ActiveTab } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { OnboardingModal } from './components/OnboardingModal';
import { AnalyzerTab } from './components/AnalyzerTab';
import { VoiceIntelTab } from './components/VoiceIntelTab';
import { FeedTab } from './components/FeedTab';
import { SocialBotTab } from './components/SocialBotTab';
import { RecoveryTab } from './components/RecoveryTab';
import { EnterpriseTab } from './components/EnterpriseTab';
import { ScamGraphTab } from './components/ScamGraphTab';
import { Logo } from './components/Logo';
import { INITIAL_COMMUNITY_REPORTS } from './data/mockData';
import { CommunityReport, RiskTier } from './types/scamshield';
import { PhoneCall, ShieldAlert, Sparkles, Home } from 'lucide-react';

export default function App() {
  const [viewMode, setViewMode] = useState<'landing' | 'app'>('landing');
  const [activeTab, setActiveTab] = useState<ActiveTab>('analyzer');
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  // Check if first-time visitor to open onboarding or prompt
  useEffect(() => {
    try {
      const hasOnboarded = localStorage.getItem('scamshield_has_onboarded');
      if (!hasOnboarded) {
        // Can optionally auto-prompt onboarding or keep ready
      }
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, []);

  // Community reports state with localStorage fallback
  const [reports, setReports] = useState<CommunityReport[]>(() => {
    try {
      const saved = localStorage.getItem('scamshield_community_reports');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not parse saved reports from localStorage', e);
    }
    return INITIAL_COMMUNITY_REPORTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('scamshield_community_reports', JSON.stringify(reports));
    } catch (e) {
      console.warn('Could not save reports to localStorage', e);
    }
  }, [reports]);

  const handleAddReport = (newRep: Omit<CommunityReport, 'id' | 'timestamp' | 'corroboratedCount'>) => {
    const report: CommunityReport = {
      ...newRep,
      id: `rep-${Date.now()}`,
      timestamp: 'Just now',
      corroboratedCount: 1
    };
    setReports((prev) => [report, ...prev]);
  };

  const handleCorroborate = (id: string) => {
    setReports((prev) =>
      prev.map((rep) => (rep.id === id ? { ...rep, corroboratedCount: rep.corroboratedCount + 1 } : rep))
    );
  };

  const handleForwardFromAnalyzer = (target: string, description: string, tier: RiskTier) => {
    handleAddReport({
      category: target.startsWith('http') ? 'Phishing URL' : 'MoMo Fraud',
      targetIdentifier: target,
      telecomOrPlatform: target.startsWith('http') ? 'SMS' : 'MTN MoMo',
      description,
      riskTier: tier,
      location: 'Accra Central',
      status: 'Unverified'
    });
    setActiveTab('feed');
  };

  const handleCompleteOnboarding = () => {
    try {
      localStorage.setItem('scamshield_has_onboarded', 'true');
    } catch (e) {}
    setIsOnboardingOpen(false);
    setViewMode('app');
  };

  // If user is on the Landing Page
  if (viewMode === 'landing') {
    return (
      <>
        <LandingPage
          onEnterApp={() => setViewMode('app')}
          onOpenOnboarding={() => setIsOnboardingOpen(true)}
        />
        <OnboardingModal
          isOpen={isOnboardingOpen}
          onClose={() => setIsOnboardingOpen(false)}
          onComplete={handleCompleteOnboarding}
        />
      </>
    );
  }

  // Operational Workspace Mode
  return (
    <div className="min-h-screen bg-[#F6F8FB] text-[#0F172A] flex flex-col font-sans selection:bg-[#0E9F8E]/20 selection:text-[#0F2A47]">
      {/* Top persistent institutional header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        reportCount={reports.length}
        onOpenLanding={() => setViewMode('landing')}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
      />

      {/* Main operational workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === 'analyzer' && (
          <AnalyzerTab onReportIncident={handleForwardFromAnalyzer} />
        )}
        {activeTab === 'voice' && <VoiceIntelTab />}
        {activeTab === 'feed' && (
          <FeedTab
            reports={reports}
            onAddReport={handleAddReport}
            onCorroborate={handleCorroborate}
          />
        )}
        {activeTab === 'bot' && <SocialBotTab />}
        {activeTab === 'recovery' && <RecoveryTab />}
        {activeTab === 'enterprise' && <EnterpriseTab />}
        {activeTab === 'graph' && <ScamGraphTab />}
      </main>

      {/* Onboarding Walkthrough Modal */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onComplete={handleCompleteOnboarding}
      />

      {/* Institutional Footer conforming strictly to Frontline Defense System mandates */}
      <footer className="bg-[#0B1C30] text-slate-300 border-t border-[#1E3A5F] py-8 px-4 sm:px-6 mt-12 text-xs">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <Logo size="md" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold text-sm tracking-wide">
                    SCAMSHIELD GHANA
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="text-[#0E9F8E] font-medium text-xs">
                    Frontline Defense & MoMo Integrity Network
                  </span>
                </div>
                <p className="text-slate-400 text-xs mt-1 max-w-xl">
                  Serving mobile money counter merchants, bank branch tellers, and subscribers across Greater Accra, Ashanti, Western, and Northern regions.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono">
              <button
                onClick={() => setIsOnboardingOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#17385E] text-slate-200 hover:text-white border border-[#2A4D78] transition"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#0E9F8E]" />
                <span>Onboarding Guide</span>
              </button>

              <button
                onClick={() => setViewMode('landing')}
                className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#17385E] text-slate-200 hover:text-white border border-[#2A4D78] transition"
              >
                <Home className="w-3.5 h-3.5 text-[#0E9F8E]" />
                <span>Landing Page</span>
              </button>

              <a
                href="tel:292"
                className="bg-[#D64545] hover:bg-[#b83838] text-white px-3 py-1 rounded-md font-bold transition flex items-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>292 (Toll Free)</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-400 text-[11px] leading-relaxed">
            <div>
              <strong className="text-slate-200 block mb-1 uppercase tracking-wider">
                Explainability Mandate
              </strong>
              <p>
                Every risk assessment produces transparent behavioral evidence rather than arbitrary numeric scores. The system distinguishes confirmed facts from inferential anomalies.
              </p>
            </div>

            <div>
              <strong className="text-slate-200 block mb-1 uppercase tracking-wider">
                Absolute Non-Affirmation Policy
              </strong>
              <p>
                In dynamic fraud environments, the absence of known indicators does not establish absolute safety. The term "Safe" is intentionally excluded to prevent dangerous counter complacency.
              </p>
            </div>

            <div>
              <strong className="text-slate-200 block mb-1 uppercase tracking-wider">
                Operational Legal Boundary
              </strong>
              <p>
                This application acts as a triage and decision-support tool. Formal transaction reversals and SIM freezes require direct carrier USSD authentication or Police CID court orders.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-500 text-[10px]">
            <span>
              ScamShield Frontline Defense System • Built for Ghana MoMo & Cyber Protection
            </span>
            <span className="font-mono">
              Inter-Telecom Spec v3.2 • Confidential Frontline Release
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
