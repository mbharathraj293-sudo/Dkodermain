import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BriefcaseBusiness,
  ArrowRight,
  Code2,
  CheckCircle2,
  Sparkles,
  Target,
  Filter,
  RotateCcw,
  Building2,
  TrendingUp,
} from 'lucide-react';
import {
  mainCareerPacks,
  popularCompanyPaths,
  careerFilters,
  careerTracks,
} from '../data/careerTracks';
import { usePlacement } from '../context/PlacementContext';
import Modal from '../components/ui/Modal';
import PageHeader from '../components/ui/PageHeader';
import AuroraCard from '../components/ui/AuroraCard';

export default function CareerPage() {
  const navigate = useNavigate();
  const { trackId } = useParams();
  const [searchParams] = useSearchParams();
  const { readiness, updateTarget } = usePlacement();

  const [activePack, setActivePack] = useState(null);
  const [selectedCompanyPath, setSelectedCompanyPath] = useState(null);

  // Filter States
  const [companyTypeFilter, setCompanyTypeFilter] = useState('All');
  const [salaryFilter, setSalaryFilter] = useState('All');
  const [levelFilter, setLevelFilter] = useState('All');
  const [languageFilter, setLanguageFilter] = useState('All');

  // Sync route param or searchParam with activePack
  useEffect(() => {
    const currentId = trackId || searchParams.get('track');
    if (currentId) {
      const found =
        mainCareerPacks.find((p) => p.id === currentId || p.slug === currentId) ||
        careerTracks.find((t) => t.id === currentId || t.slug === currentId);
      if (found) {
        setActivePack(found);
      }
    } else {
      setActivePack(null);
    }
  }, [trackId, searchParams]);

  const handleOpenPack = (pack) => {
    setActivePack(pack);
    navigate(`/career/${pack.id}`, { replace: false });
  };

  const handleClosePack = () => {
    setActivePack(null);
    navigate('/career', { replace: false });
  };

  const handleResetFilters = () => {
    setCompanyTypeFilter('All');
    setSalaryFilter('All');
    setLevelFilter('All');
    setLanguageFilter('All');
  };

  // 6 Stages Journey Timeline (Section 16 Specification: Foundation → Practice → Company Preparation → Mock Assessment → Interview → Placement Ready)
  // Current stage: Purple, Completed: Yellow, Upcoming: Soft gray
  const journeyStages = [
    { id: 1, name: 'Foundation', status: 'completed', desc: 'Core CS, DSA Basics & Math' },
    { id: 2, name: 'Practice', status: 'completed', desc: 'Algorithmic Drills & Speed' },
    { id: 3, name: 'Company Preparation', status: 'current', desc: 'Target Assessments & Patterns' },
    { id: 4, name: 'Mock Assessment', status: 'upcoming', desc: 'Timed Sectional Simulations' },
    { id: 5, name: 'Interview', status: 'upcoming', desc: 'Technical & System Design' },
    { id: 6, name: 'Placement Ready', status: 'upcoming', desc: 'Verified Assessment Profile' },
  ];

  const [hoveredStage, setHoveredStage] = useState(2); // default to Current Stage (idx 2: COMPANY PREP)

  // Filter logic
  const filteredPacks = mainCareerPacks.filter((pack) => {
    if (companyTypeFilter !== 'All' && pack.companyType !== companyTypeFilter) return false;
    if (salaryFilter !== 'All') {
      if (salaryFilter === '20+ LPA' && pack.salaryTier !== '20+ LPA') return false;
      if (salaryFilter === '3–6 LPA' && pack.salaryTier !== '3–6 LPA') return false;
      if (salaryFilter === '6–10 LPA' && pack.salaryTier !== '6–10 LPA') return false;
      if (salaryFilter === '10–20 LPA' && pack.salaryTier !== '10–20 LPA') return false;
    }
    if (levelFilter !== 'All' && pack.targetLevel !== levelFilter && pack.level !== 'All Levels') {
      return false;
    }
    if (languageFilter !== 'All' && !pack.recommendedLanguages.includes(languageFilter)) {
      return false;
    }
    return true;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 text-left font-sans">
      {/* Page Header standard with BackButton */}
      <PageHeader
        backTo="/dashboard"
        backLabel="Back to Dashboard"
        category="Career Planning"
        title="Career Tracks"
        description="Explore focused preparation paths based on company type and career goals."
        actions={
          <button
            type="button"
            onClick={() => navigate('/mission')}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#5B21B6] text-white hover:bg-[#4C1D95] transition-colors flex items-center gap-2 cursor-pointer shadow-xs active:scale-[0.98]"
          >
            <Target className="w-4 h-4" />
            <span>Configure Target</span>
          </button>
        }
      />

      {/* Section 16: CAREER PATH - YOUR PLACEMENT JOURNEY */}
      <section className="rounded-2xl p-6 sm:p-8 bg-white border border-[#E8E4F0] space-y-6 shadow-xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#E8E4F0]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-sans font-bold uppercase tracking-wider bg-[#EDE9FE] text-[#5B21B6] border border-[#E8E4F0] mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FACC15]" />
              <span>INTERACTIVE CAREER PATH</span>
            </div>
            <h3 className="text-xl font-display font-bold text-[#18152B]">
              YOUR PLACEMENT JOURNEY
            </h3>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 font-medium text-[#18152B]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FACC15] ring-2 ring-[#FEF08A]" />
              Completed
            </span>
            <span className="flex items-center gap-1.5 font-medium text-[#5B21B6]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#5B21B6] ring-2 ring-[#EDE9FE]" />
              Current Stage
            </span>
            <span className="flex items-center gap-1.5 font-medium text-[#6B687A]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E8E4F0]" />
              Upcoming
            </span>
          </div>
        </div>

        {/* Desktop Horizontal Timeline / Mobile Vertical Timeline */}
        <div className="relative pt-4 pb-2">
          {/* Desktop Connecting Line that animates toward hovered stage */}
          <div className="hidden lg:block absolute top-[36px] left-8 right-8 h-1 bg-[#E8E4F0] z-0 rounded-full overflow-hidden">
            <motion.div
              animate={{
                width: `${((hoveredStage + 1) / journeyStages.length) * 100}%`,
              }}
              transition={{ type: 'spring', damping: 24, stiffness: 220 }}
              className="h-full bg-gradient-to-r from-[#FACC15] via-[#5B21B6] to-[#7C3AED]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 relative z-10">
            {journeyStages.map((stage, idx) => {
              const isCompleted = stage.status === 'completed';
              const isCurrent = stage.status === 'current';
              const isHovered = hoveredStage === idx;

              return (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  onMouseEnter={() => setHoveredStage(idx)}
                  className={`p-4 rounded-xl border flex flex-col justify-between cursor-pointer transition-all duration-300 ${
                    isHovered
                      ? 'scale-105 shadow-md -translate-y-1'
                      : ''
                  } ${
                    isCurrent
                      ? 'bg-[#EDE9FE]/50 border-[#7C3AED] shadow-xs'
                      : isCompleted
                      ? 'bg-[#FFFBEB]/60 border-[#FACC15]'
                      : 'bg-white border-[#E8E4F0] hover:border-[#7C3AED]/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    {/* Node Indicator with Section 16 Colors */}
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                        isCurrent
                          ? 'bg-[#5B21B6] text-white ring-4 ring-[#EDE9FE] shadow-sm'
                          : isCompleted
                          ? 'bg-[#FACC15] text-[#18152B] ring-2 ring-[#FEF08A] font-extrabold'
                          : 'bg-[#E8E4F0] text-[#6B687A]'
                      }`}
                    >
                      {isCompleted ? '✓' : idx + 1}
                    </div>

                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        isCurrent
                          ? 'bg-[#5B21B6] text-white'
                          : isCompleted
                          ? 'bg-[#FEF08A] text-[#854D0E]'
                          : 'bg-[#FAF9FF] text-[#6B687A]'
                      }`}
                    >
                      {isCompleted ? 'DONE' : isCurrent ? 'CURRENT' : 'UPCOMING'}
                    </span>
                  </div>

                  <div>
                    <h4
                      className={`text-xs font-bold tracking-tight mb-1 ${
                        isCurrent
                          ? 'text-[#5B21B6]'
                          : isCompleted
                          ? 'text-[#18152B]'
                          : 'text-[#6B687A]'
                      }`}
                    >
                      {stage.name}
                    </h4>
                    <p className="text-[11px] text-[#6B687A] leading-tight font-sans">
                      {stage.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 02. Career Filter Bar */}
      <section className="rounded-2xl p-4 sm:p-5 bg-white border border-[#E8E4F0] space-y-3 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#E8E4F0] pb-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#5B21B6]" />
            <h3 className="text-xs uppercase tracking-wider text-[#17152B] font-bold">
              Filter Tracks by Company & Salary
            </h3>
          </div>

          {(companyTypeFilter !== 'All' || salaryFilter !== 'All' || levelFilter !== 'All' || languageFilter !== 'All') && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs text-[#5B21B6] hover:underline flex items-center gap-1 cursor-pointer font-semibold transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          {/* Company Type Filter */}
          <div className="space-y-1">
            <label className="text-[11px] text-[#625F72] uppercase font-bold block">Company Type</label>
            <select
              value={companyTypeFilter}
              onChange={(e) => setCompanyTypeFilter(e.target.value)}
              className="w-full px-3 py-1.5 rounded-xl bg-[#FAF9FF] border border-[#E8E4F0] text-[#17152B] font-medium focus:outline-none focus:border-[#5B21B6] transition-colors cursor-pointer"
            >
              {careerFilters.companyTypes.map((type) => (
                <option key={type} value={type}>{type === 'All' ? 'All Types' : `${type} Companies`}</option>
              ))}
            </select>
          </div>

          {/* Salary Filter */}
          <div className="space-y-1">
            <label className="text-[11px] text-[#625F72] uppercase font-bold block">Target Salary Range</label>
            <select
              value={salaryFilter}
              onChange={(e) => setSalaryFilter(e.target.value)}
              className="w-full px-3 py-1.5 rounded-xl bg-[#FAF9FF] border border-[#E8E4F0] text-[#17152B] font-medium focus:outline-none focus:border-[#5B21B6] transition-colors cursor-pointer"
            >
              {careerFilters.salaryRanges.map((sal) => (
                <option key={sal} value={sal}>{sal === 'All' ? 'All Ranges' : sal}</option>
              ))}
            </select>
          </div>

          {/* Level Filter */}
          <div className="space-y-1">
            <label className="text-[11px] text-[#625F72] uppercase font-bold block">Target Level</label>
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="w-full px-3 py-1.5 rounded-xl bg-[#FAF9FF] border border-[#E8E4F0] text-[#17152B] font-medium focus:outline-none focus:border-[#5B21B6] transition-colors cursor-pointer"
            >
              {careerFilters.levels.map((lvl) => (
                <option key={lvl} value={lvl}>{lvl === 'All' ? 'All Levels' : lvl}</option>
              ))}
            </select>
          </div>

          {/* Language Filter */}
          <div className="space-y-1">
            <label className="text-[11px] text-[#625F72] uppercase font-bold block">Language</label>
            <select
              value={languageFilter}
              onChange={(e) => setLanguageFilter(e.target.value)}
              className="w-full px-3 py-1.5 rounded-xl bg-[#FAF9FF] border border-[#E8E4F0] text-[#17152B] font-medium focus:outline-none focus:border-[#5B21B6] transition-colors cursor-pointer"
            >
              {careerFilters.languages.map((lang) => (
                <option key={lang} value={lang}>{lang === 'All' ? 'All Languages' : lang}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Section 14: CAREER TRACKS (Product Companies vs Service Companies) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#5B21B6] font-bold block">
              PRIMARY PREPARATION TRACKS
            </span>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-[#17152B]">
              Curated Career Packs
            </h2>
          </div>
          <span className="text-xs text-[#625F72]">
            {filteredPacks.length} tracks available
          </span>
        </div>

        {filteredPacks.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-white border border-[#E8E4F0] space-y-2 shadow-xs">
            <p className="text-xs text-[#625F72]">No primary packs match your selected filter criteria.</p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs text-[#5B21B6] font-semibold underline cursor-pointer"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredPacks.map((pack) => {
              const isProduct = pack.id === 'product';
              const recommendedSkills = isProduct
                ? ['DSA', 'Problem Solving', 'System Design']
                : ['Core Aptitude', 'Logical Reasoning', 'Foundations'];

              return (
                <AuroraCard
                  key={pack.id}
                  className="rounded-2xl p-6 sm:p-8 bg-white border border-[#E8E4F0] hover:border-[#7C3AED] hover:scale-[1.015] hover:-translate-y-1.5 transition-all duration-300 relative flex flex-col justify-between group shadow-xs hover:shadow-card-hover overflow-hidden"
                >
                  {/* Purple Top Accent Bar */}
                  <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#5B21B6] via-[#7C3AED] to-[#FACC15]" />

                  <div className="space-y-4 pt-1">
                    {/* Header Strip with Yellow Micro-Accent */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#FACC15] ring-2 ring-[#FEF08A]" />
                        <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase bg-[#EDE9FE] text-[#5B21B6] border border-[#E8E4F0]">
                          {pack.badge}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-[#16A34A] bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                        Target: {isProduct ? '10+ LPA' : '3–10 LPA'}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3 className="text-xl font-display font-extrabold text-[#18152B] group-hover:text-[#5B21B6] transition-colors">
                        {isProduct ? 'PRODUCT COMPANIES' : 'SERVICE COMPANIES'}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#6B687A] mt-2 leading-relaxed font-sans">
                        {pack.description}
                      </p>
                    </div>

                    {/* Meta Indicators */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#6B687A] pt-1">
                      <div>Difficulty: <strong className="text-[#18152B] font-semibold">{pack.level}</strong></div>
                      <span>•</span>
                      <div>Languages: <strong className="text-[#18152B] font-semibold">{pack.recommendedLanguages.join(', ')}</strong></div>
                    </div>

                    {/* Target Companies: Microsoft, Amazon, Adobe, Google vs TCS, Infosys, Accenture, Cognizant */}
                    <div>
                      <span className="text-[11px] uppercase text-[#6B687A] block mb-1.5 font-bold">
                        Target Companies:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {(isProduct ? ['Microsoft', 'Amazon', 'Adobe', 'Google'] : ['TCS', 'Infosys', 'Accenture', 'Cognizant']).map((c) => (
                          <span
                            key={c}
                            className="px-2.5 py-1 rounded-lg text-xs bg-[#FAF9FF] text-[#18152B] font-medium border border-[#E8E4F0]"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Section 15: Recommended Skills (Hover Reveal with Smooth 300ms transition) */}
                    <div className="p-3.5 rounded-xl bg-[#FAF9FF] group-hover:bg-[#EDE9FE]/50 border border-[#E8E4F0] group-hover:border-[#7C3AED]/30 transition-all duration-300">
                      <span className="text-[11px] uppercase tracking-wider font-bold text-[#5B21B6] block mb-1.5">
                        Recommended Skills
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {recommendedSkills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-white text-[#5B21B6] border border-[#E8E4F0] shadow-2xs group-hover:border-[#7C3AED]/40 transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Preparation Modules Count */}
                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <div className="p-3 rounded-xl bg-[#FAF9FF] border border-[#E8E4F0]">
                        <span className="text-[10px] uppercase text-[#6B687A] block font-bold">Practice MCQs</span>
                        <span className="text-sm font-bold text-[#5B21B6]">{pack.stats.mcqs}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-[#FAF9FF] border border-[#E8E4F0]">
                        <span className="text-[10px] uppercase text-[#6B687A] block font-bold">Coding Problems</span>
                        <span className="text-sm font-bold text-[#16A34A]">{pack.stats.coding}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action CTA */}
                  <div className="pt-6 mt-6 border-t border-[#E8E4F0] flex items-center justify-between">
                    <span className="text-xs text-[#6B687A] font-medium">
                      {pack.preparationModules.length} Structured Modules
                    </span>

                    <button
                      type="button"
                      onClick={() => handleOpenPack(pack)}
                      className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#5B21B6] hover:bg-[#4C1D95] text-white transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-xs active:scale-[0.98]"
                    >
                      <span>Explore Track →</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                  </div>
                </AuroraCard>
              );
            })}
          </div>
        )}
      </section>

      {/* 04. Popular Company Practice Paths */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#5B21B6] font-bold block">
              COMPANY PRACTICE DIRECTORY
            </span>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-[#17152B]">
              Target Company Paths
            </h2>
          </div>
          <span className="text-xs text-[#625F72]">
            Sample Preparation Paths
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {popularCompanyPaths.map((comp) => (
            <div
              key={comp.id}
              onClick={() => setSelectedCompanyPath(comp)}
              className="rounded-2xl p-5 bg-white border border-[#E8E4F0] hover:border-[#5B21B6] hover:-translate-y-1 transition-all cursor-pointer group flex flex-col justify-between shadow-xs"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-[#EDE5FF] border border-[#D8C7FF] flex items-center justify-center font-bold text-xs text-[#5B21B6] group-hover:scale-105 transition-transform">
                    {comp.logo}
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    comp.type === 'Product'
                      ? 'bg-[#EDE5FF] text-[#5B21B6] border border-[#D8C7FF]'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}>
                    {comp.type}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-display font-bold text-[#17152B] group-hover:text-[#5B21B6] transition-colors">
                    {comp.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#16A34A] mt-0.5">
                    {comp.packageRange}
                  </p>
                </div>

                <div className="text-[11px] text-[#625F72] space-y-1 pt-1 font-sans">
                  <div>Cutoff Benchmark: <span className="text-[#17152B] font-semibold">{comp.oaCutoff}</span></div>
                  <div>Difficulty: <span className="text-[#17152B] font-semibold">{comp.difficulty}</span></div>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-[#E8E4F0] flex items-center justify-between text-xs">
                <span className="text-[#625F72]">{comp.rounds}</span>
                <span className="text-[#5B21B6] flex items-center gap-1 group-hover:translate-x-1 transition-transform font-bold">
                  <span>Explore Path</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TRACK DETAIL MODAL */}
      {activePack && (
        <Modal
          isOpen={!!activePack}
          onClose={handleClosePack}
          title={activePack.title}
          subtitle={`Target Range: ${activePack.package || activePack.avgSalary} • ${activePack.difficulty || activePack.level}`}
          maxWidth="max-w-4xl"
        >
          <div className="space-y-6 text-left font-sans">
            <div className="p-4 rounded-xl bg-[#FAF9FF] border border-[#E8E4F0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#5B21B6] font-bold block mb-1">
                  Placement Preparation Track
                </span>
                <h4 className="text-lg font-display font-bold text-[#17152B]">
                  {activePack.title}
                </h4>
                <p className="text-xs text-[#625F72] max-w-xl mt-1 leading-relaxed">
                  {activePack.description}
                </p>
              </div>

              <div className="flex flex-col sm:items-end gap-1 shrink-0">
                <span className="text-xs text-[#625F72]">Target Range</span>
                <span className="text-base font-bold text-[#16A34A]">
                  {activePack.package || activePack.avgSalary}
                </span>
              </div>
            </div>

            {/* Preparation Modules */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs uppercase tracking-wider text-[#5B21B6] font-bold">
                  Preparation Modules & Curriculum
                </h4>
                <span className="text-xs text-[#625F72]">Structured practice progression</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(activePack.preparationModules || []).map((mod, idx) => (
                  <div
                    key={mod.id || idx}
                    className="p-3 rounded-xl bg-white border border-[#E8E4F0] flex items-start gap-3 hover:border-[#D8C7FF] transition-colors shadow-2xs"
                  >
                    <div className="w-6 h-6 rounded-lg bg-[#EDE5FF] text-[#5B21B6] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <h5 className="text-xs font-bold text-[#17152B] truncate">{mod.name}</h5>
                        <span className="text-[11px] font-semibold text-[#16A34A] shrink-0">{mod.count}</span>
                      </div>
                      <p className="text-xs text-[#625F72] mt-0.5 leading-snug line-clamp-2">
                        {mod.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Target Companies */}
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider text-[#625F72] font-bold block">
                Target Companies In This Track
              </span>
              <div className="flex flex-wrap gap-2">
                {(activePack.companies || []).map((comp) => (
                  <span
                    key={comp}
                    className="px-3 py-1 rounded-xl text-xs bg-white text-[#17152B] font-medium border border-[#E8E4F0]"
                  >
                    ✓ {comp}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#E8E4F0] flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  handleClosePack();
                  navigate('/practice');
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-white hover:bg-[#FAF9FF] text-[#17152B] hover:text-[#5B21B6] border border-[#E8E4F0] transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Code2 className="w-4 h-4 text-[#5B21B6]" />
                <span>Start Practice</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  updateTarget({
                    pkg: activePack.package || '20+ LPA',
                    level: activePack.difficulty || 'Intermediate',
                  });
                  handleClosePack();
                  navigate('/mission');
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#5B21B6] text-white hover:bg-[#4C1D95] transition-colors flex items-center gap-2 cursor-pointer shadow-sm active:scale-[0.98]"
              >
                <Target className="w-4 h-4 text-white" />
                <span>Select As Placement Target →</span>
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* POPULAR COMPANY PATH DETAIL MODAL */}
      {selectedCompanyPath && (
        <Modal
          isOpen={!!selectedCompanyPath}
          onClose={() => setSelectedCompanyPath(null)}
          title={`${selectedCompanyPath.name} Preparation Path`}
          subtitle={`${selectedCompanyPath.type} Track • CTC Benchmark: ${selectedCompanyPath.packageRange}`}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-5 text-left font-sans">
            <div className="p-4 rounded-xl bg-[#FAF9FF] border border-[#E8E4F0] flex items-center justify-between">
              <div>
                <span className="text-xs uppercase text-[#5B21B6] font-bold block">Practice Target Profile</span>
                <h4 className="text-base font-display font-bold text-[#17152B]">{selectedCompanyPath.name}</h4>
                <p className="text-xs text-[#16A34A] font-semibold">{selectedCompanyPath.packageRange} • {selectedCompanyPath.rounds}</p>
              </div>
              <div className="text-right text-xs">
                <span className="text-[#625F72] block text-[10px] font-bold">OA CUTOFF</span>
                <span className="text-lg font-bold text-[#17152B]">{selectedCompanyPath.oaCutoff}</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase text-[#625F72] font-bold block">Recommended Focus Topics</span>
              <div className="flex flex-wrap gap-2">
                {selectedCompanyPath.focusTopics.map((topic, i) => (
                  <span key={i} className="px-3 py-1 rounded-xl text-xs bg-white text-[#17152B] font-medium border border-[#E8E4F0]">
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8E4F0] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setSelectedCompanyPath(null)}
                className="px-4 py-2 rounded-xl text-xs text-[#625F72] hover:text-[#17152B]"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  updateTarget({ company: selectedCompanyPath.name, pkg: selectedCompanyPath.packageRange });
                  setSelectedCompanyPath(null);
                  navigate('/practice?company=' + selectedCompanyPath.name);
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#5B21B6] text-white hover:bg-[#4C1D95] transition-colors shadow-sm cursor-pointer"
              >
                Practice Questions →
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
