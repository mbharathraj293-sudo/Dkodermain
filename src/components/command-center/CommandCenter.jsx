import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  X,
  ArrowRight,
  CornerDownLeft,
  Zap,
  Target,
  LayoutDashboard,
  BookOpen,
  Code2,
  BriefcaseBusiness,
  Flame,
  Trophy,
  Briefcase,
  Sparkles,
  User,
  Settings,
} from 'lucide-react';
import { searchEcosystem } from '../../utils/search';

export default function CommandCenter({ isOpen, onClose, onSelectAction }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  // Standard commands list matching Section 10 specification
  const standardCommands = [
    { id: 'cmd-dashboard', title: 'Go to Dashboard', description: 'Overview, readiness diagnostics, and streak', route: '/dashboard', icon: LayoutDashboard, category: 'NAVIGATION' },
    { id: 'cmd-mission', title: 'Open Placement Mission', description: 'Selected target goal, stages, and milestones', route: '/mission', icon: Target, category: 'NAVIGATION' },
    { id: 'cmd-practice', title: 'Open Practice', description: 'Algorithmic question archive and topic filters', route: '/practice', icon: BookOpen, category: 'NAVIGATION' },
    { id: 'cmd-coding', title: 'Open Coding Workspace', description: 'In-browser IDE, test runner, and console', route: '/coding', icon: Code2, category: 'NAVIGATION' },
    { id: 'cmd-career', title: 'Open Career Tracks', description: 'Product & Service company preparation paths', route: '/career', icon: BriefcaseBusiness, category: 'NAVIGATION' },
    { id: 'cmd-challenges', title: 'Open Challenges', description: 'Today\'s challenge, weekly sprints, and XP', route: '/challenges', icon: Flame, category: 'NAVIGATION' },
    { id: 'cmd-leaderboard', title: 'Open Leaderboard', description: 'Department and collegiate cohort rankings', route: '/leaderboard', icon: Trophy, category: 'NAVIGATION' },
    { id: 'cmd-opportunities', title: 'Open Opportunities', description: 'Campus drives, assessments, and internships', route: '/opportunities', icon: Briefcase, category: 'NAVIGATION' },
    { id: 'cmd-pathfinder', title: 'Open Pathfinder', description: 'Career roadmap and skill gap analyzer', route: '/pathfinder', icon: Sparkles, category: 'NAVIGATION' },
    { id: 'cmd-profile', title: 'Open Profile', description: 'Candidate credentials, stats, and achievements', route: '/profile', icon: User, category: 'NAVIGATION' },
    { id: 'cmd-settings', title: 'Open Settings', description: 'Appearance, notifications, and shortcuts', route: '/settings', icon: Settings, category: 'NAVIGATION' },
    { id: 'act-target', title: 'Configure Placement Target', description: 'Adjust target company, package ceiling, and level', route: '/mission', icon: Target, category: 'ACTIONS' },
    { id: 'act-practice', title: 'Start Practice', description: 'Begin solving recommended practice questions', route: '/practice', icon: BookOpen, category: 'ACTIONS' },
    { id: 'act-challenge', title: 'Open Today\'s Challenge', description: 'Attempt in-place array rotation challenge', route: '/challenges', icon: Flame, category: 'ACTIONS' },
    { id: 'act-readiness', title: 'View Readiness Diagnostics', description: 'Inspect coding, DSA, aptitude, and mock breakdown', route: '/dashboard', icon: Zap, category: 'ACTIONS' },
  ];

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setResults(standardCommands.slice(0, 8));
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 40);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults(standardCommands.slice(0, 8));
      setSelectedIndex(0);
      return;
    }

    const clean = query.trim().toLowerCase();
    const matched = standardCommands.filter(
      (cmd) =>
        cmd.title.toLowerCase().includes(clean) ||
        cmd.description.toLowerCase().includes(clean) ||
        cmd.category.toLowerCase().includes(clean)
    );

    // If query matches ecosystem search
    const ecoResults = searchEcosystem(query);
    const combined = [...matched];

    ecoResults.forEach((eco) => {
      if (!combined.some((c) => c.title === eco.title)) {
        combined.push({
          id: eco.id,
          title: eco.title,
          description: eco.description,
          route: eco.route,
          icon: Search,
          category: eco.category,
        });
      }
    });

    setResults(combined);
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) {
        handleSelect(results[selectedIndex]);
      }
    }
  };

  const handleSelect = (item) => {
    onClose();
    if (item.route) {
      navigate(item.route);
    } else if (onSelectAction) {
      onSelectAction(item);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 pb-6 overflow-y-auto font-sans">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Command Terminal Modal (0.96 -> 1 scale) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -6 }}
            transition={{ type: 'spring', damping: 26, stiffness: 360 }}
            className="relative w-full max-w-2xl bg-white border border-[#E8E4F0] rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[80vh]"
            onKeyDown={handleKeyDown}
          >
            {/* Top Purple Brand Accent Strip */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#5B21B6] via-[#8B5CF6] to-[#FACC15]" />

            {/* Search Input Bar */}
            <div className="shrink-0 flex items-center px-4 py-3.5 border-b border-[#E8E4F0] bg-[#FAF9FF]">
              <Search className="w-4 h-4 text-[#5B21B6] mr-3 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search (e.g. Dashboard, Practice, Amazon)..."
                className="w-full bg-transparent text-sm sm:text-base text-[#17152B] placeholder-[#A09CB0] focus:outline-none font-sans"
                aria-label="DKoder command palette search"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Clear query"
                  className="p-1 rounded-md text-[#625F72] hover:text-[#17152B] hover:bg-[#E8E4F0]/60 mr-2 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-mono text-[#625F72] bg-white rounded border border-[#E8E4F0]">
                ESC
              </kbd>
            </div>

            {/* Quick Actions Shortcuts (when query is empty) */}
            {!query && (
              <div className="shrink-0 px-4 py-2.5 bg-[#FAF9FF]/80 border-b border-[#E8E4F0] flex items-center gap-2 overflow-x-auto text-xs text-[#625F72] font-sans custom-scrollbar">
                <span className="text-[10px] uppercase text-[#5B21B6] shrink-0 font-bold">Suggested:</span>
                <button
                  type="button"
                  onClick={() => handleSelect({ route: '/dashboard' })}
                  className="px-2.5 py-1 rounded-lg bg-white border border-[#E8E4F0] hover:bg-[#EDE5FF] hover:text-[#5B21B6] text-[#17152B] shrink-0 cursor-pointer transition-colors"
                >
                  Dashboard
                </button>
                <button
                  type="button"
                  onClick={() => handleSelect({ route: '/mission' })}
                  className="px-2.5 py-1 rounded-lg bg-white border border-[#E8E4F0] hover:bg-[#EDE5FF] hover:text-[#5B21B6] text-[#17152B] shrink-0 cursor-pointer transition-colors"
                >
                  Placement Mission
                </button>
                <button
                  type="button"
                  onClick={() => handleSelect({ route: '/practice' })}
                  className="px-2.5 py-1 rounded-lg bg-white border border-[#E8E4F0] hover:bg-[#EDE5FF] hover:text-[#5B21B6] text-[#17152B] shrink-0 cursor-pointer transition-colors"
                >
                  Practice
                </button>
                <button
                  type="button"
                  onClick={() => handleSelect({ route: '/coding' })}
                  className="px-2.5 py-1 rounded-lg bg-white border border-[#E8E4F0] hover:bg-[#EDE5FF] hover:text-[#5B21B6] text-[#17152B] shrink-0 cursor-pointer transition-colors"
                >
                  Coding Workspace
                </button>
                <button
                  type="button"
                  onClick={() => handleSelect({ route: '/career' })}
                  className="px-2.5 py-1 rounded-lg bg-white border border-[#E8E4F0] hover:bg-[#EDE5FF] hover:text-[#5B21B6] text-[#17152B] shrink-0 cursor-pointer transition-colors"
                >
                  Career Tracks
                </button>
                <button
                  type="button"
                  onClick={() => handleSelect({ route: '/pathfinder' })}
                  className="px-2.5 py-1 rounded-lg bg-[#EDE5FF] border border-[#D8C7FF] text-[#5B21B6] shrink-0 font-semibold cursor-pointer transition-colors"
                >
                  Pathfinder
                </button>
              </div>
            )}

            {/* Results List */}
            <div
              ref={listRef}
              className="flex-1 min-h-0 overflow-y-auto p-2 divide-y divide-[#E8E4F0] custom-scrollbar"
              role="listbox"
            >
              {results.length === 0 ? (
                <div className="py-12 text-center text-[#625F72] text-xs">
                  <p>No matching commands found for &ldquo;{query}&rdquo;</p>
                  <p className="text-[#A09CB0] mt-1">Try &quot;Practice&quot;, &quot;Mission&quot;, &quot;Career&quot;, or &quot;Coding&quot;.</p>
                </div>
              ) : (
                results.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  const Icon = item.icon || Search;

                  return (
                    <div
                      key={item.id}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`group relative flex items-start justify-between p-3 rounded-xl cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-[#EDE9FE]/60 border border-[#7C3AED]/30 text-[#18152B] shadow-xs'
                          : 'hover:bg-[#FAF9FF] text-[#18152B] border border-transparent'
                      }`}
                    >
                      {/* Yellow selected command indicator on the left (Section 23) */}
                      {isSelected && (
                        <div className="absolute left-0 top-2 bottom-2 w-1.5 bg-[#FACC15] rounded-r shadow-[0_0_8px_rgba(250,204,21,0.6)]" />
                      )}

                      <div className="flex items-start gap-3 min-w-0 pl-1.5">
                        <div
                          className={`mt-0.5 p-1.5 rounded-lg border transition-colors ${
                            isSelected
                              ? 'bg-[#5B21B6] border-[#5B21B6] text-white shadow-xs'
                              : 'bg-[#FAF9FF] border-[#E8E4F0] text-[#6B687A]'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-[#5B21B6] block mb-0.5">
                            {item.category}
                          </span>
                          <h4 className="text-xs sm:text-sm font-semibold text-[#17152B] truncate group-hover:text-[#5B21B6] transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-xs text-[#625F72] line-clamp-1 mt-0.5 font-sans">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center gap-1.5 ml-3 self-center">
                        {isSelected && (
                          <div className="flex items-center gap-1 text-[10px] font-sans font-medium text-[#5B21B6] bg-[#EDE5FF] px-2 py-0.5 rounded border border-[#D8C7FF]">
                            <span>Execute</span>
                            <CornerDownLeft className="w-3 h-3" />
                          </div>
                        )}
                        <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'text-[#5B21B6] translate-x-0.5' : 'text-[#A09CB0]'}`} />
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Terminal Footer Bar */}
            <div className="shrink-0 px-4 py-2.5 bg-[#FAF9FF] border-t border-[#E8E4F0] flex items-center justify-between text-xs text-[#625F72]">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white border border-[#E8E4F0] text-[10px] font-mono text-[#17152B]">↑</kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-white border border-[#E8E4F0] text-[10px] font-mono text-[#17152B]">↓</kbd>
                  <span className="hidden sm:inline">Navigate</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white border border-[#E8E4F0] text-[10px] font-mono text-[#17152B]">↵</kbd>
                  <span className="hidden sm:inline">Select</span>
                </span>
              </div>
              <span className="text-[11px] text-[#625F72]">Press <kbd className="px-1 py-0.5 rounded bg-white border border-[#E8E4F0] text-[#17152B] font-mono">ESC</kbd> to close</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
