import { motion } from 'framer-motion';
import { Target, BookOpen, Code2, CheckCircle2, Award, ArrowDown, ChevronRight, Zap } from 'lucide-react';

export default function PlacementJourneyVisualizer({ targetState, onExploreStage }) {
  const { company, pkg, language, level } = targetState;

  const stages = [
    {
      id: 'target',
      phase: '01',
      title: 'TARGET',
      badge: company,
      sub: `${pkg} • SDE Tier`,
      icon: Target,
      accent: '#FACC15',
      activeText: `Targeting ${company}`
    },
    {
      id: 'prep',
      phase: '02',
      title: 'PREP',
      badge: `${level} ${language}`,
      sub: 'Core DSA & Algorithms',
      icon: BookOpen,
      accent: '#7E3AF2',
      activeText: `${language} Fundamentals`
    },
    {
      id: 'practice',
      phase: '03',
      title: 'PRACTICE',
      badge: `${company} OA Questions`,
      sub: 'In-Browser Sandbox Drills',
      icon: Code2,
      accent: '#38BDF8',
      activeText: 'Timed Problem Sprints'
    },
    {
      id: 'assess',
      phase: '04',
      title: 'ASSESS',
      badge: 'Proctored Mock OA',
      sub: 'Sectional Cutoff Simulator',
      icon: CheckCircle2,
      accent: '#10B981',
      activeText: 'Company Test Simulation'
    },
    {
      id: 'ready',
      phase: '05',
      title: 'READY',
      badge: 'Placement Cleared',
      sub: 'Technical & Bar Raiser Prep',
      icon: Award,
      accent: '#F59E0B',
      activeText: 'Interview Verification'
    }
  ];

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Decorative backdrop glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-dkoder-yellow/10 via-dkoder-purple/20 to-dkoder-yellow/5 rounded-3xl blur-xl opacity-70" />

      {/* Main Layered Interactive Terminal Card */}
      <div className="relative tech-card rounded-2xl p-5 sm:p-6 border border-white/10 shadow-2xl">
        {/* Terminal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-white">
              YOUR PREP PATH
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-mono text-dkoder-yellow bg-dkoder-yellow/10 px-2.5 py-0.5 rounded border border-dkoder-yellow/20">
            <Zap className="w-3 h-3 text-dkoder-yellow" />
            <span>Active Pipeline</span>
          </div>
        </div>

        {/* 5 Connected Step Pipeline Nodes */}
        <div className="space-y-3 relative">
          {/* Subtle vertical connector guide line */}
          <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-white/[0.08] z-0" />

          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            const isLast = idx === stages.length - 1;

            return (
              <motion.div
                key={stage.id}
                layout
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: idx * 0.05 }}
                onClick={() => onExploreStage && onExploreStage(stage.id)}
                className="relative z-10 flex items-center justify-between p-3 rounded-xl bg-[#161922] hover:bg-[#1E222D] border border-white/[0.06] hover:border-dkoder-yellow/40 transition-all cursor-pointer group shadow-sm"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Step Icon Badge */}
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border"
                    style={{
                      backgroundColor: `${stage.accent}15`,
                      borderColor: `${stage.accent}40`,
                    }}
                  >
                    <Icon className="w-4 h-4" style={{ color: stage.accent }} />
                  </div>

                  {/* Step Information */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase text-slate-400">
                        {stage.phase} {stage.title}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-display font-bold text-white truncate group-hover:text-dkoder-yellow transition-colors">
                      {stage.badge}
                    </p>
                    <span className="text-[11px] text-slate-400 block -mt-0.5 truncate">
                      {stage.sub}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  <span className="hidden sm:inline-block text-[10px] font-mono text-slate-500 group-hover:text-slate-300 transition-colors">
                    View
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-dkoder-yellow group-hover:translate-x-0.5 transition-all" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer Telemetry */}
        <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span>Target Accuracy: <strong className="text-white">85%+</strong></span>
          <span className="text-dkoder-yellow">Est. 4–6 Weeks to OA</span>
        </div>
      </div>
    </div>
  );
}
