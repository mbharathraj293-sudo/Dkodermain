import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight, RotateCcw, Check, Share2, Compass, Award, Calendar, ExternalLink } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import MagneticButton from '../ui/MagneticButton';
import { generatePathRecommendations } from '../../utils/recommendations';

const INTERESTS = [
  { id: 'AI', label: 'Artificial Intelligence', sub: 'LLMs, Agents & Vision', icon: '⚡' },
  { id: 'WEB', label: 'Web & Spatial 3D', sub: 'Three.js, WebGPU & React', icon: '🌐' },
  { id: 'DATA', label: 'Data Science & Big Data', sub: 'Pipelines & Lakehouses', icon: '📊' },
  { id: 'IOT', label: 'IoT & Telemetry', sub: 'ESP32 & Edge Sensors', icon: '📡' },
  { id: 'ROBOTICS', label: 'Autonomous Robotics', sub: 'ROS2 & Kinematics', icon: '🤖' },
  { id: 'CYBERSECURITY', label: 'Cyber Defense', sub: 'eBPF & Pen-testing', icon: '🛡️' },
];

const SKILL_LEVELS = [
  { id: 'BEGINNER', label: 'Beginner', sub: 'Foundational concepts & syntax' },
  { id: 'INTERMEDIATE', label: 'Intermediate', sub: 'Production apps & APIs shipped' },
  { id: 'ADVANCED', label: 'Advanced', sub: 'Distributed architecture & low-level internals' },
];

const GOALS = [
  { id: 'LEARN', label: 'Deep Conceptual Mastery', sub: 'Build unbreakable theoretical foundations' },
  { id: 'BUILD', label: 'Ship Production Software', sub: 'Deploy real-world open source projects' },
  { id: 'HACKATHON', label: 'Win Global Hackathons', sub: 'Compete in high-stakes bounties' },
  { id: 'CAREER', label: 'Land Elite Engineering Role', sub: 'Accelerate placement & fellowships' },
];

