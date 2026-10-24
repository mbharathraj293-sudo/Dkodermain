import { motion } from 'framer-motion';
import { Target, ArrowRight, Sparkles } from 'lucide-react';
import MagneticButton from './MagneticButton';

export default function FinalCTA({ onStartJourney, onExploreDkoder }) {
  return (
    <section className="relative py-28 sm:py-36 bg-[#0F1117] overflow-hidden text-center">
      {/* Background radial gradient */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-r from-dkoder-yellow/10 via-dkoder-purple/15 to-transparent blur-[160px] rounded-full" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10 space-y-8">
        {/* Brand Monogram */}
        <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-dkoder-purple to-dkoder-purple-dark p-0.5 shadow-dkoder-yellow flex items-center justify-center">
          <div className="w-full h-full bg-[#0A0C10] rounded-[14px] flex items-center justify-center border border-white/20">
            <span className="font-display font-black text-2xl text-dkoder-yellow">D</span>
          </div>
        </div>

        {/* Exact Competition Prompt Editorial Headline */}
        <div className="space-y-3">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-white leading-tight"
          >
            READY FOR YOUR{' '}
            <span className="bg-gradient-to-r from-dkoder-yellow via-amber-300 to-yellow-500 bg-clip-text text-transparent">
              NEXT OPPORTUNITY?
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base sm:text-lg text-slate-300 font-mono max-w-xl mx-auto leading-relaxed pt-2"
          >
            Your placement journey starts with one target.
          </motion.p>
        </div>

        {/* Action Button: [ START YOUR MISSION → ] */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-3"
        >
          <MagneticButton
            variant="primary"
            onClick={onStartJourney}
            className="px-8 py-4 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-black flex items-center gap-2 shadow-dkoder-yellow"
            ariaLabel="Start Your Placement Mission"
          >
            <span>START YOUR MISSION</span>
            <ArrowRight className="w-4 h-4" />
          </MagneticButton>

          <MagneticButton
            variant="secondary"
            onClick={onExploreDkoder}
            className="px-8 py-4 rounded-xl text-xs font-mono font-semibold text-white flex items-center gap-2"
            ariaLabel="Explore DKoder Modules"
          >
            <Target className="w-4 h-4 text-dkoder-yellow" />
            <span>EXPLORE PLACEMENT PATHS</span>
          </MagneticButton>
        </motion.div>

        {/* Brand Tagline with subtle motion */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="pt-10 border-t border-white/[0.06] max-w-md mx-auto space-y-1.5"
        >
          <span className="font-display font-black text-xl tracking-wider text-white">
            DKODER
          </span>
          <p className="text-xs font-mono font-semibold tracking-widest text-dkoder-yellow uppercase">
            Learn. Compete. Build. Grow.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
