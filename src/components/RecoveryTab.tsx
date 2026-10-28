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
  FileText
} from 'lucide-react';

export const RecoveryTab: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [dossierCopied, setDossierCopied] = useState(false);

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

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
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
