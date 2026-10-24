import React, { useState } from 'react';
import {
  Briefcase,
  Search,
  Bookmark,
  Calendar,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { opportunities, opportunityCategories } from '../data/opportunities';
import { usePlacement } from '../context/PlacementContext';
import Modal from '../components/ui/Modal';
import PageHeader from '../components/ui/PageHeader';

export default function OpportunitiesPage() {
  const { savedOpportunities, toggleSaveOpportunity } = usePlacement();

  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOpp, setSelectedOpp] = useState(null);

  const filteredOpps = opportunities.filter((opp) => {
    if (activeCategory !== 'All' && opp.type !== activeCategory) {
      return false;
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        opp.title.toLowerCase().includes(q) ||
        opp.organizer.toLowerCase().includes(q) ||
        opp.skills.some((s) => s.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 font-sans">
      {/* Standard Page Header */}
      <PageHeader
        backTo="/dashboard"
        backLabel="Back to Dashboard"
        category="Career Opportunities"
        title="Opportunities & Drives"
        description="Campus placement drives, practice assessment events, and student engineering opportunities."
        actions={
          <span className="px-3 py-1.5 rounded-xl bg-white border border-[#E8E4F0] text-xs text-[#17152B] shadow-xs font-medium">
            Saved: <strong className="text-[#5B21B6] font-bold">{savedOpportunities.length}</strong>
          </span>
        }
      />

      {/* FILTER & SEARCH BAR */}
      <section className="rounded-2xl p-4 sm:p-5 bg-white border border-[#E8E4F0] space-y-4 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
            {opportunityCategories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer shrink-0 border ${
                    isActive
                      ? 'bg-[#5B21B6] text-white border-[#5B21B6] shadow-xs'
                      : 'bg-white text-[#625F72] hover:text-[#5B21B6] hover:bg-[#FAF9FF] border-[#E8E4F0]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Query Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-3.5 h-3.5 text-[#A09CB0] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search drives, skills, companies..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#FAF9FF] border border-[#E8E4F0] text-xs text-[#17152B] placeholder-[#A09CB0] focus:outline-none focus:border-[#5B21B6]"
            />
          </div>
        </div>
      </section>

      {/* Section 20: OPPORTUNITY CARDS GRID (Organization, Opportunity, Deadline, Eligibility, Type, Action) */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOpps.map((opp) => {
          const isSaved = savedOpportunities.includes(opp.id);

          return (
            <div
              key={opp.id}
              className="rounded-2xl p-6 bg-white border border-[#E8E4F0] hover:border-[#D8C7FF] hover:-translate-y-0.5 transition-all flex flex-col justify-between shadow-xs group"
            >
              <div>
                {/* Header: Type, Demo Indicator, Bookmark */}
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#EDE5FF] text-[#5B21B6] border border-[#D8C7FF]">
                    {opp.type}
                  </span>

                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] uppercase font-sans font-medium text-[#625F72] bg-[#FAF9FF] border border-[#E8E4F0]">
                      Demo Opportunity
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleSaveOpportunity(opp.id)}
                      className="p-1 rounded text-[#A09CB0] hover:text-[#5B21B6] cursor-pointer"
                      title={isSaved ? 'Remove from saved' : 'Save opportunity'}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'text-[#5B21B6] fill-[#5B21B6]' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Title & Organization */}
                <h3 className="text-base font-display font-bold text-[#17152B] group-hover:text-[#5B21B6] transition-colors mb-1">
                  {opp.title}
                </h3>
                <p className="text-xs text-[#625F72] mb-3 font-sans">
                  Organization: <strong className="text-[#17152B] font-semibold">{opp.organizer}</strong>
                </p>

                {/* Metadata: Deadline, Eligibility, Status */}
                <div className="space-y-1.5 text-xs text-[#18152B] bg-[#FAF9FF] p-3 rounded-xl border border-[#E8E4F0] mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[#6B687A] flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#5B21B6]" />
                      <span>Deadline:</span>
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold text-amber-800 bg-amber-50 border border-amber-200">
                      {opp.deadline || 'Nov 15, 2026'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#6B687A]">Eligibility:</span>
                    <span className="text-[#18152B] font-medium">{opp.eligibility || '2026 Batch, B.Tech/B.E'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#6B687A]">Status:</span>
                    <span className="text-[#16A34A] font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{opp.status || 'Active Registration'}</span>
                    </span>
                  </div>
                </div>

                {/* Required Skills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {opp.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 rounded text-[11px] bg-white text-[#5B21B6] font-medium border border-[#E8E4F0]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons: View Opportunity & Apply / Explore */}
              <div className="pt-3 border-t border-[#E8E4F0] flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedOpp(opp)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-white hover:bg-[#FAF9FF] text-[#18152B] hover:text-[#5B21B6] border border-[#E8E4F0] hover:border-[#7C3AED]/40 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>View Details</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedOpp(opp)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-[#5B21B6] hover:bg-[#4C1D95] text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-[0.98]"
                >
                  <span>Explore Track</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          );
        })}
      </section>

      {/* Opportunity Detail Modal */}
      {selectedOpp && (
        <Modal
          isOpen={!!selectedOpp}
          onClose={() => setSelectedOpp(null)}
          title={selectedOpp.title}
          subtitle={`Organization: ${selectedOpp.organizer} • Type: ${selectedOpp.type}`}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-5 text-left font-sans">
            <div className="p-4 rounded-xl bg-[#FAF9FF] border border-[#E8E4F0] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase text-[#5B21B6] font-bold">Opportunity Details</span>
                <span className="text-[10px] font-sans uppercase font-medium px-2 py-0.5 rounded bg-white text-[#625F72] border border-[#E8E4F0]">
                  Demo Opportunity
                </span>
              </div>
              <p className="text-xs text-[#625F72] leading-relaxed">
                {selectedOpp.description || 'This sample opportunity represents typical recruitment drive timelines and sectional assessment prerequisites.'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white border border-[#E8E4F0]">
                <span className="text-[#625F72] block text-[11px] font-medium">Deadline</span>
                <span className="text-[#17152B] font-bold mt-0.5 block">{selectedOpp.deadline || 'Nov 15, 2026'}</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-[#E8E4F0]">
                <span className="text-[#625F72] block text-[11px] font-medium">Eligibility Criteria</span>
                <span className="text-[#17152B] font-bold mt-0.5 block">{selectedOpp.eligibility || '2026 Batch CSE/IT/ECE'}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8E4F0] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setSelectedOpp(null)}
                className="px-4 py-2 rounded-xl text-xs text-[#625F72] hover:text-[#17152B]"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  toggleSaveOpportunity(selectedOpp.id);
                  setSelectedOpp(null);
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#5B21B6] text-white hover:bg-[#4C1D95] transition-colors shadow-sm cursor-pointer"
              >
                <span>{savedOpportunities.includes(selectedOpp.id) ? 'Saved in Portfolio ✓' : 'Save Opportunity'}</span>
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
