import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Flame,
  Zap,
  Timer,
  CheckCircle2,
  Award,
  ArrowRight,
  Play,
  Trophy,
} from 'lucide-react';
import { usePlacement } from '../context/PlacementContext';
import PageHeader from '../components/ui/PageHeader';

export default function ChallengesPage() {
  const { streak, xp, completeDailyChallenge, dailyChallengeCompleted } = usePlacement();

  const [secondsLeft, setSecondsLeft] = useState(6138); // 01:42:18
  const [isAttemptingDaily, setIsAttemptingDaily] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs) => {
    const h = String(Math.floor(secs / 3600)).padStart(2, '0');
    const m = String(Math.floor((secs % 3600) / 60)).padStart(2, '0');
    const s = String(secs % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const handleCompleteSprint = () => {
    completeDailyChallenge();
    setIsAttemptingDaily(false);

    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#5B21B6', '#FACC15', '#16A34A', '#8B5CF6'],
      });
    } catch {
      // safe fallback
    }
  };

  // Section 18: Today's, Weekly, Company, Coding, Aptitude Challenges
  const challengesList = [
    {
      id: 'weekly',
      section: 'Weekly Challenge',
      title: 'Design In-Memory LRU Cache',
      difficulty: 'Medium',
      time: '45 min',
      learningFocus: 'System Design & Complexity',
      achievement: '+240 XP Benchmark',
      participants: '1,420 Completed',
      desc: 'Implement LRU eviction policy with strict O(1) get() and put() time complexity using doubly-linked list & hash table.',
    },
    {
      id: 'company',
      section: 'Company Challenge',
      title: 'Target Assessment Algorithmic Set',
      difficulty: 'Medium-Hard',
      time: '60 min',
      learningFocus: 'Target Pattern Reinforcement',
      achievement: '+300 XP Benchmark',
      participants: '890 Registered',
      desc: 'Two algorithmic problems tagged from standard preliminary placement assessments to simulate real test conditions.',
    },
    {
      id: 'coding',
      section: 'Coding Challenge',
      title: 'Dynamic Programming Grid Path Optimization',
      difficulty: 'Medium',
      time: '35 min',
      learningFocus: 'Memoization & 2D DP',
      achievement: '+160 XP Benchmark',
      participants: '980 Completed',
      desc: 'Calculate the minimum path sum in an m x n grid with non-negative numbers using optimal bottom-up tabulation.',
    },
    {
      id: 'aptitude',
      section: 'Aptitude Challenge',
      title: 'Quantitative Reasoning & Probability',
      difficulty: 'Easy-Medium',
      time: '25 min',
      learningFocus: 'Permutations & Speed Math',
      achievement: '+120 XP Benchmark',
      participants: '1,150 Completed',
      desc: 'Timed practice set covering Bayes theorem, conditional probability, and speed arithmetic under strict sectional limits.',
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 font-sans">
      {/* Standard Page Header */}
      <PageHeader
        backTo="/dashboard"
        backLabel="Back to Dashboard"
        category="Skill Evaluation"
        title="Challenges & Assessments"
        description="Structured, timed problem-solving assessments to sharpen problem breakdown, speed, and placement readiness."
        actions={
          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 rounded-xl bg-white border border-[#E8E4F0] text-xs text-[#17152B] flex items-center gap-2 shadow-xs">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Streak: <strong className="text-[#17152B] font-bold">{streak} days</strong></span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-[#EDE5FF] border border-[#D8C7FF] text-xs text-[#5B21B6] font-bold flex items-center gap-1.5 shadow-xs">
              <Zap className="w-3.5 h-3.5 fill-[#FACC15] text-[#FACC15]" />
              <span>{xp} XP</span>
            </div>
          </div>
        }
      />

      {/* 01. FEATURED CHALLENGE OF THE DAY (Section 20 Specification) */}
      <section className="rounded-2xl p-6 sm:p-8 border border-[#E8E4F0] hover:border-[#7C3AED]/40 relative overflow-hidden bg-white shadow-xs hover:shadow-card-hover transition-all duration-300 group">
        {/* Animated Moving Yellow Accent (Section 20) */}
        <div className="absolute top-0 left-0 w-28 group-hover:w-full h-1 bg-gradient-to-r from-[#FACC15] via-[#FEF08A] to-[#7C3AED] transition-all duration-500 rounded-t-2xl shadow-[0_0_10px_rgba(250,204,21,0.5)]" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-2">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase bg-[#FEF08A]/60 text-[#854D0E] border border-[#FDE047] flex items-center gap-1.5 shadow-2xs">
                <Flame className="w-3.5 h-3.5 fill-[#FACC15] text-[#CA8A04]" />
                <span>Challenge of the Day</span>
              </span>
              <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                Medium
              </span>
              <span className="px-2 py-0.5 rounded text-xs font-medium text-[#6B687A] bg-[#FAF9FF] border border-[#E8E4F0]">
                Topic: Arrays & In-Place
              </span>
              <span className="px-2 py-0.5 rounded text-xs font-medium text-[#6B687A] bg-[#FAF9FF] border border-[#E8E4F0]">
                Est. Time: 15 min
              </span>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-[#18152B] group-hover:text-[#5B21B6] transition-colors">
                Array Rotation (In-Place Reflection)
              </h2>
              <p className="text-xs sm:text-sm text-[#6B687A] leading-relaxed mt-1 max-w-xl font-sans">
                Given an integer array nums, rotate the array to the right by k steps. Implement in-place with O(1) auxiliary memory using 3-step array reversal.
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs text-[#6B687A] pt-1">
              <span>Learning Objective: </span>
              <span className="text-[#18152B] font-semibold">Memory optimization & algorithmic symmetry</span>
            </div>
          </div>

          {/* Right Action Box */}
          <div className="lg:col-span-5 bg-[#FAF9FF] p-6 rounded-2xl border border-[#E8E4F0] flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] uppercase text-[#6B687A] block mb-0.5 font-bold">
                  Remaining Today
                </span>
                <div className="flex items-center gap-2 text-xl sm:text-2xl font-mono font-bold text-[#18152B]">
                  <Timer className="w-5 h-5 text-[#5B21B6]" />
                  <span>{formatTime(secondsLeft)}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[11px] uppercase text-[#6B687A] block mb-0.5 font-bold">
                  Reward Benchmark
                </span>
                <span className="text-lg font-display font-bold text-[#5B21B6] flex items-center justify-end gap-1 font-sans">
                  <Zap className="w-4 h-4 fill-[#FACC15] text-[#FACC15]" />
                  <span>+120 XP</span>
                </span>
              </div>
            </div>

            {/* Daily Challenge Action Lifecycle */}
            {!isAttemptingDaily && !dailyChallengeCompleted && (
              <button
                type="button"
                onClick={() => setIsAttemptingDaily(true)}
                className="w-full py-3 rounded-xl text-xs font-semibold bg-[#5B21B6] hover:bg-[#4C1D95] text-white transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-[0.98] hover:-translate-y-0.5"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Attempt Challenge of the Day</span>
              </button>
            )}

            {isAttemptingDaily && (
              <div className="space-y-2">
                <div className="p-2.5 rounded-lg bg-white border border-[#E8E4F0] text-xs text-[#18152B] flex items-center justify-between font-mono">
                  <span>Evaluating code in workspace...</span>
                  <span className="text-[#5B21B6] font-bold">O(1) Memory</span>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleCompleteSprint}
                    className="flex-1 py-2.5 rounded-lg text-xs font-semibold bg-[#5B21B6] hover:bg-[#4C1D95] text-white transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Submit Solution</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAttemptingDaily(false)}
                    className="px-3 py-2.5 rounded-lg text-xs bg-white text-[#6B687A] hover:text-[#18152B] border border-[#E8E4F0] transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {dailyChallengeCompleted && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                  <div>
                    <span className="font-bold block">+120 XP Awarded</span>
                    <span className="text-[11px] text-emerald-700">Challenge Completed • Streak: {streak} days</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 02. WEEKLY, COMPANY, CODING & APTITUDE CHALLENGES */}
      <section className="space-y-4">
        <h3 className="text-base font-display font-bold text-[#17152B] flex items-center gap-2">
          <Trophy className="w-4 h-4 text-[#5B21B6]" />
          <span>Curated Learning Challenges</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {challengesList.map((ch) => (
            <div
              key={ch.id}
              className="rounded-2xl p-6 bg-white border border-[#E8E4F0] hover:border-[#D8C7FF] hover:-translate-y-0.5 transition-all flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#EDE5FF] text-[#5B21B6] border border-[#D8C7FF]">
                    {ch.section}
                  </span>
                  {/* Yellow accent only for achievement highlights */}
                  <span className="text-xs font-bold text-[#854D0E] bg-[#FEF9C3] px-2 py-0.5 rounded border border-[#FDE047]">
                    {ch.achievement}
                  </span>
                </div>

                <h4 className="text-base font-display font-bold text-[#17152B] mb-2">
                  {ch.title}
                </h4>
                <p className="text-xs text-[#625F72] leading-relaxed mb-4 font-sans">
                  {ch.desc}
                </p>

                <div className="flex items-center justify-between text-xs text-[#625F72] mb-4 bg-[#FAF9FF] p-2.5 rounded-xl border border-[#E8E4F0]">
                  <span>{ch.time}</span>
                  <span className="font-semibold text-[#17152B]">{ch.difficulty}</span>
                  <span className="font-sans text-[11px] font-medium">{ch.participants}</span>
                </div>
              </div>

              {/* Purple for action buttons */}
              <button
                type="button"
                onClick={() => handleCompleteSprint()}
                className="w-full py-2.5 rounded-xl text-xs font-semibold bg-[#5B21B6] hover:bg-[#4C1D95] text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-[0.98]"
              >
                <span>Start Challenge</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
