import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, Sparkles } from 'lucide-react';
import type { Artwork } from '@/lib/artworks';
import { useStore } from '@/store/StoreContext';
import { TRANSLATIONS } from '@/lib/translations';

interface GalleryCardTheme {
  id: string;
  cardGradient: string;
  borderGradient: string;
  cornerGlow: string;
  ambientBoxShadow: string;
}

const GALLERY_THEMES: GalleryCardTheme[] = [
  {
    id: 'art-terracotta',
    // Card 1: Warm Terracotta Rust Gradient
    cardGradient: 'linear-gradient(160deg, #E2632B 0%, #D25A24 42%, #8A330B 100%)',
    borderGradient:
      'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 180, 130, 0.9) 25%, #F97316 55%, #D25A24 85%, rgba(255, 255, 255, 0.45) 100%)',
    cornerGlow:
      'radial-gradient(circle at 100% 0%, rgba(249, 115, 22, 0.75) 0%, transparent 65%), radial-gradient(circle at 0% 100%, rgba(210, 90, 36, 0.65) 0%, transparent 65%)',
    ambientBoxShadow: '0 0 22px 2px rgba(249, 115, 22, 0.45), 0 0 46px 6px rgba(210, 90, 36, 0.22)',
  },
  {
    id: 'art-navy',
    // Card 2: Deep Slate Navy Gradient
    cardGradient: 'linear-gradient(160deg, #374E6B 0%, #2C3E55 42%, #162230 100%)',
    borderGradient:
      'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(147, 197, 253, 0.9) 25%, #60A5FA 55%, #2C3E55 85%, rgba(255, 255, 255, 0.4) 100%)',
    cornerGlow:
      'radial-gradient(circle at 0% 0%, rgba(96, 165, 250, 0.75) 0%, transparent 65%), radial-gradient(circle at 100% 100%, rgba(59, 130, 246, 0.6) 0%, transparent 65%)',
    ambientBoxShadow: '0 0 22px 2px rgba(96, 165, 250, 0.45), 0 0 46px 6px rgba(44, 62, 85, 0.28)',
  },
  {
    id: 'art-cobalt',
    // Card 3: Vibrant Royal Cobalt Gradient
    cardGradient: 'linear-gradient(160deg, #1A7DE4 0%, #0069D2 42%, #003B78 100%)',
    borderGradient:
      'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(191, 219, 254, 0.95) 25%, #3B82F6 50%, #0069D2 80%, rgba(255, 255, 255, 0.45) 100%)',
    cornerGlow:
      'radial-gradient(circle at 100% 0%, rgba(59, 130, 246, 0.85) 0%, transparent 65%), radial-gradient(circle at 0% 100%, rgba(0, 105, 210, 0.7) 0%, transparent 65%)',
    ambientBoxShadow: '0 0 24px 3px rgba(59, 130, 246, 0.55), 0 0 50px 8px rgba(0, 105, 210, 0.28)',
  },
  {
    id: 'art-forest',
    // Card 4: Dark Forest Sage-Teal Gradient
    cardGradient: 'linear-gradient(160deg, #537670 0%, #45635E 42%, #203431 100%)',
    borderGradient:
      'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(167, 243, 208, 0.9) 25%, #34D399 55%, #45635E 85%, rgba(255, 255, 255, 0.4) 100%)',
    cornerGlow:
      'radial-gradient(circle at 0% 0%, rgba(52, 211, 153, 0.75) 0%, transparent 65%), radial-gradient(circle at 100% 100%, rgba(69, 99, 94, 0.6) 0%, transparent 65%)',
    ambientBoxShadow: '0 0 22px 2px rgba(52, 211, 153, 0.45), 0 0 46px 6px rgba(69, 99, 94, 0.26)',
  },
];

interface GalleryShowcaseCardsProps {
  artworks: Artwork[];
  onSelectArtwork: (artwork: Artwork) => void;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
}

