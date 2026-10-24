import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, Sparkles, Compass } from 'lucide-react';
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
    { name: 'Learn', href: '#learn' },
    { name: 'Career', href: '#tracks' },
    { name: 'Hackathons', href: '#hackathons' },
    { name: 'Projects', href: '#projects' },
    { name: 'Colleges', href: '#colleges' },
    { name: 'Pathfinder', href: '#pathfinder' },
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
            ? 'glass-nav py-3.5 shadow-xl shadow-black/40'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* DKoder Logo */}
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-dkoder-yellow rounded-lg"
              aria-label="DKoder Universe Home"
            >
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-dkoder-purple-600 via-dkoder-purple-900 to-black p-0.5 shadow-glow-purple group-hover:shadow-glow-yellow transition-all duration-300">
                <div className="w-full h-full bg-dkoder-darker rounded-[10px] flex items-center justify-center border border-white/10">
                  <span className="font-display font-black text-lg bg-gradient-to-br from-dkoder-yellow to-amber-400 bg-clip-text text-transparent">
                    D
                  </span>
                </div>
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-dkoder-yellow rounded-full animate-ping" />
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-dkoder-yellow rounded-full" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg tracking-wider text-white group-hover:text-dkoder-yellow transition-colors">
                  DKODER
                </span>
                <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase -mt-1">
                  Ecosystem OS
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] border border-white/[0.08] px-3 py-1.5 rounded-full backdrop-blur-md">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.08] rounded-full transition-all duration-200"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center gap-2.5">
              {/* Search / Command Palette Trigger */}
              <button
                type="button"
                onClick={onOpenSearch}
                aria-label="Open Command Palette"
                className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-300 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-dkoder-yellow/40 rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-dkoder-yellow"
              >
                <Search className="w-3.5 h-3.5 text-dkoder-yellow" />
                <span className="hidden sm:inline">Search</span>
                <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono font-medium text-slate-400 bg-white/[0.08] rounded border border-white/10">
                  {isMac ? '⌘K' : 'Ctrl K'}
                </kbd>
              </button>

              {/* Primary CTA button */}
              <MagneticButton
                variant="primary"
                onClick={onOpenPathfinder}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold"
                ariaLabel="Find Your Path in Ecosystem"
              >
                <Sparkles className="w-3.5 h-3.5 text-black" />
                <span>Find Your Path</span>
              </MagneticButton>

              {/* Mobile Hamburger Toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Navigation Menu"
                className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-dkoder-yellow"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-[65px] z-30 p-4 lg:hidden"
          >
            <div className="glass-card rounded-2xl p-6 border border-white/10 shadow-2xl flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-slate-200 hover:text-white hover:bg-white/[0.08] transition-colors"
                  >
                    <span>{link.name}</span>
                    <span className="text-xs text-dkoder-yellow">→</span>
                  </a>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSearch();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/[0.06] text-sm text-slate-200 font-medium hover:bg-white/[0.1] transition-colors"
                >
                  <Search className="w-4 h-4 text-dkoder-yellow" />
                  <span>Search Ecosystem [Ctrl K]</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenPathfinder();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-dkoder-yellow text-black font-semibold text-sm shadow-glow-yellow"
                >
                  <Compass className="w-4 h-4" />
                  <span>Launch Pathfinder</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
