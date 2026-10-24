import Modal from '../ui/Modal';
import { Keyboard, Sparkles } from 'lucide-react';

export default function KeyboardShortcutsModal({ isOpen, onClose }) {
  const shortcuts = [
    { keys: ['Ctrl', 'K'], mac: ['⌘', 'K'], label: 'Open Global Command Palette' },
    { keys: ['/'], mac: ['/'], label: 'Focus Ecosystem Search' },
    { keys: ['Esc'], mac: ['Esc'], label: 'Close Active Modal / Search' },
    { keys: ['?'], mac: ['?'], label: 'Toggle Keyboard Shortcuts Guide' },
    { keys: ['G', 'H'], mac: ['G', 'H'], label: 'Jump to Home Universe' },
    { keys: ['G', 'L'], mac: ['G', 'L'], label: 'Jump to Learning Journey' },
    { keys: ['G', 'T'], mac: ['G', 'T'], label: 'Jump to Career Tracks' },
    { keys: ['G', 'K'], mac: ['G', 'K'], label: 'Jump to Hackathon Missions' },
    { keys: ['G', 'P'], mac: ['G', 'P'], label: 'Jump to Student Projects' },
    { keys: ['G', 'C'], mac: ['G', 'C'], label: 'Jump to Campus Constellation' },
    { keys: ['G', 'O'], mac: ['G', 'O'], label: 'Launch Opportunity Pathfinder' },
  ];

  const isMac = typeof window !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="DKoder Advanced Keyboard Shortcuts"
      subtitle="Master rapid navigation across the opportunity ecosystem"
      maxWidth="max-w-xl"
    >
      <div className="space-y-4">
        <div className="p-3 rounded-xl bg-[#FEF9C3] border border-[#FDE047] flex items-center gap-3 text-xs text-[#854D0E] font-sans">
          <Sparkles className="w-4 h-4 shrink-0 text-[#B45309]" />
          <span>Shortcuts are inactive while typing inside form inputs. Sequences like &apos;G then H&apos; must be pressed within 1.2s.</span>
        </div>

        <div className="divide-y divide-[#E8E4F0] rounded-xl border border-[#E8E4F0] bg-white overflow-hidden">
          {shortcuts.map((sc, i) => (
            <div key={i} className="flex items-center justify-between p-3.5 hover:bg-[#FAF9FF] transition-colors">
              <span className="text-sm text-[#17152B] font-medium font-sans">{sc.label}</span>
              <div className="flex items-center gap-1.5 shrink-0">
                {(isMac ? sc.mac : sc.keys).map((k, kIdx) => (
                  <kbd
                    key={kIdx}
                    className="px-2.5 py-1 text-xs font-mono font-bold text-[#17152B] bg-[#FAF9FF] border border-[#E8E4F0] rounded shadow-xs min-w-[28px] text-center"
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
