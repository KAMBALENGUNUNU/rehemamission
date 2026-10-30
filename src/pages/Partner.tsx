import { useState } from 'react';
import {
  ArrowRight,
  Check,
} from 'lucide-react';
import { useWebsiteSettings } from '@/lib/settings';
import { useStore } from '@/store/StoreContext';
import { TRANSLATIONS, type TranslationKey } from '@/lib/translations';
import Pushpin, { PIN_CARD_THEMES } from '@/components/Pushpin';

export default function Partner() {
  const settings = useWebsiteSettings();
  const { language } = useStore();
  const t = (key: TranslationKey, fallback?: string) =>
    TRANSLATIONS[language]?.[key] ?? TRANSLATIONS.en[key] ?? fallback ?? key;

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    role: '',
    email: '',
    phone: '',
    area: 'Youth awareness and prevention workshops',
    message: '',
  });

  const partnershipAreas = [
    {
      title: t('partner.area1Title'),
      description: t('partner.area1Desc'),
    },
    {
      title: t('partner.area2Title'),
      description: t('partner.area2Desc'),
    },
    {
      title: t('partner.area3Title'),
      description: t('partner.area3Desc'),
    },
    {
      title: t('partner.area4Title'),
      description: t('partner.area4Desc'),
    },
    {
      title: t('partner.area5Title'),
      description: t('partner.area5Desc'),
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        organization: '',
        role: '',
        email: '',
        phone: '',
        area: 'Youth awareness and prevention workshops',
        message: '',
      });
    }, 4500);
  };

  return (
    <div className="page-enter bg-slate-50 min-h-screen text-slate-900 pb-24">
      {/* Header — CLEAR & LIGHT */}
      <section className="bg-gradient-to-b from-amber-50/80 via-white to-slate-50 text-slate-900 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200 relative">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold tracking-[0.25em] uppercase text-amber-800 mb-3">
            {t('partner.badge')}
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-[4rem] font-bold text-slate-950 tracking-[-0.015em] leading-[1.12]">
            {t('partner.headline')}
          </h1>
          <p className="mt-6 text-base sm:text-lg text-slate-700 font-light max-w-2xl mx-auto leading-relaxed">
            {t('partner.subtitle')}
          </p>
        </div>
      </section>

      {/* 5 Partnership Areas Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="eyebrow mb-2">{t('partner.howWeCollab')}</p>
          <h2 className="section-title text-2xl sm:text-3xl md:text-4xl">
            {t('partner.areasTitle')}
          </h2>
          <div className="w-16 h-[2px] bg-amber-500 mx-auto mt-4" />
        </div>

        {/* 5 Partnership Areas Grid (Exact 3D Pushpin Card Design) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 pt-6">
          {partnershipAreas.map((area, idx) => {
            const theme = PIN_CARD_THEMES[idx % PIN_CARD_THEMES.length];
            return (
              <div key={area.title} className="relative flex flex-col pt-4 group">
                {/* 3D Glossy Pushpin with colored ambient glow and shadow, centered at top */}
                <Pushpin id={`partner-pin-${idx}`} theme={theme} />

                {/* Outer White Card Frame with rounded corners */}
                <div className="bg-white rounded-[32px] p-3 sm:p-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-stone-200/80 transition-all duration-300 group-hover:shadow-[0_18px_44px_rgba(0,0,0,0.11)] group-hover:-translate-y-1 flex flex-col flex-1">
                  {/* Inner Pastel Card */}
                  <div
                    className="rounded-[22px] px-6 sm:px-7 pt-9 pb-8 flex flex-col flex-1 min-h-[250px]"
                    style={{
                      backgroundColor: theme.bg,
                      border: `1.5px solid ${theme.border}`,
                    }}
                  >
                    {/* Title in Tall Condensed Bold Uppercase (Oswald Font) */}
                    <h3 className="font-['Oswald',sans-serif] text-[20px] sm:text-[22px] font-bold uppercase tracking-wide text-stone-950 leading-[1.18] mb-3">
                      {area.title}
                    </h3>

                    {/* Description in Clean Geometric Sans (Plus Jakarta Sans Font) */}
                    <p className="font-['Plus_Jakarta_Sans',sans-serif] text-[13px] sm:text-[13.5px] text-stone-700 font-normal leading-[1.65]">
                      {area.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Partnership Discussion Form */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="bg-white border border-slate-200 p-8 sm:p-12 shadow-sm rounded-sm">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-slate-950 mb-2">
              {t('partner.formTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
              {t('partner.formDesc')}
            </p>
          </div>

          {submitted ? (
            <div className="p-8 bg-emerald-50 border border-emerald-200 text-center space-y-3 rounded animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-medium text-emerald-950">
                {t('partner.successTitle')}
              </h3>
              <p className="text-xs sm:text-sm text-emerald-800 font-light max-w-md mx-auto">
                {t('partner.successDesc')}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                    {t('partner.nameLabel')}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t('partner.namePlaceholder')}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                    {t('partner.orgLabel')}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder={t('partner.orgPlaceholder')}
                    className="input-field"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                    {t('partner.emailLabel')}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="contact@organization.rw"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                    {t('partner.phoneLabel')}
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
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                  {t('partner.areaLabel')}
                </label>
                <select
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="input-field cursor-pointer"
                >
                  <option value="Youth awareness and prevention workshops">{t('partner.optArea1')}</option>
                  <option value="Family-strengthening activities">{t('partner.optArea2')}</option>
                  <option value="Art exhibition and gallery partnerships">{t('partner.optArea3')}</option>
                  <option value="Talent and skills opportunities">{t('partner.optArea4')}</option>
                  <option value="Professional guidance and social-work collaboration">{t('partner.optArea5')}</option>
                  <option value="Other collaborative proposal">{t('partner.optArea6')}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                  {t('partner.messageLabel')}
                </label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={t('partner.messagePlaceholder')}
                  className="input-field resize-none"
                />
              </div>

              <button type="submit" className="btn-accent w-full text-xs py-3.5 justify-center shadow">
                <span>{t('partner.submitBtn')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
