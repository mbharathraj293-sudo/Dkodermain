import React from 'react';
import BackButton from './BackButton';

/**
 * Standard PageHeader component for secondary pages (Section 37).
 * Consistently delivers BackButton, category tag, H1 heading, description, and action slot.
 */
export default function PageHeader({
  badge,
  category,
  badgeIcon: BadgeIcon,
  title,
  description,
  actions,
  backTo,
  backLabel = 'Back to Dashboard',
  showBack = true,
  className = ''
}) {
  const displayBadge = badge || category;
  return (
    <header className={`space-y-3 ${className}`}>
      {showBack && (
        <div>
          <BackButton to={backTo} label={backLabel} />
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="space-y-1.5 max-w-3xl">
          {displayBadge && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-sans font-semibold uppercase tracking-wider bg-[#EDE5FF] text-[#5B21B6] border border-[#D8C7FF]">
              {BadgeIcon && <BadgeIcon className="w-3.5 h-3.5 text-[#5B21B6]" />}
              <span>{displayBadge}</span>
            </div>
          )}

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold tracking-tight text-[#17152B]">
            {title}
          </h1>

          {description && (
            <p className="text-xs sm:text-sm font-sans text-[#625F72] leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {actions && (
          <div className="flex items-center gap-2.5 shrink-0 self-start sm:self-auto pt-1">
            {actions}
          </div>
        )}
      </div>
    </header>
  );
}
