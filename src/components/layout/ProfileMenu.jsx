import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Settings, Trophy, Target, LogOut, ChevronRight, Award, Zap } from 'lucide-react';
import { usePlacement } from '../../context/PlacementContext';

export default function ProfileMenu({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { user, missionTarget, readiness, xp, streak } = usePlacement();

  if (!isOpen) return null;

  const handleNavigate = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs"
        onClick={onClose}
      />

      {/* Dropdown Menu (Scales in) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: -6 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: -6 }}
        transition={{ type: 'spring', damping: 25, stiffness: 320 }}
        className="fixed right-3 sm:right-6 top-16 z-50 w-72 rounded-2xl bg-white border border-[#E8E4F0] shadow-xl overflow-hidden text-left"
      >
        {/* User Identity Header */}
        <div className="p-4 bg-[#FAF9FF] border-b border-[#E8E4F0] space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FACC15] to-amber-500 text-[#17152B] font-bold font-display flex items-center justify-center text-sm shadow-sm shrink-0">
              {user.avatar}
            </div>

            <div className="min-w-0">
              <h4 className="text-sm font-display font-bold text-[#17152B] truncate">
                {user.name}
              </h4>
              <p className="text-[11px] font-sans text-[#625F72] truncate">
                {user.department}
              </p>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-1.5 p-2 rounded-xl bg-white border border-[#E8E4F0] text-center shadow-xs">
            <div>
              <span className="text-[9px] font-sans uppercase font-medium text-[#625F72] block">XP</span>
              <span className="text-xs font-sans font-bold text-[#5B21B6]">{xp}</span>
            </div>
            <div>
              <span className="text-[9px] font-sans uppercase font-medium text-[#625F72] block">Streak</span>
              <span className="text-xs font-sans font-bold text-[#B45309]">{streak}d 🔥</span>
            </div>
            <div>
              <span className="text-[9px] font-sans uppercase font-medium text-[#625F72] block">Readiness</span>
              <span className="text-xs font-sans font-bold text-[#16A34A]">{readiness.overall}%</span>
            </div>
          </div>
        </div>

        {/* Target Mission Strip */}
        <div className="p-3 bg-[#FAF9FF] border-b border-[#E8E4F0] flex items-center justify-between text-xs font-sans">
          <span className="text-[#625F72]">Target:</span>
          <span className="font-bold text-[#5B21B6] bg-[#EDE5FF] border border-[#D8C7FF] px-2 py-0.5 rounded">
            {missionTarget.company} • {missionTarget.pkg}
          </span>
        </div>

        {/* Action Links */}
        <div className="p-2 space-y-1 text-xs font-medium font-sans">
          <button
            type="button"
            onClick={() => handleNavigate('/profile')}
            className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#FAF9FF] text-[#17152B] hover:text-[#5B21B6] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <User className="w-4 h-4 text-[#5B21B6]" />
              <span>Candidate Profile</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-[#A09CB0]" />
          </button>

          <button
            type="button"
            onClick={() => handleNavigate('/mission')}
            className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#FAF9FF] text-[#17152B] hover:text-[#5B21B6] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <Target className="w-4 h-4 text-[#B45309]" />
              <span>Placement Mission</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-[#A09CB0]" />
          </button>

          <button
            type="button"
            onClick={() => handleNavigate('/leaderboard')}
            className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#FAF9FF] text-[#17152B] hover:text-[#5B21B6] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <Trophy className="w-4 h-4 text-[#B45309]" />
              <span>Campus Leaderboard</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-[#A09CB0]" />
          </button>

          <button
            type="button"
            onClick={() => handleNavigate('/settings')}
            className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#FAF9FF] text-[#17152B] hover:text-[#5B21B6] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <Settings className="w-4 h-4 text-[#625F72]" />
              <span>Account & Settings</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-[#A09CB0]" />
          </button>
        </div>

        {/* Footer */}
        <div className="p-2 border-t border-[#E8E4F0] bg-[#FAF9FF]">
          <button
            type="button"
            onClick={() => {
              navigate('/dashboard');
              onClose();
            }}
            className="w-full flex items-center gap-2 p-2 rounded-lg text-xs font-sans text-[#625F72] hover:text-[#DC2626] hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Switch Candidate Account</span>
          </button>
        </div>
      </motion.div>
    </>
  );
}
