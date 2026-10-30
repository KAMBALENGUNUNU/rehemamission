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
    <div className="page-enter bg-slate-50 min-h-screen text-slate-900 pb-24">
      {/* Gallery Header — KAZE COLLECTION BRANDED */}
      <section className="bg-gradient-to-b from-amber-50/80 via-white to-slate-50 text-slate-900 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
          {/* Official Kaze Collection Logo */}
          <KazeLogo size="lg" className="justify-center mb-6" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-wider mb-4 border border-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>{t('gal.badge')}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-slate-950 tracking-tight leading-tight">
            {t('gal.headline')}
          </h1>
          <p className="mt-6 text-base sm:text-lg text-slate-700 font-light max-w-2xl mx-auto leading-relaxed">
            {t('gal.subtitle')}
          </p>
        </div>
      </section>

      {/* The Sales Principle Banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="bg-white border border-slate-200 shadow-sm p-5 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-full bg-amber-100 text-amber-800 flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-950">
                {t('gal.principleTitle')}
              </p>
              <p className="text-xs text-slate-600 font-light">
                {t('gal.principleDesc')}
              </p>
            </div>
          </div>
          <Link
            to="/visit"
            className="text-xs font-semibold text-slate-900 hover:text-amber-700 uppercase tracking-wider inline-flex items-center gap-1.5 flex-shrink-0"
          >
            <span>{t('gal.principleLink')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* Category Filter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 flex-wrap gap-4">
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
                      ? 'bg-slate-900 text-white shadow'
                      : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-400 hover:text-slate-950'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="text-xs text-slate-500 font-light">
            {t('gal.showing')} <strong className="text-slate-950 font-semibold">{filteredArtworks.length}</strong> {t('gal.creations')}
          </div>
        </div>

        {/* Artworks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 pt-10">
          {filteredArtworks.map((art) => {
            const fav = isFavorite(art.id);
            return (
              <div
                key={art.id}
                className="bg-white border border-slate-200 hover:border-amber-500 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group rounded-sm"
              >
                {/* Image Container */}
                <div
                  className="relative aspect-[3/4] bg-slate-100 overflow-hidden cursor-pointer"
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
                      className={`text-[10px] tracking-wider uppercase font-semibold px-2.5 py-1 rounded shadow-sm ${
                        art.status === 'available'
                          ? 'bg-emerald-600 text-white'
                          : art.status === 'showroom'
                          ? 'bg-amber-600 text-white'
                          : 'bg-slate-700 text-white'
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
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center hover:bg-white text-slate-800 shadow-sm transition-all"
                    aria-label="Save artwork"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        fav ? 'fill-rose-500 text-rose-500' : 'text-slate-600 hover:text-slate-950'
                      }`}
                    />
                  </button>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="btn-accent text-[11px] py-2 px-4 shadow">
                      {t('gal.readStory')}
                    </span>
                  </div>
                </div>

                {/* Info Container */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                      <p className="text-[10px] tracking-[0.2em] uppercase font-semibold text-amber-700">
                        {art.categoryLabel}
                      </p>
                      {art.emotionalTheme && (
                        <span className="text-[9px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
                          {art.emotionalTheme}
                        </span>
                      )}
                    </div>
                    <h3
                      onClick={() => setSelectedArtwork(art)}
                      className="font-serif text-lg text-slate-950 font-medium group-hover:text-amber-700 transition-colors cursor-pointer"
                    >
                      {art.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-light mt-0.5">
                      {art.artistIdentifier} · {art.dimensions}
                    </p>
                    <p className="text-xs text-slate-600 line-clamp-2 mt-2.5 font-light leading-relaxed">
                      {art.hook}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-serif font-medium text-slate-950">
                        {formatPrice(art.priceRwf)}
                      </p>
                      <p className="text-[10px] text-slate-400">~${art.priceUsd} USD</p>
                    </div>
                    <button
                      onClick={() => setSelectedArtwork(art)}
                      className="btn-outline text-[11px] py-1.5 px-3 uppercase tracking-wider"
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

      {/* ARTWORK LIGHTBOX / 5-PART STORY MODAL */}
      {selectedArtwork && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="relative bg-white max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row border border-slate-200 rounded-sm">
            {/* Left: Artwork photography view */}
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

            {/* Right: 5-Part Story & Purchase Flow */}
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
                    onClick={() => {
                      setSelectedArtwork(null);
                      setInquirySent(false);
                    }}
                    className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-900 text-lg font-bold transition-colors"
                  >
                    ✕
                  </button>
                </div>

                {/* 5-Part Story Breakdown */}
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

              {/* Purchase Inquiry Flow */}
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

                {/* Instant WhatsApp Direct Reservation */}
                <div className="space-y-3">
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

                  {inquirySent ? (
                    <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded text-xs text-center space-y-1 animate-fade-in">
                      <Check className="w-5 h-5 mx-auto text-emerald-600" />
                      <p className="font-semibold">{t('gal.inquirySuccessTitle')}</p>
                      <p className="text-emerald-700 font-light">
                        {t('gal.inquirySuccessDesc')}
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleInquirySubmit} className="space-y-2.5 pt-2 border-t border-slate-100">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-700">
                        {t('gal.writtenInquiryTitle')}
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          required
                          placeholder={t('gal.placeholderName')}
                          value={inquiryName}
                          onChange={(e) => setInquiryName(e.target.value)}
                          className="input-field text-xs py-2 px-3"
                        />
                        <input
                          type="email"
                          required
                          placeholder={t('gal.placeholderEmail')}
                          value={inquiryEmail}
                          onChange={(e) => setInquiryEmail(e.target.value)}
                          className="input-field text-xs py-2 px-3"
                        />
                      </div>
                      <textarea
                        rows={2}
                        placeholder={t('gal.placeholderQuestions')}
                        value={inquiryMessage}
                        onChange={(e) => setInquiryMessage(e.target.value)}
                        className="input-field text-xs py-2 px-3 resize-none"
                      />
                      <button type="submit" className="btn-outline w-full text-xs py-2.5 justify-center">
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
