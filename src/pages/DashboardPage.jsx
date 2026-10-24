import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Target,
  ArrowRight,
  Zap,
  CheckCircle2,
  Flame,
  Code2,
  Calendar,
  AlertTriangle,
  Sparkles,
  ChevronRight,
  Clock,
  Award,
  BookOpen,
  TrendingUp,
} from 'lucide-react';
import { usePlacement } from '../context/PlacementContext';
import { practiceQuestions } from '../data/questions';
import CareerSignal from '../components/ui/CareerSignal';
import ScrollReveal from '../components/ui/ScrollReveal';
import { StaggerContainer, StaggerItem } from '../components/ui/StaggerContainer';
import CountUp from '../components/ui/CountUp';
import MagneticButton from '../components/ui/MagneticButton';
import EditorialDivider from '../components/ui/EditorialDivider';
import FloatingCareerSignals from '../components/ui/FloatingCareerSignals';
import AuroraCard from '../components/ui/AuroraCard';

export default function DashboardPage() {
  const navigate = useNavigate();
  const {
    user,
    missionTarget,
    readiness,
    xp,
    streak,
    dailyChallengeCompleted,
  } = usePlacement();

  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (readiness.overall / 100) * circumference;

  // Track animation completion for readiness ring glow (Section 14)
  const [isRingAnimating, setIsRingAnimating] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsRingAnimating(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  // Section 13: Readiness Breakdown (Coding 78%, Aptitude 65%, Core CS 71%, Interview 68%)
  const readinessBreakdown = [
    { label: 'Coding Practice', score: 78, isCurrentFocus: true, color: '#FACC15', desc: 'Syntax fluency & algorithmic patterns' },
    { label: 'Aptitude & Logic', score: 65, isCurrentFocus: false, color: '#5B21B6', desc: 'Quantitative, logical reasoning & core MCQs' },
    { label: 'Core CS Fundamentals', score: 71, isCurrentFocus: false, color: '#5B21B6', desc: 'OS, DBMS, Networks & System Design basics' },
    { label: 'Interview & Mock Tests', score: 68, isCurrentFocus: false, color: '#7C3AED', desc: 'Timed sectional assessments & speed' },
  ];

  // Section 14: 4 Animated Statistics (128, 42, 18.5h, 7 Day Streak)
  const statCards = [
    {
      label: 'Questions Solved',
      numericValue: 128,
      suffix: '',
      decimals: 0,
      trend: '+12 this week',
      icon: BookOpen,
      iconBg: 'bg-[#EDE9FE] text-[#5B21B6]',
      trendColor: 'text-[#16A34A]',
    },
    {
      label: 'Coding Problems',
      numericValue: 42,
      suffix: '',
      decimals: 0,
      trend: '+5 this week',
      icon: Code2,
      iconBg: 'bg-[#FEF9C3] text-[#854D0E]',
      trendColor: 'text-[#16A34A]',
    },
    {
      label: 'Practice Hours',
      numericValue: 18.5,
      suffix: 'h',
      decimals: 1,
      trend: '+4.5h this week',
      icon: Clock,
      iconBg: 'bg-[#EDE9FE] text-[#5B21B6]',
      trendColor: 'text-[#16A34A]',
    },
    {
      label: 'Current Streak',
      numericValue: 7,
      suffix: ' Day Streak',
      decimals: 0,
      trend: 'Active momentum',
      icon: Flame,
      iconBg: 'bg-amber-100 text-amber-700',
      trendColor: 'text-amber-700 font-semibold',
    },
  ];

  const recentActivity = [
    { id: 1, action: 'Solved Two Sum', detail: 'Selected Target Practice Problem', xp: '+40 XP', time: '2 hours ago', icon: Code2, iconColor: 'text-[#16A34A]' },
    { id: 2, action: 'Completed Daily Challenge', detail: 'Array In-Place Rotation', xp: '+120 XP', time: 'Yesterday', icon: Flame, iconColor: 'text-amber-600' },
    { id: 3, action: 'Completed Aptitude Test', detail: 'Sectional Score: 78%', xp: '+80 XP', time: '2 days ago', icon: CheckCircle2, iconColor: 'text-[#5B21B6]' },
    { id: 4, action: 'Career Milestone Progress', detail: 'Product Companies Track Phase 2', xp: '+150 XP', time: '3 days ago', icon: Award, iconColor: 'text-[#7C3AED]' },
  ];

  const recommendedQuestions = practiceQuestions.slice(0, 3);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 font-sans relative">
      {/* 01. Hero Section - DKoder Aurora Editorial (Section 5 & 6 & 8) */}
      <section className="relative space-y-4 pt-1">
        {/* Floating Career Signals around Hero (Section 8) */}
        <FloatingCareerSignals />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2 max-w-2xl">
            {/* Command Center Label Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-sans uppercase font-bold tracking-wider bg-[#EDE9FE] text-[#5B21B6] border border-[#E8E4F0]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FACC15] animate-pulse" />
              <span>PLACEMENT COMMAND CENTER</span>
            </div>

            {/* Editorial Greeting & Main Hero Heading */}
            <div className="space-y-1">
              <p className="text-sm font-sans font-medium text-[#686477]">
                Good morning, {user.name || 'Bharath'}.
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-[#18152B] leading-[1.12]">
                Build your path.{' '}
                <span className="text-[#5B21B6]">Prepare</span> with{' '}
                <span className="relative inline-block text-[#18152B]">
                  purpose.
                  <span className="absolute -bottom-1 left-0 right-0 h-1.5 bg-[#FACC15]/60 -z-10 rounded-full" />
                </span>
              </h1>
            </div>

            {/* Subheading (Section 5) */}
            <p className="text-xs sm:text-sm text-[#686477] pt-0.5">
              Your preparation plan, practice activity and career progress — in one place.
            </p>

            {/* Thin Animated Career Signal Line (Section 4 & 5 & 6) */}
            <div className="pt-2 max-w-md">
              <CareerSignal activeStep={2} showLabels={false} />
            </div>
          </div>

          {/* Quick Metrics Badges */}
          <div className="flex items-center gap-2.5 self-start sm:self-auto shrink-0">
            <span className="px-3.5 py-2 rounded-xl bg-white border border-[#E8E4F0] text-xs font-sans text-[#18152B] flex items-center gap-2 shadow-xs">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="font-bold">{streak}-Day Streak</span>
            </span>
            <span className="px-3.5 py-2 rounded-xl bg-[#EDE9FE] border border-[#E8E4F0] text-xs font-sans font-bold text-[#5B21B6] flex items-center gap-2 shadow-xs">
              <Zap className="w-4 h-4 text-[#FACC15] fill-[#FACC15]" />
              <span>{xp} XP</span>
            </span>
          </div>
        </div>

        {/* Section 9 & 10 & 31: ANIMATED PLACEMENT MISSION (Hero Centerpiece with Aurora Card effect) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <AuroraCard className="rounded-2xl p-6 sm:p-8 bg-white border border-[#E8E4F0] shadow-[0_4px_20px_-2px_rgba(91,33,182,0.06)] hover:border-[#7C3AED]/40 hover:-translate-y-1 hover:shadow-[0_12px_28px_-4px_rgba(91,33,182,0.12)] transition-all duration-300 relative overflow-hidden group">
            {/* Subtle Aurora Ambient Radial Behind Card */}
            <div className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-[#EDE9FE] via-[#7C3AED]/10 to-transparent rounded-full blur-3xl opacity-60" />
            <div className="pointer-events-none absolute -bottom-16 right-1/4 w-48 h-48 bg-gradient-to-tr from-[#FEF08A]/30 to-transparent rounded-full blur-2xl opacity-40" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
              {/* Left Placement Mission Content */}
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-sans font-bold uppercase tracking-wider bg-[#EDE9FE] text-[#5B21B6] border border-[#E8E4F0]">
                    YOUR PLACEMENT MISSION
                  </span>
                  <span className="text-xs font-sans text-[#686477]">Target Career Milestone</span>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-[#18152B] tracking-tight">
                    {missionTarget.company || 'Amazon'}{' '}
                    <span className="text-[#16A34A] font-sans text-2xl sm:text-3xl font-bold">
                      • {missionTarget.pkg || '20+ LPA'}
                    </span>
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 pt-3 text-xs font-sans">
                    <span className="bg-[#FAF9FF] text-[#18152B] px-3 py-1.5 rounded-lg border border-[#E8E4F0] font-medium">
                      Language: <strong className="text-[#5B21B6]">{missionTarget.language || 'Python'}</strong>
                    </span>
                    <span className="bg-[#FAF9FF] text-[#18152B] px-3 py-1.5 rounded-lg border border-[#E8E4F0] font-medium">
                      Level: <strong className="text-[#5B21B6]">{missionTarget.level || 'Intermediate'}</strong>
                    </span>
                    <span className="bg-[#FAF9FF] text-[#18152B] px-3 py-1.5 rounded-lg border border-[#E8E4F0] font-medium">
                      Role: <strong className="text-[#5B21B6]">SDE-1</strong>
                    </span>
                  </div>
                </div>

                {/* Career Signal Milestone Line: Foundation → Practice → Company Prep → Mock → Interview */}
                <div className="pt-1 max-w-lg">
                  <CareerSignal activeStep={2} showLabels={true} />
                </div>

                {/* CTA Buttons with Magnetic Button Micro-interactions (Section 11 & 12) */}
                <div className="pt-3 flex flex-wrap items-center gap-3">
                  <MagneticButton
                    variant="primary"
                    onClick={() => navigate('/mission')}
                    className="px-5 py-2.5 text-xs font-sans"
                  >
                    <span>Continue Mission</span>
                    <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </MagneticButton>

                  <MagneticButton
                    variant="secondary"
                    onClick={() => navigate('/mission')}
                    className="px-4 py-2.5 text-xs font-sans"
                  >
                    Configure Target
                  </MagneticButton>
                </div>
              </div>

              {/* Right Readiness Ring Metric (Section 13 & 14) */}
              <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-[#FAF9FF] rounded-2xl border border-[#E8E4F0] shadow-xs">
                <div className="relative w-36 h-36 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 140 140">
                    {/* Purple Base Track */}
                    <circle
                      cx="70"
                      cy="70"
                      r={radius}
                      stroke="#EDE9FE"
                      strokeWidth="11"
                      fill="none"
                    />
                    {/* Yellow Progress Stroke with Temporary Glow */}
                    <motion.circle
                      cx="70"
                      cy="70"
                      r={radius}
                      stroke="#FACC15"
                      strokeWidth="11"
                      strokeDasharray={circumference}
                      initial={{ strokeDashoffset: circumference }}
                      animate={{ strokeDashoffset }}
                      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                      strokeLinecap="round"
                      fill="none"
                      style={{
                        filter: isRingAnimating
                          ? 'drop-shadow(0 0 8px rgba(250, 204, 21, 0.6))'
                          : 'none',
                        transition: 'filter 0.5s ease',
                      }}
                    />
                  </svg>

                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-3xl font-display font-extrabold text-[#18152B]">
                      <CountUp to={readiness.overall} suffix="%" duration={1.4} />
                    </span>
                    <span className="text-[10px] font-sans uppercase font-bold text-[#5B21B6] flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FACC15]" />
                      <span>Readiness</span>
                    </span>
                  </div>
                </div>

                <span className="text-xs font-sans font-bold text-[#16A34A] mt-2.5">
                  Status: {readiness.status}
                </span>
                <span className="text-[11px] text-[#686477] text-center mt-0.5 font-sans">
                  Placement Readiness Assessment
                </span>
              </div>
            </div>
          </AuroraCard>
        </motion.div>
      </section>

      {/* Section 11 & 12: YOUR NEXT BEST ACTION (Smart Action System) */}
      <ScrollReveal delay={0.05}>
        <div className="p-5 rounded-2xl bg-white border border-[#E8E4F0] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden hover:border-[#7C3AED]/30 hover:scale-[1.005] transition-all duration-200 group">
          {/* Yellow indicator travels along the left border on hover (Section 12) */}
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#FACC15] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

          <div className="flex items-start sm:items-center gap-3.5 pl-1">
            <div className="p-2.5 rounded-xl bg-[#EDE9FE] text-[#5B21B6] border border-[#E8E4F0] shrink-0 group-hover:scale-105 transition-transform">
              <Zap className="w-5 h-5 text-[#FACC15] fill-[#FACC15]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-sans uppercase font-bold tracking-wider text-[#5B21B6]">
                  YOUR NEXT BEST ACTION
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-sans bg-[#FAF9FF] text-[#686477] border border-[#E8E4F0]">
                  Recommended • 15 min • Coding
                </span>
              </div>
              <h3 className="text-base font-display font-bold text-[#18152B] mt-0.5">
                Strengthen Array Problem Solving
              </h3>
              <p className="text-xs text-[#686477] font-sans">
                Complete 3 focused problems to continue your current preparation path.
              </p>
            </div>
          </div>

          <MagneticButton
            variant="primary"
            onClick={() => navigate('/practice?topic=Arrays')}
            className="px-5 py-2.5 text-xs font-sans shrink-0"
          >
            <span>Start Practice</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
          </MagneticButton>
        </div>
      </ScrollReveal>

      {/* Section 14: STATS SECTION - 4 Clean Cards with Animated Statistics */}
      <ScrollReveal delay={0.1}>
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <StaggerItem key={i}>
                <div className="rounded-2xl p-5 bg-white border border-[#E8E4F0] shadow-xs hover:border-[#7C3AED]/40 hover:-translate-y-1 hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-xl ${stat.iconBg}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className={`text-[11px] font-sans font-medium ${stat.trendColor} flex items-center gap-1`}>
                      <TrendingUp className="w-3 h-3" />
                      <span>{stat.trend}</span>
                    </span>
                  </div>

                  <div>
                    <span className="text-2xl sm:text-3xl font-display font-extrabold text-[#18152B] block">
                      <CountUp to={stat.numericValue} decimals={stat.decimals || 0} suffix={stat.suffix} />
                    </span>
                    <span className="text-xs font-sans text-[#686477] font-medium mt-0.5 block">
                      {stat.label}
                    </span>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </ScrollReveal>

      {/* Editorial Accent Divider */}
      <EditorialDivider label="Preparedness Pathways" />

      {/* 04. 4 Interactive Feature Tiles */}
      <ScrollReveal delay={0.12}>
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Today's Challenge */}
          <StaggerItem>
            <div
              onClick={() => navigate('/challenges')}
              className="rounded-2xl p-5 bg-white border border-[#E8E4F0] hover:border-[#7C3AED]/40 hover:-translate-y-1 hover:shadow-card-hover transition-all duration-200 cursor-pointer group flex flex-col justify-between shadow-xs h-full"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-0.5 rounded text-[11px] font-sans font-semibold uppercase bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
                    <Flame className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <span>Challenge of the Day</span>
                  </span>
                  <span className="text-xs font-sans font-bold text-[#854D0E] bg-[#FEF9C3] px-1.5 py-0.5 rounded">+120 XP</span>
                </div>

                <h4 className="text-sm font-sans font-bold text-[#18152B] group-hover:text-[#5B21B6] transition-colors">
                  Array Rotation (In-Place)
                </h4>
                <p className="text-xs text-[#6B687A] mt-1 line-clamp-2">
                  Rotate an array of n elements right by k steps with O(1) auxiliary space.
                </p>
              </div>

              <div className="pt-3 border-t border-[#E8E4F0] flex items-center justify-between text-xs font-sans mt-3">
                <span className="text-[#6B687A]">Duration: 15 min</span>
                <span className="text-[#5B21B6] font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>{dailyChallengeCompleted ? 'Completed ✓' : 'Attempt'}</span>
                  <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </StaggerItem>

          {/* Card 2: Continue Coding */}
          <StaggerItem>
            <div
              onClick={() => navigate('/coding')}
              className="rounded-2xl p-5 bg-white border border-[#E8E4F0] hover:border-[#7C3AED]/40 hover:-translate-y-1 hover:shadow-card-hover transition-all duration-200 cursor-pointer group flex flex-col justify-between shadow-xs h-full"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-0.5 rounded text-[11px] font-sans font-semibold uppercase bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                    <Code2 className="w-3 h-3 text-emerald-600" />
                    <span>Coding Workspace</span>
                  </span>
                  <span className="text-xs font-sans text-[#6B687A]">Python</span>
                </div>

                <h4 className="text-sm font-sans font-bold text-[#18152B] group-hover:text-[#5B21B6] transition-colors">
                  Two Sum Problem
                </h4>
                <p className="text-xs text-[#6B687A] mt-1 line-clamp-2">
                  In-progress solution saved. 2 of 3 test cases currently passing.
                </p>
              </div>

              <div className="pt-3 border-t border-[#E8E4F0] flex items-center justify-between text-xs font-sans mt-3">
                <span className="text-[#6B687A]">In-Browser IDE</span>
                <span className="text-[#5B21B6] font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Resume IDE</span>
                  <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </StaggerItem>

          {/* Card 3: Upcoming Mock */}
          <StaggerItem>
            <div
              onClick={() => navigate('/practice?tab=Mock')}
              className="rounded-2xl p-5 bg-white border border-[#E8E4F0] hover:border-[#7C3AED]/40 hover:-translate-y-1 hover:shadow-card-hover transition-all duration-200 cursor-pointer group flex flex-col justify-between shadow-xs h-full"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-0.5 rounded text-[11px] font-sans font-semibold uppercase bg-[#EDE9FE] text-[#5B21B6] border border-[#E8E4F0] flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>Practice Mock</span>
                  </span>
                  <span className="text-xs font-sans text-[#6B687A]">Sunday</span>
                </div>

                <h4 className="text-sm font-sans font-bold text-[#18152B] group-hover:text-[#5B21B6] transition-colors">
                  Timed Assessment Simulation
                </h4>
                <p className="text-xs text-[#6B687A] mt-1 line-clamp-2">
                  90-minute practice simulation focused on sectional cutoffs and algorithmic accuracy.
                </p>
              </div>

              <div className="pt-3 border-t border-[#E8E4F0] flex items-center justify-between text-xs font-sans mt-3">
                <span className="text-[#6B687A]">10:00 AM IST</span>
                <span className="text-[#5B21B6] font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>View Details</span>
                  <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </StaggerItem>

          {/* Card 4: Current Streak & Rank */}
          <StaggerItem>
            <div
              onClick={() => navigate('/leaderboard')}
              className="rounded-2xl p-5 bg-white border border-[#E8E4F0] hover:border-[#7C3AED]/40 hover:-translate-y-1 hover:shadow-card-hover transition-all duration-200 cursor-pointer group flex flex-col justify-between shadow-xs h-full"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-0.5 rounded text-[11px] font-sans font-semibold uppercase bg-[#FEF9C3] text-[#854D0E] border border-[#FDE047] flex items-center gap-1">
                    <Award className="w-3 h-3 text-[#B45309]" />
                    <span>Consistency</span>
                  </span>
                  <span className="text-xs font-sans font-bold text-[#16A34A]">#04 Cohort</span>
                </div>

                <h4 className="text-sm font-sans font-bold text-[#18152B] group-hover:text-[#5B21B6] transition-colors">
                  {streak} Days Active Streak
                </h4>
                <p className="text-xs text-[#6B687A] mt-1 line-clamp-2">
                  Maintain consistent practice to build steady placement preparation momentum.
                </p>
              </div>

              <div className="pt-3 border-t border-[#E8E4F0] flex items-center justify-between text-xs font-sans mt-3">
                <span className="text-[#6B687A]">Cohort Ranking</span>
                <span className="text-[#5B21B6] font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Leaderboard</span>
                  <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </ScrollReveal>

      {/* Section 13: PLACEMENT READINESS SECTION (Professional Visualization) */}
      <ScrollReveal delay={0.15}>
        <div className="rounded-2xl p-6 sm:p-8 bg-white border border-[#E8E4F0] space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8E4F0]">
            <div>
              <span className="text-[11px] font-sans uppercase tracking-wider text-[#5B21B6] font-bold">
                DIAGNOSTIC ASSESSMENT
              </span>
              <h3 className="text-xl font-display font-bold text-[#18152B]">
                Placement Readiness Breakdown
              </h3>
            </div>

            {/* Center Placement Readiness Indicator */}
            <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-[#FAF9FF] border border-[#E8E4F0] self-start sm:self-auto">
              <span className="text-2xl font-display font-extrabold text-[#5B21B6]">
                <CountUp to={74} suffix="%" />
              </span>
              <div className="text-left">
                <span className="text-[10px] font-sans font-bold uppercase text-[#18152B] block leading-none">
                  Placement Readiness
                </span>
                <span className="text-[10px] text-[#686477] font-medium block mt-0.5">
                  Overall Benchmark Score
                </span>
              </div>
            </div>
          </div>

          {/* Color Key Guide: Purple = overall progress, Yellow = current focus, Gray = remaining */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-[#686477] pb-1">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#5B21B6]" />
              <span>Overall Progress</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FACC15] ring-2 ring-[#FEF08A]" />
              <span className="font-semibold text-[#18152B]">Current Focus (Coding)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E8E4F0]" />
              <span>Remaining</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {readinessBreakdown.map((item, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border space-y-2.5 transition-colors ${
                  item.isCurrentFocus
                    ? 'bg-[#FFFBEB]/70 border-[#FACC15] shadow-xs'
                    : 'bg-[#FAF9FF] border-[#E8E4F0] hover:border-[#7C3AED]/30'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#18152B] flex items-center gap-1.5">
                    {item.isCurrentFocus && (
                      <span className="w-2 h-2 rounded-full bg-[#FACC15] ring-1 ring-[#FEF08A]" />
                    )}
                    {item.label}
                  </span>
                  <span
                    className={`font-sans font-bold text-sm ${
                      item.isCurrentFocus ? 'text-[#854D0E]' : 'text-[#5B21B6]'
                    }`}
                  >
                    <CountUp to={item.score} suffix="%" />
                  </span>
                </div>

                {/* Progress Bar with Purple / Yellow vs Gray Remaining */}
                <div className="w-full h-2.5 bg-[#E8E4F0] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.score}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.1 + idx * 0.1, ease: 'easeOut' }}
                    style={{ backgroundColor: item.color }}
                  />
                </div>

                <p className="text-[11px] text-[#686477] leading-snug font-sans">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Priority Improvement Area */}
          <div className="p-4 rounded-xl bg-[#FFFBEB] border border-[#FDE047] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-sans font-semibold uppercase bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 text-amber-700" />
                  <span>Improvement Recommendation</span>
                </span>
                <span className="text-xs font-sans font-bold text-amber-800">61% Score</span>
              </div>
              <h4 className="text-sm font-sans font-bold text-[#18152B]">
                Mock Assessments: Time Management Under Sectional Limits
              </h4>
              <p className="text-xs text-[#6B687A]">
                Practice timed sectional simulations to increase solution speed under assessment constraints.
              </p>
            </div>

            <MagneticButton
              variant="secondary"
              onClick={() => navigate('/practice?tab=Mock')}
              className="px-4 py-2.5 text-xs font-sans shrink-0"
            >
              <span>Review Practice Mode</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
            </MagneticButton>
          </div>
        </div>
      </ScrollReveal>

      {/* 05. Split Section: RECENT ACTIVITY & RECOMMENDED FOR YOU */}
      <ScrollReveal delay={0.18}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Recent Activity */}
          <div className="lg:col-span-6 rounded-2xl p-6 bg-white border border-[#E8E4F0] space-y-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E4F0]">
              <h3 className="text-base font-display font-bold text-[#18152B] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#5B21B6]" />
                <span>Recent Activity</span>
              </h3>
              <span className="text-xs font-sans text-[#6B687A]">Last 72 hours</span>
            </div>

            <div className="space-y-3">
              {recentActivity.map((act) => {
                const Icon = act.icon;
                return (
                  <div
                    key={act.id}
                    className="p-3 rounded-xl bg-[#FAF9FF] border border-[#E8E4F0] flex items-center justify-between gap-3 text-xs hover:border-[#7C3AED]/30 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2 rounded-lg bg-white border border-[#E8E4F0] shrink-0">
                        <Icon className={`w-4 h-4 ${act.iconColor}`} />
                      </div>
                      <div className="min-w-0">
                        <span className="font-semibold text-[#18152B] block truncate">{act.action}</span>
                        <span className="text-[11px] text-[#6B687A] block truncate">{act.detail}</span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-sans font-bold text-[#5B21B6] block">{act.xp}</span>
                      <span className="text-[11px] text-[#6B687A]">{act.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Recommended For You */}
          <div className="lg:col-span-6 rounded-2xl p-6 bg-white border border-[#E8E4F0] space-y-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E4F0]">
              <h3 className="text-base font-display font-bold text-[#18152B] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#5B21B6]" />
                <span>Recommended Practice</span>
              </h3>
              <button
                type="button"
                onClick={() => navigate('/practice')}
                className="text-xs font-sans font-semibold text-[#5B21B6] hover:text-[#7C3AED] hover:underline cursor-pointer"
              >
                View All Questions →
              </button>
            </div>

            <div className="space-y-3">
              {recommendedQuestions.map((q) => (
                <div
                  key={q.id}
                  onClick={() => navigate('/coding')}
                  className="p-3.5 rounded-xl bg-[#FAF9FF] hover:bg-[#EDE9FE]/40 border border-[#E8E4F0] hover:border-[#7C3AED]/40 transition-colors cursor-pointer flex items-center justify-between group"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-sans font-bold uppercase bg-white border border-[#E8E4F0] text-[#5B21B6]">
                        {q.company}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-sans font-semibold ${
                        q.difficulty === 'Medium' ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'
                      }`}>
                        {q.difficulty}
                      </span>
                      <span className="text-[11px] font-sans text-[#6B687A]">
                        {q.topic}
                      </span>
                    </div>
                    <h4 className="text-xs font-sans font-bold text-[#18152B] group-hover:text-[#5B21B6] transition-colors">
                      {q.title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-sans font-semibold text-[#16A34A]">{q.packageTier}</span>
                    <ChevronRight className="w-4 h-4 text-[#8C889E] group-hover:text-[#5B21B6] group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
