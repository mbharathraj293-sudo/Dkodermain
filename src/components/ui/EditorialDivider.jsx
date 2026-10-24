import React from 'react';

/**
 * Editorial Divider (Section 29)
 * Unique DKoder motif: small yellow dot ──────── purple line ──────── small yellow dot
 */
export default function EditorialDivider({ className = '', label }) {
  return (
    <div className={`relative flex items-center justify-center my-6 select-none ${className}`}>
      {/* Left Line */}
      <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#E8E4F0] to-[#EDE9FE]" />

      {/* Left Yellow Dot */}
      <div className="w-1.5 h-1.5 rounded-full bg-[#FACC15] ring-2 ring-[#FEF08A]/60 mx-2 shrink-0 shadow-[0_0_6px_rgba(250,204,21,0.4)]" />

      {label ? (
        <span className="px-3 text-xs font-semibold uppercase tracking-wider text-[#6B687A] bg-[#FAF9FF]">
          {label}
        </span>
      ) : (
        <div className="w-12 h-[1px] bg-[#7C3AED]/30 mx-1" />
      )}

      {/* Right Yellow Dot */}
      <div className="w-1.5 h-1.5 rounded-full bg-[#FACC15] ring-2 ring-[#FEF08A]/60 mx-2 shrink-0 shadow-[0_0_6px_rgba(250,204,21,0.4)]" />

      {/* Right Line */}
      <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-[#E8E4F0] to-[#EDE9FE]" />
    </div>
  );
}
