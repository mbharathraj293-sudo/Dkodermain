import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Building2, DollarSign, Terminal, Award, Clock, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import Modal from '../ui/Modal';
import { companies, companyTypes, packageTiers, languages, skillLevels, recencyOptions } from '../../data/companies';

export default function FilterYourFuture({ onSelectCompany }) {
  const [selectedType, setSelectedType] = useState('All');
  const [selectedPackage, setSelectedPackage] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedCompanyModal, setSelectedCompanyModal] = useState(null);

  const filteredCompanies = useMemo(() => {
    return companies.filter((comp) => {
      const matchType = selectedType === 'All' || comp.type === selectedType;
      const matchPkg = selectedPackage === 'All' || comp.tier === selectedPackage;
      const matchLang = selectedLanguage === 'All' || comp.languages.includes(selectedLanguage);
      const matchLevel = selectedLevel === 'All' || comp.level === selectedLevel;
      return matchType && matchPkg && matchLang && matchLevel;
    });
  }, [selectedType, selectedPackage, selectedLanguage, selectedLevel]);

  const handleResetFilters = () => {
    setSelectedType('All');
    setSelectedPackage('All');
    setSelectedLanguage('All');
    setSelectedLevel('All');
  };

  return (
    <section id="filter-future" className="relative py-24 sm:py-28 bg-[#0A0C10] overflow-hidden">
      {/* Background subtle radial lighting */}
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 w-[500px] h-[400px] bg-dkoder-yellow/5 blur-[150px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="TARGETED RECRUITMENT"
          title="FILTER YOUR"
          highlight="FUTURE"
          subtitle="Query the placement database by company type, CTC package tier, primary language, and difficulty level."
        />

        {/* Visual Filter Deck Panel */}
        <div className="tech-card rounded-2xl p-5 sm:p-7 border border-white/10 shadow-editorial mb-10 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-dkoder-yellow" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                Interactive Filter Deck
              </span>
            </div>

            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-400 hover:text-white transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset All</span>
            </button>
          </div>

          {/* Row 1: Company Type */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
              Company Category:
            </span>
            <div className="flex flex-wrap gap-2">
              {companyTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedType(type)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    selectedType === type
                      ? 'bg-dkoder-yellow text-black font-bold shadow-dkoder-yellow'
                      : 'bg-[#161922] text-slate-300 hover:bg-[#1E222D] border border-white/[0.06]'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Row 2: Package Tier & Languages (Split) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Package Tier (CTC):
              </span>
              <div className="flex flex-wrap gap-2">
                {packageTiers.map((pkg) => (
                  <button
                    key={pkg}
                    type="button"
                    onClick={() => setSelectedPackage(pkg)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                      selectedPackage === pkg
                        ? 'bg-emerald-400 text-black font-bold shadow-sm'
                        : 'bg-[#161922] text-slate-300 hover:bg-[#1E222D] border border-white/[0.06]'
                    }`}
                  >
                    {pkg}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Primary Language:
              </span>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setSelectedLanguage(lang)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                      selectedLanguage === lang
                        ? 'bg-purple-500 text-white font-bold shadow-dkoder-purple'
                        : 'bg-[#161922] text-slate-300 hover:bg-[#1E222D] border border-white/[0.06]'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Row 3: Skill Level */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
              Skill Level:
            </span>
            <div className="flex flex-wrap gap-2">
              {skillLevels.map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    selectedLevel === lvl
                      ? 'bg-sky-400 text-black font-bold shadow-sm'
                      : 'bg-[#161922] text-slate-300 hover:bg-[#1E222D] border border-white/[0.06]'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Filter Results Status */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span>Matching Preparations:</span>
            <span className="px-2 py-0.5 rounded bg-dkoder-yellow/10 text-dkoder-yellow font-bold border border-dkoder-yellow/20">
              {filteredCompanies.length} Active Tracks
            </span>
          </div>

          <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
            Click any company card for OA breakdown & round intelligence
          </span>
        </div>

        {/* Matching Preparation Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredCompanies.length === 0 ? (
              <div className="col-span-full py-16 text-center tech-card rounded-2xl border border-white/10 p-8">
                <p className="text-base text-slate-300 font-display">No companies matching current filter criteria.</p>
                <p className="text-xs text-slate-500 font-mono mt-1">Try resetting or selecting 'All' to expand recruitment archives.</p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="mt-4 px-4 py-2 rounded-lg text-xs font-mono bg-dkoder-yellow text-black font-bold"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              filteredCompanies.map((comp) => (
                <motion.div
                  key={comp.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setSelectedCompanyModal(comp)}
                  className="tech-card rounded-2xl p-6 border border-white/10 hover:border-dkoder-yellow/40 transition-all cursor-pointer group flex flex-col justify-between shadow-lg"
                >
                  <div>
                    {/* Header: Logo, Name & Type */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl">{comp.logo}</span>
                        <div>
                          <h4 className="text-base font-display font-bold text-white group-hover:text-dkoder-yellow transition-colors">
                            {comp.name}
                          </h4>
                          <span className="text-[10px] font-mono text-slate-400 uppercase">
                            {comp.type}
                          </span>
                        </div>
                      </div>

                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {comp.package}
                      </span>
                    </div>

                    {/* Role & Key Topics */}
                    <p className="text-xs font-semibold text-slate-200 mb-2">
                      {comp.role}
                    </p>

                    <div className="space-y-1 mb-4 bg-white/[0.02] p-2.5 rounded-lg border border-white/[0.04]">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
                        Focus Topics:
                      </span>
                      <p className="text-xs text-slate-300 line-clamp-2">
                        {comp.keyTopics.join(', ')}
                      </p>
                    </div>

                    {/* Languages accepted */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {comp.languages.map((l, i) => (
                        <span key={i} className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] text-slate-300 border border-white/[0.06]">
                          {l}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer: Questions Count & CTA */}
                  <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">
                      <strong className="text-white">{comp.questionsCount}</strong> Questions
                    </span>

                    <span className="text-dkoder-yellow group-hover:translate-x-1 transition-transform flex items-center gap-1 font-semibold">
                      <span>View Prep</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Company Detail Modal */}
      {selectedCompanyModal && (
        <Modal
          isOpen={!!selectedCompanyModal}
          onClose={() => setSelectedCompanyModal(null)}
          title={`${selectedCompanyModal.name} Placement Preparation`}
          subtitle={`${selectedCompanyModal.role} • ${selectedCompanyModal.package} CTC`}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-5">
            {/* Quick Overview Row */}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 grid grid-cols-3 gap-3 text-center">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Package Tier</span>
                <span className="text-base font-bold font-display text-emerald-400">{selectedCompanyModal.package}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Difficulty</span>
                <span className="text-base font-bold font-display text-white">{selectedCompanyModal.difficulty}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 block">OA Cutoff Score</span>
                <span className="text-base font-bold font-display text-dkoder-yellow">{selectedCompanyModal.cutoffScore}</span>
              </div>
            </div>

            {/* Recruitment Rounds */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Recruitment Process & Rounds</h4>
              <div className="space-y-2">
                {selectedCompanyModal.rounds.map((round, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-[#161922] border border-white/[0.06] flex items-center gap-2.5 text-xs text-white">
                    <span className="w-5 h-5 rounded-full bg-dkoder-yellow/20 text-dkoder-yellow font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span>{round}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Interview Topics */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Key Tested Topics</h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedCompanyModal.keyTopics.map((topic, i) => (
                  <span key={i} className="px-3 py-1 rounded-md text-xs font-mono bg-dkoder-yellow/10 text-dkoder-yellow border border-dkoder-yellow/20">
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Sample Question */}
            <div className="p-3.5 rounded-xl bg-[#161922] border border-white/[0.06]">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                Frequent OA Problem Pattern
              </span>
              <p className="text-xs font-mono font-medium text-white">{selectedCompanyModal.sampleQuestion}</p>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">
                {selectedCompanyModal.mockExamsAvailable} Company Mocks Available
              </span>
              <button
                type="button"
                onClick={() => {
                  setSelectedCompanyModal(null);
                  const el = document.querySelector('#practice-code');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase bg-dkoder-yellow text-black hover:bg-yellow-400 shadow-dkoder-yellow"
              >
                Practice Questions Now
              </button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
