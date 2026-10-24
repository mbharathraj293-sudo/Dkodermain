import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckSquare, Code2, Timer, BookOpen, BarChart3, Clock, Award, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { learningModules } from '../../data/learningModules';

const ICONS = {
  CheckSquare,
  Code2,
  Timer,
  BookOpen,
  BarChart3
};

export default function LearningModules({ onSelectModuleAction }) {
  const [selectedModuleId, setSelectedModuleId] = useState(learningModules[0].id);
  const activeModule = learningModules.find(m => m.id === selectedModuleId) || learningModules[0];
  const ActiveIcon = ICONS[activeModule.icon] || CheckSquare;

  return (
    <section id="learning-modules" className="relative py-24 sm:py-28 bg-[#0A0C10] overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="COMPREHENSIVE CURRICULUM"
          title="EVERYTHING YOU NEED TO"
          highlight="GET READY"
          subtitle="Five integrated modules eliminating preparation gaps across cognitive screening, technical OA, core CS, and mock pressures."
        />

        {/* 5 Module Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
          {learningModules.map((mod) => {
            const isSelected = mod.id === selectedModuleId;
            const Icon = ICONS[mod.icon] || CheckSquare;

            return (
              <button
                key={mod.id}
                type="button"
                onClick={() => setSelectedModuleId(mod.id)}
                className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-[#1E222D] border-dkoder-yellow text-white shadow-dkoder-yellow scale-[1.02]'
                    : 'bg-[#12151D] border-white/[0.06] text-slate-400 hover:text-white hover:bg-[#181C26]'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono font-bold uppercase text-dkoder-yellow">
                    MODULE {mod.step}
                  </span>
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center border"
                    style={{
                      backgroundColor: `${mod.accentColor}15`,
                      borderColor: `${mod.accentColor}40`,
                    }}
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color: mod.accentColor }} />
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-display font-bold text-white mb-0.5">
                    {mod.title}
                  </h4>
                  <span className="text-[10px] font-mono text-slate-500 block truncate">
                    {mod.category}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Module Deep-Dive Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeModule.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="tech-card rounded-2xl p-6 sm:p-10 border border-white/10 shadow-editorial"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Metadata & What it Helps With (5 Cols) */}
              <div className="lg:col-span-5 space-y-5">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-dkoder-yellow/10 text-dkoder-yellow border border-dkoder-yellow/20">
                      MODULE {activeModule.step} • {activeModule.category}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {activeModule.coverage}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                    {activeModule.title}
                  </h3>
                  <p className="text-sm text-slate-300 mt-1">
                    {activeModule.subtitle}
                  </p>
                </div>

                {/* What it Helps With Callout Box */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-[#161922] to-[#1E222D] border border-white/[0.08] space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-dkoder-yellow font-bold block">
                    What This Helps With:
                  </span>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {activeModule.helpsWith}
                  </p>
                </div>

                {/* Difficulty & Time Telemetry */}
                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-[#161922] border border-white/[0.06]">
                    <span className="text-slate-500 text-[10px] block mb-0.5">Difficulty:</span>
                    <span className="text-white font-bold">{activeModule.difficulty}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#161922] border border-white/[0.06]">
                    <span className="text-slate-500 text-[10px] block mb-0.5">Estimated Duration:</span>
                    <span className="text-white font-bold">{activeModule.estimatedTime}</span>
                  </div>
                </div>

                {/* Next Action Action Button */}
                <button
                  type="button"
                  onClick={() => {
                    const targets = {
                      'coding-practice': '#practice-code',
                      'mock-exams': '#filter-future',
                      'aptitude-mcq': '#your-prep-glance',
                      'courses-theory': '#career-tracks',
                      'progress-analytics': '#your-prep-glance'
                    };
                    const el = document.querySelector(targets[activeModule.id] || '#practice-code');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-3 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-dkoder-yellow text-black hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2 shadow-dkoder-yellow cursor-pointer"
                >
                  <span>{activeModule.nextAction}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Right Column: Detailed Topic Submodules (7 Cols) */}
              <div className="lg:col-span-7 space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block pb-1">
                  Core Topic Breakdowns ({activeModule.keyTopics.length} Focus Disciplines)
                </span>

                <div className="space-y-2.5">
                  {activeModule.keyTopics.map((topic, tIdx) => (
                    <div
                      key={tIdx}
                      className="p-4 rounded-xl bg-[#161922] hover:bg-[#1E222D] border border-white/[0.06] hover:border-dkoder-yellow/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <h5 className="text-sm font-semibold text-white group-hover:text-dkoder-yellow transition-colors">
                            {topic.name}
                          </h5>
                        </div>
                        <p className="text-xs text-slate-400 pl-6">
                          {topic.desc}
                        </p>
                      </div>

                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-white/[0.05] text-slate-300 border border-white/[0.08] shrink-0 self-start sm:self-auto">
                        {topic.count}
                      </span>
                    </div>
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
