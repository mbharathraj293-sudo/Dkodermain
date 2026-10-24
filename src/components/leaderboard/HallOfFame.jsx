import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Flame, CheckCircle2, Zap, Medal, Filter, ArrowUpRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { topThreePodium, leaderboardRows, leaderboardTimeframes, leaderboardDepartments } from '../../data/leaderboard';

export default function HallOfFame() {
  const [timeframe, setTimeframe] = useState('All Time');
  const [department, setDepartment] = useState('All Departments');

  return (
    <section id="leaderboard" className="relative py-24 sm:py-28 bg-[#0A0C10] overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="CAMPUS EXCELLENCE"
          title="HALL OF"
          highlight="FAME"
          subtitle="Top collegiate problem solvers ranked by verified XP, daily practice streaks, and company mock performance."
        />

        {/* Filter Controls Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-4 border-b border-white/[0.08]">
          {/* Department Filter */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-3.5 h-3.5 text-dkoder-yellow shrink-0" />
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-[#161922] border border-white/10 text-xs font-mono text-slate-200 focus:outline-none focus:border-dkoder-yellow cursor-pointer"
            >
              {leaderboardDepartments.map((dept) => (
                <option key={dept} value={dept} className="bg-[#161922] text-white">
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Timeframe Switcher */}
          <div className="flex items-center bg-[#161922] p-1 rounded-lg border border-white/[0.06] self-end sm:self-auto">
            {leaderboardTimeframes.map((tf) => (
              <button
                key={tf}
                type="button"
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1 rounded-md text-xs font-mono transition-all cursor-pointer ${
                  timeframe === tf
                    ? 'bg-dkoder-yellow text-black font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Top 3 Podium Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {topThreePodium.map((podium) => {
            const isFirst = podium.rank === 1;

            return (
              <motion.div
                key={podium.rank}
                whileHover={{ y: -4 }}
                className={`tech-card rounded-2xl p-6 border transition-all flex flex-col justify-between relative shadow-editorial ${
                  isFirst
                    ? 'border-dkoder-yellow/50 bg-gradient-to-b from-[#1E222D] to-[#12151D] md:-translate-y-2'
                    : 'border-white/10'
                }`}
              >
                {/* Crown / Rank Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-7 h-7 rounded-full font-mono font-bold text-xs flex items-center justify-center text-black"
                      style={{ backgroundColor: podium.accentColor }}
                    >
                      #{podium.rank}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                      {podium.badge}
                    </span>
                  </div>

                  <span className="text-2xl">{podium.avatar}</span>
                </div>

                <div>
                  <h4 className="text-lg font-display font-bold text-white mb-0.5">
                    {podium.name}
                  </h4>
                  <span className="text-xs font-mono text-dkoder-yellow block mb-2">
                    {podium.handle} • {podium.college}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 block mb-4">
                    {podium.department}
                  </span>

                  <div className="p-3 rounded-xl bg-[#161922] border border-white/[0.04] grid grid-cols-3 gap-2 text-center text-xs font-mono">
                    <div>
                      <span className="text-[9px] text-slate-500 uppercase block">XP</span>
                      <strong className="text-white">{podium.xp.toLocaleString()}</strong>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-500 uppercase block">Streak</span>
                      <strong className="text-amber-400 flex items-center justify-center gap-0.5">
                        <Flame className="w-3 h-3 fill-amber-400" />
                        <span>{podium.streak}d</span>
                      </strong>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-500 uppercase block">Solved</span>
                      <strong className="text-emerald-400">{podium.solved}</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/[0.06] mt-4 text-[10px] font-mono text-slate-400 truncate">
                  🏆 {podium.recentWin}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Animated Table Rows (Ranks 4 - 8) */}
        <div className="tech-card rounded-2xl border border-white/10 overflow-hidden shadow-editorial">
          <div className="p-4 bg-[#12151D] border-b border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-400 uppercase">
            <span>Ranks 4 — 8 Placement Squad</span>
            <span>Live Campus XP Telemetry</span>
          </div>

          <div className="divide-y divide-white/[0.04]">
            {leaderboardRows.map((row) => (
              <div
                key={row.rank}
                className="p-4 hover:bg-white/[0.02] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 text-center font-mono font-bold text-slate-500">
                    #{row.rank}
                  </span>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">{row.name}</span>
                      <span className="text-[10px] font-mono text-slate-400">{row.handle}</span>
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-white/[0.05] text-dkoder-yellow border border-white/10">
                        {row.badge}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      {row.college} • {row.department}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-6 font-mono text-xs pl-9 sm:pl-0">
                  <div>
                    <span className="text-slate-500 text-[10px] block sm:hidden">XP:</span>
                    <strong className="text-white">{row.xp.toLocaleString()} XP</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block sm:hidden">Streak:</span>
                    <span className="text-amber-400 font-bold">{row.streak} Days</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block sm:hidden">Solved:</span>
                    <span className="text-emerald-400 font-bold">{row.solved} Qs</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-[#12151D] border-t border-white/[0.06] text-center text-[11px] font-mono text-slate-500">
            Leaderboard rankings update every 6 hours based on verified in-browser problem submissions and proctored mock OA scores.
          </div>
        </div>
      </div>
    </section>
  );
}
