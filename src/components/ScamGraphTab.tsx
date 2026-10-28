import React, { useState } from 'react';
import { SCAM_GRAPH_NODES } from '../data/mockData';
import { ScamGraphNode, RiskTier } from '../types/scamshield';
import { RiskBadge } from './RiskBadge';
import { 
  Network, 
  Share2, 
  Phone, 
  Globe, 
  Building, 
  Wallet, 
  Flag,
  Search,
  Info,
  Maximize2
} from 'lucide-react';

export const ScamGraphTab: React.FC = () => {
  const [nodes] = useState<ScamGraphNode[]>(SCAM_GRAPH_NODES);
  const [selectedNodeId, setSelectedNodeId] = useState<string>(SCAM_GRAPH_NODES[0].id);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState('');

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || nodes[0];

  const filteredNodes = nodes.filter(n => {
    const matchesType = filterType === 'all' || n.type === filterType;
    const matchesSearch = n.label.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          n.details.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getNodeIcon = (type: ScamGraphNode['type']) => {
    switch (type) {
      case 'campaign': return Flag;
      case 'entity': return Building;
      case 'url': return Globe;
      case 'phone': return Phone;
      case 'wallet': return Wallet;
    }
  };

  const getNodeColor = (tier: RiskTier) => {
    switch (tier) {
      case 'high_risk': return 'border-[#D64545] bg-red-50/90 text-red-900';
      case 'suspicious': return 'border-[#F2A33A] bg-amber-50/90 text-amber-900';
      case 'low_concern': return 'border-[#2E86AB] bg-blue-50/90 text-blue-900';
      case 'unable_to_assess': return 'border-[#7A869A] bg-slate-50 text-slate-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#0F2A47] text-[#0E9F8E]">
              <Network className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-bold text-[#0F172A]">Scam DNA Graph & Campaign Explorer</h2>
          </div>
          <p className="text-xs text-[#5B6B82] mt-1 max-w-2xl">
            Correlate disparate phishing SMS, burner SIMs, spoofed domains, and mule mobile money wallets into unified syndicate campaign graphs.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
          <span>Active Graph Nodes: <strong>{nodes.length}</strong></span>
          <span>•</span>
          <span className="text-[#0E9F8E]">Relational Engine</span>
        </div>
      </div>

      {/* Filter and Query bar */}
      <div className="bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-sm flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search campaign nodes, phone numbers, or domains..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#0E9F8E]"
          />
        </div>

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white outline-none focus:border-[#0E9F8E]"
        >
          <option value="all">All Node Types</option>
          <option value="campaign">Fraud Campaigns</option>
          <option value="phone">Phone / MSISDNs</option>
          <option value="url">Phishing URLs</option>
          <option value="wallet">Mule Wallets</option>
          <option value="entity">Impersonated Entities</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Graph Canvas / Node Cluster (8 cols on lg) */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-[#CBD5E1] shadow-sm min-h-[500px] flex flex-col justify-between relative overflow-hidden">
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none"></div>

          <div className="relative z-10 flex items-center justify-between pb-3 border-b border-slate-200">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Syndicate Cluster Map
            </span>
            <span className="text-[11px] text-slate-500">Click any entity to inspect linked nodes</span>
          </div>

          {/* Interactive Graph Node Grid / Web */}
          <div className="relative z-10 py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
            {filteredNodes.map((node) => {
              const Icon = getNodeIcon(node.type);
              const isSelected = node.id === selectedNode.id;
              const isLinkedToSelected = selectedNode.connections.includes(node.id);

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer relative ${getNodeColor(node.riskTier)} ${
                    isSelected
                      ? 'ring-4 ring-[#0F2A47]/20 scale-[1.02] shadow-md z-20'
                      : isLinkedToSelected
                      ? 'ring-2 ring-[#0E9F8E] shadow-xs'
                      : 'hover:scale-[1.01]'
                  }`}
                >
                  {isLinkedToSelected && !isSelected && (
                    <span className="absolute -top-2 right-2 bg-[#0E9F8E] text-[#0F2A47] text-[9px] font-bold px-1.5 py-0.2 rounded-full shadow-xs">
                      LINKED
                    </span>
                  )}

                  <div className="flex items-center justify-between mb-2">
                    <div className="p-1.5 rounded-lg bg-white/80 shadow-2xs">
                      <Icon className="w-4 h-4 text-[#0F2A47]" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider font-bold opacity-75">
                      {node.type}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold truncate text-[#0F172A]">
                    {node.label}
                  </h4>
                  <p className="text-[11px] text-slate-600 line-clamp-2 mt-1">
                    {node.details}
                  </p>

                  <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                    <span>{node.connections.length} edges</span>
                    <span className="font-bold text-[#0F2A47]">&rarr; Inspect</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="relative z-10 pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D64545]"></span> High Risk
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F2A33A]"></span> Suspicious
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0E9F8E]"></span> Connected Link
              </span>
            </div>
            <span className="font-mono text-[11px]">Dynamic Node Rendering</span>
          </div>
        </div>

        {/* Selected Node Forensic Profile (4 cols on lg) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-[#CBD5E1] shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Node Forensics
                </span>
                <h3 className="text-sm font-bold text-[#0F172A] truncate max-w-[200px]">
                  {selectedNode.label}
                </h3>
              </div>
              <RiskBadge tier={selectedNode.riskTier} size="sm" />
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Node Identifier:</span>
                <span className="font-mono text-slate-800">{selectedNode.id}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Taxonomy Class:</span>
                <span className="font-bold uppercase text-[#0F2A47]">{selectedNode.type}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                Forensic Analysis
              </span>
              <p className="text-xs text-slate-700 leading-relaxed">
                {selectedNode.details}
              </p>
            </div>

            {/* Connected Associated Nodes */}
            <div className="space-y-2 pt-1">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Connected Syndicate Nodes ({selectedNode.connections.length})
              </span>
              <div className="space-y-1.5">
                {selectedNode.connections.map((connId) => {
                  const linkedNode = nodes.find(n => n.id === connId);
                  if (!linkedNode) return null;
                  return (
                    <div
                      key={connId}
                      onClick={() => setSelectedNodeId(connId)}
                      className="p-2.5 rounded-xl border border-slate-200 hover:border-[#0E9F8E] hover:bg-slate-50 cursor-pointer transition flex items-center justify-between text-xs"
                    >
                      <span className="font-medium text-slate-800 truncate pr-2">
                        {linkedNode.label}
                      </span>
                      <RiskBadge tier={linkedNode.riskTier} size="sm" showIcon={false} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
