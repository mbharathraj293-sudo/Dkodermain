import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Orbit } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';

export default function FinalCTA({ onOpenPathfinder, onExploreUniverse }) {
  return (
    <section className="relative py-28 sm:py-36 bg-dkoder-darker overflow-hidden text-center">
      {/* Background Reconnecting Universe Orbitals SVG */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <svg className="w-[800px] h-[800px] opacity-25" viewBox="0 0 600 600">
          <circle cx="300" cy="300" r="120" stroke="#7E3AF2" strokeWidth="1" strokeDasharray="4 6" fill="none" className="animate-spin-slow" />
          <circle cx="300" cy="300" r="200" stroke="#FACC15" strokeWidth="1" strokeDasharray="6 8" fill="none" style={{ animationDirection: 'reverse' }} className="animate-spin-slow" />
          <circle cx="300" cy="300" r="270" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="3 7" fill="none" className="animate-spin-slow" />
        </svg>
      </div>

      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-dkoder-yellow/5 blur-[160px] rounded-full" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10 space-y-8">
        {/* Emblem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-dkoder-purple-600 via-dkoder-purple-900 to-black p-0.5 shadow-glow-yellow flex items-center justify-center"
        >
          <div className="w-full h-full bg-dkoder-darker rounded-[14px] flex items-center justify-center border border-white/20">
            <span className="font-display font-black text-2xl text-dkoder-yellow">D</span>
          </div>
        </motion.div>

        {/* Cinematic Headline */}
        <div className="space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-white leading-tight"
          >
            YOUR NEXT OPPORTUNITY{' '}
            <span className="bg-gradient-to-r from-dkoder-yellow via-amber-300 to-yellow-500 bg-clip-text text-transparent">
              IS WAITING.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-xl text-slate-300 font-mono tracking-wide"
          >
            Learn something. Build something. Compete. Grow.
          </motion.p>
        </div>

        {/* Dual Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-4"
        >
          <MagneticButton
            variant="primary"
            onClick={onOpenPathfinder}
            className="px-8 py-4 rounded-xl text-sm font-bold text-black flex items-center gap-2 shadow-glow-yellow"
            ariaLabel="Launch Pathfinder Engine"
          >
            <Sparkles className="w-4 h-4 text-black" />
            <span>FIND YOUR PATH NOW</span>
            <ArrowRight className="w-4 h-4" />
          </MagneticButton>

          <MagneticButton
            variant="secondary"
            onClick={onExploreUniverse}
            className="px-8 py-4 rounded-xl text-sm font-semibold flex items-center gap-2"
            ariaLabel="Return to Top Universe"
          >
            <Orbit className="w-4 h-4 text-dkoder-yellow" />
            <span>RETURN TO UNIVERSE</span>
          </MagneticButton>
        </motion.div>

        {/* Small Ecosystem Guarantee badge */}
        <div className="pt-8 text-xs font-mono text-slate-400">
          <span>Always open-access for students worldwide • Built for competitive engineers</span>
        </div>
      </div>
    </section>
  );
}
