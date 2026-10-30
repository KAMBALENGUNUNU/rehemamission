import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, Compass, Palette } from 'lucide-react';
import { useStore } from '@/store/StoreContext';

// 1. Bespoke White Line-Art Sticker: Clinical Recovery & Compassionate Listening
function RecoverySticker() {
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
      {/* Supportive Window / Clinical Harbor Frame */}
      <rect x="25" y="18" width="190" height="135" rx="14" stroke="white" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.35" />

      {/* Central Compassionate Heart with Healing Cross */}
      <path
        d="M120 48 C102 24 74 30 74 54 C74 78 120 114 120 114 C120 114 166 78 166 54 C166 30 138 24 120 48 Z"
        stroke="white"
        strokeWidth="2.2"
        fill="white"
        fillOpacity="0.12"
      />
      {/* Healing Cross in Heart */}
      <path d="M120 48 V76 M106 62 H134" stroke="white" strokeWidth="2.4" />

      {/* Gentle Cupping Hands of Support */}
      <path d="M52 122 C68 110 92 118 114 126 C126 126 148 110 168 122" stroke="white" strokeWidth="2" />
      <path d="M62 136 C86 127 108 133 120 137 C132 133 154 127 178 136" stroke="white" strokeWidth="1.8" />

      {/* Vital Signs Lifeline / ECG Pulse */}
      <path d="M36 92 H58 L68 76 L78 108 L88 86 L98 92 H104" stroke="white" strokeWidth="1.8" opacity="0.7" />
      <path d="M136 92 H142 L152 76 L162 108 L172 86 L182 92 H204" stroke="white" strokeWidth="1.8" opacity="0.7" />

      {/* Dawn Rays of Renewal */}
      <path d="M120 20 V10 M92 24 L84 16 M148 24 L156 16" stroke="white" strokeWidth="1.8" />

      {/* Hope Stars & Sparkles */}
      <circle cx="50" cy="42" r="3" fill="white" />
      <circle cx="190" cy="42" r="3" fill="white" />
      <circle cx="182" cy="112" r="2" fill="white" />
      <circle cx="58" cy="112" r="2" fill="white" />
      <path d="M192 68 L195 75 L202 78 L195 81 L192 88 L189 81 L182 78 L189 75 Z" fill="white" stroke="none" opacity="0.9" />
      <path d="M46 64 L48 69 L53 71 L48 73 L46 78 L44 73 L39 71 L44 69 Z" fill="white" stroke="none" opacity="0.9" />
    </svg>
  );
}

// 2. Bespoke White Line-Art Sticker: Youth Dialogue & Community Circles (Phone, Chat, Smileys)
function DialogueSticker() {
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
      {/* Tilted Smartphone Centerpiece */}
      <g transform="translate(18, 5) rotate(-6 110 85)">
        <rect x="76" y="20" width="68" height="122" rx="14" stroke="white" strokeWidth="2.2" fill="white" fillOpacity="0.08" />
        {/* Phone Speaker & Indicator */}
        <line x1="102" y1="28" x2="118" y2="28" stroke="white" strokeWidth="2" />
        <line x1="98" y1="134" x2="122" y2="134" stroke="white" strokeWidth="2" />

        {/* Big Happy Smiley on Phone Screen */}
        <circle cx="110" cy="78" r="22" stroke="white" strokeWidth="2" fill="white" fillOpacity="0.14" />
        <circle cx="103" cy="73" r="2.6" fill="white" stroke="none" />
        <circle cx="117" cy="73" r="2.6" fill="white" stroke="none" />
        <path d="M102 82 C105 90 115 90 118 82" stroke="white" strokeWidth="2" />
      </g>

      {/* Floating Dialogue Speech Bubbles (matches reference Card 2) */}
      {/* Top Left Smiley Bubble */}
      <circle cx="48" cy="46" r="16" stroke="white" strokeWidth="1.8" fill="white" fillOpacity="0.1" />
      <circle cx="43" cy="43" r="2.2" fill="white" stroke="none" />
      <circle cx="53" cy="43" r="2.2" fill="white" stroke="none" />
      <path d="M43 50 C46 54 50 54 53 50" stroke="white" strokeWidth="1.6" />
      <path d="M40 60 L36 68 L47 62" stroke="white" strokeWidth="1.6" />

      {/* Top Right Heart Message Bubble */}
      <rect x="168" y="30" width="42" height="28" rx="8" stroke="white" strokeWidth="1.8" fill="white" fillOpacity="0.12" />
      <path d="M189 40 C186 36 182 37 182 41 C182 46 189 50 189 50 C189 50 196 46 196 41 C196 37 192 36 189 40 Z" fill="white" stroke="none" />
      <path d="M174 58 L169 66 L180 58" stroke="white" strokeWidth="1.6" />

      {/* Floating Thumbs Up / Positive Reaction Badge */}
      <g transform="translate(175, 78)">
        <circle cx="16" cy="16" r="15" stroke="white" strokeWidth="1.8" fill="white" fillOpacity="0.12" />
        <path d="M12 18 V23 H15 V18 M15 20 H20 C22 20 22 18 21 16 C22 16 22 14 20 13 H17 L18 10 C18 8 16 8 15 10 L13 14" stroke="white" strokeWidth="1.6" />
      </g>

      {/* Lower Left Connection Bubble */}
      <circle cx="50" cy="112" r="16" stroke="white" strokeWidth="1.8" fill="white" fillOpacity="0.1" />
      <circle cx="45" cy="109" r="2" fill="white" stroke="none" />
      <circle cx="55" cy="109" r="2" fill="white" stroke="none" />
      <path d="M45 116 C48 120 52 120 55 116" stroke="white" strokeWidth="1.6" />

      {/* Surrounding Dialogue Sparkles & Stars */}
      <path d="M86 22 L88 27 L93 29 L88 31 L86 36 L84 31 L79 29 L84 27 Z" fill="white" stroke="none" />
      <circle cx="32" cy="88" r="2.5" fill="white" />
      <circle cx="162" cy="122" r="2.5" fill="white" />
      <circle cx="204" cy="124" r="3" fill="white" />
    </svg>
  );
}

