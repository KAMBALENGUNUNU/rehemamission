import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Lock, Palette, ArrowRight, Heart, Sparkles, CheckCircle2, ArrowUp } from 'lucide-react';
import { useWebsiteSettings } from '@/lib/settings';
import { useStore } from '@/store/StoreContext';
import { TRANSLATIONS, type TranslationKey } from '@/lib/translations';

export default function KazeFooter() {
  const settings = useWebsiteSettings();
  const { language } = useStore();
  const t = (key: TranslationKey, fallback?: string) =>
    TRANSLATIONS[language]?.[key] ?? TRANSLATIONS.en[key] ?? fallback ?? key;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#020408] text-stone-300 overflow-hidden border-t border-white/10">
      {/* Background wireframe grid image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/footer-bg.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center opacity-25 pointer-events-none select-none"
        />
        {/* Soft atmospheric fade for contrast and readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020408]/90 via-[#020408]/40 to-[#020408]/95 pointer-events-none" />
      </div>

      {/* Ambient artistic studio light glow in background */}
      <div className="absolute -top-32 left-1/3 w-[600px] h-[350px] bg-gradient-to-b from-amber-500/15 via-amber-700/5 to-transparent rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute -bottom-20 right-10 w-80 h-80 bg-gradient-to-tl from-amber-600/10 via-amber-500/5 to-transparent rounded-full blur-3xl pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-16 pb-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          {/* Atelier Brand & Story (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] tracking-[0.25em] uppercase font-semibold mb-2">
                <Palette className="w-3 h-3 text-amber-400" />
                <span>{t('kazeFooter.atelierTag')}</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl font-light text-white tracking-tight">
                {t('kazeFooter.title')}
              </h3>
            </div>

            <p className="text-sm text-stone-300 font-light leading-relaxed max-w-md">
              {t('kazeFooter.desc')}
            </p>

            {/* Clear, elegant bridge back to parent mission */}
            <div className="pt-2 border-t border-white/10 max-w-md">
              <Link
                to="/our-story"
                className="group inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-300 hover:text-amber-200 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition-transform" />
                <span>{t('kazeFooter.parentLink')}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Mediums & Catalog Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold tracking-[0.22em] uppercase text-amber-300">
              {t('kazeFooter.mediums')}
            </h4>
            <ul className="space-y-3 text-[15px] sm:text-base font-light">
              <li>
                <Link to="/gallery" className="text-stone-300 hover:text-white transition-colors">
                  {t('kazeFooter.medium1')}
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-stone-300 hover:text-white transition-colors">
                  {t('kazeFooter.medium2')}
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-stone-300 hover:text-white transition-colors">
                  {t('kazeFooter.medium3')}
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-stone-300 hover:text-white transition-colors">
                  {t('kazeFooter.medium4')}
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-stone-300 hover:text-amber-300 transition-colors font-medium">
                  {t('kazeFooter.viewAll')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Gallery Experience & Services (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold tracking-[0.22em] uppercase text-amber-300">
              {t('kazeFooter.showroom')}
            </h4>
            <ul className="space-y-3 text-[15px] sm:text-base font-light">
              <li>
                <Link to="/visit" className="text-stone-300 hover:text-white transition-colors">
                  {t('kazeFooter.appts')}
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="text-stone-300 hover:text-white transition-colors inline-flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-rose-400" />
                  <span>{t('kazeFooter.saved')}</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-stone-300 hover:text-white transition-colors">
                  {t('kazeFooter.inquire')}
                </Link>
              </li>
              <li>
                <Link to="/partner" className="text-stone-300 hover:text-white transition-colors">
                  {t('kazeFooter.patrons')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Atelier Contact & Location (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold tracking-[0.22em] uppercase text-amber-300">
              {t('kazeFooter.atelier')}
            </h4>
            <ul className="space-y-3.5 text-[15px] sm:text-base font-light">
              <li className="flex items-start gap-3 text-stone-300">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-amber-400" />
                <span>{settings.address || 'Kicukiro, Kigali, Rwanda'}</span>
              </li>
              <li className="flex items-center gap-3 text-stone-300">
                <Phone className="w-4 h-4 flex-shrink-0 text-amber-400" />
                <a href={`tel:${settings.phone || '+250798618524'}`} className="hover:text-amber-300 transition-colors">
                  {settings.phone || '+250 798 618 524'}
                </a>
              </li>
              <li className="flex items-center gap-3 text-stone-300">
                <Mail className="w-4 h-4 flex-shrink-0 text-amber-400" />
                <a href={`mailto:${settings.contact_email || 'assumptakayiranga05@gmail.com'}`} className="hover:text-amber-300 transition-colors break-all">
                  {settings.contact_email || 'assumptakayiranga05@gmail.com'}
                </a>
              </li>
            </ul>

            {/* Ethical Sales Assurance */}
            <div className="flex items-center gap-2 text-xs text-stone-400 pt-2 font-light">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>{t('kazeFooter.assurance')}</span>
            </div>
          </div>
        </div>

        {/* Outlined Signature Brand Typography */}
        <div className="pt-8 sm:pt-10 pb-6 sm:pb-8 text-center select-none overflow-hidden">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.75rem] font-light tracking-tight text-outline-signature leading-none cursor-default transition-all duration-500">
            Rehema Mission Rwanda
          </h2>
        </div>

        {/* Bottom Horizontal Hairline */}
        <div className="h-[1px] w-full bg-white/10" />

        {/* Bottom Sub-Footer Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] sm:text-sm text-stone-400">
          <p>
            © {new Date().getFullYear()} {t('kazeFooter.copyright')}
          </p>
          <div className="flex items-center gap-6 sm:gap-8">
            <Link to="/" className="hover:text-stone-200 transition-colors">
              {t('kazeFooter.homeLink')}
            </Link>
            <Link to="/our-story" className="hover:text-stone-200 transition-colors">
              {t('nav.ourStory')}
            </Link>
            <Link to="/contact" className="hover:text-stone-200 transition-colors">
              {t('nav.contact')}
            </Link>
            <Link to="/admin/login" className="flex items-center gap-1.5 hover:text-amber-300 transition-colors text-xs">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>{t('kazeFooter.adminPortal')}</span>
            </Link>

            {/* Back to Top Square Button */}
            <button
              onClick={scrollToTop}
              type="button"
              aria-label={t('footer.backToTop')}
              className="w-9 h-9 border border-white/20 hover:border-amber-400 hover:text-amber-300 hover:bg-white/5 transition-all flex items-center justify-center text-stone-300 group"
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