export default function Pathfinder() {
  const [interest, setInterest] = useState('AI');
  const [skill, setSkill] = useState('INTERMEDIATE');
  const [goal, setGoal] = useState('HACKATHON');
  const [isGenerated, setIsGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  const recommendation = generatePathRecommendations(interest, skill, goal);

  const handleGenerate = () => {
    setIsGenerated(true);

    // Fire celebratory confetti burst
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#FACC15', '#A855F7', '#38BDF8', '#FFFFFF']
      });
    } catch {
      // safe fallback if canvas-confetti has restrictions
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="pathfinder" className="relative py-24 sm:py-32 bg-dkoder-darker overflow-hidden">
      {/* Background ambient radial lighting */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-dkoder-purple-900/15 blur-[160px] rounded-full" />
      <div className="pointer-events-none absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-dkoder-yellow/5 blur-[130px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="06 • SIGNATURE ENGINE"
          title="FIND YOUR DKODER"
          highlight="PATH"
          subtitle="Configure your engineering preferences and generate a personalized 7-step roadmap from your current status to career breakthrough."
        />

        {/* Pathfinder Selection Workspace */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl mb-12">
          
          {/* Question 1: Domain Interest */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-full bg-dkoder-yellow text-black font-mono font-bold text-xs flex items-center justify-center">
                1
              </span>
              <h3 className="text-base sm:text-lg font-display font-bold text-white">
                What domain are you passionate about?
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {INTERESTS.map((item) => {
                const isSelected = interest === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setInterest(item.id);
                      setIsGenerated(false);
                    }}
                    className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all duration-200 ${
                      isSelected
                        ? 'bg-dkoder-purple-900/80 border-dkoder-yellow shadow-glow-yellow scale-102'
                        : 'bg-white/[0.03] border-white/10 text-slate-300 hover:bg-white/[0.06]'
                    }`}
                  >
                    <span className="text-xl mb-2">{item.icon}</span>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white mb-0.5">{item.label}</h4>
                      <p className="text-[10px] text-slate-400 font-mono">{item.sub}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 2: Skill Level */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-full bg-dkoder-yellow text-black font-mono font-bold text-xs flex items-center justify-center">
                2
              </span>
              <h3 className="text-base sm:text-lg font-display font-bold text-white">
                What is your current engineering experience?
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {SKILL_LEVELS.map((item) => {
                const isSelected = skill === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setSkill(item.id);
                      setIsGenerated(false);
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all duration-200 ${
                      isSelected
                        ? 'bg-dkoder-purple-900/80 border-dkoder-yellow shadow-glow-yellow'
                        : 'bg-white/[0.03] border-white/10 text-slate-300 hover:bg-white/[0.06]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold text-white">{item.label}</span>
                      <span className="text-[10px] font-mono text-dkoder-yellow font-bold uppercase">{item.id}</span>
                    </div>
                    <p className="text-xs text-slate-400 font-mono">{item.sub}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 3: Primary Goal */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-full bg-dkoder-yellow text-black font-mono font-bold text-xs flex items-center justify-center">
                3
              </span>
              <h3 className="text-base sm:text-lg font-display font-bold text-white">
                What is your primary ecosystem objective?
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {GOALS.map((item) => {
                const isSelected = goal === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setGoal(item.id);
                      setIsGenerated(false);
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all duration-200 ${
                      isSelected
                        ? 'bg-dkoder-purple-900/80 border-dkoder-yellow shadow-glow-yellow'
                        : 'bg-white/[0.03] border-white/10 text-slate-300 hover:bg-white/[0.06]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold text-white">{item.label}</span>
                    </div>
                    <p className="text-xs text-slate-400 font-mono">{item.sub}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Generate Button Row */}
          <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs font-mono text-slate-400">
              Selection: <span className="text-dkoder-yellow font-bold">{interest}</span> • <span className="text-white">{skill}</span> • <span className="text-dkoder-yellow">{goal}</span>
            </div>

            <div className="flex items-center gap-3">
              {isGenerated && (
                <button
                  type="button"
                  onClick={() => setIsGenerated(false)}
                  className="px-4 py-2.5 rounded-xl border border-white/10 text-xs font-mono text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Options</span>
                </button>
              )}

              <MagneticButton
                variant="primary"
                onClick={handleGenerate}
                className="px-6 py-3 rounded-xl font-bold text-xs font-mono uppercase tracking-wider text-black flex items-center gap-2 shadow-glow-yellow"
                ariaLabel="Generate Custom Roadmap"
              >
                <Compass className="w-4 h-4" />
                <span>GENERATE DKODER PATH</span>
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Generated Interactive Pathway Showcase */}
        <AnimatePresence>
          {isGenerated && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="glass-card rounded-3xl p-6 sm:p-10 border border-dkoder-yellow/50 shadow-glow-yellow space-y-8"
            >
              {/* Roadmap Header Summary */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dkoder-yellow/10 border border-dkoder-yellow/30 text-dkoder-yellow text-xs font-mono mb-2">
                    <Sparkles className="w-3 h-3" />
                    <span>YOUR PERSONALIZED TRAJECTORY</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                    {recommendation.track.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-mono mt-1">
                    Target Role: <span className="text-dkoder-yellow font-semibold">{recommendation.targetRole}</span> • Readiness in <span className="text-white font-semibold">{recommendation.estimatedWeeks}</span>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 text-xs font-mono text-slate-200 flex items-center gap-1.5 transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-dkoder-yellow" />}
                    <span>{copied ? 'Link Copied!' : 'Share Pathway'}</span>
                  </button>
                </div>
              </div>

              {/* Connected Visual Pipeline: YOU -> LEARN -> PRACTICE -> BUILD -> HACKATHON -> PROJECT -> OPPORTUNITY */}
              <div className="relative">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-6">
                  Connected Progression Pipeline (7 Active Milestones)
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-7 gap-3 relative">
                  {recommendation.steps.map((step, sIdx) => (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: sIdx * 0.08 }}
                      className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-dkoder-yellow/40 transition-all flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-mono text-slate-500 font-bold">
                            0{sIdx + 1}
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full bg-dkoder-yellow" />
                        </div>

                        <span className="font-display font-black text-sm text-white block mb-0.5 group-hover:text-dkoder-yellow transition-colors">
                          {step.label}
                        </span>

                        <span className="text-[10px] font-mono font-medium text-dkoder-yellow block mb-2 leading-tight">
                          {step.sublabel}
                        </span>

                        <p className="text-[11px] text-slate-300 leading-snug line-clamp-4">
                          {step.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-white/[0.06] mt-3">
                        <span className="text-[9px] font-mono uppercase text-slate-400 block">
                          Phase Status:
                        </span>
                        <span className="text-[10px] font-mono font-semibold text-white">
                          {step.status}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Recommended Immediate Actions */}
              <div className="pt-6 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                    Step 1: Curriculum Module
                  </span>
                  <p className="text-xs font-bold text-white mb-2">{recommendation.track.primarySkill}</p>
                  <a href="#learn" className="text-xs font-mono text-dkoder-yellow hover:underline flex items-center gap-1">
                    <span>Jump to Learn Modules</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                    Step 2: Recommended Hackathon
                  </span>
                  <p className="text-xs font-bold text-white mb-2">{recommendation.suggestedHackathon}</p>
                  <a href="#hackathons" className="text-xs font-mono text-dkoder-yellow hover:underline flex items-center gap-1">
                    <span>Review Mission Brief</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                    Step 3: Target Role Benchmark
                  </span>
                  <p className="text-xs font-bold text-white mb-2">{recommendation.targetRole}</p>
                  <a href="#tracks" className="text-xs font-mono text-dkoder-yellow hover:underline flex items-center gap-1">
                    <span>Inspect Career Matrix</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
