import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Lock, Heart, ArrowUp } from 'lucide-react';
import { useWebsiteSettings } from '@/lib/settings';
import { useStore } from '@/store/StoreContext';
import { TRANSLATIONS, type TranslationKey } from '@/lib/translations';

export default function Footer() {
  const settings = useWebsiteSettings();
  const { language } = useStore();
  const t = (key: TranslationKey, fallback?: string) =>
    TRANSLATIONS[language]?.[key] ?? TRANSLATIONS.en[key] ?? fallback ?? key;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#020408] text-slate-300 overflow-hidden border-t border-white/10">
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

      {/* Radiant ambient gradient light beams in background */}
      <div className="absolute -top-32 right-1/4 w-[500px] h-[350px] bg-gradient-to-b from-amber-500/10 via-amber-600/5 to-transparent rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute -bottom-24 left-10 w-96 h-96 bg-gradient-to-tr from-amber-700/10 via-amber-500/5 to-transparent rounded-full blur-3xl pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-16 pb-10 relative z-10">
        {/* Navigation & Contact Columns - closer together without vertical dividing lines */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 lg:gap-16 pb-12 sm:pb-14">
          {/* Quick Links Column 1: Our Mission */}
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-[11px] sm:text-xs tracking-[0.26em] uppercase font-semibold text-amber-400 font-sans">
                {t('footer.foundation')}
              </span>
              <h4 className="font-serif text-2xl sm:text-[1.7rem] font-light text-white tracking-wide">
                {t('footer.missionHeader')}
              </h4>
            </div>
            <ul className="space-y-3 text-[15px] sm:text-base font-light">
              <li>
                <Link to="/our-story" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all inline-block">
                  {t('footer.storyLink')}
                </Link>
              </li>
              <li>
                <Link to="/our-work" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all inline-block">
                  {t('footer.workLink')}
                </Link>
              </li>
              <li>
                <Link to="/our-story" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all inline-block">
                  {t('footer.valuesLink')}
                </Link>
              </li>
              <li>
                <Link to="/partner" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all inline-block">
                  {t('footer.partnerLink')}
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-slate-300 hover:text-amber-300 hover:translate-x-1 transition-all inline-flex items-center gap-2">
                  <span>{t('footer.kazeCollection')}</span>
                  <span className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-medium">
                    {t('footer.artBadge')}
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links Column 2: Involve & Support */}
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-[11px] sm:text-xs tracking-[0.26em] uppercase font-semibold text-amber-400 font-sans">
                {t('footer.community')}
              </span>
              <h4 className="font-serif text-2xl sm:text-[1.7rem] font-light text-white tracking-wide">
                {t('footer.getInvolvedHeader')}
              </h4>
            </div>
            <ul className="space-y-3 text-[15px] sm:text-base font-light">
              <li>
                <Link to="/visit" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all inline-block">
                  {t('footer.visitLink')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all inline-block">
                  {t('footer.contactLink')}
                </Link>
              </li>
              <li>
                <Link to="/partner" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all inline-block">
                  {t('footer.churchLink')}
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-rose-400" />
                  <span>{t('footer.savedLink')}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-[11px] sm:text-xs tracking-[0.26em] uppercase font-semibold text-amber-400 font-sans">
                {t('footer.presence')}
              </span>
              <h4 className="font-serif text-2xl sm:text-[1.7rem] font-light text-white tracking-wide">
                {t('footer.kigaliOfficeHeader')}
              </h4>
            </div>
            <ul className="space-y-3.5 text-[15px] sm:text-base font-light">
              <li className="flex items-start gap-3 text-slate-300">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-amber-400" />
                <span>{settings.address || 'Kicukiro, Kigali, Rwanda'}</span>
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <Phone className="w-4 h-4 flex-shrink-0 text-amber-400" />
                <a href={`tel:${settings.phone || '+250798618524'}`} className="hover:text-amber-300 transition-colors">
                  {settings.phone || '+250 798 618 524'}
                </a>
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <Mail className="w-4 h-4 flex-shrink-0 text-amber-400" />
                <a href={`mailto:${settings.contact_email || 'assumptakayiranga05@gmail.com'}`} className="hover:text-amber-300 transition-colors break-all">
                  {settings.contact_email || 'assumptakayiranga05@gmail.com'}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Outlined Signature Brand Typography - resized and refined */}
        <div className="pt-8 sm:pt-10 pb-6 sm:pb-8 text-center select-none overflow-hidden">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.75rem] font-light tracking-tight text-outline-signature leading-none cursor-default transition-all duration-500">
            Rehema Mission Rwanda
          </h2>
        </div>

        {/* Bottom Horizontal Hairline */}
        <div className="h-[1px] w-full bg-white/10" />

        {/* Bottom Sub-Footer Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] sm:text-sm text-slate-400">
          <p>
            © {new Date().getFullYear()} {t('footer.copyright')}
          </p>

          <div className="flex items-center gap-6 sm:gap-8">
            <Link to="/contact" className="hover:text-slate-200 transition-colors">
              {t('footer.privacy')}
            </Link>
            <Link to="/gallery" className="hover:text-amber-300 transition-colors">
              {t('footer.kazeCollection')}
            </Link>
            <Link to="/admin/login" className="flex items-center gap-1.5 hover:text-amber-300 transition-colors text-xs">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>{t('footer.adminPortal')}</span>
            </Link>

            {/* Back to Top Square Button (as seen in the reference) */}
            <button
              onClick={scrollToTop}
              type="button"
              aria-label={t('footer.backToTop')}
              className="w-9 h-9 border border-white/20 hover:border-amber-400 hover:text-amber-300 hover:bg-white/5 transition-all flex items-center justify-center text-slate-300 group"
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
