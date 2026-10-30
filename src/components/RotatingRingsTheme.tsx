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
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-radial from-amber-200/35 via-amber-100/15 to-transparent rounded-full blur-3xl pointer-events-none ${glowClassName}`} />
      <svg className={`sg-show__rings max-w-none select-none ${className}`} viewBox="0 0 1000 1000" fill="none" stroke="#C5A059" strokeWidth="1" strokeOpacity="0.45" aria-hidden="true" focusable="false">
        <g>
          {RINGS.map((ring, idx) => (
            <ellipse key={idx} cx="500" cy="500" rx={ring.rx.toFixed(1)} ry={ring.ry.toFixed(1)} transform={`rotate(${ring.rot.toFixed(1)} 500 500)`} />
          ))}
        </g>
      </svg>
    </div>
  );
}