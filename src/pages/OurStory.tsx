import { Link } from 'react-router-dom';
import { ArrowRight, Eye, Compass } from 'lucide-react';
import { useWebsiteSettings } from '@/lib/settings';
import { useStore } from '@/store/StoreContext';
import { TRANSLATIONS, type TranslationKey } from '@/lib/translations';
import RotatingRingsTheme from '@/components/RotatingRingsTheme';
import CoreValuesCards from '@/components/CoreValuesCards';

export default function OurStory() {
  const settings = useWebsiteSettings();
  const { language } = useStore();
  const t = (key: TranslationKey, fallback?: string) =>
    TRANSLATIONS[language]?.[key] ?? TRANSLATIONS.en[key] ?? fallback ?? key;

  return (
    <div className="page-enter bg-[#FAF7F2] min-h-screen text-slate-900 pb-24">
      {/* 1. Page Header Hero Section */}
      <section className="relative bg-[#FAF7F2] min-h-[520px] sm:min-h-[620px] lg:min-h-[680px] flex flex-col items-center justify-center py-20 sm:py-28 md:py-36 px-4 sm:px-6 lg:px-8 overflow-hidden">
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

      {/* 2. Unified Narrative Section (No Boxed Cards — Directly on Background as 1 Section) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-8 sm:pb-10">
        {/* Part A: Origins & The Founder Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Founder Portrait Column */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[24px] shadow-2xl border border-stone-200/80 group bg-slate-100">
              <img
                src="/maman.png"
                alt="Mama Assumpta Kayiranga — Founder of Rehema Mission Rwanda"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/15 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <p className="font-serif text-xl sm:text-2xl font-medium text-amber-200">
                  {t('story.founderName')}
                </p>
                <p className="text-xs text-slate-200 font-light mt-0.5">
                  {t('story.founderRole')}
                </p>
              </div>
            </div>
          </div>

          {/* Narrative Content Column */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <div className="w-[2px] h-7 sm:h-8 bg-[#C5A059] mb-3" />
              <p className="eyebrow mb-2">{t('story.originsEyebrow')}</p>
              <h2 className="section-title text-2xl sm:text-3xl md:text-4xl text-slate-950">
                {t('story.originsTitle')}
              </h2>
            </div>

            <div className="space-y-4 text-stone-600 font-light text-base sm:text-[1.05rem] leading-relaxed pt-2">
              <p>{t('story.originsP1')}</p>
              <p>{t('story.originsP2')}</p>
            </div>
          </div>
        </div>

        {/* Part B: Faith & The Meaning of Ebenezer (Directly on Background) */}
        <div className="mt-10 sm:mt-12 text-center max-w-3xl mx-auto">
          <p className="eyebrow mb-2">{t('story.faithTitle')}</p>

          <blockquote className="font-serif italic text-3xl sm:text-4xl md:text-[2.65rem] text-slate-950 font-normal leading-tight my-3">
            {t('story.ebenezerQuote')}
          </blockquote>

          <p className="text-xs uppercase tracking-[0.25em] text-amber-800 font-bold mb-4">
            {t('story.ebenezerVerse')}
          </p>

          <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed max-w-2xl mx-auto">
            {t('story.ebenezerBody')}
          </p>
        </div>

        {/* Part C: Vision & Mission (Editorial 2-Column Split Directly on Background) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 max-w-5xl mx-auto mt-20 sm:mt-28 md:mt-32">
          {/* Vision */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-500/15 flex items-center justify-center text-amber-800 flex-shrink-0">
                <Eye className="w-4 h-4 text-amber-700" />
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-slate-950 font-medium">
                {t('story.visionTitle')}
              </h3>
            </div>
            <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed pl-12">
              {t('story.visionText')}
            </p>
          </div>

          {/* Mission */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-500/15 flex items-center justify-center text-amber-800 flex-shrink-0">
                <Compass className="w-4 h-4 text-amber-700" />
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-slate-950 font-medium">
                {t('story.missionTitle')}
              </h3>
            </div>
            <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed pl-12">
              {t('story.missionText')}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Values Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4">
        <div className="text-center mb-12 sm:mb-14">
          <div className="w-[2px] h-7 sm:h-8 bg-[#C5A059] mx-auto mb-3" />
          <p className="eyebrow mb-2">{t('story.valuesEyebrow')}</p>
          <h2 className="section-title text-2xl sm:text-3xl md:text-4xl text-slate-950">
            {t('story.valuesTitle')}
          </h2>
        </div>

        <CoreValuesCards />
      </section>

      {/* 4. Next Step Call to Action */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="bg-gradient-to-r from-amber-100/70 via-amber-50/90 to-amber-100/70 border border-amber-200/80 p-8 sm:p-12 text-center rounded-[24px] flex flex-col items-center justify-center space-y-4 shadow-sm">
          <h3 className="section-title text-2xl sm:text-3xl md:text-4xl text-slate-950">
            {t('story.ctaQuestion')}
          </h3>
          <p className="text-sm sm:text-base font-light max-w-xl text-stone-700 leading-relaxed">
            {t('story.ctaDesc')}
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-4">
            <Link to="/our-work" className="btn-primary text-xs py-3 px-8 rounded-xl">
              <span>{t('story.ctaProgrammes')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/gallery" className="btn-outline text-xs py-3 px-8 bg-white/80 rounded-xl">
              <span>{t('story.ctaGallery')}</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