export default function GalleryShowcaseCards({
  artworks,
  onSelectArtwork,
  isFavorite,
  toggleFavorite,
}: GalleryShowcaseCardsProps) {
  const { language } = useStore();
  const t = (key: keyof typeof TRANSLATIONS.en) =>
    TRANSLATIONS[language]?.[key] ?? TRANSLATIONS.en[key];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 items-stretch">
      {artworks.map((art, idx) => {
        const theme = GALLERY_THEMES[idx % GALLERY_THEMES.length];
        const fav = isFavorite(art.id);

        return (
          <div
            key={art.id}
            className="relative group transition-transform duration-300 hover:-translate-y-2 flex flex-col"
          >
            {/* 1. Ambient Corner Dégradé Glow */}
            <div
              className="absolute -inset-[3px] rounded-[30px] opacity-65 group-hover:opacity-100 blur-[10px] transition-all duration-500 pointer-events-none z-0"
              style={{ background: theme.cornerGlow }}
              aria-hidden="true"
            />

            {/* 2. Precision Mirror Gradient Rim Frame (2px rounded stroke with specular reflection) */}
            <div
              className="relative p-[2px] rounded-[26px] z-10 transition-shadow duration-300 h-full flex flex-col flex-1"
              style={{
                background: theme.borderGradient,
                boxShadow: `0 14px 32px -4px rgba(0,0,0,0.18), ${theme.ambientBoxShadow}`,
              }}
            >
              {/* 3. Gradient Inner Card Surface with Grain & Content */}
              <div
                className="w-full h-full rounded-[24px] text-white flex flex-col justify-between p-4 sm:p-4.5 relative overflow-hidden select-none flex-1"
                style={{ background: theme.cardGradient }}
              >
                {/* Tactile Risograph / Film Grain Fractal Noise Overlay */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay z-[1]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise-${theme.id}-${art.id}'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise-${theme.id}-${art.id})'/%3E%3C/svg%3E")`,
                    backgroundSize: '120px 120px',
                  }}
                  aria-hidden="true"
                />

                {/* Secondary Fine Paper Flecks & Stipple Grain Texture */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-25 mix-blend-soft-light z-[1]"
                  style={{
                    backgroundImage: `radial-gradient(rgba(255,255,255,0.25) 1px, transparent 1px), radial-gradient(rgba(0,0,0,0.3) 1px, transparent 1px)`,
                    backgroundSize: '4px 4px',
                    backgroundPosition: '0 0, 2px 2px',
                  }}
                  aria-hidden="true"
                />

                {/* Subtle Inner Vignette for Physical Depth */}
                <div
                  className="absolute inset-0 pointer-events-none shadow-[inset_0_0_28px_rgba(0,0,0,0.25)] rounded-[inherit] z-[1]"
                  aria-hidden="true"
                />

                {/* Top Inset Hairline */}
                <div className="absolute top-3 left-4 right-4 h-[1px] bg-white/20 pointer-events-none z-[2]" />

                {/* Bottom Inset Hairline */}
                <div className="absolute bottom-3 left-4 right-4 h-[1px] bg-white/20 pointer-events-none z-[2]" />

                {/* Card Top & Middle: Image and Details */}
                <div className="relative z-10 flex flex-col">
                  {/* Artwork Image Viewport */}
                  <div
                    className="relative aspect-[4/3] rounded-[18px] overflow-hidden cursor-pointer group/img border border-white/25 shadow-md bg-black/25"
                    onClick={() => onSelectArtwork(art)}
                  >
                    <img
                      src={art.image}
                      alt={art.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-108"
                    />

                    {/* Subtle bottom vignette inside image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300" />

                    {/* Favorite Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(art.id);
                      }}
                      className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-slate-950/60 backdrop-blur-md flex items-center justify-center text-white border border-white/25 hover:bg-slate-950/85 transition-all shadow-sm z-10"
                      aria-label="Save artwork"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 transition-colors ${
                          fav ? 'fill-rose-500 text-rose-500' : 'text-white'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Artwork Meta: Category Badge */}
                  <div className="flex items-center gap-1.5 mt-3.5 mb-1.5">
                    <div className="w-3.5 h-3.5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-2 h-2 text-white" />
                    </div>
                    <span className="text-[10px] font-sans tracking-[0.16em] uppercase font-bold text-white/90 truncate">
                      {art.categoryLabel}
                    </span>
                  </div>

                  {/* Artwork Title */}
                  <h3
                    onClick={() => onSelectArtwork(art)}
                    className="font-serif text-lg sm:text-xl font-medium text-white group-hover:text-amber-200 transition-colors cursor-pointer line-clamp-1"
                    title={art.title}
                  >
                    {art.title}
                  </h3>

                  {/* Subtext: Artist name removed, strictly keeping KAZE Collections */}
                  <p className="text-xs text-white/80 font-light mt-1">
                    KAZE Collections
                  </p>
                </div>

                {/* Card Bottom: Interactive CTA Button */}
                <div className="relative z-10 mt-4 pt-3 border-t border-white/15">
                  <Link
                    to="/gallery"
                    className="w-full py-2.5 px-4 bg-white/15 hover:bg-white text-white hover:text-slate-950 border border-white/25 font-sans text-xs font-semibold tracking-wider uppercase rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn backdrop-blur-sm shadow-sm"
                  >
                    <span>{t('gallery.viewInGallery')}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
