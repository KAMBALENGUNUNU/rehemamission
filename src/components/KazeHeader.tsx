import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Heart, Menu, X, ArrowLeft, Sparkles, Globe, Calendar, Award } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { TRANSLATIONS, type TranslationKey } from '@/lib/translations';
import KazeLogo from '@/components/logos/KazeLogo';

export default function KazeHeader() {
  const { favorites, language, setLanguage } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const t = (key: TranslationKey, fallback?: string) =>
    TRANSLATIONS[language]?.[key] ?? TRANSLATIONS.en[key] ?? fallback ?? key;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/gallery', label: t('kazeNav.collection') },
    { to: '/visit', label: t('kazeNav.visits') },
    { to: '/our-story', label: t('kazeNav.mission') },
    { to: '/partner', label: language === 'fr' ? 'Mécénat & Collecte' : 'Patrons & Collecting' },
    { to: '/contact', label: t('kazeNav.inquire') },
  ];

  return (
    <header className="sticky top-0 z-50 transition-all duration-300">
      {/* 1. Atelier Top Bridge Strip: Communicating Connection to Rehema Mission Rwanda */}
      <div className="bg-[#04060A] border-b border-white/10 text-stone-300 text-[11px] px-4 sm:px-6 lg:px-8 py-2 relative z-20">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Atelier Tag */}
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="tracking-[0.2em] uppercase font-semibold text-amber-300/90 hidden sm:inline">
              {t('kazeNav.bridgeTag')}
            </span>
            <span className="text-stone-400 text-[10px] hidden md:inline">
              · {t('kazeNav.parentSubtitle')}
            </span>
          </div>

          {/* Prominent Direct Bridge Link back to Rehema Mission Rwanda */}
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-white font-medium transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform text-amber-400" />
              <span className="underline underline-offset-4 decoration-amber-400/50 group-hover:decoration-white font-serif tracking-wide">
                {t('kazeNav.returnToMission')}
              </span>
            </Link>

            {/* Quick Language Toggle Pill on Top Bar for Desktop */}
            <div className="hidden sm:flex items-center bg-white/5 border border-white/10 rounded-full p-0.5">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                aria-label="Switch to English"
                className={`px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider transition-all ${
                  language === 'en'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow'
                    : 'text-stone-400 hover:text-white'
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
                    ? 'bg-amber-500 text-slate-950 font-bold shadow'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                FR
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Gallery Navigation Bar */}
      <nav
        className={`transition-all duration-300 ${
          scrolled
            ? 'bg-[#080B12]/98 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.6)] border-b border-white/10 py-3.5 sm:py-4'
            : 'bg-[#080B12]/90 backdrop-blur-md border-b border-white/10 py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand: Kaze Collection Logo and Title */}
          <Link
            to="/gallery"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Kaze Collection Gallery"
          >
            <KazeLogo variant="dark" size="md" />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-xs tracking-[0.16em] uppercase font-sans font-medium transition-colors relative py-1 ${
                    isActive
                      ? 'text-amber-400 font-semibold'
                      : 'text-stone-300 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.label}</span>
                    <span
                      className={`absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 hover:w-full'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Saved Artworks Heart Button */}
            <Link
              to="/favorites"
              className="relative p-2.5 rounded-full bg-white/5 border border-white/10 text-stone-300 hover:text-amber-300 hover:border-amber-400/40 transition-all"
              aria-label={t('kazeNav.savedArtworks')}
              title={t('kazeNav.savedArtworks')}
            >
              <Heart className="w-4 h-4 text-amber-400" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-slate-950 text-[10px] font-bold flex items-center justify-center shadow">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* Private Viewing CTA Button */}
            <Link
              to="/visit"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-semibold tracking-wider uppercase rounded-full shadow-md transition-all hover:scale-[1.02]"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{t('kazeNav.visitBtn')}</span>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-stone-300 hover:text-white transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {menuOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* 3. Mobile Navigation Drawer */}
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-[#07090E]/98 backdrop-blur-xl animate-fade-in flex flex-col justify-between">
          <div className="p-6">
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <Link to="/gallery" onClick={() => setMenuOpen(false)}>
                <KazeLogo variant="dark" size="sm" />
              </Link>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="p-2 rounded-full bg-white/10 text-stone-300 hover:text-white"
                aria-label="Close Menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <nav className="flex flex-col gap-4 pt-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-lg font-serif tracking-wide py-2 border-b border-white/5 transition-colors ${
                      isActive ? 'text-amber-400 font-semibold' : 'text-stone-300 hover:text-white'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              <NavLink
                to="/favorites"
                onClick={() => setMenuOpen(false)}
                className="text-lg font-serif tracking-wide py-2 border-b border-white/5 text-stone-300 hover:text-white flex items-center justify-between"
              >
                <span>{t('kazeNav.savedArtworks')}</span>
                {favorites.length > 0 && (
                  <span className="bg-amber-500 text-slate-950 text-xs px-2.5 py-0.5 rounded-full font-bold">
                    {favorites.length}
                  </span>
                )}
              </NavLink>
            </nav>
          </div>

          {/* Drawer Footer: Bridge Link & Language Toggle */}
          <div className="p-6 bg-[#04060A] border-t border-white/10 space-y-4">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-amber-300 hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-amber-400" />
              <span>{t('kazeNav.returnToMission')}</span>
            </Link>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-stone-400 font-medium">
                {language === 'fr' ? 'Langue' : 'Language'}
              </span>
              <div className="flex items-center bg-white/10 border border-white/10 rounded-full p-0.5">
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    language === 'en'
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'text-stone-300'
                  }`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('fr')}
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    language === 'fr'
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'text-stone-300'
                  }`}
                >
                  FR
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
