import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Heart, Sparkles, ArrowRight, Award, Compass, Eye } from 'lucide-react';
import { type Artwork, REHEMA_ARTWORKS } from '@/lib/artworks';
import { formatPrice } from '@/lib/utils';
import { useStore } from '@/store/StoreContext';

interface KazeScrollGalleryProps {
  onSelectArtwork: (artwork: Artwork) => void;
}

// Masterwork item tailored for the sticky 3-panel showcase
interface ShowcaseItem {
  id: string;
  title: string;
  artistIdentifier: string;
  year: number;
  categoryLabel: string;
  medium: string;
  dimensions: string;
  priceRwf: number;
  priceUsd: number;
  status: 'available' | 'showroom' | 'reserved';
  image: string;
  hook: string;
  artworkRef?: Artwork;
}

export default function KazeScrollGallery({ onSelectArtwork }: KazeScrollGalleryProps) {
  const { toggleFavorite, isFavorite, language } = useStore();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Curate 6 signature masterworks for this showcase (including the hero mountain artwork)
  const showcaseItems: ShowcaseItem[] = [
    {
      id: 'kaze-hero-featured',
      title: language === 'fr' ? 'Symphonie des Mille Collines' : 'Symphony of the Thousand Hills',
      artistIdentifier: language === 'fr' ? 'Atelier Kaze · Jeunesse d’Ébène' : 'Kaze Atelier Youth Masters',
      year: 2025,
      categoryLabel: language === 'fr' ? 'Chef-d’Œuvre d’Exposition' : 'Featured Exhibition Centerpiece',
      medium: language === 'fr' ? 'Acrylique & pigments naturels sur toile de lin' : 'Acrylic & natural earth pigments on Belgian linen',
      dimensions: '120 × 200 cm (47.2 × 78.7 in)',
      priceRwf: 750000,
      priceUsd: 560,
      status: 'available',
      image: '/kaze-hero.jpg',
      hook: language === 'fr'
        ? '« Les collines ne divisent pas les hommes ; elles élèvent leurs regards vers la même lumière. »'
        : '“The hills do not divide our souls; they lift our gaze toward the morning sun.”',
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
      status: art.status,
      image: art.image,
      hook: art.hook,
      artworkRef: art,
    })),
  ];

  const totalItems = showcaseItems.length;

  // Track scroll position inside the tall pinned container
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const containerHeight = sectionRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      const totalScrollable = containerHeight - viewportHeight;

      if (totalScrollable <= 0) return;

      // Distance scrolled past the top of the container
      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));

      // Map progress to active item index
      const targetIndex = Math.min(totalItems - 1, Math.floor(progress * totalItems));
      setActiveIndex(targetIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [totalItems]);

  // Smooth programmatic scroll to a specific item
  const scrollToItem = (index: number) => {
    if (!sectionRef.current) return;
    const clampedIndex = Math.max(0, Math.min(totalItems - 1, index));
    const rect = sectionRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const sectionTop = rect.top + scrollTop;
    const containerHeight = sectionRef.current.offsetHeight;
    const viewportHeight = window.innerHeight;
    const totalScrollable = containerHeight - viewportHeight;

    const targetScroll = sectionTop + (clampedIndex / (totalItems - 1)) * totalScrollable;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  const handleNext = () => {
    if (activeIndex < totalItems - 1) {
      scrollToItem(activeIndex + 1);
    } else {
      scrollToItem(0);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      scrollToItem(activeIndex - 1);
    } else {
      scrollToItem(totalItems - 1);
    }
  };

  // Keyboard navigation when user hovers over section
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isHovered) return;
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isHovered, activeIndex]);

  const activeItem = showcaseItems[activeIndex];

  return (
    <div
      ref={sectionRef}
      className="relative bg-[#faf7f2] border-b border-stone-200/90"
      style={{ height: `${(totalItems + 1) * 75}vh` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Sticky Pinned Viewport */}
      <div className="sticky top-16 h-[calc(100vh-4rem)] w-full flex flex-col justify-between overflow-hidden px-4 sm:px-6 lg:px-8 py-6 select-none">
        {/* Soft Ambient Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-radial from-amber-200/35 via-amber-100/15 to-transparent rounded-full blur-3xl pointer-events-none z-0" />

        {/* 1. Top Section Header / Curatorial Title & Scroll Progress */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-2 border-b border-stone-200/80">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] font-semibold text-amber-800">
              <Compass className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
              <span>
                {language === 'fr'
                  ? 'Parcours de la Galerie · Séquence Immersive'
                  : 'Exhibition Walkthrough · 3-Stage Gallery'}
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-950 font-normal leading-tight mt-1">
              {language === 'fr' ? 'La Symphonie des Toiles' : 'Masterworks in Continuous Motion'}
            </h2>
          </div>

          {/* Progress Pill & Navigation Hint */}
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <div className="text-right">
              <p className="text-[11px] uppercase tracking-wider font-semibold text-stone-800">
                {language === 'fr' ? 'Œuvre' : 'Masterwork'}{' '}
                <span className="font-serif text-base text-amber-900 font-bold">
                  {String(activeIndex + 1).padStart(2, '0')}
                </span>{' '}
                <span className="text-stone-400">/ {String(totalItems).padStart(2, '0')}</span>
              </p>
              <p className="text-[10px] text-stone-500 font-light hidden md:block">
                {language === 'fr' ? 'Défilez pour faire pivoter la galerie' : 'Scroll down to rotate the gallery sequence'}
              </p>
            </div>

            {/* Left / Right Buttons */}
            <div className="flex items-center gap-1.5 bg-white border border-stone-200 rounded-full p-1 shadow-sm">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous artwork"
                className="w-8 h-8 rounded-full flex items-center justify-center text-stone-700 hover:text-stone-950 hover:bg-stone-100 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next artwork"
                className="w-8 h-8 rounded-full flex items-center justify-center text-stone-700 hover:text-stone-950 hover:bg-stone-100 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 2. THE 3-CARD GALLERY STAGE (Center Big, Left & Right Flanking) */}
        <div className="relative z-10 flex-1 w-full max-w-7xl mx-auto flex items-center justify-center my-auto min-h-[380px] sm:min-h-[460px]">
          <div className="relative w-full h-[360px] sm:h-[440px] md:h-[480px] flex items-center justify-center">
            {showcaseItems.map((item, index) => {
              const diff = index - activeIndex;
              const isCenter = diff === 0;
              const isLeft = diff === -1;
              const isRight = diff === 1;
              const isFarLeft = diff < -1;
              const isFarRight = diff > 1;

              // Compute positioning styles
              let transformClass = '';
              let opacityClass = 'opacity-0 pointer-events-none scale-75';
              let zIndex = 10;
              let cursorClass = 'cursor-default';

              if (isCenter) {
                transformClass = 'translate-x-0 scale-100 sm:scale-105';
                opacityClass = 'opacity-100 pointer-events-auto';
                zIndex = 30;
                cursorClass = 'cursor-pointer';
              } else if (isLeft) {
                // Positioned to the left of the center card
                transformClass = '-translate-x-[72vw] sm:-translate-x-[360px] md:-translate-x-[420px] scale-[0.82] sm:scale-[0.88]';
                opacityClass = 'opacity-65 hover:opacity-90 pointer-events-auto';
                zIndex = 20;
                cursorClass = 'cursor-pointer';
              } else if (isRight) {
                // Positioned to the right of the center card
                transformClass = 'translate-x-[72vw] sm:translate-x-[360px] md:translate-x-[420px] scale-[0.82] sm:scale-[0.88]';
                opacityClass = 'opacity-65 hover:opacity-90 pointer-events-auto';
                zIndex = 20;
                cursorClass = 'cursor-pointer';
              } else if (isFarLeft) {
                transformClass = '-translate-x-[120vw] sm:-translate-x-[650px] scale-75';
                opacityClass = 'opacity-0 pointer-events-none';
                zIndex = 10;
              } else if (isFarRight) {
                transformClass = 'translate-x-[120vw] sm:translate-x-[650px] scale-75';
                opacityClass = 'opacity-0 pointer-events-none';
                zIndex = 10;
              }

              const fav = isFavorite(item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    if (isLeft) scrollToItem(index);
                    else if (isRight) scrollToItem(index);
                    else if (isCenter && item.artworkRef) onSelectArtwork(item.artworkRef);
                  }}
                  className={`absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[82vw] sm:w-[380px] md:w-[440px] lg:w-[480px] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${transformClass} ${opacityClass} ${cursorClass}`}
                  style={{ zIndex }}
                  title={isCenter ? 'Click to view 5-part story & acquire' : `Click to center "${item.title}"`}
                >
                  <div
                    className={`bg-white rounded-3xl overflow-hidden transition-all duration-500 ${
                      isCenter
                        ? 'shadow-[0_24px_60px_rgba(0,0,0,0.12)] border-2 border-amber-400 ring-4 ring-amber-400/15'
                        : 'shadow-lg border border-stone-200/80 hover:shadow-xl'
                    }`}
                  >
                    {/* Image Box */}
                    <div className="relative aspect-[4/3] sm:aspect-[16/10] bg-stone-100 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className={`w-full h-full object-cover transition-transform duration-700 ${
                          isCenter ? 'hover:scale-105' : ''
                        }`}
                      />

                      {/* Status Badge */}
                      <div className="absolute top-3 left-3">
                        <span
                          className={`text-[9px] sm:text-[10px] tracking-wider uppercase font-semibold px-2.5 py-1 rounded-full shadow-sm backdrop-blur-sm border ${
                            item.status === 'available'
                              ? 'bg-emerald-600 text-white border-emerald-400/40'
                              : 'bg-amber-500 text-slate-950 border-amber-300/40'
                          }`}
                        >
                          {item.status === 'available' ? 'Available' : 'Showroom'}
                        </span>
                      </div>

                      {/* Favorite Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(item.id);
                        }}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 border border-stone-200 backdrop-blur-sm flex items-center justify-center hover:bg-white text-stone-700 shadow-sm transition-all"
                        aria-label="Save to favorites"
                      >
                        <Heart
                          className={`w-4 h-4 transition-colors ${
                            fav ? 'fill-rose-500 text-rose-500' : 'text-stone-500 hover:text-stone-900'
                          }`}
                        />
                      </button>

                      {/* Center Card Click Cue Overlay */}
                      {isCenter && (
                        <div className="absolute bottom-3 right-3 hidden sm:flex items-center gap-1.5 px-3 py-1 bg-stone-950/70 text-white rounded-full text-[10px] font-medium backdrop-blur-sm shadow">
                          <Eye className="w-3 h-3 text-amber-400" />
                          <span>{language === 'fr' ? 'Explorer l’Histoire' : 'Explore Story'}</span>
                        </div>
                      )}
                    </div>

                    {/* Content Box */}
                    <div className="p-4 sm:p-5 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-amber-800 line-clamp-1">
                            {item.categoryLabel}
                          </span>
                          <span className="text-[10px] text-stone-500 font-light flex-shrink-0">
                            {item.year}
                          </span>
                        </div>

                        <h3 className="font-serif text-lg sm:text-xl font-normal text-stone-950 leading-snug line-clamp-1">
                          {item.title}
                        </h3>

                        <p className="text-[11px] text-stone-500 font-light mt-0.5 line-clamp-1">
                          {item.artistIdentifier} · {item.dimensions}
                        </p>

                        {isCenter && (
                          <p className="text-xs text-stone-600 font-light italic mt-2 line-clamp-2 leading-relaxed">
                            {item.hook}
                          </p>
                        )}
                      </div>

                      {/* Bottom Price & Acquisition Bar */}
                      <div className="mt-4 pt-3 border-t border-stone-200 flex items-center justify-between">
                        <div>
                          <p className="font-serif text-base sm:text-lg font-normal text-amber-900 leading-none">
                            {formatPrice(item.priceRwf)}
                          </p>
                          <p className="text-[10px] text-stone-500 mt-0.5">~${item.priceUsd} USD</p>
                        </div>

                        {isCenter ? (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (item.artworkRef) onSelectArtwork(item.artworkRef);
                            }}
                            className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-[11px] font-semibold uppercase tracking-wider rounded-full shadow-sm transition-all inline-flex items-center gap-1.5"
                          >
                            <span>{language === 'fr' ? 'Acquérir' : 'Acquire Piece'}</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        ) : (
                          <span className="text-[11px] uppercase tracking-wider text-amber-800 font-semibold">
                            {language === 'fr' ? 'Cliquer pour centrer' : 'Click to View'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Bottom Controls / Timeline Dot Track & Scroll Indicator */}
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-2 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-600">
          {/* Timeline Dots */}
          <div className="flex items-center gap-2">
            {showcaseItems.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToItem(idx)}
                aria-label={`Jump to ${item.title}`}
                className={`transition-all duration-300 rounded-full ${
                  idx === activeIndex
                    ? 'w-8 h-2.5 bg-amber-500 shadow-sm'
                    : 'w-2.5 h-2.5 bg-stone-300 hover:bg-stone-400'
                }`}
              />
            ))}
          </div>

          {/* Center Callout: Scroll Progress Bar */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
            <span className="text-[11px] uppercase tracking-wider text-stone-500 font-medium">
              {language === 'fr' ? 'Progression de l’Exposition' : 'Exhibition Flow'}:
            </span>
            <div className="w-36 h-1.5 bg-stone-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-300"
                style={{ width: `${((activeIndex + 1) / totalItems) * 100}%` }}
              />
            </div>
          </div>

          {/* Downward Scroll Cue */}
          <div className="flex items-center gap-2 text-stone-500 text-[11px]">
            <span className="animate-bounce">↓</span>
            <span>
              {language === 'fr'
                ? 'Défilez vers le bas pour continuer'
                : 'Continue scrolling to browse full catalog'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
