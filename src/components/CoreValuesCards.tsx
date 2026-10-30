import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, HeartHandshake, Shield, Eye } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { TRANSLATIONS } from '@/lib/translations';

// 1. Bespoke White Line-Art Sticker: Empowerment (Rising dawn sun, ascending steps forward, strength)
function EmpowermentSticker() {
  return (
    <svg
      viewBox="0 0 240 180"
      className="w-full h-28 sm:h-32 object-contain mx-auto select-none transition-transform duration-500 group-hover:scale-105"
      fill="none"
      stroke="white"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Climbing Stepping Stones / Path Forward */}
      <path d="M48 136 H88 V112 H128 V88 H168 V64 H192" stroke="white" strokeWidth="2.2" />
      <line x1="48" y1="136" x2="48" y2="148" stroke="white" strokeWidth="1.8" />
      <line x1="88" y1="136" x2="88" y2="148" stroke="white" strokeWidth="1.8" />
      <line x1="128" y1="112" x2="128" y2="148" stroke="white" strokeWidth="1.6" strokeDasharray="3 3" opacity="0.6" />
      <line x1="168" y1="88" x2="168" y2="148" stroke="white" strokeWidth="1.6" strokeDasharray="3 3" opacity="0.6" />

      {/* Rising Sun of Renewal at Top */}
      <circle cx="168" cy="42" r="18" stroke="white" strokeWidth="2" fill="white" fillOpacity="0.15" />
      <path d="M168 16 V8 M144 24 L138 18 M192 24 L198 18 M136 42 H128 M208 42 H200" stroke="white" strokeWidth="1.8" />

      {/* Ascending Figure Silhouette Line-Art */}
      <circle cx="112" cy="68" r="6" stroke="white" strokeWidth="1.8" />
      <path d="M104 88 L112 74 L120 88 M112 78 L124 72" stroke="white" strokeWidth="1.8" />

      {/* Sparkles of Potential */}
      <path d="M72 48 L74 53 L79 55 L74 57 L72 62 L70 57 L65 55 L70 53 Z" fill="white" stroke="none" opacity="0.9" />
      <circle cx="48" cy="80" r="2.5" fill="white" />
      <circle cx="204" cy="98" r="2.5" fill="white" />
    </svg>
  );
}

// 2. Bespoke White Line-Art Sticker: Respect and Dignity (Cupping hands, radiant heart of worth, laurel leaves)
function DignitySticker() {
  return (
    <svg
      viewBox="0 0 240 180"
      className="w-full h-28 sm:h-32 object-contain mx-auto select-none transition-transform duration-500 group-hover:scale-105"
      fill="none"
      stroke="white"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Radiant Heart of Inherent Dignity */}
      <path
        d="M120 44 C104 22 76 28 76 52 C76 76 120 110 120 110 C120 110 164 76 164 52 C164 28 136 22 120 44 Z"
        stroke="white"
        strokeWidth="2.2"
        fill="white"
        fillOpacity="0.14"
      />

      {/* Cupping Caring Hands Beneath */}
      <path d="M54 118 C72 106 94 114 114 122 C126 122 148 106 166 118" stroke="white" strokeWidth="2.2" />
      <path d="M64 132 C88 122 108 128 120 132 C132 128 152 122 176 132" stroke="white" strokeWidth="1.8" />

      {/* Laurel Leaves of Honor */}
      <path d="M80 62 C74 54 62 58 60 52" stroke="white" strokeWidth="1.6" />
      <ellipse cx="68" cy="54" rx="4" ry="2" stroke="white" fill="white" fillOpacity="0.5" />
      <path d="M160 62 C166 54 178 58 180 52" stroke="white" strokeWidth="1.6" />
      <ellipse cx="172" cy="54" rx="4" ry="2" stroke="white" fill="white" fillOpacity="0.5" />

      {/* Constellation Sparkles */}
      <circle cx="120" cy="22" r="3" fill="white" />
      <path d="M188 88 L190 93 L195 95 L190 97 L188 102 L186 97 L181 95 L186 93 Z" fill="white" stroke="none" opacity="0.9" />
      <circle cx="48" cy="88" r="2.5" fill="white" />
    </svg>
  );
}

