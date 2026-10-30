import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle, ArrowRight, Heart } from 'lucide-react';
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
  const isTransitioningRef = useRef(false);
  const wheelAccumulatorRef = useRef(0);
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

  // Very slow, majestic slide transition: locked for 1250ms to ensure calm graceful flow
  const handleNext = useCallback(() => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setActiveIndex((prev) => (prev + 1) % total);
    setTimeout(() => {
      isTransitioningRef.current = false;
      wheelAccumulatorRef.current = 0;
    }, 1250);
  }, [total]);

  const handlePrev = useCallback(() => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setActiveIndex((prev) => (prev - 1 + total) % total);
    setTimeout(() => {
      isTransitioningRef.current = false;
      wheelAccumulatorRef.current = 0;
    }, 1250);
  }, [total]);

  // Intentional side hover: triggers smoothly after deliberate hover pause
  const handleSideHover = (targetIndex: number) => {
    if (isTransitioningRef.current) return;
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      if (!isTransitioningRef.current) {
        if (targetIndex > activeIndex || (activeIndex === total - 1 && targetIndex === 0)) {
          handleNext();
        } else {
          handlePrev();
        }
      }
    }, 300);
  };

  const handleSideHoverLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  // Scroll gesture: requires deliberate scroll momentum and transitions VERY slowly
  const handleWheel = (e: React.WheelEvent) => {
    if (isTransitioningRef.current) return;

    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    wheelAccumulatorRef.current += delta;

    // Generous threshold so small accidental flicks don't jump
    if (Math.abs(wheelAccumulatorRef.current) < 65) return;

    if (wheelAccumulatorRef.current > 0) {
      handleNext();
    } else {
      handlePrev();
    }
    wheelAccumulatorRef.current = 0;
  };

  // Keyboard navigation
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
      id="triptych-coverflow"
      ref={containerRef}
      onWheel={handleWheel}
      className="relative w-full overflow-hidden min-h-[90vh] lg:min-h-screen flex flex-col justify-center py-6 sm:py-8 text-white select-none transition-colors duration-1000"
    >
      {/* 1. DYNAMIC FULL-BLEED MIRROR BACKGROUND WITH HEAVY GAUSSIAN BLUR & DARK VIGNETTE */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        {items.map((item, idx) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-[1250ms] ease-in-out ${
              idx === activeIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={item.image}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover scale-110 filter blur-[40px] brightness-[0.58] saturate-150"
              style={{ backdropFilter: 'blur(40px)' }}
            />
          </div>
        ))}

        {/* Dark Vignette Overlay for High Contrast */}
        <div className="absolute inset-0 bg-stone-950/45" />
        <div className="absolute inset-0 bg-radial-vignette" />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/70 via-transparent to-stone-950/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col justify-center">
        {/* 2. THE TRIPTYCH COVERFLOW CAROUSEL (Center Tall & Large On Top of Left & Right, Sized to Fit Screen) */}
        <div className="relative w-full max-w-5xl mx-auto flex items-center justify-center h-[360px] sm:h-[420px] md:h-[460px] lg:h-[500px]">
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
              // Center card: LARGER, TALLER, SHARP, ON TOP (z-40) of left and right cards
              transformStyle = 'translateX(0) scale(1)';
              filterStyle = 'blur(0px)';
              opacityStyle = 1;
              zIndex = 40;
              cursor = 'cursor-pointer';
            } else if (isLeft) {
              // Left card: SMALLER (scale 0.74), SHORTER, BLURRED (3.5px), tucked BEHIND the center card (z-10)
              transformStyle = 'translateX(calc(-56% - 6px)) scale(0.74)';
              filterStyle = 'blur(3.5px)';
              opacityStyle = 0.65;
              zIndex = 10;
              cursor = 'cursor-pointer';
            } else if (isRight) {
              // Right card: SMALLER (scale 0.74), SHORTER, BLURRED (3.5px), tucked BEHIND the center card (z-10)
              transformStyle = 'translateX(calc(56% + 6px)) scale(0.74)';
              filterStyle = 'blur(3.5px)';
              opacityStyle = 0.65;
              zIndex = 10;
              cursor = 'cursor-pointer';
            } else if (isFarLeft) {
              transformStyle = 'translateX(-160%) scale(0.55)';
              filterStyle = 'blur(10px)';
              opacityStyle = 0;
              zIndex = 5;
            } else if (isFarRight) {
              transformStyle = 'translateX(160%) scale(0.55)';
              filterStyle = 'blur(10px)';
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
                className={`absolute top-0 w-[74vw] sm:w-[310px] md:w-[350px] lg:w-[380px] aspect-[3/4] transition-all duration-[1250ms] ease-[cubic-bezier(0.2,1,0.35,1)] ${cursor}`}
                style={{
                  transform: transformStyle,
                  filter: filterStyle,
                  opacity: opacityStyle,
                  zIndex,
                  pointerEvents: isCenter || isLeft || isRight ? 'auto' : 'none',
                }}
              >
                {/* Rounded-Rectangle Card Frame with Deep Drop Shadow */}
                <div
                  className={`w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden bg-stone-900 border transition-all duration-700 relative group ${
                    isCenter
                      ? 'border-amber-400 shadow-[0_30px_90px_rgba(0,0,0,0.85)] ring-2 ring-white/30'
                      : 'border-white/15 shadow-[0_15px_40px_rgba(0,0,0,0.5)] hover:border-amber-400/50'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                  />

                  {/* Favorite Button on Top Right */}
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
                    <div className="absolute inset-0 bg-stone-950/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-4 py-2 rounded-full bg-amber-500 text-slate-950 text-xs font-semibold uppercase tracking-wider shadow-lg flex items-center gap-1.5 transform hover:scale-105 transition-transform">
                        <span>{language === 'fr' ? 'Détails & Histoire' : 'View 5-Part Story'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  )}

                  {/* Side Card Hover Guide Hint */}
                  {!isCenter && (
                    <div className="absolute inset-0 bg-stone-950/20 hover:bg-transparent transition-colors flex items-center justify-center">
                      <span className="text-[11px] font-medium uppercase tracking-wider text-white/90 bg-stone-950/60 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
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
            className="absolute -left-2 sm:-left-6 md:-left-12 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-stone-950/80 hover:bg-amber-500 text-white hover:text-slate-950 border border-white/20 hover:border-amber-400 backdrop-blur-md flex items-center justify-center shadow-2xl transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next artwork"
            className="absolute -right-2 sm:-right-6 md:-right-12 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-stone-950/80 hover:bg-amber-500 text-white hover:text-slate-950 border border-white/20 hover:border-amber-400 backdrop-blur-md flex items-center justify-center shadow-2xl transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* 3. CAPTION SYNC METADATA BLOCK DIRECTLY BENEATH CENTRAL CARD (Compact & Screen-Fitting) */}
        <div
          key={currentItem.id}
          className="animate-caption-sync mt-4 sm:mt-5 text-center max-w-xl mx-auto px-4 z-20 relative"
        >
          {/* Artwork Title */}
          <h3 className="font-serif text-2xl sm:text-3xl lg:text-3xl text-white font-normal tracking-tight leading-tight">
            {currentItem.title}
          </h3>

          <p className="text-[11px] sm:text-xs text-amber-400 font-medium uppercase tracking-wider mt-1">
            {currentItem.artistIdentifier} · {currentItem.dimensions}
          </p>

          {/* Curatorial Description */}
          <div className="mt-2 max-w-lg mx-auto">
            <p className="text-xs sm:text-sm text-stone-200 font-light leading-relaxed italic line-clamp-2">
              “{currentItem.aboutArt}”
            </p>
          </div>

          {/* Value Indicator */}
          <div className="mt-2.5 flex items-center justify-center gap-2">
            <span className="font-serif text-lg sm:text-xl text-amber-300 font-normal">
              {formatPrice(currentItem.priceRwf)}
            </span>
            <span className="text-[11px] text-stone-400">~${currentItem.priceUsd} USD</span>
          </div>

          {/* Pill-Shaped Call-To-Action Buttons ("Inquire" or "Learn More") */}
          <div className="mt-3.5 flex items-center justify-center gap-3 flex-wrap">
            <button
              type="button"
              onClick={() => {
                if (currentItem.artworkRef) onSelectArtwork(currentItem.artworkRef);
              }}
              className="px-5 py-2 sm:px-6 sm:py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold uppercase tracking-wider shadow-lg transition-transform hover:scale-105 inline-flex items-center gap-1.5"
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
              className="px-5 py-2 sm:px-6 sm:py-2.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-md transition-all inline-flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5 text-amber-300" />
              <span>{language === 'fr' ? 'Acquérir / Demander' : 'Inquire'}</span>
            </a>
          </div>
        </div>

        {/* 4. Bottom Dot Indicators */}
        <div className="mt-4 flex items-center justify-center gap-2">
          {items.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                if (!isTransitioningRef.current) {
                  isTransitioningRef.current = true;
                  setActiveIndex(idx);
                  setTimeout(() => {
                    isTransitioningRef.current = false;
                  }, 1250);
                }
              }}
              aria-label={`Show ${item.title}`}
              className={`transition-all duration-500 rounded-full ${
                idx === activeIndex
                  ? 'w-7 h-2 bg-amber-400 shadow'
                  : 'w-2 h-2 bg-white/35 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
