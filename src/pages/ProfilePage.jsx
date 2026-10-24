import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Zap,
  Flame,
  CheckCircle2,
  ArrowRight,
  Edit3,
  Award,
  BookOpen,
  Target,
  Briefcase,
  GraduationCap,
} from 'lucide-react';
import { usePlacement } from '../context/PlacementContext';
import { opportunities } from '../data/opportunities';
import PageHeader from '../components/ui/PageHeader';
import CountUp from '../components/ui/CountUp';
import MagneticButton from '../components/ui/MagneticButton';
import ScrollReveal from '../components/ui/ScrollReveal';

export default function ProfilePage() {
  const navigate = useNavigate();
  const {
    user,
    missionTarget,
    readiness,
    xp,
    streak,
    problemsSolved,
    mockTestsCompleted,
    savedOpportunities,
  } = usePlacement();

  const [activeTab, setActiveTab] = useState('skills'); // 'skills' | 'activity' | 'career' | 'saved'

  const skillInventory = [
    { name: 'Data Structures & Algorithms', level: 'Advanced', problems: '64 solved', proficiency: 82 },
    { name: 'Python Language Fluency', level: 'Advanced', problems: '45 solved', proficiency: 88 },
    { name: 'Database Systems & SQL', level: 'Intermediate', problems: '22 solved', proficiency: 72 },
    { name: 'Operating Systems & Concurrency', level: 'Intermediate', problems: '18 solved', proficiency: 70 },
    { name: 'Quantitative Aptitude & Logic', level: 'Intermediate', problems: '30 solved', proficiency: 68 },
    { name: 'System Design & Object Modeling', level: 'Foundational', problems: '12 solved', proficiency: 58 },
  ];

  const recentHistory = [
    { action: 'Solved Two Sum with O(N) Hash Map', xp: '+40 XP', date: 'Today, 2:30 PM', topic: 'Arrays' },
    { action: 'Completed Daily Challenge: Array Rotation', xp: '+120 XP', date: 'Yesterday, 6:15 PM', topic: 'In-Place Reflection' },
    { action: 'Attempted Sectional Aptitude Simulation', xp: '+80 XP', date: '2 days ago', topic: 'Speed Quants' },
    { action: 'Configured Selected Target: Amazon 20+ LPA', xp: '+50 XP', date: '3 days ago', topic: 'Mission Goal' },
    { action: 'Solved Course Schedule II with Topological Sort', xp: '+60 XP', date: '4 days ago', topic: 'Graphs' },
  ];

  const savedList = opportunities.filter((o) => savedOpportunities.includes(o.id));

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 font-sans">
      {/* Standard Page Header */}
      <PageHeader
        backTo="/dashboard"
        backLabel="Back to Dashboard"
        category="Student Account"
        title="Student Profile"
        description="Academic credentials, target placement goals, practice statistics, and skills portfolio."
        actions={
          <button
            type="button"
            onClick={() => navigate('/settings')}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-[#FAF9FF] text-[#17152B] hover:text-[#5B21B6] border border-[#E8E4F0] transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <Edit3 className="w-3.5 h-3.5 text-[#5B21B6]" />
            <span>Edit Preferences</span>
          </button>
        }
      />

      {/* 01. PROFILE SUMMARY CARD (Section 22 Specification) */}
      <section className="rounded-2xl p-6 sm:p-8 bg-white border border-[#E8E4F0] shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#EDE5FF] to-[#D8C7FF] text-[#5B21B6] font-bold font-display flex items-center justify-center text-2xl shadow-xs shrink-0 border border-[#D8C7FF]">
              {user.avatar}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-display font-bold text-[#17152B]">
                  {user.name}
                </h2>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Active Candidate
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#625F72]">
                {user.department} • {user.college}
              </p>

              <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs">
                <span className="px-2.5 py-0.5 rounded-lg bg-[#FAF9FF] text-[#17152B] border border-[#E8E4F0]">
                  Target Role: <strong className="text-[#5B21B6]">SDE-1</strong>
                </span>
                <span className="px-2.5 py-0.5 rounded-lg bg-[#FAF9FF] text-[#17152B] border border-[#E8E4F0]">
                  Target Company: <strong className="text-[#5B21B6]">{missionTarget.company}</strong>
                </span>
                <span className="px-2.5 py-0.5 rounded-lg bg-[#FAF9FF] text-[#17152B] border border-[#E8E4F0]">
                  Target Package: <strong className="text-[#16A34A]">{missionTarget.pkg}</strong>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 23: Animated Profile Progress Line (Profile → Skills → Practice → Career Target → Ready) */}
        <div className="pt-6 mt-6 border-t border-[#E8E4F0]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-sans uppercase font-bold text-[#5B21B6] tracking-wider">
              Profile Verification & Readiness Progression
            </span>
            <span className="text-xs font-sans text-[#16A34A] font-bold">
              80% Profile Milestones Active
            </span>
          </div>

          <div className="relative pt-2 pb-2">
            {/* Desktop Connecting Line */}
            <div className="hidden sm:block absolute top-[28px] left-8 right-8 h-1 bg-[#E8E4F0] z-0 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '80%' }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="h-full bg-gradient-to-r from-[#FACC15] via-[#5B21B6] to-[#7C3AED]"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 relative z-10">
              {[
                { stage: 'Profile', status: 'Completed', color: '#FACC15', step: 1 },
                { stage: 'Skills', status: 'Completed', color: '#FACC15', step: 2 },
                { stage: 'Practice', status: 'In Progress', color: '#5B21B6', isCurrent: true, step: 3 },
                { stage: 'Career Target', status: 'Mapped', color: '#5B21B6', step: 4 },
                { stage: 'Ready', status: 'Upcoming', color: '#8C889E', step: 5 },
              ].map((p) => (
                <div
                  key={p.stage}
                  className={`p-3 rounded-xl border flex flex-col justify-between transition-all ${
                    p.isCurrent
                      ? 'bg-[#EDE9FE]/70 border-[#7C3AED] shadow-xs'
                      : p.status === 'Completed'
                      ? 'bg-[#FFFBEB]/60 border-[#FACC15]'
                      : 'bg-white border-[#E8E4F0]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        p.status === 'Completed'
                          ? 'bg-[#FACC15] text-[#18152B]'
                          : p.isCurrent
                          ? 'bg-[#5B21B6] text-white'
                          : 'bg-[#E8E4F0] text-[#686477]'
                      }`}
                    >
                      {p.status === 'Completed' ? '✓' : p.step}
                    </span>
                    <span className="text-[10px] font-mono font-semibold text-[#686477]">
                      {p.status}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#18152B]">{p.stage}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 02. ANIMATED STATISTICS BAR (Section 13 Specification) */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-6 mt-6 border-t border-[#E8E4F0]">
          <div className="p-3.5 rounded-xl bg-[#FAF9FF] border border-[#E8E4F0] text-center">
            <span className="text-[11px] uppercase text-[#6B687A] block mb-0.5 font-bold">Practice XP</span>
            <span className="text-xl font-display font-extrabold text-[#5B21B6] flex items-center justify-center gap-1 font-sans">
              <Zap className="w-4 h-4 fill-[#FACC15] text-[#FACC15]" />
              <CountUp to={xp} />
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FAF9FF] border border-[#E8E4F0] text-center">
            <span className="text-[11px] uppercase text-[#6B687A] block mb-0.5 font-bold">Consecutive Streak</span>
            <span className="text-xl font-display font-extrabold text-[#B45309] flex items-center justify-center gap-1 font-sans">
              <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
              <CountUp to={streak} suffix=" Days" />
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FAF9FF] border border-[#E8E4F0] text-center">
            <span className="text-[11px] uppercase text-[#6B687A] block mb-0.5 font-bold">Problems Solved</span>
            <span className="text-xl font-display font-extrabold text-[#18152B] font-sans">
              <CountUp to={problemsSolved} />
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FAF9FF] border border-[#E8E4F0] text-center">
            <span className="text-[11px] uppercase text-[#6B687A] block mb-0.5 font-bold">Mock Tests</span>
            <span className="text-xl font-display font-extrabold text-[#5B21B6] font-sans">
              <CountUp to={mockTestsCompleted} suffix=" Taken" />
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FAF9FF] border border-[#E8E4F0] text-center col-span-2 sm:col-span-1">
            <span className="text-[11px] uppercase text-[#6B687A] block mb-0.5 font-bold">Placement Readiness</span>
            <span className="text-xl font-display font-extrabold text-[#16A34A] font-sans">
              <CountUp to={readiness.overall} suffix="%" />
            </span>
          </div>
        </div>
      </section>

      {/* 03. TABS: Skills & Capabilities, Recent Activity, Career Track, Saved Opportunities */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b border-[#E8E4F0] pb-3 overflow-x-auto custom-scrollbar">
          {[
            { id: 'skills', label: 'Skills & Proficiency', count: skillInventory.length },
            { id: 'activity', label: 'Recent Activity', count: recentHistory.length },
            { id: 'career', label: 'Target Track', count: 'Active' },
            { id: 'saved', label: 'Saved Opportunities', count: savedList.length },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer shrink-0 flex items-center gap-2 border ${
                  isActive
                    ? 'bg-[#5B21B6] text-white border-[#5B21B6] shadow-xs'
                    : 'bg-white text-[#625F72] hover:text-[#5B21B6] hover:bg-[#FAF9FF] border-[#E8E4F0]'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                  isActive ? 'bg-white/20 text-white' : 'bg-[#FAF9FF] text-[#625F72] border border-[#E8E4F0]'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Skills & Proficiency */}
        {activeTab === 'skills' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skillInventory.map((s, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-[#E8E4F0] hover:border-[#D8C7FF] hover:-translate-y-0.5 transition-all space-y-3 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-[#17152B]">{s.name}</h4>
                  <span className="text-[11px] font-bold text-[#16A34A]">{s.proficiency}%</span>
                </div>

                <div className="w-full h-2 bg-[#E8E4F0] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[#5B21B6] rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.proficiency}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: idx * 0.05 }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-[#625F72]">
                  <span>Level: <strong className="text-[#17152B] font-semibold">{s.level}</strong></span>
                  <span className="font-semibold text-[#5B21B6]">{s.problems}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Recent Activity */}
        {activeTab === 'activity' && (
          <div className="rounded-2xl border border-[#E8E4F0] bg-white divide-y divide-[#E8E4F0] shadow-xs overflow-hidden">
            {recentHistory.map((item, idx) => (
              <div key={idx} className="p-4 flex items-center justify-between text-xs hover:bg-[#FAF9FF] transition-colors">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                  <div>
                    <span className="text-[#17152B] font-semibold block">{item.action}</span>
                    <span className="text-[11px] text-[#625F72]">Domain: {item.topic}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[#5B21B6] font-bold block">{item.xp}</span>
                  <span className="text-[11px] text-[#625F72]">{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Career Track Summary */}
        {activeTab === 'career' && (
          <div className="rounded-2xl p-6 bg-white border border-[#E8E4F0] space-y-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E4F0]">
              <div>
                <span className="text-xs uppercase text-[#5B21B6] font-bold">Active Selected Track</span>
                <h4 className="text-lg font-display font-bold text-[#17152B]">Product Companies Preparation Pack</h4>
              </div>
              <button
                type="button"
                onClick={() => navigate('/career')}
                className="text-xs font-semibold text-[#5B21B6] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Switch Track</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-xs text-[#625F72] leading-relaxed">
              Targeting product engineering assessments (Amazon SDE-1, Microsoft, Atlassian). Practice focus concentrated on data structures, algorithmic complexity, and standard problem patterns.
            </p>

            <div className="p-3.5 rounded-xl bg-[#FAF9FF] border border-[#E8E4F0] flex items-center justify-between text-xs">
              <span className="text-[#625F72]">Roadmap Phase:</span>
              <span className="text-[#16A34A] font-bold">Phase 2: Algorithms & Core Architecture (78% Complete)</span>
            </div>
          </div>
        )}

        {/* Tab 4: Saved Opportunities */}
        {activeTab === 'saved' && (
          <div>
            {savedList.length === 0 ? (
              <div className="p-8 text-center text-[#625F72] text-xs bg-white rounded-2xl border border-[#E8E4F0]">
                No opportunities saved yet. Explore the Active Opportunities board!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedList.map((opp) => (
                  <div
                    key={opp.id}
                    className="p-5 rounded-2xl bg-white border border-[#E8E4F0] hover:border-[#D8C7FF] hover:-translate-y-0.5 transition-all flex flex-col justify-between shadow-xs"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#EDE5FF] text-[#5B21B6] border border-[#D8C7FF]">
                          {opp.type}
                        </span>
                        <span className="text-xs font-bold text-[#16A34A]">{opp.compensation}</span>
                      </div>
                      <h4 className="text-base font-display font-bold text-[#17152B] mb-1">{opp.title}</h4>
                      <p className="text-xs text-[#625F72] mb-2">Organized by {opp.organizer}</p>
                    </div>

                    <div className="pt-3 border-t border-[#E8E4F0] flex items-center justify-between text-xs">
                      <span className="text-[#625F72]">{opp.daysLeft}d remaining</span>
                      <button
                        type="button"
                        onClick={() => navigate('/opportunities')}
                        className="font-bold text-[#5B21B6] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
