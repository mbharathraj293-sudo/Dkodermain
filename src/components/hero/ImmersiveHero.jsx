import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, Orbit, ChevronRight, Activity } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';
import Universe2DFallback from './Universe2DFallback';

const OpportunityUniverse = lazy(() => import('./OpportunityUniverse'));

export default function ImmersiveHero({ onOpenPathfinder, onExploreUniverse }) {
  const handleScrollToLearn = () => {
    const el = document.querySelector('#learn');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen pt-24 pb-16 flex flex-col justify-center overflow-hidden">
      {/* Background Gradients & Ambient Lighting */}
      <div className="pointer-events-none absolute inset-0 cosmic-radial-bg" />
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-dkoder-purple-600/10 blur-[140px] rounded-full" />
      <div className="pointer-events-none absolute top-1/3 left-1/3 w-[350px] h-[350px] bg-dkoder-yellow/5 blur-[120px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          
          {/* Left Column: Headline, Copy & CTAs (7 cols) */}
          <div className="lg:col-span-7 text-left space-y-6 pt-4 lg:pt-0">
            {/* Live Ecosystem Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-dkoder-yellow/30 bg-dkoder-yellow/5 backdrop-blur-md text-xs font-mono text-dkoder-yellow shadow-glow-yellow"
            >
              <Activity className="w-3.5 h-3.5 animate-pulse text-dkoder-yellow" />
              <span className="font-semibold tracking-wider uppercase">DKODER ECOSYSTEM v2.0 • LIVE</span>
            </motion.div>

            {/* Main Punchy Cinematic Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-1"
            >
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-white leading-[1.08]">
                <span>LEARN. </span>
                <span className="bg-gradient-to-r from-dkoder-yellow via-amber-300 to-yellow-500 bg-clip-text text-transparent">
                  COMPETE.
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-dkoder-purple-300 to-white bg-clip-text text-transparent">
                  BUILD.
                </span>
                <span> GROW.</span>
              </h1>
            </motion.div>

            {/* Supporting Copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg lg:text-xl text-slate-300 font-normal max-w-xl leading-relaxed"
            >
              The intelligent student ecosystem where structured learning, high-stakes hackathons, production software, and campus chapters collide into a single connected universe.
            </motion.p>

            {/* Interactive CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3.5 pt-2"
            >
              <MagneticButton
                variant="primary"
                onClick={handleScrollToLearn}
                className="px-6 py-3.5 rounded-xl text-sm font-bold flex items-center gap-2 text-black shadow-glow-yellow"
                ariaLabel="Explore the Ecosystem"
              >
                <Orbit className="w-4 h-4" />
                <span>EXPLORE THE ECOSYSTEM</span>
                <ChevronRight className="w-4 h-4" />
              </MagneticButton>

              <MagneticButton
                variant="secondary"
                onClick={onOpenPathfinder}
                className="px-6 py-3.5 rounded-xl text-sm font-semibold flex items-center gap-2"
                ariaLabel="Find Your Path"
              >
                <Sparkles className="w-4 h-4 text-dkoder-yellow" />
                <span>FIND YOUR PATH</span>
              </MagneticButton>
            </motion.div>

            {/* Quick Metrics Ticker */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-6 border-t border-white/[0.08] grid grid-cols-3 gap-4 max-w-lg"
            >
              <div>
                <p className="text-xl sm:text-2xl font-display font-bold text-white">54,000+</p>
                <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">Active Students</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-display font-bold text-dkoder-yellow">$180k+</p>
                <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">Mission Bounties</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-display font-bold text-white">450+</p>
                <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">Campus Nodes</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: 3D Opportunity Universe Scene (5 cols) */}
          <div className="lg:col-span-5 relative w-full flex items-center justify-center">
            <Suspense fallback={<Universe2DFallback onNodeSelect={onExploreUniverse} />}>
              <OpportunityUniverse onNodeSelect={onExploreUniverse} />
            </Suspense>
          </div>

        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        onClick={handleScrollToLearn}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer text-slate-500 hover:text-dkoder-yellow transition-colors group select-none"
      >
        <span className="text-[10px] font-mono uppercase tracking-widest group-hover:text-dkoder-yellow transition-colors">
          Scroll Into Ecosystem
        </span>
        <ArrowDown className="w-4 h-4 text-dkoder-yellow animate-bounce" />
      </motion.div>
    </section>
  );
}
