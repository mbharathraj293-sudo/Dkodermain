import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Globe, Brain, Database, Cloud, ShieldAlert, Cpu, ArrowRight, CheckCircle, Briefcase, Award } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { careerTracks } from '../../data/careerTracks';

const TRACK_ICONS = {
  sde: Code2,
  web: Globe,
  'ai-ml': Brain,
  'data-science': Database,
  'cloud-devops': Cloud,
  cybersecurity: ShieldAlert,
  'iot-robotics': Cpu
};

export default function CareerTracksSection({ onOpenPathfinder }) {
  const [selectedTrackId, setSelectedTrackId] = useState(careerTracks[0].id);
  const activeTrack = careerTracks.find(t => t.id === selectedTrackId) || careerTracks[0];
  const Icon = TRACK_ICONS[activeTrack.id] || Code2;

  return (
    <section id="career-tracks" className="relative py-24 sm:py-28 bg-[#0F1117] border-y border-white/[0.06] overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="CAREER ALIGNMENT"
          title="CHOOSE YOUR"
          highlight="CAREER TRACK"
          subtitle="Select your target engineering specialization to reveal its step-by-step roadmap from foundation to placement."
        />

        {/* Track Pills Carousel / Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar justify-start lg:justify-center">
          {careerTracks.map((track) => {
            const isSelected = track.id === selectedTrackId;
            const TrackIcon = TRACK_ICONS[track.id] || Code2;

            return (
              <button
                key={track.id}
                type="button"
                onClick={() => setSelectedTrackId(track.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-[#1E222D] border-dkoder-yellow text-white shadow-dkoder-yellow'
                    : 'bg-[#12151D] border-white/[0.06] text-slate-400 hover:text-white hover:bg-[#161922]'
                }`}
              >
                <TrackIcon className="w-4 h-4" style={{ color: track.accentColor }} />
                <span>{track.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Track Roadmap Showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTrack.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="tech-card rounded-2xl p-6 sm:p-10 border border-white/10 shadow-editorial space-y-8"
          >
            {/* Header: Overview & Package */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/[0.08]">
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className="p-2.5 rounded-xl border"
                    style={{
                      backgroundColor: `${activeTrack.accentColor}15`,
                      borderColor: `${activeTrack.accentColor}40`,
                    }}
                  >
                    <Icon className="w-6 h-6" style={{ color: activeTrack.accentColor }} />
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

              {/* Package and Hiring Telemetry */}
              <div className="flex items-center gap-6 bg-[#161922] p-4 rounded-xl border border-white/[0.06] shrink-0">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">Avg. CTC Range</span>
                  <p className="text-lg sm:text-xl font-bold font-display text-dkoder-yellow mt-0.5">{activeTrack.avgPackage}</p>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">Hiring Velocity</span>
                  <p className="text-sm font-bold font-mono text-emerald-400 mt-0.5">{activeTrack.hiringRate}</p>
                </div>
              </div>
            </div>

            {/* 5-Phase Animated Career Roadmap: FOUNDATION -> CORE SKILLS -> PROJECTS -> INTERVIEW -> PLACEMENT */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-dkoder-yellow mb-5 flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>5-Phase Career Progression Roadmap</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5 relative">
                {activeTrack.roadmap.map((step, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-4 rounded-xl bg-[#161922] border border-white/[0.06] hover:border-dkoder-yellow/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono font-bold text-dkoder-yellow">
                          PHASE {step.phase}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">
                          {step.duration}
                        </span>
                      </div>

                      <h5 className="text-sm font-bold text-white mb-2">
                        {step.title}
                      </h5>

                      <p className="text-xs text-slate-300 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/[0.04] mt-3">
                      <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        <span>Verified Milestone</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills & Target Roles Bottom Split */}
            <div className="pt-6 border-t border-white/[0.08] grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h5 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Code2 className="w-3.5 h-3.5 text-dkoder-yellow" />
                  <span>Key Technical Proficiencies</span>
                </h5>
                <div className="flex flex-wrap gap-2">
                  {activeTrack.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-3 py-1 rounded-lg text-xs font-mono bg-white/[0.05] border border-white/10 text-slate-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h5 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Briefcase className="w-3.5 h-3.5 text-dkoder-yellow" />
                  <span>Target Campus Hiring Roles</span>
                </h5>
                <div className="flex flex-wrap gap-2">
                  {activeTrack.targetRoles.map((role, rIdx) => (
                    <span
                      key={rIdx}
                      className="px-3 py-1 rounded-lg text-xs font-mono bg-dkoder-yellow/10 border border-dkoder-yellow/20 text-dkoder-yellow"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Recruiter Footnote & Pathfinder Action */}
            <div className="pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
              <div className="text-slate-400">
                <span>Top Campus Recruiters: </span>
                <span className="text-white font-medium">{activeTrack.topRecruiters.join(', ')}</span>
              </div>

              <button
                type="button"
                onClick={onOpenPathfinder}
                className="text-dkoder-yellow hover:text-white transition-colors flex items-center gap-1.5 font-bold"
              >
                <span>Generate Customized {activeTrack.title} Path</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
