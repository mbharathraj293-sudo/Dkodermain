import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const LOADING_STEPS = [
  'INITIALIZING ECOSYSTEM...',
  'CONNECTING OPPORTUNITIES...',
  'ALIGNING CAMPUS CONSTELLATIONS...',
  'READY'
];

export default function LoadingScreen({ onComplete }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < LOADING_STEPS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setIsDone(true);
            setTimeout(onComplete, 400);
          }, 300);
          return prev;
        }
      });
    }, 380);

    return () => clearInterval(interval);
  }, [onComplete, prefersReducedMotion]);

  if (isDone) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="fixed inset-0 z-50 bg-dkoder-darker flex flex-col items-center justify-center select-none"
      >
        {/* Animated geometric emblem */}
        <div className="relative mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="w-24 h-24 rounded-full border-2 border-dashed border-dkoder-purple-600/40"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-2 rounded-full border border-dkoder-yellow/50"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-dkoder-purple-600 to-black p-0.5 shadow-glow-yellow">
              <div className="w-full h-full bg-dkoder-darker rounded-[14px] flex items-center justify-center border border-white/20">
                <span className="font-display font-black text-2xl text-dkoder-yellow">D</span>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Name */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl sm:text-2xl font-display font-extrabold tracking-widest text-white mb-4"
        >
          DKODER
        </motion.h2>

        {/* Sequence Progress Bar */}
        <div className="w-48 sm:w-64 h-1 bg-white/[0.08] rounded-full overflow-hidden mb-4">
          <motion.div
            className="h-full bg-gradient-to-r from-dkoder-purple-500 via-dkoder-yellow to-amber-300 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${((currentStepIndex + 1) / LOADING_STEPS.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Step Text */}
        <motion.p
          key={currentStepIndex}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          className="text-xs font-mono font-medium tracking-widest text-dkoder-yellow uppercase"
        >
          {LOADING_STEPS[currentStepIndex]}
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}
