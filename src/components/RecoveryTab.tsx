import React, { useState } from 'react';
import { 
  FileWarning, 
  PhoneCall, 
  Lock, 
  ShieldAlert, 
  Download, 
  Copy, 
  CheckCircle2, 
  ExternalLink, 
  AlertCircle,
  Landmark,
  Building2,
  FileText,
  Sparkles
} from 'lucide-react';

export const RecoveryTab: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [dossierCopied, setDossierCopied] = useState(false);
  const [isAiEnhancing, setIsAiEnhancing] = useState(false);
  const [aiEnhancedAffidavit, setAiEnhancedAffidavit] = useState<string | null>(null);
  const [aiNotice, setAiNotice] = useState<string | null>(null);

  // Victim Report Builder fields
  const [victimName, setVictimName] = useState('');
  const [victimPhone, setVictimPhone] = useState('');
  const [suspectPhone, setSuspectPhone] = useState('');
  const [amountLost, setAmountLost] = useState('');
  const [telecom, setTelecom] = useState('MTN MoMo');
  const [incidentDate, setIncidentDate] = useState('2026-10-28');
  const [incidentDetails, setIncidentDetails] = useState('');

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleExportDossier = () => {
    const text = `=====================================================
SCAMSHIELD FRAUD INCIDENT DOSSIER & POLICE REPORT
Prepared for: Cyber Security Authority (CSA) & Ghana Police CID Cyber Crime Unit
=====================================================
DATE GENERATED: ${new Date().toISOString()}
INCIDENT REFERENCE: GH-POL-CSA-${Math.floor(100000 + Math.random() * 900000)}

[VICTIM & REPORTING DETAILS]
Complainant Name: ${victimName || 'Frontline Counter Walk-in'}
Complainant Phone: ${victimPhone || 'Pending verification'}
Telecom Network: ${telecom}
Incident Occurrence: ${incidentDate}

[SUSPECT & TRANSACTION DETAILS]
Suspect Phone / Identifier: ${suspectPhone || 'Unrecorded / Caller ID Spoofed'}
Reported Financial Loss: GHS ${amountLost || '0.00'}
Incident Summary & Vector:
${incidentDetails || 'Social engineering / MoMo transfer deception under duress.'}

[EMERGENCY ACTIONS TAKEN]
- USSD Self-Service Lock Initiated: YES
- CSA Direct Line 292 Contacted: ADVISED
- Wallet Account Freeze Requested: PENDING CARRIER INTERVENTION

[EVIDENCE PRESERVATION DIRECTIVE]
1. Do not delete transaction notification SMS or call logs.
2. Obtain certified bank/MoMo statement from customer service center.
3. Submit this signed dossier at the nearest Police Station CID division.
=====================================================`;

    navigator.clipboard.writeText(text);
    setDossierCopied(true);
    setTimeout(() => setDossierCopied(false), 2500);
  };

  const handleGenerateAiAffidavit = async () => {
    setIsAiEnhancing(true);
    setAiNotice(null);
    try {
      const resp = await fetch('/api/ai/enhance-dossier', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          victimName,
          victimPhone,
          suspectPhone,
          amountLost,
          telecom,
          incidentDate,
          incidentDetails: incidentDetails || 'Suspect impersonated MoMo service desk and used urgent threats of SIM/wallet deactivation to coerce unauthorized wallet funds transfer.'
        })
      });
      if (resp.ok) {
        const data = await resp.json();
        setAiEnhancedAffidavit(data.affidavit);
        setAiNotice(`Drafted via ${data.modelUsed} • Rate limit enforced`);
      } else {
        const err = await resp.json();
        setAiNotice(`AI affidavit error: ${err.error || 'Server error'}`);
      }
    } catch (e) {
      setAiNotice('Network error contacting backend AI service.');
    } finally {
      setIsAiEnhancing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#D64545] text-white">
              <FileWarning className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-bold text-[#0F172A]">Post-Incident Recovery & Evidence Assistant</h2>
          </div>
          <p className="text-xs text-[#5B6B82] mt-1 max-w-2xl">
            Practical emergency protocols following suspected financial loss or credential theft. Immediately restrict compromised wallets and preserve cryptographic evidence for Ghanaian law enforcement.
          </p>
        </div>

        <a
          href="tel:292"
          className="min-h-[46px] px-4 bg-[#D64545] hover:bg-[#b83838] active:bg-[#9e2c2c] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition"
        >
          <PhoneCall className="w-4 h-4" />
          <span>Call CSA Hotline (292)</span>
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Immediate Action Protocols */}
        <div className="lg:col-span-5 space-y-5">
          {/* Step 1: Emergency USSD Locks */}
          <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#0F2A47] text-white flex items-center justify-center text-xs font-bold">
                1
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#0F172A]">Instant Wallet Self-Lock Codes</h3>
                <p className="text-xs text-[#5B6B82]">Dial immediately from subscriber phone</p>
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-800 block">MTN MoMo Emergency Block</span>
                  <span className="text-[11px] text-slate-500">Dial <code className="font-mono font-bold text-[#0F2A47]">*170#</code> &rarr; Option 6 (My Wallet) &rarr; Change PIN</span>
                </div>
                <button
                  onClick={() => copyCode('*170#')}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-mono font-bold text-[#0F2A47] hover:border-[#0E9F8E] transition"
                >
                  {copiedCode === '*170#' ? 'Copied' : '*170#'}
                </button>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-800 block">Telecel Cash Self-Lock</span>
                  <span className="text-[11px] text-slate-500">Dial <code className="font-mono font-bold text-[#0F2A47]">*110#</code> &rarr; Option 4 (My Account)</span>
                </div>
                <button
                  onClick={() => copyCode('*110#')}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-mono font-bold text-[#0F2A47] hover:border-[#0E9F8E] transition"
                >
                  {copiedCode === '*110#' ? 'Copied' : '*110#'}
                </button>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-800 block">AT Money Security Code</span>
                  <span className="text-[11px] text-slate-500">Dial <code className="font-mono font-bold text-[#0F2A47]">*110#</code> &rarr; PIN Management</span>
                </div>
                <button
                  onClick={() => copyCode('*110# AT')}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-mono font-bold text-[#0F2A47] hover:border-[#0E9F8E] transition"
                >
                  *110#
                </button>
              </div>
            </div>
          </div>

          {/* Step 2: Official Contact Channels */}
          <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#0F2A47] text-white flex items-center justify-center text-xs font-bold">
                2
              </div>
              <h3 className="text-sm font-bold text-[#0F172A]">Legitimate Official Contact Registry</h3>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#0F172A]">Cyber Security Authority (CSA) Ghana</span>
                  <span className="font-mono font-bold text-[#D64545]">Dial 292</span>
                </div>
                <p className="text-slate-600 text-[11px]">
                  Toll-free 24/7 National Computer Emergency Response Team (CERT-GH). WhatsApp line: 050 160 3111.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#0F172A]">Ghana Police CID Cyber Crime Unit</span>
                  <span className="font-mono font-bold text-slate-800">Headquarters, Accra</span>
                </div>
                <p className="text-slate-600 text-[11px]">
                  Located at Ring Road Central, Police Headquarters. Official liaison for formal warrant requests.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#0F172A]">Bank of Ghana Financial Stability Dept</span>
                  <span className="font-mono text-slate-800">complaints@bog.gov.gh</span>
                </div>
                <p className="text-slate-600 text-[11px]">
                  Escalation portal for merchant dispute handling and unauthorized bank deductions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Evidence Preservation & Dossier Generator */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-white rounded-2xl p-6 border border-[#CBD5E1] shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h3 className="text-base font-bold text-[#0F172A]">Evidence Preservation & Police Dossier Builder</h3>
                <p className="text-xs text-[#5B6B82]">Quickly formulate formal documentation for the victim to bring to police or bank branch</p>
              </div>
              <FileText className="w-5 h-5 text-[#0E9F8E]" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase mb-1">Victim / Complainant Name</label>
                <input
                  type="text"
                  value={victimName}
                  onChange={(e) => setVictimName(e.target.value)}
                  placeholder="e.g. Abena Serwaa"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-[#0E9F8E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase mb-1">Victim Phone Number</label>
                <input
                  type="text"
                  value={victimPhone}
                  onChange={(e) => setVictimPhone(e.target.value)}
                  placeholder="+233 24 000 0000"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono text-slate-800 outline-none focus:border-[#0E9F8E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase mb-1">Suspect Phone or Wallet</label>
                <input
                  type="text"
                  value={suspectPhone}
                  onChange={(e) => setSuspectPhone(e.target.value)}
                  placeholder="+233 24 419 8234"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono text-slate-800 outline-none focus:border-[#0E9F8E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase mb-1">Amount Lost or Demanded (GHS)</label>
                <input
                  type="number"
                  value={amountLost}
                  onChange={(e) => setAmountLost(e.target.value)}
                  placeholder="1500"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono font-bold text-slate-800 outline-none focus:border-[#0E9F8E]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase mb-1">Specific Incident Narrative</label>
              <textarea
                rows={3}
                value={incidentDetails}
                onChange={(e) => setIncidentDetails(e.target.value)}
                placeholder="Details of call/message, impersonated authority, threats made..."
                className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-[#0E9F8E] resize-none"
              />
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
              <span className="font-bold text-slate-800 block">Critical Evidence Preservation Checklist:</span>
              <ul className="text-slate-600 space-y-1 list-disc list-inside">
                <li>Capture full screenshot of SMS sender ID and raw message headers</li>
                <li>Preserve WhatsApp chat export including media and audio voice notes</li>
                <li>Request official MoMo transaction reversal reference ID from telecom agent terminal</li>
              </ul>
            </div>

            {/* AI Legal Affidavit Generation */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-teal-950 to-[#0F2A47] text-white space-y-3 border border-teal-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#0E9F8E]" />
                  <span className="text-xs font-bold text-teal-200">
                    AI Legal CID Affidavit Generator (Gemini 3.8 Flash)
                  </span>
                </div>
                <span className="text-[10px] bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded-full font-mono">
                  Guardrailed
                </span>
              </div>
              <p className="text-[11px] text-teal-100/80 leading-relaxed">
                Automatically formats this incident into an official sworn statement citing the Ghana Electronic Transactions Act (Act 772) and Criminal Offences Act (Act 29).
              </p>
              <button
                type="button"
                onClick={handleGenerateAiAffidavit}
                disabled={isAiEnhancing}
                className="w-full min-h-[42px] bg-[#0E9F8E] hover:bg-[#008778] active:scale-[0.99] text-[#0F2A47] font-bold rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
              >
                {isAiEnhancing ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-[#0F2A47]/30 border-t-[#0F2A47] rounded-full animate-spin"></span>
                    <span>Drafting Sworn Legal Affidavit via Gemini...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#0F2A47]" />
                    <span>Generate AI Sworn Legal Affidavit</span>
                  </>
                )}
              </button>

              {aiNotice && (
                <p className="text-[10px] text-teal-300 font-mono text-center">
                  {aiNotice}
                </p>
              )}
            </div>

            {/* AI Affidavit Display Preview if generated */}
            {aiEnhancedAffidavit && (
              <div className="p-4 rounded-xl bg-slate-900 border border-teal-500/40 text-teal-100 space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between pb-2 border-b border-teal-500/20">
                  <span className="text-xs font-bold text-teal-300 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Sworn Legal Affidavit Preview</span>
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(aiEnhancedAffidavit);
                      setDossierCopied(true);
                      setTimeout(() => setDossierCopied(false), 2000);
                    }}
                    className="px-2.5 py-1 rounded bg-teal-800 hover:bg-teal-700 text-[11px] font-semibold text-white flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" />
                    <span>{dossierCopied ? 'Copied' : 'Copy Affidavit'}</span>
                  </button>
                </div>
                <pre className="text-[11px] font-mono leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto p-2.5 rounded bg-black/40 text-slate-200">
                  {aiEnhancedAffidavit}
                </pre>
              </div>
            )}

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  const text = aiEnhancedAffidavit || `=====================================================
SCAMSHIELD FRAUD INCIDENT DOSSIER & POLICE REPORT
Prepared for: Cyber Security Authority (CSA) & Ghana Police CID Cyber Crime Unit
=====================================================
DATE GENERATED: ${new Date().toISOString()}
INCIDENT REFERENCE: GH-POL-CSA-${Math.floor(100000 + Math.random() * 900000)}

[VICTIM & REPORTING DETAILS]
Complainant Name: ${victimName || 'Frontline Counter Walk-in'}
Complainant Phone: ${victimPhone || 'Pending verification'}
Telecom Network: ${telecom}
Incident Occurrence: ${incidentDate}

[SUSPECT & TRANSACTION DETAILS]
Suspect Phone / Identifier: ${suspectPhone || 'Unrecorded / Caller ID Spoofed'}
Reported Financial Loss: GHS ${amountLost || '0.00'}
Incident Summary & Vector:
${incidentDetails || 'Social engineering / MoMo transfer deception under duress.'}

[EMERGENCY ACTIONS TAKEN]
- USSD Self-Service Lock Initiated: YES
- CSA Direct Line 292 Contacted: ADVISED
- Wallet Account Freeze Requested: PENDING CARRIER INTERVENTION

[EVIDENCE PRESERVATION DIRECTIVE]
1. Do not delete transaction notification SMS or call logs.
2. Obtain certified bank/MoMo statement from customer service center.
3. Submit this signed dossier at the nearest Police Station CID division.
=====================================================`;
                  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `Ghana_Police_Scam_Dossier_${Date.now()}.txt`;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                }}
                className="w-full sm:w-auto min-h-[46px] px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition"
              >
                <Download className="w-4 h-4 text-[#0E9F8E]" />
                <span>Download Report (.txt)</span>
              </button>

              <button
                onClick={handleExportDossier}
                className="w-full sm:w-auto min-h-[46px] px-5 bg-[#0F2A47] hover:bg-[#081A2D] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition"
              >
                <Copy className="w-4 h-4 text-[#0E9F8E]" />
                <span>{dossierCopied ? 'Dossier Copied to Clipboard!' : 'Generate & Copy Formal Police Dossier'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
