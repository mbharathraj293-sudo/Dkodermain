import { Terminal, ShieldCheck, Heart } from 'lucide-react';

export default function Footer({ onOpenSearch, onOpenShortcuts }) {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/[0.08] bg-[#0A0C10] pt-16 pb-12 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/[0.06]">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-dkoder-purple to-dkoder-purple-dark p-0.5 shadow-dkoder-yellow">
                <div className="w-full h-full bg-[#0A0C10] rounded-[6px] flex items-center justify-center border border-white/10">
                  <span className="font-display font-black text-base text-dkoder-yellow">D</span>
                </div>
              </div>
              <span className="font-display font-bold text-lg text-white tracking-wider">
                DKODER
              </span>
              <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-semibold uppercase bg-dkoder-yellow/10 text-dkoder-yellow border border-dkoder-yellow/20">
                PREP
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              The high-focus placement readiness platform combining company-calibrated DSA practice, proctored mock assessments, and campus hiring intelligence.
            </p>

            {/* Platform Status */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>ASSESSMENT SYSTEMS OPERATIONAL</span>
            </div>
          </div>

          {/* Column 1: Curriculum & Practice */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-dkoder-yellow mb-4">
              Preparation
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
              <li>
                <a href="#learning-modules" onClick={(e) => handleNavClick(e, '#learning-modules')} className="hover:text-white transition-colors">
                  Aptitude & MCQs
                </a>
              </li>
              <li>
                <a href="#practice-code" onClick={(e) => handleNavClick(e, '#practice-code')} className="hover:text-white transition-colors">
                  Coding Sandbox
                </a>
              </li>
              <li>
                <a href="#filter-future" onClick={(e) => handleNavClick(e, '#filter-future')} className="hover:text-white transition-colors">
                  Company OA Tracks
                </a>
              </li>
              <li>
                <a href="#learning-modules" onClick={(e) => handleNavClick(e, '#learning-modules')} className="hover:text-white transition-colors">
                  Mock Exam Blueprints
                </a>
              </li>
              <li>
                <a href="#career-tracks" onClick={(e) => handleNavClick(e, '#career-tracks')} className="hover:text-white transition-colors">
                  Career Trajectories
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Opportunities & Institutional */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-dkoder-yellow mb-4">
              Ecosystem
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
              <li>
                <a href="#hackathons" onClick={(e) => handleNavClick(e, '#hackathons')} className="hover:text-white transition-colors">
                  Collegiate Sprints
                </a>
              </li>
              <li>
                <a href="#projects" onClick={(e) => handleNavClick(e, '#projects')} className="hover:text-white transition-colors">
                  Proof-of-Work Projects
                </a>
              </li>
              <li>
                <a href="#campus-perspectives" onClick={(e) => handleNavClick(e, '#campus-perspectives')} className="hover:text-white transition-colors">
                  HOD & T&P Intelligence
                </a>
              </li>
              <li>
                <a href="#leaderboard" onClick={(e) => handleNavClick(e, '#leaderboard')} className="hover:text-white transition-colors">
                  Hall of Fame Rankings
                </a>
              </li>
              <li>
                <a href="#pathfinder" onClick={(e) => handleNavClick(e, '#pathfinder')} className="hover:text-white transition-colors">
                  Prep Pathfinder Engine
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Power User Commands */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-dkoder-yellow mb-4">
              Power Tools
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-mono">
              <li>
                <button type="button" onClick={onOpenSearch} className="hover:text-white transition-colors text-left flex items-center gap-1.5 cursor-pointer">
                  <span>Command Center</span>
                  <kbd className="px-1.5 py-0.2 rounded bg-white/10 text-[10px] text-white">Ctrl K</kbd>
                </button>
              </li>
              <li>
                <button type="button" onClick={onOpenShortcuts} className="hover:text-white transition-colors text-left flex items-center gap-1.5 cursor-pointer">
                  <span>Shortcuts Cheatsheet</span>
                  <kbd className="px-1.5 py-0.2 rounded bg-white/10 text-[10px] text-white">?</kbd>
                </button>
              </li>
              <li>
                <a href="#practice-code" onClick={(e) => handleNavClick(e, '#practice-code')} className="hover:text-white transition-colors block">
                  Quick Code Run
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Credits & Acknowledgements */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <p>© {currentYear} DKoder — Placement Readiness OS. Round 2 Competition Submission.</p>
          <div className="flex items-center gap-4">
            <span>DKoder & TechHike studied as platform references</span>
            <span>•</span>
            <button
              type="button"
              onClick={onOpenShortcuts}
              className="text-dkoder-yellow hover:underline cursor-pointer"
            >
              Shortcuts: Press ?
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
