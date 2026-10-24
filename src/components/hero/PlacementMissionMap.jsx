import { motion } from 'framer-motion';
import { Target, Terminal, Code2, FileCheck2, Award, CheckCircle2, ChevronRight, Zap, Sparkles } from 'lucide-react';

export default function PlacementMissionMap({ targetState, onSelectStage }) {
  const { company, pkg, language, level } = targetState;

  // Realistic deterministic stage calibration
  const stages = [
    {
      id: 'target',
      phase: '01',
      title: 'TARGET',
      name: `${company} (${pkg})`,
      detail: `${level} • ${language} Track`,
      progress: 100,
      status: 'Target Configured',
      icon: Target,
      accent: '#FACC15',
    },
    {
      id: 'foundation',
      phase: '02',
      title: 'FOUNDATION',
      name: 'Aptitude & Core CS',
      detail: 'Quants, DBMS, OS, Networks',
      progress: 82,
      status: '82% Completed',
      icon: Terminal,
      accent: '#7E3AF2',
    },
    {
      id: 'dsa',
      phase: '03',
      title: 'DSA & CODING',
      name: `${language} Problem Sets`,
      detail: 'Trees, Graphs, DP & Matrix',
      progress: 74,
      status: '74% Solved',
      icon: Code2,
      accent: '#38BDF8',
    },
    {
      id: 'mock',
      phase: '04',
      title: 'MOCK OA',
      name: `${company} Timed Simulator`,
      detail: 'Proctored Assessment Drills',
      progress: 48,
      status: '48% Ready',
      icon: FileCheck2,
      accent: '#F59E0B',
    },
    {
      id: 'interview',
      phase: '05',
      title: 'INTERVIEW',
      name: 'Tech & Bar Raiser',
      detail: 'Machine Coding & STAR Method',
      progress: 31,
      status: '31% Prepped',
      icon: Sparkles,
      accent: '#EC4899',
    },
    {
      id: 'ready',
      phase: '06',
      title: 'PLACEMENT READY',
      name: 'Verification Benchmark',
      detail: 'Ready for Campus Hiring Drive',
      progress: 74,
      status: '74% Overall Score',
      icon: Award,
      accent: '#10B981',
    }
  ];

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Editorial glowing border frame */}
      <div className="tech-card rounded-2xl p-5 sm:p-6 border border-white/10 shadow-editorial">
        
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-dkoder-yellow animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-white">
              YOUR PLACEMENT MISSION MAP
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-dkoder-yellow/10 text-dkoder-yellow border border-dkoder-yellow/20">
            <Zap className="w-3 h-3 text-dkoder-yellow" />
            <span>74% Overall Readiness</span>
          </div>
        </div>

        {/* 6 Connected Sequential Pipeline Steps */}
        <div className="space-y-2.5 relative">
          {/* Vertical connecting pathway line */}
          <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-dkoder-yellow via-dkoder-purple to-emerald-400 opacity-30 z-0" />

          {stages.map((stage, idx) => {
            const Icon = stage.icon;

            return (
              <motion.div
                key={stage.id}
                layout
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: idx * 0.04 }}
                onClick={() => onSelectStage && onSelectStage(stage.id)}
                className="relative z-10 p-3 rounded-xl bg-[#161922] hover:bg-[#1E222D] border border-white/[0.06] hover:border-dkoder-yellow/40 transition-all cursor-pointer group shadow-sm flex items-center justify-between gap-3"
              >
                {/* Left: Icon & Stage Details */}
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border"
                    style={{
                      backgroundColor: `${stage.accent}15`,
                      borderColor: `${stage.accent}40`,
                    }}
                  >
                    <Icon className="w-4 h-4" style={{ color: stage.accent }} />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase text-slate-400">
                        {stage.phase} {stage.title}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-display font-bold text-white truncate group-hover:text-dkoder-yellow transition-colors">
                      {stage.name}
                    </p>
                    <span className="text-[10px] font-mono text-slate-400 block -mt-0.5 truncate">
                      {stage.detail}
                    </span>
                  </div>
                </div>

                {/* Right: Progress Pill & Chevron */}
                <div className="flex items-center gap-2 shrink-0">
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-white">
                      {stage.progress}%
                    </span>
                    <div className="w-16 h-1.5 bg-white/[0.08] rounded-full overflow-hidden mt-0.5">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${stage.progress}%`,
                          backgroundColor: stage.accent,
                        }}
                      />
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-dkoder-yellow group-hover:translate-x-0.5 transition-all" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer Mission Summary */}
        <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span>Priority Focus: <strong className="text-white">Mock Assessments (48%)</strong></span>
          <span className="text-dkoder-yellow">Next: Complete Arrays ➔</span>
        </div>
      </div>
    </div>
  );
}
