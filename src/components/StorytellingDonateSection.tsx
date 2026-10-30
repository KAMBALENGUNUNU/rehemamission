import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
  X,
  CreditCard,
  Smartphone,
  Palette,
  Users,
  Compass,
  Gift,
} from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { REHEMA_ARTWORKS } from '@/lib/artworks';
import { formatPrice } from '@/lib/utils';

export default function StorytellingDonateSection() {
  const { language } = useStore();
  const navigate = useNavigate();

  // Highlighted artwork for Path 1 (Kaze Collections)
  const featuredArt = REHEMA_ARTWORKS[0];

  // Donation state for Path 2 (Direct Financial Gift)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [currency, setCurrency] = useState<'USD' | 'RWF'>('USD');
  const [paymentMethod, setPaymentMethod] = useState<'momo' | 'card' | 'paypal'>('momo');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const presets = [
    {
      usd: 25,
      rwf: 30000,
      impactEn: '1 week of clinical liaison & supportive counseling',
      impactFr: '1 semaine de suivi clinique et écoute bienveillante',
    },
    {
      usd: 50,
      rwf: 65000,
      impactEn: '1 month of youth community dialogue circle sessions',
      impactFr: '1 mois de cercles de dialogue jeunesse à Kigali',
    },
    {
      usd: 100,
      rwf: 130000,
      impactEn: 'Studio canvas, fine pigments & vocational craft materials',
      impactFr: 'Toiles, pigments et matériel de haute création pour l’atelier',
    },
    {
      usd: 250,
      rwf: 325000,
      impactEn: 'Comprehensive 3-month holistic recovery sponsorship',
      impactFr: 'Prise en charge intégrale de 3 mois de rétablissement',
    },
  ];

  const currentImpact =
    presets.find((p) => p.usd === selectedAmount) || {
      impactEn: 'Direct contribution to Rehema clinical & vocational rehabilitation programs',
      impactFr: 'Contribution directe aux programmes de réhabilitation clinique et artistique de Rehema',
    };

  const activeAmountDisplay =
    currency === 'USD'
      ? `$${customAmount || selectedAmount}`
      : `${((customAmount ? Number(customAmount) : selectedAmount) * 1300).toLocaleString()} RWF`;

  const handleOpenDonateModal = (amount?: number) => {
    if (amount) {
      setSelectedAmount(amount);
      setCustomAmount('');
    }
    setIsSubmitted(false);
    setIsModalOpen(true);
  };

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleArtworkCardClick = () => {
    navigate('/gallery');
  };

  return (
    <section className="relative py-20 sm:py-28 bg-[#FAF8F5] border-b border-stone-200/70 overflow-hidden">
      {/* Delicate Amber Atmospheric Background Glows */}
      <div
        className="absolute top-1/4 -left-40 w-96 h-96 rounded-full bg-amber-500/10 blur-[100px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 -right-40 w-96 h-96 rounded-full bg-orange-500/10 blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 1. Header & Storytelling Narrative */}
        <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-800 text-xs font-sans font-semibold tracking-wider uppercase mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>
              {language === 'fr'
                ? 'NOTRE MISSION · SOUTENIR LA RENAISSANCE'
                : 'OUR MISSION · PURPOSE THROUGH RECOVERY'}
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.65rem] text-slate-900 font-normal leading-[1.2] tracking-tight">
            {language === 'fr' ? (
              <>
                Chaque Être Humain Mérite un Havre Pour{' '}
                <span className="italic font-serif text-amber-700">Renaître</span>
              </>
            ) : (
              <>
                Every Person Deserves a Haven to Reclaim Their{' '}
                <span className="italic font-serif text-amber-700">Dignity</span>
              </>
            )}
          </h2>

          <div className="w-12 h-[2px] bg-[#C5A059] mx-auto my-5" />

          {/* Storytelling Text */}
          <div className="space-y-4 text-stone-600 font-light text-sm sm:text-base leading-relaxed text-center sm:text-justify max-w-2xl mx-auto">
            <p>
              {language === 'fr'
                ? 'Derrière chaque dépendance se trouve une personne en souffrance qui aspire simplement à être écoutée et comprise. À Kigali, Rehema Mission Rwanda offre un sanctuaire discret et bienveillant aux jeunes et aux familles qui luttent contre le piège de la dépendance.'
                : 'Behind every addiction is a struggling human heart yearning to be seen, heard, and understood. In the heart of Kigali, Rehema Mission Rwanda provides a compassionate harbor for young individuals and families navigating the silent weight of substance dependency.'}
            </p>
            <p>
              {language === 'fr'
                ? 'À travers nos cercles d’écoute, le dialogue préventif et notre atelier d’art contemporain KAZE Collections, nous prouvons que la guérison n’est pas solitaire : elle se tisse ensemble. Vous pouvez être l’étincelle de ce renouveau de deux manières concrètes :'
                : 'Through clinical guidance, youth dialogue circles, and vocational mastery in the KAZE Collections fine art atelier, we prove that recovery is not a solitary struggle—it is a community rebirth. You can stand with this transformation in two profound ways:'}
            </p>
          </div>
        </div>

        {/* 2. The Two Paths of Support (Dual Cards Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 sm:gap-8 items-stretch">
          {/* PATH 1: Acquire Artwork from KAZE Collections (100% Proceeds to Recovery) */}
          <div
            onClick={handleArtworkCardClick}
            className="group relative bg-white rounded-[26px] border border-stone-200/90 shadow-[0_12px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_22px_48px_rgba(0,0,0,0.12)] hover:border-amber-400/80 transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between cursor-pointer overflow-hidden hover:-translate-y-1.5"
          >
            {/* Top Badge */}
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold tracking-wider uppercase font-sans">
                  <Palette className="w-3.5 h-3.5 text-emerald-600" />
                  {language === 'fr' ? '100% au profit de la guérison' : '100% Proceeds to Recovery'}
                </span>
                <span className="text-xs text-stone-400 font-sans tracking-widest uppercase">
                  {language === 'fr' ? 'VOIE 1' : 'PATH 1'}
                </span>
              </div>

              {/* Title & Narrative */}
              <h3 className="font-serif text-2xl text-slate-900 group-hover:text-amber-800 transition-colors leading-snug">
                {language === 'fr'
                  ? 'Acquérir une Œuvre de KAZE Collections'
                  : 'Acquire an Artwork from KAZE Collections'}
              </h3>

              <p className="text-stone-600 text-xs sm:text-sm font-light leading-relaxed mt-2.5">
                {language === 'fr'
                  ? 'Chaque peinture ou sculpture achetée finance directement le gagne-pain des artistes issus de la réhabilitation et pérennise nos soins cliniques.'
                  : 'Every canvas or sculpture you collect directly provides independent livelihood to recovering artisans while sustaining clinical care for others in need.'}
              </p>

              {/* Interactive Clickable Artwork Showcase */}
              <div className="mt-5 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 relative group/art shadow-inner">
                <div className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden">
                  <img
                    src={featuredArt.image}
                    alt={featuredArt.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/art:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-90 transition-opacity" />

                  {/* Artwork Curatorial Overlay */}
                  <div className="absolute bottom-0 inset-x-0 p-4 text-white">
                    <p className="text-[10px] tracking-[0.2em] font-sans font-bold uppercase text-amber-300">
                      {featuredArt.categoryLabel}
                    </p>
                    <p className="font-serif text-base sm:text-lg text-white font-medium line-clamp-1">
                      {featuredArt.title}
                    </p>
                    <p className="text-[11px] text-white/80 font-light">
                      {featuredArt.artistIdentifier} · {featuredArt.year}
                    </p>
                  </div>

                  {/* Hover Floating Pill */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-slate-900 text-[10.5px] font-bold tracking-wider uppercase font-sans opacity-0 group-hover/art:opacity-100 transition-opacity shadow-sm">
                    {language === 'fr' ? 'Voir l’œuvre →' : 'View Piece →'}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Direct Route Link */}
            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
              <span className="text-xs text-stone-500 font-light">
                {language === 'fr' ? 'Livraison sécurisée dans le monde entier' : 'Worldwide secure art shipping'}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-700 group-hover:text-amber-900 transition-colors font-sans">
                <span>{language === 'fr' ? 'Explorer KAZE Collections' : 'Explore KAZE Collections'}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
              </span>
            </div>
          </div>

          {/* PATH 2: Direct Financial Contribution (Donate Directly on This Page) */}
          <div className="relative bg-white rounded-[26px] border border-stone-200/90 shadow-[0_12px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_22px_48px_rgba(0,0,0,0.12)] hover:border-amber-400/80 transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between overflow-hidden">
            <div>
              {/* Top Badge */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-semibold tracking-wider uppercase font-sans">
                  <Heart className="w-3.5 h-3.5 text-amber-600 fill-amber-500/20" />
                  {language === 'fr' ? 'Don Direct & Impact Immédiat' : 'Direct Impact Donation'}
                </span>
                <span className="text-xs text-stone-400 font-sans tracking-widest uppercase">
                  {language === 'fr' ? 'VOIE 2' : 'PATH 2'}
                </span>
              </div>

              {/* Title & Narrative */}
              <h3 className="font-serif text-2xl text-slate-900 leading-snug">
                {language === 'fr'
                  ? 'Faire un Don Direct aux Soins & Programmes'
                  : 'Give Directly to Fuel Rehabilitation & Hope'}
              </h3>

              <p className="text-stone-600 text-xs sm:text-sm font-light leading-relaxed mt-2.5">
                {language === 'fr'
                  ? 'Votre contribution financière finance sans intermédiaire les consultations cliniques, les repas d’urgence et les ateliers d’écoute pour les jeunes en détresse.'
                  : 'Your direct tax-deductible contribution directly funds clinical liaison hours, emergency nutrition, and youth dialogue circles for young people in crisis.'}
              </p>

              {/* Interactive In-Page Donation Widget */}
              <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-amber-500/[0.04] border border-amber-500/20 space-y-4">
                <div className="flex items-center justify-between text-xs text-stone-600 font-medium font-sans">
                  <span>{language === 'fr' ? 'Montant de votre soutien :' : 'Select your gift amount:'}</span>
                  <div className="flex items-center gap-1 bg-white border border-stone-200 rounded-lg p-0.5 text-[11px]">
                    <button
                      type="button"
                      onClick={() => setCurrency('USD')}
                      className={`px-2 py-0.5 rounded ${
                        currency === 'USD' ? 'bg-amber-600 text-white font-bold' : 'text-stone-500'
                      }`}
                    >
                      USD ($)
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrency('RWF')}
                      className={`px-2 py-0.5 rounded ${
                        currency === 'RWF' ? 'bg-amber-600 text-white font-bold' : 'text-stone-500'
                      }`}
                    >
                      RWF
                    </button>
                  </div>
                </div>

                {/* Preset Amount Pills */}
                <div className="grid grid-cols-4 gap-2">
                  {presets.map((preset) => {
                    const isSelected = selectedAmount === preset.usd && !customAmount;
                    const label = currency === 'USD' ? `$${preset.usd}` : `${preset.rwf.toLocaleString()} F`;

                    return (
                      <button
                        key={preset.usd}
                        type="button"
                        onClick={() => {
                          setSelectedAmount(preset.usd);
                          setCustomAmount('');
                        }}
                        className={`py-2 px-1 text-center rounded-xl font-sans text-xs font-bold transition-all ${
                          isSelected
                            ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20 scale-[1.02]'
                            : 'bg-white hover:bg-stone-50 text-slate-800 border border-stone-200/90'
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>

                {/* Dynamic Impact Statement */}
                <div className="flex items-start gap-2.5 pt-1 text-xs text-stone-600 font-light">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <p>
                    <span className="font-semibold text-slate-800">
                      {currency === 'USD' ? `$${selectedAmount}` : `${(selectedAmount * 1300).toLocaleString()} RWF`} :
                    </span>{' '}
                    {language === 'fr' ? currentImpact.impactFr : currentImpact.impactEn}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Direct Donate CTA Button */}
            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
              <span className="text-xs text-stone-500 font-light">
                {language === 'fr' ? 'Paiement sécurisé par MoMo ou Carte' : 'Instant & secure Mobile Money / Card'}
              </span>
              <button
                type="button"
                onClick={() => handleOpenDonateModal(selectedAmount)}
                className="py-2.5 px-5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-sans text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 shadow-md shadow-amber-600/25 hover:shadow-amber-600/40"
              >
                <span>{language === 'fr' ? 'Faire un Don Maintenant' : 'Donate Now'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Interactive Donation Modal (Direct On-Page Donation Experience) */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-[28px] max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative overflow-hidden max-h-[92vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-stone-100">
              <div>
                <p className="text-[10px] tracking-[0.2em] font-sans font-bold uppercase text-amber-700">
                  REHEMA MISSION RWANDA
                </p>
                <h3 className="font-serif text-2xl text-slate-900 mt-0.5">
                  {language === 'fr' ? 'Soutenez la Guérison' : 'Support Holistic Recovery'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-slate-600 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            {isSubmitted ? (
              // Confirmation Thank You Screen
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <Check className="w-8 h-8 stroke-[2.5]" />
                </div>
                <h4 className="font-serif text-2xl text-slate-900">
                  {language === 'fr' ? 'Murakoze Cyane ! Merci de tout cœur !' : 'Thank You for Your Generosity!'}
                </h4>
                <p className="text-sm text-stone-600 max-w-sm mx-auto font-light leading-relaxed">
                  {language === 'fr'
                    ? `Votre promesse de don de ${activeAmountDisplay} apporte de l'espoir et un accompagnement précieux aux jeunes et familles en chemin vers la réhabilitation.`
                    : `Your generous contribution of ${activeAmountDisplay} brings direct clinical care and genuine hope to young lives walking the road of recovery.`}
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="py-2.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-sans text-xs font-semibold tracking-wider uppercase transition-colors"
                  >
                    {language === 'fr' ? 'Fermer' : 'Return to Website'}
                  </button>
                </div>
              </div>
            ) : (
              // Donation Form
              <form onSubmit={handleDonateSubmit} className="mt-5 space-y-5">
                {/* Selected Amount Confirmation */}
                <div className="bg-amber-50/70 border border-amber-200/70 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-sans text-stone-500 uppercase tracking-wider block">
                      {language === 'fr' ? 'Montant sélectionné' : 'Selected Contribution'}
                    </span>
                    <span className="font-serif text-2xl text-amber-900 font-bold">
                      {activeAmountDisplay}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-stone-600 font-light block max-w-[200px] leading-tight">
                      {language === 'fr' ? currentImpact.impactFr : currentImpact.impactEn}
                    </span>
                  </div>
                </div>

                {/* Payment Method Selector (MTN Mobile Money, Card, PayPal) */}
                <div>
                  <label className="block text-xs font-sans font-bold text-slate-800 uppercase tracking-wider mb-2">
                    {language === 'fr' ? 'Moyen de paiement :' : 'Payment Method:'}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('momo')}
                      className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 font-sans text-xs transition-all ${
                        paymentMethod === 'momo'
                          ? 'border-amber-600 bg-amber-50/50 text-amber-900 font-bold shadow-sm'
                          : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      <Smartphone className="w-4 h-4 text-amber-600" />
                      <span>MoMo / Airtel</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 font-sans text-xs transition-all ${
                        paymentMethod === 'card'
                          ? 'border-amber-600 bg-amber-50/50 text-amber-900 font-bold shadow-sm'
                          : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 text-amber-600" />
                      <span>Visa / Card</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('paypal')}
                      className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 font-sans text-xs transition-all ${
                        paymentMethod === 'paypal'
                          ? 'border-amber-600 bg-amber-50/50 text-amber-900 font-bold shadow-sm'
                          : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      <Gift className="w-4 h-4 text-amber-600" />
                      <span>PayPal</span>
                    </button>
                  </div>
                </div>

                {/* Donor Fields */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-sans font-medium text-stone-700 mb-1">
                      {language === 'fr' ? 'Votre Nom Complet' : 'Full Name'}
                    </label>
                    <input
                      type="text"
                      required
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      placeholder={language === 'fr' ? 'Ex: Claire Uwera' : 'e.g. John Doe'}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-sans font-medium text-stone-700 mb-1">
                      {language === 'fr' ? 'Adresse E-mail' : 'Email Address'}
                    </label>
                    <input
                      type="email"
                      required
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>

                  {paymentMethod === 'momo' && (
                    <div>
                      <label className="block text-xs font-sans font-medium text-stone-700 mb-1">
                        {language === 'fr' ? 'Numéro de Téléphone (MTN / Airtel)' : 'Mobile Money Phone Number'}
                      </label>
                      <input
                        type="tel"
                        required
                        value={donorPhone}
                        onChange={(e) => setDonorPhone(e.target.value)}
                        placeholder="+250 78X XXX XXX"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                      />
                    </div>
                  )}
                </div>

                {/* Security Note */}
                <div className="flex items-center gap-2 text-[11px] text-stone-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>
                    {language === 'fr'
                      ? 'Paiement chiffré et sécurisé. 100% alloué aux programmes Rehema Mission.'
                      : 'Encrypted & secure. 100% allocated to Rehema Mission programs.'}
                  </span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-sans text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-md shadow-amber-600/30 flex items-center justify-center gap-2"
                >
                  <span>
                    {language === 'fr'
                      ? `Confirmer le Don de ${activeAmountDisplay}`
                      : `Complete Donation of ${activeAmountDisplay}`}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
