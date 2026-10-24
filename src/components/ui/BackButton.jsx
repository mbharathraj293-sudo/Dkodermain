import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

/**
 * Reusable BackButton component for all secondary routes (Section 7).
 * Provides graceful browser history navigation with safe fallback to /dashboard.
 */
export default function BackButton({
  to,
  label = 'Back to Dashboard',
  className = '',
  onClick
}) {
  const navigate = useNavigate();

  const handleBack = (e) => {
    if (onClick) {
      onClick(e);
      return;
    }

    if (to) {
      navigate(to);
      return;
    }

    // Safely use browser history state if available, else fallback to dashboard
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className={`inline-flex items-center gap-2 text-xs font-sans font-medium text-[#625F72] hover:text-[#5B21B6] transition-colors cursor-pointer group py-1 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5B21B6] rounded-md ${className}`}
      aria-label={label}
    >
      <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-1 text-[#625F72] group-hover:text-[#5B21B6]" />
      <span>{label}</span>
    </button>
  );
}
