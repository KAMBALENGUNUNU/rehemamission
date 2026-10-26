import React from 'react';

interface RehemaLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'auto';
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function RehemaLogo({
  className = '',
  variant = 'auto',
  showTagline = true,
  size = 'md',
}: RehemaLogoProps) {
  const isDark = variant === 'dark';

  const sizeClasses = {
    sm: { mark: 'w-7 h-7', title: 'text-base', sub: 'text-[8px]' },
    md: { mark: 'w-9 h-9', title: 'text-lg sm:text-xl', sub: 'text-[9px] sm:text-[10px]' },
    lg: { mark: 'w-12 h-12', title: 'text-2xl sm:text-3xl', sub: 'text-[11px]' },
  }[size];

  const textColor = isDark
    ? 'text-champagne-50'
    : 'text-slate-900 group-hover:text-amber-800';

  const subColor = isDark
    ? 'text-gold-400/90'
    : 'text-amber-700';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Visual Emblem: Rising Sun over Rwandan Hills with Ebenezer Cross of Grace */}
      <svg
        className={`${sizeClasses.mark} flex-shrink-0`}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="50" cy="50" r="48" className={isDark ? "stroke-gold-400/40" : "stroke-amber-600/30"} strokeWidth="2.5" />
        <circle cx="50" cy="50" r="44" className={isDark ? "fill-ink-900/80 stroke-gold-400/20" : "fill-amber-50/80 stroke-amber-500/20"} strokeWidth="1" />
        
        {/* Ebenezer Sun Rays */}
        <path d="M50 14V24M50 76V86M14 50H24M76 50H86M24.5 24.5L31.5 31.5M68.5 68.5L75.5 75.5M24.5 75.5L31.5 68.5M68.5 31.5L75.5 24.5" 
          stroke={isDark ? "#fbbf24" : "#d97706"} strokeWidth="2" strokeLinecap="round" />
        
        {/* Soft Golden Sun Disk */}
        <circle cx="50" cy="45" r="14" fill={isDark ? "#f59e0b" : "#f59e0b"} fillOpacity={isDark ? "0.3" : "0.25"} />
        <circle cx="50" cy="45" r="9" fill={isDark ? "#fbbf24" : "#d97706"} />

        {/* Rwandan Thousand Hills (Layers of Grace) */}
        <path
          d="M20 72C30 63 38 64 48 70C58 76 68 66 80 72V76H20V72Z"
          fill={isDark ? "#d97706" : "#b45309"}
          fillOpacity="0.85"
        />
        <path
          d="M16 75C28 68 40 70 52 74C64 78 74 71 84 76V78H16V75Z"
          fill={isDark ? "#92400e" : "#78350f"}
        />

        {/* Central Ebenezer Anchor / Cross */}
        <path d="M50 34V58M43 42H57" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
      </svg>

      {/* Brand Typography */}
      <div className="flex flex-col text-left">
        <span className={`font-serif font-light tracking-tight leading-none ${sizeClasses.title} ${textColor} transition-colors`}>
          Rehema Mission Rwanda
        </span>
        {showTagline && (
          <span className={`tracking-[0.24em] uppercase font-semibold mt-1 leading-tight ${sizeClasses.sub} ${subColor}`}>
            Transforming the Present · Shaping the Future
          </span>
        )}
      </div>
    </div>
  );
}
