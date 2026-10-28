import React, { useState } from 'react';
import { analyzeThreatInput } from '../data/mockData';
import { RiskBadge } from './RiskBadge';
import { 
  Share2, 
  Send, 
  ShieldAlert, 
  Bot, 
  AlertTriangle, 
  CheckCircle2, 
  Smartphone, 
  MessageSquare,
  Users
} from 'lucide-react';

export const SocialBotTab: React.FC = () => {
  const [messages, setMessages] = useState<Array<{
    id: string;
    sender: 'user' | 'bot' | 'other_member';
    name: string;
    text: string;
    time: string;
    analysis?: ReturnType<typeof analyzeThreatInput>;
  }>>([
    {
      id: 'msg-1',
      sender: 'other_member',
      name: 'Prince (Accra Deals Group)',
      text: 'Good morning all! Has anyone claimed the 500 GHS airtime bonus? They are giving it out to all MTN and Telecel users today only: http://free-airtime-gh.xyz/claim',
      time: '10:14 AM'
    },
    {
      id: 'msg-2',
      sender: 'bot',
      name: 'ScamShield Community Bot',
      text: '⚠️ CAUTION TO GROUP MEMBERS: The link above (free-airtime-gh.xyz) matches known airtime phishing templates. Do NOT enter your MoMo number or PIN.',
      time: '10:14 AM',
      analysis: analyzeThreatInput('http://free-airtime-gh.xyz/claim', 'url')
    },
    {
      id: 'msg-3',
      sender: 'other_member',
      name: 'Kofi Mensah',
      text: 'Ei charley thank God the bot replied o! I was just about to click it!',
      time: '10:16 AM'
    }
  ]);

  const [inputSimText, setInputSimText] = useState('');

  const handleSimulateSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputSimText.trim()) return;

    const userText = inputSimText.trim();
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsgId = `usr-${Date.now()}`;

    // Add user message to simulation
    const updated = [
      ...messages,
      {
        id: userMsgId,
        sender: 'user' as const,
        name: 'You (Group Member)',
        text: userText,
        time: now
      }
    ];

    setMessages(updated);
    setInputSimText('');

    // Trigger ScamShield Bot analysis response
    setTimeout(() => {
      const analysis = analyzeThreatInput(userText, userText.startsWith('http') ? 'url' : 'message');
      
      let botResponseText = '';
      if (analysis.riskTier === 'high_risk') {
        botResponseText = `🚨 SCAMSHIELD BOT INTERVENTION [HIGH RISK]: Warning to group members! This message contains critical scam indicators (${analysis.summary}). Never share OTPs or send fees to unverified accounts.`;
      } else if (analysis.riskTier === 'suspicious') {
        botResponseText = `⚠️ SCAMSHIELD BOT ADVISORY [SUSPICIOUS]: This message exhibits urgency or advance-fee patterns. Exercise defensive caution before proceeding.`;
      } else {
        botResponseText = `ℹ️ SCAMSHIELD BOT [OBSERVATION]: Message screened. No known high-risk phishing links or OTP demands flagged in this sample. Remember to keep your MoMo PIN private.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot' as const,
          name: 'ScamShield Community Bot',
          text: botResponseText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          analysis
        }
      ]);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#0F2A47] text-[#0E9F8E]">
              <Share2 className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-bold text-[#0F172A]">Social Group Bot Simulator</h2>
          </div>
          <p className="text-xs text-[#5B6B82] mt-1 max-w-2xl">
            Preview how ScamShield's automated API connectors protect WhatsApp and Telegram community groups by intercepting deceptive links and fraudulent payment requests in real time.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
          <Smartphone className="w-4 h-4 text-[#0E9F8E]" />
          <span>Webhook Simulation Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chat UI Frame (8 cols on lg) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#CBD5E1] shadow-sm overflow-hidden flex flex-col h-[580px]">
          {/* Chat Header */}
          <div className="bg-[#0F2A47] px-4 py-3 text-white flex items-center justify-between border-b border-[#1E3A5F]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#0E9F8E] flex items-center justify-center text-[#0F2A47] font-bold">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold">Accra Traders & Family Group (420 members)</h3>
                <p className="text-[11px] text-[#0E9F8E] font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0E9F8E] inline-block animate-pulse"></span>
                  ScamShield Protection Bot Online
                </p>
              </div>
            </div>

            <span className="text-[11px] text-slate-300 font-mono hidden sm:inline">
              WhatsApp Integration Mock
            </span>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#F6F8FB]">
            {messages.map((m) => {
              if (m.sender === 'bot') {
                return (
                  <div key={m.id} className="max-w-xl mx-auto my-2">
                    <div className="bg-[#0F2A47] text-white p-4 rounded-2xl border border-[#0E9F8E]/40 shadow-md space-y-2">
                      <div className="flex items-center justify-between pb-1 border-b border-[#1E3A5F]">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#0E9F8E]">
                          <Bot className="w-4 h-4" />
                          <span>{m.name}</span>
                        </div>
                        {m.analysis && (
                          <RiskBadge tier={m.analysis.riskTier} size="sm" />
                        )}
                      </div>
                      <p className="text-xs text-slate-100 leading-relaxed font-sans">
                        {m.text}
                      </p>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                        <span>Automated Intercept Protocol</span>
                        <span>{m.time}</span>
                      </div>
                    </div>
                  </div>
                );
              }

              const isMe = m.sender === 'user';
              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <span className="text-[10px] font-bold text-slate-500 mb-0.5 px-1">
                    {m.name}
                  </span>
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                      isMe
                        ? 'bg-[#0F2A47] text-white rounded-br-xs'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs shadow-2xs'
                    }`}
                  >
                    {m.text}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 px-1 font-mono">
                    {m.time}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Quick Simulation Baits */}
          <div className="px-3 py-2 bg-slate-50 border-t border-slate-200 flex items-center gap-1.5 overflow-x-auto text-[11px]">
            <span className="font-bold text-slate-500 whitespace-nowrap mr-1">Quick Baits:</span>
            <button
              type="button"
              onClick={() => setInputSimText('Get 500 GHS instant free MoMo airtime today: http://airtime-ghana-promo.cc/claim')}
              className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-[#0E9F8E] text-slate-700 whitespace-nowrap transition"
            >
              Phishing Link
            </button>
            <button
              type="button"
              onClick={() => setInputSimText('MTN Warning: Send your 6-digit OTP code to 0244198234 to verify wallet immediately')}
              className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-[#0E9F8E] text-slate-700 whitespace-nowrap transition"
            >
              OTP Exfiltration
            </button>
            <button
              type="button"
              onClick={() => setInputSimText('GRA Customs Job Vacancy: Send 100 GHS registration fee via Telecel Cash to proceed')}
              className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-[#0E9F8E] text-slate-700 whitespace-nowrap transition"
            >
              Advance Job Fee
            </button>
            <button
              type="button"
              onClick={() => setInputSimText('Good afternoon everyone, don’t forget our community meeting this Saturday')}
              className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-[#0E9F8E] text-slate-700 whitespace-nowrap transition"
            >
              Routine Chat
            </button>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSimulateSend} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={inputSimText}
              onChange={(e) => setInputSimText(e.target.value)}
              placeholder="Simulate posting a message or link into the group (e.g. urgent loan, free airtime, job fee)..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#0E9F8E]"
            />
            <button
              type="submit"
              className="min-h-[44px] px-4 bg-[#0F2A47] hover:bg-[#081A2D] text-white font-bold rounded-xl text-xs transition flex items-center gap-1.5 shadow-sm"
            >
              <span>Post</span>
              <Send className="w-3.5 h-3.5 text-[#0E9F8E]" />
            </button>
          </form>
        </div>

        {/* Right Info Pane (4 cols on lg) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wide">
              Connector Architecture
            </h3>
            <p className="text-xs text-[#5B6B82] leading-relaxed">
              In production, the connector framework bridges to approved WhatsApp Cloud API webhooks or Telegram bot tokens. When a group link or payment handle is posted, ScamShield calculates risk heuristics in sub-second latency.
            </p>

            <div className="space-y-2 pt-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <strong className="text-slate-800 block mb-0.5">Privacy Guard:</strong>
                <span className="text-slate-600">Encrypted end-to-end; messages are checked ephemerally in-memory and never permanently stored.</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <strong className="text-slate-800 block mb-0.5">Non-Invasive Warning:</strong>
                <span className="text-slate-600">The bot triggers advisories solely when verified risk patterns or known scam links are identified.</span>
              </div>
            </div>
          </div>

          <div className="bg-[#0F2A47] text-white rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-[#0E9F8E] text-xs font-bold uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4" />
              <span>Hackathon Prototype Boundary</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              This interactive widget demonstrates the exact UX and warning templates designed for the WhatsApp and Telegram bot rollout described in the product blueprint.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
