import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Target, Sparkles, ArrowRight, RotateCcw, Share2, Check, CheckCircle2, Clock, Award, Play } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import MagneticButton from '../ui/MagneticButton';
import { generatePlacementPath } from '../../utils/recommendations';

const COMPANIES = ['Amazon', 'Google', 'Microsoft', 'Zoho', 'TCS', 'Flipkart'];
const PACKAGES = ['3–6 LPA', '6–10 LPA', '10–20 LPA', '20–40 LPA'];
const LANGUAGES = ['Java', 'Python', 'C++', 'JavaScript', 'SQL'];
const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];
const GOALS = [
  'Full-Time SDE-1',
  'Tier-1 Super Dream (20+ LPA)',
  'Service to Product Switch',
  'Summer 2026 Internship'
];

export default function PlacementPathfinder() {
  const [company, setCompany] = useState('Amazon');
  const [pkg, setPkg] = useState('20–40 LPA');
  const [language, setLanguage] = useState('Java');
  const [level, setLevel] = useState('Intermediate');
  const [goal, setGoal] = useState('Full-Time SDE-1');
  const [isGenerated, setIsGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  const path = generatePlacementPath({ company, pkg, language, level, goal });

  const handleGenerate = () => {
    setIsGenerated(true);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#FACC15', '#7E3AF2', '#38BDF8', '#FFFFFF']
      });
    } catch {
      // safe fallback
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="pathfinder" className="relative py-24 sm:py-32 bg-[#0F1117] border-y border-white/[0.06] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[500px] bg-dkoder-yellow/5 blur-[160px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="SIGNATURE ENGINE"
          title="FIND YOUR BEST"
          highlight="PREP PATH"
          subtitle="Configure your target parameters to synthesize an actionable 6-step recruitment pipeline with exact question targets and timeline benchmarks."
        />

        {/* Pathfinder Configurator Card */}
        <div className="tech-card rounded-2xl p-6 sm:p-10 border border-white/10 shadow-editorial mb-10 space-y-8">
          
          {/* Target Company Selector */}
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-dkoder-yellow block mb-2 font-bold">
              01 • Target Company:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {COMPANIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    setCompany(c);
                    setIsGenerated(false);
                  }}
                  className={`p-3 rounded-xl border text-center font-display font-bold text-sm transition-all cursor-pointer ${
                    company === c
                      ? 'bg-[#1E222D] border-dkoder-yellow text-white shadow-dkoder-yellow'
                      : 'bg-[#161922] border-white/[0.06] text-slate-300 hover:bg-[#1E222D]'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Package and Language Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2 font-bold">
                02 • Target Package Tier:
              </span>
              <div className="flex flex-wrap gap-2">
                {PACKAGES.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => {
                      setPkg(p);
                      setIsGenerated(false);
                    }}
                    className={`px-3.5 py-2 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                      pkg === p
                        ? 'bg-emerald-400 text-black font-bold shadow-sm'
                        : 'bg-[#161922] border-white/[0.06] text-slate-300 hover:bg-[#1E222D]'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2 font-bold">
                03 • Primary Coding Language:
              </span>
              <div className="flex flex-wrap gap-2">
                {LANGUAGES.map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => {
                      setLanguage(l);
                      setIsGenerated(false);
                    }}
                    className={`px-3.5 py-2 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                      language === l
                        ? 'bg-purple-500 text-white font-bold shadow-dkoder-purple'
                        : 'bg-[#161922] border-white/[0.06] text-slate-300 hover:bg-[#1E222D]'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Experience Level & Goal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2 font-bold">
                04 • Current Preparation Level:
              </span>
              <div className="flex flex-wrap gap-2">
                {LEVELS.map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => {
                      setLevel(lvl);
                      setIsGenerated(false);
                    }}
                    className={`px-3.5 py-2 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                      level === lvl
                        ? 'bg-sky-400 text-black font-bold shadow-sm'
                        : 'bg-[#161922] border-white/[0.06] text-slate-300 hover:bg-[#1E222D]'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2 font-bold">
                05 • Primary Objective:
              </span>
              <div className="flex flex-wrap gap-2">
                {GOALS.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => {
                      setGoal(g);
                      setIsGenerated(false);
                    }}
                    className={`px-3.5 py-2 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                      goal === g
                        ? 'bg-amber-400 text-black font-bold shadow-sm'
                        : 'bg-[#161922] border-white/[0.06] text-slate-300 hover:bg-[#1E222D]'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Generate Button Row */}
          <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs font-mono text-slate-400">
              Target: <strong className="text-white">{company}</strong> • <strong className="text-emerald-400">{pkg}</strong> • <strong className="text-purple-400">{language}</strong>
            </div>

            <div className="flex items-center gap-3">
              {isGenerated && (
                <button
                  type="button"
                  onClick={() => setIsGenerated(false)}
                  className="px-3.5 py-2 rounded-xl border border-white/10 text-xs font-mono text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Parameters</span>
                </button>
              )}

              <MagneticButton
                variant="primary"
                onClick={handleGenerate}
                className="px-6 py-3 rounded-xl font-mono font-bold text-xs uppercase tracking-wider text-black flex items-center gap-2 shadow-dkoder-yellow"
                ariaLabel="Generate Placement Preparation Pipeline"
              >
                <Sparkles className="w-4 h-4" />
                <span>GENERATE PREP PATH</span>
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Generated Custom Pipeline Showcase */}
        <AnimatePresence>
          {isGenerated && (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 25 }}
              transition={{ duration: 0.35 }}
              className="tech-card rounded-2xl p-6 sm:p-10 border border-dkoder-yellow/50 shadow-dkoder-yellow space-y-8"
            >
              {/* Header: Company Summary */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dkoder-yellow/10 border border-dkoder-yellow/30 text-dkoder-yellow text-xs font-mono mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>SYNTHESIZED RECRUITMENT PATHWAY</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                    {company} Placement Roadmap ({pkg})
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-mono mt-1">
                    Language: <span className="text-white font-bold">{language}</span> • Level: <span className="text-white font-bold">{level}</span> • Est. Duration: <span className="text-dkoder-yellow font-bold">{path.estimatedPrepTime}</span>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="self-start lg:self-auto px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-200 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-dkoder-yellow" />}
                  <span>{copied ? 'Roadmap Link Copied!' : 'Share Pathway'}</span>
                </button>
              </div>

              {/* 6 Step Progression Nodes */}
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                  Connected Progression Milestones
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
                  {path.steps.map((step, sIdx) => (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: sIdx * 0.06 }}
                      className="p-4 rounded-xl bg-[#161922] border border-white/[0.06] hover:border-dkoder-yellow/30 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-mono text-dkoder-yellow font-bold">
                            {step.stage}
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: step.highlightColor }} />
                        </div>

                        <h5 className="text-xs font-bold text-white mb-1.5">
                          {step.title}
                        </h5>

                        <p className="text-[11px] text-slate-300 leading-snug">
                          {step.detail}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-white/[0.04] mt-3">
                        <span className="text-[9px] font-mono text-slate-400 block uppercase">
                          Milestone Status:
                        </span>
                        <span className="text-[10px] font-mono font-semibold text-white">
                          {step.status}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Next Best Action Callout */}
              <div className="p-5 rounded-xl bg-gradient-to-r from-[#161922] to-[#1E222D] border border-dkoder-yellow/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono uppercase text-dkoder-yellow font-bold block mb-1">
                    Immediate Action Step 01:
                  </span>
                  <p className="text-sm font-semibold text-white">
                    {path.nextBestAction}
                  </p>
                </div>

                <a
                  href="#practice-code"
                  className="px-5 py-2.5 rounded-xl text-xs font-mono font-bold uppercase bg-dkoder-yellow text-black hover:bg-yellow-400 transition-colors flex items-center justify-center gap-1.5 shadow-dkoder-yellow shrink-0 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-black" />
                  <span>Launch Practice Arena</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
