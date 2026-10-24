import React from 'react';
import { motion } from 'framer-motion';

/**
 * Section 8: FLOATING CAREER SIGNALS
 * Around hero sections, create tiny floating signal points representing:
 * Skills, Practice, Coding, Interview, Career.
 * Subtle connecting lines, small purple and yellow dots with gentle floating motion.
 */
export default function FloatingCareerSignals({ className = '' }) {
  const signalNodes = [
    { label: 'Skills', x: '5%', y: '12%', color: '#5B21B6', dotColor: '#FACC15', delay: 0 },
    { label: 'Practice', x: '88%', y: '18%', color: '#7C3AED', dotColor: '#5B21B6', delay: 1.2 },
    { label: 'Coding', x: '94%', y: '68%', color: '#5B21B6', dotColor: '#FACC15', delay: 2.4 },
    { label: 'Interview', x: '8%', y: '82%', color: '#7C3AED', dotColor: '#5B21B6', delay: 1.8 },
    { label: 'Career Ready', x: '52%', y: '95%', color: '#16A34A', dotColor: '#FACC15', delay: 3 },
  ];

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden hidden md:block select-none ${className}`}
      aria-hidden="true"
    >
      {signalNodes.map((node, i) => (
        <motion.div
          key={node.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0.4, 0.75, 0.4],
            y: [0, -6, 0],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: node.delay,
          }}
          style={{ left: node.x, top: node.y }}
          className="absolute flex items-center gap-1.5"
        >
          {/* Signal Node Pair with Connecting Line */}
          <div className="flex items-center gap-1">
            <span
              className="w-1.5 h-1.5 rounded-full shadow-xs"
              style={{ backgroundColor: node.color }}
            />
            <div className="w-5 h-[1px] bg-gradient-to-r from-[#5B21B6]/30 via-[#FACC15]/40 to-transparent" />
            <span
              className="w-1.5 h-1.5 rounded-full shadow-xs animate-pulse"
              style={{ backgroundColor: node.dotColor }}
            />
          </div>
          <span className="text-[9px] font-sans font-bold uppercase tracking-wider text-[#686477]/80 bg-white/70 px-1.5 py-0.5 rounded-md border border-[#E8E4F0]/60 backdrop-blur-2xs">
            {node.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
