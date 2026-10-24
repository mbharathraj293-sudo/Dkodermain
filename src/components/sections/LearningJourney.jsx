import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, BookOpen, Code2, Layers, Trophy, CheckCircle2, Clock, ArrowRight, Sparkles } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { learningStages } from '../../data/courses';

const ICONS = {
  Compass,
  BookOpen,
  Code2,
  Layers,
  Trophy
};

export default function LearningJourney({ onOpenPathfinder }) {
  const [activeStep, setActiveStep] = useState(0);
  const currentStage = learningStages[activeStep];
  const StageIcon = ICONS[currentStage.icon] || BookOpen;

  return (
    <section id="learn" className="relative py-24 sm:py-32 bg-dkoder-darker overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/2 left-0 w-96 h-96 bg-dkoder-purple-900/10 blur-[130px] rounded-full" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-80 h-80 bg-dkoder-yellow/5 blur-[120px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="01 • LEARN & MASTER"
          title="YOUR LEARNING"
          highlight="JOURNEY"
          subtitle="Forget disconnected tutorials. Progress step-by-step through a structured trajectory built for competitive excellence."
        />

        {/* Interactive Progress Line & Stage Selectors */}
        <div className="mb-12">
          {/* Horizontal Stepper Bar */}
          <div className="relative">
            {/* Background connecting bar */}
            <div className="hidden md:block absolute top-1/2 left-8 right-8 h-1 -translate-y-1/2 bg-white/[0.08] z-0 rounded-full" />
            {/* Active connecting bar */}
            <motion.div
              className="hidden md:block absolute top-1/2 left-8 h-1 -translate-y-1/2 bg-gradient-to-r from-dkoder-yellow via-dkoder-purple-400 to-dkoder-yellow rounded-full z-0 transition-all duration-500"
              style={{
                width: `${(activeStep / (learningStages.length - 1)) * 88}%`,
              }}
            />

            {/* Stage Steps Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 relative z-10">
              {learningStages.map((stage, idx) => {
                const isActive = idx === activeStep;
                const isCompleted = idx < activeStep;
                const IconComponent = ICONS[stage.icon] || BookOpen;

                return (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={() => setActiveStep(idx)}
                    className={`flex flex-col items-center p-3 sm:p-4 rounded-2xl border transition-all duration-300 text-center ${
                      isActive
                        ? 'bg-dkoder-purple-900/90 border-dkoder-yellow shadow-glow-yellow scale-105'
                        : isCompleted
                        ? 'bg-dkoder-card/80 border-dkoder-yellow/30 text-slate-300 hover:bg-white/[0.06]'
                        : 'bg-dkoder-card/40 border-white/[0.06] text-slate-400 hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2.5 transition-colors ${
                      isActive
                        ? 'bg-dkoder-yellow text-black'
                        : isCompleted
                        ? 'bg-dkoder-purple-800 text-dkoder-yellow'
                        : 'bg-white/[0.05] text-slate-400'
                    }`}>
                      <IconComponent className="w-5 h-5" />
                    </div>

                    <span className="font-mono text-xs font-bold tracking-widest text-dkoder-yellow">
                      {stage.step}
                    </span>
                    <span className="text-xs sm:text-sm font-display font-bold text-white mt-0.5">
                      {stage.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Detailed Stage Showcase Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStage.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="glass-card rounded-2xl p-6 sm:p-8 md:p-10 border border-white/10 shadow-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Stage Overview */}
              <div className="lg:col-span-5 space-y-5">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-dkoder-yellow/10 text-dkoder-yellow border border-dkoder-yellow/20">
                    STAGE {currentStage.step} OF 05
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {currentStage.stats}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-dkoder-yellow/10 border border-dkoder-yellow/30 text-dkoder-yellow">
                    <StageIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                      {currentStage.title}
                    </h3>
                    <p className="text-sm font-medium text-dkoder-yellow">
                      {currentStage.subtitle}
                    </p>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {currentStage.description}
                </p>

                {/* Tangible Deliverable Box */}
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                      Target Milestone Deliverable
                    </span>
                    <span className="text-sm font-semibold text-white">
                      {currentStage.deliverable}
                    </span>
                  </div>
                </div>

                {/* Pathfinder trigger */}
                <button
                  type="button"
                  onClick={onOpenPathfinder}
                  className="inline-flex items-center gap-2 text-xs font-mono text-dkoder-yellow hover:text-white transition-colors pt-2 group"
                >
                  <Sparkles className="w-3.5 h-3.5 text-dkoder-yellow" />
                  <span>Customize this stage in Pathfinder</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Right Column: Interactive Modules Breakdown */}
              <div className="lg:col-span-7 space-y-4">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center justify-between">
                  <span>Core Curriculum Modules</span>
                  <span className="text-dkoder-yellow">Sprint Ready</span>
                </h4>

                <div className="space-y-3">
                  {currentStage.modules.map((mod, modIdx) => (
                    <motion.div
                      key={modIdx}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: modIdx * 0.1 }}
                      className="p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-dkoder-yellow/30 transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-dkoder-yellow" />
                          <h5 className="text-sm sm:text-base font-medium text-white group-hover:text-dkoder-yellow transition-colors">
                            {mod.name}
                          </h5>
                        </div>
                        <div className="flex flex-wrap items-center gap-1.5 pl-4">
                          {mod.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.05] text-slate-400"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                        <div className="flex items-center gap-1 text-xs font-mono text-slate-400">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{mod.duration}</span>
                        </div>
                        <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-dkoder-yellow/10 text-dkoder-yellow border border-dkoder-yellow/20">
                          Start Lab
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
