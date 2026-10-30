import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  ArrowRight,
  ShieldCheck,
  Check,
  Sparkles,
  MessageCircle,
  Award,
  Layers,
  ChevronLeft,
  ChevronRight,
  Eye,
  ShoppingBag,
  Calendar,
  Compass,
  CheckCircle2,
  X,
} from 'lucide-react';
import { REHEMA_ARTWORKS, type Artwork } from '@/lib/artworks';
import { useStore } from '@/store/StoreContext';
import { TRANSLATIONS, type TranslationKey } from '@/lib/translations';
import KazeLogo from '@/components/logos/KazeLogo';
import TriptychCoverflow from '@/components/TriptychCoverflow';
import ArtGalleryThemePattern from '@/components/ArtGalleryThemePattern';

interface PushpinTheme {
  primary: string;
  dark: string;
  light: string;
  glow: string;
  bg: string;
  border: string;
}

const STORE_CARD_THEMES: PushpinTheme[] = [
  // 1. Blue (like "Signed Certificate")
  {
    primary: '#2563EB',
    dark: '#1D4ED8',
    light: '#93C5FD',
    glow: '#3B82F6',
    bg: '#EEF4FF',
    border: '#D6E4FF',
  },
  // 2. Magenta Pink (like "100% Social Impact")
  {
    primary: '#E11D48',
    dark: '#9F1239',
    light: '#FDA4AF',
    glow: '#EC4899',
    bg: '#FDF0F8',
    border: '#FAD2EC',
  },
  // 3. Grass Green (like "Worldwide White-Glove")
  {
    primary: '#16A34A',
    dark: '#15803D',
    light: '#86EFAC',
    glow: '#22C55E',
    bg: '#F1FBE9',
    border: '#D4F6C2',
  },
  // 4. Teal / Mint (like "WhatsApp Concierge")
  {
    primary: '#0D9488',
    dark: '#0F766E',
    light: '#5EEAD4',
    glow: '#14B8A6',
    bg: '#E7FAF7',
    border: '#C2F4EC',
  },
];

