import { motion } from 'framer-motion';
import { Target, ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';
import PlacementMissionMap from './PlacementMissionMap';
import TargetSelector from './TargetSelector';

export default function HeroPlacement({
  targetState,
  onChangeTarget,
  onStartMission,
  onExplorePaths
}) {
  const { company, pkg, language, level } = targetState;

  return (
    <section id="hero" className="relative pt-28 pb-16 sm:pb-20 overflow-hidden bg-tech-grid">
      {/* Subtle strategic ambient gradients */}
      <div className="pointer-events-none absolute top-12 left-1/4 w-[450px] h-[350px] bg-dkoder-yellow/5 blur-[120px] rounded-full" />
      <div className="pointer-events-none absolute top-20 right-1/4 w-[500px] h-[400px] bg-dkoder-purple/10 blur-[140px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Mobile Dedicated Priority Mission Card (Visible on mobile screens < lg) */}
        <div className="lg:hidden p-4 rounded-xl bg-[#161922] border border-dkoder-yellow/40 space-y-2.5 shadow-editorial">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-dkoder-yellow flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-dkoder-yellow animate-ping" />
              <span>DKODER • YOUR MISSION</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-dkoder-yellow/10 text-dkoder-yellow font-mono text-[11px] font-bold border border-dkoder-yellow/30">
              74% Readiness
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="font-bold text-white bg-white/[0.08] px-2 py-0.5 rounded">{company}</span>
            <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">{pkg}</span>
            <span className="text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">{language}</span>
          </div>

          <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between">
            <span className="text-[11px] font-mono text-slate-400">Next Action:</span>
            <a
              href="#practice-questions"
              className="text-xs font-mono font-bold text-dkoder-yellow hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Solve Array Problems</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Top Split Layout: Editorial Copy (Left) + Interactive Mission Map (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Copy (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Small Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#161922] border border-white/10 text-xs font-mono font-semibold tracking-wider text-dkoder-yellow"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-dkoder-yellow" />
              <span>DKODER • PLACEMENT OS</span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-white leading-[1.08]">
                PREPARE FOR<br />
                <span className="bg-gradient-to-r from-dkoder-yellow via-amber-300 to-yellow-500 bg-clip-text text-transparent">
                  THE ROLE YOU WANT.
                </span>
              </h1>
            </motion.div>

            {/* Supporting Copy */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-300 font-normal max-w-2xl leading-relaxed"
            >
              A smarter placement journey built around your target company, package, skills and preparation level. Build your mission, master curated company OA patterns, and track your readiness percentage in real-time.
            </motion.p>

            {/* Dynamic Active Mission Summary Banner */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="p-3.5 rounded-xl bg-[#161922] border border-dkoder-yellow/30 flex flex-wrap items-center justify-between gap-3 shadow-dkoder-yellow"
            >
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-dkoder-yellow shrink-0" />
                <span className="text-xs font-mono text-slate-400">YOUR MISSION:</span>
                <span className="text-xs font-mono font-bold text-white bg-white/[0.08] px-2 py-0.5 rounded">
                  {company}
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  {pkg}
                </span>
                <span className="text-xs font-mono font-bold text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                  {language}
                </span>
                <span className="text-xs font-mono font-bold text-sky-300 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                  {level}
                </span>
              </div>

              <span className="text-[11px] font-mono text-dkoder-yellow font-semibold">
                74% Readiness
              </span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3.5 pt-1"
            >
              <MagneticButton
                variant="primary"
                onClick={onStartMission}
                className="px-6 py-3.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 text-black shadow-dkoder-yellow"
                ariaLabel="Start Your Placement Mission"
              >
                <span>START YOUR PREP</span>
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>

              <MagneticButton
                variant="secondary"
                onClick={onExplorePaths}
                className="px-6 py-3.5 rounded-xl text-xs font-mono font-semibold text-white flex items-center gap-2"
                ariaLabel="Explore Placement Paths"
              >
                <Target className="w-4 h-4 text-dkoder-yellow" />
                <span>EXPLORE PLACEMENT PATHS</span>
              </MagneticButton>
            </motion.div>

            {/* Key Value Checklist */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-2 flex flex-wrap items-center gap-5 text-xs font-mono text-slate-400"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Company-Specific OA Blueprints</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-dkoder-yellow" />
                <span>Proctored Simulation Environment</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Personalized Readiness Index</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Interactive Placement Mission Map (5 Cols) */}
          <div className="lg:col-span-5">
            <PlacementMissionMap
              targetState={targetState}
              onSelectStage={(stageId) => {
                const el = document.querySelector('#placement-journey');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          </div>

        </div>

        {/* Target Selector Bar ("BUILD YOUR PLACEMENT MISSION") */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <TargetSelector
            targetState={targetState}
            onChangeTarget={onChangeTarget}
            onApplyPath={onExplorePaths}
          />
        </motion.div>
      </div>
    </section>
  );
}
