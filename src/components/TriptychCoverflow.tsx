import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle, ArrowRight, Heart } from 'lucide-react';
import { type Artwork, REHEMA_ARTWORKS } from '@/lib/artworks';
import { useStore } from '@/store/StoreContext';

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
      artistIdentifier: 'KAZE Collection',
      year: 2025,
      categoryLabel: language === 'fr' ? 'Chef-d’Œuvre Panoramique' : 'Panoramic Masterwork',
      medium: language === 'fr' ? 'Acrylique & pigments naturels sur toile' : 'Acrylic & natural earth pigments on canvas',
      dimensions: '120 × 200 cm (47.2 × 78.7 in)',
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
      className="relative w-full overflow-hidden py-8 sm:py-12 select-none"
    >
      {/* Soft warm luminous atmospheric glow on beige */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-radial from-amber-200/35 via-amber-100/15 to-transparent rounded-full blur-3xl pointer-events-none z-0" />

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
                {/* Rounded-Rectangle Card Frame with Drop Shadow */}
                <div
                  className={`w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden bg-white border transition-all duration-700 relative group ${
                    isCenter
                      ? 'border-amber-500 shadow-[0_25px_60px_rgba(120,90,40,0.22)] ring-2 ring-amber-400/50'
                      : 'border-stone-300/80 shadow-[0_12px_30px_rgba(0,0,0,0.1)] hover:border-amber-400/50'
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
                    className="absolute top-3.5 right-3.5 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md border border-stone-200 flex items-center justify-center text-stone-700 hover:bg-white hover:text-stone-950 transition-all shadow"
                    aria-label="Save to favorites"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        fav ? 'fill-rose-500 text-rose-500' : 'text-stone-400 hover:text-rose-500'
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
                    <div className="absolute inset-0 bg-stone-950/15 hover:bg-transparent transition-colors flex items-center justify-center">
                      <span className="text-[11px] font-medium uppercase tracking-wider text-stone-900 bg-white/85 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-stone-200 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
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
            className="absolute -left-2 sm:-left-6 md:-left-12 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-white/95 hover:bg-slate-950 text-stone-900 hover:text-white border border-stone-300 hover:border-slate-950 shadow-xl transition-all duration-300 flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next artwork"
            className="absolute -right-2 sm:-right-6 md:-right-12 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-white/95 hover:bg-slate-950 text-stone-900 hover:text-white border border-stone-300 hover:border-slate-950 shadow-xl transition-all duration-300 flex items-center justify-center"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* 3. CAPTION SYNC METADATA BLOCK DIRECTLY BENEATH CENTRAL CARD (Compact & Screen-Fitting) */}
        <div
          key={currentItem.id}
          className="animate-caption-sync mt-5 sm:mt-6 text-center max-w-xl mx-auto px-4 z-20 relative"
        >
          {/* Artwork Title */}
          <h3 className="font-serif text-2xl sm:text-3xl lg:text-3xl text-stone-950 font-normal tracking-tight leading-tight">
            {currentItem.title}
          </h3>

          <p className="text-[11px] sm:text-xs text-amber-900 font-semibold uppercase tracking-wider mt-1">
            {currentItem.artistIdentifier} � {currentItem.dimensions}
          </p>

          {/* Curatorial Description */}
          <div className="mt-2 max-w-lg mx-auto">
            <p className="text-xs sm:text-sm text-stone-700 font-light leading-relaxed italic line-clamp-2">
              "{currentItem.aboutArt}"
            </p>
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
                  ? 'w-7 h-2 bg-amber-600 shadow-sm'
                  : 'w-2 h-2 bg-stone-400/60 hover:bg-stone-600'
              }`}
            />
          ))}
        </div>

        {/* 5. Story & Inquire Buttons � below dot indicators */}
        <div className="mt-5 flex items-center justify-center gap-3 flex-wrap">
          <button
            type="button"
            onClick={() => {
              if (currentItem.artworkRef) onSelectArtwork(currentItem.artworkRef);
            }}
            className="px-8 py-2.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white text-xs font-semibold uppercase tracking-wider shadow-md transition-transform hover:scale-105 inline-flex items-center gap-1.5"
          >
            <span>{language === 'fr' ? 'Histoire' : 'Story'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <a
            href={`https://wa.me/250798618524?text=${encodeURIComponent(
              `Hello Kaze Collections, I am inquiring about the artwork "${currentItem.title}". Please let me know more details.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-full bg-white hover:bg-stone-50 border border-stone-300 text-stone-900 text-xs font-semibold uppercase tracking-wider shadow-sm transition-all inline-flex items-center gap-1.5"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>{language === 'fr' ? 'Demander' : 'Inquire'}</span>
          </a>
        </div>
      </div>
    </section>
  );
}