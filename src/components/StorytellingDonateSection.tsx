import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  Palette,
  ArrowRight,
  ShieldCheck,
  Check,
  X,
  CreditCard,
  Smartphone,
  Gift,
  Sparkles,
} from 'lucide-react';
import { useStore } from '@/store/StoreContext';

export default function StorytellingDonateSection() {
  const { language } = useStore();
  const navigate = useNavigate();

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
    <section className="relative py-16 sm:py-24 bg-[#FAF7F2] border-b border-stone-200/70 overflow-hidden">
      {/* Subtle Ambient Background Warmth */}
      <div
        className="absolute top-1/3 -left-40 w-96 h-96 rounded-full bg-amber-500/10 blur-[110px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 -right-40 w-96 h-96 rounded-full bg-orange-500/10 blur-[110px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 1. Header & Storytelling Narrative */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          {/* Golden accent bar matching "What We Do" */}
          <div className="w-[2px] h-7 sm:h-8 bg-[#C5A059] mx-auto mb-4" />

          {/* Section title using the exact same font as "What We Do" (.section-title) */}
          <h2 className="section-title">
            {language === 'fr'
              ? 'Chaque Être Humain Mérite un Havre Pour Renaître'
              : 'Every Person Deserves a Haven to Reclaim Their Dignity'}
          </h2>

          {/* Conversational, easy English & French storytelling */}
          <div className="space-y-3.5 text-stone-600 font-normal text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mt-5 text-center sm:text-justify">
            <p>
              {language === 'fr'
                ? "L'addiction est bien réelle, et elle nous touche tous. Quand une personne sombre dans la dépendance, c'est toute sa famille et toute sa communauté qui en subissent la douleur."
                : 'Addiction is real, and it touches all of us. When one person struggles with addiction, their whole family and community are exposed to the pain.'}
            </p>
            <p>
              {language === 'fr'
                ? "Nous sommes déjà sur le terrain à faire le travail chaque jour. Mais à la sortie des centres de désintoxication, la solitude est souvent le plus grand piège : elle peut facilement replonger quelqu'un dans l'addiction."
                : 'We are already doing the work on the ground every single day. But when people come out of rehab centers, loneliness is often the greatest risk—it can easily push them right back into addiction.'}
            </p>
            <p>
              {language === 'fr'
                ? "C'est pour cela que nous les réunissons à l'Atelier Kaze Collections. Ici, ils ne marchent plus seuls : ils travaillent et guérissent ensemble en créant de l'art. Et vous pouvez soutenir notre action de deux façons très simples : soit en achetant une œuvre d'art, soit en nous faisant un don."
                : "That's why we bring them together at Kaze Collections. Here, they don't walk alone—they work and heal together by creating art. And you can support our work in two simple ways: either by buying an artwork, or by giving us a direct donation."}
            </p>
          </div>
        </div>

        {/* 2. The Two Support Cards Grid (Using cohesive mirror gradient rim & corner glow design) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7 items-stretch">
          {/* CARD 1: Support by Buying Artwork (KAZE Collections) */}
          <div
            onClick={handleArtworkCardClick}
            className="relative group transition-transform duration-300 hover:-translate-y-2 cursor-pointer"
          >
            {/* Ambient Corner Dégradé Glow (Sage-teal neon bloom radiating outside corners) */}
            <div
              className="absolute -inset-[3px] rounded-[30px] opacity-70 group-hover:opacity-100 blur-[10px] transition-all duration-500 pointer-events-none z-0"
              style={{
                background:
                  'radial-gradient(circle at 0% 0%, rgba(52, 211, 153, 0.75) 0%, transparent 65%), radial-gradient(circle at 100% 100%, rgba(69, 99, 94, 0.6) 0%, transparent 65%)',
              }}
              aria-hidden="true"
            />

            {/* Precision Mirror Gradient Rim Frame (2px rounded stroke with specular reflection) */}
            <div
              className="relative p-[2px] rounded-[26px] z-10 transition-shadow duration-300 h-full"
              style={{
                background:
                  'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(167, 243, 208, 0.9) 25%, #34D399 55%, #45635E 85%, rgba(255, 255, 255, 0.4) 100%)',
                boxShadow:
                  '0 14px 32px -4px rgba(0,0,0,0.22), 0 0 24px 2px rgba(52, 211, 153, 0.45), 0 0 46px 6px rgba(69, 99, 94, 0.26)',
              }}
            >
              {/* Solid Inner Card Surface (Dark Forest Sage-Teal: #45635E) */}
              <div className="w-full h-full rounded-[24px] bg-[#45635E] text-white flex flex-col justify-between p-6 sm:p-7 relative overflow-hidden select-none min-h-[380px]">
                {/* Tactile Risograph / Film Grain Fractal Noise Overlay */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-45 mix-blend-overlay z-[1]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise1'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise1)'/%3E%3C/svg%3E")`,
                    backgroundSize: '120px 120px',
                  }}
                  aria-hidden="true"
                />

                {/* Secondary Fine Paper Stipple Grain Texture */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-30 mix-blend-soft-light z-[1]"
                  style={{
                    backgroundImage: `radial-gradient(rgba(255,255,255,0.25) 1px, transparent 1px), radial-gradient(rgba(0,0,0,0.3) 1px, transparent 1px)`,
                    backgroundSize: '4px 4px',
                    backgroundPosition: '0 0, 2px 2px',
                  }}
                  aria-hidden="true"
                />

                {/* Inner Vignette Depth */}
                <div
                  className="absolute inset-0 pointer-events-none shadow-[inset_0_0_28px_rgba(0,0,0,0.25)] rounded-[inherit] z-[1]"
                  aria-hidden="true"
                />

                {/* Top Inset Hairline */}
                <div className="absolute top-3 left-4 right-4 h-[1px] bg-white/20 pointer-events-none z-[2]" />

                {/* Bottom Inset Hairline */}
                <div className="absolute bottom-3 left-4 right-4 h-[1px] bg-white/20 pointer-events-none z-[2]" />

                {/* Upper Content: Brand Tag & Curatorial Texts (No Image, Text Preserved) */}
                <div className="relative z-10">
                  {/* Brand Tag with Palette Icon */}
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                        <Palette className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-[10.5px] sm:text-[11px] font-sans tracking-[0.16em] uppercase font-bold text-white/95">
                        {language === 'fr' ? 'REHEMA · ATELIER KAZE COLLECTIONS' : 'REHEMA · KAZE COLLECTIONS'}
                      </span>
                    </div>
                    <span className="text-[10px] tracking-widest uppercase font-semibold text-white/70 font-sans">
                      {language === 'fr' ? 'OPTION 1' : 'WAY 1'}
                    </span>
                  </div>

                  {/* Bold Headline */}
                  <h3 className="font-sans font-black text-xl sm:text-2xl text-white uppercase tracking-tight mt-2 leading-tight">
                    {language === 'fr' ? 'ACHETER UNE ŒUVRE D’ART' : 'BUY ONE OF OUR ARTWORKS'}
                  </h3>

                  {/* Curatorial Storytelling & 100% Impact Guarantee */}
                  <p className="text-white/85 text-xs sm:text-[13px] font-light leading-relaxed mt-3">
                    {language === 'fr'
                      ? 'Quand une personne sort de désintoxication, la solitude peut la replonger dans l’addiction. À l’Atelier Kaze Collections, les jeunes créent ensemble pour se reconstruire. 100% du produit de la vente de chaque tableau ou sculpture finance directement leur autonomie, leurs fournitures d’art et la continuité de leurs soins.'
                      : 'When people leave rehab, isolation can pull them back. At Kaze Collections, young artisans work and heal together by creating masterworks. 100% of every artwork sale directly funds their personal livelihood, studio pigments, and sustained recovery support.'}
                  </p>

                  {/* Curatorial Highlight Box (Text Preserved) */}
                  <div className="mt-4 p-3.5 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm space-y-1">
                    <p className="text-[10px] font-sans font-bold tracking-widest uppercase text-emerald-200">
                      {language === 'fr' ? 'CRÉATION ORIGINALE RWANDAISE' : 'AUTHENTIC RWANDAN CONTEMPORARY ART'}
                    </p>
                    <p className="font-serif text-sm sm:text-base text-white font-medium">
                      {language === 'fr'
                        ? 'Toiles contemporaines, sculptures & haute maroquinerie d’art'
                        : 'Original canvas paintings, fine sculptures & artisan craft'}
                    </p>
                    <p className="text-[11px] text-white/75 font-light">
                      {language === 'fr'
                        ? 'Certificat d’authenticité signé par les artistes de l’Atelier Kaze'
                        : 'Signed certificate of authenticity & direct artisan provenance'}
                    </p>
                  </div>
                </div>

                {/* Bottom CTA Link (Routes to Kaze Collections /gallery) */}
                <div className="mt-6 pt-3.5 border-t border-white/25 flex items-center justify-between relative z-10">
                  <span className="text-xs text-white/80 font-light">
                    {language === 'fr' ? 'Expédition sécurisée mondiale' : 'Worldwide secure art delivery'}
                  </span>
                  <div className="text-xs sm:text-[13px] font-sans font-semibold text-white inline-flex items-center gap-1.5 group/link py-1 px-3 rounded-full bg-white/15 hover:bg-white/25 transition-all">
                    <span className="tracking-wide">
                      {language === 'fr' ? 'voir kaze collections' : 'explore kaze collections'}
                    </span>
                    <span className="group-hover/link:translate-x-1 transition-transform font-bold text-white">
                      &gt;
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 2: Support by Giving Us Money (Direct Financial Donation) */}
          <div className="relative group transition-transform duration-300 hover:-translate-y-2">
            {/* Ambient Corner Dégradé Glow (Slate-blue neon bloom radiating outside corners) */}
            <div
              className="absolute -inset-[3px] rounded-[30px] opacity-70 group-hover:opacity-100 blur-[10px] transition-all duration-500 pointer-events-none z-0"
              style={{
                background:
                  'radial-gradient(circle at 0% 0%, rgba(96, 165, 250, 0.75) 0%, transparent 65%), radial-gradient(circle at 100% 100%, rgba(59, 130, 246, 0.6) 0%, transparent 65%)',
              }}
              aria-hidden="true"
            />

            {/* Precision Mirror Gradient Rim Frame (2px rounded stroke with specular reflection) */}
            <div
              className="relative p-[2px] rounded-[26px] z-10 transition-shadow duration-300 h-full"
              style={{
                background:
                  'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(147, 197, 253, 0.9) 25%, #60A5FA 55%, #2C3E55 85%, rgba(255, 255, 255, 0.4) 100%)',
                boxShadow:
                  '0 14px 32px -4px rgba(0,0,0,0.22), 0 0 22px 2px rgba(96, 165, 250, 0.45), 0 0 46px 6px rgba(44, 62, 85, 0.28)',
              }}
            >
              {/* Solid Inner Card Surface (Deep Slate Navy: #2C3E55) */}
              <div className="w-full h-full rounded-[24px] bg-[#2C3E55] text-white flex flex-col justify-between p-6 sm:p-7 relative overflow-hidden select-none min-h-[380px]">
                {/* Tactile Risograph / Film Grain Fractal Noise Overlay */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-45 mix-blend-overlay z-[1]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise2)'/%3E%3C/svg%3E")`,
                    backgroundSize: '120px 120px',
                  }}
                  aria-hidden="true"
                />

                {/* Secondary Fine Paper Stipple Grain Texture */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-30 mix-blend-soft-light z-[1]"
                  style={{
                    backgroundImage: `radial-gradient(rgba(255,255,255,0.25) 1px, transparent 1px), radial-gradient(rgba(0,0,0,0.3) 1px, transparent 1px)`,
                    backgroundSize: '4px 4px',
                    backgroundPosition: '0 0, 2px 2px',
                  }}
                  aria-hidden="true"
                />

                {/* Inner Vignette Depth */}
                <div
                  className="absolute inset-0 pointer-events-none shadow-[inset_0_0_28px_rgba(0,0,0,0.25)] rounded-[inherit] z-[1]"
                  aria-hidden="true"
                />

                {/* Top Inset Hairline */}
                <div className="absolute top-3 left-4 right-4 h-[1px] bg-white/20 pointer-events-none z-[2]" />

                {/* Bottom Inset Hairline */}
                <div className="absolute bottom-3 left-4 right-4 h-[1px] bg-white/20 pointer-events-none z-[2]" />

                {/* Upper Content: Brand Tag & Donation Narrative */}
                <div className="relative z-10">
                  {/* Brand Tag with Heart Icon */}
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                        <Heart className="w-3 h-3 text-white fill-white/20" />
                      </div>
                      <span className="text-[10.5px] sm:text-[11px] font-sans tracking-[0.16em] uppercase font-bold text-white/95">
                        {language === 'fr' ? 'REHEMA · DON FINANCIER DIRECT' : 'REHEMA · DIRECT FINANCIAL GIFT'}
                      </span>
                    </div>
                    <span className="text-[10px] tracking-widest uppercase font-semibold text-white/70 font-sans">
                      {language === 'fr' ? 'OPTION 2' : 'WAY 2'}
                    </span>
                  </div>

                  {/* Bold Headline */}
                  <h3 className="font-sans font-black text-xl sm:text-2xl text-white uppercase tracking-tight mt-2 leading-tight">
                    {language === 'fr' ? 'NOUS SOUTENIR FINANCIÈREMENT' : 'GIVE US A DIRECT DONATION'}
                  </h3>

                  {/* Narrative Text */}
                  <p className="text-white/85 text-xs sm:text-[13px] font-light leading-relaxed mt-3">
                    {language === 'fr'
                      ? 'Nous sommes déjà sur le terrain à agir au quotidien. Votre soutien financier finance sans intermédiaire les consultations cliniques, l’aide alimentaire d’urgence et les cercles de parole afin qu’aucun jeune ne lutte seul.'
                      : 'We are already doing the work on the ground every day. Your financial gift directly pays for counseling, clinic liaisons, emergency nutrition, and art supplies so no one has to fight addiction alone.'}
                  </p>

                  {/* Interactive Quick-Amount Selector */}
                  <div className="mt-4 p-3.5 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm space-y-3">
                    <div className="flex items-center justify-between text-xs text-white/90 font-medium font-sans">
                      <span>{language === 'fr' ? 'Montant de votre don :' : 'Select your gift:'}</span>
                      <div className="flex items-center gap-1 bg-black/20 rounded-lg p-0.5 text-[11px]">
                        <button
                          type="button"
                          onClick={() => setCurrency('USD')}
                          className={`px-2 py-0.5 rounded transition-colors ${
                            currency === 'USD' ? 'bg-white text-slate-900 font-bold' : 'text-white/70'
                          }`}
                        >
                          USD
                        </button>
                        <button
                          type="button"
                          onClick={() => setCurrency('RWF')}
                          className={`px-2 py-0.5 rounded transition-colors ${
                            currency === 'RWF' ? 'bg-white text-slate-900 font-bold' : 'text-white/70'
                          }`}
                        >
                          RWF
                        </button>
                      </div>
                    </div>

                    {/* Presets */}
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
                            className={`py-1.5 px-1 text-center rounded-lg font-sans text-xs font-bold transition-all ${
                              isSelected
                                ? 'bg-white text-slate-950 shadow-md font-black scale-105'
                                : 'bg-white/15 hover:bg-white/25 text-white'
                            }`}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>

                    {/* Live Dynamic Impact Statement */}
                    <div className="flex items-start gap-2 pt-0.5 text-xs text-white/90 font-light">
                      <Check className="w-3.5 h-3.5 text-emerald-300 flex-shrink-0 mt-0.5" />
                      <p className="line-clamp-1">
                        <span className="font-semibold text-white">
                          {currency === 'USD' ? `$${selectedAmount}` : `${(selectedAmount * 1300).toLocaleString()} RWF`} :
                        </span>{' '}
                        {language === 'fr' ? currentImpact.impactFr : currentImpact.impactEn}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Direct Donate CTA Button (Opens Donation Modal on This Page) */}
                <div className="mt-6 pt-3.5 border-t border-white/25 flex items-center justify-between relative z-10">
                  <span className="text-xs text-white/80 font-light">
                    {language === 'fr' ? 'MoMo, Airtel & Carte bancaire' : 'MoMo, Airtel & Credit Card'}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleOpenDonateModal(selectedAmount)}
                    className="text-xs sm:text-[13px] font-sans font-semibold text-white inline-flex items-center gap-1.5 py-1 px-3.5 rounded-full bg-white/20 hover:bg-white/30 transition-all shadow-sm"
                  >
                    <span>{language === 'fr' ? 'faire un don' : 'donate now'}</span>
                    <span className="font-bold text-white">&gt;</span>
                  </button>
                </div>
              </div>
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
                    ? `Votre don de ${activeAmountDisplay} apporte un accompagnement direct aux jeunes et familles en chemin vers la réhabilitation.`
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

                {/* Security Guarantee */}
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
