import { Sparkles, Terminal, Heart, ArrowUpRight } from 'lucide-react';

export default function Footer({ onOpenSearch, onOpenShortcuts }) {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/[0.08] bg-dkoder-darker pt-16 pb-12 overflow-hidden">
      {/* Subtle radial ambient glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-dkoder-purple-900/10 blur-[120px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/[0.06]">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-dkoder-purple-600 to-black p-0.5 shadow-glow-yellow">
                <div className="w-full h-full bg-dkoder-darker rounded-[10px] flex items-center justify-center border border-white/10">
                  <span className="font-display font-black text-lg text-dkoder-yellow">D</span>
                </div>
              </div>
              <span className="font-display font-bold text-xl text-white tracking-wider">
                DKODER
              </span>
            </div>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              The connected student opportunity universe. Learn, compete in elite hackathons, build production-grade software, and accelerate your engineering career.
            </p>

            {/* Live Ecosystem Status */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>ALL 6 ECOSYSTEM CLUSTERS OPERATIONAL</span>
            </div>
          </div>

          {/* Column 1: Ecosystem */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-dkoder-yellow mb-4">
              Ecosystem
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a href="#learn" onClick={(e) => handleNavClick(e, '#learn')} className="hover:text-white transition-colors">
                  Learning Journey
                </a>
              </li>
              <li>
                <a href="#tracks" onClick={(e) => handleNavClick(e, '#tracks')} className="hover:text-white transition-colors">
                  Career Tracks
                </a>
              </li>
              <li>
                <a href="#hackathons" onClick={(e) => handleNavClick(e, '#hackathons')} className="hover:text-white transition-colors">
                  Hackathon Missions
                </a>
              </li>
              <li>
                <a href="#projects" onClick={(e) => handleNavClick(e, '#projects')} className="hover:text-white transition-colors">
                  Student Showcase
                </a>
              </li>
              <li>
                <a href="#colleges" onClick={(e) => handleNavClick(e, '#colleges')} className="hover:text-white transition-colors">
                  Campus Constellation
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Tools & Actions */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-dkoder-yellow mb-4">
              Exploration
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a href="#pathfinder" onClick={(e) => handleNavClick(e, '#pathfinder')} className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Pathfinder Engine</span>
                  <Sparkles className="w-3 h-3 text-dkoder-yellow" />
                </a>
              </li>
              <li>
                <button type="button" onClick={onOpenSearch} className="hover:text-white transition-colors text-left">
                  Global Search [Ctrl K]
                </button>
              </li>
              <li>
                <button type="button" onClick={onOpenShortcuts} className="hover:text-white transition-colors text-left flex items-center gap-1">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Keyboard Shortcuts [?]</span>
                </button>
              </li>
              <li>
                <a href="#stats" onClick={(e) => handleNavClick(e, '#stats')} className="hover:text-white transition-colors">
                  Impact Metrics
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Platform & Community */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-dkoder-yellow mb-4">
              Community
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <span className="text-slate-300">IIT Bombay Node</span>
              </li>
              <li>
                <span className="text-slate-300">BITS Pilani Chapter</span>
              </li>
              <li>
                <span className="text-slate-300">NIT Trichy Lab</span>
              </li>
              <li>
                <span className="text-slate-300">NUS Singapore Guild</span>
              </li>
              <li>
                <span className="text-slate-300">DTU Delhi Syndicate</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
          <p>© {currentYear} DKoder — Learn. Compete. Build. Grow. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenShortcuts}
              className="text-slate-400 hover:text-dkoder-yellow transition-colors underline decoration-dotted"
            >
              Shortcuts: Press ?
            </button>
            <span className="text-slate-700">|</span>
            <span className="text-dkoder-yellow">Round 2 Competition Edition</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
