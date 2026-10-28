import React, { useState } from 'react';
import { CommunityReport, RiskTier } from '../types/scamshield';
import { RiskBadge } from './RiskBadge';
import { 
  Radio, 
  Search, 
  Plus, 
  ThumbsUp, 
  MapPin, 
  Clock, 
  Filter, 
  ShieldCheck, 
  AlertTriangle,
  Building,
  CheckCircle,
  X
} from 'lucide-react';

interface FeedTabProps {
  reports: CommunityReport[];
  onAddReport: (newReport: Omit<CommunityReport, 'id' | 'timestamp' | 'corroboratedCount'>) => void;
  onCorroborate: (id: string) => void;
}

export const FeedTab: React.FC<FeedTabProps> = ({ reports, onAddReport, onCorroborate }) => {
  const [filterRisk, setFilterRisk] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New report form state
  const [formCategory, setFormCategory] = useState<CommunityReport['category']>('MoMo Fraud');
  const [formTarget, setFormTarget] = useState('');
  const [formPlatform, setFormPlatform] = useState<CommunityReport['telecomOrPlatform']>('MTN MoMo');
  const [formLocation, setFormLocation] = useState('Accra Central');
  const [formDescription, setFormDescription] = useState('');
  const [formRiskTier, setFormRiskTier] = useState<RiskTier>('high_risk');

  const filteredReports = reports.filter((rep) => {
    const matchesRisk = filterRisk === 'all' || rep.riskTier === filterRisk;
    const matchesCategory = filterCategory === 'all' || rep.category === filterCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      rep.targetIdentifier.toLowerCase().includes(query) ||
      rep.description.toLowerCase().includes(query) ||
      rep.location.toLowerCase().includes(query) ||
      rep.telecomOrPlatform.toLowerCase().includes(query);
    return matchesRisk && matchesCategory && matchesSearch;
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTarget.trim() || !formDescription.trim()) return;

    onAddReport({
      category: formCategory,
      targetIdentifier: formTarget.trim(),
      telecomOrPlatform: formPlatform,
      description: formDescription.trim(),
      riskTier: formRiskTier,
      location: formLocation,
      status: 'Unverified'
    });

    // Reset and close
    setFormTarget('');
    setFormDescription('');
    setIsModalOpen(false);
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
    <div className="space-y-6">
      {/* Top Header & Stats */}
      <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#0F2A47] text-[#0E9F8E]">
              <Radio className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-bold text-[#0F172A]">Community Scam Intelligence Feed</h2>
          </div>
          <p className="text-xs text-[#5B6B82] mt-1">
            Crowdsourced, corroborated incident reports from Ghana counter agents, merchants, and mobile money subscribers.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="min-h-[48px] px-5 bg-[#0F2A47] hover:bg-[#081A2D] active:scale-[0.99] text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition"
        >
          <Plus className="w-4 h-4 text-[#0E9F8E]" />
          <span>Submit Field Report</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-sm flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by phone number, domain, location (e.g. Accra, Kejetia), or platform..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-[#0F172A] placeholder:text-slate-400 outline-none focus:border-[#0E9F8E] focus:ring-1 focus:ring-[#0E9F8E]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <select
            value={filterRisk}
            onChange={(e) => setFilterRisk(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white outline-none focus:border-[#0E9F8E]"
          >
            <option value="all">All Risk Tiers</option>
            <option value="high_risk">High Risk Only</option>
            <option value="suspicious">Suspicious Only</option>
            <option value="low_concern">Low Concern Only</option>
            <option value="unable_to_assess">Unable to Assess</option>
          </select>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white outline-none focus:border-[#0E9F8E]"
          >
            <option value="all">All Categories</option>
            <option value="MoMo Fraud">MoMo Fraud</option>
            <option value="Phishing URL">Phishing URL</option>
            <option value="Fake Job/Scholarship">Fake Job/Scholarship</option>
            <option value="Investment Ponzi">Investment Ponzi</option>
            <option value="Impersonation">Impersonation</option>
          </select>
        </div>
      </div>

      {/* Reports Feed List */}
      <div className="space-y-3">
        {filteredReports.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 border border-[#E2E8F0] text-center space-y-2">
            <Radio className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-sm font-semibold text-slate-700">No incident reports found</p>
            <p className="text-xs text-slate-500">Try modifying your search or filter settings</p>
          </div>
        ) : (
          filteredReports.map((report) => (
            <div
              key={report.id}
              className={`bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-sm border-l-4 ${getBorderColor(report.riskTier)} transition hover:shadow-md`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="font-mono font-bold text-sm sm:text-base text-[#0F172A] tracking-wide">
                    {report.targetIdentifier}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 text-slate-700">
                    {report.telecomOrPlatform}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-[#0E9F8E]/10 text-[#006f63]">
                    {report.category}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <RiskBadge tier={report.riskTier} size="sm" />
                  <span className="text-[11px] text-slate-400 font-mono">
                    {report.timestamp}
                  </span>
                </div>
              </div>

              {/* Body */}
              <p className="text-xs sm:text-sm text-slate-700 py-3 leading-relaxed">
                {report.description}
              </p>

              {/* Footer Meta */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-slate-500">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#0E9F8E]" />
                    <span>{report.location}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    <span>Status: <strong>{report.status}</strong></span>
                  </span>
                </div>

                <button
                  onClick={() => onCorroborate(report.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-[#0E9F8E] hover:bg-slate-50 text-slate-700 text-xs font-semibold transition"
                  title="Corroborate this threat report"
                >
                  <ThumbsUp className="w-3.5 h-3.5 text-[#0E9F8E]" />
                  <span>Corroborate ({report.corroboratedCount})</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Submission Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F172A]/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h3 className="text-base font-bold text-[#0F172A]">Submit Community Field Report</h3>
                <p className="text-xs text-slate-500">Reports help protect merchants and subscribers across Ghana</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase mb-1">
                  Threat Category
                </label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-[#0E9F8E]"
                >
                  <option value="MoMo Fraud">MoMo Fraud</option>
                  <option value="Phishing URL">Phishing URL</option>
                  <option value="Fake Job/Scholarship">Fake Job/Scholarship</option>
                  <option value="Impersonation">Impersonation</option>
                  <option value="Investment Ponzi">Investment Ponzi</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase mb-1">
                  Suspect Phone Number, Wallet, or URL
                </label>
                <input
                  type="text"
                  required
                  value={formTarget}
                  onChange={(e) => setFormTarget(e.target.value)}
                  placeholder="e.g., +233 24 000 0000 or http://fake-domain.xyz"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono text-slate-800 outline-none focus:border-[#0E9F8E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase mb-1">
                    Platform / Carrier
                  </label>
                  <select
                    value={formPlatform}
                    onChange={(e) => setFormPlatform(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-[#0E9F8E]"
                  >
                    <option value="MTN MoMo">MTN MoMo</option>
                    <option value="Telecel Cash">Telecel Cash</option>
                    <option value="AT Money">AT Money</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Telegram">Telegram</option>
                    <option value="SMS">SMS</option>
                    <option value="Web">Web</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase mb-1">
                    Region / Location
                  </label>
                  <input
                    type="text"
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                    placeholder="e.g., Accra, Kumasi"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-[#0E9F8E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase mb-1">
                  Assessment Tier
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormRiskTier('high_risk')}
                    className={`py-2 px-2 rounded-lg text-xs font-bold border transition ${
                      formRiskTier === 'high_risk'
                        ? 'bg-red-50 text-red-700 border-red-300 ring-2 ring-red-200'
                        : 'bg-white text-slate-700 border-slate-200'
                    }`}
                  >
                    High Risk
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormRiskTier('suspicious')}
                    className={`py-2 px-2 rounded-lg text-xs font-bold border transition ${
                      formRiskTier === 'suspicious'
                        ? 'bg-amber-50 text-amber-800 border-amber-300 ring-2 ring-amber-200'
                        : 'bg-white text-slate-700 border-slate-200'
                    }`}
                  >
                    Suspicious
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormRiskTier('unable_to_assess')}
                    className={`py-2 px-2 rounded-lg text-xs font-bold border transition ${
                      formRiskTier === 'unable_to_assess'
                        ? 'bg-slate-100 text-slate-700 border-slate-300 ring-2 ring-slate-200'
                        : 'bg-white text-slate-700 border-slate-200'
                    }`}
                  >
                    Uncertain
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase mb-1">
                  Incident Description & Tactics
                </label>
                <textarea
                  required
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Describe the scam method, demands made, fake names used..."
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-[#0E9F8E] resize-none"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 leading-tight">
                Privacy policy notice: Do not include real PINs, passwords, or unredacted personal bank accounts. Reports remain unverified until corroborated.
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#0F2A47] hover:bg-[#081A2D] text-white text-xs font-bold shadow-sm"
                >
                  Publish Report to Feed
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
