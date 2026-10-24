import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Layers, BarChart3, Cpu, ShieldCheck, Cloud, TrendingUp, CheckCircle, ArrowRight, Briefcase, Award } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { careerTracks } from '../../data/careerTracks';

const ICONS = {
  Brain,
  Layers,
  BarChart3,
  Cpu,
  ShieldCheck,
  Cloud
};

export default function CareerTracks({ onOpenPathfinder }) {
  const [selectedTrackId, setSelectedTrackId] = useState(careerTracks[0].id);
  const activeTrack = careerTracks.find((t) => t.id === selectedTrackId) || careerTracks[0];
  const TrackIcon = ICONS[activeTrack.icon] || Brain;

  return (
    <section id="tracks" className="relative py-24 sm:py-32 bg-dkoder-darker/90 overflow-hidden">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-dkoder-purple-900/10 blur-[140px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="02 • CHOOSE YOUR TRAJECTORY"
          title="CAREER & SKILL"
          highlight="TRACKS"
          subtitle="Explore hyper-specialized engineering pathways designed around today's most demanding production roles."
        />

        {/* Track Category Badges */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar justify-start lg:justify-center">
          {careerTracks.map((track) => {
            const isSelected = track.id === selectedTrackId;
            const Icon = ICONS[track.icon] || Brain;

            return (
              <button
                key={track.id}
                type="button"
                onClick={() => setSelectedTrackId(track.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 shrink-0 ${
                  isSelected
                    ? 'bg-dkoder-card border-dkoder-yellow text-white shadow-glow-yellow'
                    : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <Icon className="w-4 h-4" style={{ color: track.accentColor }} />
                <span>{track.title}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Track Detailed View */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTrack.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="glass-card rounded-2xl p-6 sm:p-8 md:p-10 border border-white/10 shadow-2xl"
          >
            {/* Track Header Card */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/[0.08]">
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className="p-2.5 rounded-xl border"
                    style={{
                      backgroundColor: `${activeTrack.accentColor}15`,
                      borderColor: `${activeTrack.accentColor}40`,
                    }}
                  >
                    <TrackIcon className="w-6 h-6" style={{ color: activeTrack.accentColor }} />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                      {activeTrack.category}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                      {activeTrack.title}
                    </h3>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-slate-300 max-w-2xl">
                  {activeTrack.shortDesc}
                </p>
              </div>

              {/* Quick Metrics */}
              <div className="flex items-center gap-6 shrink-0 bg-white/[0.03] p-4 rounded-xl border border-white/[0.06]">
                <div>
                  <div className="flex items-center gap-1 text-emerald-400 text-xs font-mono">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Demand Index</span>
                  </div>
                  <p className="text-xl font-bold font-display text-white mt-0.5">{activeTrack.demandScore}/100</p>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div>
                  <span className="text-xs font-mono text-slate-400 block">Est. Market Scope</span>
                  <p className="text-base sm:text-lg font-bold font-mono text-dkoder-yellow mt-0.5">{activeTrack.avgStipend}</p>
                </div>
              </div>
            </div>

            {/* 3-Tier Skill Progression Pathway */}
            <div className="py-8">
              <h4 className="text-xs font-mono uppercase tracking-wider text-dkoder-yellow mb-6 flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>Skill Progression Matrix (Beginner → Production Mastery)</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                {activeTrack.progression.map((stage, idx) => (
                  <div
                    key={idx}
                    className="relative p-5 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-mono font-bold uppercase text-dkoder-yellow">
                          Level 0{idx + 1}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500">
                          {idx === 0 ? 'Foundation' : idx === 1 ? 'Specialization' : 'Mastery'}
                        </span>
                      </div>

                      <h5 className="text-base font-bold text-white mb-3">
                        {stage.level}
                      </h5>

                      <ul className="space-y-2 mb-4">
                        {stage.skills.map((skill, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-2 text-xs text-slate-300">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{skill}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-3 border-t border-white/[0.06] mt-2">
                      <span className="text-[10px] font-mono uppercase text-slate-400 block">
                        Target Milestone:
                      </span>
                      <span className="text-xs font-medium text-dkoder-yellow">
                        {stage.milestone}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Opportunities & Example Projects */}
            <div className="pt-6 border-t border-white/[0.08] grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h5 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Briefcase className="w-3.5 h-3.5 text-dkoder-yellow" />
                  <span>Direct Placement Roles</span>
                </h5>
                <div className="flex flex-wrap gap-2">
                  {activeTrack.opportunities.map((opp, oppIdx) => (
                    <span
                      key={oppIdx}
                      className="px-3 py-1.5 rounded-lg text-xs font-mono bg-white/[0.05] border border-white/10 text-slate-200"
                    >
                      {opp}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h5 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-dkoder-yellow" />
                  <span>Example Flagship Builds</span>
                </h5>
                <div className="flex flex-wrap gap-2">
                  {activeTrack.exampleProjects.map((proj, pIdx) => (
                    <span
                      key={pIdx}
                      className="px-3 py-1.5 rounded-lg text-xs font-mono bg-dkoder-yellow/10 border border-dkoder-yellow/20 text-dkoder-yellow"
                    >
                      {proj}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Pathfinder Footer Callout */}
            <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="font-mono text-dkoder-yellow">Ecosystem Partners:</span>
                <span>{activeTrack.partners.join(' • ')}</span>
              </div>
              <button
                type="button"
                onClick={onOpenPathfinder}
                className="inline-flex items-center gap-2 text-xs font-mono font-bold text-dkoder-yellow hover:text-white transition-colors group"
              >
                <span>Generate your custom path for {activeTrack.title}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
