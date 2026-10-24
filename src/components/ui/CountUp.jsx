import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Reusable CountUp component (Section 13)
 * Smoothly interpolates from 0 to target number when scrolled into view.
 * Runs once, zero layout shift.
 */
export default function CountUp({
  to = 0,
  from = 0,
  duration = 1.2,
  suffix = '',
  prefix = '',
  decimals = 0,
  className = '',
}) {
  const [value, setValue] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView || prefersReducedMotion) {
      if (isInView && prefersReducedMotion) setValue(to);
      return;
    }

    let startTime = null;
    let animationFrameId;
    const startVal = Number(from);
    const endVal = Number(to);

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // Smooth ease-out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = startVal + (endVal - startVal) * easeOut;
      setValue(decimals > 0 ? Number(current.toFixed(decimals)) : Math.floor(current));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setValue(decimals > 0 ? Number(endVal.toFixed(decimals)) : endVal);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, to, from, duration, prefersReducedMotion]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
