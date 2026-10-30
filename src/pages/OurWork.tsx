import { Link } from 'react-router-dom';
import {
  ShieldAlert,
  Heart,
  Phone,
  MessageCircle,
} from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { TRANSLATIONS, type TranslationKey } from '@/lib/translations';

interface PinCardTheme {
  primary: string;
  dark: string;
  light: string;
  glow: string;
  bg: string;
  border: string;
}

// 13 distinct color themes matching the reference image's vibrant 3D plastic pushpin & soft pastel card design
const PIN_CARD_THEMES: PinCardTheme[] = [
  // 1. Blue (like "PRODUCTION")
  {
    primary: '#2563EB',
    dark: '#1D4ED8',
    light: '#93C5FD',
    glow: '#3B82F6',
    bg: '#EEF4FF',
    border: '#D6E4FF',
  },
  // 2. Magenta Pink (like "RESEARCH")
  {
    primary: '#E11D48',
    dark: '#9F1239',
    light: '#FDA4AF',
    glow: '#EC4899',
    bg: '#FDF0F8',
    border: '#FAD2EC',
  },
  // 3. Grass Green (like "PRODUCTION MANAGEMENT")
  {
    primary: '#16A34A',
    dark: '#15803D',
    light: '#86EFAC',
    glow: '#22C55E',
    bg: '#F1FBE9',
    border: '#D4F6C2',
  },
  // 4. Teal / Mint (like "TRADITIONAL MEDIA BUY")
  {
    primary: '#0D9488',
    dark: '#0F766E',
    light: '#5EEAD4',
    glow: '#14B8A6',
    bg: '#E7FAF7',
    border: '#C2F4EC',
  },
  // 5. Electric Purple (like "DIGITAL MEDIA BUY")
  {
    primary: '#7C3AED',
    dark: '#5B21B6',
    light: '#C4B5FD',
    glow: '#8B5CF6',
    bg: '#F6EEFF',
    border: '#E9D3FF',
  },
  // 6. Warm Peach / Coral (like "TRAININGS AND WORKSHOPS")
  {
    primary: '#EA580C',
    dark: '#C2410C',
    light: '#FDBA74',
    glow: '#F97316',
    bg: '#FFF3E7',
    border: '#FFE0C2',
  },
  // 7. Sky Blue
  {
    primary: '#0284C7',
    dark: '#0369A1',
    light: '#7DD3FC',
    glow: '#0EA5E9',
    bg: '#EDF8FF',
    border: '#CCEBFD',
  },
  // 8. Rose Berry
  {
    primary: '#DB2777',
    dark: '#9D174D',
    light: '#F472B6',
    glow: '#EC4899',
    bg: '#FDF2F8',
    border: '#FBCFE8',
  },
  // 9. Warm Amber Gold
  {
    primary: '#D97706',
    dark: '#B45309',
    light: '#FCD34D',
    glow: '#F59E0B',
    bg: '#FEF9E7',
    border: '#FDE68A',
  },
  // 10. Emerald Green
  {
    primary: '#059669',
    dark: '#047857',
    light: '#6EE7B7',
    glow: '#10B981',
    bg: '#ECFDF5',
    border: '#A7F3D0',
  },
  // 11. Royal Indigo
  {
    primary: '#4F46E5',
    dark: '#3730A3',
    light: '#A5B4FC',
    glow: '#6366F1',
    bg: '#EEF2FF',
    border: '#C7D2FE',
  },
  // 12. Crimson Ruby Red
  {
    primary: '#DC2626',
    dark: '#B91C1C',
    light: '#FCA5A5',
    glow: '#EF4444',
    bg: '#FEF2F2',
    border: '#FECACA',
  },
  // 13. Deep Jade Teal
  {
    primary: '#0F766E',
    dark: '#115E59',
    light: '#5EEAD4',
    glow: '#14B8A6',
    bg: '#F0FDFA',
    border: '#99F6E4',
  },
];

