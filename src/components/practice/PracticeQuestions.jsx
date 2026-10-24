import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, ChevronUp, ArrowRight, CheckCircle2, Zap, Target, Award } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { practiceQuestions } from '../../data/questions';

export default function PracticeQuestions({ onStartQuestion }) {
  const [expandedId, setExpandedId] = useState(practiceQuestions[0].id);

  const toggleExpand = (id) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <section id="practice-questions" className="relative py-24 sm:py-28 bg-[#0F1117] border-b border-white/[0.06] overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="COMPANY OA PROBLEM ARCHIVE"
          title="CURATED PLACEMENT"
          highlight="PROBLEMS"
          subtitle="Explore questions tagged by actual company recruitment patterns with verified rationale on why each problem matters."
        />

        {/* Question Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {practiceQuestions.map((q) => {
            const isExpanded = expandedId === q.id;

            return (
              <div
                key={q.id}
                className="tech-card rounded-2xl p-6 border border-white/10 hover:border-dkoder-yellow/40 transition-all flex flex-col justify-between shadow-editorial"
              >
                <div>
                  {/* Top Bar: Company Badge & Difficulty */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-white/[0.06] text-dkoder-yellow border border-white/10">
                      {q.company} • {q.packageTier}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${
                      q.difficulty === 'Easy' || q.difficulty === 'Basic'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : q.difficulty === 'Medium'
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                    }`}>
                      {q.difficulty}
                    </span>
                  </div>

                  {/* Title & Topic */}
                  <h3 className="text-lg font-display font-bold text-white mb-1">
                    {q.title}
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mb-4">
                    Topic: {q.topic} • Acceptance: {q.acceptance}
                  </p>

                  <div className="text-[11px] font-mono text-emerald-400/90 mb-4 bg-emerald-500/[0.05] p-2 rounded-lg border border-emerald-500/20">
                    ⚡ {q.frequency}
                  </div>

                  {/* "WHY THIS QUESTION?" Expandable Drawer */}
                  <div className="mb-4">
                    <button
                      type="button"
                      onClick={() => toggleExpand(q.id)}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#161922] hover:bg-[#1E222D] border border-white/[0.06] text-xs font-mono font-semibold text-dkoder-yellow transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-1.5">
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>WHY THIS QUESTION?</span>
                      </span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="p-3.5 bg-[#161922] rounded-b-xl border-x border-b border-white/[0.06] space-y-2.5 text-xs">
                            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-400">
                              <div>Target: <strong className="text-white">{q.whyQuestion.target}</strong></div>
                              <div>Package: <strong className="text-emerald-400">{q.whyQuestion.package}</strong></div>
                              <div>Skill: <strong className="text-white">{q.whyQuestion.skill}</strong></div>
                              <div>Difficulty: <strong className="text-dkoder-yellow">{q.whyQuestion.difficulty}</strong></div>
                            </div>

                            <p className="text-[11px] text-slate-300 leading-relaxed font-sans pt-1 border-t border-white/[0.04]">
                              {q.whyQuestion.context}
                            </p>

                            <div className="pt-1">
                              <span className="text-[9px] font-mono uppercase text-slate-500 block mb-1">
                                Strengthens:
                              </span>
                              <div className="flex flex-wrap gap-1">
                                {q.whyQuestion.strengthens.map((str, sIdx) => (
                                  <span
                                    key={sIdx}
                                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.05] text-slate-300 border border-white/[0.06]"
                                  >
                                    ✓ {str}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Card CTA: [ START CHALLENGE → ] */}
                <div className="pt-3 border-t border-white/[0.06]">
                  <button
                    type="button"
                    onClick={() => {
                      if (onStartQuestion) onStartQuestion(q);
                      const el = document.querySelector('#practice-code');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-white/[0.05] hover:bg-dkoder-yellow hover:text-black text-white border border-white/10 hover:border-dkoder-yellow transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <span>START CHALLENGE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
