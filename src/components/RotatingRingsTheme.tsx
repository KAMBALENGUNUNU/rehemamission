import React from 'react';

interface RotatingRingsThemeProps {
  className?: string;
  glowClassName?: string;
}

// 46 mathematically mapped rotating ellipses matching The Signature Gallery specification
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
      {/* Multi-layered ambient radiant glow using website brand warm colors */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-radial from-amber-300/35 via-yellow-200/20 to-transparent rounded-full blur-3xl pointer-events-none ${glowClassName}`}
      />
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-radial from-yellow-400/25 via-amber-400/10 to-transparent rounded-full blur-2xl pointer-events-none scale-75 ${glowClassName}`}
      />

      {/* Signature 46-ellipse Rotating Spiral Rings Theme with website brand color gradients */}
      <svg
        className={`sg-show__rings max-w-none select-none ${className}`}
        viewBox="0 0 1000 1000"
        fill="none"
        shapeRendering="geometricPrecision"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          {/* Brand Gradient 1: Solar Gold -> Rehema Yellow -> Amber -> Champagne -> Warm Bronze */}
          <linearGradient id="rehemaGoldAmber" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FAC832" stopOpacity="0.85" />
            <stop offset="25%" stopColor="#F5B324" stopOpacity="0.75" />
            <stop offset="50%" stopColor="#D97706" stopOpacity="0.65" />
            <stop offset="75%" stopColor="#C5A059" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#B45309" stopOpacity="0.6" />
          </linearGradient>

          {/* Brand Gradient 2: Rehema Navy -> Champagne -> Rehema Yellow -> Amber -> Deep Navy */}
          <linearGradient id="rehemaAmberNavy" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1C3656" stopOpacity="0.65" />
            <stop offset="25%" stopColor="#C5A059" stopOpacity="0.75" />
            <stop offset="50%" stopColor="#F5B324" stopOpacity="0.85" />
            <stop offset="75%" stopColor="#D97706" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#0E1E33" stopOpacity="0.55" />
          </linearGradient>

          {/* Brand Gradient 3 (Accent Rings): Luminous Champagne -> Solar Gold -> Amber */}
          <linearGradient id="rehemaLuminous" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#FAC832" stopOpacity="0.85" />
            <stop offset="75%" stopColor="#D97706" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#C5A059" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        <g>
          {RINGS.map((ring, idx) => {
            // Alternate harmonic brand gradients across ellipses for rich iridescent sheen
            const strokeUrl =
              idx % 5 === 0
                ? 'url(#rehemaLuminous)'
                : idx % 2 === 0
                ? 'url(#rehemaGoldAmber)'
                : 'url(#rehemaAmberNavy)';

            const strokeOpacity = idx % 5 === 0 ? 0.75 : idx % 2 === 0 ? 0.6 : 0.48;
            const strokeWidth = idx % 6 === 0 ? 1.35 : 1.0;

            return (
              <ellipse
                key={idx}
                cx="500"
                cy="500"
                rx={ring.rx.toFixed(1)}
                ry={ring.ry.toFixed(1)}
                transform={`rotate(${ring.rot.toFixed(1)} 500 500)`}
                stroke={strokeUrl}
                strokeOpacity={strokeOpacity}
                strokeWidth={strokeWidth}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
}
