import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle, ArrowRight, Sparkles, Heart } from 'lucide-react';
import { type Artwork, REHEMA_ARTWORKS } from '@/lib/artworks';
import { useStore } from '@/store/StoreContext';
import { formatPrice } from '@/lib/utils';

interface TriptychCoverflowProps {
  onSelectArtwork: (artwork: Artwork) => void;
}

interface CoverflowItem {
  id: string;
  title: string;
  artistIdentifier: string;
  year: number;
  categoryLabel: string;
  medium: string;
  dimensions: string;
  priceRwf: number;
  priceUsd: number;
  image: string;
  aboutArt: string;
  artworkRef?: Artwork;
}

export default function TriptychCoverflow({ onSelectArtwork }: TriptychCoverflowProps) {
  const { toggleFavorite, isFavorite, language } = useStore();
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const wheelLockRef = useRef(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Curated masterwork collection for the Triptych Coverflow
  const items: CoverflowItem[] = [
    {
      id: 'kaze-hero-masterpiece',
      title: language === 'fr' ? 'Symphonie des Mille Collines' : 'Symphony of the Thousand Hills',
      artistIdentifier: language === 'fr' ? 'Atelier Kaze · Collectif Jeunesse' : 'Kaze Atelier Youth Masters',
      year: 2025,
      categoryLabel: language === 'fr' ? 'Chef-d’Œuvre Panoramique' : 'Panoramic Masterwork',
      medium: language === 'fr' ? 'Acrylique & pigments naturels sur toile' : 'Acrylic & natural earth pigments on canvas',
      dimensions: '120 × 200 cm (47.2 × 78.7 in)',
      priceRwf: 750000,
      priceUsd: 560,
      image: '/kaze-hero.jpg',
      aboutArt: language === 'fr'
        ? 'Une contemplation monumentale des crêtes volcaniques rwandaises baignées par la brume matinale, symbolisant la résilience, la paix sacrée et l’élévation des jeunes artisans.'
        : 'A monumental contemplation of Rwanda’s volcanic ridges bathed in morning mist, translating resilience, inner stillness, and collective elevation into layered chromatic harmony.',
      artworkRef: REHEMA_ARTWORKS[1],
    },
    ...REHEMA_ARTWORKS.slice(0, 5).map((art) => ({
      id: art.id,
      title: art.title,
      artistIdentifier: art.artistIdentifier,
      year: art.year,
      categoryLabel: art.categoryLabel,
      medium: art.medium,
      dimensions: art.dimensions,
      priceRwf: art.priceRwf,
      priceUsd: art.priceUsd,
      image: art.image,
      aboutArt: art.hook.replace(/^["“]|["”]$/g, '') + ' ' + art.whatViewerSees.slice(0, 140) + '...',
      artworkRef: art,
    })),
  ];

  const total = items.length;

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Hover transition with slight intent delay (prevents accidental trigger on casual pass)
  const handleSideHover = (targetIndex: number) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveIndex(targetIndex);
    }, 140);
  };

  const handleSideHoverLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  // Scroll / Wheel gesture support: scrolling toward either side transitions the card
  const handleWheel = (e: React.WheelEvent) => {
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(delta) < 22) return;

    if (wheelLockRef.current) return;
    wheelLockRef.current = true;

    if (delta > 0) {
      handleNext();
    } else {
      handlePrev();
    }

    setTimeout(() => {
      wheelLockRef.current = false;
    }, 400);
  };

  // Keyboard left/right arrow navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  const currentItem = items[activeIndex];

  return (
    <section
      ref={containerRef}
      onWheel={handleWheel}
      className="relative w-full overflow-hidden py-16 sm:py-24 text-white select-none transition-colors duration-700"
    >
      {/* 1. DYNAMIC FULL-BLEED MIRROR BACKGROUND WITH HEAVY GAUSSIAN BLUR & DARK VIGNETTE */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        {items.map((item, idx) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              idx === activeIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={item.image}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover scale-110 filter blur-[40px] brightness-[0.6] saturate-150"
              style={{ backdropFilter: 'blur(40px)' }}
            />
          </div>
        ))}

        {/* Dark Vignette Overlay for High Contrast */}
        <div className="absolute inset-0 bg-stone-950/40" />
        <div className="absolute inset-0 bg-radial-vignette" />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/70 via-transparent to-stone-950/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Curatorial Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{language === 'fr' ? 'Triptyque de la Galerie' : 'Triptych Coverflow Gallery'}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal tracking-tight">
            {language === 'fr' ? 'Immersion au Cœur de la Création' : 'The Focal Art Collection'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 font-light mt-2">
            {language === 'fr'
              ? 'Survolez ou défilez sur les œuvres latérales pour les amener au centre de la scène.'
              : 'Hover or scroll toward either preview card to bring it into focal perspective.'}
          </p>
        </div>

        {/* 2. THE TRIPTYCH COVERFLOW CAROUSEL (3 Rounded-Rectangle Cards at a Time) */}
        <div className="relative w-full max-w-5xl mx-auto flex items-center justify-center h-[340px] sm:h-[420px] md:h-[480px]">
          {items.map((item, index) => {
            // Circular positioning: -1 (left), 0 (center), 1 (right)
            let diff = (index - activeIndex + total) % total;
            if (diff > total / 2) diff -= total;

            const isCenter = diff === 0;
            const isLeft = diff === -1;
            const isRight = diff === 1;
            const isFarLeft = diff < -1;
            const isFarRight = diff > 1;

            let transformStyle = '';
            let filterStyle = '';
            let opacityStyle = 0;
            let zIndex = 10;
            let cursor = 'cursor-default';

            if (isCenter) {
              // Large, sharp central focal artwork
              transformStyle = 'translateX(0) scale(1)';
              filterStyle = 'blur(0px)';
              opacityStyle = 1;
              zIndex = 30;
              cursor = 'cursor-pointer';
            } else if (isLeft) {
              // Smaller, blurred and slightly scaled-down preview card on the left
              transformStyle = 'translateX(calc(-100% - 16px)) scale(0.84)';
              filterStyle = 'blur(2.5px)';
              opacityStyle = 0.72;
              zIndex = 20;
              cursor = 'cursor-pointer';
            } else if (isRight) {
              // Smaller, blurred and slightly scaled-down preview card on the right
              transformStyle = 'translateX(calc(100% + 16px)) scale(0.84)';
              filterStyle = 'blur(2.5px)';
              opacityStyle = 0.72;
              zIndex = 20;
              cursor = 'cursor-pointer';
            } else if (isFarLeft) {
              transformStyle = 'translateX(-220%) scale(0.68)';
              filterStyle = 'blur(8px)';
              opacityStyle = 0;
              zIndex = 5;
            } else if (isFarRight) {
              transformStyle = 'translateX(220%) scale(0.68)';
              filterStyle = 'blur(8px)';
              opacityStyle = 0;
              zIndex = 5;
            }

            const fav = isFavorite(item.id);

            return (
              <div
                key={item.id}
                onMouseEnter={() => {
                  if (isLeft) handleSideHover((activeIndex - 1 + total) % total);
                  else if (isRight) handleSideHover((activeIndex + 1) % total);
                }}
                onMouseLeave={handleSideHoverLeave}
                onClick={() => {
                  if (isLeft) handlePrev();
                  else if (isRight) handleNext();
                  else if (isCenter && item.artworkRef) onSelectArtwork(item.artworkRef);
                }}
                className={`absolute top-0 w-[78vw] sm:w-[380px] md:w-[460px] lg:w-[500px] aspect-[4/3] sm:aspect-[16/11] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${cursor}`}
                style={{
                  transform: transformStyle,
                  filter: filterStyle,
                  opacity: opacityStyle,
                  zIndex,
                  pointerEvents: isCenter || isLeft || isRight ? 'auto' : 'none',
                }}
              >
                {/* Rounded-Rectangle Card Frame */}
                <div
                  className={`w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden bg-stone-900 border transition-all duration-500 relative group ${
                    isCenter
                      ? 'border-amber-400/80 shadow-[0_25px_60px_rgba(0,0,0,0.6)] ring-1 ring-white/20'
                      : 'border-white/20 shadow-[0_15px_35px_rgba(0,0,0,0.4)] hover:border-amber-400/60'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Corner Status Pill */}
                  <div className="absolute top-3.5 left-3.5 z-10">
                    <span className="px-3 py-1 rounded-full bg-stone-950/80 backdrop-blur-md text-[10px] font-semibold uppercase tracking-wider text-amber-300 border border-white/10 shadow">
                      {item.categoryLabel}
                    </span>
                  </div>

                  {/* Favorite Pill */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(item.id);
                    }}
                    className="absolute top-3.5 right-3.5 z-10 w-8 h-8 rounded-full bg-stone-950/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-stone-900 transition-all shadow"
                    aria-label="Save to favorites"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        fav ? 'fill-rose-500 text-rose-500' : 'text-stone-300 hover:text-white'
                      }`}
                    />
                  </button>

                  {/* Center Card Click-To-Open Cue Overlay */}
                  {isCenter && (
                    <div className="absolute inset-0 bg-stone-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-5 py-2.5 rounded-full bg-amber-500 text-slate-950 text-xs font-semibold uppercase tracking-wider shadow-lg flex items-center gap-1.5 transform hover:scale-105 transition-transform">
                        <span>{language === 'fr' ? 'Détails & Histoire' : 'View 5-Part Story'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  )}

                  {/* Side Card Hover Guide Hint */}
                  {!isCenter && (
                    <div className="absolute inset-0 bg-stone-950/20 hover:bg-transparent transition-colors flex items-center justify-center">
                      <span className="text-[11px] font-medium uppercase tracking-wider text-white/90 bg-stone-950/60 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
                        {language === 'fr' ? 'Cliquer pour centrer' : 'Click to center'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous artwork"
            className="absolute -left-2 sm:-left-6 md:-left-10 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full bg-stone-950/80 hover:bg-amber-500 text-white hover:text-slate-950 border border-white/20 hover:border-amber-400 backdrop-blur-md flex items-center justify-center shadow-xl transition-all duration-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next artwork"
            className="absolute -right-2 sm:-right-6 md:-right-10 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full bg-stone-950/80 hover:bg-amber-500 text-white hover:text-slate-950 border border-white/20 hover:border-amber-400 backdrop-blur-md flex items-center justify-center shadow-xl transition-all duration-200"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* 3. CAPTION SYNC METADATA BLOCK DIRECTLY BENEATH CENTRAL CARD */}
        <div
          key={currentItem.id}
          className="animate-caption-sync mt-8 sm:mt-10 text-center max-w-2xl mx-auto px-4 z-20 relative"
        >
          {/* Subtle Category & Specs */}
          <div className="flex items-center justify-center gap-2 text-xs text-amber-300 font-medium uppercase tracking-widest mb-1.5">
            <span>{currentItem.categoryLabel}</span>
            <span>·</span>
            <span>{currentItem.dimensions}</span>
            <span>·</span>
            <span>{currentItem.year}</span>
          </div>

          {/* Artwork Title */}
          <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-normal tracking-tight">
            {currentItem.title}
          </h3>

          <p className="text-xs text-amber-400/90 font-medium uppercase tracking-wider mt-1">
            {currentItem.artistIdentifier}
          </p>

          {/* Curatorial Description ("About This Art") */}
          <div className="mt-3 max-w-xl mx-auto">
            <p className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-400 mb-1">
              {language === 'fr' ? 'À propos de cette œuvre' : 'About this art'}
            </p>
            <p className="text-sm sm:text-base text-stone-200 font-light leading-relaxed italic">
              “{currentItem.aboutArt}”
            </p>
          </div>

          {/* Value Indicator */}
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="font-serif text-lg sm:text-xl text-amber-300 font-normal">
              {formatPrice(currentItem.priceRwf)}
            </span>
            <span className="text-xs text-stone-400">~${currentItem.priceUsd} USD</span>
          </div>

          {/* Pill-Shaped Call-To-Action Buttons ("Inquire" or "Learn More") */}
          <div className="mt-6 flex items-center justify-center gap-3.5 flex-wrap">
            <button
              type="button"
              onClick={() => {
                if (currentItem.artworkRef) onSelectArtwork(currentItem.artworkRef);
              }}
              className="px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold uppercase tracking-wider shadow-lg transition-transform hover:scale-105 inline-flex items-center gap-1.5"
            >
              <span>{language === 'fr' ? 'En Savoir Plus' : 'Learn More'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <a
              href={`https://wa.me/250798618524?text=${encodeURIComponent(
                `Hello Kaze Collections, I am inquiring about acquiring the artwork "${currentItem.title}" (${formatPrice(currentItem.priceRwf)} / ~$${currentItem.priceUsd} USD).`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-md transition-all inline-flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5 text-amber-300" />
              <span>{language === 'fr' ? 'Acquérir / Demander' : 'Inquire'}</span>
            </a>
          </div>
        </div>

        {/* 4. Bottom Dot Indicators */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {items.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`Show ${item.title}`}
              className={`transition-all duration-300 rounded-full ${
                idx === activeIndex
                  ? 'w-8 h-2 bg-amber-400 shadow'
                  : 'w-2 h-2 bg-white/35 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
