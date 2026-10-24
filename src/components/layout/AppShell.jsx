import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import MobileBottomNav from './MobileBottomNav';
import CommandCenter from '../command-center/CommandCenter';
import KeyboardShortcutsHelp from '../navigation/KeyboardShortcutsHelp';
import CustomCursor from '../ui/CustomCursor';
import AuroraBackground from '../ui/AuroraBackground';

export default function AppShell() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isShortcutsModalOpen, setIsShortcutsModalOpen] = useState(false);

  const mainScrollRef = useRef(null);
  const isCodingPage = location.pathname === '/coding';

  // Section 24 & 25: Resettable native scroll-to-top on route change
  useEffect(() => {
    if (mainScrollRef.current) {
      mainScrollRef.current.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant',
      });
    }
  }, [location.pathname]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    let lastKey = '';
    let keyTimeout = null;

    const handleKeyDown = (e) => {
      // Don't intercept typing in inputs, textareas, contenteditable or code editors
      const target = e.target;
      const tagName = target.tagName.toLowerCase();
      const isEditable = target.isContentEditable || tagName === 'input' || tagName === 'textarea' || tagName === 'select';

      // Global Command Center: Ctrl+K / Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
        return;
      }

      // Quick Search: '/'
      if (e.key === '/' && !isEditable) {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
        return;
      }

      // Close overlays: Esc
      if (e.key === 'Escape') {
        setIsCommandPaletteOpen(false);
        setIsShortcutsModalOpen(false);
        return;
      }

      // Keyboard Cheatsheet: '?'
      if (e.key === '?' && !isEditable) {
        e.preventDefault();
        setIsShortcutsModalOpen((prev) => !prev);
        return;
      }

      // Sequential G + Key navigation (when not typing)
      if (!isEditable && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const key = e.key.toLowerCase();

        if (lastKey === 'g') {
          clearTimeout(keyTimeout);
          lastKey = '';

          switch (key) {
            case 'h': // G + H -> Dashboard
              e.preventDefault();
              navigate('/dashboard');
              break;
            case 'm': // G + M -> Mission
              e.preventDefault();
              navigate('/mission');
              break;
            case 'p': // G + P -> Practice
              e.preventDefault();
              navigate('/practice');
              break;
            case 'c': // G + C -> Career
              e.preventDefault();
              navigate('/career');
              break;
            case 'l': // G + L -> Leaderboard
              e.preventDefault();
              navigate('/leaderboard');
              break;
            case 'o': // G + O -> Opportunities
              e.preventDefault();
              navigate('/opportunities');
              break;
            default:
              break;
          }
        } else if (key === 'g') {
          lastKey = 'g';
          keyTimeout = setTimeout(() => {
            lastKey = '';
          }, 1200);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (keyTimeout) clearTimeout(keyTimeout);
    };
  }, [navigate]);

  return (
    <div className="relative h-screen max-h-screen w-full bg-[#FAF9FF] text-[#18152B] flex overflow-hidden selection:bg-[#FACC15] selection:text-[#18152B]">
      {/* Aurora Ambient Background Effect */}
      <AuroraBackground />

      {/* Precision Desktop Cursor */}
      <CustomCursor />

      {/* Desktop Collapsible Sidebar */}
      <Sidebar onOpenShortcuts={() => setIsShortcutsModalOpen(true)} />

      {/* Main Operational Container */}
      <div className="flex-1 min-w-0 min-h-0 flex flex-col h-full overflow-hidden">
        {/* Sticky TopBar */}
        <TopBar onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />

        {/* Dynamic Route Content Area with Smooth Native Scrolling (Section 1, 5, 7, 8) */}
        <main
          ref={mainScrollRef}
          id="main-content-scroll"
          tabIndex={-1}
          className={`flex-1 min-h-0 min-w-0 w-full relative scroll-smooth overscroll-contain focus:outline-none ${
            isCodingPage
              ? 'overflow-hidden p-0'
              : 'overflow-y-auto overflow-x-hidden custom-scrollbar pb-[calc(80px+env(safe-area-inset-bottom,0px))] md:pb-6'
          }`}
        >
          <Outlet />
        </main>
      </div>

      {/* Dedicated Mobile Bottom Navigation */}
      <MobileBottomNav onOpenShortcuts={() => setIsShortcutsModalOpen(true)} />

      {/* Global Command Center (Ctrl + K / Cmd + K) */}
      <CommandCenter
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectAction={(item) => {
          if (item.route) {
            navigate(item.route);
          } else if (item.target) {
            const el = document.querySelector(item.target);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />

      {/* Keyboard Shortcuts Guide Modal (?) */}
      <KeyboardShortcutsHelp
        isOpen={isShortcutsModalOpen}
        onClose={() => setIsShortcutsModalOpen(false)}
      />
    </div>
  );
}
