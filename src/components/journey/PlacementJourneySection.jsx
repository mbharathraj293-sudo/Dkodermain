import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, BookOpen, Code2, LineChart, Trophy, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

const JOURNEY_STEPS = [
  {
    id: 'target',
    phase: '01',
    name: 'TARGET',
    question: '“What company and package am I targeting?”',
    tagline: 'Lock in your target role, salary bracket, and tech stack',
    desc: 'Stop solving random problems without clear direction. Select whether you are targeting FAANG+ (20-40 LPA), high-growth product startups, or massive IT services drives.',
    icon: Target,
    accent: '#FACC15',
    actions: ['Filter company OA archives', 'Review verified package cutoffs', 'Analyze round structures'],
    metric: '45+ Company Recruitment Matrices'
  },
  {
    id: 'prepare',
    phase: '02',
    name: 'PREPARE',
    question: '“What concepts should I prepare first?”',
    tagline: 'Master core CS foundations without tutorial paralysis',
    desc: 'Direct curriculum sets covering Quantitative Aptitude, Logical Reasoning, Verbal, DBMS, OS, Computer Networks, and Low-Level Object Oriented Design.',
    icon: BookOpen,
    accent: '#7E3AF2',
    actions: ['Aptitude speed shortcuts', 'DBMS indexing & ACID deep-dives', 'Operating system concurrency'],
    metric: '12 Comprehensive Core Modules'
  },
  {
    id: 'practice',
    phase: '03',
    name: 'PRACTICE',
    question: '“What should I practice today?”',
    tagline: 'In-browser code execution with exact company OA test cases',
    desc: 'Pattern-based DSA practice in Python, Java, C++, and SQL with multi-testcase evaluation, execution latency profiling, and memory benchmarks.',
    icon: Code2,
    accent: '#38BDF8',
    actions: ['Arrays & Sliding Window patterns', 'Tree & Graph traversals', 'Dynamic programming formulas'],
    metric: '450+ Company-Tagged Problems'
  },
  {
    id: 'track',
    phase: '04',
    name: 'TRACK',
    question: '“What level am I at right now?”',
    tagline: 'Real-time readiness telemetry and weak-spot remediation',
    desc: 'A transparent Placement Readiness Index (%) that compares your coding speed, accuracy, and mock test scores with historical hiring cutoffs.',
    icon: LineChart,
    accent: '#10B981',
    actions: ['Weak-topic radar heatmaps', 'Speed vs accuracy graphs', 'Campus percentile benchmarks'],
    metric: 'Granular Skill Telemetry'
  },
  {
    id: 'compete',
    phase: '05',
    name: 'COMPETE',
    question: '“How do I prove my skills under pressure?”',
    tagline: 'Collegiate hackathon missions & live proctored mock drives',
    desc: 'Compete in national hackathon sprints for direct interview waivers, campus leaderboard rank, and real-time proctored test simulations.',
    icon: Trophy,
    accent: '#F59E0B',
    actions: ['Full-length timed mock OAs', 'Weekend collegiate sprints', 'Direct recruiter shortlists'],
    metric: '₹3.5L+ Bounties & OA Waivers'
  },
  {
    id: 'ready',
    phase: '06',
    name: 'GET READY',
    question: '“What should I do in my final interview?”',
    tagline: 'Walk into your campus hiring drive completely prepared',
    desc: 'Master the Bar Raiser round, Amazon Leadership Principles, system design trade-offs, and live machine coding presentations.',
    icon: Award,
    accent: '#EC4899',
    actions: ['Machine coding walkthroughs', 'Behavioral STAR rehearsals', 'Verified portfolio proof'],
    metric: 'Placement Clearance Standard'
  }
];

export default function PlacementJourneySection({ onSelectAction }) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = JOURNEY_STEPS[activeStepIndex];
  const ActiveIcon = activeStep.icon;

  return (
    <section id="placement-journey" className="relative py-24 sm:py-28 bg-[#0F1117] border-y border-white/[0.06] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-dkoder-yellow/5 blur-[140px] rounded-full" />
      <div className="pointer-events-none absolute top-1/3 right-1/4 w-96 h-96 bg-dkoder-purple/10 blur-[150px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="THE CORE SYSTEM"
          title="YOUR PLACEMENT"
          highlight="JOURNEY"
          subtitle="A structured, predictable pipeline replacing placement uncertainty with focused daily execution."
        />

        {/* 6-Step Stepper Progress Selector */}
        <div className="mb-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {JOURNEY_STEPS.map((step, idx) => {
              const isActive = idx === activeStepIndex;
              const Icon = step.icon;

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setActiveStepIndex(idx)}
                  className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#1E222D] border-dkoder-yellow text-white shadow-dkoder-yellow scale-[1.02]'
                      : 'bg-[#12151D] border-white/[0.06] text-slate-400 hover:text-white hover:bg-[#181C26]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] font-bold uppercase text-dkoder-yellow">
                      {step.phase}
                    </span>
                    <Icon className="w-4 h-4" style={{ color: step.accent }} />
                  </div>

                  <div>
                    <h4 className="text-xs sm:text-sm font-display font-bold text-white mb-0.5">
                      {step.name}
                    </h4>
                    <p className="text-[10px] text-slate-400 font-mono truncate">
                      {step.metric}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Journey Phase Spotlight Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="tech-card rounded-2xl p-6 sm:p-10 border border-white/10 shadow-editorial"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Core Question & Explanation (7 Cols) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-dkoder-yellow/10 text-dkoder-yellow border border-dkoder-yellow/20">
                    STAGE {activeStep.phase} OF 06
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Placement Methodology
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border"
                    style={{
                      backgroundColor: `${activeStep.accent}15`,
                      borderColor: `${activeStep.accent}40`,
                    }}
                  >
                    <ActiveIcon className="w-6 h-6" style={{ color: activeStep.accent }} />
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                      {activeStep.name}: {activeStep.tagline}
                    </h3>
                    <p className="text-xs sm:text-sm font-mono text-dkoder-yellow font-medium mt-0.5">
                      {activeStep.question}
                    </p>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed pt-1">
                  {activeStep.desc}
                </p>

                <div className="pt-2 flex flex-wrap gap-2">
                  {activeStep.actions.map((act, i) => (
                    <div
                      key={i}
                      className="px-3 py-1 rounded-lg text-xs font-mono bg-white/[0.04] border border-white/[0.08] text-slate-200 flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Key Takeaway Box & CTA (5 Cols) */}
              <div className="lg:col-span-5 bg-[#161922] p-6 rounded-xl border border-white/[0.08] space-y-4">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                  Stage Output & Benchmark
                </span>
                <p className="text-lg font-display font-bold text-white">
                  {activeStep.metric}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Every step is structured so that you never wonder whether you are ready. You see real question numbers, benchmark cutoffs, and your verified progress score.
                </p>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      const targets = {
                        target: '#filter-future',
                        prepare: '#learning-modules',
                        practice: '#practice-code',
                        track: '#your-prep-glance',
                        compete: '#hackathons',
                        ready: '#pathfinder'
                      };
                      const el = document.querySelector(targets[activeStep.id] || '#filter-future');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full py-2.5 rounded-lg text-xs font-mono font-bold uppercase bg-dkoder-yellow text-black hover:bg-yellow-400 transition-colors flex items-center justify-center gap-1.5 shadow-dkoder-yellow"
                  >
                    <span>Explore Stage {activeStep.phase} Modules</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
