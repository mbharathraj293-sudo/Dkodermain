import { useEffect, useRef } from 'react';

export function useKeyboardShortcuts({
  onToggleCommandPalette,
  onCloseOverlays,
  onToggleShortcutsModal,
  onNavigate
}) {
  const pendingPrefix = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if user is focused inside an input, textarea, select, or contenteditable element
      const activeTag = document.activeElement?.tagName?.toLowerCase();
      const isEditable = document.activeElement?.isContentEditable;
      if (
        activeTag === 'input' ||
        activeTag === 'textarea' ||
        activeTag === 'select' ||
        isEditable
      ) {
        // Only allow Escape to blur or close
        if (e.key === 'Escape') {
          document.activeElement?.blur();
          if (onCloseOverlays) onCloseOverlays();
        }
        return;
      }

      // Check for CTRL/CMD + K
      if ((e.ctrlKey || e.metaKey) && (e.key.toLowerCase() === 'k')) {
        e.preventDefault();
        if (onToggleCommandPalette) onToggleCommandPalette();
        return;
      }

      // Check for '/' search trigger
      if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        if (onToggleCommandPalette) onToggleCommandPalette();
        return;
      }

      // Check for Escape
      if (e.key === 'Escape') {
        e.preventDefault();
        if (onCloseOverlays) onCloseOverlays();
        return;
      }

      // Check for '?' shortcut modal trigger (Shift + /)
      if (e.key === '?') {
        e.preventDefault();
        if (onToggleShortcutsModal) onToggleShortcutsModal();
        return;
      }

      // Handle sequence: "G" then action
      const key = e.key.toLowerCase();
      if (!e.ctrlKey && !e.metaKey && !e.altKey) {
        if (key === 'g') {
          pendingPrefix.current = 'g';
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => {
            pendingPrefix.current = null;
          }, 1200);
          return;
        }

        if (pendingPrefix.current === 'g') {
          pendingPrefix.current = null;
          if (timeoutRef.current) clearTimeout(timeoutRef.current);

          const routes = {
            h: '#hero',
            p: '#practice-code',
            m: '#pathfinder',
            c: '#career-tracks',
            l: '#leaderboard'
          };

          if (routes[key]) {
            e.preventDefault();
            if (onNavigate) {
              onNavigate(routes[key]);
            } else {
              const el = document.querySelector(routes[key]);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [onToggleCommandPalette, onCloseOverlays, onToggleShortcutsModal, onNavigate]);
}
