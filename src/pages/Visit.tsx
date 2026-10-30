import { useState } from 'react';
import {
  Clock,
  MapPin,
  Phone,
  Shield,
  ArrowRight,
  Check,
} from 'lucide-react';
import { useWebsiteSettings } from '@/lib/settings';
import { useStore } from '@/store/StoreContext';
import { TRANSLATIONS, type TranslationKey } from '@/lib/translations';
import Pushpin, { PIN_CARD_THEMES } from '@/components/Pushpin';

export default function Visit() {
  const settings = useWebsiteSettings();
  const { language } = useStore();
  const t = (key: TranslationKey, fallback?: string) =>
    TRANSLATIONS[language]?.[key] ?? TRANSLATIONS.en[key] ?? fallback ?? key;

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    artworksOfInterest: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        artworksOfInterest: '',
        notes: '',
      });
    }, 4000);
  };

  return (
    <div className="page-enter bg-slate-50 min-h-screen text-slate-900 pb-24">
      {/* Header — CLEAR & LIGHT */}
      <section className="bg-gradient-to-b from-amber-50/80 via-white to-slate-50 text-slate-900 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200 relative">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold tracking-[0.25em] uppercase text-amber-800 mb-3">
            {t('visit.badge')}
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-[4rem] font-bold text-slate-950 tracking-[-0.015em] leading-[1.12]">
            {t('visit.headline')}
          </h1>
          <p className="mt-6 text-base sm:text-lg text-slate-700 font-light max-w-2xl mx-auto leading-relaxed">
            {t('visit.subtitle')}
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Visit Guidance & Information */}
          <div className="lg:col-span-5 space-y-8">
            <div className="relative flex flex-col pt-4 group">
              <Pushpin id="visit-info-pin" theme={PIN_CARD_THEMES[5]} />
              <div className="bg-white rounded-[32px] p-3 sm:p-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-stone-200/80 transition-all duration-300 group-hover:shadow-[0_18px_44px_rgba(0,0,0,0.11)] group-hover:-translate-y-0.5 flex flex-col">
                <div
                  className="rounded-[22px] px-6 sm:px-7 pt-9 pb-8 flex flex-col"
                  style={{
                    backgroundColor: PIN_CARD_THEMES[5].bg,
                    border: `1.5px solid ${PIN_CARD_THEMES[5].border}`,
                  }}
                >
                  <h2 className="font-['Oswald',sans-serif] text-[22px] sm:text-[24px] font-bold uppercase tracking-wide text-stone-950 mb-2">
                    {t('visit.arrangementsTitle')}
                  </h2>
                  <div className="w-12 h-[2px] bg-amber-500 mb-4" />

                  <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs sm:text-sm text-stone-600 font-light leading-relaxed mb-6">
                    {t('visit.arrangementsDesc')}
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3.5 bg-white/90 p-4 rounded-2xl border border-orange-200/60 shadow-xs">
                      <div className="p-2.5 rounded-xl bg-orange-100 text-orange-900 flex-shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-stone-900 text-sm">{t('visit.locTitle')}</p>
                        <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs text-stone-600 mt-0.5">{settings.address || 'Kicukiro, Kigali, Rwanda'}</p>
                        <p className="font-['Plus_Jakarta_Sans',sans-serif] text-[11px] text-stone-400 mt-0.5">{t('visit.locSub')}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5 bg-white/90 p-4 rounded-2xl border border-orange-200/60 shadow-xs">
                      <div className="p-2.5 rounded-xl bg-orange-100 text-orange-900 flex-shrink-0">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-stone-900 text-sm">{t('visit.hoursTitle')}</p>
                        <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs text-stone-600 mt-0.5">{t('visit.hoursSub')}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5 bg-white/90 p-4 rounded-2xl border border-orange-200/60 shadow-xs">
                      <div className="p-2.5 rounded-xl bg-orange-100 text-orange-900 flex-shrink-0">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-stone-900 text-sm">{t('visit.directTitle')}</p>
                        <a
                          href={`tel:${settings.phone || '+250798618524'}`}
                          className="font-['Plus_Jakarta_Sans',sans-serif] text-xs text-stone-900 hover:text-amber-700 font-medium mt-0.5 block transition-colors"
                        >
                          {settings.phone || '+250 798 618 524'}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Respectful Atmosphere Card */}
            <div className="bg-gradient-to-r from-amber-50 via-yellow-50/70 to-amber-50 border border-amber-200/80 p-6 rounded-[24px] space-y-2.5 shadow-xs">
              <div className="flex items-center gap-2.5 text-amber-900 text-xs font-bold uppercase tracking-wider font-['Plus_Jakarta_Sans',sans-serif]">
                <Shield className="w-4 h-4 text-amber-700 flex-shrink-0" />
                <span>{t('visit.settingTitle')}</span>
              </div>
              <p className="text-xs text-stone-700 font-light leading-relaxed font-['Plus_Jakarta_Sans',sans-serif]">
                {t('visit.settingDesc')}
              </p>
            </div>
          </div>

          {/* Right: Appointment Request Form */}
          <div className="lg:col-span-7 relative flex flex-col pt-4 group">
            <Pushpin id="visit-form-pin" theme={PIN_CARD_THEMES[3]} />
            <div className="bg-white rounded-[36px] sm:rounded-[40px] p-3.5 sm:p-5 shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-stone-200/80 transition-all duration-300 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] group-hover:-translate-y-0.5 flex flex-col">
              <div
                className="rounded-[26px] sm:rounded-[30px] px-6 sm:px-9 pt-10 pb-9 flex flex-col flex-1"
                style={{
                  backgroundColor: PIN_CARD_THEMES[3].bg,
                  border: `1.5px solid ${PIN_CARD_THEMES[3].border}`,
                }}
              >
                <div className="mb-6">
                  <span className="inline-block text-[10px] font-bold uppercase tracking-[0.18em] px-3.5 py-1 rounded-full bg-teal-100/90 text-teal-900 border border-teal-300/70 mb-3 font-['Plus_Jakarta_Sans',sans-serif]">
                    Private Atelier Visit
                  </span>
                  <h2 className="font-['Oswald',sans-serif] text-2xl sm:text-3xl font-bold uppercase tracking-wide text-stone-950 mb-2 leading-tight">
                    {t('visit.formTitle')}
                  </h2>
                  <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                    {t('visit.formDesc')}
                  </p>
                </div>

                {submitted ? (
                  <div className="p-8 sm:p-10 bg-white/90 rounded-2xl border border-emerald-300 text-center space-y-4 shadow-sm animate-fade-in my-auto">
                    <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
                      <Check className="w-7 h-7" />
                    </div>
                    <h3 className="font-['Oswald',sans-serif] text-2xl font-bold uppercase tracking-wide text-emerald-950">
                      {t('visit.successTitle')}
                    </h3>
                    <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs sm:text-sm text-stone-700 font-light max-w-md mx-auto leading-relaxed">
                      {t('visit.successDesc')}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          date: '',
                          artworksOfInterest: '',
                          notes: '',
                        });
                      }}
                      className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-stone-900 underline underline-offset-4"
                    >
                      Request another appointment
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-stone-700 mb-2 font-['Plus_Jakarta_Sans',sans-serif]">
                          {t('visit.nameLabel')}
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder={t('visit.namePlaceholder')}
                          className="w-full px-4 py-3 sm:py-3.5 bg-white rounded-2xl border border-stone-200/90 text-stone-900 text-sm placeholder:text-stone-400 font-medium focus:outline-none focus:border-stone-900 focus:ring-4 focus:ring-stone-900/5 transition-all shadow-xs font-['Plus_Jakarta_Sans',sans-serif]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-stone-700 mb-2 font-['Plus_Jakarta_Sans',sans-serif]">
                          {t('visit.emailLabel')}
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@example.com"
                          className="w-full px-4 py-3 sm:py-3.5 bg-white rounded-2xl border border-stone-200/90 text-stone-900 text-sm placeholder:text-stone-400 font-medium focus:outline-none focus:border-stone-900 focus:ring-4 focus:ring-stone-900/5 transition-all shadow-xs font-['Plus_Jakarta_Sans',sans-serif]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-stone-700 mb-2 font-['Plus_Jakarta_Sans',sans-serif]">
                          {t('visit.phoneLabel')}
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+250 788 000 000"
                          className="w-full px-4 py-3 sm:py-3.5 bg-white rounded-2xl border border-stone-200/90 text-stone-900 text-sm placeholder:text-stone-400 font-medium focus:outline-none focus:border-stone-900 focus:ring-4 focus:ring-stone-900/5 transition-all shadow-xs font-['Plus_Jakarta_Sans',sans-serif]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-stone-700 mb-2 font-['Plus_Jakarta_Sans',sans-serif]">
                          {t('visit.dateLabel')}
                        </label>
                        <input
                          type="text"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          placeholder={t('visit.datePlaceholder')}
                          className="w-full px-4 py-3 sm:py-3.5 bg-white rounded-2xl border border-stone-200/90 text-stone-900 text-sm placeholder:text-stone-400 font-medium focus:outline-none focus:border-stone-900 focus:ring-4 focus:ring-stone-900/5 transition-all shadow-xs font-['Plus_Jakarta_Sans',sans-serif]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-stone-700 mb-2 font-['Plus_Jakarta_Sans',sans-serif]">
                        {t('visit.artworksLabel')}
                      </label>
                      <input
                        type="text"
                        value={formData.artworksOfInterest}
                        onChange={(e) => setFormData({ ...formData, artworksOfInterest: e.target.value })}
                        placeholder={t('visit.artworksPlaceholder')}
                        className="w-full px-4 py-3 sm:py-3.5 bg-white rounded-2xl border border-stone-200/90 text-stone-900 text-sm placeholder:text-stone-400 font-medium focus:outline-none focus:border-stone-900 focus:ring-4 focus:ring-stone-900/5 transition-all shadow-xs font-['Plus_Jakarta_Sans',sans-serif]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-stone-700 mb-2 font-['Plus_Jakarta_Sans',sans-serif]">
                        {t('visit.notesLabel')}
                      </label>
                      <textarea
                        rows={4}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder={t('visit.notesPlaceholder')}
                        className="w-full px-4 py-3.5 bg-white rounded-2xl border border-stone-200/90 text-stone-900 text-sm placeholder:text-stone-400 font-medium focus:outline-none focus:border-stone-900 focus:ring-4 focus:ring-stone-900/5 transition-all shadow-xs resize-none font-['Plus_Jakarta_Sans',sans-serif]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-3 py-4 px-8 rounded-full bg-stone-950 text-white font-['Plus_Jakarta_Sans',sans-serif] text-xs font-semibold tracking-wider uppercase hover:bg-stone-800 active:scale-[0.99] transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 group"
                    >
                      <span>{t('visit.submitBtn')}</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
