import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Pause, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface GalleryItem {
  image: string;
  title: string;
  category: string;
  subtitle: string;
  tag: string;
}

const defaultGalleryItems: GalleryItem[] = [
  {
    image: 'https://images.pexels.com/photos/13430156/pexels-photo-13430156.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'The Royal Chantilly',
    category: 'Haute Couture Gown',
    subtitle: 'Hand-sewn French lace bodice with cathedral train',
    tag: 'Bespoke Atelier',
  },
  {
    image: 'https://images.pexels.com/photos/20254786/pexels-photo-20254786.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'The Kigali Ethereal',
    category: 'Silk Mikado',
    subtitle: 'Sculptural silhouette celebrating modern African grace',
    tag: 'Signature Piece',
  },
  {
    image: 'https://images.pexels.com/photos/19229118/pexels-photo-19229118.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'L’Aurore Veil & Robe',
    category: 'Silk & Embroidery',
    subtitle: 'Delicate floral beading crafted over 120 artisan hours',
    tag: 'Handcrafted',
  },
  {
    image: 'https://images.pexels.com/photos/9733838/pexels-photo-9733838.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'The Rwandan Radiance',
    category: 'Bridal Gown',
    subtitle: 'Modern minimalism adorned with pearls and crystal luster',
    tag: 'New Collection',
  },
  {
    image: 'https://images.pexels.com/photos/36897262/pexels-photo-36897262.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Sovereign Bloom',
    category: 'Ceremonial Dress',
    subtitle: 'Timeless luxury designed for momentous celebrations',
    tag: 'Limited Edition',
  },
  {
    image: 'https://images.pexels.com/photos/19399192/pexels-photo-19399192.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'The Golden Whisper',
    category: 'Evening & Reception',
    subtitle: 'Effortless flowing drape with champagne gold accents',
    tag: 'Bridal Suite',
  },
];

