import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Sliders,
  AlertCircle,
  BookOpen,
  Briefcase,
  Target,
  GraduationCap,
  Layers,
  Award,
  Zap,
} from 'lucide-react';
import { companyProfiles, packageTiers, programmingLanguages, preparationLevels } from '../data/companies';
import { usePlacement } from '../context/PlacementContext';
import PageHeader from '../components/ui/PageHeader';
import ScrollReveal from '../components/ui/ScrollReveal';
import { StaggerContainer, StaggerItem } from '../components/ui/StaggerContainer';
import MagneticButton from '../components/ui/MagneticButton';
import EditorialDivider from '../components/ui/EditorialDivider';

export default function PathfinderPage() {
  const navigate = useNavigate();
  const { missionTarget, updateTarget } = usePlacement();

  const [step1Level, setStep1Level] = useState(missionTarget.level || 'Intermediate');
  const [step2Role, setStep2Role] = useState('Software Development Engineer (SDE-1)');
  const [step3Company, setStep3Company] = useState(missionTarget.company || 'Amazon');
  const [step4Package, setStep4Package] = useState(missionTarget.pkg || '20+ LPA');
  const [step5Language, setStep5Language] = useState(missionTarget.language || 'Python');

  const [isGenerated, setIsGenerated] = useState(true);

  const roles = [
    'Software Development Engineer (SDE-1)',
    'Frontend & Web Systems Engineer',
    'Backend & Distributed Systems Engineer',
    'Data Platform & Analytics Engineer',
    'Cloud & Infrastructure Engineer',
  ];

  const handleGeneratePath = () => {
    updateTarget({
      company: step3Company,
      pkg: step4Package,
      language: step5Language,
      level: step1Level,
    });
    setIsGenerated(true);

    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#5B21B6', '#FACC15', '#7C3AED'],
      });
    } catch {
      // safe fallback
    }
  };

  // Section 17 Visual Nodes:
  // Current Skills → Target Role → Skill Gap → Recommended Skills → Practice Plan → Interview → Ready
  const pathVisualNodes = [
    {
      id: 'n1',
      label: 'Current Skills',
      value: `${step1Level} (${step5Language})`,
      icon: GraduationCap,
      color: '#5B21B6',
      bg: 'bg-[#EDE9FE]',
      info: 'Verified algorithmic baseline, core CS topics, and syntax fluency.',
    },
    {
      id: 'n2',
      label: 'Target Role',
      value: `${step2Role.split('(')[0].trim()}`,
      icon: Briefcase,
      color: '#7C3AED',
      bg: 'bg-[#EDE9FE]',
      info: `Benchmark for entry-to-junior engineering assessments at ${step3Company}.`,
    },
    {
      id: 'n3',
      label: 'Skill Gap',
      value: 'Graphs & High-Concur.',
      icon: AlertCircle,
      color: '#CA8A04',
      bg: 'bg-[#FEF08A]/60',
      info: 'Timed test execution under 30-min limits and shortest path algorithms.',
    },
    {
      id: 'n4',
      label: 'Recommended Skills',
      value: 'Sliding Window & DP',
      icon: Layers,
      color: '#5B21B6',
      bg: 'bg-[#EDE9FE]',
      info: 'Two pointers, sliding window, memoization, and relational SQL queries.',
    },
    {
      id: 'n5',
      label: 'Practice Plan',
      value: '3 Problems / Day',
      icon: BookOpen,
      color: '#16A34A',
      bg: 'bg-emerald-50',
      info: 'Daily target-aligned drills with complexity analysis and timed runs.',
    },
    {
      id: 'n6',
      label: 'Interview',
      value: 'STAR & Mock Defense',
      icon: Award,
      color: '#7C3AED',
      bg: 'bg-[#EDE9FE]',
      info: 'Technical design defense, STAR behavioral responses, and live reasoning.',
    },
    {
      id: 'n7',
      label: 'Ready',
      value: 'Placement Offer',
      icon: Sparkles,
      color: '#FACC15',
      bg: 'bg-[#FEF9C3]',
      info: '>75% readiness score across all sectional dimensions and verified profile.',
    },
  ];

  const [hoveredNodeId, setHoveredNodeId] = useState(null);

  // Structured 7-Stage Career Planning Flow
  const pathfinderStages = [
    {
      id: 'flow-1',
      step: '01',
      title: 'Current Skill Level',
      status: 'Baseline Assessed',
      statusColor: 'text-[#16A34A] bg-emerald-50 border-emerald-200',
      description: `Baseline calibrated at ${step1Level} proficiency in ${step5Language}.`,
      details: ['Data Structures fundamentals verified', 'Syntax fluency confirmed in ' + step5Language, 'Big-O complexity comprehension active'],
    },
    {
      id: 'flow-2',
      step: '02',
      title: 'Target Role',
      status: 'Goal Selected',
      statusColor: 'text-[#854D0E] bg-[#FEF9C3] border-[#FDE047]',
      description: `Targeting ${step2Role} at ${step3Company} (${step4Package}).`,
      details: ['Role benchmark: Entry-level to junior SDE', 'Assessment format: Sectional OA + Technical Rounds', 'Domain requirements: Algorithms & clean code'],
    },
    {
      id: 'flow-3',
      step: '03',
      title: 'Required Skills',
      status: 'Mapped',
      statusColor: 'text-[#5B21B6] bg-[#EDE9FE] border-[#E8E4F0]',
      description: 'Core technical proficiencies required for target assessments.',
      details: ['Advanced Arrays, Two Pointers & Sliding Window', 'Trees, Binary Search Trees & Graph BFS/DFS', 'Dynamic Programming & Memoization', 'DBMS Relational Queries & Operating Systems'],
    },
    {
      id: 'flow-4',
      step: '04',
      title: 'Skill Gaps Identified',
      status: 'Improvement Priority',
      statusColor: 'text-[#D97706] bg-amber-50 border-amber-200',
      description: 'Specific bottlenecks identified based on sample diagnostic data.',
      details: ['Timed test-case execution under 30-min limits', 'Graph shortest path algorithms (Dijkstra)', 'Low-Level Design modularity and class contracts'],
    },
    {
      id: 'flow-5',
      step: '05',
      title: 'Recommended Practice',
      status: 'Active Action',
      statusColor: 'text-[#5B21B6] bg-[#EDE9FE] border-[#E8E4F0]',
      description: 'Daily practice schedule mapped to target assessment patterns.',
      details: ['Solve 3 Arrays & Sliding Window problems daily', 'Attempt 1 Sectional Aptitude & CS MCQ quiz', 'Analyze runtime percentiles and space complexity'],
      action: { label: 'Start Practice', route: '/practice' },
    },
    {
      id: 'flow-6',
      step: '06',
      title: 'Interview Preparation',
      status: 'Upcoming Phase',
      statusColor: 'text-[#5B21B6] bg-[#EDE9FE] border-[#E8E4F0]',
      description: 'Live problem defense, architectural explanation, and STAR behavioral answers.',
      details: ['Technical resume project architecture defense', 'Low-level system design discussion (LRU Cache)', 'STAR format for behavioral situational prompts'],
      action: { label: 'Explore Career Track', route: '/career' },
    },
    {
      id: 'flow-7',
      step: '07',
      title: 'Placement Ready',
      status: 'Target Destination',
      statusColor: 'text-[#16A34A] bg-emerald-50 border-emerald-200',
      description: 'Achieving consistent >75% readiness score across all sectional dimensions.',
      details: ['Consistent passing of proctored OA simulations', 'Comprehensive coding practice portfolio ready', 'Campus drive eligibility readiness complete'],
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 text-left font-sans">
      {/* Page Header standard with BackButton */}
      <PageHeader
        backTo="/dashboard"
        backLabel="Back to Dashboard"
        category="Roadmap Engine"
        title="Pathfinder"
        description="Diagnose your baseline, isolate skill gaps, and execute an algorithmic preparation path."
        actions={
          <MagneticButton
            variant="primary"
            onClick={handleGeneratePath}
            className="px-4 py-2 text-xs font-sans"
          >
            <Sparkles className="w-3.5 h-3.5 mr-1.5 text-[#FACC15]" />
            <span>Generate Pathfinder</span>
          </MagneticButton>
        }
      />

      {/* Section 17: VISUAL SVG PROGRESSION FLOW - YOUR CAREER PATH */}
      <ScrollReveal delay={0.05}>
        <div className="rounded-2xl p-6 sm:p-8 bg-white border border-[#E8E4F0] shadow-sm relative overflow-hidden space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#E8E4F0]">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-sans font-bold uppercase tracking-wider bg-[#EDE9FE] text-[#5B21B6] border border-[#E8E4F0] mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FACC15]" />
                <span>PATHFINDER PROGRESSION MAP</span>
              </div>
              <h3 className="text-xl font-display font-extrabold text-[#18152B]">
                YOUR CAREER PATH
              </h3>
            </div>
            <span className="text-xs font-sans text-[#686477]">
              Target: <strong className="text-[#5B21B6]">{step3Company}</strong> • {step4Package}
            </span>
          </div>

          {/* Connected SVG Path with Traveling Signal Nodes */}
          <div className="relative pt-2 pb-2">
            {/* Desktop Connecting SVG Line */}
            <div className="hidden xl:block absolute top-[44px] left-10 right-10 h-1 bg-[#E8E4F0] z-0 rounded-full overflow-hidden">
              <div className="w-full h-full bg-gradient-to-r from-[#5B21B6] via-[#7C3AED] to-[#FACC15] opacity-60" />
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="w-24 h-full bg-gradient-to-r from-transparent via-[#FACC15] to-transparent rounded-full animate-signal-travel" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-3 relative z-10">
              {pathVisualNodes.map((node, idx) => {
                const Icon = node.icon;
                const isHovered = hoveredNodeId === node.id;
                return (
                  <motion.div
                    key={node.id}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.06 }}
                    onMouseEnter={() => setHoveredNodeId(node.id)}
                    onMouseLeave={() => setHoveredNodeId(null)}
                    className={`p-3.5 rounded-xl border flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                      isHovered
                        ? 'bg-white border-[#7C3AED] scale-105 -translate-y-1.5 shadow-card-hover z-20'
                        : 'bg-[#FAF9FF] border-[#E8E4F0] hover:border-[#7C3AED]/40'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2.5">
                        <div className={`p-2 rounded-lg ${node.bg} shadow-2xs group-hover:scale-110 transition-transform`}>
                          <Icon className="w-4 h-4" style={{ color: node.color }} />
                        </div>
                        <span className="text-[10px] font-mono font-bold text-[#8C889E]">
                          0{idx + 1}
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#686477] block tracking-wide">
                          {node.label}
                        </span>
                        <h4 className="text-xs font-sans font-bold text-[#18152B] mt-0.5 truncate" title={node.value}>
                          {node.value}
                        </h4>
                      </div>

                      {/* Small Hover Information Panel (Section 17) */}
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-2.5 p-2 rounded-lg bg-[#EDE9FE]/60 border border-[#7C3AED]/30 text-[10px] text-[#18152B] leading-tight font-sans"
                        >
                          {node.info}
                        </motion.div>
                      )}
                    </div>

                    <div className="mt-3 pt-2 border-t border-[#E8E4F0] flex items-center justify-between text-[10px]">
                      <span className="text-[#16A34A] font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-[#16A34A]" />
                        <span>Step 0{idx + 1}</span>
                      </span>
                      {idx < pathVisualNodes.length - 1 && (
                        <ArrowRight className="w-3 h-3 text-[#A09CB0] transition-all" />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Target Configuration Panel */}
      <ScrollReveal delay={0.1}>
        <div className="rounded-2xl p-6 bg-white border border-[#E8E4F0] space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#E8E4F0] pb-3">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#5B21B6]" />
              <h3 className="text-xs uppercase tracking-wider text-[#18152B] font-bold">
                Calibrate Your Career Target
              </h3>
            </div>
            <span className="text-xs text-[#6B687A]">5 Configuration Parameters</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 text-xs">
            {/* Step 1: Current Level */}
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase text-[#6B687A] block font-bold">
                1. Current Level
              </label>
              <select
                value={step1Level}
                onChange={(e) => setStep1Level(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#FAF9FF] border border-[#E8E4F0] text-[#18152B] font-medium focus:outline-none focus:border-[#7C3AED] transition-colors cursor-pointer"
              >
                {preparationLevels.map((lvl) => (
                  <option key={lvl} value={lvl}>{lvl}</option>
                ))}
              </select>
            </div>

            {/* Step 2: Target Role */}
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase text-[#6B687A] block font-bold">
                2. Target Role
              </label>
              <select
                value={step2Role}
                onChange={(e) => setStep2Role(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#FAF9FF] border border-[#E8E4F0] text-[#18152B] font-medium focus:outline-none focus:border-[#7C3AED] transition-colors cursor-pointer"
              >
                {roles.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            {/* Step 3: Target Company */}
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase text-[#6B687A] block font-bold">
                3. Target Company
              </label>
              <select
                value={step3Company}
                onChange={(e) => setStep3Company(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#FAF9FF] border border-[#E8E4F0] text-[#18152B] font-medium focus:outline-none focus:border-[#7C3AED] transition-colors cursor-pointer"
              >
                {companyProfiles.map((c) => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Step 4: Package Ceiling */}
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase text-[#6B687A] block font-bold">
                4. Target Package
              </label>
              <select
                value={step4Package}
                onChange={(e) => setStep4Package(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#FAF9FF] border border-[#E8E4F0] text-[#18152B] font-medium focus:outline-none focus:border-[#7C3AED] transition-colors cursor-pointer"
              >
                {packageTiers.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* Step 5: Primary Language */}
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase text-[#6B687A] block font-bold">
                5. Language
              </label>
              <select
                value={step5Language}
                onChange={(e) => setStep5Language(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#FAF9FF] border border-[#E8E4F0] text-[#18152B] font-medium focus:outline-none focus:border-[#7C3AED] transition-colors cursor-pointer"
              >
                {programmingLanguages.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <MagneticButton
              variant="primary"
              onClick={handleGeneratePath}
              className="px-5 py-2.5 text-xs font-sans"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-[#FACC15]" />
              <span>Update Career Roadmap</span>
            </MagneticButton>
          </div>
        </div>
      </ScrollReveal>

      {/* Editorial Accent Divider */}
      <EditorialDivider label="Progression Breakdown" />

      {/* 7-STAGE CLEAN TIMELINE ROADMAP */}
      <ScrollReveal delay={0.14}>
        <div className="space-y-4">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#5B21B6] font-bold block">
              END-TO-END CAREER PREPARATION FLOW
            </span>
            <h2 className="text-xl font-display font-bold text-[#18152B] mt-0.5">
              Sequential Milestone Roadmap
            </h2>
          </div>

          <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#E8E4F0]">
            {pathfinderStages.map((stage, idx) => (
              <div
                key={stage.id}
                className="relative p-5 rounded-2xl bg-white border border-[#E8E4F0] space-y-3 shadow-xs hover:border-[#7C3AED]/40 hover:-translate-y-0.5 hover:shadow-card-hover transition-all"
              >
                {/* Timeline indicator node */}
                <div className="absolute -left-9 sm:-left-10 top-5 w-6 h-6 rounded-full bg-white border-2 border-[#5B21B6] flex items-center justify-center text-[10px] font-bold text-[#5B21B6] shadow-xs">
                  {stage.step}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#E8E4F0]">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#6B687A]">Step {stage.step}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${stage.statusColor}`}>
                        {stage.status}
                      </span>
                    </div>
                    <h3 className="text-base font-display font-bold text-[#18152B] mt-1">
                      {stage.title}
                    </h3>
                  </div>

                  {stage.action && (
                    <MagneticButton
                      variant="primary"
                      onClick={() => navigate(stage.action.route)}
                      className="px-4 py-2 text-xs font-sans self-start sm:self-auto"
                    >
                      <span>{stage.action.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                    </MagneticButton>
                  )}
                </div>

                <p className="text-xs text-[#6B687A]">
                  {stage.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                  {stage.details.map((item, dIdx) => (
                    <div
                      key={dIdx}
                      className="p-2.5 rounded-xl bg-[#FAF9FF] border border-[#E8E4F0] text-xs text-[#18152B] flex items-start gap-2 shadow-2xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0 mt-0.5" />
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