// Realistic 3D pushpin matching the exact rendered thumbtack from the reference image
function Pushpin({ id, theme }: { id: string; theme: PinCardTheme }) {
  return (
    <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none select-none">
      <svg
        width="54"
        height="60"
        viewBox="0 0 54 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_4px_12px_rgba(0,0,0,0.18)]"
      >
        <defs>
          {/* Ambient colored radial glow onto the paper */}
          <radialGradient
            id={`glow-${id}`}
            cx="50%"
            cy="65%"
            r="50%"
            fx="50%"
            fy="65%"
          >
            <stop offset="0%" stopColor={theme.glow} stopOpacity="0.85" />
            <stop offset="50%" stopColor={theme.glow} stopOpacity="0.4" />
            <stop offset="100%" stopColor={theme.glow} stopOpacity="0" />
          </radialGradient>

          {/* Base flange linear gradient */}
          <linearGradient id={`base-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={theme.light} />
            <stop offset="45%" stopColor={theme.primary} />
            <stop offset="100%" stopColor={theme.dark} />
          </linearGradient>

          {/* 3D sphere gradient for the head bulb */}
          <radialGradient
            id={`head-${id}`}
            cx="34%"
            cy="32%"
            r="68%"
            fx="30%"
            fy="28%"
          >
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="25%" stopColor={theme.light} />
            <stop offset="68%" stopColor={theme.primary} />
            <stop offset="100%" stopColor={theme.dark} />
          </radialGradient>

          {/* Top beveled face cap */}
          <linearGradient id={`topCap-${id}`} x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor={theme.light} />
            <stop offset="60%" stopColor={theme.primary} />
            <stop offset="100%" stopColor={theme.dark} />
          </linearGradient>
        </defs>

        {/* 1. Ambient colored aura / glow spreading onto paper */}
        <ellipse cx="27" cy="40" rx="23" ry="14" fill={`url(#glow-${id})`} />

        {/* 2. Soft contact drop shadow under the base */}
        <ellipse cx="30" cy="43" rx="14" ry="6" fill="rgba(0,0,0,0.26)" />

        {/* 3. Base Disc Flange (round bottom that presses against card) */}
        <ellipse cx="27" cy="41" rx="14" ry="6" fill={theme.dark} opacity="0.65" />
        <ellipse cx="27" cy="39.5" rx="13.5" ry="5.5" fill={`url(#base-${id})`} />
        {/* Base rim specular reflection */}
        <path
          d="M 15.5 39.5 C 18.5 43 35.5 43 38.5 39.5"
          stroke="#ffffff"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.55"
        />

        {/* 4. Conical Neck / Waist connecting base to head */}
        <path
          d="M 21.5 24 C 21.5 31, 19 36, 17 38.5 L 37 38.5 C 35 36, 32.5 31, 32.5 24 Z"
          fill={`url(#base-${id})`}
        />

        {/* 5. 3D Head Bulb */}
        <circle cx="27" cy="20.5" r="13" fill={`url(#head-${id})`} />

        {/* 6. Top Beveled Circular Face */}
        <ellipse cx="27" cy="17" rx="11" ry="6.8" fill={`url(#topCap-${id})`} />

        {/* 7. Inner Bevel Highlight */}
        <ellipse cx="26.5" cy="16.5" rx="9.5" ry="5.2" fill={theme.primary} opacity="0.4" />

        {/* 8. Specular Reflections (Glossy 3D shine) */}
        {/* Arc highlight along top-left rim */}
        <path
          d="M 18 16 C 20 13, 26 12, 32 13"
          stroke="#ffffff"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.95"
        />
        {/* Secondary soft shine spot */}
        <ellipse
          cx="22.5"
          cy="15.5"
          rx="3.5"
          ry="1.8"
          fill="#ffffff"
          opacity="0.8"
          transform="rotate(-15 22.5 15.5)"
        />
        {/* Hot pinpoint reflection on lower sphere */}
        <circle cx="21" cy="23.5" r="1.5" fill="#ffffff" opacity="0.75" />
      </svg>
    </div>
  );
}

export default function OurWork() {
  const { language } = useStore();
  const t = (key: TranslationKey, fallback?: string) =>
    TRANSLATIONS[language]?.[key] ?? TRANSLATIONS.en[key] ?? fallback ?? key;

  const programmesEn = [
    // AVAILABLE NOW / CURRENT WORK
    {
      title: 'One-on-One Consultations & Emotional Follow-Up',
      category: 'Support & Recovery',
      status: 'active' as const,
      statusLabel: 'Available Now',
      description:
        'Individual guidance and attentive listening for young people navigating substance use and personal challenges. Providing consistent, non-judgmental presence and emotional accompaniment.',
      audience: 'Young individuals & youth seeking a confidential first step',
    },
    {
      title: 'Post-Detoxification Follow-Up & Reintegration',
      category: 'Support & Recovery',
      status: 'active' as const,
      statusLabel: 'Available Now',
      description:
        'Support and structured check-ins for individuals during the transition following specialized detoxification or clinical care, helping them rebuild daily habits and community ties.',
      audience: 'Individuals in recovery transitions',
    },
    {
      title: 'Peaceful Masculinity Workshops',
      category: 'Prevention & Relationships',
      status: 'active' as const,
      statusLabel: 'Available Now',
      description:
        'Interactive community workshops that explore healthy masculinity, non-violent communication, emotional resilience, and constructive ways for young men to relate to one another and their families.',
      audience: 'Young men, youth groups & community cohorts',
    },
    {
      title: 'Parenthood Workshops & Family Dialogue',
      category: 'Family Engagement',
      status: 'active' as const,
      statusLabel: 'Available Now',
      description:
        'Facilitated group conversations creating safe space for parents and caregivers to discuss family tensions, understand substance use challenges, and rebuild trusting parent-child bonds.',
      audience: 'Parents, guardians & caregivers',
    },
    {
      title: 'School & Community Awareness Discussions',
      category: 'Prevention & Relationships',
      status: 'active' as const,
      statusLabel: 'Available Now',
      description:
        'Educational outreach sessions conducted in schools and community centers, raising awareness about addiction risks, mental wellbeing, and seeking help early.',
      audience: 'Schools, educators & youth organizations',
    },
    {
      title: 'Talent Discovery & Kaze Collection Artistry',
      category: 'Talent & Self-Expression',
      status: 'active' as const,
      statusLabel: 'Available Now',
      description:
        'Mentorship that helps young people recognize their natural abilities, explore visual art and craft, and express their personal journey through dignified creative practice under Kaze Collection.',
      audience: 'Emerging youth artists & creative talents',
    },

    // IN DEVELOPMENT / PLANNED
    {
      title: 'Dedicated Arts-Based Therapy Programme',
      category: 'Talent & Self-Expression',
      status: 'planned' as const,
      statusLabel: 'In Development',
      description:
        'A formalised arts-as-therapy curriculum designed with creative specialists to provide structured therapeutic healing through painting, drawing, and sculpting.',
      audience: 'Planned specialized cohort initiative',
    },
    {
      title: 'Jeunesse en Primeur & Authentic Time for Winners',
      category: 'Prevention & Relationships',
      status: 'planned' as const,
      statusLabel: 'In Development',
      description:
        'Youth empowerment circles focusing on peer leadership, personal accountability, and positive peer influence for sustainable lifestyle choices.',
      audience: 'Adolescents & secondary school leavers',
    },
    {
      title: 'Tea-Time for Parents & Dad, Industry of Stability',
      category: 'Family Engagement',
      status: 'planned' as const,
      statusLabel: 'In Development',
      description:
        'Dedicated peer circles for fathers and mothers to support one another in creating grounded, emotionally stable household environments.',
      audience: 'Fathers and mothers seeking mutual fellowship',
    },
    {
      title: 'Anonymous Discussion Circles & Community Helpline',
      category: 'Support & Recovery',
      status: 'planned' as const,
      statusLabel: 'In Development',
      description:
        'A planned confidential telephone listening helpline and weekly anonymous support circles for young people needing immediate guidance without barriers.',
      audience: 'Community members needing confidential access',
    },

    // LONG-TERM VISION
    {
      title: 'Ebenezer House & Social Reinsertion Center',
      category: 'Long-term Vision',
      status: 'vision' as const,
      statusLabel: 'Long-term Vision',
      description:
        'A dedicated sanctuary facility offering transitional residential support, daily routines, spiritual care, and skills training for sustained independence.',
      audience: 'Long-term community infrastructure goal',
    },
    {
      title: 'Kaze Collection Public Gallery & Community Atelier',
      category: 'Long-term Vision',
      status: 'vision' as const,
      statusLabel: 'Long-term Vision',
      description:
        'A permanent public showroom, working atelier, and social enterprise cafe in Kigali where the public can engage directly with original artworks from Kaze Collection and support young artisans from Rehema.',
      audience: 'Public, art lovers, patrons & supporters in Kigali',
    },
    {
      title: 'Empowerment and Skills Hub (Allo Coach)',
      category: 'Long-term Vision',
      status: 'vision' as const,
      statusLabel: 'Long-term Vision',
      description:
        'A vocational and digital skills training incubator connecting youth in recovery to market opportunities, craftsmanship apprenticeships, and career coaching.',
      audience: 'Youth preparing for sustainable livelihoods',
    },
  ];

  const programmesFr = [
    // AVAILABLE NOW / CURRENT WORK
    {
      title: 'Consultations Individuelles & Suivi Émotionnel',
      category: 'Soutien & Rétablissement',
      status: 'active' as const,
      statusLabel: 'Disponible Actuellement',
      description:
        'Accompagnement individuel et écoute attentive pour les jeunes confrontés aux dépendances et aux épreuves de la vie. Une présence constante, sans jugement et bienveillante.',
      audience: 'Jeunes et individus en quête d’un premier pas confidentiel',
    },
    {
      title: 'Suivi Post-Désintoxication & Réinsertion',
      category: 'Soutien & Rétablissement',
      status: 'active' as const,
      statusLabel: 'Disponible Actuellement',
      description:
        'Accompagnement et bilans réguliers pour les personnes en phase de transition après des soins cliniques ou de sevrage, les aidant à reconstruire leur quotidien et leurs liens sociaux.',
      audience: 'Personnes en période de transition et de stabilisation',
    },
    {
      title: 'Ateliers de Masculinité Apaisée',
      category: 'Prévention & Relations',
      status: 'active' as const,
      statusLabel: 'Disponible Actuellement',
      description:
        'Ateliers communautaires interactifs explorant la masculinité positive, la communication non-violente, la résilience émotionnelle et des relations saines avec les pairs et les familles.',
      audience: 'Jeunes hommes, groupes de jeunes & cohortes communautaires',
    },
    {
      title: 'Ateliers de Parentalité & Dialogue Familial',
      category: 'Engagement Familial',
      status: 'active' as const,
      statusLabel: 'Disponible Actuellement',
      description:
        'Cercles de dialogue offrant un cadre sécurisant pour échanger sur les tensions familiales, appréhender les problématiques de dépendance et restaurer les liens de confiance parents-enfants.',
      audience: 'Parents, tuteurs & éducateurs',
    },
    {
      title: 'Sensibilisation dans les Écoles & Communautés',
      category: 'Prévention & Relations',
      status: 'active' as const,
      statusLabel: 'Disponible Actuellement',
      description:
        'Sessions éducatives menées dans les établissements scolaires et centres de quartier pour sensibiliser aux risques des dépendances, à la santé mentale et à l’importance de demander de l’aide tôt.',
      audience: 'Écoles, enseignants & organisations de jeunesse',
    },
    {
      title: 'Révélation des Talents & Atelier Kaze',
      category: 'Talent & Expression',
      status: 'active' as const,
      statusLabel: 'Disponible Actuellement',
      description:
        'Mentorat permettant aux jeunes d’identifier leurs aptitudes artistiques, d’explorer les arts visuels et d’exprimer leur cheminement à travers une pratique digne au sein de la Collection Kaze.',
      audience: 'Jeunes artistes émergents & talents créatifs',
    },

    // IN DEVELOPMENT / PLANNED
    {
      title: 'Programme Dédié d’Art-Thérapie',
      category: 'Talent & Expression',
      status: 'planned' as const,
      statusLabel: 'En Développement',
      description:
        'Curriculum formalisé d’art-thérapie élaboré avec des spécialistes de la santé mentale et de l’art pour favoriser la guérison intérieure par la peinture, le dessin et le modelage.',
      audience: 'Initiative spécialisée en cours de structuration',
    },
    {
      title: 'Jeunesse en Primeur & Authentic Time for Winners',
      category: 'Prévention & Relations',
      status: 'planned' as const,
      statusLabel: 'En Développement',
      description:
        'Cercles d’émancipation des jeunes axés sur le leadership par les pairs, la responsabilité individuelle et l’influence mutuelle constructive pour des choix de vie sains et durables.',
      audience: 'Adolescents & diplômés du secondaire',
    },
    {
      title: 'Heure du Thé pour Parents & Papa, Pilier de Stabilité',
      category: 'Engagement Familial',
      status: 'planned' as const,
      statusLabel: 'En Développement',
      description:
        'Cercles d’entraide entre pères et mères pour s’épauler mutuellement dans la création d’un environnement familial stable, aimant et émotionnellement sécurisant.',
      audience: 'Pères et mères désireux de partager et grandir ensemble',
    },
    {
      title: 'Cercles de Parole Anonymes & Ligne d’Écoute',
      category: 'Soutien & Rétablissement',
      status: 'planned' as const,
      statusLabel: 'En Développement',
      description:
        'Projet de ligne téléphonique d’écoute confidentielle et de rencontres hebdomadaires de soutien anonyme pour les jeunes ayant besoin d’une oreille attentive sans aucune barrière.',
      audience: 'Membres de la communauté nécessitant un soutien discret',
    },

    // LONG-TERM VISION
    {
      title: 'Maison Ebenezer & Centre de Réinsertion Sociale',
      category: 'Vision à Long Terme',
      status: 'vision' as const,
      statusLabel: 'Vision à Long Terme',
      description:
        'Sanctuaire d’hébergement transitoire offrant un cadre de vie structuré, un accompagnement spirituel et des formations pratiques pour une autonomie durable et complète.',
      audience: 'Projet d’infrastructure communautaire pérenne',
    },
    {
      title: 'Galerie Publique Kaze & Atelier Communautaire',
      category: 'Vision à Long Terme',
      status: 'vision' as const,
      statusLabel: 'Vision à Long Terme',
      description:
        'Showroom permanent, atelier d’art vivant et café d’entreprise sociale à Kigali pour permettre au public de rencontrer les artistes et d’acquérir directement leurs œuvres.',
      audience: 'Grand public, amateurs d’art, mécènes & visiteurs à Kigali',
    },
    {
      title: 'Pôle Compétences & Autonomie (Allo Coach)',
      category: 'Vision à Long Terme',
      status: 'vision' as const,
      statusLabel: 'Vision à Long Terme',
      description:
        'Incubateur de formation aux métiers manuels et compétences numériques reliant les jeunes en réinsertion aux marchés de l’artisanat et au coaching professionnel.',
      audience: 'Jeunes se préparant à une insertion socio-professionnelle',
    },
  ];

  const programmes = language === 'fr' ? programmesFr : programmesEn;

  return (
    <div className="page-enter bg-slate-50 min-h-screen text-slate-900 pb-24">
      {/* Header — CLEAR & LIGHT */}
      <section className="bg-gradient-to-b from-amber-50/80 via-white to-slate-50 text-slate-900 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200 relative">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold tracking-[0.25em] uppercase text-amber-800 mb-3">
            {t('work.eyebrow')}
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-slate-950 tracking-tight leading-tight">
            {t('work.headline')}
          </h1>
          <p className="mt-6 text-base sm:text-lg text-slate-700 font-light max-w-2xl mx-auto leading-relaxed">
            {t('work.subtitle')}
          </p>
        </div>
      </section>

      {/* Critical Service Boundary Banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="bg-amber-50 border border-amber-300 p-6 sm:p-8 rounded shadow-sm flex flex-col md:flex-row items-start gap-5">
          <div className="p-3 bg-amber-500 text-slate-950 rounded-full flex-shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-amber-950">
              {t('work.boundaryTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 font-light leading-relaxed">
              <strong>{t('work.boundaryP1')}</strong> {t('work.boundaryP2')}
            </p>
          </div>
        </div>
      </section>

      {/* Pushpin Card Grid — All 13 Initiatives (Exact 3D Pushpin & Pastel Card Design) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 pt-8">
          {programmes.map((prog, idx) => {
            const theme = PIN_CARD_THEMES[idx % PIN_CARD_THEMES.length];
            return (
              <div key={prog.title} className="relative flex flex-col pt-4 group">
                {/* 3D Glossy Pushpin with colored ambient glow and shadow, centered at top */}
                <Pushpin id={`pin-${idx}`} theme={theme} />

                {/* Outer White Card Frame with rounded corners */}
                <div className="bg-white rounded-[32px] p-3 sm:p-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-stone-200/80 transition-all duration-300 group-hover:shadow-[0_18px_44px_rgba(0,0,0,0.11)] group-hover:-translate-y-1 flex flex-col flex-1">
                  {/* Inner Pastel Card */}
                  <div
                    className="rounded-[22px] px-6 sm:px-7 pt-9 pb-8 flex flex-col flex-1 min-h-[280px]"
                    style={{
                      backgroundColor: theme.bg,
                      border: `1.5px solid ${theme.border}`,
                    }}
                  >
                    {/* Title in Tall Condensed Bold Uppercase (Oswald Font) */}
                    <h3 className="font-['Oswald',sans-serif] text-[22px] sm:text-[24px] font-bold uppercase tracking-wide text-stone-950 leading-[1.18] mb-4">
                      {prog.title}
                    </h3>

                    {/* Description in Clean Geometric Sans (Plus Jakarta Sans Font) */}
                    <p className="font-['Plus_Jakarta_Sans',sans-serif] text-[13.5px] sm:text-[14px] text-stone-700 font-normal leading-[1.65]">
                      {prog.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Recommended Call to Action — CLEAR, WARM CARD */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="bg-gradient-to-r from-amber-100/80 via-yellow-50 to-amber-100/80 border border-amber-200 p-8 sm:p-12 text-center rounded-2xl space-y-6 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-amber-500 text-slate-950 mx-auto flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-slate-950">
            {t('work.ctaTitle')}
          </h2>
          <p className="text-sm sm:text-base text-slate-700 font-light leading-relaxed max-w-xl mx-auto">
            {t('work.ctaDesc')}
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact?reason=support" className="btn-accent text-xs py-3.5 px-8 w-full sm:w-auto">
              <MessageCircle className="w-4 h-4" />
              <span>{t('work.ctaContact')}</span>
            </Link>
            <a
              href="tel:+250798618524"
              className="btn-outline text-xs py-3.5 px-8 w-full sm:w-auto bg-white/80"
            >
              <Phone className="w-4 h-4" />
              <span>{t('work.ctaCall')}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
