import React from 'react';

/**
 * DKoder Aurora Editorial Background
 * Extremely soft, ambient blurred radial gradient blobs that slowly shift (8-15s).
 * Zero distracting particles, pure editorial atmosphere, content remains 100% readable.
 */
export default function AuroraBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* Soft Purple Aurora Blob (Top-Left) */}
      <div
        className="absolute -top-[15%] -left-[10%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full blur-[120px] opacity-40 bg-gradient-to-br from-[#7C3AED]/20 via-[#5B21B6]/15 to-transparent animate-aurora-1"
      />

      {/* Gentle Yellow Energy Glow (Top-Right / Center-Right) */}
      <div
        className="absolute top-[5%] -right-[8%] w-[45vw] h-[45vw] max-w-[550px] max-h-[550px] rounded-full blur-[110px] opacity-25 bg-gradient-to-bl from-[#FACC15]/20 via-[#FEF08A]/10 to-transparent animate-aurora-2"
      />

      {/* Secondary Soft Purple Ambient Glow (Bottom-Center) */}
      <div
        className="absolute -bottom-[20%] left-[20%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full blur-[140px] opacity-30 bg-gradient-to-tr from-[#EDE9FE] via-[#5B21B6]/10 to-transparent animate-aurora-1"
        style={{ animationDelay: '-5s' }}
      />
    </div>
  );
}