// 3. Bespoke White Line-Art Sticker: Integrity and Decency (Noble shield, cross keystone, honest bridge)
function IntegritySticker() {
  return (
    <svg
      viewBox="0 0 240 180"
      className="w-full h-28 sm:h-32 object-contain mx-auto select-none transition-transform duration-500 group-hover:scale-105"
      fill="none"
      stroke="white"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Noble Shield of Truth & Decency */}
      <path
        d="M120 24 L174 44 V88 C174 120 120 144 120 144 C120 144 66 120 66 88 V44 L120 24 Z"
        stroke="white"
        strokeWidth="2.2"
        fill="white"
        fillOpacity="0.12"
      />

      {/* Central Keystones / Cross of Moral Truth */}
      <path d="M120 46 V108 M96 68 H144" stroke="white" strokeWidth="2.2" />

      {/* United Handshake Bridge Across the Shield */}
      <path d="M96 92 H144" stroke="white" strokeWidth="2" strokeDasharray="3 3" />

      {/* Radiating Honor Stars */}
      <circle cx="120" cy="18" r="3" fill="white" />
      <circle cx="44" cy="62" r="2.5" fill="white" />
      <circle cx="196" cy="62" r="2.5" fill="white" />
      <path d="M42 112 L44 117 L49 119 L44 121 L42 126 L40 121 L35 119 L40 117 Z" fill="white" stroke="none" opacity="0.85" />
      <path d="M194 112 L196 117 L201 119 L196 121 L194 126 L192 121 L187 119 L192 117 Z" fill="white" stroke="none" opacity="0.85" />
    </svg>
  );
}

// 4. Bespoke White Line-Art Sticker: Faith-Driven Success (Cross beacon, open scripture, olive peace branch)
function FaithSticker() {
  return (
    <svg
      viewBox="0 0 240 180"
      className="w-full h-28 sm:h-32 object-contain mx-auto select-none transition-transform duration-500 group-hover:scale-105"
      fill="none"
      stroke="white"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Open Book / Living Scroll of Promise */}
      <path
        d="M120 128 C105 120 85 120 60 124 V72 C85 68 105 68 120 76 C135 68 155 68 180 72 V124 C155 120 135 120 120 128 Z"
        stroke="white"
        strokeWidth="2"
        fill="white"
        fillOpacity="0.12"
      />
      <line x1="120" y1="76" x2="120" y2="128" stroke="white" strokeWidth="1.8" />

      {/* Central Resurrected Cross Rising from Scripture */}
      <path d="M120 22 V74 M104 38 H136" stroke="white" strokeWidth="2.4" />

      {/* Radiant Beams of Faith */}
      <path d="M120 14 V8 M96 18 L90 12 M144 18 L150 12 M84 38 H76 M164 38 H156" stroke="white" strokeWidth="1.8" />

      {/* Olive Branch of Peace */}
      <path d="M152 102 C158 96 168 98 170 92" stroke="white" strokeWidth="1.6" />
      <ellipse cx="162" cy="94" rx="4" ry="2" stroke="white" fill="white" fillOpacity="0.5" />

      {/* Guiding Constellation Stars */}
      <circle cx="50" cy="46" r="3" fill="white" />
      <circle cx="190" cy="46" r="3" fill="white" />
      <path d="M188 132 L190 137 L195 139 L190 141 L188 146 L186 141 L181 139 L186 137 Z" fill="white" stroke="none" opacity="0.85" />
    </svg>
  );
}

interface ValueCardConfig {
  id: string;
  bgColorHex: string;
  borderGradient: string;
  cornerGlow: string;
  ambientBoxShadow: string;
  tagLabel: string;
  tagIcon: React.ElementType;
  headlineLine1: string;
  headlineLine2: string;
  description: string;
  href: string;
  StickerComponent: React.ComponentType;
}

