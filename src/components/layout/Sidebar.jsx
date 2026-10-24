import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Target,
  BookOpen,
  Code2,
  BriefcaseBusiness,
  Flame,
  Trophy,
  Briefcase,
  Sparkles,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { DKoderMark, DKoderWordmark } from '../brand/DKoderLogo';
import { usePlacement } from '../../context/PlacementContext';

export default function Sidebar({ onOpenShortcuts }) {
  const location = useLocation();
  const { isSidebarCollapsed, toggleSidebar, readiness } = usePlacement();

  const mainNavItems = [
    {
      path: '/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      path: '/mission',
      label: 'Placement Mission',
      icon: Target,
      badge: `${readiness.overall}%`,
      badgeColor: 'bg-[#FACC15]/20 text-[#854D0E] border-[#FACC15]/40',
    },
    {
      path: '/practice',
      label: 'Practice',
      icon: BookOpen,
      badge: '120 Questions',
      badgeColor: 'bg-[#EDE5FF] text-[#5B21B6] border-[#D8C7FF]',
    },
    {
      path: '/coding',
      label: 'Coding Workspace',
      icon: Code2,
      badge: 'IDE',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      path: '/career',
      label: 'Career Tracks',
      icon: BriefcaseBusiness,
      badge: '2 Tracks',
      badgeColor: 'bg-[#EDE5FF] text-[#5B21B6] border-[#D8C7FF]',
    },
    {
      path: '/challenges',
      label: 'Challenges Arena',
      icon: Flame,
      badge: 'Daily',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      path: '/leaderboard',
      label: 'Leaderboard',
      icon: Trophy,
      badge: 'Podium',
      badgeColor: 'bg-[#FACC15]/20 text-[#854D0E] border-[#FACC15]/40',
    },
    {
      path: '/opportunities',
      label: 'Opportunities',
      icon: Briefcase,
      badge: '4 Drives',
      badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
    },
    {
      path: '/pathfinder',
      label: 'Pathfinder',
      icon: Sparkles,
      badge: 'Roadmap',
      badgeColor: 'bg-[#EDE5FF] text-[#5B21B6] border-[#D8C7FF]',
    },
  ];

  const secondaryNavItems = [
    {
      path: '/settings',
      label: 'Settings',
      icon: Settings,
    },
  ];

  return (
    <aside
      className={`hidden md:flex flex-col h-screen max-h-screen bg-white border-r border-[#E8E4F0] transition-all duration-300 ease-in-out shrink-0 select-none z-30 relative overflow-hidden shadow-subtle ${
        isSidebarCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Sidebar Header: Brand Logo & Wordmark */}
      <div className="h-16 shrink-0 px-4 border-b border-[#E8E4F0] flex items-center justify-between bg-white">
        <NavLink
          to="/dashboard"
          className="flex items-center gap-2.5 overflow-hidden group cursor-pointer"
        >
          <DKoderMark size="sm" className="transition-transform group-hover:scale-105" />
          {!isSidebarCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              transition={{ duration: 0.15 }}
            >
              <DKoderWordmark size="sm" showTagline={true} />
            </motion.div>
          )}
        </NavLink>

        {/* Collapse / Expand Toggle Button */}
        <button
          type="button"
          onClick={toggleSidebar}
          className="p-1.5 rounded-lg text-[#625F72] hover:text-[#5B21B6] hover:bg-[#FAF9FF] transition-colors cursor-pointer border border-transparent hover:border-[#E8E4F0]"
          title={isSidebarCollapsed ? 'Expand sidebar (⌘[)' : 'Collapse sidebar (⌘[)'}
          aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isSidebarCollapsed ? (
            <ChevronRight className="w-4 h-4 text-[#625F72]" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-[#625F72]" />
          )}
        </button>
      </div>

      {/* Main Navigation Scroll Area */}
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-3 py-4 space-y-6 custom-scrollbar bg-white">
        {/* Main Operational Core */}
        <div className="space-y-1">
          {!isSidebarCollapsed && (
            <span className="px-3 text-[10px] font-sans uppercase font-bold tracking-wider text-[#8C889E] block mb-2">
              Platform Core
            </span>
          )}

          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              location.pathname === item.path ||
              (item.path === '/dashboard' && location.pathname === '/') ||
              (item.path === '/career' && location.pathname.startsWith('/career'));

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-sans font-medium transition-all group ${
                  isActive
                    ? 'bg-[#EDE9FE] text-[#5B21B6] font-semibold shadow-subtle'
                    : 'text-[#6B687A] hover:text-[#5B21B6] hover:bg-[#FAF9FF]'
                } ${isSidebarCollapsed ? 'justify-center px-0' : ''}`}
                title={isSidebarCollapsed ? item.label : undefined}
              >
                {/* Sliding Yellow Vertical Indicator for Active Item (Section 24) */}
                {isActive && (
                  <motion.div
                    layoutId="sidebarActiveIndicator"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full bg-[#FACC15] shadow-[0_0_8px_rgba(250,204,21,0.6)]"
                  />
                )}

                <Icon
                  className={`w-4 h-4 shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                    isActive ? 'text-[#5B21B6]' : 'text-[#6B687A] group-hover:text-[#5B21B6]'
                  }`}
                />

                {!isSidebarCollapsed && (
                  <div className="flex-1 flex items-center justify-between min-w-0">
                    <span className="truncate">{item.label}</span>
                    {item.badge && (
                      <span
                        className={`text-[10px] font-mono font-medium px-1.5 py-0.5 rounded border ${
                          isActive
                            ? 'bg-[#5B21B6]/10 text-[#5B21B6] border-[#5B21B6]/20'
                            : item.badgeColor || 'bg-[#F6F4FC] text-[#6B687A] border-[#E8E4F0]'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Divider */}
        <div className="border-t border-[#E8E4F0] pt-4 space-y-1">
          {!isSidebarCollapsed && (
            <span className="px-3 text-[10px] font-sans uppercase font-bold tracking-wider text-[#8C889E] block mb-2">
              System & Help
            </span>
          )}

          {secondaryNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-sans font-medium transition-colors group ${
                  isActive
                    ? 'bg-[#EDE9FE] text-[#5B21B6] font-semibold'
                    : 'text-[#6B687A] hover:text-[#5B21B6] hover:bg-[#FAF9FF]'
                } ${isSidebarCollapsed ? 'justify-center px-0' : ''}`}
                title={isSidebarCollapsed ? item.label : undefined}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebarActiveIndicatorSecondary"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full bg-[#FACC15] shadow-[0_0_8px_rgba(250,204,21,0.6)]"
                  />
                )}
                <Icon className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:scale-110" />
                {!isSidebarCollapsed && <span>{item.label}</span>}
              </NavLink>
            );
          })}

          {/* Keyboard Shortcuts Trigger Button */}
          <button
            type="button"
            onClick={onOpenShortcuts}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-sans font-medium text-[#625F72] hover:text-[#5B21B6] hover:bg-[#FAF9FF] transition-colors cursor-pointer ${
              isSidebarCollapsed ? 'justify-center px-0' : ''
            }`}
            title={isSidebarCollapsed ? 'Shortcuts (?)' : undefined}
          >
            <HelpCircle className="w-4 h-4 shrink-0" />
            {!isSidebarCollapsed && (
              <div className="flex-1 flex items-center justify-between">
                <span>Shortcuts</span>
                <kbd className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-[#F6F4FC] text-[#625F72] border border-[#E8E4F0]">
                  ?
                </kbd>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* User Quick Telemetry Card at Bottom */}
      <div className="shrink-0 p-3 border-t border-[#E8E4F0] bg-[#FAF9FF]">
        <NavLink
          to="/profile"
          className={`flex items-center gap-3 p-2 rounded-xl hover:bg-white transition-colors cursor-pointer border border-transparent hover:border-[#E8E4F0] ${
            isSidebarCollapsed ? 'justify-center p-1' : ''
          }`}
          title={isSidebarCollapsed ? 'Bharath Raj • 74% Ready' : undefined}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#5B21B6] to-[#7E3AF2] text-white font-bold font-sans flex items-center justify-center text-xs shadow-sm shrink-0">
            BR
          </div>

          {!isSidebarCollapsed && (
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-sans font-semibold text-[#17152B] truncate">
                  Bharath Raj
                </span>
                <span className="text-[11px] font-mono font-bold text-[#16A34A]">
                  {readiness.overall}%
                </span>
              </div>
              <p className="text-[11px] font-sans text-[#625F72] truncate">
                Computer Science • 7d Streak
              </p>
            </div>
          )}
        </NavLink>
      </div>
    </aside>
  );
}
