import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldAlert,
  Compass,
  Users,
  Palette,
  Heart,
  ShieldCheck,
  Phone,
  MessageCircle,
} from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { TRANSLATIONS, type TranslationKey } from '@/lib/translations';

export default function OurWork() {
  const { language } = useStore();
  const t = (key: TranslationKey, fallback?: string) =>
    TRANSLATIONS[language]?.[key] ?? TRANSLATIONS.en[key] ?? fallback ?? key;

  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'planned' | 'vision'>('all');

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

  const filteredProgrammes =
    activeTab === 'all'
      ? programmes
      : programmes.filter((p) => p.status === activeTab);

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

      {/* Filter Tabs */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap pb-8 border-b border-slate-200">
          {[
            { id: 'all', label: t('work.filterAll') },
            { id: 'active', label: t('work.filterActive') },
            { id: 'planned', label: t('work.filterPlanned') },
            { id: 'vision', label: t('work.filterVision') },
          ].map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${
                  active
                    ? 'bg-slate-900 text-white shadow'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-950 hover:border-slate-400'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Programme Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
          {filteredProgrammes.map((prog) => (
            <div
              key={prog.title}
              className="bg-white border border-slate-200 p-7 hover:border-amber-500 hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-5 rounded-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] tracking-wider uppercase font-semibold text-amber-700">
                    {prog.category}
                  </span>
                  <span
                    className={`text-[9px] tracking-widest uppercase font-bold px-2 py-0.5 rounded ${
                      prog.status === 'active'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : prog.status === 'planned'
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'bg-slate-100 text-slate-700 border border-slate-300'
                    }`}
                  >
                    {prog.statusLabel}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-medium text-slate-950 mb-3 leading-snug">
                  {prog.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                  {prog.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
                <span className="font-medium text-slate-700">{t('work.intendedFor')}</span> {prog.audience}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recommended Call to Action — CLEAR, WARM CARD */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="bg-gradient-to-r from-amber-100/80 via-yellow-50 to-amber-100/80 border border-amber-200 p-8 sm:p-12 text-center rounded-sm space-y-6 shadow-sm">
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
