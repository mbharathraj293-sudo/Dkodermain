import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Landmark, Users, Trophy, Sparkles, ArrowRight, CheckCircle, ExternalLink, MapPin } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import Modal from '../ui/Modal';
import { colleges } from '../../data/colleges';

export default function Colleges() {
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [hoveredCollege, setHoveredCollege] = useState(null);

  return (
    <section id="colleges" className="relative py-24 sm:py-32 bg-dkoder-darker overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-dkoder-purple-900/10 blur-[150px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="05 • CAMPUS ALLIANCE"
          title="CAMPUS CONSTELLATION"
          highlight="NETWORK"
          subtitle="Explore the interconnected university nodes where DKoder chapters foster student innovation, host hackathons, and disburse venture grants."
        />

        {/* Constellation Interactive Canvas Area */}
        <div className="relative w-full h-[400px] sm:h-[480px] rounded-3xl glass-card border border-white/10 p-6 mb-12 overflow-hidden flex items-center justify-center">
          {/* Constellation Mesh Grid Lines SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Draw lines between college nodes */}
            {colleges.map((colA, idxA) =>
              colleges.slice(idxA + 1).map((colB, idxB) => {
                const isLineActive = hoveredCollege?.id === colA.id || hoveredCollege?.id === colB.id;
                return (
                  <line
                    key={`${colA.id}-${colB.id}`}
                    x1={colA.x}
                    y1={colA.y}
                    x2={colB.x}
                    y2={colB.y}
                    stroke={isLineActive ? '#FACC15' : 'rgba(255, 255, 255, 0.08)'}
                    strokeWidth={isLineActive ? '0.4' : '0.15'}
                    strokeDasharray={isLineActive ? 'none' : '1 1'}
                    className="transition-all duration-300"
                  />
                );
              })
            )}
          </svg>

          {/* Interactive Constellation Nodes */}
          {colleges.map((college) => {
            const isHovered = hoveredCollege?.id === college.id;

            return (
              <div
                key={college.id}
                style={{
                  position: 'absolute',
                  left: `${college.x}%`,
                  top: `${college.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                className="z-20 flex flex-col items-center group cursor-pointer"
                onMouseEnter={() => setHoveredCollege(college)}
                onMouseLeave={() => setHoveredCollege(null)}
                onClick={() => setSelectedCollege(college)}
              >
                {/* Node Ring & Pulse */}
                <div className="relative">
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center backdrop-blur-md transition-all duration-300 group-hover:scale-125"
                    style={{
                      backgroundColor: isHovered ? 'rgba(250, 204, 21, 0.2)' : 'rgba(14, 7, 26, 0.8)',
                      borderColor: isHovered ? '#FACC15' : 'rgba(255, 255, 255, 0.2)',
                      boxShadow: isHovered ? '0 0 25px rgba(250, 204, 21, 0.6)' : 'none',
                    }}
                  >
                    <Landmark
                      className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110"
                      style={{ color: isHovered ? '#FACC15' : college.accent }}
                    />
                  </div>

                  <span
                    className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: college.accent }}
                  />
                </div>

                {/* College Node Label */}
                <span className="mt-1.5 px-2 py-0.5 rounded text-[10px] sm:text-xs font-mono font-bold tracking-wider text-slate-200 group-hover:text-white bg-dkoder-darker/90 border border-white/10 whitespace-nowrap shadow-md">
                  {college.name}
                </span>

                {/* Live Tooltip on Hover */}
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-full mb-3 px-3 py-2 rounded-xl bg-dkoder-darker border border-dkoder-yellow/50 text-left whitespace-nowrap shadow-glow-yellow z-30 pointer-events-none"
                  >
                    <p className="text-xs font-bold text-white">{college.name}</p>
                    <p className="text-[10px] text-dkoder-yellow font-mono">{college.headline}</p>
                    <div className="flex items-center gap-2 mt-1 text-[10px] font-mono text-slate-400">
                      <span>{college.activeStudents} Students</span>
                      <span>•</span>
                      <span>{college.hackathonsHosted} Hackathons</span>
                    </div>
                  </motion.div>
                )}
              </div>
            );
          })}

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-slate-400 pointer-events-none">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-dkoder-yellow animate-ping" />
              <span>Hover node for chapter telemetry • Click for programs & grants</span>
            </span>
            <span className="hidden sm:inline">6 Global Tier Nodes Online</span>
          </div>
        </div>

        {/* College Quick Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {colleges.map((college) => (
            <div
              key={college.id}
              onClick={() => setSelectedCollege(college)}
              className="glass-card rounded-2xl border border-white/10 p-6 flex flex-col justify-between hover:border-dkoder-yellow/40 transition-all duration-300 cursor-pointer group shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.05] border border-white/10 text-dkoder-yellow">
                    {college.tier}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-mono text-slate-400">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    <span>{college.campus}</span>
                  </div>
                </div>

                <h3 className="text-xl font-display font-bold text-white group-hover:text-dkoder-yellow transition-colors mb-1">
                  {college.name}
                </h3>
                <p className="text-xs font-mono text-slate-400 mb-4">{college.headline}</p>

                <div className="space-y-1.5 mb-6">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
                    Signature Incubators & Programs:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {college.programs.map((prog, pIdx) => (
                      <span
                        key={pIdx}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.03] text-slate-300 border border-white/[0.06]"
                      >
                        {prog}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">
                  <span className="text-white font-bold">{college.activeStudents}</span> enrolled
                </span>
                <span className="text-dkoder-yellow group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  <span>View Chapter</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* College Chapter Detail Modal */}
      {selectedCollege && (
        <Modal
          isOpen={!!selectedCollege}
          onClose={() => setSelectedCollege(null)}
          title={selectedCollege.name}
          subtitle={`${selectedCollege.tier} • ${selectedCollege.campus}`}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 grid grid-cols-3 gap-4 text-center">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Active Members</span>
                <span className="text-lg font-bold font-display text-white">{selectedCollege.activeStudents}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Hackathons Hosted</span>
                <span className="text-lg font-bold font-display text-dkoder-yellow">{selectedCollege.hackathonsHosted}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Placement Rate</span>
                <span className="text-lg font-bold font-display text-emerald-400">{selectedCollege.stats.placementRate}</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Ecosystem Focus & Programs</h4>
              <p className="text-sm text-slate-300 mb-3">{selectedCollege.headline}</p>
              <div className="flex flex-wrap gap-2">
                {selectedCollege.programs.map((p, i) => (
                  <span key={i} className="px-3 py-1 rounded-lg text-xs font-mono bg-white/[0.05] border border-white/10 text-white">
                    {p}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-dkoder-yellow mb-2">Active Student Grants & Fellowships</h4>
              <div className="space-y-2">
                {selectedCollege.opportunities.map((opp, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
                    <div>
                      <h5 className="text-xs font-bold text-white">{opp.title}</h5>
                      <span className="text-[11px] font-mono text-slate-400">Deadline: {opp.deadline}</span>
                    </div>
                    <span className="px-2.5 py-1 rounded font-mono text-xs font-bold bg-dkoder-yellow/10 text-dkoder-yellow border border-dkoder-yellow/20">
                      {opp.grant}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="text-xs font-mono text-slate-400">
                <span>Chapter Lead: </span>
                <span className="text-white font-medium">{selectedCollege.studentLead} ({selectedCollege.leadTitle})</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCollege(null)}
                className="px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase bg-dkoder-yellow text-black hover:bg-yellow-400 shadow-glow-yellow"
              >
                Connect With Chapter
              </button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
