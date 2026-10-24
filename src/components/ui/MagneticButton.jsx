import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Reusable MagneticButton Component (Section 11 & 12)
 * Subtle 2-5px attraction toward cursor.
 * Disabled on touch/mobile devices and when user prefers reduced motion.
 */
export default function MagneticButton({
  children,
  onClick,
  className = '',
  strength = 0.18, // subtle 2-5px movement
  variant = 'primary', // 'primary' (Purple), 'yellow', 'secondary', 'ghost'
  type = 'button',
  ariaLabel,
  disabled = false,
  ...props
}) {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setIsTouchDevice(
      'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768
    );
  }, []);

  const handleMouseMove = (e) => {
    if (prefersReducedMotion || isTouchDevice || disabled || !buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    // Clamped subtle pull to 2-5px
    const rawX = (clientX - (left + width / 2)) * strength;
    const rawY = (clientY - (top + height / 2)) * strength;
    const clampedX = Math.max(-5, Math.min(5, rawX));
    const clampedY = Math.max(-5, Math.min(5, rawY));
    setPosition({ x: clampedX, y: clampedY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles =
    'relative inline-flex items-center justify-center font-sans font-semibold rounded-xl transition-all duration-200 select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:opacity-50 disabled:cursor-not-allowed group active:scale-[0.98]';

  const variants = {
    // Section 12: Primary Purple button: hover slight lift, active scale 0.98
    primary:
      'bg-[#5B21B6] hover:bg-[#4C1D95] text-white shadow-[0_4px_14px_-2px_rgba(91,33,182,0.25)] hover:shadow-[0_6px_20px_-2px_rgba(91,33,182,0.35)] hover:-translate-y-0.5',
    // Section 12: Yellow button: hover slight lift, soft yellow shadow
    yellow:
      'bg-[#FACC15] hover:bg-[#FDE047] text-[#18152B] font-bold shadow-[0_4px_14px_-2px_rgba(250,204,21,0.35)] hover:shadow-[0_8px_22px_-2px_rgba(250,204,21,0.45)] hover:-translate-y-0.5',
    // Section 12: Secondary button: border transitions to purple
    secondary:
      'bg-white text-[#18152B] border border-[#E8E4F0] hover:border-[#7C3AED] hover:text-[#5B21B6] shadow-xs hover:-translate-y-0.5',
    ghost:
      'bg-transparent text-[#6B687A] hover:text-[#5B21B6] hover:bg-[#EDE9FE]/50',
  };

  return (
    <motion.button
      ref={buttonRef}
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', damping: 18, stiffness: 220, mass: 0.1 }}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
