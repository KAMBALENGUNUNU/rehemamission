export interface PushpinTheme {
  primary: string;
  dark: string;
  light: string;
  glow: string;
  bg: string;
  border: string;
}

// 13 distinct color themes matching the reference image's vibrant 3D plastic pushpin & soft pastel card design
export const PIN_CARD_THEMES: PushpinTheme[] = [
  // 1. Blue (like "PRODUCTION")
  {
    primary: '#2563EB',
    dark: '#1D4ED8',
    light: '#93C5FD',
    glow: '#3B82F6',
    bg: '#EEF4FF',
    border: '#D6E4FF',
  },
  // 2. Magenta Pink (like "RESEARCH")
  {
    primary: '#E11D48',
    dark: '#9F1239',
    light: '#FDA4AF',
    glow: '#EC4899',
    bg: '#FDF0F8',
    border: '#FAD2EC',
  },
  // 3. Grass Green (like "PRODUCTION MANAGEMENT")
  {
    primary: '#16A34A',
    dark: '#15803D',
    light: '#86EFAC',
    glow: '#22C55E',
    bg: '#F1FBE9',
    border: '#D4F6C2',
  },
  // 4. Teal / Mint (like "TRADITIONAL MEDIA BUY")
  {
    primary: '#0D9488',
    dark: '#0F766E',
    light: '#5EEAD4',
    glow: '#14B8A6',
    bg: '#E7FAF7',
    border: '#C2F4EC',
  },
  // 5. Electric Purple (like "DIGITAL MEDIA BUY")
  {
    primary: '#7C3AED',
    dark: '#5B21B6',
    light: '#C4B5FD',
    glow: '#8B5CF6',
    bg: '#F6EEFF',
    border: '#E9D3FF',
  },
  // 6. Warm Peach / Coral (like "TRAININGS AND WORKSHOPS")
  {
    primary: '#EA580C',
    dark: '#C2410C',
    light: '#FDBA74',
    glow: '#F97316',
    bg: '#FFF3E7',
    border: '#FFE0C2',
  },
  // 7. Sky Blue
  {
    primary: '#0284C7',
    dark: '#0369A1',
    light: '#7DD3FC',
    glow: '#0EA5E9',
    bg: '#EDF8FF',
    border: '#CCEBFD',
  },
  // 8. Rose Berry
  {
    primary: '#DB2777',
    dark: '#9D174D',
    light: '#F472B6',
    glow: '#EC4899',
    bg: '#FDF2F8',
    border: '#FBCFE8',
  },
  // 9. Warm Amber Gold
  {
    primary: '#D97706',
    dark: '#B45309',
    light: '#FCD34D',
    glow: '#F59E0B',
    bg: '#FEF9E7',
    border: '#FDE68A',
  },
  // 10. Emerald Green
  {
    primary: '#059669',
    dark: '#047857',
    light: '#6EE7B7',
    glow: '#10B981',
    bg: '#ECFDF5',
    border: '#A7F3D0',
  },
  // 11. Royal Indigo
  {
    primary: '#4F46E5',
    dark: '#3730A3',
    light: '#A5B4FC',
    glow: '#6366F1',
    bg: '#EEF2FF',
    border: '#C7D2FE',
  },
  // 12. Crimson Ruby Red
  {
    primary: '#DC2626',
    dark: '#B91C1C',
    light: '#FCA5A5',
    glow: '#EF4444',
    bg: '#FEF2F2',
    border: '#FECACA',
  },
  // 13. Deep Jade Teal
  {
    primary: '#0F766E',
    dark: '#115E59',
    light: '#5EEAD4',
    glow: '#14B8A6',
    bg: '#F0FDFA',
    border: '#99F6E4',
  },
];

