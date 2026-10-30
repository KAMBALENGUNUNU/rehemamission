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
    <footer className="relative bg-[#faf7f2] text-stone-700 overflow-hidden border-t border-stone-200/90">
      {/* Background wireframe texture with soft clear luminosity */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <img
          src="/footer-bg.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#faf7f2]/95 via-[#faf7f2]/80 to-[#faf7f2]" />
      </div>

      {/* Subtle warm ambient halo */}
      <div className="absolute -top-32 left-1/3 w-[600px] h-[350px] bg-gradient-radial from-amber-200/30 via-amber-100/10 to-transparent rounded-full blur-3xl pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-16 pb-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-stone-200">
          {/* Atelier Brand & Story (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-900 text-[10px] tracking-[0.25em] uppercase font-semibold mb-2">
                <Palette className="w-3 h-3 text-amber-600" />
                <span>{t('kazeFooter.atelierTag', 'Ebenezer Vocational Atelier · Kigali')}</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl font-normal text-stone-900 tracking-tight">
                {t('kazeFooter.title', 'Kaze Collection')}
              </h3>
            </div>

            <p className="text-sm text-stone-600 font-light leading-relaxed max-w-md">
              {t(
                'kazeFooter.desc',
                'A dedicated fine art initiative under Rehema Mission Rwanda. Every canvas, drawing, and sculpture is handcrafted by talented Rwandan youth, expressing identity, restoration, and vibrant cultural heritage.'
              )}
            </p>

            {/* Clear, elegant bridge back to parent mission */}
            <div className="pt-2 border-t border-stone-200 max-w-md">
              <Link
                to="/our-story"
                className="group inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-800 hover:text-amber-950 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600 group-hover:rotate-12 transition-transform" />
                <span>{t('kazeFooter.parentLink', 'Discover Rehema Mission Rwanda’s 26-Year Story')}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Mediums & Catalog Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold tracking-[0.22em] uppercase text-stone-900">
              {t('kazeFooter.mediums', 'Mediums & Styles')}
            </h4>
            <ul className="space-y-3 text-[14px] sm:text-[15px] font-normal">
              <li>
                <a href="/gallery#gallery" className="text-stone-600 hover:text-amber-800 transition-colors">
                  {t('kazeFooter.medium1', 'Acrylic on Canvas')}
                </a>
              </li>
              <li>
                <a href="/gallery#gallery" className="text-stone-600 hover:text-amber-800 transition-colors">
                  {t('kazeFooter.medium2', 'Original Paintings')}
                </a>
              </li>
              <li>
                <a href="/gallery#gallery" className="text-stone-600 hover:text-amber-800 transition-colors">
                  {t('kazeFooter.medium3', 'Fine Ink & Drawings')}
                </a>
              </li>
              <li>
                <a href="/gallery#gallery" className="text-stone-600 hover:text-amber-800 transition-colors">
                  {t('kazeFooter.medium4', 'Mixed Media & Textile')}
                </a>
              </li>
              <li>
                <a href="/gallery#gallery" className="text-amber-800 hover:text-amber-950 transition-colors font-medium">
                  {t('kazeFooter.viewAll', 'View Complete Catalog →')}
                </a>
              </li>
            </ul>
          </div>

          {/* Gallery Experience & Services (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold tracking-[0.22em] uppercase text-stone-900">
              {t('kazeFooter.showroom', 'Atelier Services')}
            </h4>
            <ul className="space-y-3 text-[14px] sm:text-[15px] font-normal">
              <li>
                <Link to="/visit" className="text-stone-600 hover:text-amber-800 transition-colors">
                  {t('kazeFooter.appts', 'Private Studio Viewing')}
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="text-stone-600 hover:text-amber-800 transition-colors inline-flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-rose-500" />
                  <span>{t('kazeFooter.saved', 'Saved Artworks')}</span>
                </Link>
              </li>
              <li>
                <a href="/gallery#inquire" className="text-stone-600 hover:text-amber-800 transition-colors">
                  {t('kazeFooter.inquire', 'Acquisition Inquiries')}
                </a>
              </li>
              <li>
                <Link to="/partner" className="text-stone-600 hover:text-amber-800 transition-colors">
                  {t('kazeFooter.patrons', 'Patronage & Donors')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Atelier Contact & Location (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold tracking-[0.22em] uppercase text-stone-900">
              {t('kazeFooter.atelier', 'Kigali Atelier')}
            </h4>
            <ul className="space-y-3.5 text-[14px] sm:text-[15px] font-normal">
              <li className="flex items-start gap-3 text-stone-600">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-amber-600" />
                <span>{settings.address || 'Kicukiro, Kigali, Rwanda'}</span>
              </li>
              <li className="flex items-center gap-3 text-stone-600">
                <Phone className="w-4 h-4 flex-shrink-0 text-amber-600" />
                <a href={`tel:${settings.phone || '+250798618524'}`} className="hover:text-amber-800 transition-colors">
                  {settings.phone || '+250 798 618 524'}
                </a>
              </li>
              <li className="flex items-center gap-3 text-stone-600">
                <Mail className="w-4 h-4 flex-shrink-0 text-amber-600" />
                <a href={`mailto:${settings.contact_email || 'assumptakayiranga05@gmail.com'}`} className="hover:text-amber-800 transition-colors break-all">
                  {settings.contact_email || 'assumptakayiranga05@gmail.com'}
                </a>
              </li>
            </ul>

            {/* Ethical Sales Assurance */}
            <div className="flex items-center gap-2 text-xs text-stone-500 pt-2 font-light">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>{t('kazeFooter.assurance', 'Ethical acquisition · Direct youth support')}</span>
            </div>
          </div>
        </div>

        {/* Luminous Signature Brand Typography */}
        <div className="pt-8 sm:pt-10 pb-6 sm:pb-8 text-center select-none overflow-hidden">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.75rem] font-light tracking-tight text-stone-300 hover:text-amber-700/60 leading-none cursor-default transition-all duration-500">
            Rehema Mission Rwanda
          </h2>
        </div>

        {/* Bottom Horizontal Hairline */}
        <div className="h-[1px] w-full bg-stone-200" />

        {/* Bottom Sub-Footer Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] sm:text-sm text-stone-500">
          <p>
            © {new Date().getFullYear()} {t('kazeFooter.copyright', 'Kaze Collection. All artworks created under Rehema Mission Rwanda.')}
          </p>
          <div className="flex items-center gap-6 sm:gap-8">
            <Link to="/" className="hover:text-stone-900 transition-colors">
              {t('kazeFooter.homeLink', 'Rehema Mission Home')}
            </Link>
            <Link to="/our-story" className="hover:text-stone-900 transition-colors">
              {t('nav.ourStory', 'Our Story')}
            </Link>
            <Link to="/contact" className="hover:text-stone-900 transition-colors">
              {t('nav.contact', 'Contact')}
            </Link>
            <Link to="/admin/login" className="flex items-center gap-1.5 hover:text-amber-800 transition-colors text-xs">
              <Lock className="w-3.5 h-3.5 text-amber-600" />
              <span>{t('kazeFooter.adminPortal', 'Kaze Admin')}</span>
            </Link>

            {/* Back to Top Square Button */}
            <button
              onClick={scrollToTop}
              type="button"
              aria-label={t('footer.backToTop', 'Back to top')}
              className="w-9 h-9 border border-stone-300 hover:border-amber-500 hover:text-amber-800 hover:bg-stone-100 transition-all flex items-center justify-center text-stone-600 rounded-lg group"
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
