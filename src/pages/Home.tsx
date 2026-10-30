import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Heart,
  Calendar,
  MessageCircle,
  Award,
} from 'lucide-react';
import { useWebsiteSettings } from '@/lib/settings';
import { REHEMA_ARTWORKS, type Artwork } from '@/lib/artworks';
import { useStore } from '@/store/StoreContext';
import { formatPrice } from '@/lib/utils';
import AnnouncementBar from '@/components/AnnouncementBar';
import RotatingRingsTheme from '@/components/RotatingRingsTheme';
import PillarStickerCards from '@/components/PillarStickerCards';
import StorytellingDonateSection from '@/components/StorytellingDonateSection';
import { TRANSLATIONS } from '@/lib/translations';

export default function Home() {
  const settings = useWebsiteSettings();
  const { toggleFavorite, isFavorite, language } = useStore();
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  const t = (key: keyof typeof TRANSLATIONS.en) => TRANSLATIONS[language]?.[key] ?? TRANSLATIONS.en[key];

  const featuredArtworks = REHEMA_ARTWORKS.slice(0, 4);

  return (
    <div className="page-enter bg-slate-50 min-h-screen text-slate-900">
      {/* 1. HERO SECTION — FULL-WIDTH IMAGE WITH CENTERED TEXT DIRECTLY ON TOP */}
      <section className="relative w-full min-h-[85vh] sm:min-h-[88vh] lg:min-h-[92vh] flex items-center justify-center overflow-hidden border-b border-slate-200/80 bg-slate-950">
        {/* Full-Width Artwork Canvas */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src={REHEMA_ARTWORKS[0].image}
            alt={REHEMA_ARTWORKS[0].title}
            className="w-full h-full object-cover object-center transform scale-100 transition-transform duration-1000"
          />
          {/* Subtle balanced dark vignette overlay: keeps artwork vivid and visible, while white typography has strong readability */}
          <div className="absolute inset-0 bg-slate-950/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-slate-950/50" />
        </div>

        {/* Centered Content Directly on the Image (No Container Box) */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center flex flex-col items-center">
          {/* Scripture Eyebrow (Unboxed, No Emoji) */}
          <p className="text-xs sm:text-sm tracking-[0.28em] uppercase font-semibold text-amber-300 font-sans mb-5 sm:mb-6 drop-shadow-sm animate-fade-up">
            {t('hero.scripture')}
          </p>

          {/* Centered Main Title */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5rem] 2xl:text-[5.5rem] font-semibold sm:font-bold text-white tracking-[-0.02em] leading-[1.06] drop-shadow-lg animate-fade-up">
            {language === 'fr' ? t('hero.titleLine1') : (settings.hero_title_line1 || t('hero.titleLine1'))}
            <br />
            <span className="font-semibold sm:font-bold text-amber-300">
              {language === 'fr' ? t('hero.titleLine2') : (settings.hero_title_line2 || t('hero.titleLine2'))}
            </span>
          </h1>

          {/* Centered Subtitle */}
          <p
            className="mt-6 text-base sm:text-lg md:text-xl text-slate-100 font-light leading-relaxed max-w-2xl mx-auto drop-shadow animate-fade-up"
            style={{ animationDelay: '0.12s' }}
          >
            {language === 'fr' ? t('hero.subtitle') : (settings.hero_subtitle || t('hero.subtitle'))}
          </p>

          {/* Centered CTAs */}
          <div
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto animate-fade-up"
            style={{ animationDelay: '0.24s' }}
          >
            <Link
              to="/gallery"
              className="btn-accent shadow-lg text-xs sm:text-sm px-8 py-3.5 text-center font-semibold uppercase tracking-wider"
            >
              <span>{t('hero.ctaGallery')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/our-story"
              className="px-8 py-3.5 rounded text-xs sm:text-sm font-semibold tracking-wider uppercase text-white border border-white/40 hover:bg-white/15 hover:border-white transition-all backdrop-blur-sm"
            >
              <span>{t('hero.ctaMission')}</span>
            </Link>
          </div>

          {/* Centered Trust Subtext */}
          <div className="mt-8 pt-6 border-t border-white/20 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-slate-200 font-sans">
            <span className="font-semibold text-white">{t('hero.trustEst')}</span>
            <span>•</span>
            <span>{t('hero.trustLocation')}</span>
            <span>•</span>
            <span className="font-medium text-amber-300">{t('hero.trustVocational')}</span>
          </div>
        </div>
      </section>

      {/* 2. ANNOUNCEMENT RIBBON */}
      <AnnouncementBar />

      {/* 3. SECTION 1: A MISSION BUILT ON LISTENING */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Image composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] rounded-none overflow-hidden shadow-xl bg-slate-100 border border-slate-200">
              <img
                src="/artworks/founder-portrait.jpg"
                alt="Mama Assumpta Kayiranga — Founder of Rehema Mission Rwanda"
                className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="font-serif text-xl italic text-amber-200">
                  {language === 'fr' ? '« L’écoute précède le conseil. »' : '“Listening comes before advice.”'}
                </p>
                <p className="text-xs uppercase tracking-wider text-slate-200 mt-1 font-medium">
                  {t('philosophy.founderName')}
                </p>
                <p className="text-[11px] text-amber-300/90 font-light">
                  {t('philosophy.founderSub')}
                </p>
              </div>
            </div>
            {/* Ambient accent square */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-amber-200/50 -z-10 hidden sm:block rounded" />
          </div>

          {/* Copy block */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="w-[2px] h-7 sm:h-8 bg-[#C5A059]" />
              <p className="eyebrow">{t('philosophy.eyebrow')}</p>
              <h2 className="section-title">
                {t('philosophy.title')}
              </h2>
            </div>
            <p className="text-base sm:text-lg text-slate-700 font-light leading-relaxed">
              {t('philosophy.p1')}
            </p>
            <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
              {t('philosophy.p2')}
            </p>

            <div className="pt-4">
              <Link
                to="/our-story"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase text-slate-900 hover:text-amber-700 transition-colors group"
              >
                <span>{t('philosophy.cta')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECTION 2: WHAT WE DO (4 PILLARS) */}
      <section className="relative py-16 md:py-24 bg-[#FAF7F2] border-y border-stone-200/60 overflow-hidden">
        {/* Luxury Rotating Rings SVG Theme (The Signature Gallery) in Background & Behind 4 Cards */}
        <RotatingRingsTheme
          className="w-[640px] h-[640px] sm:w-[780px] sm:h-[780px] lg:w-[940px] lg:h-[940px] translate-y-10 sm:translate-y-14"
          glowClassName="w-[520px] h-[360px] translate-y-10 sm:translate-y-14"
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <div className="w-[2px] h-7 sm:h-8 bg-[#C5A059] mx-auto mb-4" />
            <p className="eyebrow mb-2">{t('pillars.eyebrow')}</p>
            <h2 className="section-title">{t('pillars.title')}</h2>
            <p className="text-sm sm:text-base text-stone-600 font-light mt-3 leading-relaxed max-w-xl mx-auto">
              {t('pillars.subtitle')}
            </p>
          </div>

          {/* 4 Bespoke Color-Coded Sticker Cards Matching Reference Design */}
          <PillarStickerCards />
        </div>
      </section>

      {/* 4.5 SECTION 2.5: STORYTELLING DONATE & ART SUPPORT */}
      <StorytellingDonateSection />

      {/* 5. SECTION 3: THE ART GALLERY SHOWCASE */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-14">
          <div className="max-w-2xl space-y-3">
            <div className="w-[2px] h-7 sm:h-8 bg-[#C5A059]" />
            <p className="eyebrow">{t('gallery.eyebrow')}</p>
            <h2 className="section-title">
              {t('gallery.title')}
            </h2>
            <p className="text-base text-slate-600 font-light leading-relaxed pt-1">
              {t('gallery.description')}
            </p>
          </div>
          <Link to="/gallery" className="btn-primary text-xs flex-shrink-0 self-start md:self-auto rounded-xl">
            <span>{t('gallery.cta')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Artwork Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {featuredArtworks.map((art) => {
            const fav = isFavorite(art.id);
            return (
              <div
                key={art.id}
                className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden group hover:border-amber-400 hover:shadow-[0_12px_28px_rgba(0,0,0,0.07)] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                {/* Artwork Image */}
                <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden cursor-pointer" onClick={() => setSelectedArtwork(art)}>
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Favorite button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(art.id);
                    }}
                    className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white text-slate-800 shadow-sm transition-all"
                    aria-label="Save artwork"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        fav ? 'fill-rose-500 text-rose-500' : 'text-slate-600 hover:text-slate-950'
                      }`}
                    />
                  </button>
                </div>

                {/* Card Info */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <p className="text-[10px] tracking-[0.22em] uppercase font-semibold text-amber-700 font-sans mb-1">
                      {art.categoryLabel}
                    </p>
                    <h3
                      onClick={() => setSelectedArtwork(art)}
                      className="font-serif text-xl text-slate-950 font-medium group-hover:text-amber-700 transition-colors cursor-pointer line-clamp-1"
                    >
                      {art.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-light mt-1">
                      {art.artistIdentifier} · {art.year}
                    </p>
                  </div>

                  <div className="pt-1 border-t border-stone-100">
                    <Link
                      to="/gallery"
                      className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-sans text-xs font-semibold tracking-wider uppercase rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-sm hover:shadow-amber-500/20"
                    >
                      <span>{t('gallery.viewInGallery')}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. SECTION 4: WORK WITH US — CLEAR, WARM AMBER BANNER */}
      <section className="py-20 md:py-24 bg-gradient-to-r from-amber-100/70 via-yellow-50 to-amber-100/70 border-y border-amber-200/90 text-slate-900 relative overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-[2px] h-7 sm:h-8 bg-[#C5A059] mx-auto mb-4" />
          <p className="eyebrow mb-2">
            {t('collab.eyebrow')}
          </p>
          <h2 className="section-title mb-6">
            {t('collab.title')}
          </h2>
          <p className="text-base sm:text-lg text-slate-700 font-light leading-relaxed max-w-2xl mx-auto mb-10">
            {t('collab.description')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/partner" className="btn-accent shadow-md w-full sm:w-auto">
              <span>{t('collab.ctaConversation')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/visit" className="btn-outline w-full sm:w-auto bg-white/80">
              <Calendar className="w-4 h-4" />
              <span>{t('collab.ctaVisit')}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. CLOSING STATEMENT BANNER */}
      <section className="py-12 bg-amber-200/70 text-slate-900 text-center px-4 border-b border-amber-300">
        <p className="font-serif text-xl sm:text-2xl md:text-3xl font-light tracking-wide">
          {t('closing.motto')}
        </p>
      </section>

      {/* ARTWORK DETAIL MODAL */}
      {selectedArtwork && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="relative bg-white max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row border border-slate-200 rounded-sm">
            {/* Left: Artwork image */}
            <div className="md:w-1/2 bg-slate-100 flex flex-col justify-between p-6 sm:p-8 border-b md:border-b-0 md:border-r border-slate-200">
              <div className="flex-1 flex flex-col items-center justify-center">
                <img
                  src={selectedArtwork.image}
                  alt={selectedArtwork.title}
                  className="max-h-[58vh] w-auto object-contain shadow-lg rounded-sm"
                />
                <div className="mt-4 flex items-center gap-1.5 px-3 py-1 bg-amber-100/80 rounded-full border border-amber-200 text-amber-900 text-[11px] font-medium">
                  <Award className="w-3.5 h-3.5 text-amber-700" />
                  <span>{t('gal.certTag')}</span>
                </div>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-200 text-center space-y-1">
                <p className="text-xs text-slate-800 font-semibold">{selectedArtwork.dimensions}</p>
                <p className="text-[11px] text-slate-600 font-light">{selectedArtwork.medium}</p>
                <p className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded inline-block mt-1 font-medium border border-emerald-200">
                  {t('gal.proceedsTag')}
                </p>
              </div>
            </div>

            {/* Right: 5-Part Artwork Story & Inquire */}
            <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
                        {selectedArtwork.categoryLabel}
                      </span>
                      {selectedArtwork.emotionalTheme && (
                        <span className="text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                          {selectedArtwork.emotionalTheme}
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif text-2xl text-slate-950 font-medium mt-1">
                      {selectedArtwork.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {selectedArtwork.artistIdentifier} · {t('gal.createdIn')} {selectedArtwork.year}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedArtwork(null)}
                    className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-900 text-lg font-bold transition-colors"
                  >
                    ✕
                  </button>
                </div>

                {/* 5-Part Story */}
                <div className="mt-5 space-y-4 text-sm text-slate-700 font-light leading-relaxed">
                  {/* Part 1: The Hook */}
                  <div>
                    <p className="text-[11px] uppercase tracking-wider font-bold text-amber-800">
                      {t('gal.sec1Title')}
                    </p>
                    <p className="font-serif text-base italic font-normal text-slate-950 mt-1">
                      {selectedArtwork.hook}
                    </p>
                  </div>

                  {/* Part 2: What You See */}
                  <div>
                    <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
                      {t('gal.sec2Title')}
                    </p>
                    <p className="mt-1 text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {selectedArtwork.whatViewerSees}
                    </p>
                  </div>

                  {/* Part 3: Artist's Voice */}
                  <div>
                    <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
                      {t('gal.sec3Title')}
                    </p>
                    <div className="bg-amber-50 border-l-3 border-amber-500 p-3.5 my-1 text-xs italic text-slate-900 leading-relaxed rounded-r">
                      {selectedArtwork.artistPerspective}
                    </div>
                  </div>

                  {/* Part 4: Why This Artwork Belongs in Your Space */}
                  <div>
                    <p className="text-[11px] uppercase tracking-wider font-bold text-amber-800">
                      {t('gal.sec4Title')}
                    </p>
                    <p className="mt-1 text-xs sm:text-sm text-slate-800 font-normal leading-relaxed bg-slate-50 p-3 rounded border border-slate-100">
                      {selectedArtwork.whyBuy}
                    </p>
                  </div>

                  {/* Part 5: Craftsmanship & Provenance */}
                  <div>
                    <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
                      {t('gal.sec5Title')}
                    </p>
                    <div className="border border-slate-100 bg-slate-50 p-3 text-xs text-slate-600 space-y-1.5 mt-1 rounded">
                      <p><strong>{t('gal.medium')}</strong> {selectedArtwork.medium}</p>
                      <p><strong>{t('gal.support')}</strong> {selectedArtwork.craftDetails.support}</p>
                      <p><strong>{t('gal.technique')}</strong> {selectedArtwork.craftDetails.technique}</p>
                      <p><strong>{t('gal.framing')}</strong> {selectedArtwork.framed}</p>
                      <p><strong>{t('gal.signature')}</strong> {selectedArtwork.craftDetails.signature}</p>
                      <p><strong>{t('gal.location')}</strong> {selectedArtwork.craftDetails.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price & Action */}
              <div className="pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">{t('gal.priceLabel')}</p>
                    <p className="font-serif text-2xl font-medium text-slate-950">
                      {formatPrice(selectedArtwork.priceRwf)}
                    </p>
                    <p className="text-xs text-slate-500 font-medium">~${selectedArtwork.priceUsd} USD</p>
                  </div>
                  <span className="px-3 py-1 rounded bg-emerald-100 text-emerald-900 text-xs font-semibold uppercase tracking-wider border border-emerald-300">
                    {selectedArtwork.status === 'available' ? t('gal.availableForAcquisition') : selectedArtwork.status}
                  </span>
                </div>

                {/* Instant WhatsApp Action */}
                <div className="space-y-2.5">
                  <a
                    href={`https://wa.me/250798618524?text=${encodeURIComponent(
                      `Hello Kaze Collection, I am interested in acquiring the original artwork "${selectedArtwork.title}" (${formatPrice(selectedArtwork.priceRwf)} / ~$${selectedArtwork.priceUsd} USD). Please let me know availability and how to arrange viewing or delivery.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-4 rounded text-xs flex items-center justify-center gap-2 shadow transition-all duration-200 group"
                  >
                    <MessageCircle className="w-4 h-4 fill-white text-emerald-600 group-hover:scale-110 transition-transform" />
                    <span>{t('gal.inquireWhatsApp')}</span>
                  </a>

                  <Link
                    to={`/contact?reason=artwork&title=${encodeURIComponent(selectedArtwork.title)}&code=${selectedArtwork.id}`}
                    onClick={() => setSelectedArtwork(null)}
                    className="btn-outline w-full text-center text-xs py-2.5 justify-center"
                  >
                    <span>{t('gal.btnSubmitInquiry')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
