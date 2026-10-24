import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle2, ArrowRight, Zap, Target, Award, Play } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

export default function PlacementReadiness({ onFixWeakestArea }) {
  const readiness = 74;

  const breakdowns = [
    { label: 'Coding Practice', score: 82, color: '#10B981', status: 'Strong', desc: 'Syntax fluency, clean code & standard algorithm patterns' },
    { label: 'Data Structures (DSA)', score: 79, color: '#38BDF8', status: 'Proficient', desc: 'Binary Trees, Heaps, Graph BFS/DFS, Hash Tables' },
    { label: 'Consistency & Streaks', score: 76, color: '#FACC15', status: 'On Track', desc: '18-day active streak in daily problem solving' },
    { label: 'Aptitude & MCQs', score: 68, color: '#A855F7', status: 'Moderate', desc: 'Speed Quants, Syllogisms, Core CS Technical MCQs' },
    { label: 'Mock Assessments', score: 61, color: '#EF4444', status: 'Attention Needed', desc: 'Timed test pressure & sectional cutoff simulations' }
  ];

  // SVG Circular progress math
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (readiness / 100) * circumference;

  return (
    <section id="readiness" className="relative py-24 bg-[#0A0C10] border-b border-white/[0.06] overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="PLACEMENT READINESS TELEMETRY"
          title="YOUR PLACEMENT"
          highlight="READINESS"
          subtitle="A transparent aggregate index synthesizing your problem-solving accuracy, mock test performance, and consistency."
        />

        {/* Readiness Dashboard Container */}
        <div className="tech-card rounded-2xl p-6 sm:p-10 border border-white/10 shadow-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Animated Radial Progress Dial (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-[#161922] rounded-2xl border border-white/[0.06] text-center">
              <div className="relative w-44 h-44 flex items-center justify-center mb-4">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                  {/* Background Track */}
                  <circle
                    cx="80"
                    cy="80"
                    r={radius}
                    stroke="rgba(255, 255, 255, 0.08)"
                    strokeWidth="12"
                    fill="none"
                  />
                  {/* Active Progress Ring */}
                  <motion.circle
                    cx="80"
                    cy="80"
                    r={radius}
                    stroke="#FACC15"
                    strokeWidth="12"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    whileInView={{ strokeDashoffset }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>

                {/* Center Score */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl sm:text-5xl font-display font-black text-white">
                    {readiness}%
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-dkoder-yellow font-bold">
                    Readiness Score
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono font-bold uppercase text-emerald-400">
                  Status: Placement Eligible
                </span>
                <p className="text-xs text-slate-400 max-w-xs">
                  Scores above 70% qualify for Tier-1 Super Dream campus recruitment rounds.
                </p>
              </div>

              {/* Weakest Area Alert Box */}
              <div className="w-full mt-6 pt-5 border-t border-white/[0.06] text-left p-4 rounded-xl bg-rose-500/[0.06] border border-rose-500/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>YOUR WEAKEST AREA</span>
                  </span>
                  <span className="text-xs font-mono font-bold text-rose-400">61% Score</span>
                </div>

                <h4 className="text-sm font-display font-bold text-white">
                  Mock Assessments & Test Speed
                </h4>
                <p className="text-xs text-slate-300">
                  You scored high in untimed coding but lost 24% points under sectional time constraints during the last proctored simulation.
                </p>

                <button
                  type="button"
                  onClick={onFixWeakestArea}
                  className="w-full mt-2 py-2.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider bg-rose-500 hover:bg-rose-400 text-white transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <span>FIX MY WEAKEST AREA</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right: Granular Metric Breakdowns (7 Cols) */}
            <div className="lg:col-span-7 space-y-3.5">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block pb-1">
                5-Discipline Skill Calibration
              </span>

              <div className="space-y-3">
                {breakdowns.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#161922] border border-white/[0.06] space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <span className="font-semibold text-white mr-2">{item.label}</span>
                        <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-white/[0.04] text-slate-400">
                          {item.status}
                        </span>
                      </div>
                      <span className="font-mono font-bold text-white text-sm">
                        {item.score}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-white/[0.06] rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.score}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: idx * 0.1 }}
                        style={{ backgroundColor: item.color }}
                      />
                    </div>

                    <p className="text-[11px] text-slate-400">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