// 3. Bespoke White Line-Art Sticker: Family Restoration & Generational Trust
function FamilySticker() {
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
      {/* Harmonious Home Roofline */}
      <path d="M54 84 L120 34 L186 84" stroke="white" strokeWidth="2.4" />
      <path d="M66 78 V138 H174 V78" stroke="white" strokeWidth="1.8" fill="white" fillOpacity="0.08" />

      {/* Chimney with Warm Smoke of Peace */}
      <path d="M160 56 V38 H170 V65" stroke="white" strokeWidth="1.6" />
      <path d="M165 32 C165 24 172 22 172 16" stroke="white" strokeWidth="1.6" strokeDasharray="2 3" />

      {/* Warm Open Doorway with Heart Keystone */}
      <path d="M104 138 V102 C104 92 136 92 136 102 V138" stroke="white" strokeWidth="2" fill="white" fillOpacity="0.14" />
      <path d="M120 82 C116 78 110 79 110 83 C110 88 120 92 120 92 C120 92 130 88 130 83 C130 79 124 78 120 82 Z" fill="white" stroke="none" />

      {/* United Generational Family Figures */}
      {/* Parent Figure Left */}
      <circle cx="86" cy="108" r="5.5" stroke="white" strokeWidth="1.6" />
      <path d="M78 128 C78 118 94 118 94 128" stroke="white" strokeWidth="1.6" />

      {/* Youth Figure Right */}
      <circle cx="154" cy="108" r="5.5" stroke="white" strokeWidth="1.6" />
      <path d="M146 128 C146 118 162 118 162 128" stroke="white" strokeWidth="1.6" />

      {/* Clasping Handshake / Bridge of Trust Across the Threshold */}
      <path d="M94 122 H146" stroke="white" strokeWidth="2" strokeDasharray="3 3" />

      {/* Olive Leaves / Healing Laurel Branch on Roof */}
      <path d="M120 34 C114 24 100 26 98 18" stroke="white" strokeWidth="1.6" />
      <ellipse cx="104" cy="22" rx="4.5" ry="2.2" stroke="white" fill="white" fillOpacity="0.5" />
      <ellipse cx="114" cy="26" rx="4.5" ry="2.2" stroke="white" fill="white" fillOpacity="0.5" />

      {/* Harmonious Constellation Stars */}
      <circle cx="36" cy="48" r="2.5" fill="white" />
      <circle cx="204" cy="48" r="2.5" fill="white" />
      <path d="M40 106 L42 111 L47 113 L42 115 L40 120 L38 115 L33 113 L38 111 Z" fill="white" stroke="none" opacity="0.85" />
      <path d="M198 106 L200 111 L205 113 L200 115 L198 120 L196 115 L191 113 L196 111 Z" fill="white" stroke="none" opacity="0.85" />
    </svg>
  );
}

