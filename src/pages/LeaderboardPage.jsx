import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Trophy,
  Flame,
  ArrowUp,
  ArrowDown,
  Minus,
  Crown,
  Medal,
} from 'lucide-react';
import { leaderboardData } from '../data/leaderboard';
import PageHeader from '../components/ui/PageHeader';

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState('Department'); // 'Global' | 'College' | 'Department' | 'Cohort'
  const [departmentFilter, setDepartmentFilter] = useState('All');

  const tabs = ['Department', 'College', 'Global', 'Cohort'];

  // Top 3 for Podium
  const topThree = [
    leaderboardData[1], // Rank 2 (Priya) Left
    leaderboardData[0], // Rank 1 (Arun) Center
    leaderboardData[2], // Rank 3 (Rahul) Right
  ];

  // Rest of Leaderboard (Rank 4+)
  const restOfList = leaderboardData.slice(3);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 font-sans">
      {/* Standard Page Header */}
      <PageHeader
        backTo="/dashboard"
        backLabel="Back to Dashboard"
        category="Cohort Evaluation"
        title="Department Leaderboard"
        description="Comparative placement readiness rankings, problems solved, and practice streak consistency across cohorts and departments."
        actions={
          <span className="px-3 py-1.5 rounded-xl bg-white text-xs text-[#625F72] font-medium border border-[#E8E4F0] shadow-xs">
            Academic cohort rankings
          </span>
        }
      />

      {/* FILTER TABS: Department, College, Global, Cohort */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer shrink-0 border ${
                  isActive
                    ? 'bg-[#5B21B6] text-white border-[#5B21B6] shadow-xs'
                    : 'bg-white text-[#625F72] hover:text-[#5B21B6] hover:bg-[#FAF9FF] border-[#E8E4F0]'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {activeTab === 'Department' && (
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#625F72] font-bold">Department:</span>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-white border border-[#E8E4F0] text-[#17152B] font-medium focus:outline-none focus:border-[#5B21B6]"
            >
              <option value="All">All Departments</option>
              <option value="CSE">Computer Science & Engineering</option>
              <option value="IT">Information Technology</option>
              <option value="ECE">Electronics & Communication</option>
              <option value="AI&DS">AI & Data Science</option>
            </select>
          </div>
        )}
      </section>

      {/* 01. PODIUM FOR TOP 3 - Clean Academic Styling (Section 19 Specification) */}
      <section className="rounded-2xl p-6 sm:p-10 bg-white border border-[#E8E4F0] shadow-xs">
        <div className="text-center mb-8">
          <span className="text-xs uppercase tracking-wider text-[#5B21B6] font-bold">
            COHORT ACADEMIC STANDING
          </span>
          <h3 className="text-xl sm:text-2xl font-display font-bold text-[#17152B] mt-1">
            Practice Consistency Honors
          </h3>
        </div>

        {/* Podium Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end max-w-4xl mx-auto pt-4">
          {/* #02 Priya (Left) */}
          <div className="flex flex-col items-center order-2 md:order-1">
            <div className="relative mb-3">
              <div className="w-16 h-16 rounded-2xl bg-[#FAF9FF] text-[#17152B] font-bold font-sans flex items-center justify-center text-lg shadow-xs border border-[#E8E4F0]">
                {topThree[0].avatar}
              </div>
              <span className="absolute -top-2.5 -right-2 px-2 py-0.5 rounded-full bg-slate-200 text-[#17152B] font-sans text-[10px] font-bold shadow-xs">
                #02
              </span>
            </div>

            <div className="text-center space-y-1 mb-3">
              <h4 className="font-bold text-[#17152B] text-sm">{topThree[0].name}</h4>
              <p className="text-xs text-[#625F72]">{topThree[0].college}</p>
              <span className="text-xs font-semibold text-[#16A34A] block">{topThree[0].score}</span>
              <span className="text-[11px] text-[#B45309] font-medium">{topThree[0].streak}d Streak</span>
            </div>

            <div className="w-full h-24 bg-[#FAF9FF] rounded-t-2xl border-t border-x border-[#E8E4F0] flex flex-col items-center justify-center p-3">
              <span className="text-xs font-bold text-[#17152B]">2nd Place</span>
              <span className="text-[11px] text-[#625F72]">Cohort Consistency</span>
            </div>
          </div>

          {/* #01 Arun (Center - Elevated with Yellow Medal Accent) */}
          <div className="flex flex-col items-center order-1 md:order-2">
            <div className="relative mb-3">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#FEF9C3] via-[#FDE047] to-[#FACC15] text-[#17152B] font-bold font-sans flex items-center justify-center text-2xl shadow-sm border-2 border-white">
                {topThree[1].avatar}
              </div>
              <span className="absolute -top-3 -right-2.5 px-2.5 py-0.5 rounded-full bg-[#FACC15] text-[#17152B] font-sans text-xs font-bold shadow-xs flex items-center gap-1 border border-[#FDE047]">
                <Crown className="w-3.5 h-3.5 fill-[#17152B]" />
                <span>#01</span>
              </span>
            </div>

            <div className="text-center space-y-1 mb-3">
              <h4 className="font-bold text-[#17152B] text-base">{topThree[1].name}</h4>
              <p className="text-xs text-[#625F72]">{topThree[1].college}</p>
              <span className="text-sm font-bold text-[#5B21B6] block">{topThree[1].score}</span>
              <span className="text-xs text-[#B45309] font-semibold">{topThree[1].streak}d Active Streak</span>
            </div>

            <div className="w-full h-32 bg-[#FAF7FF] rounded-t-2xl border-t-2 border-x border-[#5B21B6]/30 flex flex-col items-center justify-center p-4">
              <div className="flex items-center gap-1 text-xs font-bold text-[#5B21B6]">
                <Medal className="w-4 h-4 text-[#FACC15] fill-[#FACC15]" />
                <span>1st Place</span>
              </div>
              <span className="text-[11px] text-[#625F72]">Cohort Benchmark</span>
            </div>
          </div>

          {/* #03 Rahul (Right) */}
          <div className="flex flex-col items-center order-3 md:order-3">
            <div className="relative mb-3">
              <div className="w-16 h-16 rounded-2xl bg-[#FAF9FF] text-[#17152B] font-bold font-sans flex items-center justify-center text-lg shadow-xs border border-[#E8E4F0]">
                {topThree[2].avatar}
              </div>
              <span className="absolute -top-2.5 -right-2 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-sans text-[10px] font-bold shadow-xs">
                #03
              </span>
            </div>

            <div className="text-center space-y-1 mb-3">
              <h4 className="font-bold text-[#17152B] text-sm">{topThree[2].name}</h4>
              <p className="text-xs text-[#625F72]">{topThree[2].college}</p>
              <span className="text-xs font-semibold text-[#16A34A] block">{topThree[2].score}</span>
              <span className="text-[11px] text-[#B45309] font-medium">{topThree[2].streak}d Streak</span>
            </div>

            <div className="w-full h-20 bg-[#FAF9FF] rounded-t-2xl border-t border-x border-[#E8E4F0] flex flex-col items-center justify-center p-3">
              <span className="text-xs font-bold text-[#17152B]">3rd Place</span>
              <span className="text-[11px] text-[#625F72]">Cohort Consistency</span>
            </div>
          </div>
        </div>
      </section>

      {/* 02. DETAILED LEADERBOARD TABLE (Section 19: Rank, Student, Problems Solved, XP, Streak) */}
      <section className="rounded-2xl border border-[#E8E4F0] bg-white overflow-hidden shadow-xs">
        <div className="p-4 sm:p-5 bg-[#FAF9FF] border-b border-[#E8E4F0] flex items-center justify-between">
          <h4 className="text-xs uppercase tracking-wider text-[#17152B] font-bold">
            Cohort Practice Rankings (Ranks 4–10)
          </h4>
          <span className="text-xs text-[#625F72]">Weekly Activity Refresh</span>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full min-w-[680px] text-left text-xs">
            <thead className="bg-[#FAF9FF] text-[#625F72] uppercase text-[11px] border-b border-[#E8E4F0]">
              <tr>
                <th className="py-3.5 px-4 font-bold">Rank</th>
                <th className="py-3.5 px-4 font-bold">Student</th>
                <th className="py-3.5 px-4 font-bold">Department</th>
                <th className="py-3.5 px-4 font-bold">Problems Solved</th>
                <th className="py-3.5 px-4 font-bold">XP</th>
                <th className="py-3.5 px-4 font-bold">Streak</th>
                <th className="py-3.5 px-4 font-bold">Milestone</th>
                <th className="py-3.5 px-4 text-right font-bold">Movement</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#E8E4F0]">
              {restOfList.map((row, idx) => {
                const isPurpleActive = idx === 0; // Rank 4 highlighted as active student row

                return (
                  <motion.tr
                    key={row.rank}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05, duration: 0.35 }}
                    className={`transition-colors ${
                      isPurpleActive
                        ? 'bg-[#EDE9FE]/50 border-l-4 border-l-[#5B21B6]'
                        : 'hover:bg-[#FAF9FF]'
                    }`}
                  >
                    <td className="py-3.5 px-4 font-bold text-[#18152B]">
                      #{String(row.rank).padStart(2, '0')}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-[#EDE9FE] text-[#5B21B6] font-bold flex items-center justify-center text-[10px] shadow-2xs">
                          {row.avatar}
                        </div>
                        <div>
                          <span className="font-bold text-[#18152B] text-xs block">{row.name}</span>
                          <span className="text-[11px] text-[#6B687A]">{row.college}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-[#625F72] font-medium">
                      {row.department}
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-[#17152B]">
                      {row.problemsSolved || row.score?.split(' ')?.[0] || '128'}
                    </td>

                    <td className="py-3.5 px-4 font-bold text-[#5B21B6]">
                      {row.xp || '2,420 XP'}
                    </td>

                    <td className="py-3.5 px-4 text-[#B45309] font-semibold">
                      {row.streak}d 🔥
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-[#FAF9FF] text-[#625F72] font-medium border border-[#E8E4F0]">
                        {row.badge}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      {row.movement.type === 'up' && (
                        <span className="inline-flex items-center gap-1 text-[#16A34A] font-semibold">
                          <ArrowUp className="w-3 h-3" />
                          <span>{row.movement.value}</span>
                        </span>
                      )}
                      {row.movement.type === 'down' && (
                        <span className="inline-flex items-center gap-1 text-[#DC2626] font-semibold">
                          <ArrowDown className="w-3 h-3" />
                          <span>{row.movement.value}</span>
                        </span>
                      )}
                      {row.movement.type === 'same' && (
                        <span className="inline-flex items-center gap-1 text-[#A09CB0]">
                          <Minus className="w-3 h-3" />
                        </span>
                      )}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
