import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X, ArrowLeft, Sparkles, Calendar, Layers, Eye, ShoppingBag } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { TRANSLATIONS, type TranslationKey } from '@/lib/translations';
import KazeLogo from '@/components/logos/KazeLogo';

export default function KazeHeader() {
  const { favorites, language, setLanguage } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const t = (key: TranslationKey, fallback?: string) =>
    TRANSLATIONS[language]?.[key] ?? TRANSLATIONS.en[key] ?? fallback ?? key;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  const navLinks = [
    { to: '/gallery#gallery', hash: '#gallery', label: t('kazeNav.gallery', 'Curated Gallery'), icon: Layers },
    { to: '/gallery#exhibitions', hash: '#exhibitions', label: t('kazeNav.exhibitions', 'Exhibitions'), icon: Eye },
    { to: '/gallery#store', hash: '#store', label: t('kazeNav.store', 'Artisan Store'), icon: ShoppingBag },
    { to: '/visit', hash: '', label: t('kazeNav.visits', 'Atelier Visits'), icon: Calendar },
    { to: '/gallery#inquire', hash: '#inquire', label: t('kazeNav.inquire', 'Inquire & Collect'), icon: Sparkles },
  ];

  const isLinkActive = (to: string, hash: string) => {
    if (hash) {
      return location.pathname === '/gallery' && location.hash === hash;
    }
    return location.pathname === to;
  };

  return (
    <header className="sticky top-0 z-50 transition-all duration-300">
      {/* 1. Luminous Light Atelier Bridge Strip: Clear Connection to Rehema Mission Rwanda */}
      <div className="bg-[#f8f5ee] border-b border-stone-200/90 text-stone-700 text-[11px] px-4 sm:px-6 lg:px-8 py-2 relative z-20">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Atelier Brand Tag */}
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="tracking-[0.2em] uppercase font-semibold text-amber-900 hidden sm:inline">
              {t('kazeNav.bridgeTag', 'Atelier Rehema · Kigali, Rwanda')}
            </span>
            <span className="text-stone-500 text-[10px] hidden md:inline">
              · {t('kazeNav.parentSubtitle', 'An Initiative of Rehema Mission Rwanda')}
            </span>
          </div>

          {/* Direct Bridge Link back to Rehema Mission Rwanda */}
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs text-amber-800 hover:text-amber-950 font-medium transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform text-amber-600" />
              <span className="underline underline-offset-4 decoration-amber-500/50 group-hover:decoration-amber-900 font-serif tracking-wide font-normal">
                {t('kazeNav.returnToMission', '← Return to Rehema Mission Rwanda')}
              </span>
            </Link>

            {/* Quick Language Toggle Pill on Top Bar */}
            <div className="hidden sm:flex items-center bg-stone-200/70 border border-stone-300/80 rounded-full p-0.5">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                aria-label="Switch to English"
                className={`px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider transition-all ${
                  language === 'en'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'text-stone-600 hover:text-stone-950'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('fr')}
                aria-label="Passer au Français"
                className={`px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider transition-all ${
                  language === 'fr'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'text-stone-600 hover:text-stone-950'
                }`}
              >
                FR
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Gallery Navigation Bar (LIGHT, CLEAR, ELEGANT HAUTE GALERIE) */}
      <nav
        className={`transition-all duration-300 ${
          scrolled
            ? 'bg-white/98 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.06)] border-b border-stone-200/90 py-3 sm:py-3.5'
            : 'bg-[#fdfbf7]/95 backdrop-blur-md border-b border-stone-200/80 py-3.5 sm:py-4.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand: Kaze Collection Logo in Light Variant */}
          <Link
            to="/gallery"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Kaze Collection Gallery"
          >
            <KazeLogo variant="light" size="md" />
          </Link>

          {/* Desktop Navigation Links — Strictly focused on Kaze Collection */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const active = isLinkActive(link.to, link.hash);
              return (
                <a
                  key={link.to}
                  href={link.to}
                  className={`text-xs tracking-[0.16em] uppercase font-sans font-medium transition-colors relative py-1.5 ${
                    active
                      ? 'text-amber-800 font-bold'
                      : 'text-stone-700 hover:text-amber-800'
                  }`}
                >
                  <span>{link.label}</span>
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-amber-500 transition-all duration-300 ${
                      active ? 'w-full' : 'w-0 hover:w-full'
                    }`}
                  />
                </a>
              );
            })}
          </div>

          {/* Right Controls: Favorites + Booking CTA + Mobile Toggle */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Saved Artworks Counter Pill */}
            <Link
              to="/favorites"
              className="relative p-2 rounded-full border border-stone-200 bg-stone-50 hover:bg-stone-100 hover:border-amber-400 text-stone-700 hover:text-stone-950 transition-all group shadow-sm"
              aria-label={t('kazeNav.savedArtworks', 'Saved Pieces')}
              title={t('kazeNav.savedArtworks', 'Saved Pieces')}
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  favorites.length > 0
                    ? 'fill-rose-500 text-rose-500'
                    : 'text-stone-600 group-hover:text-amber-700'
                }`}
              />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-slate-950 text-[9px] font-bold flex items-center justify-center shadow-sm">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* Atelier Private Viewing CTA */}
            <Link
              to="/visit"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold tracking-wider uppercase shadow-sm transition-all duration-200"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{t('kazeNav.visitBtn', 'Private Viewing')}</span>
            </Link>

            {/* Mobile Menu Hamburger Button */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-lg border border-stone-200 bg-white text-stone-800 hover:text-amber-800 hover:bg-stone-50 transition-colors"
              aria-label="Toggle Gallery Menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* 3. Mobile Navigation Drawer (LIGHT, CLEAR, ELEGANT) */}
      {menuOpen && (
        <div className="lg:hidden bg-[#faf7f2]/98 backdrop-blur-xl border-b border-stone-200 shadow-xl px-4 py-6 space-y-4 animate-fade-in text-stone-900">
          {/* Atelier Badge in Mobile */}
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-xs uppercase tracking-widest font-semibold text-amber-900">
                Kaze Collection
              </span>
            </div>
            {/* Language Switcher Mobile */}
            <div className="flex items-center bg-stone-200 rounded-full p-0.5">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                  language === 'en' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-stone-700'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('fr')}
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                  language === 'fr' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-stone-700'
                }`}
              >
                FR
              </button>
            </div>
          </div>

          {/* Links strictly about Kaze Collection */}
          <div className="space-y-1.5 pt-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isLinkActive(link.to, link.hash);
              return (
                <a
                  key={link.to}
                  href={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs uppercase tracking-wider font-medium transition-colors ${
                    active
                      ? 'bg-amber-500/15 text-amber-900 font-bold border border-amber-300/50'
                      : 'text-stone-700 hover:bg-stone-200/50 hover:text-stone-950'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-amber-600" />
                    <span>{link.label}</span>
                  </span>
                </a>
              );
            })}
          </div>

          {/* Return Bridge Card back to Rehema Mission Rwanda */}
          <div className="pt-3 border-t border-stone-200">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 hover:bg-amber-500/20 transition-all text-amber-950"
            >
              <div className="flex items-center gap-2.5">
                <ArrowLeft className="w-4 h-4 text-amber-700" />
                <div>
                  <p className="text-xs font-serif font-bold leading-tight">
                    {t('kazeNav.returnToMission', '← Return to Rehema Mission Rwanda')}
                  </p>
                  <p className="text-[10px] text-stone-600 font-light">
                    {t('kazeNav.parentSubtitle', 'An Initiative of Rehema Mission Rwanda')}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
