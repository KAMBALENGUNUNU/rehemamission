import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  Palette,
  ArrowRight,
  Check,
} from 'lucide-react';
import { useStore } from '@/store/StoreContext';

export default function StorytellingDonateSection() {
  const { language } = useStore();
  const navigate = useNavigate();

  // Selected donation preset for preview
  const [selectedAmount, setSelectedAmount] = useState<number>(50);
  const [currency, setCurrency] = useState<'USD' | 'RWF'>('USD');

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

  const handleArtworkCardClick = () => {
    navigate('/gallery');
  };

  const handleDonateClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate('/contact?reason=support');
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

        {/* 2. The Two Support Cards Grid (Inside: pure dot grains, NO lines) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7 items-stretch">
          {/* CARD 1: Support by Buying Artwork (KAZE Collections) */}
          <div
            onClick={handleArtworkCardClick}
            className="relative group transition-transform duration-300 hover:-translate-y-2 cursor-pointer"
          >
            {/* Ambient Corner Dégradé Glow */}
            <div
              className="absolute -inset-[3px] rounded-[30px] opacity-70 group-hover:opacity-100 blur-[10px] transition-all duration-500 pointer-events-none z-0"
              style={{
                background:
                  'radial-gradient(circle at 0% 0%, rgba(52, 211, 153, 0.75) 0%, transparent 65%), radial-gradient(circle at 100% 100%, rgba(69, 99, 94, 0.6) 0%, transparent 65%)',
              }}
              aria-hidden="true"
            />

            {/* Precision Mirror Gradient Rim Frame (2px rounded stroke) */}
            <div
              className="relative p-[2px] rounded-[26px] z-10 transition-shadow duration-300 h-full"
              style={{
                background:
                  'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(167, 243, 208, 0.9) 25%, #34D399 55%, #45635E 85%, rgba(255, 255, 255, 0.4) 100%)',
                boxShadow:
                  '0 14px 32px -4px rgba(0,0,0,0.22), 0 0 24px 2px rgba(52, 211, 153, 0.45), 0 0 46px 6px rgba(69, 99, 94, 0.26)',
              }}
            >
              {/* Solid Inner Card Surface (Dark Forest Sage-Teal: #45635E) with PURE DOT GRAINS (NO LINES) */}
              <div className="w-full h-full rounded-[24px] bg-[#45635E] text-white flex flex-col justify-between p-6 sm:p-7 relative overflow-hidden select-none min-h-[380px]">
                {/* Layer 1: Dense Stipple Dot Grains Pattern */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-40 mix-blend-soft-light z-[1]"
                  style={{
                    backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.5) 1px, transparent 1px), radial-gradient(circle, rgba(0, 0, 0, 0.4) 1px, transparent 1px)`,
                    backgroundSize: '5px 5px, 5px 5px',
                    backgroundPosition: '0 0, 2.5px 2.5px',
                  }}
                  aria-hidden="true"
                />

                {/* Layer 2: Micro Dot Grains Texture */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-45 mix-blend-overlay z-[1]"
                  style={{
                    backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.35) 0.8px, transparent 0.8px)`,
                    backgroundSize: '3px 3px',
                  }}
                  aria-hidden="true"
                />

                {/* Layer 3: Inner Vignette Depth for Tactile Canvas Feel */}
                <div
                  className="absolute inset-0 pointer-events-none shadow-[inset_0_0_32px_rgba(0,0,0,0.25)] rounded-[inherit] z-[1]"
                  aria-hidden="true"
                />

                {/* Upper Content: Brand Tag & Curatorial Texts (No Image, No Inset Lines) */}
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
                    <span className="font-serif text-2xl sm:text-[1.75rem] font-light tracking-tight text-outline-signature leading-none select-none transition-all duration-500">
                      {language === 'fr' ? 'Option 1' : 'Way 1'}
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

                  {/* Curatorial Highlight Box with Dotted Texture Framing */}
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

                {/* Bottom CTA Link (Directly routes to Kaze Collections /gallery) */}
                <div className="mt-6 pt-4 border-t border-dotted border-white/30 flex items-center justify-between relative z-10">
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
            {/* Ambient Corner Dégradé Glow */}
            <div
              className="absolute -inset-[3px] rounded-[30px] opacity-70 group-hover:opacity-100 blur-[10px] transition-all duration-500 pointer-events-none z-0"
              style={{
                background:
                  'radial-gradient(circle at 0% 0%, rgba(96, 165, 250, 0.75) 0%, transparent 65%), radial-gradient(circle at 100% 100%, rgba(59, 130, 246, 0.6) 0%, transparent 65%)',
              }}
              aria-hidden="true"
            />

            {/* Precision Mirror Gradient Rim Frame (2px rounded stroke) */}
            <div
              className="relative p-[2px] rounded-[26px] z-10 transition-shadow duration-300 h-full"
              style={{
                background:
                  'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(147, 197, 253, 0.9) 25%, #60A5FA 55%, #2C3E55 85%, rgba(255, 255, 255, 0.4) 100%)',
                boxShadow:
                  '0 14px 32px -4px rgba(0,0,0,0.22), 0 0 22px 2px rgba(96, 165, 250, 0.45), 0 0 46px 6px rgba(44, 62, 85, 0.28)',
              }}
            >
              {/* Solid Inner Card Surface (Deep Slate Navy: #2C3E55) with PURE DOT GRAINS (NO LINES) */}
              <div className="w-full h-full rounded-[24px] bg-[#2C3E55] text-white flex flex-col justify-between p-6 sm:p-7 relative overflow-hidden select-none min-h-[380px]">
                {/* Layer 1: Dense Stipple Dot Grains Pattern */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-40 mix-blend-soft-light z-[1]"
                  style={{
                    backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.5) 1px, transparent 1px), radial-gradient(circle, rgba(0, 0, 0, 0.4) 1px, transparent 1px)`,
                    backgroundSize: '5px 5px, 5px 5px',
                    backgroundPosition: '0 0, 2.5px 2.5px',
                  }}
                  aria-hidden="true"
                />

                {/* Layer 2: Micro Dot Grains Texture */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-45 mix-blend-overlay z-[1]"
                  style={{
                    backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.35) 0.8px, transparent 0.8px)`,
                    backgroundSize: '3px 3px',
                  }}
                  aria-hidden="true"
                />

                {/* Layer 3: Inner Vignette Depth for Tactile Canvas Feel */}
                <div
                  className="absolute inset-0 pointer-events-none shadow-[inset_0_0_32px_rgba(0,0,0,0.25)] rounded-[inherit] z-[1]"
                  aria-hidden="true"
                />

                {/* Upper Content: Brand Tag & Donation Narrative (No Inset Lines) */}
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
                    <span className="font-serif text-2xl sm:text-[1.75rem] font-light tracking-tight text-outline-signature leading-none select-none transition-all duration-500">
                      {language === 'fr' ? 'Option 2' : 'Way 2'}
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
                        const isSelected = selectedAmount === preset.usd;
                        const label = currency === 'USD' ? `$${preset.usd}` : `${preset.rwf.toLocaleString()} F`;

                        return (
                          <button
                            key={preset.usd}
                            type="button"
                            onClick={() => setSelectedAmount(preset.usd)}
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

                {/* Bottom Direct Donate CTA Button (Redirects directly to /contact?reason=support) */}
                <div className="mt-6 pt-4 border-t border-dotted border-white/30 flex items-center justify-between relative z-10">
                  <span className="text-xs text-white/80 font-light">
                    {language === 'fr' ? 'MoMo, Airtel, Virement & Carte' : 'MoMo, Airtel, Bank & Card'}
                  </span>
                  <button
                    type="button"
                    onClick={handleDonateClick}
                    className="text-xs sm:text-[13px] font-sans font-semibold text-white inline-flex items-center gap-1.5 py-1 px-3.5 rounded-full bg-white/20 hover:bg-white/30 transition-all shadow-sm group/link"
                  >
                    <span>{language === 'fr' ? 'faire un don' : 'donate now'}</span>
                    <span className="group-hover/link:translate-x-1 transition-transform font-bold text-white">&gt;</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
