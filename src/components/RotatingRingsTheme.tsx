import React from 'react';

interface RotatingRingsThemeProps {
  className?: string;
  glowClassName?: string;
}

const RINGS = Array.from({ length: 46 }).map((_, i) => ({
  rx: 90.0 + i * 9.5,
  ry: 64.0 + i * 7.2,
  rot: i * 3.2,
}));

export default function RotatingRingsTheme({
  className = 'w-[640px] h-[640px] sm:w-[780px] sm:h-[780px] lg:w-[940px] lg:h-[940px]',
  glowClassName = 'w-[520px] h-[360px]',
}: RotatingRingsThemeProps) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-radial from-amber-300/35 via-yellow-200/20 to-transparent rounded-full blur-3xl pointer-events-none ${glowClassName}`} />
      <svg className={`sg-show__rings max-w-none select-none ${className}`} viewBox="0 0 1000 1000" fill="none" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="rehemaGoldAmber" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FAC832" stopOpacity="0.85" />
            <stop offset="25%" stopColor="#F5B324" stopOpacity="0.75" />
            <stop offset="50%" stopColor="#D97706" stopOpacity="0.65" />
            <stop offset="75%" stopColor="#C5A059" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#B45309" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="rehemaAmberNavy" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1C3656" stopOpacity="0.65" />
            <stop offset="25%" stopColor="#C5A059" stopOpacity="0.75" />
            <stop offset="50%" stopColor="#F5B324" stopOpacity="0.85" />
            <stop offset="75%" stopColor="#D97706" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#0E1E33" stopOpacity="0.55" />
          </linearGradient>
        </defs>
        <g>
          {RINGS.map((ring, idx) => (
            <ellipse key={idx} cx="500" cy="500" rx={ring.rx.toFixed(1)} ry={ring.ry.toFixed(1)} transform={`rotate(${ring.rot.toFixed(1)} 500 500)`} stroke={idx % 2 === 0 ? "url(#rehemaGoldAmber)" : "url(#rehemaAmberNavy)"} strokeOpacity={0.6} strokeWidth="1" />
          ))}
        </g>
      </svg>
    </div>
  );
}