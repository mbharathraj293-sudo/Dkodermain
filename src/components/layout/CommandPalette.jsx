import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, CornerDownLeft, Sparkles, BookOpen, Trophy, FolderGit2, Landmark, Compass, Sliders } from 'lucide-react';
import { searchEcosystem } from '../../utils/search';

export default function CommandPalette({ isOpen, onClose, onSelectAction }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setResults(searchEcosystem(''));
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const matched = searchEcosystem(query);
    setResults(matched);
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
    if (onSelectAction) {
      onSelectAction(item);
    } else if (item.target) {
      const el = document.querySelector(item.target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'LEARN':
        return <BookOpen className="w-3.5 h-3.5 text-blue-400" />;
      case 'CAREER TRACK':
        return <Sliders className="w-3.5 h-3.5 text-purple-400" />;
      case 'HACKATHON':
        return <Trophy className="w-3.5 h-3.5 text-dkoder-yellow" />;
      case 'PROJECT':
        return <FolderGit2 className="w-3.5 h-3.5 text-emerald-400" />;
      case 'COLLEGE':
        return <Landmark className="w-3.5 h-3.5 text-rose-400" />;
      case 'FEATURE':
        return <Compass className="w-3.5 h-3.5 text-amber-400" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 pb-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Palette Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-2xl bg-dkoder-card border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col"
            onKeyDown={handleKeyDown}
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-white/[0.08] bg-dkoder-darker/70">
              <Search className="w-5 h-5 text-dkoder-yellow mr-3 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search DKoder ecosystem (courses, hackathons, projects, colleges...)"
                className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none"
                aria-label="Command search query"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Clear query"
                  className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 mr-2"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-white/[0.06] rounded border border-white/10">
                ESC
              </kbd>
            </div>

            {/* Quick Actions Shortcuts (when query is empty) */}
            {!query && (
              <div className="px-4 py-2.5 bg-dkoder-purple-950/40 border-b border-white/[0.04] flex items-center gap-2 overflow-x-auto text-xs text-slate-400">
                <span className="font-mono text-[10px] uppercase text-dkoder-yellow shrink-0">Quick Jumps:</span>
                <button
                  onClick={() => handleSelect({ target: '#learn' })}
                  className="px-2.5 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 shrink-0"
                >
                  → Learn
                </button>
                <button
                  onClick={() => handleSelect({ target: '#tracks' })}
                  className="px-2.5 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 shrink-0"
                >
                  → Career Tracks
                </button>
                <button
                  onClick={() => handleSelect({ target: '#hackathons' })}
                  className="px-2.5 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 shrink-0"
                >
                  → Hackathons
                </button>
                <button
                  onClick={() => handleSelect({ target: '#pathfinder' })}
                  className="px-2.5 py-1 rounded-full bg-dkoder-yellow/10 border border-dkoder-yellow/20 text-dkoder-yellow shrink-0 font-medium"
                >
                  ✨ Pathfinder
                </button>
              </div>
            )}

            {/* Results List */}
            <div
              ref={listRef}
              className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-white/[0.03]"
              role="listbox"
            >
              {results.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-sm">
                  <p>No results found for &ldquo;{query}&rdquo;</p>
                  <p className="text-xs text-slate-500 mt-1">Try searching for &quot;AI&quot;, &quot;Hackathon&quot;, &quot;Robotics&quot;, or &quot;Colleges&quot;.</p>
                </div>
              ) : (
                results.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`group flex items-start justify-between p-3 rounded-xl cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-dkoder-purple-800/40 border border-dkoder-yellow/30 text-white'
                          : 'hover:bg-white/[0.04] text-slate-300'
                      }`}
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <div className={`mt-0.5 p-1.5 rounded-lg border ${
                          isSelected ? 'bg-dkoder-yellow/20 border-dkoder-yellow/40' : 'bg-white/[0.04] border-white/10'
                        }`}>
                          {getCategoryIcon(item.category)}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-[10px] font-mono font-semibold tracking-wider uppercase text-dkoder-yellow/80">
                              {item.category}
                            </span>
                          </div>
                          <h4 className="text-sm font-medium text-white truncate group-hover:text-dkoder-yellow transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center gap-1.5 ml-3 self-center">
                        {isSelected && (
                          <div className="flex items-center gap-1 text-[11px] font-mono text-dkoder-yellow bg-dkoder-yellow/10 px-2 py-0.5 rounded border border-dkoder-yellow/20">
                            <span>Open</span>
                            <CornerDownLeft className="w-3 h-3" />
                          </div>
                        )}
                        <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-dkoder-yellow translate-x-0.5' : 'text-slate-600'}`} />
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer with keyboard guidance */}
            <div className="px-4 py-2.5 bg-dkoder-darker/90 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-500 font-mono">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/10 text-[10px]">↑</kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/10 text-[10px]">↓</kbd>
                  <span className="hidden sm:inline">Navigate</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/10 text-[10px]">↵</kbd>
                  <span className="hidden sm:inline">Select</span>
                </span>
              </div>
              <span className="text-slate-400">Press <kbd className="px-1 py-0.5 rounded bg-white/10 text-white font-semibold">?</kbd> for full shortcuts</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
