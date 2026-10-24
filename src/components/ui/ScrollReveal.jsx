import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Reusable ScrollReveal Component (Section 9)
 * Triggers a crisp, professional opacity & translateY entrance animation ONCE when entering viewport.
 * Automatically disabled when user prefers reduced motion.
 */
export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.6,
  y = 20,
  className = '',
  threshold = 0.1,
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: threshold }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
