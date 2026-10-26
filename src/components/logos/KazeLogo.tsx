import React from 'react';

interface KazeLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'auto';
  showSubtitle?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function KazeLogo({
  className = '',
  variant = 'auto',
  showSubtitle = true,
  size = 'md',
}: KazeLogoProps) {
  const isDark = variant === 'dark';

  const sizeClasses = {
    sm: { mark: 'w-7 h-7', title: 'text-base', sub: 'text-[8px]' },
    md: { mark: 'w-9 h-9 sm:w-10 sm:h-10', title: 'text-lg sm:text-xl', sub: 'text-[9px] sm:text-[10px]' },
    lg: { mark: 'w-12 h-12', title: 'text-2xl sm:text-3xl', sub: 'text-[11px]' },
    xl: { mark: 'w-16 h-16', title: 'text-3xl sm:text-4xl', sub: 'text-xs' },
  }[size];

  const textColor = isDark
    ? 'text-champagne-50'
    : 'text-slate-900 group-hover:text-amber-800';

  const subColor = isDark
    ? 'text-gold-400'
    : 'text-amber-700';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Visual Emblem: Atelier Canvas & Stylized "K" Brushstroke */}
      <svg
        className={`${sizeClasses.mark} flex-shrink-0`}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Gallery Easel Canvas Diamond / Square Frame */}
        <rect
          x="12"
          y="12"
          width="76"
          height="76"
          rx="6"
          className={isDark ? "stroke-gold-400/40 fill-ink-900/90" : "stroke-amber-600/35 fill-amber-50/70"}
          strokeWidth="2"
        />
        <rect
          x="18"
          y="18"
          width="64"
          height="64"
          rx="3"
          className={isDark ? "stroke-gold-400/20" : "stroke-amber-500/20"}
          strokeWidth="1"
        />

        {/* Dynamic Stylized "K" Brushstroke in Rwandan Warm Amber / Terracotta */}
        {/* Vertical Stroke (The Spine / Easel Post) */}
        <path
          d="M34 26V74"
          stroke={isDark ? "#fbbf24" : "#d97706"}
          strokeWidth="5"
          strokeLinecap="round"
        />
        {/* Dot / Palette node at top */}
        <circle cx="34" cy="26" r="3.5" fill={isDark ? "#fde68a" : "#b45309"} />

        {/* Upper diagonal brush stroke with Rwandan arch */}
        <path
          d="M36 50L64 28"
          stroke={isDark ? "#f59e0b" : "#b45309"}
          strokeWidth="4.5"
          strokeLinecap="round"
        />

        {/* Lower diagonal grounding stroke (Ebenezer foundation) */}
        <path
          d="M44 45L66 74"
          stroke={isDark ? "#d97706" : "#92400e"}
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* Floating Creative Accent / Palette spark */}
        <circle cx="68" cy="30" r="3" fill={isDark ? "#fbbf24" : "#f59e0b"} />
        <circle cx="48" cy="36" r="2" fill={isDark ? "#fde68a" : "#d97706"} />
      </svg>

      {/* Brand Typography */}
      <div className="flex flex-col text-left">
        <span className={`font-serif font-light tracking-tight leading-none ${sizeClasses.title} ${textColor} transition-colors`}>
          Kaze Collection
        </span>
        {showSubtitle && (
          <span className={`tracking-[0.22em] uppercase font-semibold mt-1 leading-tight ${sizeClasses.sub} ${subColor}`}>
            By Rehema Mission Rwanda · Kigali
          </span>
        )}
      </div>
    </div>
  );
}
