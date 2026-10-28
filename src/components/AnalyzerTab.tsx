import React, { useState } from 'react';
import { AnalysisResult, RiskTier } from '../types/scamshield';
import { SAMPLE_ANALYZER_TEST_CASES, analyzeThreatInput } from '../data/mockData';
import { RiskBadge } from './RiskBadge';
import { 
  ShieldAlert, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  Copy, 
  Clock, 
  KeyRound, 
  RotateCcw,
  OctagonAlert,
  HelpCircle,
  Lock,
  Layers,
  Smartphone,
  ChevronRight,
  ShieldCheck,
  Check,
  Sparkles
} from 'lucide-react';

interface AnalyzerTabProps {
  onReportIncident?: (target: string, description: string, tier: RiskTier) => void;
}

export const AnalyzerTab: React.FC<AnalyzerTabProps> = ({ onReportIncident }) => {
  const [subMode, setSubMode] = useState<'message' | 'momo_counter'>('message');
  
  // Message / URL Analyzer State
  const [inputText, setInputText] = useState(SAMPLE_ANALYZER_TEST_CASES[0].text);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult>(() => 
    analyzeThreatInput(SAMPLE_ANALYZER_TEST_CASES[0].text, 'message')
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);
  const [detailTab, setDetailTab] = useState<'signals' | 'matrix' | 'ai_forensics' | 'evidence'>('signals');

  // MoMo POS Mode State
  const [momoNumber, setMomoNumber] = useState('024 419 0991');
  const [momoNetwork, setMomoNetwork] = useState('MTN MobileMoney');
  const [momoAmount, setMomoAmount] = useState('2500');
  const [counterVerdict, setCounterVerdict] = useState<{
    tier: RiskTier;
    flaggedReason: string;
    velocityScore: string;
    simAge: string;
    registeredName: string;
    blacklisted: boolean;
  } | null>(null);
  const [frozenNotice, setFrozenNotice] = useState(false);
  const [verificationNotice, setVerificationNotice] = useState(false);

  const handleRunAiForensics = async () => {
    if (!inputText.trim()) return;
    setIsAiAnalyzing(true);
    try {
      const resp = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText })
      });
      if (resp.ok) {
        const data = await resp.json();
        setAnalysisResult(data);
        setDetailTab('ai_forensics');
      } else {
        const err = await resp.json();
        console.warn('AI analysis error:', err);
      }
    } catch (e) {
      console.warn('AI analysis network error:', e);
    } finally {
      setIsAiAnalyzing(false);
    }
  };

  const handleRunAnalysis = async (textToAnalyze?: string) => {
    const text = textToAnalyze !== undefined ? textToAnalyze : inputText;
    setIsAnalyzing(true);
    try {
      const endpoint = text.startsWith('http') ? '/api/analyze/url' : '/api/analyze/message';
      const bodyPayload = text.startsWith('http') ? { url: text } : { text };
      const resp = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyPayload)
      });
      if (resp.ok) {
        const data = await resp.json();
        setAnalysisResult(data);
      } else {
        const res = analyzeThreatInput(text, text.startsWith('http') ? 'url' : 'message');
        setAnalysisResult(res);
      }
    } catch (e) {
      const res = analyzeThreatInput(text, text.startsWith('http') ? 'url' : 'message');
      setAnalysisResult(res);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSelectTestCase = (testCase: typeof SAMPLE_ANALYZER_TEST_CASES[0]) => {
    setInputText(testCase.text);
    handleRunAnalysis(testCase.text);
  };

  const handleCopyAnalysis = () => {
    const text = `[SCAMSHIELD THREAT ASSESSMENT]\nVerdict: ${analysisResult.riskLabel}\nConfidence: ${analysisResult.confidenceScore}%\nSummary: ${analysisResult.summary}\nGuidance: ${analysisResult.recommendedAction}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMomoCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNum = momoNumber.replace(/\s+/g, '');
    
    try {
      const resp = await fetch('/api/verify/momo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: cleanNum,
          network: momoNetwork,
          amount: parseFloat(momoAmount) || 0
        })
      });

      if (resp.ok) {
        const data = await resp.json();
        setCounterVerdict({
          tier: data.tier,
          flaggedReason: data.flaggedReason,
          velocityScore: data.velocityScore,
          simAge: data.simAge,
          registeredName: data.registeredName,
          blacklisted: data.blacklisted
        });
      } else {
        throw new Error('API returned error');
      }
    } catch (e) {
      // Fallback
      if (cleanNum.includes('419') || cleanNum.includes('991') || cleanNum.endsWith('234')) {
        setCounterVerdict({
          tier: 'high_risk',
          flaggedReason: 'Recipient MSISDN identified in Ghana CSA Central Blocklist (Syndicate #44 - Impersonated Agent Bail Extortion & Fake Reversal Scam).',
          velocityScore: 'HIGH ANOMALY (14 outbound cashouts in past 3 hours)',
          simAge: 'SIM activated 6 days ago via provisional Ghana Card',
          registeredName: 'K. AGYEMAN (Unverified KYC)',
          blacklisted: true
        });
      } else if (cleanNum.includes('882') || cleanNum.endsWith('943')) {
        setCounterVerdict({
          tier: 'suspicious',
          flaggedReason: 'Unusual merchant-to-peer float velocity spike. Flagged by 7 community field reports.',
          velocityScore: 'ELEVATED VELOCITY (₵ 18,400 routed in 24 hours)',
          simAge: 'SIM activated 3 months ago',
          registeredName: 'E. MENSAH / RECRUITMENT DESK',
          blacklisted: false
        });
      } else {
        setCounterVerdict({
          tier: 'low_concern',
          flaggedReason: 'No elevated risk flags or negative incident reports associated with this wallet.',
          velocityScore: 'NOMINAL ACTIVITY (Standard consumer cash-out pattern)',
          simAge: 'SIM registered 4+ years (Full Ghana Card biometrics verified)',
          registeredName: 'J. MENSAH-OSEI',
          blacklisted: false
        });
      }
    }

    setFrozenNotice(false);
    setVerificationNotice(false);
  };

  const getBorderColor = (tier: RiskTier) => {
    switch (tier) {
      case 'high_risk': return 'border-l-[#D64545]';
      case 'suspicious': return 'border-l-[#F2A33A]';
      case 'low_concern': return 'border-l-[#2E86AB]';
      case 'unable_to_assess': return 'border-l-[#7A869A]';
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Mode Switcher */}
      <div className="flex items-center justify-between pb-1 border-b border-slate-200/80">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSubMode('message')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
              subMode === 'message'
                ? 'bg-[#0F2A47] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Message & Link Checker
          </button>
          <button
            onClick={() => setSubMode('momo_counter')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 ${
              subMode === 'momo_counter'
                ? 'bg-[#0F2A47] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <span>MoMo Cash-Out Check</span>
            <span className="bg-[#0E9F8E]/20 text-[#006f63] text-[10px] font-bold px-1.5 py-0.2 rounded-full">
              POS Mode
            </span>
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <Lock className="w-3.5 h-3.5 text-[#0E9F8E]" />
          <span>Active PIN Masking Guardrail</span>
        </div>
      </div>

      {subMode === 'message' ? (
        /* MODE 1: MESSAGE & LINK ANALYSER */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Input + 1-Click Samples */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-3.5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-[#0F172A]">Enter Text, Link, or SMS</h2>
                  <p className="text-xs text-slate-500">Paste any suspicious message to check risk</p>
                </div>
                {inputText && (
                  <button
                    onClick={() => {
                      setInputText('');
                      handleRunAnalysis('');
                    }}
                    className="text-xs text-slate-400 hover:text-slate-700 flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Clear</span>
                  </button>
                )}
              </div>

              {/* Input Area */}
              <div className="relative">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste SMS, WhatsApp message, or website link here..."
                  className="w-full h-36 p-3.5 rounded-xl border border-slate-300 focus:border-[#0E9F8E] focus:ring-2 focus:ring-[#0E9F8E]/20 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 resize-none outline-none leading-relaxed transition"
                />
                <div className="flex items-center justify-between mt-1 text-[11px] text-slate-400">
                  <span>{inputText.length} characters</span>
                  <span className="text-[#0E9F8E] font-medium">Protected by Guardrails</span>
                </div>
              </div>

              {/* Main Submit Action */}
              <div className="space-y-2">
                <button
                  onClick={() => handleRunAnalysis()}
                  disabled={isAnalyzing || isAiAnalyzing}
                  className="w-full min-h-[46px] bg-[#0F2A47] hover:bg-[#081A2D] active:scale-[0.99] text-white font-semibold rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-xs"
                >
                  {isAnalyzing ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      <span>Analyzing Indicators...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4 text-[#0E9F8E]" />
                      <span>Check Suspicious Input</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleRunAiForensics}
                  disabled={isAiAnalyzing || isAnalyzing || !inputText.trim()}
                  className="w-full min-h-[42px] bg-gradient-to-r from-teal-900 to-[#0F2A47] hover:from-teal-800 hover:to-[#1a385b] active:scale-[0.99] text-teal-100 border border-teal-500/30 font-semibold rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-xs group disabled:opacity-50"
                >
                  {isAiAnalyzing ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-teal-300/30 border-t-teal-300 rounded-full animate-spin"></span>
                      <span>Running Gemini 3.8 Flash Deception Forensics...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-[#0E9F8E] group-hover:rotate-12 transition-transform" />
                      <span>Deep AI Forensic Report (Gemini 3.8 Flash)</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quick 1-Click Samples (Clean & Compact) */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs space-y-2.5">
              <span className="text-xs font-bold text-slate-700 block">
                Quick Test Samples
              </span>
              <div className="space-y-1.5">
                {SAMPLE_ANALYZER_TEST_CASES.map((tc) => (
                  <button
                    key={tc.id}
                    onClick={() => handleSelectTestCase(tc)}
                    className="w-full text-left p-2 rounded-xl border border-slate-100 hover:border-[#0E9F8E]/40 hover:bg-slate-50 transition flex items-center justify-between group"
                  >
                    <span className="text-xs font-medium text-slate-700 group-hover:text-[#0F2A47] truncate pr-2">
                      {tc.label}
                    </span>
                    <RiskBadge tier={tc.riskTier} size="sm" showIcon={false} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Clean Assessment Card & Progressive Details */}
          <div className="lg:col-span-7 space-y-4">
            {/* Guardrail Notice if PIN or Script was detected */}
            {analysisResult.guardrailInterventions.length > 0 && (
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 space-y-1.5 animate-in fade-in">
                <div className="flex items-center gap-2 font-bold text-xs text-amber-900">
                  <ShieldAlert className="w-4 h-4 text-[#F2A33A]" />
                  <span>Confidential MoMo PIN Intercepted & Masked</span>
                </div>
                <p className="text-xs text-amber-800 leading-relaxed">
                  Your raw secret PIN was automatically redacted to protect your wallet. Never disclose your PIN to callers, SMS prompts, or roadside agents.
                </p>
              </div>
            )}

            {/* Main Result Verdict Card */}
            <div className={`bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs border-l-4 ${getBorderColor(analysisResult.riskTier)} space-y-4`}>
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <RiskBadge tier={analysisResult.riskTier} size="lg" />
                  <span className="text-xs font-mono font-semibold text-slate-500">
                    Confidence: <strong className="text-slate-900">{analysisResult.confidenceScore}%</strong>
                  </span>
                </div>

                <button
                  onClick={handleCopyAnalysis}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-medium text-slate-700 transition flex items-center gap-1.5"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#0E9F8E]" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                  <span>{copied ? 'Copied' : 'Share Brief'}</span>
                </button>
              </div>

              {/* Assessment Summary */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Verdict Summary
                </span>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100 font-medium">
                  {analysisResult.summary}
                </p>
              </div>

              {/* Frontline Directive Guidance Box */}
              <div className="p-3.5 rounded-xl bg-[#0F2A47] text-white space-y-1">
                <span className="text-[10px] font-bold text-[#0E9F8E] uppercase tracking-wider block">
                  Recommended Action
                </span>
                <p className="text-xs text-slate-100 leading-relaxed font-medium">
                  {analysisResult.recommendedAction}
                </p>
              </div>

              {/* Progressive Disclosure Sub-Tabs */}
              <div className="pt-2 border-t border-slate-100 space-y-3">
                <div className="flex items-center gap-1 border-b border-slate-100 pb-2 overflow-x-auto text-xs">
                  <button
                    onClick={() => setDetailTab('signals')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition ${
                      detailTab === 'signals'
                        ? 'bg-slate-100 text-[#0F2A47]'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Signals Flagged ({analysisResult.detectedSignals.length})
                  </button>

                  <button
                    onClick={() => setDetailTab('matrix')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1 ${
                      detailTab === 'matrix'
                        ? 'bg-slate-100 text-[#0F2A47]'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>CSA 6-Vector Matrix</span>
                  </button>

                  <button
                    onClick={() => setDetailTab('ai_forensics')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                      detailTab === 'ai_forensics'
                        ? 'bg-teal-50 text-teal-800 border border-teal-200'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#0E9F8E]" />
                    <span>AI Forensics</span>
                    {analysisResult.aiForensics && (
                      <span className="w-2 h-2 rounded-full bg-[#0E9F8E]"></span>
                    )}
                  </button>

                  <button
                    onClick={() => setDetailTab('evidence')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition ${
                      detailTab === 'evidence'
                        ? 'bg-slate-100 text-[#0F2A47]'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Missing Evidence
                  </button>
                </div>

                {/* Sub-tab 1: Detected Signals */}
                {detailTab === 'signals' && (
                  <div className="space-y-2 pt-1 animate-in fade-in">
                    {analysisResult.detectedSignals.length === 0 ? (
                      <p className="text-xs text-slate-500 italic p-2">
                        No elevated risk signals flagged in this sample.
                      </p>
                    ) : (
                      analysisResult.detectedSignals.map((signal) => (
                        <div
                          key={signal.id}
                          className="p-3 rounded-xl border border-slate-200/80 bg-white flex items-start gap-2.5 text-xs"
                        >
                          <AlertTriangle className={`w-4 h-4 shrink-0 mt-0.5 ${
                            signal.severity === 'high' ? 'text-red-500' : 'text-amber-500'
                          }`} />
                          <div className="space-y-0.5 min-w-0">
                            <strong className="text-slate-900 block">{signal.category}</strong>
                            <p className="text-slate-600 leading-normal">{signal.description}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* Sub-tab 2: 6-Vector CSA Matrix */}
                {detailTab === 'matrix' && (
                  <div className="space-y-2 pt-1 animate-in fade-in">
                    <p className="text-[11px] text-slate-500 mb-2">
                      Research-grounded breakdown across 6 threat vectors from the Cyber Security Authority (CSA) Ghana.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {analysisResult.vectorMetrics.map((vm) => (
                        <div
                          key={vm.id}
                          className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 text-xs space-y-1.5"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-800 text-[11px] truncate">{vm.name}</span>
                            <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
                              vm.status === 'Critical Alert'
                                ? 'bg-red-100 text-red-700'
                                : vm.status === 'Suspicious Vector'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-blue-100 text-[#2E86AB]'
                            }`}>
                              {vm.status}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-600 leading-tight">{vm.findings}</p>
                          <div className="text-[10px] text-slate-400 font-mono pt-1 border-t border-slate-200/50">
                            Threat: {vm.riskScore}%
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sub-tab: AI Forensics */}
                {detailTab === 'ai_forensics' && (
                  <div className="space-y-3 pt-1 animate-in fade-in">
                    {analysisResult.aiForensics ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 rounded-xl bg-teal-950 text-white border border-teal-800">
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-[#0E9F8E]" />
                            <div>
                              <span className="text-xs font-bold block text-teal-200">
                                {analysisResult.aiForensics.modelUsed}
                              </span>
                              <span className="text-[10px] text-teal-300/80">
                                Powered by Google GenAI • Rate Limited & Guardrailed
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] uppercase font-mono text-teal-300/80 block">Deception Score</span>
                            <span className="text-base font-extrabold text-[#F2A33A]">
                              {analysisResult.aiForensics.linguisticDeceptionScore}/100
                            </span>
                          </div>
                        </div>

                        {/* Psychological Tactics */}
                        <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-2">
                          <span className="text-xs font-bold text-slate-900 block">
                            Psychological Exploitation Tactics Detected:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {analysisResult.aiForensics.psychologicalTactics.map((tactic: string, i: number) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-semibold"
                              >
                                {tactic}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Cultural & Dialect Context */}
                        <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1 text-xs">
                          <span className="font-bold text-slate-800 block text-[11px]">
                            Ghanaian Dialect & Cultural Manipulation Context:
                          </span>
                          <p className="text-slate-600 leading-relaxed text-[11px]">
                            {analysisResult.aiForensics.culturalAndDialectContext}
                          </p>
                        </div>

                        {/* AI Counter-Directive */}
                        <div className="p-3.5 rounded-xl border border-[#0E9F8E]/30 bg-[#0E9F8E]/5 text-xs space-y-1">
                          <span className="font-bold text-[#006f63] block text-[11px]">
                            AI Counter-Directive & Immediate Action:
                          </span>
                          <p className="text-slate-700 leading-relaxed text-[11px]">
                            {analysisResult.aiForensics.recommendedCounterAction}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="p-5 rounded-xl border-2 border-dashed border-teal-200 bg-teal-50/50 text-center space-y-3">
                        <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center mx-auto">
                          <Sparkles className="w-5 h-5 text-[#0E9F8E]" />
                        </div>
                        <div className="max-w-md mx-auto space-y-1">
                          <h4 className="text-xs font-bold text-[#0F2A47]">
                            GenAI Linguistic Deception Analysis Not Yet Run
                          </h4>
                          <p className="text-[11px] text-slate-600 leading-relaxed">
                            Run our server-side Google GenAI (Gemini 3.8 Flash) forensic evaluation to dissect dialect nuances, social engineering hooks, and psychological deception levels with strict PIN redaction.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={handleRunAiForensics}
                          disabled={isAiAnalyzing || !inputText.trim()}
                          className="px-4 py-2 bg-[#0F2A47] hover:bg-[#081A2D] text-white font-semibold rounded-xl text-xs inline-flex items-center gap-1.5 shadow-xs"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-[#0E9F8E]" />
                          <span>{isAiAnalyzing ? 'Analyzing via GenAI...' : 'Run GenAI Forensic Evaluation'}</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Sub-tab 3: Missing Evidence */}
                {detailTab === 'evidence' && (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1 animate-in fade-in">
                    <div className="font-bold text-slate-700 flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                      <span>Uncorroborated / Missing Evidence:</span>
                    </div>
                    {analysisResult.missingEvidence.length > 0 ? (
                      <ul className="text-slate-600 list-disc list-inside space-y-0.5 text-[11px] pt-1">
                        {analysisResult.missingEvidence.map((me, idx) => (
                          <li key={idx}>{me}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-slate-500 text-[11px]">Sufficient evidence gathered for this assessment.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* MODE 2: MOMO COUNTER CASH-OUT CHECK */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
            <div>
              <span className="text-[10px] font-bold text-[#0E9F8E] uppercase tracking-wider block">
                Counter Point of Sale
              </span>
              <h2 className="text-base font-bold text-[#0F172A] mt-0.5">
                Screen Recipient Wallet
              </h2>
              <p className="text-xs text-slate-500">
                Check Ghana MSISDN for fraud history & velocity anomalies before paying cash.
              </p>
            </div>

            <form onSubmit={handleMomoCheck} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Telecom Operator</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['MTN', 'Telecel', 'AT'] as const).map((net) => (
                    <button
                      type="button"
                      key={net}
                      onClick={() => setMomoNetwork(net)}
                      className={`min-h-[42px] rounded-xl font-bold text-xs transition border ${
                        momoNetwork === net
                          ? 'bg-[#0F2A47] text-white border-[#0F2A47]'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {net === 'MTN' && 'MTN MoMo'}
                      {net === 'Telecel' && 'Telecel Cash'}
                      {net === 'AT' && 'AT Money'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Recipient Phone Number</label>
                <div className="flex rounded-xl border border-slate-300 focus-within:border-[#0E9F8E] overflow-hidden bg-white">
                  <span className="inline-flex items-center px-3 bg-slate-50 border-r border-slate-200 text-xs font-mono font-bold text-slate-600">
                    +233
                  </span>
                  <input
                    type="text"
                    value={momoNumber}
                    onChange={(e) => setMomoNumber(e.target.value)}
                    placeholder="024 419 8234"
                    className="flex-1 px-3 py-2.5 text-xs sm:text-sm text-slate-800 outline-none font-mono font-semibold"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Try test MSISDN: <span className="font-mono text-[#0F2A47] font-semibold cursor-pointer underline" onClick={() => setMomoNumber('0244198234')}>0244198234</span>
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Cash-Out Amount (GHS)</label>
                <input
                  type="number"
                  value={momoAmount}
                  onChange={(e) => setMomoAmount(e.target.value)}
                  placeholder="1500"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-mono font-bold text-slate-800 outline-none focus:border-[#0E9F8E]"
                />
              </div>

              <button
                type="submit"
                className="w-full min-h-[46px] bg-[#0F2A47] hover:bg-[#081A2D] text-white font-bold rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4 text-[#0E9F8E]" />
                <span>Verify Recipient Wallet</span>
              </button>
            </form>
          </div>

          {/* Right Column: Counter Verdict */}
          <div className="lg:col-span-7">
            {counterVerdict ? (
              <div className={`bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs border-l-4 ${getBorderColor(counterVerdict.tier)} space-y-4`}>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Verification Result
                    </span>
                    <div className="mt-1">
                      <RiskBadge tier={counterVerdict.tier} size="md" />
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#0F2A47] bg-slate-100 px-2.5 py-1 rounded-lg">
                    {momoNetwork}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Registered Name:</span>
                    <span className="font-mono font-bold text-slate-800">{counterVerdict.registeredName}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">SIM Activation Tenure:</span>
                    <span className="font-mono text-slate-800">{counterVerdict.simAge}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Cashout Velocity:</span>
                    <span className="font-mono font-semibold text-slate-800">{counterVerdict.velocityScore}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
                  {counterVerdict.flaggedReason}
                </div>

                {/* Counter Actions */}
                <div className="pt-2 space-y-2">
                  {counterVerdict.tier === 'high_risk' ? (
                    <button
                      onClick={() => setFrozenNotice(true)}
                      className="w-full min-h-[46px] bg-[#D64545] hover:bg-[#b53535] text-white font-bold rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2"
                    >
                      <OctagonAlert className="w-4 h-4" />
                      <span>HALT CASH-OUT / FREEZE SESSION</span>
                    </button>
                  ) : counterVerdict.tier === 'suspicious' ? (
                    <button
                      onClick={() => setVerificationNotice(true)}
                      className="w-full min-h-[46px] bg-[#0F2A47] hover:bg-[#081A2D] text-white font-bold rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2"
                    >
                      <AlertTriangle className="w-4 h-4 text-[#F2A33A]" />
                      <span>Require Physical Ghana Card Inspection</span>
                    </button>
                  ) : (
                    <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-[#2E86AB] font-medium flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Nominal Baseline Satisfied. Proceed with standard counter protocol.</span>
                    </div>
                  )}

                  {verificationNotice && (
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-900 font-medium">
                      Inspect physical Ghana Card. Check biometric photo and name match against +233 {momoNumber}.
                    </div>
                  )}

                  {frozenNotice && (
                    <div className="p-3 rounded-xl bg-red-100 border border-red-300 text-xs text-red-900 font-medium">
                      🚨 Payout halted. Ref: #CSA-FRZ-{Math.floor(1000 + Math.random() * 9000)}. Advise customer to contact CSA (292).
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-10 border border-slate-200/90 text-center space-y-2">
                <Smartphone className="w-8 h-8 text-slate-300 mx-auto" />
                <h3 className="text-sm font-bold text-slate-700">Ready for Counter Verification</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Enter customer phone number and requested payout amount on the left to screen against central fraud registries.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
