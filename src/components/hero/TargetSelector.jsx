import { motion } from 'framer-motion';
import { Target, DollarSign, Terminal, Award, Sparkles } from 'lucide-react';

const COMPANIES_LIST = ['Amazon', 'Google', 'Microsoft', 'Zoho', 'TCS', 'Flipkart', 'Infosys', 'Razorpay', 'Accenture'];
const PACKAGES_LIST = ['3–6 LPA', '6–10 LPA', '10–20 LPA', '20–40 LPA'];
const LANGUAGES_LIST = ['Java', 'Python', 'C++', 'JavaScript', 'SQL'];
const LEVELS_LIST = ['Beginner', 'Intermediate', 'Advanced'];

export default function TargetSelector({ targetState, onChangeTarget, onApplyPath }) {
  const { company, pkg, language, level } = targetState;

  return (
    <div className="w-full tech-card rounded-2xl p-4 sm:p-6 border border-white/10 shadow-editorial">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-dkoder-yellow/10 border border-dkoder-yellow/30 flex items-center justify-center">
            <Target className="w-4 h-4 text-dkoder-yellow" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-display font-bold text-white">
              WHAT ARE YOU TARGETING?
            </h3>
            <p className="text-xs text-slate-400">
              Customize your preparation parameters to dynamically reconstruct your placement roadmap.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onApplyPath}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold bg-dkoder-yellow text-black hover:bg-yellow-400 transition-colors shadow-dkoder-yellow shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Apply to Full Roadmap</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Selector 1: Target Company */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono font-semibold uppercase text-slate-400 flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-dkoder-yellow" />
            <span>Target Company</span>
          </label>
          <select
            value={company}
            onChange={(e) => onChangeTarget({ ...targetState, company: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-[#161922] border border-white/10 text-xs sm:text-sm text-white font-medium focus:outline-none focus:border-dkoder-yellow cursor-pointer transition-colors"
          >
            {COMPANIES_LIST.map((comp) => (
              <option key={comp} value={comp} className="bg-[#161922] text-white">
                {comp}
              </option>
            ))}
          </select>
        </div>

        {/* Selector 2: Salary Package */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono font-semibold uppercase text-slate-400 flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
            <span>Target Package</span>
          </label>
          <select
            value={pkg}
            onChange={(e) => onChangeTarget({ ...targetState, pkg: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-[#161922] border border-white/10 text-xs sm:text-sm text-white font-medium focus:outline-none focus:border-dkoder-yellow cursor-pointer transition-colors"
          >
            {PACKAGES_LIST.map((p) => (
              <option key={p} value={p} className="bg-[#161922] text-white">
                {p}
              </option>
            ))}
          </select>
        </div>

        {/* Selector 3: Core Language */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono font-semibold uppercase text-slate-400 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-dkoder-purple-light" />
            <span>Primary Language</span>
          </label>
          <select
            value={language}
            onChange={(e) => onChangeTarget({ ...targetState, language: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-[#161922] border border-white/10 text-xs sm:text-sm text-white font-medium focus:outline-none focus:border-dkoder-yellow cursor-pointer transition-colors"
          >
            {LANGUAGES_LIST.map((lang) => (
              <option key={lang} value={lang} className="bg-[#161922] text-white">
                {lang}
              </option>
            ))}
          </select>
        </div>

        {/* Selector 4: Skill Level */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono font-semibold uppercase text-slate-400 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-sky-400" />
            <span>Current Skill Level</span>
          </label>
          <select
            value={level}
            onChange={(e) => onChangeTarget({ ...targetState, level: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-[#161922] border border-white/10 text-xs sm:text-sm text-white font-medium focus:outline-none focus:border-dkoder-yellow cursor-pointer transition-colors"
          >
            {LEVELS_LIST.map((lvl) => (
              <option key={lvl} value={lvl} className="bg-[#161922] text-white">
                {lvl}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
