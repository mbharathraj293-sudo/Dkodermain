import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Check, Trash2, ExternalLink, Zap, Target, Award, Calendar, ChevronRight } from 'lucide-react';
import { usePlacement } from '../../context/PlacementContext';

export default function NotificationPanel({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { notifications, markNotificationRead, markAllNotificationsRead, clearNotifications } = usePlacement();

  if (!isOpen) return null;

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleItemClick = (notif) => {
    markNotificationRead(notif.id);
    if (notif.route) {
      navigate(notif.route);
    }
    onClose();
  };

  const getIcon = (type) => {
    switch (type) {
      case 'target':
        return <Target className="w-3.5 h-3.5 text-dkoder-yellow" />;
      case 'challenge':
      case 'xp':
        return <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />;
      case 'streak':
      case 'achievement':
        return <Award className="w-3.5 h-3.5 text-purple-400" />;
      case 'opportunity':
        return <Calendar className="w-3.5 h-3.5 text-emerald-400" />;
      default:
        return <Bell className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs"
        onClick={onClose}
      />

      {/* Flyout Panel (Slides down from top) */}
      <motion.div
        initial={{ opacity: 0, y: -14, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.98 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed right-3 sm:right-6 top-16 z-50 w-[calc(100vw-24px)] sm:w-96 rounded-2xl bg-white border border-[#E8E4F0] shadow-xl overflow-hidden text-left"
      >
        {/* Header */}
        <div className="p-4 border-b border-[#E8E4F0] flex items-center justify-between bg-[#FAF9FF]">
          <div className="flex items-center gap-2">
            <h3 className="font-display font-bold text-sm text-[#17152B]">Notifications</h3>
            {unreadCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full text-[10px] font-sans font-bold bg-[#FACC15] text-[#17152B]">
                {unreadCount} new
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllNotificationsRead}
                className="text-[11px] font-sans font-medium text-[#625F72] hover:text-[#5B21B6] transition-colors flex items-center gap-1 cursor-pointer"
                title="Mark all as read"
              >
                <Check className="w-3 h-3" />
                <span>Mark read</span>
              </button>
            )}
            {notifications.length > 0 && (
              <button
                type="button"
                onClick={clearNotifications}
                className="text-[#625F72] hover:text-[#DC2626] transition-colors p-1"
                title="Clear all"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <div className="max-h-96 overflow-y-auto divide-y divide-[#E8E4F0]">
          {notifications.length === 0 ? (
            <div className="p-8 text-center space-y-2">
              <Bell className="w-8 h-8 text-[#A09CB0] mx-auto" />
              <p className="text-xs font-sans text-[#625F72]">All caught up! No active alerts.</p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => handleItemClick(notif)}
                className={`p-3.5 hover:bg-[#FAF9FF] transition-colors cursor-pointer flex items-start gap-3 text-left ${
                  !notif.read ? 'bg-[#FAF7FF]' : ''
                }`}
              >
                <div className="p-2 rounded-lg bg-[#FAF9FF] border border-[#E8E4F0] mt-0.5 shrink-0 text-[#5B21B6]">
                  {getIcon(notif.type)}
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-[#17152B] truncate">
                      {notif.title}
                    </span>
                    <span className="text-[10px] font-sans text-[#625F72] shrink-0">
                      {notif.time}
                    </span>
                  </div>

                  <p className="text-[11px] text-[#625F72] line-clamp-2 leading-relaxed font-sans">
                    {notif.description}
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[9px] font-sans uppercase font-medium px-1.5 py-0.5 rounded bg-[#FAF9FF] text-[#625F72] border border-[#E8E4F0]">
                      {notif.tag}
                    </span>

                    <span className="text-[11px] font-sans font-medium text-[#5B21B6] hover:text-[#8B5CF6] flex items-center gap-0.5">
                      <span>View</span>
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>

                {!notif.read && (
                  <span className="w-2 h-2 rounded-full bg-[#FACC15] shrink-0 mt-2" />
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-2.5 bg-[#FAF9FF] border-t border-[#E8E4F0] text-center">
          <button
            type="button"
            onClick={() => {
              navigate('/settings');
              onClose();
            }}
            className="text-[11px] font-sans font-medium text-[#625F72] hover:text-[#5B21B6] transition-colors"
          >
            Notification Preferences →
          </button>
        </div>
      </motion.div>
    </>
  );
}
