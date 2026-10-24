import { useState, useEffect } from 'react';
import { Target, Code2, Sparkles, Sliders, User } from 'lucide-react';

export default function MobileBottomNav({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home', icon: Target, href: '#hero' },
    { id: 'practice', label: 'Practice', icon: Code2, href: '#practice-questions' },
    { id: 'mission', label: 'Mission', icon: Sparkles, href: '#readiness' },
    { id: 'career', label: 'Career', icon: Sliders, href: '#career-tracks' },
    { id: 'profile', label: 'Profile', icon: User, href: '#pathfinder' },
  ];

  const handleClick = (item) => {
    setActiveTab(item.id);
    if (onNavigate) {
      onNavigate(item.href);
    } else {
      const el = document.querySelector(item.href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-[#0A0C10]/95 backdrop-blur-lg border-t border-white/10 xl:hidden px-3 py-1.5 shadow-2xl">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleClick(item)}
              className={`min-h-[44px] min-w-[48px] flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer ${
                isActive ? 'text-dkoder-yellow font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'text-dkoder-yellow' : 'text-slate-400'}`} />
              <span className="text-[10px] font-mono tracking-tight">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
