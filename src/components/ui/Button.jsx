import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Standard Button system for DKoder Placement OS (Section 12 & 29).
 * Variants: 'primary' (Purple), 'yellow', 'secondary' (White), 'purple' (Bright Purple), 'danger', 'success', 'ghost'
 * Supports hover lifts, active scaling, and right icon transition.
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconRight: IconRight,
  isLoading = false,
  disabled = false,
  className = '',
  type = 'button',
  onClick,
  ...props
}) {
  const baseClasses =
    'group inline-flex items-center justify-center font-sans font-semibold transition-all duration-200 cursor-pointer select-none rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98]';

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-xs sm:text-sm px-4 py-2 gap-2',
    lg: 'text-sm sm:text-base px-5 py-2.5 gap-2.5',
  };

  const variantClasses = {
    primary:
      'bg-[#5B21B6] text-white hover:bg-[#4C1D95] hover:-translate-y-0.5 active:bg-[#3B0764] focus-visible:ring-[#5B21B6] shadow-[0_4px_14px_-2px_rgba(91,33,182,0.25)] font-semibold',
    yellow:
      'bg-[#FACC15] text-[#18152B] hover:bg-[#FDE047] hover:-translate-y-0.5 hover:shadow-[0_4px_14px_-2px_rgba(250,204,21,0.35)] active:bg-[#EAB308] focus-visible:ring-[#FACC15] shadow-xs font-bold',
    secondary:
      'bg-white text-[#18152B] hover:bg-[#FAF9FF] hover:text-[#5B21B6] border border-[#E8E4F0] hover:border-[#7C3AED] hover:-translate-y-0.5 active:bg-[#EDE9FE] focus-visible:ring-[#5B21B6]/30 shadow-xs',
    purple:
      'bg-[#7C3AED] text-white hover:bg-[#6D28D9] hover:-translate-y-0.5 active:bg-[#5B21B6] focus-visible:ring-[#7C3AED] shadow-[0_4px_14px_-2px_rgba(124,58,237,0.25)] font-semibold',
    danger:
      'bg-[#DC2626] text-white hover:bg-[#B91C1C] active:bg-[#991B1B] focus-visible:ring-[#DC2626]',
    success:
      'bg-[#16A34A] text-white hover:bg-[#15803D] active:bg-[#166534] font-bold',
    outline:
      'bg-transparent text-[#18152B] hover:bg-[#FAF9FF] hover:text-[#5B21B6] border border-[#E8E4F0] hover:border-[#7C3AED] active:bg-[#EDE9FE] focus-visible:ring-[#5B21B6]/30',
    ghost:
      'bg-transparent text-[#6B687A] hover:text-[#5B21B6] hover:bg-[#EDE9FE]/50 active:bg-[#EDE9FE] focus-visible:ring-[#5B21B6]/20',
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseClasses} ${sizeClasses[size] || sizeClasses.md} ${variantClasses[variant] || variantClasses.primary} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : Icon ? (
        <Icon className="w-4 h-4 shrink-0" />
      ) : null}
      <span>{children}</span>
      {!isLoading && IconRight && (
        <IconRight className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
      )}
    </button>
  );
}
