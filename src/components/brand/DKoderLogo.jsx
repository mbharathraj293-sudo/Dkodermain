import React from 'react';

/**
 * DKODER Brand Logo System
 * An original geometric "D/K" monogram:
 * - Purple primary foundation (#5B21B6)
 * - Yellow energetic progression accent (#FACC15)
 * - Professional dark purple wordmark (#17152B)
 */

export function DKoderMark({
  size = 'md',
  theme = 'default',
  className = ''
}) {
  const sizeMap = {
    xs: 'w-5 h-5',
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
    xl: 'w-14 h-14',
  };

  const dimensions = sizeMap[size] || sizeMap.md;

  return (
    <div className={`relative flex items-center justify-center shrink-0 ${dimensions} ${className}`}>
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm select-none"
      >
        <defs>
          {/* Subtle Linear Gradient for D Stem (DKoder Yellow) */}
          <linearGradient id="dkoderStemGrad" x1="6" y1="6" x2="22" y2="42" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FACC15" />
            <stop offset="1" stopColor="#EAB308" />
          </linearGradient>

          {/* Linear Gradient for Forward Chevron (K Arrow) */}
          <linearGradient id="dkoderArrowGrad" x1="18" y1="8" x2="42" y2="24" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FEF08A" />
            <stop offset="1" stopColor="#FACC15" />
          </linearGradient>

          {/* Brand Purple Gradient Node */}
          <linearGradient id="dkoderPurpleNode" x1="22" y1="26" x2="40" y2="42" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8B5CF6" />
            <stop offset="1" stopColor="#5B21B6" />
          </linearGradient>

          {/* Shield Gradient */}
          <linearGradient id="dkoderShieldGrad" x1="3" y1="3" x2="45" y2="45" gradientUnits="userSpaceOnUse">
            <stop stopColor="#5B21B6" />
            <stop offset="1" stopColor="#4C1D95" />
          </linearGradient>
        </defs>

        {/* Outer Rounded Shield Frame in DKoder Purple */}
        <rect
          x="3"
          y="3"
          width="42"
          height="42"
          rx="12"
          fill="url(#dkoderShieldGrad)"
          stroke="#5B21B6"
          strokeWidth="1"
        />

        {/* 1. The 'D' Vertical Spine */}
        <path
          d="M12 11C12 9.89543 12.8954 9 14 9H19C21.7614 9 24 11.2386 24 14V34C24 36.7614 21.7614 39 19 39H14C12.8954 39 12 38.1046 12 37V11Z"
          fill="url(#dkoderStemGrad)"
        />

        {/* 2. Top Forward Chevron / Arrow */}
        <path
          d="M24 16L35.2 9.5C36.3 8.8 37.7 9.6 37.7 10.9V18.1C37.7 18.9 37.2 19.6 36.5 20L28 24.5L24 16Z"
          fill="url(#dkoderArrowGrad)"
        />

        {/* 3. Bottom Angular Node */}
        <path
          d="M27.5 23.5L36.5 28C37.2 28.4 37.7 29.1 37.7 29.9V37.1C37.7 38.4 36.3 39.2 35.2 38.5L24 32L27.5 23.5Z"
          fill="#FFFFFF"
          fillOpacity="0.9"
        />

        {/* 4. Center Precision Aperture */}
        <circle cx="21" cy="24" r="2.2" fill="#5B21B6" />
      </svg>
    </div>
  );
}

export function DKoderWordmark({
  size = 'md',
  showTagline = false,
  className = ''
}) {
  const textSizes = {
    sm: 'text-sm',
    md: 'text-base sm:text-lg',
    lg: 'text-xl sm:text-2xl',
    xl: 'text-2xl sm:text-3xl',
  };

  return (
    <div className={`flex flex-col select-none ${className}`}>
      <div className="flex items-baseline tracking-tight">
        <span className={`font-display font-black tracking-wider text-[#17152B] ${textSizes[size] || textSizes.md}`}>
          DKODER
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#FACC15] ml-1 mb-0.5 inline-block" />
      </div>
      {showTagline && (
        <span className="text-[9px] sm:text-[10px] font-sans uppercase tracking-[0.18em] text-[#5B21B6] font-bold -mt-0.5">
          CAREER COMMAND CENTER
        </span>
      )}
    </div>
  );
}

export default function DKoderLogo({
  variant = 'full',
  size = 'md',
  theme = 'default',
  showTagline = true,
  className = '',
  onClick
}) {
  if (variant === 'mark') {
    return <DKoderMark size={size} theme={theme} className={className} />;
  }

  if (variant === 'wordmark') {
    return (
      <DKoderWordmark
        size={size}
        showTagline={showTagline}
        className={className}
      />
    );
  }

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 cursor-pointer group ${className}`}
    >
      <DKoderMark
        size={size}
        theme={theme}
        className="transition-transform duration-300 group-hover:scale-105"
      />
      <DKoderWordmark
        size={size}
        showTagline={showTagline}
      />
    </div>
  );
}
