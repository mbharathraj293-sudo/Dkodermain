import Modal from '../ui/Modal';
import { Sparkles, Terminal } from 'lucide-react';

export default function KeyboardShortcutsHelp({ isOpen, onClose }) {
  const shortcuts = [
    { keys: ['Ctrl', 'K'], mac: ['⌘', 'K'], label: 'Open Command Palette' },
    { keys: ['/'], mac: ['/'], label: 'Global Search' },
    { keys: ['Esc'], mac: ['Esc'], label: 'Close Active Overlays' },
    { keys: ['?'], mac: ['?'], label: 'Show Keyboard Shortcuts' },
    { keys: ['G', 'H'], mac: ['G', 'H'], label: 'Jump to Dashboard' },
    { keys: ['G', 'M'], mac: ['G', 'M'], label: 'Jump to Placement Mission' },
    { keys: ['G', 'P'], mac: ['G', 'P'], label: 'Jump to Practice Questions' },
    { keys: ['G', 'C'], mac: ['G', 'C'], label: 'Jump to Career Tracks' },
    { keys: ['G', 'L'], mac: ['G', 'L'], label: 'Jump to Campus Leaderboard' },
    { keys: ['G', 'O'], mac: ['G', 'O'], label: 'Jump to Opportunities' },
  ];

  const isMac = typeof window !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="DKoder Power User Keyboard Shortcuts"
      subtitle="Operate the placement platform at maximum speed with zero mouse latency"
      maxWidth="max-w-xl"
    >
      <div className="space-y-4">
        <div className="p-3 rounded-xl bg-dkoder-yellow/10 border border-dkoder-yellow/20 flex items-center gap-3 text-xs text-dkoder-yellow font-mono">
          <Terminal className="w-4 h-4 shrink-0" />
          <span>Shortcuts are inactive while typing inside inputs or the code editor. Press two-key sequences like &apos;G then P&apos; within 1.2s.</span>
        </div>

        <div className="divide-y divide-white/[0.06] rounded-xl border border-white/[0.08] bg-[#161922] overflow-hidden">
          {shortcuts.map((sc, i) => (
            <div key={i} className="flex items-center justify-between p-3.5 hover:bg-white/[0.02] transition-colors">
              <span className="text-xs sm:text-sm text-slate-300 font-medium">{sc.label}</span>
              <div className="flex items-center gap-1.5 shrink-0">
                {(isMac ? sc.mac : sc.keys).map((k, kIdx) => (
                  <kbd
                    key={kIdx}
                    className="px-2.5 py-1 text-xs font-mono font-bold text-white bg-white/[0.08] border border-white/20 rounded shadow-sm min-w-[28px] text-center"
                  >
                    {k}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}
