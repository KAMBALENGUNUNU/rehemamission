import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Heart, Menu, X, ShieldCheck, Globe } from 'lucide-react';
import { useStore } from '@/store/StoreContext';

const navLinksEn = [
  { to: '/', label: 'Home' },
  { to: '/our-story', label: 'Our Story' },
  { to: '/our-work', label: 'Our Work' },
  { to: '/gallery', label: 'Kaze Collection' },
  { to: '/visit', label: 'Visit' },
  { to: '/partner', label: 'Partner With Us' },
  { to: '/contact', label: 'Contact' },
];

const navLinksFr = [
  { to: '/', label: 'Accueil' },
  { to: '/our-story', label: 'Notre Histoire' },
  { to: '/our-work', label: 'Notre Action' },
  { to: '/gallery', label: 'Collection Kaze' },
  { to: '/visit', label: 'Visite' },
  { to: '/partner', label: 'Partenariat' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const { favorites, language, setLanguage } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Close dropdown on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Close drawer on Escape or resize to desktop
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const links = language === 'fr' ? navLinksFr : navLinksEn;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/70 shadow-sm text-slate-900 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-16' : 'h-18 sm:h-20'}`}>
          {/* Logo Brand Slot */}
          <Link to="/" className="flex items-center group py-2" title="Home">
            <div className="h-10 sm:h-12 flex items-center min-w-[48px]">
              <img
                src="/logo.png"
                alt="Logo"
                className="h-8 sm:h-9 md:h-11 w-auto max-w-[130px] sm:max-w-[170px] lg:max-w-[200px] object-contain transition-transform duration-200 group-hover:scale-[1.02]"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.triedSvg) {
                    target.dataset.triedSvg = 'true';
                    target.src = '/logo.svg';
                  } else if (!target.dataset.triedJpg) {
                    target.dataset.triedJpg = 'true';
                    target.src = '/logo.jpg';
                  } else {
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }
                }}
              />
              <div
                style={{ display: 'none' }}
                className="items-center gap-2 px-3 py-1.5 rounded-sm border border-slate-200 bg-slate-50 text-slate-700 text-xs font-serif tracking-widest uppercase"
              >
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>Logo</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-3.5 xl:gap-5 2xl:gap-7">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `text-[11px] xl:text-xs tracking-[0.08em] xl:tracking-[0.14em] uppercase transition-colors duration-200 relative group py-1.5 whitespace-nowrap ${
                    isActive
                      ? 'text-slate-950 font-bold'
                      : 'text-slate-600 hover:text-slate-950 font-medium'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-[2px] bg-amber-500 transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Header Action Controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Language Switcher (French <-> English) */}
            <div
              className="flex items-center bg-slate-100 border border-slate-200 rounded-full p-0.5 shadow-inner"
              title={language === 'en' ? 'Switch to French' : 'Passer à l\'anglais'}
            >
              <div className="pl-1.5 pr-0.5 text-slate-400">
                <Globe className="w-3.5 h-3.5" />
              </div>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                aria-label="Switch language to English"
                className={`px-2 py-0.5 rounded-full text-[11px] font-semibold tracking-wider transition-all duration-200 ${
                  language === 'en'
                    ? 'bg-white text-slate-950 shadow-sm font-bold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('fr')}
                aria-label="Changer de langue en Français"
                className={`px-2 py-0.5 rounded-full text-[11px] font-semibold tracking-wider transition-all duration-200 ${
                  language === 'fr'
                    ? 'bg-white text-slate-950 shadow-sm font-bold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                FR
              </button>
            </div>

            {/* Saved Artworks */}
            <Link
              to="/favorites"
              className="relative p-2 rounded-full text-slate-700 hover:text-amber-700 transition-colors"
              aria-label="Saved Artworks"
              title="Saved Artworks"
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-950 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-800 hover:text-slate-950 hover:bg-slate-100 transition-colors focus:outline-none"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="w-6 h-6 text-slate-950" /> : <Menu className="w-6 h-6 text-slate-950" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown Menu (Direct Dropdown Below Header) */}
      {menuOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-xl border-b border-slate-200/90 shadow-2xl px-4 sm:px-6 py-5 space-y-4 animate-fade-in text-slate-900 max-h-[calc(100dvh-70px)] overflow-y-auto overscroll-contain">
          {/* Navigation Links */}
          <nav className="flex flex-col space-y-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold tracking-wider uppercase transition-all ${
                    isActive
                      ? 'bg-amber-500/15 text-amber-950 font-bold border border-amber-300/60'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950 font-medium'
                  }`
                }
              >
                <span>{link.label}</span>
                <span className="text-amber-600 text-xs font-bold">→</span>
              </NavLink>
            ))}

            {/* Saved Artworks Link */}
            <NavLink
              to="/favorites"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold tracking-wider uppercase transition-all ${
                  isActive
                    ? 'bg-amber-500/15 text-amber-950 font-bold border border-amber-300/60'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950 font-medium'
                }`
              }
            >
              <div className="flex items-center gap-2.5">
                <Heart className="w-4 h-4 text-amber-600" />
                <span>{language === 'fr' ? 'Œuvres sauvegardées' : 'Saved Artworks'}</span>
              </div>
              {favorites.length > 0 && (
                <span className="bg-amber-500 text-slate-950 text-xs px-2.5 py-0.5 rounded-full font-bold shadow-xs">
                  {favorites.length}
                </span>
              )}
            </NavLink>
          </nav>

          {/* Mobile Footer & Language Switcher */}
          <div className="pt-4 border-t border-slate-200 space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                {language === 'fr' ? 'Langue' : 'Language'}
              </span>
              <div className="flex items-center bg-slate-100 border border-slate-200 rounded-full p-0.5 shadow-xs">
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider transition-all ${
                    language === 'en'
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('fr')}
                  className={`px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider transition-all ${
                    language === 'fr'
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  FR
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span>Est. 1998 · Rehema Mission Rwanda</span>
              </div>
              <span className="text-[11px] text-slate-400">Kigali, Rwanda</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
