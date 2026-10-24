import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Target,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Award,
} from 'lucide-react';
import { usePlacement } from '../context/PlacementContext';
import { companyProfiles, packageTiers, programmingLanguages, preparationLevels } from '../data/companies';
import PageHeader from '../components/ui/PageHeader';
import CareerSignal from '../components/ui/CareerSignal';
import ScrollReveal from '../components/ui/ScrollReveal';
import CountUp from '../components/ui/CountUp';
import MagneticButton from '../components/ui/MagneticButton';
import EditorialDivider from '../components/ui/EditorialDivider';

export default function MissionPage() {
  const navigate = useNavigate();
  const { missionTarget, updateTarget, readiness } = usePlacement();

  const [activeStageId, setActiveStageId] = useState('02');

  const missionProgress = [
    { id: '01', title: 'Foundation', status: 'Complete', progress: 100, isDone: true, color: '#16A34A', desc: 'CS fundamentals, complexity analysis, speed quant' },
    { id: '02', title: 'DSA Mastery', status: 'In Progress', progress: 78, isDone: false, color: '#5B21B6', desc: 'Arrays, Trees, Graphs, Hash Maps, Dynamic Programming' },
    { id: '03', title: 'Coding Practice', status: 'In Progress', progress: 64, isDone: false, color: '#7C3AED', desc: 'Company problem patterns, Two Sum, LRU Cache, Sliding Window' },
    { id: '04', title: 'Mock Assessment', status: 'Attention Needed', progress: 48, isDone: false, color: '#F59E0B', desc: 'Sectional practice simulations, cutoff benchmarks' },
    { id: '05', title: 'Technical Interview', status: 'Upcoming', progress: 31, isDone: false, color: '#7C3AED', desc: 'Problem defense, architecture discussion, STAR format' },
    { id: '06', title: 'Placement Ready', status: 'Target Milestone', progress: 12, isDone: false, color: '#16A34A', desc: 'Complete targeted preparation track benchmark' },
  ];

  const stages = [
    {
      id: '01',
      number: '01',
      title: 'Target Selection',
      subtitle: 'Configure your company and package preparation goal',
      status: 'Target Configured',
      checklist: [
        'Selected Target Company: ' + missionTarget.company,
        'Selected Package Range: ' + missionTarget.pkg,
        'Primary Language: ' + missionTarget.language,
        'Experience Baseline: ' + missionTarget.level,
      ],
      actionLabel: 'Adjust Target Parameters',
      actionRoute: null,
    },
    {
      id: '02',
      number: '02',
      title: 'Core Foundations',
      subtitle: 'Core CS subjects, computational complexity and quants',
      status: '100% Completed',
      checklist: [
        'Time & Space Complexity (Big-O analysis mastered)',
        'Object-Oriented Programming (Polymorphism, Inheritance)',
        'Database Management & SQL Relational Joins',
        'Operating Systems & Process Concurrency basics',
      ],
      actionLabel: 'Review Foundation MCQs',
      actionRoute: '/practice?tab=MCQ',
    },
    {
      id: '03',
      number: '03',
      title: 'Coding Practice',
      subtitle: 'Algorithmic problem patterns and targeted coding challenges',
      status: '78% In Progress',
      checklist: [
        'Prefix Sum & Sliding Window (24 problems solved)',
        'Two Pointer array manipulations (18 problems solved)',
        'Binary Search on Answer Space (12 problems solved)',
        'Graph BFS/DFS Traversal & Shortest Path (In Progress)',
      ],
      actionLabel: 'Open Practice Workspace',
      actionRoute: '/practice',
    },
    {
      id: '04',
      number: '04',
      title: 'Mock Assessments',
      subtitle: 'Timed sectional practice assessment simulations',
      status: '48% Practice Needed',
      checklist: [
        'Sectional Quantitative Aptitude (30 mins timed)',
        'Core Technical Computer Science MCQs (20 mins timed)',
        '2 Coding Problems under 60-minute simulation window',
        'Automated sectional cutoff score analysis',
      ],
      actionLabel: 'Attempt Timed Mock',
      actionRoute: '/practice?tab=Mock',
    },
    {
      id: '05',
      number: '05',
      title: 'Technical Interview',
      subtitle: 'Technical deep-dives, system design and behavioral STAR methodology',
      status: '31% Upcoming',
      checklist: [
        'Low-Level System Design (Design Parking Lot / Cache)',
        'Live Technical Coding Round Practice',
        'Structured Problem Communication (STAR framework)',
        'Project Architecture Resume Defense',
      ],
      actionLabel: 'Explore Career Track',
      actionRoute: '/career',
    },
    {
      id: '06',
      number: '06',
      title: 'Placement Ready',
      subtitle: 'Final candidate qualification milestone for target drives',
      status: '12% Calibrating',
      checklist: [
        'Target Composite Readiness Index > 75%',
        'Zero unresolved sectional practice bottlenecks',
        'Verified placement portfolio & coding track completed',
        'Resume calibrated for target technical assessments',
      ],
      actionLabel: 'Inspect Pathfinder Trajectory',
      actionRoute: '/pathfinder',
    },
  ];

  const currentStage = stages.find((s) => s.id === activeStageId) || stages[0];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 font-sans">
      {/* Page Header standard with BackButton */}
      <PageHeader
        backTo="/dashboard"
        backLabel="Back to Dashboard"
        category="Placement Intelligence"
        title="Placement Mission"
        description="A structured, goal-driven roadmap dynamically mapped to the assessment criteria, sectional patterns, and preparation milestones of your target company."
      />

      {/* 01. TARGET CONFIGURATION SELECTOR */}
      <section className="rounded-2xl p-6 bg-white border border-[#E8E4F0] space-y-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#E8E4F0]">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-[#EDE5FF] text-[#5B21B6] border border-[#D8C7FF]">
              <Target className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-base font-display font-bold text-[#17152B]">
                Target Configuration
              </h3>
              <p className="text-xs text-[#625F72]">
                Updating these parameters recalculates your practice recommendations dynamically
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#625F72]">Selected Goal:</span>
            <span className="text-[#5B21B6] font-bold bg-[#EDE5FF] px-2.5 py-1 rounded-lg border border-[#D8C7FF]">
              {missionTarget.company} • {missionTarget.pkg}
            </span>
          </div>
        </div>

        {/* 4 Interactive Dropdown Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Company Selector */}
          <div className="space-y-1.5">
            <label className="text-xs uppercase text-[#625F72] block font-bold">
              01 Target Company
            </label>
            <select
              value={missionTarget.company}
              onChange={(e) => updateTarget({ company: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF9FF] border border-[#E8E4F0] text-xs text-[#17152B] font-medium focus:outline-none focus:border-[#5B21B6] transition-colors cursor-pointer"
            >
              {companyProfiles.map((c) => (
                <option key={c.id} value={c.name} className="bg-white text-[#17152B]">
                  {c.name} ({c.type})
                </option>
              ))}
            </select>
          </div>

          {/* Package Tier Selector */}
          <div className="space-y-1.5">
            <label className="text-xs uppercase text-[#625F72] block font-bold">
              02 Target Package
            </label>
            <select
              value={missionTarget.pkg}
              onChange={(e) => updateTarget({ pkg: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF9FF] border border-[#E8E4F0] text-xs text-[#17152B] font-medium focus:outline-none focus:border-[#5B21B6] transition-colors cursor-pointer"
            >
              {packageTiers.map((p) => (
                <option key={p} value={p} className="bg-white text-[#17152B]">
                  {p}
                </option>
              ))}
            </select>
          </div>

          {/* Programming Language Selector */}
          <div className="space-y-1.5">
            <label className="text-xs uppercase text-[#625F72] block font-bold">
              03 Primary Language
            </label>
            <select
              value={missionTarget.language}
              onChange={(e) => updateTarget({ language: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF9FF] border border-[#E8E4F0] text-xs text-[#17152B] font-medium focus:outline-none focus:border-[#5B21B6] transition-colors cursor-pointer"
            >
              {programmingLanguages.map((l) => (
                <option key={l} value={l} className="bg-white text-[#17152B]">
                  {l}
                </option>
              ))}
            </select>
          </div>

          {/* Preparation Level Selector */}
          <div className="space-y-1.5">
            <label className="text-xs uppercase text-[#625F72] block font-bold">
              04 Current Level
            </label>
            <select
              value={missionTarget.level}
              onChange={(e) => updateTarget({ level: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF9FF] border border-[#E8E4F0] text-xs text-[#17152B] font-medium focus:outline-none focus:border-[#5B21B6] transition-colors cursor-pointer"
            >
              {preparationLevels.map((lvl) => (
                <option key={lvl} value={lvl} className="bg-white text-[#17152B]">
                  {lvl}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* 02. MISSION PROGRESS METRIC BAR */}
      <section className="rounded-2xl p-6 bg-white border border-[#E8E4F0] space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-display font-bold text-[#18152B] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#5B21B6]" />
              <span>Mission Progress Pipeline</span>
            </h3>
            <p className="text-xs text-[#6B687A] mt-0.5">
              Real-time milestone tracking for {missionTarget.company} • {missionTarget.pkg}
            </p>
          </div>
          <span className="text-xs font-sans text-[#16A34A] font-bold self-start sm:self-auto">
            Overall Readiness:{' '}
            <span className="font-mono text-sm text-[#5B21B6] bg-[#EDE9FE] px-2 py-0.5 rounded-lg">
              <CountUp to={readiness.overall} suffix="%" />
            </span>
          </span>
        </div>

        {/* Career Signal Line */}
        <div className="pt-1 pb-1">
          <CareerSignal activeStep={2} showLabels={false} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {missionProgress.map((mp) => (
            <div
              key={mp.id}
              onClick={() => setActiveStageId(mp.id)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                activeStageId === mp.id
                  ? 'bg-[#FAF7FF] border-[#5B21B6] shadow-xs'
                  : 'bg-[#FAF9FF] border-[#E8E4F0] hover:border-[#D8C7FF]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="text-[#625F72] font-semibold">{mp.id}</span>
                  {mp.isDone ? (
                    <span className="text-[#16A34A] font-bold">✓</span>
                  ) : (
                    <span className="font-bold text-[#5B21B6]">{mp.progress}%</span>
                  )}
                </div>
                <h4 className="text-xs font-semibold text-[#17152B]">{mp.title}</h4>
              </div>

              <div className="w-full h-1.5 bg-[#E8E4F0] rounded-full overflow-hidden mt-3">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${mp.progress}%`, backgroundColor: mp.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 03. INTERACTIVE JOURNEY TIMELINE & STAGE DETAILS */}
      <section className="rounded-2xl p-6 sm:p-8 bg-white border border-[#E8E4F0] space-y-6 shadow-xs">
        <div>
          <span className="text-xs uppercase tracking-wider text-[#5B21B6] font-bold">
            6-Stage Placement Preparation Architecture
          </span>
          <h3 className="text-xl font-display font-bold text-[#17152B] mt-0.5">
            Stage Roadmap & Milestone Review
          </h3>
          <p className="text-xs text-[#625F72]">
            Select any stage below to inspect milestone requirements, active practice sets, and proctored simulations.
          </p>
        </div>

        {/* 6 Stage Timeline Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {stages.map((stg) => {
            const isActive = activeStageId === stg.id;
            return (
              <button
                key={stg.id}
                type="button"
                onClick={() => setActiveStageId(stg.id)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'bg-[#5B21B6] text-white border-[#5B21B6] font-semibold shadow-sm'
                    : 'bg-[#FAF9FF] text-[#17152B] border-[#E8E4F0] hover:bg-[#EDE5FF] hover:text-[#5B21B6]'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className={`text-[10px] font-bold ${isActive ? 'text-[#FACC15]' : 'text-[#5B21B6]'}`}>
                    STAGE {stg.number}
                  </span>
                  <span className={`text-[10px] ${isActive ? 'text-white/80' : 'text-[#625F72]'}`}>
                    {stg.status.split(' ')[0]}
                  </span>
                </div>
                <span className="text-xs font-semibold tracking-tight">
                  {stg.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detail Showcase Box */}
        <div className="p-6 rounded-2xl bg-[#FAF9FF] border border-[#E8E4F0] space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E8E4F0]">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-sans font-bold uppercase bg-[#5B21B6] text-white">
                  STAGE {currentStage.number}
                </span>
                <span className="text-xs font-semibold text-[#16A34A]">
                  {currentStage.status}
                </span>
              </div>
              <h4 className="text-lg font-display font-bold text-[#17152B] mt-1">
                {currentStage.title}
              </h4>
              <p className="text-xs text-[#625F72] font-sans mt-0.5">
                {currentStage.subtitle}
              </p>
            </div>

            {currentStage.actionRoute && (
              <button
                type="button"
                onClick={() => navigate(currentStage.actionRoute)}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#5B21B6] text-white hover:bg-[#4C1D95] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm shrink-0"
              >
                <span>{currentStage.actionLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div>
            <span className="text-xs uppercase tracking-wider text-[#625F72] block mb-2 font-bold">
              Stage Milestone Checklist:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {currentStage.checklist.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-white border border-[#E8E4F0] text-xs text-[#17152B] flex items-start gap-2.5 shadow-2xs"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
