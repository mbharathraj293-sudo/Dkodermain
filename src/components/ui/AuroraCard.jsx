import React, { useRef } from 'react';

/**
 * Section 31: AURORA CARD EFFECT
 * On mouse movement, a very subtle radial gradient follows cursor using CSS variables.
 * Used exclusively for 1–2 centerpiece cards (Mission Card, Career Track card).
 */
export default function AuroraCard({ children, className = '', ...props }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden group/aurora ${className}`}
      style={{
        '--mouse-x': '50%',
        '--mouse-y': '50%',
      }}
      {...props}
    >
      {/* Subtle cursor-following radial gradient overlay */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 group-hover/aurora:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(420px circle at var(--mouse-x) var(--mouse-y), rgba(124, 58, 237, 0.05), rgba(250, 204, 21, 0.03) 35%, transparent 70%)`,
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
