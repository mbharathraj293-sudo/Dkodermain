import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, GraduationCap, Building2, CheckCircle2, ArrowRight, ShieldCheck, BarChart2 } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { campusPerspectives } from '../../data/campusPerspectives';

export default function CampusPerspectives() {
  const [activeTab, setActiveTab] = useState('student'); // 'student', 'hod', 'placement'
  const current = campusPerspectives[activeTab];

  const tabs = [
    { id: 'student', label: 'For Students', icon: User, desc: 'Practice & Placement Readiness' },
    { id: 'hod', label: 'For HODs & Faculty', icon: GraduationCap, desc: 'Batch Telemetry & Academic Interventions' },
    { id: 'placement', label: 'For Placement Cells (T&P)', icon: Building2, desc: 'Corporate Hiring & Shortlisting Automation' },
  ];

  return (
    <section id="campus-perspectives" className="relative py-24 sm:py-28 bg-[#0F1117] border-y border-white/[0.06] overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="INSTITUTIONAL ECOSYSTEM"
          title="BUILT FOR STUDENTS."
          highlight="POWERED FOR CAMPUSES."
          subtitle="Explore how DKoder empowers learners while providing academic leadership and placement cells with real-time hiring intelligence."
        />

        {/* 3-Perspective Switcher Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
          {tabs.map((tab) => {
            const isSelected = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`w-full sm:w-auto flex items-center gap-2.5 px-5 py-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#1E222D] border-dkoder-yellow text-white shadow-dkoder-yellow scale-[1.02]'
                    : 'bg-[#12151D] border-white/[0.06] text-slate-400 hover:text-white hover:bg-[#161922]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-dkoder-yellow' : 'text-slate-400'}`} />
                <div className="text-left">
                  <span>{tab.label}</span>
                  <span className="text-[10px] font-mono text-slate-500 block font-normal sm:hidden">
                    {tab.desc}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Perspective Showcase Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="tech-card rounded-2xl p-6 sm:p-10 border border-white/10 shadow-editorial space-y-8"
          >
            {/* Header Description */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-dkoder-yellow block mb-1">
                  {current.title}
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                  {current.tagline}
                </h3>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 shrink-0">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Live Campus Telemetry Active</span>
              </div>
            </div>

            {/* 4 Metric Telemetry Counters */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {current.metrics.map((metric, i) => (
                <div key={i} className="p-4 rounded-xl bg-[#161922] border border-white/[0.06] space-y-1">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block truncate">
                    {metric.label}
                  </span>
                  <p className="text-xl sm:text-2xl font-display font-extrabold text-white">
                    {metric.value}
                  </p>
                  <span className="text-[11px] font-mono text-slate-500 block truncate">
                    {metric.sub}
                  </span>
                </div>
              ))}
            </div>

            {/* 4 Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {current.features.map((feat, fIdx) => (
                <div key={fIdx} className="p-5 rounded-xl bg-[#161922] border border-white/[0.06] space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-dkoder-yellow shrink-0" />
                    <h4 className="text-sm font-semibold text-white">
                      {feat.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed pl-6">
                    {feat.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Footer Institutional Assurance */}
            <div className="pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
              <span>Demonstration prototype calibrating campus placement data. Zero mock claims on real university figures.</span>
              <a href="#pathfinder" className="text-dkoder-yellow hover:text-white transition-colors flex items-center gap-1 font-bold">
                <span>Configure Student Pathway</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
