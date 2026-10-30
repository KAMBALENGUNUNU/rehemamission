import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { useWebsiteSettings } from '@/lib/settings';
import { useStore } from '@/store/StoreContext';
import { TRANSLATIONS, type TranslationKey } from '@/lib/translations';

export default function Contact() {
  const settings = useWebsiteSettings();
  const { language } = useStore();
  const t = (key: TranslationKey, fallback?: string) =>
    TRANSLATIONS[language]?.[key] ?? TRANSLATIONS.en[key] ?? fallback ?? key;

  const [searchParams] = useSearchParams();

  const [reason, setReason] = useState('support');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [preferredReply, setPreferredReply] = useState('email');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const urlReason = searchParams.get('reason');
    if (urlReason) {
      if (urlReason === 'artwork') setReason('artwork');
      else if (urlReason === 'visit') setReason('visit');
      else if (urlReason === 'partner') setReason('partner');
      else if (urlReason === 'support') setReason('support');
    }

    const title = searchParams.get('title');
    const code = searchParams.get('code');
    if (title && code) {
      setMessage(
        language === 'fr'
          ? `Bonjour, je souhaiterais me renseigner sur l'œuvre "${title}" (Référence : ${code}). Merci de m'indiquer sa disponibilité actuelle et les modalités d'acquisition.`
          : `Hello, I would like to inquire about the artwork "${title}" (Reference: ${code}). Please let me know its current availability and purchase details.`
      );
    }
  }, [searchParams, language]);

  const faqsEn = [
    {
      q: 'Is Rehema Mission Rwanda a rehabilitation center?',
      a: 'No. Rehema’s mission document explains that it is not a rehabilitation center. When specialized care is needed, the team can help individuals identify suitable detoxification or rehabilitation services and may provide follow-up support. Contact us to confirm what is currently available.',
    },
    {
      q: 'Can I buy an artwork online?',
      a: 'You can explore the works shown in the gallery and contact us to confirm current availability, price, and the purchase process. The team will explain payment and collection or delivery options.',
    },
    {
      q: 'Does every artwork tell a personal recovery story?',
      a: 'Not necessarily. Each artist chooses what to share. Some stories may focus on technique, imagination, relationships, hope, or the meaning of the image. The artwork should always be allowed to speak for itself.',
    },
    {
      q: 'Can I view an artwork in person?',
      a: 'Contact us before visiting. We will confirm the current viewing location and whether an appointment is available.',
    },
    {
      q: 'How can our organization collaborate with Rehema?',
      a: 'Send us a message describing your organization, the people you serve, and the type of collaboration you have in mind. We will discuss possibilities and current capacity.',
    },
  ];

  const faqsFr = [
    {
      q: 'Rehema Mission Rwanda est-elle un centre de réhabilitation ?',
      a: 'Non. Notre charte précise clairement que Rehema n’est pas un centre de désintoxication médicale. Lorsque des soins cliniques sont nécessaires, notre équipe oriente vers des structures médicales accréditées au Rwanda et assure un suivi émotionnel et relationnel continu.',
    },
    {
      q: 'Puis-je acquérir une œuvre d’art en ligne ?',
      a: 'Vous pouvez découvrir les toiles dans la galerie et nous contacter directement pour confirmer la disponibilité, le tarif et les modalités d’acquisition, de retrait ou d’expédition sécurisée.',
    },
    {
      q: 'Chaque œuvre raconte-t-elle nécessairement un parcours de rétablissement ?',
      a: 'Pas systématiquement. Chaque jeune artiste est libre de son sujet. Certaines toiles célèbrent la technique, la lumière, la nature rwandaise ou des réflexions intérieures. L’art parle de lui-même.',
    },
    {
      q: 'Est-il possible d’admirer les œuvres en personne à Kigali ?',
      a: 'Absolument. Nous vous invitons à prendre rendez-vous avant votre visite afin que l’atelier de Kicukiro vous réserve le meilleur accueil et prépare les toiles souhaitées.',
    },
    {
      q: 'Comment notre institution peut-elle s’associer à Rehema ?',
      a: 'Transmettez-nous un message détaillant votre structure, votre public et la nature de la collaboration envisagée. Nous échangerons avec joie sur les perspectives conjointes.',
    },
  ];

  const faqs = language === 'fr' ? faqsFr : (settings.faq || faqsEn);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 4500);
  };

  return (
    <div className="page-enter bg-slate-50 min-h-screen text-slate-900 pb-24">
      {/* Header — CLEAR & LIGHT */}
      <section className="bg-gradient-to-b from-amber-50/80 via-white to-slate-50 text-slate-900 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200 relative">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold tracking-[0.25em] uppercase text-amber-800 mb-3">
            {t('contact.badge')}
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-slate-950 tracking-tight leading-tight">
            {t('contact.headline')}
          </h1>
          <p className="mt-6 text-base sm:text-lg text-slate-700 font-light max-w-2xl mx-auto leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      {/* Main Grid: Contact Cards & Form */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-slate-200 p-8 shadow-sm space-y-6 rounded-sm">
              <h2 className="font-serif text-2xl text-slate-950 font-medium">
                {t('contact.directContact')}
              </h2>
              <div className="w-12 h-[2px] bg-amber-500" />

              <div className="space-y-5 text-sm text-slate-700">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-amber-100 text-amber-800 flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{t('contact.locationTitle')}</p>
                    <p className="text-xs text-slate-600 mt-0.5">{settings.address || 'Kicukiro, Kigali, Rwanda'}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{t('contact.locationSub')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-amber-100 text-amber-800 flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{t('contact.phoneTitle')}</p>
                    <a
                      href={`tel:${settings.phone || '+250798618524'}`}
                      className="text-xs text-slate-900 hover:text-amber-700 font-medium mt-0.5 block"
                    >
                      {settings.phone || '+250 798 618 524'}
                    </a>
                    <p className="text-[11px] text-slate-400 mt-0.5">{t('contact.phoneSub')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-amber-100 text-amber-800 flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{t('contact.emailTitle')}</p>
                    <a
                      href={`mailto:${settings.contact_email || 'assumptakayiranga05@gmail.com'}`}
                      className="text-xs text-slate-900 hover:text-amber-700 font-medium mt-0.5 block break-all"
                    >
                      {settings.contact_email || 'assumptakayiranga05@gmail.com'}
                    </a>
                    <p className="text-[11px] text-slate-400 mt-0.5">{t('contact.emailSub')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Privacy & Confidentiality Guarantee — CLEAR LIGHT WARM */}
            <div className="bg-gradient-to-r from-amber-50 via-yellow-50/70 to-amber-50 border border-amber-200 p-6 rounded-sm space-y-2 shadow-sm">
              <div className="flex items-center gap-2 text-amber-800 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>{t('contact.confidentialityTitle')}</span>
              </div>
              <p className="text-xs text-slate-700 font-light leading-relaxed">
                {t('contact.confidentialityDesc')}
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white border border-slate-200 p-8 sm:p-10 shadow-sm rounded-sm">
            <h2 className="font-serif text-2xl text-slate-950 font-medium mb-2">
              {t('contact.formTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-light mb-8 leading-relaxed">
              {t('contact.formSubtitle')}
            </p>

            {submitted ? (
              <div className="p-8 bg-emerald-50 border border-emerald-200 text-center space-y-3 rounded animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-medium text-emerald-950">
                  {t('contact.successTitle')}
                </h3>
                <p className="text-xs sm:text-sm text-emerald-800 font-light max-w-md mx-auto">
                  {t('contact.successDesc')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                    {t('contact.reasonLabel')}
                  </label>
                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="input-field cursor-pointer font-medium"
                  >
                    <option value="support">{t('contact.optSupport')}</option>
                    <option value="artwork">{t('contact.optArtwork')}</option>
                    <option value="visit">{t('contact.optVisit')}</option>
                    <option value="partner">{t('contact.optPartner')}</option>
                    <option value="other">{t('contact.optOther')}</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                      {t('contact.nameLabel')}
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t('contact.namePlaceholder')}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                      {t('contact.emailLabel')}
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                      {t('contact.phoneLabel')}
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+250 788 000 000"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                      {t('contact.replyMethodLabel')}
                    </label>
                    <select
                      value={preferredReply}
                      onChange={(e) => setPreferredReply(e.target.value)}
                      className="input-field cursor-pointer"
                    >
                      <option value="email">{t('contact.replyEmail')}</option>
                      <option value="phone">{t('contact.replyPhone')}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                    {t('contact.messageLabel')}
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t('contact.messagePlaceholder')}
                    className="input-field resize-none"
                  />
                </div>

                <div className="text-[11px] text-slate-500 leading-relaxed pt-1">
                  {t('contact.disclaimer')}
                </div>

                <button type="submit" className="btn-accent w-full text-xs py-3.5 justify-center shadow">
                  <span>{t('contact.submitBtn')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center mb-12">
          <p className="eyebrow mb-2">{t('contact.faqEyebrow')}</p>
          <h2 className="section-title text-2xl sm:text-3xl md:text-4xl">
            {t('contact.faqTitle')}
          </h2>
          <div className="w-16 h-[2px] bg-amber-500 mx-auto mt-4" />
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={faq.q}
                className="bg-white border border-slate-200 overflow-hidden transition-all duration-200 rounded-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-medium text-slate-900 hover:text-amber-700 transition-colors"
                >
                  <span className="font-serif text-lg leading-snug">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 text-slate-400 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-amber-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-slate-600 font-light leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