export default function CoreValuesCards() {
  const { language } = useStore();

  const valuesConfig: ValueCardConfig[] = [
    {
      id: 'val-empowerment',
      bgColorHex: '#D25A24', // Card 1: Warm Terracotta
      borderGradient:
        'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 180, 130, 0.9) 25%, #F97316 55%, #D25A24 85%, rgba(255, 255, 255, 0.45) 100%)',
      cornerGlow:
        'radial-gradient(circle at 100% 0%, rgba(249, 115, 22, 0.75) 0%, transparent 65%), radial-gradient(circle at 0% 100%, rgba(210, 90, 36, 0.65) 0%, transparent 65%)',
      ambientBoxShadow: '0 0 22px 2px rgba(249, 115, 22, 0.45), 0 0 46px 6px rgba(210, 90, 36, 0.22)',
      tagLabel: language === 'fr' ? 'REHEMA · VALEUR 01' : 'REHEMA · CORE VALUE 01',
      tagIcon: Sparkles,
      headlineLine1: language === 'fr' ? 'ÉMANCIPATION &' : 'EMPOWERMENT &',
      headlineLine2: language === 'fr' ? 'RÉSILIENCE' : 'RESILIENCE',
      description:
        language === 'fr'
          ? 'Nous aidons chacun à reconnaître ses forces uniques et à poser des pas décisifs vers l’avant.'
          : 'We help people recognize their strengths and take meaningful steps forward toward renewed life.',
      href: '/our-work',
      StickerComponent: EmpowermentSticker,
    },
    {
      id: 'val-dignity',
      bgColorHex: '#2C3E55', // Card 2: Deep Slate Navy
      borderGradient:
        'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(147, 197, 253, 0.9) 25%, #60A5FA 55%, #2C3E55 85%, rgba(255, 255, 255, 0.4) 100%)',
      cornerGlow:
        'radial-gradient(circle at 0% 0%, rgba(96, 165, 250, 0.75) 0%, transparent 65%), radial-gradient(circle at 100% 100%, rgba(59, 130, 246, 0.6) 0%, transparent 65%)',
      ambientBoxShadow: '0 0 22px 2px rgba(96, 165, 250, 0.45), 0 0 46px 6px rgba(44, 62, 85, 0.28)',
      tagLabel: language === 'fr' ? 'REHEMA · VALEUR 02' : 'REHEMA · CORE VALUE 02',
      tagIcon: HeartHandshake,
      headlineLine1: language === 'fr' ? 'RESPECT ET' : 'RESPECT AND',
      headlineLine2: language === 'fr' ? 'DIGNITÉ HUMAINE' : 'HUMAN DIGNITY',
      description:
        language === 'fr'
          ? 'Nous accueillons chaque être avec compassion, sans jamais le réduire à ses erreurs passées.'
          : 'We treat every person with compassion, without reducing them to their past struggles.',
      href: '/our-work',
      StickerComponent: DignitySticker,
    },
    {
      id: 'val-integrity',
      bgColorHex: '#0069D2', // Card 3: Vibrant Electric Cobalt
      borderGradient:
        'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(191, 219, 254, 0.95) 25%, #3B82F6 50%, #0069D2 80%, rgba(255, 255, 255, 0.45) 100%)',
      cornerGlow:
        'radial-gradient(circle at 100% 0%, rgba(59, 130, 246, 0.85) 0%, transparent 65%), radial-gradient(circle at 0% 100%, rgba(0, 105, 210, 0.7) 0%, transparent 65%)',
      ambientBoxShadow: '0 0 24px 3px rgba(59, 130, 246, 0.55), 0 0 50px 8px rgba(0, 105, 210, 0.28)',
      tagLabel: language === 'fr' ? 'REHEMA · VALEUR 03' : 'REHEMA · CORE VALUE 03',
      tagIcon: Shield,
      headlineLine1: language === 'fr' ? 'INTÉGRITÉ ET' : 'INTEGRITY AND',
      headlineLine2: language === 'fr' ? 'DÉCENCE MORALE' : 'DECENCY',
      description:
        language === 'fr'
          ? 'Nous communiquons en toute franchise, agissons avec responsabilité et préservons la confiance.'
          : 'We communicate honestly, act responsibly, and protect sacred trust in all relationships.',
      href: '/our-work',
      StickerComponent: IntegritySticker,
    },
    {
      id: 'val-faith',
      bgColorHex: '#45635E', // Card 4: Dark Forest Sage-Teal
      borderGradient:
        'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(167, 243, 208, 0.9) 25%, #34D399 55%, #45635E 85%, rgba(255, 255, 255, 0.4) 100%)',
      cornerGlow:
        'radial-gradient(circle at 0% 0%, rgba(52, 211, 153, 0.75) 0%, transparent 65%), radial-gradient(circle at 100% 100%, rgba(69, 99, 94, 0.6) 0%, transparent 65%)',
      ambientBoxShadow: '0 0 22px 2px rgba(52, 211, 153, 0.45), 0 0 46px 6px rgba(69, 99, 94, 0.26)',
      tagLabel: language === 'fr' ? 'REHEMA · VALEUR 04' : 'REHEMA · CORE VALUE 04',
      tagIcon: Eye,
      headlineLine1: language === 'fr' ? 'SUCCÈS GUIDÉ' : 'FAITH-DRIVEN',
      headlineLine2: language === 'fr' ? 'PAR LA FOI' : 'PURPOSE & SUCCESS',
      description:
        language === 'fr'
          ? 'Notre foi en Jésus-Christ éclaire notre vocation, nos décisions et notre dévouement envers autrui.'
          : 'Our faith in Jesus Christ informs our purpose, choices, and commitment to serving others.',
      href: '/our-work',
      StickerComponent: FaithSticker,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-5.5 lg:gap-6 items-stretch">
      {valuesConfig.map((item) => {
        const Icon = item.tagIcon;
        const Sticker = item.StickerComponent;

        return (
          <div
            key={item.id}
            className="relative group transition-transform duration-300 hover:-translate-y-2"
          >
            {/* 1. Ambient Corner Dégradé Glow */}
            <div
              className="absolute -inset-[3px] rounded-[30px] opacity-65 group-hover:opacity-100 blur-[10px] transition-all duration-500 pointer-events-none z-0"
              style={{ background: item.cornerGlow }}
              aria-hidden="true"
            />

            {/* 2. Precision Mirror Gradient Rim Frame (2px rounded stroke with specular reflection) */}
            <div
              className="relative p-[2px] rounded-[26px] z-10 transition-shadow duration-300 h-full"
              style={{
                background: item.borderGradient,
                boxShadow: `0 14px 32px -4px rgba(0,0,0,0.22), ${item.ambientBoxShadow}`,
              }}
            >
              {/* 3. Solid Inner Card Surface with Grain & Content */}
              <div
                className="w-full h-full rounded-[24px] text-white flex flex-col justify-between p-4 sm:p-5 relative overflow-hidden select-none min-h-[350px] sm:min-h-[375px]"
                style={{ backgroundColor: item.bgColorHex }}
              >
                {/* Tactile Risograph / Film Grain Fractal Noise Overlay */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-45 mix-blend-overlay z-[1]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise-${item.id}'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise-${item.id})'/%3E%3C/svg%3E")`,
                    backgroundSize: '120px 120px',
                  }}
                  aria-hidden="true"
                />

                {/* Secondary Fine Paper Flecks & Stipple Grain Texture */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-30 mix-blend-soft-light z-[1]"
                  style={{
                    backgroundImage: `radial-gradient(rgba(255,255,255,0.25) 1px, transparent 1px), radial-gradient(rgba(0,0,0,0.3) 1px, transparent 1px)`,
                    backgroundSize: '4px 4px',
                    backgroundPosition: '0 0, 2px 2px',
                  }}
                  aria-hidden="true"
                />

                {/* Subtle Inner Vignette for Physical Depth */}
                <div
                  className="absolute inset-0 pointer-events-none shadow-[inset_0_0_28px_rgba(0,0,0,0.2)] rounded-[inherit] z-[1]"
                  aria-hidden="true"
                />

                {/* Top Inset Hairline */}
                <div className="absolute top-3 left-4 right-4 h-[1px] bg-white/20 pointer-events-none z-[2]" />

                {/* Bottom Inset Hairline */}
                <div className="absolute bottom-3 left-4 right-4 h-[1px] bg-white/20 pointer-events-none z-[2]" />

                {/* Upper Content: Line-Art Sticker Illustration */}
                <div className="pt-1.5 sm:pt-2 pb-2 flex items-center justify-center flex-1 relative z-10">
                  <Sticker />
                </div>

                {/* Lower Content: Tag, Bold Centered Headline, and Description */}
                <div className="flex flex-col items-center text-center pb-1 relative z-10">
                  {/* Brand Tag with Icon */}
                  <div className="flex items-center justify-center gap-1.5 mb-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-2 h-2 text-white" />
                    </div>
                    <span className="text-[9.5px] sm:text-[10px] font-sans tracking-[0.16em] uppercase font-bold text-white/95">
                      {item.tagLabel}
                    </span>
                  </div>

                  {/* Bold Condensed All-Caps Headline */}
                  <h3 className="font-sans font-black text-sm sm:text-[1.05rem] lg:text-[1.12rem] leading-snug text-white uppercase tracking-tight max-w-[210px] mx-auto">
                    <span className="block">{item.headlineLine1}</span>
                    <span className="block">{item.headlineLine2}</span>
                  </h3>

                  {/* Short Subtitle / Description */}
                  <p className="text-[11px] sm:text-xs text-white/80 font-light mt-2 leading-relaxed line-clamp-2 max-w-[220px]">
                    {item.description}
                  </p>

                  {/* Centered 'learn more >' Link */}
                  <div className="mt-3 pt-0.5">
                    <Link
                      to={item.href}
                      className="text-[11.5px] sm:text-xs font-sans font-medium text-white/95 hover:text-white transition-all inline-flex items-center gap-1 group/link py-0.5 px-2 rounded-full hover:bg-white/10"
                    >
                      <span className="tracking-wide lowercase">
                        {language === 'fr' ? 'en savoir plus' : 'learn more'}
                      </span>
                      <span className="group-hover/link:translate-x-0.5 transition-transform font-bold text-white text-xs">
                        &gt;
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
