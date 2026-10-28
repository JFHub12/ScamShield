import React, { useState, useEffect } from 'react';
import { INITIAL_VOICE_INTEL } from '../data/mockData';
import { VoiceIntelItem, RiskTier } from '../types/scamshield';
import { RiskBadge } from './RiskBadge';
import { 
  AudioWaveform, 
  Play, 
  Pause, 
  Volume2, 
  AlertTriangle, 
  ShieldAlert, 
  Clock, 
  Upload, 
  RotateCcw,
  Sparkles,
  PhoneForwarded,
  Info
} from 'lucide-react';

export const VoiceIntelTab: React.FC = () => {
  const [selectedVoice, setSelectedVoice] = useState<VoiceIntelItem>(INITIAL_VOICE_INTEL[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playProgress, setPlayProgress] = useState(0);
  const [customAudioSimulated, setCustomAudioSimulated] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setPlayProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
              window.speechSynthesis.cancel();
            }
            return 0;
          }
          return prev + 1.8;
        });
      }, 100);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    } else {
      setIsPlaying(true);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(selectedVoice.transcript);
        utterance.rate = 1.05;
        utterance.onend = () => {
          setIsPlaying(false);
          setPlayProgress(0);
        };
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  const handleSelectSample = (item: VoiceIntelItem) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setSelectedVoice(item);
    setIsPlaying(false);
    setPlayProgress(0);
  };

  const handleSimulateNewUpload = () => {
    const customItem: VoiceIntelItem = {
      id: `voice-${Date.now()}`,
      title: 'Caller Requesting Agent Master Float Transfer',
      callerInfo: '+233 24 551 8839 (Incoming Audio Note)',
      duration: '00:52',
      receivedDate: 'Just now',
      transcript: "Hello, this is district manager Boateng from the regional office. We are doing emergency end-of-month system reconciliation right now. You need to forward 5,000 GHS from your agent float to our backup account 0245518839 immediately before our central database locks at 1 PM.",
      audioTone: 'Authoritative management tone, synthetic keyboard clatter, aggressive administrative pressure',
      detectedTriggers: ['District manager Boateng', 'Emergency reconciliation', 'Forward 5,000 GHS', 'Central database locks at 1 PM'],
      riskTier: 'high_risk',
      recommendedCounterAction: 'Critical threat. Disregard caller instructions. Legitimate telecom regional managers never demand float transfers to personal wallets for reconciliation.'
    };
    setSelectedVoice(customItem);
    setCustomAudioSimulated(true);
    setIsPlaying(false);
    setPlayProgress(0);
  };

  return (
    <div className="space-y-6">
      {/* Module Overview Banner */}
      <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#0F2A47] text-white">
              <AudioWaveform className="w-5 h-5 text-[#0E9F8E]" />
            </span>
            <h2 className="text-lg font-bold text-[#0F172A]">Voice Intelligence & Audio Note Analysis</h2>
          </div>
          <p className="text-xs text-[#5B6B82] mt-1 max-w-2xl">
            Transcribe, analyze acoustic cadence, and flag coercive social engineering tactics in customer voice notes and incoming calls.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSimulateNewUpload}
            className="px-4 py-2.5 rounded-xl bg-[#0F2A47] hover:bg-[#081A2D] text-white font-semibold text-xs transition flex items-center gap-2 shadow-sm"
          >
            <Upload className="w-3.5 h-3.5 text-[#0E9F8E]" />
            <span>Upload or Test Audio Note</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Sample Audio Files List */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-xs font-bold text-[#0F172A] uppercase tracking-wider block">
            Audio Recordings & Intercepts ({INITIAL_VOICE_INTEL.length + (customAudioSimulated ? 1 : 0)})
          </span>

          <div className="space-y-2.5">
            {customAudioSimulated && (
              <div
                onClick={() => handleSelectSample(selectedVoice)}
                className={`p-3.5 rounded-xl border transition cursor-pointer ${
                  selectedVoice.id.startsWith('voice-') && !INITIAL_VOICE_INTEL.some(i => i.id === selectedVoice.id)
                    ? 'border-[#0E9F8E] bg-[#E6EEFF] ring-2 ring-[#0E9F8E]/20'
                    : 'border-[#E2E8F0] bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0F172A] truncate">
                    {selectedVoice.title}
                  </span>
                  <RiskBadge tier={selectedVoice.riskTier} size="sm" showIcon={false} />
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#5B6B82] mt-1">
                  <span className="font-mono">{selectedVoice.callerInfo}</span>
                  <span>{selectedVoice.duration}</span>
                </div>
              </div>
            )}

            {INITIAL_VOICE_INTEL.map((item) => {
              const isSelected = selectedVoice.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelectSample(item)}
                  className={`p-3.5 rounded-xl border transition cursor-pointer ${
                    isSelected
                      ? 'border-[#0E9F8E] bg-[#E6EEFF] ring-2 ring-[#0E9F8E]/20'
                      : 'border-[#E2E8F0] bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0F172A] truncate">
                      {item.title}
                    </span>
                    <RiskBadge tier={item.riskTier} size="sm" showIcon={false} />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#5B6B82] mt-1">
                    <span className="font-mono">{item.callerInfo}</span>
                    <span>{item.duration}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2">
            <Info className="w-4 h-4 text-[#2E86AB] shrink-0 mt-0.5" />
            <span>
              Audio transcription operates under explicit user consent and privacy redaction parameters.
            </span>
          </div>
        </div>

        {/* Right Column: Audio Player & Detailed Threat Breakdown */}
        <div className="lg:col-span-8 space-y-5">
          {/* Audio Player Card */}
          <div className="bg-white rounded-2xl p-6 border border-[#CBD5E1] shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E2E8F0]">
              <div>
                <h3 className="text-base font-bold text-[#0F172A]">{selectedVoice.title}</h3>
                <p className="text-xs text-[#5B6B82] font-mono mt-0.5">
                  Caller: {selectedVoice.callerInfo} • Received: {selectedVoice.receivedDate}
                </p>
              </div>
              <RiskBadge tier={selectedVoice.riskTier} size="md" />
            </div>

            {/* Simulated Audio Waveform Bar */}
            <div className="bg-[#0F2A47] p-4 rounded-xl text-white space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                <span>00:{Math.floor((playProgress / 100) * 50).toString().padStart(2, '0')}</span>
                <span className="text-[#0E9F8E]">VOICE FREQUENCY SPECTRUM</span>
                <span>{selectedVoice.duration}</span>
              </div>

              {/* Visual Waveform bars */}
              <div className="h-12 flex items-center justify-between gap-1 px-1">
                {Array.from({ length: 48 }).map((_, i) => {
                  const heightPercent = 20 + Math.sin(i * 0.4) * 35 + (i % 5) * 10;
                  const isPlayed = (i / 48) * 100 <= playProgress;
                  return (
                    <div
                      key={i}
                      className={`w-1 rounded-full transition-all duration-150 ${
                        isPlayed ? 'bg-[#0E9F8E]' : 'bg-[#1E3A5F]'
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    />
                  );
                })}
              </div>

              {/* Player Controls */}
              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={togglePlay}
                  className="px-4 py-2 rounded-lg bg-[#0E9F8E] hover:bg-[#0ca392] text-[#0F2A47] font-bold text-xs flex items-center gap-1.5 transition"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 fill-current" />
                      <span>Pause Audio</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Listen to Recording</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Volume2 className="w-4 h-4 text-[#0E9F8E]" />
                  <span>Acoustic Filter Active</span>
                </div>
              </div>
            </div>

            {/* Transcript with Highlighted Threat Triggers */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#0F172A] uppercase tracking-wider block">
                Speech-to-Text Transcript
              </span>
              <div className="p-4 rounded-xl bg-[#F8F9FF] border border-[#E2E8F0] text-sm text-[#0F172A] leading-relaxed">
                "{selectedVoice.transcript}"
              </div>
            </div>

            {/* Acoustic Tone & Stress Analysis */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[11px] font-bold text-[#0F172A] uppercase tracking-wider block">
                Acoustic Tone & Background Telemetry
              </span>
              <p className="text-xs text-[#5B6B82]">
                {selectedVoice.audioTone}
              </p>
            </div>

            {/* Highlighted Fraud Triggers */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#0F172A] uppercase tracking-wider block">
                Identified Psychological Triggers ({selectedVoice.detectedTriggers.length})
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedVoice.detectedTriggers.map((trig, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-red-50 text-red-700 border border-red-200"
                  >
                    <AlertTriangle className="w-3 h-3 mr-1.5 text-red-600" />
                    {trig}
                  </span>
                ))}
              </div>
            </div>

            {/* Recommended Counter-Action for Merchant */}
            <div className="p-4 rounded-xl bg-[#0F2A47] text-white space-y-2">
              <span className="text-xs font-bold text-[#0E9F8E] uppercase tracking-wider block">
                Frontline Counter-Action Protocol
              </span>
              <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-medium">
                {selectedVoice.recommendedCounterAction}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
