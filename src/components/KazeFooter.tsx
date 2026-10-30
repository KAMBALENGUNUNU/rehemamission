import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Lock, Palette, ArrowRight, Heart, Sparkles, CheckCircle2, ArrowUp } from 'lucide-react';
import { useWebsiteSettings } from '@/lib/settings';
import { useStore } from '@/store/StoreContext';
import { TRANSLATIONS, type TranslationKey } from '@/lib/translations';
import ArtGalleryThemePattern from '@/components/ArtGalleryThemePattern';

export default function KazeFooter() {
  const settings = useWebsiteSettings();
  const { language } = useStore();
  const t = (key: TranslationKey, fallback?: string) =>
    TRANSLATIONS[language]?.[key] ?? TRANSLATIONS.en[key] ?? fallback ?? key;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="kaze-footer relative z-30 -mt-12 sm:-mt-16 lg:-mt-20 bg-[#080808] text-stone-300 overflow-hidden rounded-t-[40px] sm:rounded-t-[60px] lg:rounded-t-[76px] shadow-[0_-20px_60px_rgba(0,0,0,0.55)] border-t border-white/10">
      {/* Bespoke Fine Art Studio SVG Theme Pattern - Subtle, Delicate Whisper Watermark on Black */}
      <ArtGalleryThemePattern
        id="kaze-footer-art-pattern"
        opacity={0.07}
        strokeWidth={1.2}
        className="text-white"
      />

      {/* Subtle warm golden ambient halos in background */}
      <div className="absolute top-0 left-1/3 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-radial from-amber-500/15 via-amber-600/5 to-transparent rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-0 right-10 w-[500px] h-[300px] bg-gradient-radial from-stone-700/10 via-transparent to-transparent rounded-full blur-3xl pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          {/* Atelier Brand & Story (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <h3 className="font-serif text-3xl sm:text-4xl font-normal text-white tracking-tight">
                {t('kazeFooter.title', 'Kaze Collections')}
              </h3>
            </div>

            <p className="text-sm text-stone-300 font-light leading-relaxed max-w-md">
              {t(
                'kazeFooter.desc',
                'A dedicated fine art initiative under Rehema Mission Rwanda. Every canvas, drawing, and sculpture is handcrafted by talented Rwandan youth, expressing identity, restoration, and vibrant cultural heritage.'
              )}
            </p>

            {/* Designed Bridge Button back to Rehema Mission Rwanda */}
            <div className="pt-2 max-w-md">
              <Link
                to="/our-story"
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-amber-400/50 bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-transparent hover:from-amber-400 hover:to-amber-500 text-amber-300 hover:text-slate-950 text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md group"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400 group-hover:text-slate-950 transition-colors" />
                <span>{t('kazeFooter.parentLink', 'Rehema Mission · Our Story')}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:text-slate-950 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Mediums & Catalog Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold tracking-[0.22em] uppercase text-white">
              {t('kazeFooter.mediums', 'Mediums & Styles')}
            </h4>
            <ul className="space-y-3 text-[14px] sm:text-[15px] font-normal">
              <li>
                <a href="/gallery#gallery" className="text-stone-300 hover:text-amber-400 transition-colors">
                  {t('kazeFooter.medium1', 'Acrylic on Canvas')}
                </a>
              </li>
              <li>
                <a href="/gallery#gallery" className="text-stone-300 hover:text-amber-400 transition-colors">
                  {t('kazeFooter.medium2', 'Original Paintings')}
                </a>
              </li>
              <li>
                <a href="/gallery#gallery" className="text-stone-300 hover:text-amber-400 transition-colors">
                  {t('kazeFooter.medium3', 'Fine Ink & Drawings')}
                </a>
              </li>
              <li>
                <a href="/gallery#gallery" className="text-stone-300 hover:text-amber-400 transition-colors">
                  {t('kazeFooter.medium4', 'Mixed Media & Textile')}
                </a>
              </li>
              <li>
                <a href="/gallery#gallery" className="text-amber-400 hover:text-amber-300 transition-colors font-medium">
                  {t('kazeFooter.viewAll', 'View Complete Catalog →')}
                </a>
              </li>
            </ul>
          </div>

          {/* Gallery Experience & Services (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold tracking-[0.22em] uppercase text-white">
              {t('kazeFooter.showroom', 'Atelier Services')}
            </h4>
            <ul className="space-y-3 text-[14px] sm:text-[15px] font-normal">
              <li>
                <Link to="/visit" className="text-stone-300 hover:text-amber-400 transition-colors">
                  {t('kazeFooter.appts', 'Private Studio Viewing')}
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="text-stone-300 hover:text-amber-400 transition-colors inline-flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-rose-500" />
                  <span>{t('kazeFooter.saved', 'Saved Artworks')}</span>
                </Link>
              </li>
              <li>
                <a href="/gallery#inquire" className="text-stone-300 hover:text-amber-400 transition-colors">
                  {t('kazeFooter.inquire', 'Acquisition Inquiries')}
                </a>
              </li>
              <li>
                <Link to="/partner" className="text-stone-300 hover:text-amber-400 transition-colors">
                  {t('kazeFooter.patrons', 'Patronage & Donors')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Atelier Contact & Location (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold tracking-[0.22em] uppercase text-white">
              {t('kazeFooter.atelier', 'Kigali Atelier')}
            </h4>
            <ul className="space-y-3.5 text-[14px] sm:text-[15px] font-normal">
              <li className="flex items-start gap-3 text-stone-300">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-amber-400" />
                <span>{settings.address || 'Kicukiro, Kigali, Rwanda'}</span>
              </li>
              <li className="flex items-center gap-3 text-stone-300">
                <Phone className="w-4 h-4 flex-shrink-0 text-amber-400" />
                <a href={`tel:${settings.phone || '+250798618524'}`} className="hover:text-amber-400 transition-colors">
                  {settings.phone || '+250 798 618 524'}
                </a>
              </li>
              <li className="flex items-center gap-3 text-stone-300">
                <Mail className="w-4 h-4 flex-shrink-0 text-amber-400" />
                <a href={`mailto:${settings.contact_email || 'assumptakayiranga05@gmail.com'}`} className="hover:text-amber-400 transition-colors break-all">
                  {settings.contact_email || 'assumptakayiranga05@gmail.com'}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Outlined Signature Brand Typography (Luminous on Black) */}
        <div className="pt-8 sm:pt-10 pb-6 sm:pb-8 text-center select-none overflow-hidden">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.75rem] font-light tracking-tight text-outline-signature leading-none cursor-default transition-all duration-500">
            Kaze Collections
          </h2>
        </div>

        {/* Bottom Horizontal Hairline */}
        <div className="h-[1px] w-full bg-white/10" />

        {/* Bottom Sub-Footer Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] sm:text-sm text-stone-400">
          <p>
            © {new Date().getFullYear()} {t('kazeFooter.copyright', 'Kaze Collections. All artworks created under Rehema Mission Rwanda.')}
          </p>
          <div className="flex items-center gap-6 sm:gap-8">
            <Link to="/" className="hover:text-white transition-colors">
              {t('kazeFooter.homeLink', 'Rehema Mission Home')}
            </Link>
            <Link to="/our-story" className="hover:text-white transition-colors">
              {t('nav.ourStory', 'Our Story')}
            </Link>
            <Link to="/contact" className="hover:text-white transition-colors">
              {t('nav.contact', 'Contact')}
            </Link>
            <Link to="/admin/login" className="flex items-center gap-1.5 hover:text-amber-400 transition-colors text-xs">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>{t('kazeFooter.adminPortal', 'Kaze Admin')}</span>
            </Link>

            {/* Back to Top Square Button */}
            <button
              onClick={scrollToTop}
              type="button"
              aria-label={t('footer.backToTop', 'Back to top')}
              className="w-9 h-9 border border-white/20 hover:border-amber-400 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center text-stone-300 rounded-lg group"
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}