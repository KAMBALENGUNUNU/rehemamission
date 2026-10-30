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
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-slate-950 tracking-tight leading-tight">
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
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-slate-200 p-8 shadow-sm space-y-6 rounded-sm">
              <h2 className="font-serif text-2xl text-slate-950 font-medium">
                {t('visit.arrangementsTitle')}
              </h2>
              <div className="w-12 h-[2px] bg-amber-500" />

              <p className="text-sm text-slate-600 font-light leading-relaxed">
                {t('visit.arrangementsDesc')}
              </p>

              <div className="space-y-4 pt-2 text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-slate-900">{t('visit.locTitle')}</p>
                    <p className="text-xs text-slate-600">{settings.address || 'Kicukiro, Kigali, Rwanda'}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{t('visit.locSub')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-slate-900">{t('visit.hoursTitle')}</p>
                    <p className="text-xs text-slate-600">{t('visit.hoursSub')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-slate-900">{t('visit.directTitle')}</p>
                    <p className="text-xs text-slate-600">{settings.phone || '+250 798 618 524'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Respectful Atmosphere Card — CLEAR LIGHT WARM */}
            <div className="bg-gradient-to-r from-amber-50 via-yellow-50/70 to-amber-50 border border-amber-200 p-6 rounded-sm space-y-3 shadow-sm">
              <div className="flex items-center gap-2 text-amber-800 text-xs tracking-wider uppercase font-bold">
                <Shield className="w-4 h-4 text-amber-600" />
                <span>{t('visit.settingTitle')}</span>
              </div>
              <p className="text-xs text-slate-700 font-light leading-relaxed">
                {t('visit.settingDesc')}
              </p>
            </div>
          </div>

          {/* Right: Appointment Request Form */}
          <div className="lg:col-span-7 bg-white border border-slate-200 p-8 sm:p-10 shadow-sm rounded-sm">
            <h2 className="font-serif text-2xl text-slate-950 font-medium mb-2">
              {t('visit.formTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-light mb-8 leading-relaxed">
              {t('visit.formDesc')}
            </p>

            {submitted ? (
              <div className="p-8 bg-emerald-50 border border-emerald-200 text-center space-y-3 rounded animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-medium text-emerald-950">
                  {t('visit.successTitle')}
                </h3>
                <p className="text-xs sm:text-sm text-emerald-800 font-light max-w-md mx-auto">
                  {t('visit.successDesc')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                      {t('visit.nameLabel')}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t('visit.namePlaceholder')}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                      {t('visit.emailLabel')}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                      {t('visit.phoneLabel')}
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+250 788 000 000"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                      {t('visit.dateLabel')}
                    </label>
                    <input
                      type="text"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      placeholder={t('visit.datePlaceholder')}
                      className="input-field"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                    {t('visit.artworksLabel')}
                  </label>
                  <input
                    type="text"
                    value={formData.artworksOfInterest}
                    onChange={(e) => setFormData({ ...formData, artworksOfInterest: e.target.value })}
                    placeholder={t('visit.artworksPlaceholder')}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                    {t('visit.notesLabel')}
                  </label>
                  <textarea
                    rows={4}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder={t('visit.notesPlaceholder')}
                    className="input-field resize-none"
                  />
                </div>

                <button type="submit" className="btn-accent w-full text-xs py-3.5 justify-center shadow">
                  <span>{t('visit.submitBtn')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
