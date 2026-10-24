import React from 'react';

/**
 * Career Signal Motif (Section 5)
 * Unique DKoder visual identity component representing:
 * Target → Practice → Progress → Interview → Placement
 * Features a refined purple track line with an animated traveling yellow node.
 */
export default function CareerSignal({
  className = '',
  orientation = 'horizontal',
  showLabels = false,
  activeStep = 2, // 0: Target, 1: Practice, 2: Progress, 3: Interview, 4: Placement
}) {
  const steps = [
    { label: 'Target', color: '#7C3AED' },
    { label: 'Practice', color: '#5B21B6' },
    { label: 'Progress', color: '#FACC15' },
    { label: 'Interview', color: '#7C3AED' },
    { label: 'Placement', color: '#FACC15' },
  ];

  if (orientation === 'compact') {
    return (
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EDE9FE]/60 border border-[#E8E4F0] text-xs font-medium text-[#18152B] ${className}`}>
        <div className="relative flex items-center w-8 h-2">
          <div className="w-full h-[2px] bg-[#5B21B6]/30 rounded-full overflow-hidden">
            <div className="w-2.5 h-full bg-[#FACC15] rounded-full animate-signal-travel" />
          </div>
        </div>
        <span className="text-[11px] font-semibold text-[#5B21B6] tracking-wide uppercase">
          Career Signal
        </span>
      </div>
    );
  }

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* SVG Connecting Track with Traveling Pulse */}
      <div className="relative w-full flex items-center justify-between">
        {/* Track Line */}
        <div className="absolute left-2 right-2 h-[2px] bg-gradient-to-r from-[#EDE9FE] via-[#7C3AED]/40 to-[#FACC15]/40 rounded-full" />

        {/* Traveling Signal Particle */}
        <div className="absolute left-2 right-2 h-[2px] overflow-hidden pointer-events-none">
          <div className="w-12 h-full bg-gradient-to-r from-transparent via-[#FACC15] to-transparent rounded-full animate-signal-travel" />
        </div>

        {/* Career Signal Nodes */}
        {steps.map((step, idx) => {
          const isDone = idx < activeStep;
          const isCurrent = idx === activeStep;

          return (
            <div key={step.label} className="relative z-10 flex flex-col items-center group">
              <div
                className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isCurrent
                    ? 'bg-[#FACC15] ring-4 ring-[#FACC15]/20 shadow-[0_0_10px_rgba(250,204,21,0.5)] scale-110'
                    : isDone
                    ? 'bg-[#5B21B6] ring-2 ring-[#5B21B6]/20'
                    : 'bg-white border-2 border-[#E8E4F0]'
                }`}
              >
                {isCurrent && <div className="w-1.5 h-1.5 rounded-full bg-[#18152B]" />}
                {isDone && <div className="w-1 h-1 rounded-full bg-white" />}
              </div>

              {showLabels && (
                <span
                  className={`mt-1.5 text-[10px] tracking-tight uppercase transition-colors font-medium ${
                    isCurrent
                      ? 'text-[#18152B] font-bold'
                      : isDone
                      ? 'text-[#5B21B6]'
                      : 'text-[#6B687A]'
                  }`}
                >
                  {step.label}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
