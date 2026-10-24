import React, { useState } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { Search, Bell, ChevronRight, Target } from 'lucide-react';
import { DKoderMark } from '../brand/DKoderLogo';
import NotificationPanel from './NotificationPanel';
import ProfileMenu from './ProfileMenu';
import { usePlacement } from '../../context/PlacementContext';

export default function TopBar({ onOpenCommandPalette }) {
  const location = useLocation();
  const { user, missionTarget, readiness, notifications } = usePlacement();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Breadcrumbs title mapping
  const getBreadcrumb = (path) => {
    if (path.startsWith('/career')) {
      return { section: 'Candidate Core', current: 'Career Tracks' };
    }
    switch (path) {
      case '/':
      case '/dashboard':
        return { section: 'Candidate Core', current: 'Dashboard' };
      case '/mission':
        return { section: 'Candidate Core', current: 'Placement Mission' };
      case '/practice':
        return { section: 'Candidate Core', current: 'Practice' };
      case '/coding':
        return { section: 'Candidate Core', current: 'Coding Workspace' };
      case '/challenges':
        return { section: 'Candidate Core', current: 'Challenges Arena' };
      case '/leaderboard':
        return { section: 'Candidate Core', current: 'Leaderboard' };
      case '/opportunities':
        return { section: 'Candidate Core', current: 'Opportunities' };
      case '/pathfinder':
        return { section: 'Candidate Core', current: 'Pathfinder' };
      case '/profile':
        return { section: 'Candidate Core', current: 'Profile' };
      case '/settings':
        return { section: 'Candidate Core', current: 'Settings' };
      default:
        return { section: 'Candidate Core', current: 'Dashboard' };
    }
  };

  const { section, current } = getBreadcrumb(location.pathname);

  return (
    <header className="h-16 shrink-0 bg-white/95 backdrop-blur-md border-b border-[#E8E4F0] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20 select-none shadow-subtle">
      {/* Left: Mobile Brand & Desktop Breadcrumbs */}
      <div className="flex items-center gap-3">
        {/* Mobile Logo Mark */}
        <div className="md:hidden flex items-center gap-2">
          <NavLink to="/dashboard" className="flex items-center gap-2">
            <DKoderMark size="sm" />
            <span className="font-display font-black text-sm text-[#17152B]">DKODER</span>
          </NavLink>
        </div>

        {/* Desktop Breadcrumbs Hierarchy */}
        <div className="hidden md:flex items-center gap-2 text-xs font-sans">
          <span className="text-[#625F72] font-medium tracking-normal">
            {section}
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-[#8C889E]" />
          <h1 className="text-[#17152B] font-semibold text-sm">
            {current}
          </h1>
        </div>
      </div>

      {/* Center: Global Search Bar / Command Palette Trigger */}
      <div className="flex-1 max-w-md mx-4 hidden lg:block">
        <button
          type="button"
          onClick={onOpenCommandPalette}
          className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-xl bg-[#FAF9FF] hover:bg-white border border-[#E8E4F0] hover:border-[#7C3AED] focus:border-[#7C3AED] focus:ring-4 focus:ring-[#EDE9FE] focus:shadow-[0_0_16px_rgba(124,58,237,0.15)] text-xs font-sans text-[#6B687A] hover:text-[#5B21B6] transition-all cursor-pointer shadow-subtle group focus:outline-none"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-[#6B687A] group-hover:text-[#5B21B6] transition-colors" />
            <span className="text-[#6B687A] group-hover:text-[#18152B] transition-colors">Search questions, topics, career tracks...</span>
          </div>
          <div className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded text-[10px] bg-white text-[#6B687A] font-mono border border-[#E8E4F0] shadow-2xs">
              Ctrl
            </kbd>
            <kbd className="px-1.5 py-0.5 rounded text-[10px] bg-white text-[#6B687A] font-mono border border-[#E8E4F0] shadow-2xs">
              K
            </kbd>
          </div>
        </button>
      </div>

      {/* Right: Selected Target Indicator, Notification Bell & Profile Avatar */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Active Target Indicator (Desktop Only) - Click opens Mission Configuration */}
        <NavLink
          to="/mission"
          className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#E8E4F0] hover:border-[#7C3AED] text-xs font-sans text-[#6B687A] hover:text-[#5B21B6] hover:shadow-[0_0_14px_rgba(124,58,237,0.12)] transition-all shadow-subtle group cursor-pointer"
          title="Amazon • 74% Readiness — Click to Configure Mission"
        >
          <div className="w-2 h-2 rounded-full bg-[#FACC15] animate-pulse" />
          <Target className="w-3.5 h-3.5 text-[#5B21B6] group-hover:scale-110 transition-transform" />
          <span className="text-[#18152B] font-semibold">{missionTarget.company}</span>
          <span className="text-[#E8E4F0]">•</span>
          <span className="text-[#7C3AED] font-mono font-bold bg-[#EDE9FE] px-1.5 py-0.5 rounded text-[11px]">{readiness.overall}%</span>
        </NavLink>

        {/* Mobile Search Icon Button */}
        <button
          type="button"
          onClick={onOpenCommandPalette}
          className="lg:hidden p-2 rounded-xl text-[#625F72] hover:text-[#5B21B6] hover:bg-[#FAF9FF] transition-colors cursor-pointer border border-transparent hover:border-[#E8E4F0]"
          aria-label="Global Search"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Notification Bell Button */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setIsNotifOpen((prev) => !prev);
              setIsProfileOpen(false);
            }}
            className="p-2 rounded-xl text-[#625F72] hover:text-[#5B21B6] hover:bg-[#FAF9FF] transition-colors relative cursor-pointer border border-transparent hover:border-[#E8E4F0]"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FACC15] ring-2 ring-white" />
            )}
          </button>

          <NotificationPanel
            isOpen={isNotifOpen}
            onClose={() => setIsNotifOpen(false)}
          />
        </div>

        {/* User Profile Avatar Button */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setIsProfileOpen((prev) => !prev);
              setIsNotifOpen(false);
            }}
            className="flex items-center gap-2 p-1 rounded-xl hover:bg-[#FAF9FF] transition-colors cursor-pointer border border-transparent hover:border-[#E8E4F0]"
            aria-label="User Profile Menu"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#5B21B6] to-[#7E3AF2] text-white font-bold font-sans flex items-center justify-center text-xs shadow-sm">
              {user.avatar}
            </div>
          </button>

          <ProfileMenu
            isOpen={isProfileOpen}
            onClose={() => setIsProfileOpen(false)}
          />
        </div>
      </div>
    </header>
  );
}
