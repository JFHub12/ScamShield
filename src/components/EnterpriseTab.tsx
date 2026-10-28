import React, { useState } from 'react';
import { INITIAL_ENTERPRISE_INCIDENTS } from '../data/mockData';
import { EnterpriseIncident, RiskTier } from '../types/scamshield';
import { RiskBadge } from './RiskBadge';
import { 
  Building2, 
  Search, 
  Filter, 
  AlertOctagon, 
  Clock, 
  ShieldCheck, 
  CheckCircle, 
  FileSpreadsheet, 
  Download,
  UserCheck,
  ChevronRight,
  Plus,
  X
} from 'lucide-react';

export const EnterpriseTab: React.FC = () => {
  const [incidents, setIncidents] = useState<EnterpriseIncident[]>(INITIAL_ENTERPRISE_INCIDENTS);
  const [selectedIncident, setSelectedIncident] = useState<EnterpriseIncident | null>(incidents[0]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewCaseOpen, setIsNewCaseOpen] = useState(false);

  // New Case Modal fields
  const [newMsisdn, setNewMsisdn] = useState('');
  const [newBranch, setNewBranch] = useState('Accra Makola Branch');
  const [newAmount, setNewAmount] = useState('2500');
  const [newVector, setNewVector] = useState('Impersonated Agent Float Reversal');
  const [newNotes, setNewNotes] = useState('');
  const [newRisk, setNewRisk] = useState<RiskTier>('high_risk');

  const filteredIncidents = incidents.filter((inc) => {
    const matchesStatus = filterStatus === 'all' || inc.status === filterStatus;
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      inc.caseNumber.toLowerCase().includes(query) ||
      inc.customerMsisdn.toLowerCase().includes(query) ||
      inc.branchLocation.toLowerCase().includes(query) ||
      inc.fraudVector.toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });

  const handleUpdateStatus = (id: string, newStatus: EnterpriseIncident['status']) => {
    setIncidents((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updated: EnterpriseIncident = {
            ...item,
            status: newStatus,
            timeline: [
              ...item.timeline,
              {
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                event: `Status transitioned to "${newStatus}"`,
                user: 'Senior Compliance Officer'
              }
            ]
          };
          if (selectedIncident?.id === id) {
            setSelectedIncident(updated);
          }
          return updated;
        }
        return item;
      })
    );
  };

  const handleCreateCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsisdn.trim()) return;

    const caseNum = `CASE-GH-2026-${Math.floor(8825 + Math.random() * 1000)}`;
    const newCase: EnterpriseIncident = {
      id: `inc-${Date.now()}`,
      caseNumber: caseNum,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
      customerMsisdn: newMsisdn.trim(),
      counterAgentId: 'AGT-HQ-OPS-1',
      branchLocation: newBranch,
      transactionAmountGhs: parseFloat(newAmount) || 0,
      fraudVector: newVector,
      status: 'Under Investigation',
      riskTier: newRisk,
      timeline: [
        {
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          event: 'Case opened by Counter Compliance Desk',
          user: 'AGT-HQ-OPS-1'
        }
      ],
      evidenceNotes: newNotes || 'Walk-in customer reported suspicious transaction attempt.'
    };

    setIncidents([newCase, ...incidents]);
    setSelectedIncident(newCase);
    setIsNewCaseOpen(false);
    setNewMsisdn('');
    setNewNotes('');
  };

  const exportCsv = () => {
    const headers = ['Case Number', 'Timestamp', 'Customer MSISDN', 'Agent ID', 'Branch Location', 'Amount GHS', 'Fraud Vector', 'Status'];
    const rows = incidents.map(i => [
      i.caseNumber,
      i.timestamp,
      i.customerMsisdn,
      i.counterAgentId,
      `"${i.branchLocation}"`,
      i.transactionAmountGhs.toFixed(2),
      `"${i.fraudVector}"`,
      i.status
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `scamshield_cases_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header and Stats */}
      <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#0F2A47] text-[#0E9F8E]">
              <Building2 className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-bold text-[#0F172A]">Enterprise Case Management & Compliance Desk</h2>
          </div>
          <p className="text-xs text-[#5B6B82] mt-1">
            Institutional investigation timelines, counter agent audit trails, and multi-branch fraud incident orchestration.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsNewCaseOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-[#0F2A47] hover:bg-[#081A2D] text-white font-semibold text-xs transition flex items-center gap-2 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5 text-[#0E9F8E]" />
            <span>Open Incident Case</span>
          </button>

          <button
            onClick={exportCsv}
            className="px-4 py-2.5 rounded-xl border border-slate-200 hover:border-[#0E9F8E] hover:bg-slate-50 text-slate-700 font-semibold text-xs transition flex items-center gap-2"
          >
            <Download className="w-3.5 h-3.5 text-[#0E9F8E]" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-sm flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by case number, customer MSISDN, agent ID, or branch..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#0E9F8E]"
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white outline-none focus:border-[#0E9F8E]"
        >
          <option value="all">All Case Statuses</option>
          <option value="Session Frozen">Session Frozen</option>
          <option value="Under Investigation">Under Investigation</option>
          <option value="Escalated to Compliance">Escalated to Compliance</option>
          <option value="Audit Complete">Audit Complete</option>
        </select>
      </div>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Table of Incidents (7 cols on lg) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#CBD5E1] shadow-sm overflow-hidden">
          <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Active Incident Register ({filteredIncidents.length})
            </span>
            <span className="text-[11px] text-slate-500 font-mono">Bank of Ghana Compliance Standard</span>
          </div>

          <div className="divide-y divide-slate-100 overflow-x-auto">
            {filteredIncidents.map((incident) => {
              const isSelected = selectedIncident?.id === incident.id;
              return (
                <div
                  key={incident.id}
                  onClick={() => setSelectedIncident(incident)}
                  className={`p-4 flex items-center justify-between gap-4 cursor-pointer transition ${
                    isSelected
                      ? 'bg-[#E6EEFF] border-l-4 border-l-[#0E9F8E]'
                      : 'hover:bg-slate-50 border-l-4 border-l-transparent'
                  }`}
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono font-bold text-xs text-[#0F2A47]">
                        {incident.caseNumber}
                      </span>
                      <RiskBadge tier={incident.riskTier} size="sm" showIcon={false} />
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        incident.status === 'Session Frozen'
                          ? 'bg-red-100 text-red-700'
                          : incident.status === 'Escalated to Compliance'
                          ? 'bg-amber-100 text-amber-800'
                          : incident.status === 'Audit Complete'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {incident.status}
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 truncate font-medium">
                      {incident.fraudVector} • {incident.branchLocation}
                    </p>

                    <div className="flex items-center gap-3 text-[11px] text-slate-500 font-mono">
                      <span>MSISDN: {incident.customerMsisdn}</span>
                      <span>•</span>
                      <span className="font-bold text-slate-800">₵ {incident.transactionAmountGhs.toLocaleString()} GHS</span>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Incident Detail & Investigation Timeline Pane (5 cols on lg) */}
        <div className="lg:col-span-5 space-y-4">
          {selectedIncident ? (
            <div className="bg-white rounded-2xl p-6 border border-[#CBD5E1] shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Investigation Dossier
                  </span>
                  <h3 className="text-base font-bold text-[#0F172A]">{selectedIncident.caseNumber}</h3>
                </div>
                <RiskBadge tier={selectedIncident.riskTier} size="md" />
              </div>

              {/* Summary telemetry */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Branch & Station:</span>
                  <span className="font-medium text-slate-800">{selectedIncident.branchLocation}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Agent Operator ID:</span>
                  <span className="font-mono text-slate-800">{selectedIncident.counterAgentId}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Flagged Value:</span>
                  <span className="font-mono font-bold text-slate-800">₵ {selectedIncident.transactionAmountGhs.toFixed(2)} GHS</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Current Status:</span>
                  <span className="font-bold text-[#0F2A47]">{selectedIncident.status}</span>
                </div>
              </div>

              {/* Evidence Narrative */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                  Agent Evidence Notes
                </span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {selectedIncident.evidenceNotes}
                </p>
              </div>

              {/* Chronological Investigation Timeline */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  Investigation Audit Trail
                </span>
                <div className="space-y-2 relative border-l-2 border-slate-200 ml-2 pl-3">
                  {selectedIncident.timeline.map((event, idx) => (
                    <div key={idx} className="relative text-xs space-y-0.5 pb-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#0E9F8E] absolute -left-[18px] top-1"></div>
                      <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                        <span>{event.time}</span>
                        <span>{event.user}</span>
                      </div>
                      <p className="text-slate-700 font-medium">{event.event}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* State Transitions / Interventions */}
              <div className="pt-3 border-t border-slate-200 space-y-2">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                  Authorized Governance Action
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleUpdateStatus(selectedIncident.id, 'Session Frozen')}
                    className="py-2.5 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition"
                  >
                    Freeze Float
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedIncident.id, 'Escalated to Compliance')}
                    className="py-2.5 px-3 rounded-xl bg-[#0F2A47] hover:bg-[#081A2D] text-white font-bold text-xs transition"
                  >
                    Escalate to Bank
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedIncident.id, 'Under Investigation')}
                    className="py-2.5 px-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition"
                  >
                    Set In-Review
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedIncident.id, 'Audit Complete')}
                    className="py-2.5 px-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition"
                  >
                    Close Audit
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center text-xs text-slate-500">
              Select an incident from the register to view timeline and forensic notes.
            </div>
          )}
        </div>
      </div>

      {/* New Case Creation Modal */}
      {isNewCaseOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F172A]/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h3 className="text-base font-bold text-[#0F172A]">Open New Enterprise Incident Case</h3>
                <p className="text-xs text-slate-500">Record counter fraud attempt or suspicious walk-in</p>
              </div>
              <button
                onClick={() => setIsNewCaseOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCase} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase mb-1">Customer MSISDN</label>
                  <input
                    type="text"
                    required
                    value={newMsisdn}
                    onChange={(e) => setNewMsisdn(e.target.value)}
                    placeholder="+233 24 000 0000"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono text-slate-800 outline-none focus:border-[#0E9F8E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase mb-1">Amount Flagged (GHS)</label>
                  <input
                    type="number"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    placeholder="2500"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono font-bold text-slate-800 outline-none focus:border-[#0E9F8E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase mb-1">Branch / Terminal Location</label>
                <input
                  type="text"
                  value={newBranch}
                  onChange={(e) => setNewBranch(e.target.value)}
                  placeholder="e.g. Accra Central Kiosk 12"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-[#0E9F8E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase mb-1">Fraud Vector</label>
                <input
                  type="text"
                  value={newVector}
                  onChange={(e) => setNewVector(e.target.value)}
                  placeholder="e.g. Emergency Bail Call, Fake Reversal SMS"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-[#0E9F8E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase mb-1">Agent Evidence Notes</label>
                <textarea
                  rows={3}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Caller instructions, demeanour, mismatched name on phone ledger..."
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-[#0E9F8E] resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewCaseOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0F2A47] hover:bg-[#081A2D] text-white text-xs font-bold shadow-sm"
                >
                  Create Incident Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
