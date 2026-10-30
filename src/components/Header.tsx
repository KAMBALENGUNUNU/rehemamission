import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
                className="h-9 sm:h-11 w-auto max-w-[200px] object-contain transition-transform duration-200 group-hover:scale-[1.02]"
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
          <nav className="hidden lg:flex items-center gap-7">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `text-xs tracking-[0.14em] uppercase transition-colors duration-200 relative group py-1.5 ${
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
              onClick={() => setMenuOpen(true)}
              className="lg:hidden p-2 rounded-md text-slate-800 hover:text-slate-950"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl animate-slide-in-right flex flex-col justify-between">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50">
                <Link to="/" onClick={() => setMenuOpen(false)} className="h-10 flex items-center">
                  <img
                    src="/logo.png"
                    alt="Logo"
                    className="h-8 w-auto max-w-[150px] object-contain"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.dataset.triedSvg) {
                        target.dataset.triedSvg = 'true';
                        target.src = '/logo.svg';
                      }
                    }}
                  />
                </Link>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-1.5 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-200/50"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col p-6 gap-3">
                {links.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === '/'}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `text-sm tracking-[0.14em] uppercase py-2 border-b border-slate-100 transition-colors ${
                        isActive ? 'text-slate-950 font-bold border-amber-500' : 'text-slate-600 hover:text-slate-950'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
                <NavLink
                  to="/favorites"
                  onClick={() => setMenuOpen(false)}
                  className="text-sm tracking-[0.14em] uppercase py-2 text-slate-600 flex items-center justify-between"
                >
                  <span>{language === 'fr' ? 'Œuvres sauvegardées' : 'Saved Artworks'}</span>
                  {favorites.length > 0 && (
                    <span className="bg-amber-500 text-slate-950 text-xs px-2 py-0.5 rounded-full font-bold">
                      {favorites.length}
                    </span>
                  )}
                </NavLink>
              </nav>
            </div>

            {/* Drawer Footer */}
            <div className="p-6 bg-slate-50 border-t border-slate-100 space-y-4">
              {/* Language Switcher in Drawer */}
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-slate-500 font-medium">
                  {language === 'fr' ? 'Langue' : 'Language'}
                </span>
                <div className="flex items-center bg-white border border-slate-200 rounded-full p-0.5 shadow-sm">
                  <button
                    type="button"
                    onClick={() => setLanguage('en')}
                    className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wider ${
                      language === 'en'
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                        : 'text-slate-500'
                    }`}
                  >
                    EN
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage('fr')}
                    className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wider ${
                      language === 'fr'
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                        : 'text-slate-500'
                    }`}
                  >
                    FR
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-600 pt-1">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span>Est. 1998 · Rehema Mission Rwanda</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
