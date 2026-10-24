import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Target,
  BookOpen,
  BriefcaseBusiness,
  User,
  MoreHorizontal,
  Code2,
  Flame,
  Trophy,
  Briefcase,
  Sparkles,
  Settings,
  X,
  ChevronRight,
  HelpCircle,
} from 'lucide-react';
import { usePlacement } from '../../context/PlacementContext';

export default function MobileBottomNav({ onOpenShortcuts }) {
  const location = useLocation();
  const { readiness } = usePlacement();
  const [isMoreSheetOpen, setIsMoreSheetOpen] = useState(false);

  const primaryItems = [
    { path: '/dashboard', label: 'Home', icon: LayoutDashboard },
    { path: '/mission', label: 'Mission', icon: Target, badge: `${readiness.overall}%` },
    { path: '/practice', label: 'Practice', icon: BookOpen },
    { path: '/career', label: 'Career', icon: BriefcaseBusiness },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  const moreItems = [
    { path: '/coding', label: 'Coding Workspace', icon: Code2, desc: 'In-browser IDE & test cases', badge: 'IDE' },
    { path: '/challenges', label: 'Challenges', icon: Flame, desc: 'Daily practice and assessments', badge: 'Daily' },
    { path: '/leaderboard', label: 'Leaderboard', icon: Trophy, desc: 'Department & cohort rankings', badge: 'Podium' },
    { path: '/opportunities', label: 'Opportunities', icon: Briefcase, desc: 'Verified drives & assessments', badge: '4 Drives' },
    { path: '/pathfinder', label: 'Pathfinder', icon: Sparkles, desc: 'Strategic career preparation roadmap', badge: 'Roadmap' },
    { path: '/settings', label: 'Settings', icon: Settings, desc: 'Platform preferences & configuration' },
  ];

  const isMoreActive = moreItems.some((item) => location.pathname === item.path);

  return (
    <>
      {/* Mobile Sticky Bottom Bar */}
      <nav className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t border-[#E8E4F0] md:hidden px-2 py-1 pb-[calc(4px+env(safe-area-inset-bottom,0px))] shadow-lg">
        <div className="flex items-center justify-around">
          {primaryItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              location.pathname === item.path ||
              (item.path === '/dashboard' && location.pathname === '/') ||
              (item.path === '/career' && location.pathname.startsWith('/career'));

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`min-h-[48px] min-w-[48px] flex-1 flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all select-none ${
                  isActive
                    ? 'text-[#5B21B6] font-bold'
                    : 'text-[#625F72] hover:text-[#17152B]'
                }`}
              >
                <div className="relative">
                  <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'text-[#5B21B6]' : 'text-[#625F72]'}`} />
                  {item.badge && isActive && (
                    <span className="absolute -top-1 -right-2 w-2 h-2 rounded-full bg-[#FACC15]" />
                  )}
                </div>
                <span className="text-[10px] font-sans font-medium tracking-normal leading-none">
                  {item.label}
                </span>
              </NavLink>
            );
          })}

          {/* "More" Trigger Button */}
          <button
            type="button"
            onClick={() => setIsMoreSheetOpen(true)}
            className={`min-h-[48px] min-w-[48px] flex-1 flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all select-none cursor-pointer ${
              isMoreActive || isMoreSheetOpen
                ? 'text-[#5B21B6] font-bold'
                : 'text-[#625F72] hover:text-[#17152B]'
            }`}
            aria-label="More Sections"
          >
            <MoreHorizontal className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-sans font-medium tracking-normal leading-none">
              More
            </span>
          </button>
        </div>
      </nav>

      {/* "More" Bottom Sheet Drawer */}
      <AnimatePresence>
        {isMoreSheetOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMoreSheetOpen(false)}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs md:hidden"
            />

            {/* Slide-Up Sheet */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 280 }}
              className="fixed bottom-0 inset-x-0 z-50 bg-white border-t border-[#E8E4F0] rounded-t-3xl max-h-[82vh] overflow-hidden flex flex-col md:hidden text-left shadow-2xl"
            >
              {/* Sheet Drag Indicator & Header */}
              <div className="shrink-0 p-4 border-b border-[#E8E4F0] bg-[#FAF9FF] flex items-center justify-between">
                <div>
                  <h3 className="font-sans font-bold text-sm text-[#17152B]">All Platform Sections</h3>
                  <p className="text-[11px] font-sans text-[#625F72]">DKoder Placement Intelligence Modules</p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsMoreSheetOpen(false)}
                  className="p-2 rounded-xl text-[#625F72] hover:text-[#17152B] hover:bg-[#FAF9FF] min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                {moreItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMoreSheetOpen(false)}
                      className={`min-h-[52px] flex items-center justify-between p-3 rounded-2xl transition-all ${
                        isActive
                          ? 'bg-[#EDE5FF] text-[#5B21B6] border border-[#D8C7FF] font-semibold'
                          : 'bg-white text-[#17152B] hover:bg-[#FAF9FF] border border-[#E8E4F0]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl ${isActive ? 'bg-[#5B21B6]/10 text-[#5B21B6]' : 'bg-[#FAF9FF] text-[#5B21B6]'}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold">{item.label}</span>
                            {item.badge && (
                              <span
                                className={`text-[10px] font-sans uppercase px-1.5 py-0.5 rounded ${
                                  isActive ? 'bg-[#5B21B6] text-white' : 'bg-[#EDE5FF] text-[#5B21B6]'
                                }`}
                              >
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className={`text-[11px] font-sans ${isActive ? 'text-[#5B21B6]/80' : 'text-[#625F72]'}`}>
                            {item.desc}
                          </p>
                        </div>
                      </div>

                      <ChevronRight className={`w-4 h-4 ${isActive ? 'text-[#5B21B6]' : 'text-[#A09CB0]'}`} />
                    </NavLink>
                  );
                })}

                {/* Keyboard Shortcuts Trigger in Sheet */}
                <button
                  type="button"
                  onClick={() => {
                    setIsMoreSheetOpen(false);
                    if (onOpenShortcuts) onOpenShortcuts();
                  }}
                  className="w-full min-h-[48px] flex items-center justify-between p-3 rounded-2xl bg-[#FAF9FF] text-[#625F72] hover:text-[#17152B] border border-[#E8E4F0]"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-[#5B21B6] ml-2" />
                    <span className="text-xs font-sans">View Keyboard Shortcuts</span>
                  </div>
                  <kbd className="px-2 py-0.5 rounded text-[10px] font-mono bg-white text-[#17152B] border border-[#E8E4F0] mr-1">
                    ?
                  </kbd>
                </button>
              </div>

              {/* Sheet Bottom Safe Padding */}
              <div className="h-[calc(1.5rem+env(safe-area-inset-bottom,0px))] bg-white shrink-0" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