// Realistic 3D pushpin matching the exact rendered thumbtack from the reference image
function Pushpin({ id, theme }: { id: string; theme: PushpinTheme }) {
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
            id={`store-glow-${id}`}
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
          <linearGradient id={`store-base-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={theme.light} />
            <stop offset="45%" stopColor={theme.primary} />
            <stop offset="100%" stopColor={theme.dark} />
          </linearGradient>

          {/* 3D sphere gradient for the head bulb */}
          <radialGradient
            id={`store-head-${id}`}
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
          <linearGradient id={`store-topCap-${id}`} x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor={theme.light} />
            <stop offset="60%" stopColor={theme.primary} />
            <stop offset="100%" stopColor={theme.dark} />
          </linearGradient>
        </defs>

        {/* 1. Ambient colored aura / glow spreading onto paper */}
        <ellipse cx="27" cy="40" rx="23" ry="14" fill={`url(#store-glow-${id})`} />

        {/* 2. Soft contact drop shadow under the base */}
        <ellipse cx="30" cy="43" rx="14" ry="6" fill="rgba(0,0,0,0.26)" />

        {/* 3. Base Disc Flange (round bottom that presses against card) */}
        <ellipse cx="27" cy="41" rx="14" ry="6" fill={theme.dark} opacity="0.65" />
        <ellipse cx="27" cy="39.5" rx="13.5" ry="5.5" fill={`url(#store-base-${id})`} />
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
          fill={`url(#store-base-${id})`}
        />

        {/* 5. 3D Head Bulb */}
        <circle cx="27" cy="20.5" r="13" fill={`url(#store-head-${id})`} />

        {/* 6. Top Beveled Circular Face */}
        <ellipse cx="27" cy="17" rx="11" ry="6.8" fill={`url(#store-topCap-${id})`} />

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

export default function ArtGallery() {
  const { toggleFavorite, isFavorite, language } = useStore();
  const t = (key: TranslationKey, fallback?: string) =>
    TRANSLATIONS[language]?.[key] ?? TRANSLATIONS.en[key] ?? fallback ?? key;

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'carousel'>('grid');
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [inquirySent, setInquirySent] = useState(false);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');

  // Filtering
  const filteredArtworks = REHEMA_ARTWORKS.filter((art) => {
    return activeCategory === 'all' || art.category === activeCategory;
  });

  const currentArtwork = filteredArtworks[carouselIndex] || filteredArtworks[0] || REHEMA_ARTWORKS[0];

  const handleNextArtwork = () => {
    if (filteredArtworks.length === 0) return;
    setCarouselIndex((prev) => (prev + 1) % filteredArtworks.length);
  };

  const handlePrevArtwork = () => {
    if (filteredArtworks.length === 0) return;
    setCarouselIndex((prev) => (prev - 1 + filteredArtworks.length) % filteredArtworks.length);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setSelectedArtwork(null);
      setInquiryName('');
      setInquiryEmail('');
      setInquiryMessage('');
    }, 3500);
  };

  return (
    <div className="page-enter bg-[#F9EB9A] min-h-screen text-stone-900 pb-0 relative overflow-hidden">
      {/* 1. Kaze Collection Hero Section with Bespoke Fine Art SVG Theme Pattern in Soft Muted Yellow */}
      <section className="relative z-10 pt-28 sm:pt-36 lg:pt-44 pb-28 sm:pb-36 lg:pb-44 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#FEF2B8] via-[#F9E68C] to-[#F2D668] text-slate-950">
        {/* Delicate, subtle watermark Fine Art Studio Vector Pattern in background */}
        <ArtGalleryThemePattern opacity={0.09} className="text-stone-900" />

        {/* Ambient atmospheric lighting for soft luminous warmth without overpowering vision */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[360px] bg-gradient-radial from-white/45 via-amber-100/25 to-transparent rounded-full blur-3xl pointer-events-none z-0" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Bold Impactful Headline (Styled exactly like "Our Work" in the reference image) */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] text-slate-950 font-bold tracking-tight leading-[1.08] drop-shadow-sm max-w-4xl mx-auto">
            {language === 'fr'
              ? 'L’Âme Rwandaise Révélée par la Haute Création'
              : 'Where Rwandan Heritage Meets Contemporary Haute Artistry'}
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-900/90 font-medium max-w-2xl mx-auto leading-relaxed">
            {t(
              'gal.subtitle',
              'Original paintings, fine drawings, and collector pieces handcrafted by talented youth at the Ebenezer vocational atelier in Kigali. 100% of acquisition proceeds fund their education, health, and vocational independence.'
            )}
          </p>

          {/* Quick Section Jump Pills */}
          <div className="mt-8 flex items-center justify-center gap-3.5 flex-wrap text-xs">
            <a
              href="#gallery"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-semibold tracking-wider uppercase transition-all shadow-md group"
            >
              <Layers className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>{t('kazeNav.collection', 'Curated Collection')}</span>
            </a>
            <a
              href="#exhibitions"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/70 hover:bg-white text-slate-950 border border-slate-900/20 font-semibold tracking-wider uppercase transition-all shadow-sm backdrop-blur-sm"
            >
              <Eye className="w-3.5 h-3.5 text-amber-800" />
              <span>{t('kazeNav.exhibitions', 'Exhibitions')}</span>
            </a>
            <a
              href="#store"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/70 hover:bg-white text-slate-950 border border-slate-900/20 font-semibold tracking-wider uppercase transition-all shadow-sm backdrop-blur-sm"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-amber-800" />
              <span>{t('kazeNav.store', 'Artisan Store')}</span>
            </a>
            <Link
              to="/visit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-950 hover:bg-slate-800 text-amber-300 font-bold tracking-wider uppercase transition-all shadow-md"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-300" />
              <span>{t('kazeNav.visits', 'Book Atelier Visit')}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Overlapping Second Section (Warm Luxury Beige Background with Triptych Carousel on Top) */}
      <div className="relative z-20 -mt-14 sm:-mt-20 lg:-mt-24 bg-[#F4EFE6] rounded-t-[40px] sm:rounded-t-[60px] lg:rounded-t-[76px] shadow-[0_-20px_50px_rgba(0,0,0,0.14)] pt-8 sm:pt-12 pb-36 sm:pb-44 border-t border-amber-200/50">
        {/* Masterwork Interactive Triptych Coverflow Carousel directly on the Beige Background */}
        <TriptychCoverflow onSelectArtwork={(art) => setSelectedArtwork(art)} />

      {/* 3. The Gallery Experience: Transitions, Filters & Catalog */}
      <section id="gallery" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 relative z-10 scroll-mt-24">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-200">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] font-semibold text-amber-800 mb-2">
              <Compass className="w-3.5 h-3.5 text-amber-600" />
              <span>{t('kazeNav.collection', 'The Curated Collection')}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-slate-950 font-bold tracking-tight leading-[1.08] drop-shadow-sm">
              {language === 'fr' ? 'Catalogue des Œuvres Récentes' : 'Masterworks & Recent Creations'}
            </h2>
          </div>

          {/* Interactive Transition Switcher (Grid vs Exhibition Spotlight Mode) */}
          <div className="flex items-center gap-2 bg-stone-100 p-1 rounded-full border border-stone-200 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                viewMode === 'grid'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-amber-600" />
              <span>{t('kazeNav.gridMode', 'Curated Grid')}</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('carousel')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                viewMode === 'carousel'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5 text-amber-600" />
              <span>{t('kazeNav.carouselMode', 'Exhibition Spotlight')}</span>
            </button>
          </div>
        </div>

        {/* Category & Availability Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 pb-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
            {[
              { id: 'all', label: t('gal.catAll', 'All Masterworks') },
              { id: 'paintings', label: t('gal.catPaintings', 'Paintings') },
              { id: 'drawings', label: t('gal.catDrawings', 'Drawings & Ink') },
              { id: 'mixed-media', label: t('gal.catMixed', 'Mixed Media') },
            ].map((tab) => {
              const active = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveCategory(tab.id);
                    setCarouselIndex(0);
                  }}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${
                    active
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                      : 'bg-white border border-stone-200 text-stone-700 hover:border-amber-400 hover:text-stone-950'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Artwork Count */}
          <div className="text-xs text-stone-500 font-medium">
            <span>{filteredArtworks.length} {language === 'fr' ? 'œuvres' : 'works'}</span>
          </div>
        </div>

        {/* 4. VIEW MODE 1: Curated Grid View (Clean, Light, Luxury Gallery Cards) */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 pt-6">
            {filteredArtworks.map((art) => {
              const fav = isFavorite(art.id);
              return (
                <div
                  key={art.id}
                  className="bg-white border border-stone-200/90 hover:border-amber-400 hover:shadow-[0_16px_36px_rgba(217,119,6,0.12)] transition-all duration-300 flex flex-col justify-between group rounded-2xl overflow-hidden hover:-translate-y-1"
                >
                  {/* Image Container */}
                  <div
                    className="relative aspect-[3/4] bg-stone-100 overflow-hidden cursor-pointer"
                    onClick={() => setSelectedArtwork(art)}
                  >
                    <img
                      src={art.image}
                      alt={art.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Save to Favorites */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(art.id);
                      }}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 border border-stone-200 backdrop-blur-sm flex items-center justify-center hover:bg-white text-stone-700 shadow-sm transition-all"
                      aria-label="Save artwork"
                    >
                      <Heart
                        className={`w-4 h-4 transition-colors ${
                          fav ? 'fill-rose-500 text-rose-500' : 'text-stone-500 hover:text-stone-900'
                        }`}
                      />
                    </button>

                    {/* Hover Overlay with Warm Amber CTA */}
                    <div className="absolute inset-0 bg-stone-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-5 py-2.5 bg-amber-500 text-slate-950 text-xs font-semibold tracking-[0.16em] uppercase rounded-full shadow-lg shadow-amber-500/30 flex items-center gap-1.5">
                        <span>{t('gal.viewStory', 'View Story')}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>

                  {/* Info Container */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                        <p className="text-[10px] tracking-[0.2em] uppercase font-semibold text-amber-800">
                          {art.categoryLabel}
                        </p>
                        {art.emotionalTheme && (
                          <span className="text-[9px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-900 border border-amber-500/30">
                            {art.emotionalTheme}
                          </span>
                        )}
                      </div>
                      <h3
                        onClick={() => setSelectedArtwork(art)}
                        className="font-serif text-lg text-stone-950 font-medium group-hover:text-amber-800 transition-colors cursor-pointer"
                      >
                        {art.title}
                      </h3>
                      <p className="text-xs text-stone-500 font-light mt-0.5">
                        {art.artistIdentifier} · {art.dimensions}
                      </p>
                      <p className="text-xs text-stone-600 line-clamp-2 mt-2.5 font-light leading-relaxed">
                        {art.hook}
                      </p>
                    </div>

                    <div className="mt-5 pt-3.5 border-t border-stone-200">
                      <button
                        type="button"
                        onClick={() => setSelectedArtwork(art)}
                        className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold uppercase tracking-wider rounded-full shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-1.5"
                      >
                        <span>{t('gal.viewStory', 'View Story')}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 5. VIEW MODE 2: Exhibition Spotlight Transition Stage (One-by-One Immersion) */}
        {viewMode === 'carousel' && currentArtwork && (
          <div className="pt-6 animate-fade-in">
            <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-10 shadow-[0_12px_45px_rgba(0,0,0,0.06)] flex flex-col lg:flex-row items-center gap-10">
              {/* Left: Large Artwork Canvas Frame */}
              <div className="lg:w-1/2 w-full flex flex-col items-center">
                <div
                  className="relative aspect-[3/4] max-h-[520px] w-auto overflow-hidden rounded-2xl bg-stone-100 shadow-xl cursor-pointer group"
                  onClick={() => setSelectedArtwork(currentArtwork)}
                >
                  <img
                    src={currentArtwork.image}
                    alt={currentArtwork.title}
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Transition Navigation Controls */}
                <div className="flex items-center gap-4 mt-6">
                  <button
                    type="button"
                    onClick={handlePrevArtwork}
                    aria-label={t('kazeNav.prevArtwork', 'Previous Artwork')}
                    className="p-2.5 rounded-full border border-stone-300 hover:border-amber-500 hover:bg-amber-500 hover:text-slate-950 text-stone-700 transition-all shadow-sm"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="text-xs uppercase tracking-widest text-stone-500 font-medium">
                    {carouselIndex + 1} / {filteredArtworks.length}
                  </span>
                  <button
                    type="button"
                    onClick={handleNextArtwork}
                    aria-label={t('kazeNav.nextArtwork', 'Next Artwork')}
                    className="p-2.5 rounded-full border border-stone-300 hover:border-amber-500 hover:bg-amber-500 hover:text-slate-950 text-stone-700 transition-all shadow-sm"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Right: Curatorial Story & Instant Acquisition */}
              <div className="lg:w-1/2 w-full space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-800">
                      {currentArtwork.categoryLabel}
                    </span>
                    {currentArtwork.emotionalTheme && (
                      <span className="text-[10px] uppercase tracking-wide font-medium px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-900 border border-amber-500/30">
                        {currentArtwork.emotionalTheme}
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-3xl sm:text-4xl text-stone-950 font-normal">
                    {currentArtwork.title}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    {currentArtwork.artistIdentifier} · {currentArtwork.dimensions} · {currentArtwork.year}
                  </p>
                </div>

                {/* The Hook Quote */}
                <blockquote className="p-4 bg-amber-50/70 border-l-4 border-amber-500 rounded-r-xl text-stone-800 font-serif italic text-base">
                  {currentArtwork.hook}
                </blockquote>

                {/* Details Pill grid */}
                <div className="grid grid-cols-2 gap-3 text-xs text-stone-700 bg-stone-50 p-4 rounded-xl border border-stone-200">
                  <div>
                    <span className="text-stone-500 block text-[10px] uppercase">{t('gal.medium', 'Medium')}:</span>
                    <strong className="font-medium text-stone-900">{currentArtwork.medium}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px] uppercase">{t('gal.framing', 'Framing')}:</span>
                    <strong className="font-medium text-stone-900">{currentArtwork.framed}</strong>
                  </div>
                </div>

                {/* Acquisition Actions */}
                <div className="pt-4 border-t border-stone-200 flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => setSelectedArtwork(currentArtwork)}
                      className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold uppercase tracking-wider rounded-full shadow-md transition-all flex items-center gap-1.5"
                    >
                      <span>{t('gal.viewStory', 'View Story')}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <a
                      href={`https://wa.me/250798618524?text=${encodeURIComponent(
                        `Hello Kaze Collection, I am interested in inquiring about the artwork "${currentArtwork.title}". Please let me know how to proceed.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md inline-flex items-center justify-center"
                      title="Direct WhatsApp Acquisition"
                    >
                      <MessageCircle className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 6. Curated Exhibitions Section (`id="exhibitions"`) */}
      <section id="exhibitions" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 scroll-mt-24 relative z-10">
        <div className="bg-gradient-to-br from-amber-50/60 via-white to-stone-50 border border-amber-200/80 rounded-3xl p-8 sm:p-12 shadow-[0_12px_45px_rgba(217,119,6,0.06)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Curatorial Narrative (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-slate-950 font-bold tracking-tight leading-[1.08] drop-shadow-sm">
                {t('kazeNav.currentExhibitionTitle', 'Horizons of the Thousand Hills')}
              </h2>

              <p className="text-base text-stone-700 font-light leading-relaxed">
                {t(
                  'kazeNav.currentExhibitionSubtitle',
                  'A contemporary visual exploration of resilience, Rwandan landscapes, and emerging youth mastery.'
                )}
              </p>

              <div className="space-y-3 text-sm text-stone-600 font-light leading-relaxed">
                <p>
                  {language === 'fr'
                    ? 'Cette exposition rassemble les créations de nos jeunes artistes qui transforment les souvenirs et les paysages rwandais en symboles d’espoir, de renouveau et d’élévation personnelle.'
                    : 'This exhibition brings together works by our emerging youth artists who translate the contours and morning light of Rwanda’s volcanic terrain into metaphors of endurance, healing, and elevation.'}
                </p>
                <div className="flex items-center gap-6 pt-2 text-xs font-medium text-stone-800">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{language === 'fr' ? 'Œuvres Authentifiées' : 'Original Handcrafted Pieces'}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{language === 'fr' ? 'Visites Guidées sur Rdv' : 'Private Viewing Available'}</span>
                  </span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4 flex-wrap">
                <Link
                  to="/visit"
                  className="px-6 py-3 rounded-full bg-stone-900 hover:bg-amber-600 text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-md inline-flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>{language === 'fr' ? 'Réserver une Visite Privée' : 'Book a Curatorial Viewing'}</span>
                </Link>
                <a
                  href="#store"
                  className="px-6 py-3 rounded-full bg-white hover:bg-stone-50 border border-stone-300 text-stone-900 text-xs font-semibold uppercase tracking-wider transition-all shadow-sm"
                >
                  {language === 'fr' ? 'Explorer la Boutique' : 'View Exhibition Catalog'}
                </a>
              </div>
            </div>

            {/* Right Hero Exhibition Image Card (5 cols) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-stone-100 border border-amber-200">
                <img
                  src="/kaze-hero.jpg"
                  alt="Horizons of the Thousand Hills - Kaze Collection Exhibition"
                  className="w-full h-[360px] object-cover object-center"
                />
                <div className="p-4 bg-white/95 backdrop-blur-md border-t border-stone-200">
                  <p className="text-xs uppercase tracking-wider text-amber-800 font-semibold">
                    {language === 'fr' ? 'Pièce Maîtresse' : 'Exhibition Centerpiece'}
                  </p>
                  <p className="font-serif text-lg text-stone-950 font-normal">
                    {language === 'fr' ? 'Symphonie des Mille Collines' : 'Symphony of the Thousand Hills'}
                  </p>
                  <p className="text-[11px] text-stone-500">
                    {language === 'fr' ? 'Atelier Kaze · Kicukiro, Kigali' : 'Kaze Atelier · Kicukiro, Kigali'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. The Artisan Store & Acquisition Concierge (`id="store"`) */}
      <section id="store" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 scroll-mt-24 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-14">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-slate-950 font-bold tracking-tight leading-[1.08] drop-shadow-sm">
            {language === 'fr' ? 'Acquérir une Œuvre Éthique & Signée' : 'Acquire Authentic Rwandan Fine Art'}
          </h2>
          <p className="text-stone-600 text-sm sm:text-base font-light mt-4 max-w-2xl mx-auto">
            {t(
              'kazeNav.storeSubtitle',
              'Direct from our Kigali atelier. 100% of proceeds fund youth education, art materials, and vocational independence.'
            )}
          </p>
        </div>

        {/* 4 Pillars of Collector Assurance (Exact Pushpin Card Design) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 pt-6">
          {[
            {
              title: language === 'fr' ? 'Certificat d’Authenticité' : 'Signed Certificate',
              description:
                language === 'fr'
                  ? 'Chaque œuvre est accompagnée d’un certificat numéroté, signé par l’artiste et la direction de Rehema Mission Rwanda.'
                  : 'Every acquisition includes a provenance certificate signed by the youth artist and the founder of Rehema Mission Rwanda.',
            },
            {
              title: language === 'fr' ? '100% Impact Social' : '100% Social Impact',
              description:
                language === 'fr'
                  ? 'Zéro dividende commercial. L’intégralité des fonds finance directement les apprentissages et soins des jeunes.'
                  : 'Zero commercial profit markup. 100% of proceeds sustain vocational training, art tools, and healthcare.',
            },
            {
              title: language === 'fr' ? 'Expédition Internationale' : 'Worldwide White-Glove',
              description:
                language === 'fr'
                  ? 'Emballage renforcé et sécurisé depuis Kigali pour les collectionneurs et institutions du monde entier.'
                  : 'Secure white-glove packaging from our Kigali studio to private and institutional collectors worldwide.',
            },
            {
              title: language === 'fr' ? 'Concierge WhatsApp' : 'WhatsApp Concierge',
              description:
                language === 'fr'
                  ? 'Discussion directe avec notre équipe pour toute commande sur mesure, dimensions personnalisées ou questions.'
                  : 'Direct concierge line for custom commissions, frame options, private viewings, and shipping estimates.',
            },
          ].map((pillar, idx) => {
            const theme = STORE_CARD_THEMES[idx % STORE_CARD_THEMES.length];
            return (
              <div key={pillar.title} className="relative flex flex-col pt-4 group">
                {/* 3D Glossy Pushpin with colored ambient glow and shadow, centered at top */}
                <Pushpin id={`store-pin-${idx}`} theme={theme} />

                {/* Outer White Card Frame with rounded corners */}
                <div className="bg-white rounded-[32px] p-3 sm:p-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-stone-200/80 transition-all duration-300 group-hover:shadow-[0_18px_44px_rgba(0,0,0,0.11)] group-hover:-translate-y-1 flex flex-col flex-1">
                  {/* Inner Pastel Card */}
                  <div
                    className="rounded-[22px] px-6 sm:px-7 pt-9 pb-8 flex flex-col flex-1 min-h-[240px]"
                    style={{
                      backgroundColor: theme.bg,
                      border: `1.5px solid ${theme.border}`,
                    }}
                  >
                    {/* Title in Tall Condensed Bold Uppercase (Oswald Font) */}
                    <h4 className="font-['Oswald',sans-serif] text-[20px] sm:text-[22px] font-bold uppercase tracking-wide text-stone-950 leading-[1.18] mb-3">
                      {pillar.title}
                    </h4>

                    {/* Description in Clean Geometric Sans (Plus Jakarta Sans Font) */}
                    <p className="font-['Plus_Jakarta_Sans',sans-serif] text-[13px] sm:text-[13.5px] text-stone-700 font-normal leading-[1.65]">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Collector Concierge Contact Box (`id="inquire"`) */}
        <div id="inquire" className="mt-12 bg-white border border-amber-300/80 rounded-2xl p-8 sm:p-10 shadow-lg text-center max-w-3xl mx-auto scroll-mt-24">
          <KazeLogo variant="light" size="md" className="justify-center mb-4" />
          <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-slate-950 font-bold tracking-tight leading-[1.1] drop-shadow-sm">
            {language === 'fr' ? 'Une Question sur une Œuvre ou une Commande ?' : 'Inquire on an Artwork or Private Viewing'}
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 font-light mt-2 max-w-xl mx-auto">
            {language === 'fr'
              ? 'Contactez directement notre conservateur d’atelier à Kigali par WhatsApp ou téléphone pour échanger sur une acquisition.'
              : 'Connect directly with our atelier curator in Kigali via WhatsApp or telephone to arrange private viewing or shipping.'}
          </p>

          <div className="mt-6 flex items-center justify-center gap-4 flex-wrap">
            <a
              href="https://wa.me/250798618524?text=Hello%20Kaze%20Collection%2C%20I%20am%20interested%20in%20learning%20more%20about%20acquiring%20artworks%20from%20the%20atelier."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider shadow-md transition-all inline-flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{language === 'fr' ? 'Contacter sur WhatsApp' : 'Direct WhatsApp Concierge'}</span>
            </a>
            <Link
              to="/visit"
              className="px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold uppercase tracking-wider shadow-md transition-all inline-flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>{language === 'fr' ? 'Planifier une Visite' : 'Schedule Atelier Visit'}</span>
            </Link>
          </div>
        </div>
      </section>
      </div>

      {/* 8. Lightbox / Artwork Story Modal (LIGHT & CLEAR LUXURY DESIGN) */}
      {selectedArtwork && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pt-14 sm:pt-16 bg-stone-950/70 backdrop-blur-md animate-fade-in"
          onClick={() => {
            setSelectedArtwork(null);
            setInquirySent(false);
          }}
        >
          {/* Wrapper containing the exit button OUT of the box and the white modal dialog */}
          <div
            className="relative max-w-4xl w-full my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Exit button OUT of the box */}
            <button
              type="button"
              onClick={() => {
                setSelectedArtwork(null);
                setInquirySent(false);
              }}
              className="absolute -top-12 right-0 sm:-top-13 sm:right-0 z-50 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white hover:bg-amber-500 text-stone-900 hover:text-slate-950 shadow-2xl border border-stone-200/90 backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-110 group cursor-pointer"
              aria-label="Close"
              title="Close"
            >
              <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
            </button>

            {/* Modal Box */}
            <div className="bg-white max-h-[86vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row border border-stone-200 rounded-3xl">
              {/* Left: Artwork photography view */}
              <div className="md:w-1/2 bg-stone-50 flex flex-col justify-between p-6 sm:p-8 border-b md:border-b-0 md:border-r border-stone-200">
                <div className="flex-1 flex flex-col items-center justify-center">
                  <img
                    src={selectedArtwork.image}
                    alt={selectedArtwork.title}
                    className="max-h-[55vh] w-auto object-contain shadow-xl rounded-lg"
                  />
                  <div className="mt-4 flex items-center gap-1.5 px-3 py-1 bg-amber-500/15 rounded-full border border-amber-500/30 text-amber-900 text-[11px] font-medium">
                    <Award className="w-3.5 h-3.5 text-amber-600" />
                    <span>{t('gal.certTag', 'Signed Provenance Certificate')}</span>
                  </div>
                </div>
                <div className="mt-5 pt-4 border-t border-stone-200 text-center space-y-1">
                  <p className="text-xs text-stone-900 font-semibold">{selectedArtwork.dimensions}</p>
                  <p className="text-[11px] text-stone-500 font-light">{selectedArtwork.medium}</p>
                  <p className="text-[10px] text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full inline-block mt-1 font-medium border border-emerald-200">
                    {t('gal.proceedsTag', '100% Proceeds Support Rehema Youth Fund')}
                  </p>
                </div>
              </div>

              {/* Right: Artwork Story & Inquiry Flow */}
              <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div>
                  <div className="border-b border-stone-200 pb-4">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                        {selectedArtwork.categoryLabel}
                      </span>
                      {selectedArtwork.emotionalTheme && (
                        <span className="text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-900 border border-amber-500/30">
                          {selectedArtwork.emotionalTheme}
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif text-2xl text-stone-950 font-normal mt-1">
                      {selectedArtwork.title}
                    </h3>
                    <p className="text-xs text-stone-500 mt-0.5">
                      {selectedArtwork.artistIdentifier} · {t('gal.createdIn', 'Created in')} {selectedArtwork.year}
                    </p>
                  </div>

                  {/* Artwork Story Breakdown */}
                  <div className="mt-5 space-y-4 text-sm text-stone-700 font-light leading-relaxed">
                    {/* Part 1: The Hook */}
                    <div>
                      <p className="text-[11px] uppercase tracking-wider font-bold text-amber-800">
                        {t('gal.sec1Title', 'The Story & Spark')}
                      </p>
                      <p className="font-serif text-base italic font-normal text-stone-900 mt-1">
                        {selectedArtwork.hook}
                      </p>
                    </div>

                    {/* Part 2: Artist's Voice */}
                    <div>
                      <p className="text-[11px] uppercase tracking-wider font-bold text-stone-500">
                        {t('gal.sec3Title', 'Artist’s Perspective')}
                      </p>
                      <div className="bg-amber-50/70 border-l-3 border-amber-500 p-3.5 my-1 text-xs italic text-amber-950 leading-relaxed rounded-r">
                        {selectedArtwork.artistPerspective}
                      </div>
                    </div>

                    {/* Part 3: Why This Artwork Belongs in Your Space */}
                    <div>
                      <p className="text-[11px] uppercase tracking-wider font-bold text-amber-800">
                        {t('gal.sec4Title', 'Why This Belongs in Your Collection')}
                      </p>
                      <p className="mt-1 text-xs sm:text-sm text-stone-700 font-normal leading-relaxed bg-stone-50 p-3 rounded-lg border border-stone-200">
                        {selectedArtwork.whyBuy}
                      </p>
                    </div>

                    {/* Part 4: Craftsmanship & Provenance */}
                    <div>
                      <p className="text-[11px] uppercase tracking-wider font-bold text-stone-500">
                        {t('gal.sec5Title', 'Craftsmanship & Provenance')}
                      </p>
                      <div className="border border-stone-200 bg-stone-50 p-3 text-xs text-stone-700 space-y-1.5 mt-1 rounded-lg">
                        <p><strong>{t('gal.medium', 'Medium')}:</strong> {selectedArtwork.medium}</p>
                        <p><strong>{t('gal.support', 'Support')}:</strong> {selectedArtwork.craftDetails.support}</p>
                        <p><strong>{t('gal.technique', 'Technique')}:</strong> {selectedArtwork.craftDetails.technique}</p>
                        <p><strong>{t('gal.framing', 'Framing')}:</strong> {selectedArtwork.framed}</p>
                        <p><strong>{t('gal.signature', 'Signature')}:</strong> {selectedArtwork.craftDetails.signature}</p>
                        <p><strong>{t('gal.location', 'Origin')}:</strong> {selectedArtwork.craftDetails.location}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Purchase / Acquisition Inquiry Flow */}
                <div className="pt-4 border-t border-stone-200 space-y-3">
                  {/* Instant WhatsApp Direct Reservation */}
                  <a
                    href={`https://wa.me/250798618524?text=${encodeURIComponent(
                      `Hello Kaze Collection, I am interested in inquiring about the original artwork "${selectedArtwork.title}". Please let me know availability and how to arrange viewing or delivery.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow transition-all duration-200 group"
                  >
                    <MessageCircle className="w-4 h-4 fill-white text-emerald-600 group-hover:scale-110 transition-transform" />
                    <span>{t('gal.inquireWhatsApp', 'Instant Acquisition via WhatsApp')}</span>
                  </a>

                  {inquirySent ? (
                    <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs text-center space-y-1 animate-fade-in">
                      <Check className="w-5 h-5 mx-auto text-emerald-600" />
                      <p className="font-semibold">{t('gal.inquirySuccessTitle', 'Inquiry Received')}</p>
                      <p className="text-emerald-700 font-light">
                        {t('gal.inquirySuccessDesc', 'Our team in Kigali will connect with you within 24 hours.')}
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleInquirySubmit} className="space-y-2.5 pt-2 border-t border-stone-200">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-700">
                        {t('gal.writtenInquiryTitle', 'Or Send a Written Inquiry')}
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          required
                          placeholder={t('gal.placeholderName', 'Your Name')}
                          value={inquiryName}
                          onChange={(e) => setInquiryName(e.target.value)}
                          className="w-full px-3 py-2 bg-stone-50 border border-stone-300 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-500 text-xs rounded-lg transition-colors"
                        />
                        <input
                          type="email"
                          required
                          placeholder={t('gal.placeholderEmail', 'Your Email')}
                          value={inquiryEmail}
                          onChange={(e) => setInquiryEmail(e.target.value)}
                          className="w-full px-3 py-2 bg-stone-50 border border-stone-300 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-500 text-xs rounded-lg transition-colors"
                        />
                      </div>
                      <textarea
                        rows={2}
                        placeholder={t('gal.placeholderQuestions', 'Questions about delivery, framing or private viewing?')}
                        value={inquiryMessage}
                        onChange={(e) => setInquiryMessage(e.target.value)}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-500 text-xs rounded-lg transition-colors resize-none"
                      />
                      <button type="submit" className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold uppercase tracking-wider rounded-xl shadow transition-all flex items-center justify-center gap-1.5">
                        <span>{t('gal.btnSubmitInquiry', 'Submit Inquiry')}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
