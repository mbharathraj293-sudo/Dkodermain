import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const LOADING_STEPS = [
  'INITIALIZING PLACEMENT ARCHIVES...',
  'CALIBRATING COMPANY OA BLUEPRINTS...',
  'SYNCHRONIZING READINESS MATRICES...',
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
            setTimeout(onComplete, 300);
          }, 250);
          return prev;
        }
      });
    }, 320);

    return () => clearInterval(interval);
  }, [onComplete, prefersReducedMotion]);

  if (isDone) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 bg-[#0A0C10] flex flex-col items-center justify-center select-none"
      >
        {/* Editorial Technical Brand Monogram */}
        <div className="relative mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-dkoder-purple to-dkoder-purple-dark p-0.5 shadow-dkoder-yellow flex items-center justify-center">
            <div className="w-full h-full bg-[#0A0C10] rounded-[14px] flex items-center justify-center border border-white/20">
              <span className="font-display font-black text-2xl text-dkoder-yellow">D</span>
            </div>
          </div>
        </div>

        {/* Brand Name */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl font-display font-extrabold tracking-wider text-white">
            DKODER
          </span>
          <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase bg-dkoder-yellow/10 text-dkoder-yellow border border-dkoder-yellow/20">
            PREP OS
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-48 sm:w-60 h-1 bg-white/[0.08] rounded-full overflow-hidden mb-3">
          <motion.div
            className="h-full bg-gradient-to-r from-dkoder-purple via-dkoder-yellow to-amber-300 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${((currentStepIndex + 1) / LOADING_STEPS.length) * 100}%` }}
            transition={{ duration: 0.25 }}
          />
        </div>

        {/* Step Text */}
        <motion.p
          key={currentStepIndex}
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -3 }}
          className="text-[11px] font-mono font-medium tracking-wider text-slate-400 uppercase"
        >
          {LOADING_STEPS[currentStepIndex]}
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}
