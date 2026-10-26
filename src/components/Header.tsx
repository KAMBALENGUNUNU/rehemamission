import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Heart, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { useStore } from '@/store/StoreContext';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/our-story', label: 'Our Story' },
  { to: '/our-work', label: 'Our Work' },
  { to: '/gallery', label: 'Kaze Collection' },
  { to: '/visit', label: 'Visit' },
  { to: '/partner', label: 'Partner With Us' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const { favorites } = useStore();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // When at top of home page: completely transparent over hero image
  // When scrolled on ANY page: becomes transparent frosted glass as requested!
  const isTransparentTop = isHome && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparentTop
          ? 'bg-transparent border-b border-white/10 text-white'
          : scrolled
          ? 'bg-white/60 backdrop-blur-md border-b border-slate-200/50 shadow-sm text-slate-900'
          : 'bg-white/85 backdrop-blur-md border-b border-slate-200/70 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-16 sm:h-18' : 'h-20'}`}>
          {/* Logo Brand Slot (Ready for custom logo file) */}
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
                className={`items-center gap-2 px-3 py-1.5 rounded-sm border text-xs font-serif tracking-widest uppercase ${
                  isTransparentTop
                    ? 'border-white/30 bg-white/10 text-white'
                    : 'border-slate-200 bg-slate-50 text-slate-700'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>Logo</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `text-xs tracking-[0.14em] uppercase transition-colors duration-200 relative group py-1.5 ${
                    isTransparentTop
                      ? isActive
                        ? 'text-white font-bold'
                        : 'text-white/80 hover:text-white font-medium'
                      : isActive
                      ? 'text-slate-950 font-bold'
                      : 'text-slate-600 hover:text-slate-950 font-medium'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-[2px] transition-all duration-300 ${
                        isTransparentTop ? 'bg-amber-400' : 'bg-amber-500'
                      } ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Saved Artworks */}
            <Link
              to="/favorites"
              className={`relative p-2 rounded-full transition-colors ${
                isTransparentTop
                  ? 'text-white hover:text-amber-300'
                  : 'text-slate-700 hover:text-amber-700'
              }`}
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

            {/* Quick Inquiry CTA */}
            <Link
              to="/contact"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded text-xs font-semibold tracking-wider uppercase transition-all duration-200 bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-sm"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen(true)}
              className={`lg:hidden p-2 rounded-md ${
                isTransparentTop
                  ? 'text-white hover:text-amber-300'
                  : 'text-slate-800 hover:text-slate-950'
              }`}
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
                {navLinks.map((link) => (
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
                  <span>Saved Artworks</span>
                  {favorites.length > 0 && (
                    <span className="bg-amber-500 text-slate-950 text-xs px-2 py-0.5 rounded-full font-bold">
                      {favorites.length}
                    </span>
                  )}
                </NavLink>
              </nav>
            </div>

            {/* Drawer Footer */}
            <div className="p-6 bg-slate-50 border-t border-slate-100 space-y-3">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span>Est. 1998 · Faith-Rooted Mission</span>
              </div>
              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="w-full btn-primary text-xs py-2.5"
              >
                Start a Conversation
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
