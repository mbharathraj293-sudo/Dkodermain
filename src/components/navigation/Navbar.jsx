import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, ArrowRight, Target, Code2, Sparkles } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';

export default function Navbar({ onOpenSearch, onOpenPathfinder }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Learn', href: '#learning-modules' },
    { name: 'Practice', href: '#practice-code' },
    { name: 'Career Tracks', href: '#career-tracks' },
    { name: 'Companies', href: '#filter-future' },
    { name: 'Hackathons', href: '#hackathons' },
    { name: 'Projects', href: '#projects' },
    { name: 'Campuses', href: '#campus-perspectives' },
    { name: 'Leaderboard', href: '#leaderboard' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0A0C10]/90 backdrop-blur-md border-b border-white/[0.08] py-3 shadow-editorial'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* DKoder Placement Brand Logo */}
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-dkoder-yellow rounded-lg"
              aria-label="DKoder Placement Readiness Home"
            >
              <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-dkoder-purple to-dkoder-purple-dark p-0.5 shadow-subtle group-hover:shadow-dkoder-yellow transition-all duration-300">
                <div className="w-full h-full bg-[#0A0C10] rounded-[6px] flex items-center justify-center border border-white/10">
                  <span className="font-display font-black text-base text-dkoder-yellow">
                    D
                  </span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-dkoder-yellow rounded-full" />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-bold text-base tracking-wider text-white group-hover:text-dkoder-yellow transition-colors">
                    DKODER
                  </span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-semibold uppercase bg-dkoder-yellow/10 text-dkoder-yellow border border-dkoder-yellow/20">
                    PREP
                  </span>
                </div>
                <span className="text-[10px] font-mono tracking-wider text-dkoder-softGray uppercase -mt-0.5">
                  Placement Readiness OS
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1 bg-[#12151D] border border-white/[0.08] px-3 py-1.5 rounded-full shadow-subtle">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-3 py-1 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-full transition-all duration-200"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Right Action Elements */}
            <div className="flex items-center gap-2.5">
              {/* Search / Command Center Trigger */}
              <button
                type="button"
                onClick={onOpenSearch}
                aria-label="Open DKoder Command Center"
                className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-300 bg-[#161922] hover:bg-[#1E222D] border border-white/10 hover:border-dkoder-yellow/40 rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-dkoder-yellow"
              >
                <Search className="w-3.5 h-3.5 text-dkoder-yellow" />
                <span className="hidden sm:inline">Command Center</span>
                <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono font-bold text-slate-400 bg-black/40 rounded border border-white/10">
                  {isMac ? '⌘K' : 'Ctrl K'}
                </kbd>
              </button>

              {/* Primary CTA */}
              <MagneticButton
                variant="primary"
                onClick={onOpenPathfinder}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold"
                ariaLabel="Find Your Prep Path"
              >
                <Target className="w-3.5 h-3.5 text-black" />
                <span>Find Your Path</span>
              </MagneticButton>

              {/* Mobile Hamburger Toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className="xl:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-dkoder-yellow"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[60px] z-30 p-4 xl:hidden"
          >
            <div className="tech-card rounded-2xl p-5 border border-white/15 shadow-2xl flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="flex items-center justify-between p-2.5 rounded-xl text-xs font-medium text-slate-200 hover:text-white hover:bg-white/[0.08] transition-colors border border-white/[0.04]"
                  >
                    <span>{link.name}</span>
                    <span className="text-[10px] text-dkoder-yellow">→</span>
                  </a>
                ))}
              </div>

              <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSearch();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.06] text-xs text-slate-200 font-medium hover:bg-white/[0.1] transition-colors"
                >
                  <Search className="w-3.5 h-3.5 text-dkoder-yellow" />
                  <span>Command Center [Ctrl K]</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenPathfinder();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-dkoder-yellow text-black font-bold text-xs shadow-dkoder-yellow"
                >
                  <Target className="w-3.5 h-3.5" />
                  <span>Start Custom Prep Path</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