// 4. Bespoke White Line-Art Sticker: Kaze Collections Atelier, Easel, Canvas & Craft
function AtelierSticker() {
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
      {/* Wooden Studio Easel Structure */}
      <line x1="120" y1="20" x2="120" y2="148" stroke="white" strokeWidth="2.2" />
      <line x1="74" y1="148" x2="120" y2="30" stroke="white" strokeWidth="2" />
      <line x1="166" y1="148" x2="120" y2="30" stroke="white" strokeWidth="2" />
      <line x1="62" y1="116" x2="178" y2="116" stroke="white" strokeWidth="2.4" />

      {/* Stretched Artwork Canvas Displaying Rwandan Volcanic Hills */}
      <rect x="74" y="42" width="92" height="68" rx="6" stroke="white" strokeWidth="2" fill="white" fillOpacity="0.12" />

      {/* Painted Mountain Contours & Sun on Canvas */}
      <path d="M78 94 L100 72 L118 88 L138 62 L162 94" stroke="white" strokeWidth="1.8" />
      <circle cx="144" cy="54" r="5.5" stroke="white" strokeWidth="1.6" fill="white" fillOpacity="0.4" />

      {/* Artist Paint Palette on Left */}
      <path
        d="M58 120 C44 112 36 126 40 137 C44 148 66 148 72 135 C74 130 70 124 64 124 C60 124 58 120 58 120 Z"
        stroke="white"
        strokeWidth="1.8"
        fill="white"
        fillOpacity="0.1"
      />
      <circle cx="53" cy="132" r="2.5" fill="white" stroke="none" />
      <circle cx="62" cy="130" r="2" fill="white" stroke="none" />
      <circle cx="49" cy="126" r="2" fill="white" stroke="none" />

      {/* Paintbrushes in Ceramic Pot on Right */}
      <rect x="170" y="120" width="24" height="28" rx="4" stroke="white" strokeWidth="1.8" fill="white" fillOpacity="0.15" />
      <line x1="176" y1="120" x2="169" y2="98" stroke="white" strokeWidth="2" />
      <path d="M169 98 L166 92 L171 94 Z" fill="white" stroke="none" />
      <line x1="187" y1="120" x2="193" y2="100" stroke="white" strokeWidth="2" />
      <path d="M193 100 L197 94 L195 102 Z" fill="white" stroke="none" />

      {/* Sparks of Creative Craft */}
      <path d="M194 48 L196 53 L201 55 L196 57 L194 62 L192 57 L187 55 L192 53 Z" fill="white" stroke="none" />
      <path d="M46 46 L48 51 L53 53 L48 55 L46 60 L44 55 L39 53 L44 51 Z" fill="white" stroke="none" />
      <circle cx="110" cy="24" r="2.5" fill="white" />
      <circle cx="130" cy="24" r="2.5" fill="white" />
    </svg>
  );
}

interface PillarCardConfig {
  id: string;
  bgColor: string; // The exact rich colors from the user's reference image
  tagLabel: string;
  tagIcon: React.ElementType;
  headlineLine1: string;
  headlineLine2: string;
  href: string;
  StickerComponent: React.ComponentType;
}

