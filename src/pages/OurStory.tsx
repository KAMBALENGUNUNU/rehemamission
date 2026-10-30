import { Link } from 'react-router-dom';
import { ArrowRight, Shield, HeartHandshake, Eye, Sparkles, CheckCircle2 } from 'lucide-react';
import { useWebsiteSettings } from '@/lib/settings';
import { useStore } from '@/store/StoreContext';
import { TRANSLATIONS, type TranslationKey } from '@/lib/translations';
import RotatingRingsTheme from '@/components/RotatingRingsTheme';

export default function OurStory() {
  const settings = useWebsiteSettings();
  const { language } = useStore();
  const t = (key: TranslationKey, fallback?: string) =>
    TRANSLATIONS[language]?.[key] ?? TRANSLATIONS.en[key] ?? fallback ?? key;

  const values = [
    {
      title: t('story.val1Title'),
      description: t('story.val1Desc'),
      icon: Sparkles,
    },
    {
      title: t('story.val2Title'),
      description: t('story.val2Desc'),
      icon: HeartHandshake,
    },
    {
      title: t('story.val3Title'),
      description: t('story.val3Desc'),
      icon: Shield,
    },
    {
      title: t('story.val4Title'),
      description: t('story.val4Desc'),
      icon: Eye,
    },
  ];

  return (
    <div className="page-enter bg-slate-50 min-h-screen text-slate-900 pb-24">
      {/* 1. Page Header Hero Section */}
      <section className="relative bg-[#FAF7F2] min-h-[560px] sm:min-h-[660px] lg:min-h-[740px] flex flex-col items-center justify-center py-24 sm:py-32 md:py-40 px-4 sm:px-6 lg:px-8 border-b border-stone-200/60 overflow-hidden">
        {/* Luxury Rotating Rings SVG Theme (The Signature Gallery) in Background */}
        <RotatingRingsTheme
          className="w-[480px] h-[480px] sm:w-[600px] sm:h-[600px] lg:w-[720px] lg:h-[720px]"
          glowClassName="w-[480px] h-[350px]"
        />

        <div className="max-w-4xl mx-auto text-center relative z-10 w-full my-auto">
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-[4rem] font-bold text-slate-950 tracking-[-0.015em] leading-[1.12]">
            {language === 'fr' ? t('story.headline') : (settings.about_headline || t('story.headline'))}
          </h1>
          <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-700 font-light max-w-2xl mx-auto leading-relaxed">
            {t('story.subtitle')}
          </p>
        </div>
      </section>

      {/* 2. Main Narrative Section — Origins & Foundation */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 md:pt-16">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 md:p-16 shadow-sm space-y-8">
          <div>
            <p className="eyebrow mb-2">{t('story.originsEyebrow')}</p>
            <h2 className="section-title text-2xl sm:text-3xl md:text-4xl">
              {t('story.originsTitle')}
            </h2>
            <div className="w-16 h-[2px] bg-amber-500 mt-4" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl shadow-lg border border-slate-200">
                <img
                  src="/artworks/founder-portrait.jpg"
                  alt="Assumpta Kayiranga — Founder of Rehema Mission Rwanda"
                  className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <p className="font-serif text-lg font-medium text-amber-200">{t('story.founderName')}</p>
                  <p className="text-xs text-slate-200 font-light">{t('story.founderRole')}</p>
                  <p className="text-[11px] text-amber-300/90 mt-0.5 font-light">{t('story.founderPortraitDesc')}</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 space-y-5 text-slate-700 font-light text-base leading-relaxed">
              <p>{t('story.originsP1')}</p>
              <p>{t('story.originsP2')}</p>
            </div>
          </div>

          {/* Ebenezer Faith Callout — CLEAR, WARM AMBER CARD */}
          <div className="bg-gradient-to-r from-amber-50 via-yellow-50/70 to-amber-50 border border-amber-300/80 p-8 sm:p-10 rounded-xl space-y-4 my-8 shadow-sm">
            <div className="flex items-center gap-2 text-amber-800 text-xs tracking-[0.2em] uppercase font-bold">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>{t('story.faithTitle')}</span>
            </div>
            <p className="font-serif italic text-2xl sm:text-3xl text-amber-950 font-normal">
              {t('story.ebenezerQuote')}
            </p>
            <p className="text-xs uppercase tracking-widest text-slate-500 font-medium">
              {t('story.ebenezerVerse')}
            </p>
            <p className="text-sm sm:text-base text-slate-700 font-light leading-relaxed pt-2 border-t border-amber-200">
              {t('story.ebenezerBody')}
            </p>
          </div>

          {/* Vision & Mission Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            <div className="p-6 bg-slate-50/90 border border-slate-200 rounded-xl">
              <h3 className="font-serif text-xl font-medium text-slate-900 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-amber-600" />
                <span>{t('story.visionTitle')}</span>
              </h3>
              <p className="text-sm text-slate-600 font-light leading-relaxed">
                {t('story.visionText')}
              </p>
            </div>

            <div className="p-6 bg-slate-50/90 border border-slate-200 rounded-xl">
              <h3 className="font-serif text-xl font-medium text-slate-900 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-amber-600" />
                <span>{t('story.missionTitle')}</span>
              </h3>
              <p className="text-sm text-slate-600 font-light leading-relaxed">
                {t('story.missionText')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="text-center mb-12">
          <p className="eyebrow mb-2">{t('story.valuesEyebrow')}</p>
          <h2 className="section-title text-2xl sm:text-3xl md:text-4xl">{t('story.valuesTitle')}</h2>
          <div className="w-16 h-[2px] bg-amber-500 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                className="bg-white border border-stone-200/80 p-8 hover:border-amber-500/80 hover:shadow-lg transition-all duration-300 rounded-2xl"
              >
                <div className="w-12 h-12 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-medium text-slate-900 mb-2">
                  {v.title}
                </h3>
                <p className="text-sm text-slate-600 font-light leading-relaxed">
                  {v.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Next Step Call to Action */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="bg-gradient-to-r from-amber-100/80 via-yellow-50 to-amber-100/80 border border-amber-200 p-8 sm:p-12 text-center rounded-sm flex flex-col items-center justify-center space-y-4 shadow-sm">
          <h3 className="font-serif text-2xl sm:text-3xl font-light text-slate-950">
            {t('story.ctaQuestion')}
          </h3>
          <p className="text-sm sm:text-base font-light max-w-xl text-slate-700 leading-relaxed">
            {t('story.ctaDesc')}
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-4">
            <Link to="/our-work" className="btn-primary text-xs py-3 px-8">
              <span>{t('story.ctaProgrammes')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/gallery" className="btn-outline text-xs py-3 px-8 bg-white/80">
              <span>{t('story.ctaGallery')}</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
