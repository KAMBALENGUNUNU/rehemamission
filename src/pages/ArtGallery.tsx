import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  ArrowRight,
  ShieldCheck,
  Check,
  Sparkles,
  MessageCircle,
  Phone,
  Award,
  ArrowLeft,
} from 'lucide-react';
import { REHEMA_ARTWORKS, type Artwork } from '@/lib/artworks';
import { useStore } from '@/store/StoreContext';
import { formatPrice } from '@/lib/utils';
import { TRANSLATIONS, type TranslationKey } from '@/lib/translations';
import KazeLogo from '@/components/logos/KazeLogo';

export default function ArtGallery() {
  const { toggleFavorite, isFavorite, language } = useStore();
  const t = (key: TranslationKey, fallback?: string) =>
    TRANSLATIONS[language]?.[key] ?? TRANSLATIONS.en[key] ?? fallback ?? key;

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [inquirySent, setInquirySent] = useState(false);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');

  const filteredArtworks =
    activeCategory === 'all'
      ? REHEMA_ARTWORKS
      : REHEMA_ARTWORKS.filter((art) => art.category === activeCategory);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setSelectedArtwork(null);
      setInquiryName('');
      setInquiryEmail('');
      setInquiryMessage('');
    }, 3500);
  };

  return (
    <div className="page-enter bg-[#07090E] min-h-screen text-stone-100 pb-28 relative overflow-hidden">
      {/* Background wireframe atmospheric grid texture */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <img
          src="/footer-bg.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-[650px] object-cover object-center opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07090E]/60 via-[#07090E]/90 to-[#07090E]" />
      </div>

      {/* Ambient warm atelier studio spotlights */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[750px] h-[450px] bg-gradient-radial from-amber-500/15 via-amber-700/5 to-transparent rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-gradient-radial from-amber-600/10 via-transparent to-transparent rounded-full blur-3xl pointer-events-none z-0" />

      {/* 1. Gallery Header — KAZE COLLECTION BESPOKE ATELIER DESIGN */}
      <section className="relative z-10 pt-12 sm:pt-16 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          {/* Official Kaze Collection Atelier Logo */}
          <KazeLogo variant="dark" size="lg" className="justify-center mb-6" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4 border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{t('gal.badge')}</span>
          </div>

          {/* Headline in Classical Luxury Serif */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-bold tracking-[-0.015em] leading-[1.12]">
            {t('gal.headline')}
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg text-stone-300 font-light max-w-2xl mx-auto leading-relaxed">
            {t('gal.subtitle')}
          </p>

          {/* Direct Bridge Pill communicating connection to Rehema Mission Rwanda */}
          <div className="mt-7">
            <Link
              to="/our-story"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/15 hover:border-amber-400/50 hover:bg-white/10 text-amber-300 hover:text-white text-xs font-sans tracking-wide transition-all group"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition-transform" />
              <span>
                {language === 'fr'
                  ? 'Une initiative d’artisanat de Rehema Mission Rwanda · Découvrir l’Histoire'
                  : 'An initiative of Rehema Mission Rwanda · Learn the Story & Mission'}
              </span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-amber-400" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. The Sales Principle Banner — Museum Plaque Style */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="bg-[#0E121B] border border-amber-500/30 shadow-[0_8px_30px_rgba(0,0,0,0.6)] p-5 sm:p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-md">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-white">
                {t('gal.principleTitle')}
              </p>
              <p className="text-xs text-stone-300 font-light mt-0.5">
                {t('gal.principleDesc')}
              </p>
            </div>
          </div>
          <Link
            to="/visit"
            className="text-xs font-semibold text-amber-400 hover:text-amber-300 uppercase tracking-wider inline-flex items-center gap-1.5 flex-shrink-0 group"
          >
            <span>{t('gal.principleLink')}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* 3. Category Filter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 relative z-10">
        <div className="flex items-center justify-between border-b border-white/10 pb-5 flex-wrap gap-4">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {[
              { id: 'all', label: t('gal.catAll') },
              { id: 'paintings', label: t('gal.catPaintings') },
              { id: 'drawings', label: t('gal.catDrawings') },
              { id: 'mixed-media', label: t('gal.catMixed') },
            ].map((tab) => {
              const active = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${
                    active
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                      : 'bg-[#0D1017] border border-white/10 text-stone-300 hover:border-amber-500/50 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="text-xs text-stone-400 font-light">
            {t('gal.showing')} <strong className="text-white font-semibold">{filteredArtworks.length}</strong> {t('gal.creations')}
          </div>
        </div>

        {/* 4. Artworks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 pt-10">
          {filteredArtworks.map((art) => {
            const fav = isFavorite(art.id);
            return (
              <div
                key={art.id}
                className="bg-[#0B0E16] border border-white/10 hover:border-amber-500/80 hover:shadow-[0_12px_40px_rgba(245,179,36,0.12)] transition-all duration-300 flex flex-col justify-between group rounded-2xl overflow-hidden hover:-translate-y-1"
              >
                {/* Image Container */}
                <div
                  className="relative aspect-[3/4] bg-slate-950 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedArtwork(art)}
                >
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Status Badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`text-[10px] tracking-wider uppercase font-semibold px-2.5 py-1 rounded-full shadow-sm backdrop-blur-sm border ${
                        art.status === 'available'
                          ? 'bg-emerald-600/90 text-white border-emerald-400/40'
                          : art.status === 'showroom'
                          ? 'bg-amber-500/90 text-slate-950 border-amber-300/40'
                          : 'bg-stone-800/90 text-stone-300 border-white/10'
                      }`}
                    >
                      {art.status === 'available'
                        ? t('gal.statusAvailable')
                        : art.status === 'showroom'
                        ? t('gal.statusShowroom')
                        : t('gal.statusReserved')}
                    </span>
                  </div>

                  {/* Save to Favorites */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(art.id);
                    }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-950/80 border border-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-slate-950 text-white shadow-sm transition-all"
                    aria-label="Save artwork"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        fav ? 'fill-rose-500 text-rose-500' : 'text-stone-300 hover:text-white'
                      }`}
                    />
                  </button>

                  {/* Hover Overlay with Yellow CTA */}
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-5 py-2.5 bg-amber-500 text-slate-950 text-xs font-semibold tracking-[0.16em] uppercase rounded-full shadow-lg shadow-amber-500/30">
                      {t('gal.readStory')}
                    </span>
                  </div>
                </div>

                {/* Info Container */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                      <p className="text-[10px] tracking-[0.2em] uppercase font-semibold text-amber-400">
                        {art.categoryLabel}
                      </p>
                      {art.emotionalTheme && (
                        <span className="text-[9px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                          {art.emotionalTheme}
                        </span>
                      )}
                    </div>
                    <h3
                      onClick={() => setSelectedArtwork(art)}
                      className="font-serif text-lg text-white font-medium group-hover:text-amber-400 transition-colors cursor-pointer"
                    >
                      {art.title}
                    </h3>
                    <p className="text-xs text-stone-400 font-light mt-0.5">
                      {art.artistIdentifier} · {art.dimensions}
                    </p>
                    <p className="text-xs text-stone-300 line-clamp-2 mt-2.5 font-light leading-relaxed">
                      {art.hook}
                    </p>
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-serif font-medium text-amber-300">
                        {formatPrice(art.priceRwf)}
                      </p>
                      <p className="text-[10px] text-stone-400">~${art.priceUsd} USD</p>
                    </div>
                    <button
                      onClick={() => setSelectedArtwork(art)}
                      className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-[11px] font-semibold uppercase tracking-wider rounded-full shadow-sm transition-all"
                    >
                      {t('gal.viewStory')}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. ARTWORK LIGHTBOX / 5-PART STORY MODAL */}
      {selectedArtwork && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative bg-[#0C1018] max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row border border-white/15 rounded-2xl">
            {/* Left: Artwork photography view */}
            <div className="md:w-1/2 bg-[#06080D] flex flex-col justify-between p-6 sm:p-8 border-b md:border-b-0 md:border-r border-white/10">
              <div className="flex-1 flex flex-col items-center justify-center">
                <img
                  src={selectedArtwork.image}
                  alt={selectedArtwork.title}
                  className="max-h-[58vh] w-auto object-contain shadow-2xl rounded-lg"
                />
                <div className="mt-4 flex items-center gap-1.5 px-3 py-1 bg-amber-500/15 rounded-full border border-amber-500/30 text-amber-300 text-[11px] font-medium">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t('gal.certTag')}</span>
                </div>
              </div>
              <div className="mt-5 pt-4 border-t border-white/10 text-center space-y-1">
                <p className="text-xs text-stone-200 font-semibold">{selectedArtwork.dimensions}</p>
                <p className="text-[11px] text-stone-400 font-light">{selectedArtwork.medium}</p>
                <p className="text-[10px] text-emerald-300 bg-emerald-500/15 px-2.5 py-0.5 rounded-full inline-block mt-1 font-medium border border-emerald-500/30">
                  {t('gal.proceedsTag')}
                </p>
              </div>
            </div>

            {/* Right: 5-Part Story & Purchase Flow */}
            <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-start justify-between border-b border-white/10 pb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                        {selectedArtwork.categoryLabel}
                      </span>
                      {selectedArtwork.emotionalTheme && (
                        <span className="text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                          {selectedArtwork.emotionalTheme}
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif text-2xl text-white font-medium mt-1">
                      {selectedArtwork.title}
                    </h3>
                    <p className="text-xs text-stone-400 mt-0.5">
                      {selectedArtwork.artistIdentifier} · {t('gal.createdIn')} {selectedArtwork.year}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedArtwork(null);
                      setInquirySent(false);
                    }}
                    className="p-1.5 rounded-full hover:bg-white/10 text-stone-400 hover:text-white text-lg font-bold transition-colors"
                  >
                    ✕
                  </button>
                </div>

                {/* 5-Part Story Breakdown */}
                <div className="mt-5 space-y-4 text-sm text-stone-200 font-light leading-relaxed">
                  {/* Part 1: The Hook */}
                  <div>
                    <p className="text-[11px] uppercase tracking-wider font-bold text-amber-400">
                      {t('gal.sec1Title')}
                    </p>
                    <p className="font-serif text-base italic font-normal text-white mt-1">
                      {selectedArtwork.hook}
                    </p>
                  </div>

                  {/* Part 2: What You See */}
                  <div>
                    <p className="text-[11px] uppercase tracking-wider font-bold text-stone-400">
                      {t('gal.sec2Title')}
                    </p>
                    <p className="mt-1 text-xs sm:text-sm text-stone-300 leading-relaxed">
                      {selectedArtwork.whatViewerSees}
                    </p>
                  </div>

                  {/* Part 3: Artist's Voice */}
                  <div>
                    <p className="text-[11px] uppercase tracking-wider font-bold text-stone-400">
                      {t('gal.sec3Title')}
                    </p>
                    <div className="bg-amber-500/10 border-l-2 border-amber-500 p-3.5 my-1 text-xs italic text-amber-200 leading-relaxed rounded-r">
                      {selectedArtwork.artistPerspective}
                    </div>
                  </div>

                  {/* Part 4: Why This Artwork Belongs in Your Space */}
                  <div>
                    <p className="text-[11px] uppercase tracking-wider font-bold text-amber-400">
                      {t('gal.sec4Title')}
                    </p>
                    <p className="mt-1 text-xs sm:text-sm text-stone-200 font-normal leading-relaxed bg-[#0F1420] p-3 rounded-lg border border-white/10">
                      {selectedArtwork.whyBuy}
                    </p>
                  </div>

                  {/* Part 5: Craftsmanship & Provenance */}
                  <div>
                    <p className="text-[11px] uppercase tracking-wider font-bold text-stone-400">
                      {t('gal.sec5Title')}
                    </p>
                    <div className="border border-white/10 bg-[#0F1420] p-3 text-xs text-stone-300 space-y-1.5 mt-1 rounded-lg">
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

              {/* Purchase Inquiry Flow */}
              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-stone-400 font-semibold">{t('gal.priceLabel')}</p>
                    <p className="font-serif text-2xl font-medium text-amber-300">
                      {formatPrice(selectedArtwork.priceRwf)}
                    </p>
                    <p className="text-xs text-stone-400 font-medium">~${selectedArtwork.priceUsd} USD</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-semibold uppercase tracking-wider border border-emerald-500/30">
                    {selectedArtwork.status === 'available' ? t('gal.availableForAcquisition') : selectedArtwork.status}
                  </span>
                </div>

                {/* Instant WhatsApp Direct Reservation */}
                <div className="space-y-3">
                  <a
                    href={`https://wa.me/250798618524?text=${encodeURIComponent(
                      `Hello Kaze Collection, I am interested in acquiring the original artwork "${selectedArtwork.title}" (${formatPrice(selectedArtwork.priceRwf)} / ~$${selectedArtwork.priceUsd} USD). Please let me know availability and how to arrange viewing or delivery.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow transition-all duration-200 group"
                  >
                    <MessageCircle className="w-4 h-4 fill-white text-emerald-600 group-hover:scale-110 transition-transform" />
                    <span>{t('gal.inquireWhatsApp')}</span>
                  </a>

                  {inquirySent ? (
                    <div className="p-4 bg-emerald-500/15 border border-emerald-500/30 text-emerald-200 rounded-xl text-xs text-center space-y-1 animate-fade-in">
                      <Check className="w-5 h-5 mx-auto text-emerald-400" />
                      <p className="font-semibold">{t('gal.inquirySuccessTitle')}</p>
                      <p className="text-emerald-300 font-light">
                        {t('gal.inquirySuccessDesc')}
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleInquirySubmit} className="space-y-2.5 pt-2 border-t border-white/10">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-300">
                        {t('gal.writtenInquiryTitle')}
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          required
                          placeholder={t('gal.placeholderName')}
                          value={inquiryName}
                          onChange={(e) => setInquiryName(e.target.value)}
                          className="w-full px-3 py-2 bg-[#0E121C] border border-white/15 text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 text-xs rounded-lg transition-colors"
                        />
                        <input
                          type="email"
                          required
                          placeholder={t('gal.placeholderEmail')}
                          value={inquiryEmail}
                          onChange={(e) => setInquiryEmail(e.target.value)}
                          className="w-full px-3 py-2 bg-[#0E121C] border border-white/15 text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 text-xs rounded-lg transition-colors"
                        />
                      </div>
                      <textarea
                        rows={2}
                        placeholder={t('gal.placeholderQuestions')}
                        value={inquiryMessage}
                        onChange={(e) => setInquiryMessage(e.target.value)}
                        className="w-full px-3 py-2 bg-[#0E121C] border border-white/15 text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 text-xs rounded-lg transition-colors resize-none"
                      />
                      <button type="submit" className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold uppercase tracking-wider rounded-xl shadow transition-all flex items-center justify-center gap-1.5">
                        <span>{t('gal.btnSubmitInquiry')}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
