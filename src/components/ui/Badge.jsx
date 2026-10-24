import React from 'react';

/**
 * Standard Badge component for DKoder Placement OS.
 * Non-monospace, meaningful information only (Section 6 & 36).
 */
export default function Badge({
  children,
  variant = 'neutral',
  size = 'sm',
  className = ''
}) {
  const sizeClasses = {
    xs: 'text-[10px] px-1.5 py-0.5',
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  };

  const variantClasses = {
    neutral: 'bg-[#FAF9FF] text-[#625F72] border border-[#E8E4F0]',
    yellow: 'bg-[#FEF9C3] text-[#854D0E] border border-[#FDE047] font-semibold',
    purple: 'bg-[#EDE5FF] text-[#5B21B6] border border-[#D8C7FF] font-semibold',
    success: 'bg-emerald-50 text-[#16A34A] border border-emerald-200 font-semibold',
    warning: 'bg-amber-50 text-[#D97706] border border-amber-200 font-semibold',
    danger: 'bg-red-50 text-[#DC2626] border border-red-200 font-semibold',
    dark: 'bg-[#17152B] text-white border border-[#17152B]',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 font-sans rounded-md select-none ${sizeClasses[size] || sizeClasses.sm} ${variantClasses[variant] || variantClasses.neutral} ${className}`}
    >
      {children}
    </span>
  );
}
