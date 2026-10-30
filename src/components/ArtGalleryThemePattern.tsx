import React from 'react';

interface ArtGalleryThemePatternProps {
  className?: string;
  opacity?: number;
}

/**
 * ArtGalleryThemePattern
 * Bespoke fine art gallery vector pattern inspired by creative studio doodles:
 * features painter's palettes, easels, museum frames, classical busts, paint tubes,
 * sculpture pedestals, palette knives, and creative swirls.
 */
export default function ArtGalleryThemePattern({
  className = '',
  opacity = 0.16,
}: ArtGalleryThemePatternProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern
            id="kaze-gallery-art-pattern"
            width="320"
            height="320"
            patternUnits="userSpaceOnUse"
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={opacity}
            >
              {/* 1. Artist Wooden Easel with Canvas (Top-Left 40,40) */}
              <g transform="translate(30, 25)">
                {/* Easel tripod legs */}
                <line x1="40" y1="10" x2="15" y2="90" />
                <line x1="40" y1="10" x2="65" y2="90" />
                <line x1="40" y1="10" x2="40" y2="92" strokeDasharray="3 3" />
                {/* Cross shelf */}
                <line x1="18" y1="62" x2="62" y2="62" strokeWidth="2.4" />
                {/* Canvas resting on shelf */}
                <rect x="22" y="30" width="36" height="30" rx="2" fill="currentColor" fillOpacity="0.08" />
                {/* Mini landscape artwork on canvas */}
                <path d="M26 52 L36 42 L44 49 L54 38" />
                <circle cx="32" cy="38" r="2.5" fill="currentColor" />
                {/* Top peg */}
                <line x1="36" y1="28" x2="44" y2="28" strokeWidth="2" />
              </g>

              {/* 2. Painter's Palette with Thumbhole and Brushes (Top-Right 180, 30) */}
              <g transform="translate(190, 25)">
                {/* Classic oval palette with thumbhole */}
                <path
                  d="M40 10 C62 10 78 26 78 46 C78 68 56 82 40 82 C28 82 18 72 14 62 C10 50 16 38 12 28 C8 18 20 10 40 10 Z"
                  fill="currentColor"
                  fillOpacity="0.06"
                />
                {/* Thumbhole */}
                <ellipse cx="28" cy="64" rx="5" ry="7" />
                {/* Paint dollops */}
                <circle cx="34" cy="24" r="3" fill="currentColor" />
                <circle cx="50" cy="22" r="3" fill="currentColor" />
                <circle cx="64" cy="32" r="3" fill="currentColor" />
                <circle cx="66" cy="48" r="3" fill="currentColor" />
                <circle cx="56" cy="62" r="3" fill="currentColor" />
                {/* Artist brushes passing through thumbhole */}
                <line x1="16" y1="84" x2="44" y2="44" strokeWidth="2" />
                <line x1="10" y1="78" x2="40" y2="48" strokeWidth="1.5" />
              </g>

              {/* 3. Framed Museum Picture on Wall with Hanging Wire (Center 110, 110) */}
              <g transform="translate(115, 115)">
                {/* Hanging wire & nail */}
                <circle cx="45" cy="5" r="2" fill="currentColor" />
                <line x1="45" y1="5" x2="20" y2="22" />
                <line x1="45" y1="5" x2="70" y2="22" />
                {/* Outer luxury ornate picture frame */}
                <rect x="15" y="22" width="60" height="46" rx="3" strokeWidth="2.2" />
                <rect x="20" y="27" width="50" height="36" rx="1.5" strokeDasharray="4 2" />
                {/* Inner sunburst / mountain horizon art */}
                <path d="M24 55 Q 36 40 45 48 T 66 38" />
                <circle cx="54" cy="36" r="4" fill="currentColor" fillOpacity="0.18" />
              </g>

              {/* 4. Squeezed Paint Tube with Acrylic Ribbon Swirl (Left 20, 160) */}
              <g transform="translate(20, 155)">
                {/* Paint tube body */}
                <path d="M12 40 L38 28 L50 54 L24 66 Z" fill="currentColor" fillOpacity="0.08" />
                {/* Crimped end */}
                <line x1="10" y1="36" x2="16" y2="46" strokeWidth="2.5" />
                {/* Cap and nozzle */}
                <path d="M44 25 L50 22 L54 30 L48 33 Z" fill="currentColor" />
                {/* Ribbon swirl of paint squirting out */}
                <path
                  d="M52 23 C62 14 74 18 78 28 C82 38 72 46 64 42 C56 38 60 28 72 26"
                  strokeWidth="2.2"
                />
              </g>

              {/* 5. Classical Sculpted Museum Bust Outline (Bottom-Right 200, 160) */}
              <g transform="translate(210, 150)">
                {/* Pedestal */}
                <rect x="22" y="72" width="36" height="10" rx="1.5" strokeWidth="2" />
                <rect x="28" y="66" width="24" height="6" />
                {/* Bust neck & shoulders */}
                <path d="M18 64 C22 52 30 50 34 46 L34 40 L46 40 L46 46 C50 50 58 52 62 64 Z" />
                {/* Head outline */}
                <path d="M32 38 C28 32 30 20 40 18 C50 20 52 32 48 38 Z" fill="currentColor" fillOpacity="0.07" />
                {/* Classical hair curls */}
                <path d="M30 22 Q 34 14 40 14 Q 46 14 50 22" />
                <circle cx="36" cy="27" r="1.5" fill="currentColor" />
                <circle cx="44" cy="27" r="1.5" fill="currentColor" />
              </g>

              {/* 6. Palette Knife & Drafting Pencil Crossing (Center-Bottom 120, 220) */}
              <g transform="translate(125, 220)">
                {/* Palette knife */}
                <path d="M15 65 L32 48 L44 48 L56 36 L62 42 L48 54 L48 66 Z" fill="currentColor" fillOpacity="0.1" />
                <line x1="12" y1="68" x2="26" y2="54" strokeWidth="2.5" />
                {/* Artist drafting pencil */}
                <line x1="68" y1="20" x2="30" y2="70" strokeWidth="2" />
                <path d="M30 70 L26 74 L32 72 Z" fill="currentColor" />
              </g>

              {/* 7. Gallery Spotlight with Beams of Light (Top-Center 130, 20) */}
              <g transform="translate(130, 15)">
                {/* Spotlight housing */}
                <rect x="24" y="6" width="16" height="12" rx="2" fill="currentColor" fillOpacity="0.15" />
                <path d="M22 18 L16 32 L48 32 L42 18 Z" />
                {/* Swivel bracket */}
                <path d="M20 10 H14 V4 H50 V10 H44" />
                {/* Light cone rays */}
                <line x1="18" y1="34" x2="6" y2="52" strokeDasharray="3 3" opacity="0.6" />
                <line x1="46" y1="34" x2="58" y2="52" strokeDasharray="3 3" opacity="0.6" />
              </g>

              {/* 8. Rwandan Imigongo Chevron / Geometric Art Tile (Bottom-Left 30, 240) */}
              <g transform="translate(35, 235)">
                {/* Diamond geometric frame */}
                <polygon points="35,10 65,40 35,70 5,40" strokeWidth="2" fill="currentColor" fillOpacity="0.05" />
                {/* Concentric diamond ripples */}
                <polygon points="35,20 55,40 35,60 15,40" strokeWidth="1.6" />
                <polygon points="35,30 45,40 35,50 25,40" strokeWidth="1.2" />
                <circle cx="35" cy="40" r="2.5" fill="currentColor" />
              </g>

              {/* 9. Rwandan Agaseke Peace Basket Silhouette (Heritage Atelier Symbol) */}
              <g transform="translate(250, 75)">
                {/* Pointed conical lid */}
                <path d="M25 6 L14 36 L36 36 Z" strokeWidth="1.8" fill="currentColor" fillOpacity="0.06" />
                <line x1="25" y1="2" x2="25" y2="6" strokeWidth="2" />
                {/* Basket body */}
                <path d="M14 36 C10 46 8 58 14 66 C18 70 32 70 36 66 C42 58 40 46 36 36 Z" strokeWidth="1.8" fill="currentColor" fillOpacity="0.06" />
                {/* Zigzag weaving detail */}
                <path d="M16 46 L20 42 L25 46 L30 42 L34 46" strokeWidth="1.4" />
                <path d="M15 56 L20 52 L25 56 L30 52 L35 56" strokeWidth="1.4" />
              </g>

              {/* 10. Open Artist Sketchbook Journal with Bookmark Ribbon */}
              <g transform="translate(235, 225)">
                {/* Left and right open pages */}
                <path d="M35 15 C24 12 12 14 6 18 L6 46 C12 42 24 40 35 43 Z" strokeWidth="1.8" fill="currentColor" fillOpacity="0.06" />
                <path d="M35 15 C46 12 58 14 64 18 L64 46 C58 42 46 40 35 43 Z" strokeWidth="1.8" fill="currentColor" fillOpacity="0.06" />
                {/* Spine line */}
                <line x1="35" y1="13" x2="35" y2="44" strokeWidth="2" />
                {/* Bookmark ribbon */}
                <path d="M35 43 Q 32 50 36 54" strokeWidth="1.5" />
                {/* Mini sketches on pages */}
                <line x1="12" y1="24" x2="28" y2="24" strokeDasharray="2 2" strokeWidth="1.2" />
                <line x1="12" y1="30" x2="26" y2="30" strokeDasharray="2 2" strokeWidth="1.2" />
                <circle cx="50" cy="27" r="4" strokeWidth="1.2" />
              </g>

              {/* 11. Floating Fine Art Constellations & Sparkles (Filling interstitial space) */}
              {/* Star sparkles */}
              <path d="M95 75 L97 81 L103 83 L97 85 L95 91 L93 85 L87 83 L93 81 Z" fill="currentColor" opacity="0.85" />
              <path d="M280 95 L281.5 100 L287 101.5 L281.5 103 L280 108 L278.5 103 L273 101.5 L278.5 100 Z" fill="currentColor" opacity="0.8" />
              <path d="M195 245 L196.5 250 L202 251.5 L196.5 253 L195 258 L193.5 253 L188 251.5 L193.5 250 Z" fill="currentColor" opacity="0.75" />
              <path d="M25 110 L26.5 114 L31 115.5 L26.5 117 L25 121 L23.5 117 L19 115.5 L23.5 114 Z" fill="currentColor" opacity="0.75" />

              {/* Small floating dots & paint droplets */}
              <circle cx="102" cy="185" r="2" fill="currentColor" opacity="0.6" />
              <circle cx="168" cy="88" r="2" fill="currentColor" opacity="0.6" />
              <circle cx="270" cy="40" r="2.5" fill="currentColor" opacity="0.5" />
              <circle cx="285" cy="225" r="2" fill="currentColor" opacity="0.6" />
              <circle cx="85" cy="28" r="1.5" fill="currentColor" opacity="0.5" />
              <circle cx="165" cy="285" r="2" fill="currentColor" opacity="0.6" />

              {/* Dynamic artistic brush curve */}
              <path d="M230 115 Q 255 125 260 145" strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
              <path d="M85 160 Q 95 180 80 195" strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
            </g>
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#kaze-gallery-art-pattern)" />
      </svg>
    </div>
  );
}