export default function PillarStickerCards() {
  const { language } = useStore();

  // 4 Core Pillars with the exact colors from the user's uploaded reference:
  // Card 1: Terracotta / Rust Orange (#D25A24)
  // Card 2: Deep Slate Navy (#2C3E55)
  // Card 3: Vibrant Electric Cobalt (#0069D2)
  // Card 4: Dark Forest Slate-Teal (#45635E)
  const pillars: PillarCardConfig[] = [
    {
      id: 'pillar-recovery',
      bgColor: 'bg-[#D25A24]',
      tagLabel: language === 'fr' ? 'REHEMA · SOUTIEN ADDICTIONS' : 'REHEMA · ADDICTION RECOVERY',
      tagIcon: Compass,
      headlineLine1: language === 'fr' ? 'SOUTIEN CLINIQUE &' : 'COMPASSIONATE',
      headlineLine2: language === 'fr' ? 'RENAISSANCE' : 'ADDICTION RECOVERY',
      href: '/our-work',
      StickerComponent: RecoverySticker,
    },
    {
      id: 'pillar-dialogue',
      bgColor: 'bg-[#2C3E55]',
      tagLabel: language === 'fr' ? 'REHEMA · JEUNESSE & DIALOGUE' : 'REHEMA · YOUTH DIALOGUE',
      tagIcon: Users,
      headlineLine1: language === 'fr' ? 'MASCULINITÉ POSITIVE &' : 'EMPOWERED YOUTH IN',
      headlineLine2: language === 'fr' ? 'DIALOGUE' : 'EVERY CIRCLE',
      href: '/our-work',
      StickerComponent: DialogueSticker,
    },
    {
      id: 'pillar-family',
      bgColor: 'bg-[#0069D2]',
      tagLabel: language === 'fr' ? 'REHEMA · RESTAURATION FAMILIALE' : 'REHEMA · FAMILY RESTORATION',
      tagIcon: Heart,
      headlineLine1: language === 'fr' ? 'RÉCONCILIATION DANS' : 'REBUILDING TRUST IN',
      headlineLine2: language === 'fr' ? 'LES FOYERS' : 'EVERY FAMILY',
      href: '/our-story',
      StickerComponent: FamilySticker,
    },
    {
      id: 'pillar-kaze',
      bgColor: 'bg-[#45635E]',
      tagLabel: language === 'fr' ? 'REHEMA · KAZE COLLECTIONS' : 'REHEMA · KAZE COLLECTIONS',
      tagIcon: Palette,
      headlineLine1: language === 'fr' ? 'HAUTE CRÉATION &' : 'VOCATIONAL ART &',
      headlineLine2: language === 'fr' ? 'AUTONOMIE' : 'LIVELIHOOD',
      href: '/gallery',
      StickerComponent: AtelierSticker,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4.5 lg:gap-5 items-stretch">
      {pillars.map((pillar) => {
        const Icon = pillar.tagIcon;
        const Sticker = pillar.StickerComponent;

        return (
          <div
            key={pillar.id}
            className={`${pillar.bgColor} rounded-[22px] sm:rounded-[26px] text-white flex flex-col justify-between shadow-[0_12px_28px_rgba(0,0,0,0.14)] hover:shadow-[0_18px_38px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-1.5 p-4 sm:p-5 relative overflow-hidden group select-none min-h-[350px] sm:min-h-[375px]`}
          >
            {/* 1. Tactile Risograph / Film Grain Fractal Noise Overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-45 mix-blend-overlay z-[1]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                backgroundSize: '120px 120px',
              }}
              aria-hidden="true"
            />

            {/* 2. Secondary Fine Paper Flecks & Stipple Grain Texture */}
            <div
              className="absolute inset-0 pointer-events-none opacity-30 mix-blend-soft-light z-[1]"
              style={{
                backgroundImage: `radial-gradient(rgba(255,255,255,0.25) 1px, transparent 1px), radial-gradient(rgba(0,0,0,0.3) 1px, transparent 1px)`,
                backgroundSize: '4px 4px',
                backgroundPosition: '0 0, 2px 2px',
              }}
              aria-hidden="true"
            />

            {/* 3. Subtle Inner Vignette for Physical Paper Depth */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_28px_rgba(0,0,0,0.2)] rounded-[inherit] z-[1]" aria-hidden="true" />

            {/* Top Inset Hairline (Matching Reference Inset Framing) */}
            <div className="absolute top-3 left-4 right-4 h-[1px] bg-white/20 pointer-events-none z-[2]" />

            {/* Bottom Inset Hairline (Matching Reference Inset Framing) */}
            <div className="absolute bottom-3 left-4 right-4 h-[1px] bg-white/20 pointer-events-none z-[2]" />

            {/* Upper Content: Line-Art Sticker Illustration */}
            <div className="pt-1.5 sm:pt-2 pb-2 flex items-center justify-center flex-1 relative z-10">
              <Sticker />
            </div>

            {/* Lower Content: Tag, Bold Centered Headline, and Learn More Link */}
            <div className="flex flex-col items-center text-center pb-1 relative z-10">
              {/* Brand Tag with Icon (Matches reference logo & eyebrow) */}
              <div className="flex items-center justify-center gap-1.5 mb-2">
                <div className="w-3.5 h-3.5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-2 h-2 text-white" />
                </div>
                <span className="text-[9.5px] sm:text-[10px] font-sans tracking-[0.16em] uppercase font-bold text-white/95">
                  {pillar.tagLabel}
                </span>
              </div>

              {/* Bold Condensed All-Caps Headline (Matches reference) */}
              <h3 className="font-sans font-black text-sm sm:text-[1.05rem] lg:text-[1.12rem] leading-snug text-white uppercase tracking-tight max-w-[210px] mx-auto">
                <span className="block">{pillar.headlineLine1}</span>
                <span className="block">{pillar.headlineLine2}</span>
              </h3>

              {/* Centered 'learn more >' Link (Matches reference) */}
              <div className="mt-3.5 pt-0.5">
                <Link
                  to={pillar.href}
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
        );
      })}
    </div>
  );
}
