import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Timer, Zap, CheckCircle2, Play, Flame, Award, ArrowRight, RotateCcw } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

export default function DailyChallenge({ onAttemptChallenge }) {
  const [secondsLeft, setSecondsLeft] = useState(6138); // 01:42:18
  const [isAttempting, setIsAttempting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [xpEarned, setXpEarned] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs) => {
    const h = String(Math.floor(secs / 3600)).padStart(2, '0');
    const m = String(Math.floor((secs % 3600) / 60)).padStart(2, '0');
    const s = String(secs % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const handleCompleteChallenge = () => {
    setIsAttempting(false);
    setIsCompleted(true);
    setXpEarned(true);

    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#FACC15', '#10B981', '#38BDF8', '#FFFFFF']
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <section id="daily-challenge" className="relative py-16 bg-[#0D1017] border-b border-white/[0.06] overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Card */}
        <div className="tech-card rounded-2xl p-6 sm:p-8 border border-dkoder-yellow/40 shadow-editorial relative overflow-hidden">
          {/* Subtle accent glow */}
          <div className="pointer-events-none absolute -top-12 -right-12 w-48 h-48 bg-dkoder-yellow/10 blur-[80px] rounded-full" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left: Challenge Title & Badges (7 Cols) */}
            <div className="lg:col-span-7 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-dkoder-yellow/10 text-dkoder-yellow border border-dkoder-yellow/30 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>TODAY'S CHALLENGE</span>
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Medium
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-400 bg-white/[0.04]">
                  ⏱️ 15 Min Estimated
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                  ARRAY ROTATION BY K POSITIONS
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed mt-1 max-w-xl">
                  Rotate an array of n elements to the right by k steps with strict O(1) extra memory. Tests the triple-reverse array reflection trick.
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono text-slate-400 pt-1">
                <span>Frequently asked in: </span>
                <span className="text-white font-semibold">Amazon SDE-1 • Flipkart Machine Coding</span>
              </div>
            </div>

            {/* Right: Countdown, XP Reward & Interactive Button (5 Cols) */}
            <div className="lg:col-span-5 bg-[#161922] p-6 rounded-xl border border-white/[0.06] flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 block mb-0.5">
                    Time Remaining Today
                  </span>
                  <div className="flex items-center gap-2 text-xl sm:text-2xl font-mono font-bold text-white">
                    <Timer className="w-5 h-5 text-dkoder-yellow animate-pulse" />
                    <span>{formatTime(secondsLeft)}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block mb-0.5">
                    Bounty Reward
                  </span>
                  <span className="text-xl font-display font-black text-dkoder-yellow flex items-center justify-end gap-1">
                    <Zap className="w-4 h-4 fill-dkoder-yellow text-dkoder-yellow" />
                    <span>+120 XP</span>
                  </span>
                </div>
              </div>

              {/* State CTA */}
              {!isAttempting && !isCompleted && (
                <button
                  type="button"
                  onClick={() => setIsAttempting(true)}
                  className="w-full py-3 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-dkoder-yellow text-black hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2 shadow-dkoder-yellow cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-black" />
                  <span>ATTEMPT CHALLENGE</span>
                </button>
              )}

              {isAttempting && (
                <div className="space-y-2">
                  <div className="p-2.5 rounded-lg bg-white/[0.04] text-[11px] font-mono text-slate-300 flex items-center justify-between">
                    <span>Challenge in progress...</span>
                    <span className="text-dkoder-yellow">Evaluating O(1) Memory</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleCompleteChallenge}
                      className="flex-1 py-2.5 rounded-lg text-xs font-mono font-bold uppercase bg-emerald-500 hover:bg-emerald-400 text-black transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>SUBMIT SOLUTION</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAttempting(false)}
                      className="px-3 py-2.5 rounded-lg text-xs font-mono bg-white/[0.05] text-slate-400 hover:text-white transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {isCompleted && (
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Challenge Completed! +120 XP Added</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCompleted(false);
                      setSecondsLeft(6138);
                    }}
                    className="text-[10px] text-slate-400 underline hover:text-white"
                  >
                    Reset
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