export default function GallerySection({ items = defaultGalleryItems }: { items?: GalleryItem[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const length = items.length;

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % length);
  }, [length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + length) % length);
  }, [length]);

  // Auto-scroll every 4.5 seconds when not paused
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4500);
    return () => clearInterval(interval);
  }, [handleNext, isPaused]);

  // Touch handlers for mobile swiping
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  const getOffset = (index: number) => {
    let offset = (index - currentIndex + length) % length;
    if (offset > length / 2) {
      offset -= length;
    }
    return offset;
  };

  const currentItem = items[currentIndex];

  return (
    <section
      id="gallery-section"
      className="relative py-24 md:py-32 overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Dynamic Blurred Background with Gradients (Optimized for smooth 60fps scrolling) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden will-change-transform">
        {items.map((item, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out transform-gpu ${
                isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
              style={{ willChange: 'opacity' }}
            >
              {/* Only mount image for active and adjacent elements to keep compositor lightweight */}
              <img
                src={item.image}
                alt=""
                loading="lazy"
                className="w-full h-full object-cover filter blur-2xl scale-125 opacity-60 transform-gpu"
              />
            </div>
          );
        })}
        {/* Layered dark & champagne vignette gradients for luxury ambiance */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/85 via-ink-950/55 to-ink-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.15)_0%,transparent_75%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/70 via-transparent to-ink-950/70" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-champagne-50 tracking-tight">
            A Vision of Elegance
          </h2>
          <p className="mt-3 text-champagne-200/75 text-sm md:text-base font-light max-w-xl mx-auto">
            Discover breathtaking silhouettes handcrafted in our Kigali atelier.
          </p>
          <div className="w-16 h-px bg-gold-500/70 mx-auto mt-6" />
        </div>

        {/* 3-Card Stage */}
        <div className="relative h-[480px] sm:h-[530px] md:h-[580px] flex items-center justify-center">
          {items.map((item, index) => {
            const offset = getOffset(index);
            const isCenter = offset === 0;
            const isLeft = offset === -1;
            const isRight = offset === 1;
            const isVisible = isCenter || isLeft || isRight;

            if (!isVisible) return null;

            let transformStyle = '';
            let zIndex = 0;
            let opacity = '';

            if (isCenter) {
              transformStyle = 'translate-x-0 scale-100 md:scale-105';
              zIndex = 30;
              opacity = 'opacity-100 z-30 cursor-default';
            } else if (isLeft) {
              transformStyle = '-translate-x-[60%] sm:-translate-x-[68%] md:-translate-x-[75%] lg:-translate-x-[82%] scale-85 md:scale-90';
              zIndex = 20;
              opacity = 'opacity-40 hover:opacity-75 sm:opacity-50 cursor-pointer z-20 brightness-90 hover:brightness-100';
            } else if (isRight) {
              transformStyle = 'translate-x-[60%] sm:translate-x-[68%] md:translate-x-[75%] lg:translate-x-[82%] scale-85 md:scale-90';
              zIndex = 20;
              opacity = 'opacity-40 hover:opacity-75 sm:opacity-50 cursor-pointer z-20 brightness-90 hover:brightness-100';
            }

            return (
              <div
                key={index}
                onClick={() => {
                  if (isLeft) handlePrev();
                  if (isRight) handleNext();
                }}
                style={{ zIndex, willChange: 'transform, opacity' }}
                className={`absolute w-[280px] sm:w-[340px] md:w-[390px] lg:w-[420px] aspect-[3/4] rounded-3xl overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] transform-gpu ${transformStyle} ${opacity} ${
                  isCenter
                    ? 'border-2 border-gold-300/90 ring-2 ring-gold-400/40 shadow-[0_0_40px_rgba(212,175,55,0.45),0_0_90px_rgba(212,175,55,0.22),0_25px_60px_rgba(0,0,0,0.9)]'
                    : 'border border-gold-400/40 hover:border-gold-300/80 shadow-[0_0_25px_rgba(212,175,55,0.22),0_0_55px_rgba(212,175,55,0.1),0_15px_35px_rgba(0,0,0,0.75)] hover:shadow-[0_0_45px_rgba(212,175,55,0.45),0_0_85px_rgba(212,175,55,0.22)]'
                }`}
              >
                {/* Image — Center is crystal sharp, side cards have blur effect and lower visibility */}
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className={`w-full h-full object-cover transition-all duration-700 ease-out transform-gpu ${
                    isCenter
                      ? 'filter-none blur-0 scale-100'
                      : 'filter blur-[3px] md:blur-[4px] scale-105 opacity-70 hover:blur-[1px] hover:opacity-90'
                  }`}
                />

                {/* Overlays */}
                <div
                  className={`absolute inset-0 transition-all duration-700 ${
                    isCenter
                      ? 'bg-gradient-to-t from-ink-950/95 via-ink-950/30 to-transparent'
                      : 'bg-ink-950/45'
                  }`}
                />

                {/* Center Card Content Details — Centered on the bottom */}
                {isCenter && (
                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end text-center items-center animate-fade-in">
                    <div className="w-full flex flex-col items-center">
                      <p className="text-[11px] md:text-xs tracking-[0.25em] uppercase text-gold-300 font-light mb-1">
                        {item.category}
                      </p>
                      <h3 className="font-serif text-2xl md:text-3xl text-champagne-50 font-normal tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-xs md:text-sm text-champagne-200/80 font-light mt-1.5 line-clamp-2 leading-relaxed max-w-xs mx-auto">
                        {item.subtitle}
                      </p>

                      <div className="mt-4 pt-3 border-t border-champagne-400/20 w-full flex items-center justify-center">
                        <Link
                          to="/shop"
                          className="text-xs tracking-[0.2em] uppercase text-champagne-100 hover:text-gold-300 transition-colors inline-flex items-center gap-1.5 group mx-auto"
                        >
                          <span>Explore Gown</span>
                          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-gold-400" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Previous / Next Controls */}
          <button
            onClick={handlePrev}
            aria-label="Previous image"
            className="absolute left-2 sm:left-6 md:left-10 z-40 w-11 h-11 md:w-13 md:h-13 rounded-full bg-ink-900/70 hover:bg-gold-500 text-champagne-100 hover:text-ink-950 backdrop-blur-md border border-champagne-400/30 transition-all duration-300 flex items-center justify-center shadow-lg hover:scale-110 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <button
            onClick={handleNext}
            aria-label="Next image"
            className="absolute right-2 sm:right-6 md:right-10 z-40 w-11 h-11 md:w-13 md:h-13 rounded-full bg-ink-900/70 hover:bg-gold-500 text-champagne-100 hover:text-ink-950 backdrop-blur-md border border-champagne-400/30 transition-all duration-300 flex items-center justify-center shadow-lg hover:scale-110 active:scale-95"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        {/* Footer Indicators & Controls */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-champagne-500/20 pt-6">
          {/* Pagination Indicators */}
          <div className="flex items-center gap-2.5">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-500 rounded-full h-1.5 ${
                  idx === currentIndex
                    ? 'w-8 bg-gold-400'
                    : 'w-2 bg-champagne-200/30 hover:bg-champagne-200/60'
                }`}
              />
            ))}
          </div>

          {/* Active title and play/pause status */}
          <div className="flex items-center gap-4 text-xs tracking-[0.15em] text-champagne-300/70 font-light">
            <span>{currentItem.title}</span>
            <span className="w-1 h-1 rounded-full bg-gold-400" />
            <button
              onClick={() => setIsPaused((prev) => !prev)}
              className="inline-flex items-center gap-1.5 text-champagne-200 hover:text-gold-300 transition-colors uppercase"
            >
              {isPaused ? (
                <>
                  <Play className="w-3 h-3 text-gold-400" />
                  <span>Resume</span>
                </>
              ) : (
                <>
                  <Pause className="w-3 h-3 text-gold-400" />
                  <span>Autoplay</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