// Realistic 3D pushpin matching the exact rendered thumbtack from the reference image
export default function Pushpin({ id, theme }: { id: string; theme: PushpinTheme }) {
  return (
    <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none select-none">
      <svg
        width="54"
        height="60"
        viewBox="0 0 54 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_4px_12px_rgba(0,0,0,0.18)]"
      >
        <defs>
          {/* Ambient colored radial glow onto the paper */}
          <radialGradient
            id={`pin-glow-${id}`}
            cx="50%"
            cy="65%"
            r="50%"
            fx="50%"
            fy="65%"
          >
            <stop offset="0%" stopColor={theme.glow} stopOpacity="0.85" />
            <stop offset="50%" stopColor={theme.glow} stopOpacity="0.4" />
            <stop offset="100%" stopColor={theme.glow} stopOpacity="0" />
          </radialGradient>

          {/* Base flange linear gradient */}
          <linearGradient id={`pin-base-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={theme.light} />
            <stop offset="45%" stopColor={theme.primary} />
            <stop offset="100%" stopColor={theme.dark} />
          </linearGradient>

          {/* 3D sphere gradient for the head bulb */}
          <radialGradient
            id={`pin-head-${id}`}
            cx="34%"
            cy="32%"
            r="68%"
            fx="30%"
            fy="28%"
          >
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="25%" stopColor={theme.light} />
            <stop offset="68%" stopColor={theme.primary} />
            <stop offset="100%" stopColor={theme.dark} />
          </radialGradient>

          {/* Top beveled face cap */}
          <linearGradient id={`pin-topCap-${id}`} x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor={theme.light} />
            <stop offset="60%" stopColor={theme.primary} />
            <stop offset="100%" stopColor={theme.dark} />
          </linearGradient>
        </defs>

        {/* 1. Ambient colored aura / glow spreading onto paper */}
        <ellipse cx="27" cy="40" rx="23" ry="14" fill={`url(#pin-glow-${id})`} />

        {/* 2. Soft contact drop shadow under the base */}
        <ellipse cx="30" cy="43" rx="14" ry="6" fill="rgba(0,0,0,0.26)" />

        {/* 3. Base Disc Flange (round bottom that presses against card) */}
        <ellipse cx="27" cy="41" rx="14" ry="6" fill={theme.dark} opacity="0.65" />
        <ellipse cx="27" cy="39.5" rx="13.5" ry="5.5" fill={`url(#pin-base-${id})`} />
        {/* Base rim specular reflection */}
        <path
          d="M 15.5 39.5 C 18.5 43 35.5 43 38.5 39.5"
          stroke="#ffffff"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.55"
        />

        {/* 4. Conical Neck / Waist connecting base to head */}
        <path
          d="M 21.5 24 C 21.5 31, 19 36, 17 38.5 L 37 38.5 C 35 36, 32.5 31, 32.5 24 Z"
          fill={`url(#pin-base-${id})`}
        />

        {/* 5. 3D Head Bulb */}
        <circle cx="27" cy="20.5" r="13" fill={`url(#pin-head-${id})`} />

        {/* 6. Top Beveled Circular Face */}
        <ellipse cx="27" cy="17" rx="11" ry="6.8" fill={`url(#pin-topCap-${id})`} />

        {/* 7. Inner Bevel Highlight */}
        <ellipse cx="26.5" cy="16.5" rx="9.5" ry="5.2" fill={theme.primary} opacity="0.4" />

        {/* 8. Specular Reflections (Glossy 3D shine) */}
        {/* Arc highlight along top-left rim */}
        <path
          d="M 18 16 C 20 13, 26 12, 32 13"
          stroke="#ffffff"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.95"
        />
        {/* Secondary soft shine spot */}
        <ellipse
          cx="22.5"
          cy="15.5"
          rx="3.5"
          ry="1.8"
          fill="#ffffff"
          opacity="0.8"
          transform="rotate(-15 22.5 15.5)"
        />
        {/* Hot pinpoint reflection on lower sphere */}
        <circle cx="21" cy="23.5" r="1.5" fill="#ffffff" opacity="0.75" />
      </svg>
    </div>
  );
}
