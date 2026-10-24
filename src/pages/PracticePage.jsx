import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  Clock,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  HelpCircle,
  SlidersHorizontal,
  BookOpen,
  CheckCircle2,
  XCircle,
  Maximize2,
  X,
  Target,
  Sparkles,
  Zap,
} from 'lucide-react';
import { practiceQuestions } from '../data/questions';
import { companyProfiles, packageTiers, programmingLanguages } from '../data/companies';
import PageHeader from '../components/ui/PageHeader';
import ScrollReveal from '../components/ui/ScrollReveal';
import { StaggerContainer, StaggerItem } from '../components/ui/StaggerContainer';
import MagneticButton from '../components/ui/MagneticButton';
import EditorialDivider from '../components/ui/EditorialDivider';

export default function PracticePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Active Category Tabs
  const [activeTab, setActiveTab] = useState(() => searchParams.get('tab') || 'All');

  // Filter Bar state (Section 18: Company, Package, Language, Topic, Difficulty, Year)
  const [selectedCompany, setSelectedCompany] = useState('All');
  const [selectedPackage, setSelectedPackage] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [selectedTopic, setSelectedTopic] = useState(() => searchParams.get('topic') || 'All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');

  const [expandedCardId, setExpandedCardId] = useState(null);

  // Section 18: Focus Mode State
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [focusQuestionIndex, setFocusQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answerState, setAnswerState] = useState(null); // 'correct' | 'incorrect' | null

  const tabs = ['All', 'Aptitude', 'MCQ', 'DSA', 'Coding', 'Company Questions'];
  const topics = ['All', 'Arrays', 'Strings', 'Hash Table', 'Graph', 'Design', 'Math', 'Dynamic Programming'];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];
  const years = ['All', '2024', '2023', '2022', '2021'];

  // Filter logic
  const filteredQuestions = practiceQuestions.filter((q) => {
    if (activeTab === 'Aptitude' && q.topic !== 'Math') return false;
    if (activeTab === 'MCQ' && q.topic !== 'Math' && q.difficulty !== 'Easy') return false;
    if (activeTab === 'DSA' && !['Arrays', 'Hash Table', 'Graph'].includes(q.topic)) return false;
    if (activeTab === 'Coding' && !['Arrays', 'Graph', 'Design'].includes(q.topic)) return false;
    if (activeTab === 'Company Questions' && !q.company) return false;

    if (selectedCompany !== 'All' && q.company !== selectedCompany) return false;
    if (selectedTopic !== 'All' && q.topic !== selectedTopic) return false;
    if (selectedDifficulty !== 'All' && q.difficulty !== selectedDifficulty) return false;
    if (selectedPackage !== 'All' && q.packageTier !== selectedPackage) return false;

    return true;
  });

  const toggleExpand = (id) => {
    setExpandedCardId((prev) => (prev === id ? null : id));
  };

  const handleStartQuestion = (q) => {
    navigate('/coding', { state: { question: q } });
  };

  const openFocusMode = (idx = 0) => {
    setFocusQuestionIndex(idx);
    setSelectedOption(null);
    setAnswerState(null);
    setIsFocusMode(true);
  };

  const currentFocusQuestion = filteredQuestions[focusQuestionIndex] || filteredQuestions[0] || practiceQuestions[0];

  // Focus Mode Mock Options
  const mockOptions = [
    { id: 'opt-A', text: 'Use a hash map to look up complements in O(1) time.' },
    { id: 'opt-B', text: 'Sort the array and run binary search on all pairs in O(N log N).' },
    { id: 'opt-C', text: 'Iterate over all pairs using nested loops in O(N^2) time.' },
    { id: 'opt-D', text: 'Allocate a frequency counter table for bounded range elements.' },
  ];

  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId);
    if (optionId === 'opt-A') {
      setAnswerState('correct');
    } else {
      setAnswerState('incorrect');
    }
  };

  const nextFocusQuestion = () => {
    if (focusQuestionIndex < Math.min(filteredQuestions.length - 1, 9)) {
      setFocusQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setAnswerState(null);
    } else {
      setIsFocusMode(false);
    }
  };

  const resetFilters = () => {
    setSelectedCompany('All');
    setSelectedPackage('All');
    setSelectedLanguage('All');
    setSelectedTopic('All');
    setSelectedDifficulty('All');
    setSelectedYear('All');
    setActiveTab('All');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 font-sans text-left relative">
      {/* Page Header with Focus Mode CTA (Section 18) */}
      <PageHeader
        backTo="/dashboard"
        backLabel="Back to Dashboard"
        category="Targeted Preparation"
        title="PRACTICE CENTER"
        description="Train with questions aligned to your target."
        actions={
          <div className="flex items-center gap-2">
            <MagneticButton
              variant="secondary"
              onClick={() => openFocusMode(0)}
              className="px-3.5 py-2 text-xs font-sans"
            >
              <Zap className="w-3.5 h-3.5 mr-1.5 text-[#FACC15] fill-[#FACC15]" />
              <span>Launch Focus Drill</span>
            </MagneticButton>

            <MagneticButton
              variant="primary"
              onClick={() => navigate('/coding')}
              className="px-4 py-2 text-xs font-sans"
            >
              <Code2 className="w-3.5 h-3.5 mr-1.5" />
              <span>Open Coding Workspace</span>
            </MagneticButton>
          </div>
        }
      />

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-[#E8E4F0] custom-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-sans transition-all cursor-pointer whitespace-nowrap ${
              activeTab === tab
                ? 'bg-[#5B21B6] text-white font-bold shadow-xs'
                : 'text-[#686477] hover:text-[#18152B] hover:bg-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Top Filter Bar (Section 18: Company, Package, Language, Topic, Difficulty, Year) */}
      <div className="rounded-2xl p-4 bg-white border border-[#E8E4F0] space-y-3 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#E8E4F0] pb-2.5">
          <div className="flex items-center gap-2 text-xs font-bold text-[#18152B] uppercase">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#5B21B6]" />
            <span>Placement Practice Filters</span>
          </div>
          {(selectedCompany !== 'All' || selectedPackage !== 'All' || selectedLanguage !== 'All' || selectedTopic !== 'All' || selectedDifficulty !== 'All' || selectedYear !== 'All') && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-xs text-[#5B21B6] hover:underline font-semibold cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          {/* Company */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-[#686477] block">Company</label>
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-xl bg-[#FAF9FF] border border-[#E8E4F0] text-[#18152B] font-medium focus:outline-none focus:border-[#7C3AED] transition-colors cursor-pointer text-xs"
            >
              <option value="All">All Companies</option>
              {companyProfiles.map((c) => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Package */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-[#686477] block">Package</label>
            <select
              value={selectedPackage}
              onChange={(e) => setSelectedPackage(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-xl bg-[#FAF9FF] border border-[#E8E4F0] text-[#18152B] font-medium focus:outline-none focus:border-[#7C3AED] transition-colors cursor-pointer text-xs"
            >
              <option value="All">All Packages</option>
              {packageTiers.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Language */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-[#686477] block">Language</label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-xl bg-[#FAF9FF] border border-[#E8E4F0] text-[#18152B] font-medium focus:outline-none focus:border-[#7C3AED] transition-colors cursor-pointer text-xs"
            >
              <option value="All">All Languages</option>
              {programmingLanguages.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>

          {/* Topic */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-[#686477] block">Topic</label>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-xl bg-[#FAF9FF] border border-[#E8E4F0] text-[#18152B] font-medium focus:outline-none focus:border-[#7C3AED] transition-colors cursor-pointer text-xs"
            >
              {topics.map((t) => (
                <option key={t} value={t}>{t === 'All' ? 'All Topics' : t}</option>
              ))}
            </select>
          </div>

          {/* Difficulty */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-[#686477] block">Difficulty</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-xl bg-[#FAF9FF] border border-[#E8E4F0] text-[#18152B] font-medium focus:outline-none focus:border-[#7C3AED] transition-colors cursor-pointer text-xs"
            >
              {difficulties.map((d) => (
                <option key={d} value={d}>{d === 'All' ? 'All Difficulties' : d}</option>
              ))}
            </select>
          </div>

          {/* Year */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-[#686477] block">Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-xl bg-[#FAF9FF] border border-[#E8E4F0] text-[#18152B] font-medium focus:outline-none focus:border-[#7C3AED] transition-colors cursor-pointer text-xs"
            >
              {years.map((y) => (
                <option key={y} value={y}>{y === 'All' ? 'All Years' : y}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Questions Grid with Stagger & ScrollReveal */}
      {filteredQuestions.length === 0 ? (
        <div className="rounded-2xl p-12 bg-white border border-[#E8E4F0] text-center space-y-4 shadow-xs">
          <BookOpen className="w-10 h-10 text-[#8C889E] mx-auto" />
          <div>
            <h3 className="text-base font-semibold text-[#18152B]">No practice questions matched your filters</h3>
            <p className="text-xs text-[#6B687A] mt-1">Try resetting or loosening your search filters to explore more topics.</p>
          </div>
          <MagneticButton variant="primary" onClick={resetFilters} className="px-4 py-2 text-xs font-sans">
            Reset Filters
          </MagneticButton>
        </div>
      ) : (
        <ScrollReveal delay={0.08}>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuestions.map((q, idx) => {
              const isExpanded = expandedCardId === q.id;

              return (
                <StaggerItem key={q.id}>
                  <div className="rounded-2xl p-6 bg-white border border-[#E8E4F0] hover:border-[#7C3AED]/40 hover:-translate-y-1 hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between shadow-xs h-full group">
                    <div>
                      {/* Header: Company, Package, Difficulty */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#EDE9FE] text-[#5B21B6] border border-[#E8E4F0]">
                          {q.company} • {q.packageTier}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                            q.difficulty === 'Easy'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : q.difficulty === 'Medium'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-red-50 text-red-700 border-red-200'
                          }`}>
                            {q.difficulty}
                          </span>
                        </div>
                      </div>

                      {/* Title & Topic */}
                      <h3 className="text-base font-display font-bold text-[#18152B] mb-1.5 group-hover:text-[#5B21B6] transition-colors">
                        {q.title}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-[#6B687A] mb-3">
                        <span>Topic: <strong className="text-[#18152B] font-semibold">{q.topic}</strong></span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#8C889E]" />
                          <span>15 min</span>
                        </span>
                      </div>

                      {/* Why This Question Accordion */}
                      <div className="mb-4">
                        <button
                          type="button"
                          onClick={() => toggleExpand(q.id)}
                          className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#FAF9FF] hover:bg-[#EDE9FE]/50 border border-[#E8E4F0] text-xs font-semibold text-[#5B21B6] transition-colors cursor-pointer"
                        >
                          <span className="flex items-center gap-1.5">
                            <HelpCircle className="w-3.5 h-3.5 text-[#5B21B6]" />
                            <span>Why this question?</span>
                          </span>
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="p-3.5 bg-[#FAF9FF] rounded-b-xl border-x border-b border-[#E8E4F0] space-y-2.5 text-xs">
                                <p className="text-xs text-[#6B687A] leading-relaxed">
                                  {q.whyQuestion.context}
                                </p>
                                <div className="flex flex-wrap gap-1">
                                  {q.whyQuestion.strengthens.map((str, sIdx) => (
                                    <span
                                      key={sIdx}
                                      className="px-2 py-0.5 rounded text-[10px] bg-white text-[#5B21B6] font-medium border border-[#E8E4F0]"
                                    >
                                      ✓ {str}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-3 border-t border-[#E8E4F0] flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openFocusMode(idx)}
                        className="px-3 py-2 rounded-xl text-xs font-semibold bg-[#FAF9FF] hover:bg-[#EDE9FE] text-[#5B21B6] border border-[#E8E4F0] transition-colors cursor-pointer"
                        title="Practice in Focus Mode"
                      >
                        Drill
                      </button>

                      <button
                        type="button"
                        onClick={() => handleStartQuestion(q)}
                        className="flex-1 py-2 rounded-xl text-xs font-semibold bg-[#5B21B6] hover:bg-[#4C1D95] text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-[0.98]"
                      >
                        <span>Open in Code IDE</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </ScrollReveal>
      )}

      {/* Section 18: FOCUS MODE MODAL (Subtle background dimming, question card slide in, progress line, correct/incorrect animation) */}
      <AnimatePresence>
        {isFocusMode && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Subtle background dimming */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFocusMode(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Focused Workspace Card */}
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ type: 'spring', damping: 25, stiffness: 320 }}
              className="relative w-full max-w-2xl bg-white border border-[#E8E4F0] rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
            >
              {/* Top Accent & Animated Progress Line */}
              <div className="w-full bg-[#E8E4F0] h-1.5">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#5B21B6] via-[#7C3AED] to-[#FACC15]"
                  animate={{ width: `${((focusQuestionIndex + 1) / 10) * 100}%` }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
              </div>

              {/* Workspace Header */}
              <div className="p-4 sm:p-5 border-b border-[#E8E4F0] bg-[#FAF9FF] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#FACC15] animate-pulse" />
                  <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#5B21B6]">
                    Focus Mode
                  </span>
                  <span className="text-xs font-mono font-semibold text-[#18152B] bg-white px-2 py-0.5 rounded border border-[#E8E4F0]">
                    Question {focusQuestionIndex + 1} / 10
                  </span>
                  <span className="text-xs font-mono font-bold text-[#854D0E] bg-[#FEF9C3] px-2 py-0.5 rounded border border-[#FDE047] flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#CA8A04]" />
                    <span>08:45</span>
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsFocusMode(false)}
                  className="p-1 rounded-lg text-[#6B687A] hover:text-[#18152B] hover:bg-[#E8E4F0] transition-colors cursor-pointer"
                  aria-label="Exit Focus Mode"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Focus Mode Content */}
              <div className="p-6 space-y-5 overflow-y-auto custom-scrollbar">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#EDE9FE] text-[#5B21B6]">
                      {currentFocusQuestion.company}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700">
                      {currentFocusQuestion.difficulty}
                    </span>
                    <span className="text-xs text-[#6B687A]">
                      {currentFocusQuestion.topic}
                    </span>
                  </div>

                  <h3 className="text-lg font-display font-bold text-[#18152B]">
                    {currentFocusQuestion.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B687A] mt-2 leading-relaxed">
                    Identify the optimal algorithmic approach to solve this problem within expected time and space constraints:
                  </p>
                </div>

                {/* Multiple Choice Strategy Options */}
                <div className="space-y-2.5">
                  {mockOptions.map((opt) => {
                    const isSelected = selectedOption === opt.id;
                    const isCorrect = isSelected && answerState === 'correct';
                    const isIncorrect = isSelected && answerState === 'incorrect';

                    return (
                      <motion.div
                        key={opt.id}
                        onClick={() => handleOptionSelect(opt.id)}
                        animate={isIncorrect ? { x: [-4, 4, -4, 4, 0] } : {}}
                        transition={{ duration: 0.3 }}
                        className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between ${
                          isCorrect
                            ? 'bg-emerald-50 border-emerald-400 text-emerald-900 shadow-xs'
                            : isIncorrect
                            ? 'bg-red-50 border-red-300 text-red-900'
                            : isSelected
                            ? 'bg-[#EDE9FE] border-[#7C3AED] text-[#18152B]'
                            : 'bg-[#FAF9FF] border-[#E8E4F0] text-[#18152B] hover:border-[#7C3AED]/40 hover:bg-white'
                        }`}
                      >
                        <span className="font-medium pr-3">{opt.text}</span>

                        {isCorrect && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="shrink-0"
                          >
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          </motion.div>
                        )}

                        {isIncorrect && (
                          <div className="shrink-0">
                            <XCircle className="w-5 h-5 text-red-500" />
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Feedback State */}
                {answerState === 'correct' && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-medium">Correct strategy identified! Complements lookup in O(1) time ensures optimal overall runtime.</span>
                  </motion.div>
                )}

                {answerState === 'incorrect' && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-center gap-2"
                  >
                    <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span className="font-medium">Sub-optimal approach. Try utilizing direct key lookups for instantaneous pair matching.</span>
                  </motion.div>
                )}
              </div>

              {/* Workspace Footer Actions */}
              <div className="p-4 border-t border-[#E8E4F0] bg-[#FAF9FF] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleStartQuestion(currentFocusQuestion)}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-[#5B21B6] hover:bg-[#EDE9FE] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Code2 className="w-4 h-4" />
                  <span>Open in Code Editor</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsFocusMode(false)}
                    className="px-3.5 py-2 rounded-xl text-xs font-medium text-[#6B687A] hover:bg-[#E8E4F0] transition-colors cursor-pointer"
                  >
                    Close
                  </button>

                  <MagneticButton
                    variant="primary"
                    onClick={nextFocusQuestion}
                    className="px-4 py-2 text-xs font-sans"
                  >
                    <span>{focusQuestionIndex < 9 ? 'Next Question →' : 'Finish Drill'}</span>
                  </MagneticButton>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
