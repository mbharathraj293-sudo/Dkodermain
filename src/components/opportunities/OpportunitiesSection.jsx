import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Trophy, Award, Calendar, ArrowRight, CheckCircle2, Bookmark, ExternalLink } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import Modal from '../ui/Modal';
import { opportunities, opportunityCategories } from '../../data/opportunities';

export default function OpportunitiesSection() {
  const [selectedCat, setSelectedCat] = useState('All');
  const [activeModalOpp, setActiveModalOpp] = useState(null);
  const [savedIds, setSavedIds] = useState([]);

  const filteredOpps = selectedCat === 'All'
    ? opportunities
    : opportunities.filter(o => o.type === selectedCat);

  const toggleSave = (e, id) => {
    e.stopPropagation();
    setSavedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <section id="opportunities" className="relative py-24 sm:py-28 bg-[#0A0C10] overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="EXPANDED CAREER PIPELINE"
          title="ACTIVE PLACEMENT"
          highlight="OPPORTUNITIES"
          subtitle="Explore verified campus hiring drives, prestigious summer engineering internships, and prize-bounty hackathons."
        />

        {/* Category Filter Chips */}
        <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {opportunityCategories.map((cat) => {
            const isSelected = selectedCat === cat;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCat(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-medium tracking-wider transition-all cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-dkoder-yellow text-black font-bold shadow-dkoder-yellow'
                    : 'bg-[#161922] text-slate-300 hover:text-white hover:bg-[#1E222D] border border-white/[0.06]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Opportunities Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredOpps.map((opp) => {
              const isSaved = savedIds.includes(opp.id);

              return (
                <motion.div
                  key={opp.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setActiveModalOpp(opp)}
                  className="tech-card rounded-2xl p-6 border border-white/10 hover:border-dkoder-yellow/40 transition-all cursor-pointer group flex flex-col justify-between shadow-editorial"
                >
                  <div>
                    {/* Header: Type & Badge */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-white/[0.06] text-dkoder-yellow border border-white/10">
                        {opp.type}
                      </span>

                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {opp.badge}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => toggleSave(e, opp.id)}
                          className="p-1 rounded text-slate-400 hover:text-white"
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'text-dkoder-yellow fill-dkoder-yellow' : ''}`} />
                        </button>
                      </div>
                    </div>

                    <h3 className="text-base sm:text-lg font-display font-bold text-white group-hover:text-dkoder-yellow transition-colors mb-1">
                      {opp.title}
                    </h3>
                    <p className="text-xs font-mono text-slate-400 mb-3">
                      Organized by {opp.organizer}
                    </p>

                    <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-2">
                      {opp.description}
                    </p>

                    {/* Compensation & Deadline Box */}
                    <div className="p-3 rounded-xl bg-[#161922] border border-white/[0.04] flex items-center justify-between mb-4">
                      <div>
                        <span className="text-[9px] font-mono uppercase text-slate-500 block">Package / Grant</span>
                        <span className="text-xs font-mono font-bold text-emerald-400">{opp.compensation}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] font-mono uppercase text-slate-500 block">Deadline</span>
                        <span className="text-xs font-mono text-white">{opp.daysLeft}d remaining</span>
                      </div>
                    </div>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {opp.skills.map((s, i) => (
                        <span key={i} className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.03] text-slate-400 border border-white/[0.06]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Action */}
                  <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Difficulty: <strong className="text-white">{opp.difficulty}</strong></span>
                    <span className="text-dkoder-yellow group-hover:translate-x-1 transition-transform flex items-center gap-1 font-semibold">
                      <span>View Opportunity</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Opportunity Modal */}
      {activeModalOpp && (
        <Modal
          isOpen={!!activeModalOpp}
          onClose={() => setActiveModalOpp(null)}
          title={activeModalOpp.title}
          subtitle={`${activeModalOpp.type} • Organized by ${activeModalOpp.organizer}`}
          maxWidth="max-w-xl"
        >
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Compensation / Bounty</span>
                <span className="text-base font-bold font-display text-emerald-400">{activeModalOpp.compensation}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Application Deadline</span>
                <span className="text-xs font-mono font-bold text-white">{activeModalOpp.deadline}</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">Opportunity Brief</h4>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-[#161922] p-3 rounded-xl border border-white/[0.06]">
                {activeModalOpp.description}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">Eligibility Criteria</h4>
              <p className="text-xs text-slate-300 bg-white/[0.02] p-2.5 rounded-lg border border-white/[0.04]">
                {activeModalOpp.eligibility}
              </p>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">Difficulty: {activeModalOpp.difficulty}</span>
              <button
                type="button"
                onClick={() => setActiveModalOpp(null)}
                className="px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase bg-dkoder-yellow text-black hover:bg-yellow-400 shadow-dkoder-yellow cursor-pointer"
              >
                Apply On Campus Portal
              </button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
