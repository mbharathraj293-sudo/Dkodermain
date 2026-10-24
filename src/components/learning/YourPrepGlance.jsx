import { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, Zap, Award, CheckCircle2, ArrowRight, Play, Check, RefreshCw, BarChart2 } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

export default function YourPrepGlance({ onContinuePractice }) {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Two Sum & Subarray Sum (Arrays)', category: 'Coding', completed: true },
    { id: 2, title: 'Speed Quants: Work & Time Formulas', category: 'Aptitude', completed: true },
    { id: 3, title: 'SQL Aggregations & Window Queries', category: 'Database', completed: false },
    { id: 4, title: 'Amazon Leadership Principle Rehearsal', category: 'Behavioral', completed: false }
  ]);

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  return (
    <section id="your-prep-glance" className="relative py-20 bg-[#0D1017] border-y border-white/[0.06] overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="STUDENT DASHBOARD PREVIEW"
          title="YOUR PREP AT A"
          highlight="GLANCE"
          subtitle="A high-focus student dashboard providing instant visibility over daily practice, streak telemetry, and your next best action."
        />

        {/* Dashboard Frame */}
        <div className="tech-card rounded-2xl p-6 sm:p-8 border border-white/10 shadow-editorial space-y-6">
          
          {/* Top Bar: Telemetry Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
            {/* Stat 1: Streak */}
            <div className="p-4 rounded-xl bg-[#161922] border border-white/[0.06] flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                <Flame className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Daily Streak</span>
                <span className="text-xl font-display font-extrabold text-white">18 Days</span>
              </div>
            </div>

            {/* Stat 2: XP */}
            <div className="p-4 rounded-xl bg-[#161922] border border-white/[0.06] flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-dkoder-yellow/10 border border-dkoder-yellow/30 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5 text-dkoder-yellow" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Placement XP</span>
                <span className="text-xl font-display font-extrabold text-white">3,850 XP</span>
              </div>
            </div>

            {/* Stat 3: Solved */}
            <div className="p-4 rounded-xl bg-[#161922] border border-white/[0.06] flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Questions Solved</span>
                <span className="text-xl font-display font-extrabold text-white">142 Qs</span>
              </div>
            </div>

            {/* Stat 4: Mock Score */}
            <div className="p-4 rounded-xl bg-[#161922] border border-white/[0.06] flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shrink-0">
                <BarChart2 className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Mock OA Score</span>
                <span className="text-xl font-display font-extrabold text-white">84%</span>
              </div>
            </div>

            {/* Stat 5: Skill Level */}
            <div className="p-4 rounded-xl bg-[#161922] border border-white/[0.06] flex items-center gap-3 col-span-2 lg:col-span-1">
              <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5 text-sky-400" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Skill Level</span>
                <span className="text-sm font-display font-bold text-sky-400">Intermediate Tier-2</span>
              </div>
            </div>
          </div>

          {/* Middle Split: Daily Targets Checklist vs Next Best Action Box */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
            
            {/* Left: Today's Practice Checklist (7 Cols) */}
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono uppercase tracking-wider text-white flex items-center gap-2">
                  <span>Today's Practice Schedule</span>
                  <span className="text-[10px] text-dkoder-yellow font-bold">
                    ({completedCount}/{tasks.length} Completed)
                  </span>
                </h4>
                
                {/* Progress bar */}
                <div className="w-28 sm:w-36 h-2 bg-white/[0.08] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-dkoder-yellow to-emerald-400 transition-all duration-300 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      task.completed
                        ? 'bg-emerald-500/[0.06] border-emerald-500/30 text-slate-300'
                        : 'bg-[#161922] border-white/[0.06] text-white hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                        task.completed ? 'bg-emerald-500 border-emerald-400 text-black' : 'border-white/20 bg-black/40'
                      }`}>
                        {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      <div>
                        <p className={`text-xs sm:text-sm font-medium ${task.completed ? 'line-through text-slate-400' : 'text-white'}`}>
                          {task.title}
                        </p>
                        <span className="text-[10px] font-mono text-slate-500">
                          #{task.category}
                        </span>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono text-slate-500">
                      {task.completed ? 'Completed' : 'Click to Mark'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: NEXT BEST ACTION (5 Cols) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#161922] to-[#1E222D] p-6 rounded-2xl border border-dkoder-yellow/30 flex flex-col justify-between shadow-dkoder-yellow space-y-4">
              <div>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-dkoder-yellow/10 text-dkoder-yellow border border-dkoder-yellow/30 mb-2 inline-block">
                  NEXT BEST ACTION
                </span>

                <h4 className="text-xl font-display font-bold text-white mb-2">
                  Complete Arrays — Medium
                </h4>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Based on your Amazon target and yesterday's performance, solving 2 Sliding Window problems now raises your OA Readiness Index from 84% to 87%.
                </p>
              </div>

              <button
                type="button"
                onClick={onContinuePractice}
                className="w-full py-3 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-dkoder-yellow text-black hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2 shadow-dkoder-yellow cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-black" />
                <span>CONTINUE PRACTICE NOW</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
