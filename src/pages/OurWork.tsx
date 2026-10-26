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

export default function OurWork() {
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'planned' | 'vision'>('all');

  const programmes = [
    // AVAILABLE NOW / CURRENT WORK
    {
      title: 'One-on-One Consultations & Emotional Follow-Up',
      category: 'Support & Recovery',
      status: 'active',
      statusLabel: 'Available Now',
      description:
        'Individual guidance and attentive listening for young people navigating substance use and personal challenges. Providing consistent, non-judgmental presence and emotional accompaniment.',
      audience: 'Young individuals & youth seeking a confidential first step',
    },
    {
      title: 'Post-Detoxification Follow-Up & Reintegration',
      category: 'Support & Recovery',
      status: 'active',
      statusLabel: 'Available Now',
      description:
        'Support and structured check-ins for individuals during the transition following specialized detoxification or clinical care, helping them rebuild daily habits and community ties.',
      audience: 'Individuals in recovery transitions',
    },
    {
      title: 'Peaceful Masculinity Workshops',
      category: 'Prevention & Relationships',
      status: 'active',
      statusLabel: 'Available Now',
      description:
        'Interactive community workshops that explore healthy masculinity, non-violent communication, emotional resilience, and constructive ways for young men to relate to one another and their families.',
      audience: 'Young men, youth groups & community cohorts',
    },
    {
      title: 'Parenthood Workshops & Family Dialogue',
      category: 'Family Engagement',
      status: 'active',
      statusLabel: 'Available Now',
      description:
        'Facilitated group conversations creating safe space for parents and caregivers to discuss family tensions, understand substance use challenges, and rebuild trusting parent-child bonds.',
      audience: 'Parents, guardians & caregivers',
    },
    {
      title: 'School & Community Awareness Discussions',
      category: 'Prevention & Relationships',
      status: 'active',
      statusLabel: 'Available Now',
      description:
        'Educational outreach sessions conducted in schools and community centers, raising awareness about addiction risks, mental wellbeing, and seeking help early.',
      audience: 'Schools, educators & youth organizations',
    },
    {
      title: 'Talent Discovery & Kaze Collection Artistry',
      category: 'Talent & Self-Expression',
      status: 'active',
      statusLabel: 'Available Now',
      description:
        'Mentorship that helps young people recognize their natural abilities, explore visual art and craft, and express their personal journey through dignified creative practice under Kaze Collection.',
      audience: 'Emerging youth artists & creative talents',
    },

    // IN DEVELOPMENT / PLANNED
    {
      title: 'Dedicated Arts-Based Therapy Programme',
      category: 'Talent & Self-Expression',
      status: 'planned',
      statusLabel: 'In Development',
      description:
        'A formalised arts-as-therapy curriculum designed with creative specialists to provide structured therapeutic healing through painting, drawing, and sculpting.',
      audience: 'Planned specialized cohort initiative',
    },
    {
      title: 'Jeunesse en Primeur & Authentic Time for Winners',
      category: 'Prevention & Relationships',
      status: 'planned',
      statusLabel: 'In Development',
      description:
        'Youth empowerment circles focusing on peer leadership, personal accountability, and positive peer influence for sustainable lifestyle choices.',
      audience: 'Adolescents & secondary school leavers',
    },
    {
      title: 'Tea-Time for Parents & Dad, Industry of Stability',
      category: 'Family Engagement',
      status: 'planned',
      statusLabel: 'In Development',
      description:
        'Dedicated peer circles for fathers and mothers to support one another in creating grounded, emotionally stable household environments.',
      audience: 'Fathers and mothers seeking mutual fellowship',
    },
    {
      title: 'Anonymous Discussion Circles & Community Helpline',
      category: 'Support & Recovery',
      status: 'planned',
      statusLabel: 'In Development',
      description:
        'A planned confidential telephone listening helpline and weekly anonymous support circles for young people needing immediate guidance without barriers.',
      audience: 'Community members needing confidential access',
    },

    // LONG-TERM VISION
    {
      title: 'Ebenezer House & Social Reinsertion Center',
      category: 'Long-term Vision',
      status: 'vision',
      statusLabel: 'Long-term Vision',
      description:
        'A dedicated sanctuary facility offering transitional residential support, daily routines, spiritual care, and skills training for sustained independence.',
      audience: 'Long-term community infrastructure goal',
    },
    {
      title: 'Kaze Collection Public Gallery & Community Atelier',
      category: 'Long-term Vision',
      status: 'vision',
      statusLabel: 'Long-term Vision',
      description:
        'A permanent public showroom, working atelier, and social enterprise cafe in Kigali where the public can engage directly with original artworks from Kaze Collection and support young artisans from Rehema.',
      audience: 'Public, art lovers, patrons & supporters in Kigali',
    },
    {
      title: 'Empowerment and Skills Hub (Allo Coach)',
      category: 'Long-term Vision',
      status: 'vision',
      statusLabel: 'Long-term Vision',
      description:
        'A vocational and digital skills training incubator connecting youth in recovery to market opportunities, craftsmanship apprenticeships, and career coaching.',
      audience: 'Youth preparing for sustainable livelihoods',
    },
  ];

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
            Our Approach & Initiatives
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-slate-950 tracking-tight leading-tight">
            Support that sees the whole person.
          </h1>
          <p className="mt-6 text-base sm:text-lg text-slate-700 font-light max-w-2xl mx-auto leading-relaxed">
            The path through addiction and related challenges can affect identity, relationships, confidence, and family life. Rehema’s approach brings listening, follow-up, family engagement, prevention, and talent discovery together — while recognizing when specialized care is needed.
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
              Important Service Boundary
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 font-light leading-relaxed">
              <strong>Rehema Mission Rwanda is not a rehabilitation center.</strong> We do not provide clinical treatment or guarantee medical recovery outcomes. When specialized clinical care is needed, our experienced team helps individuals and families identify suitable detoxification and rehabilitation services in Rwanda, and walks alongside them with follow-up emotional support and family engagement throughout recovery.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap pb-8 border-b border-slate-200">
          {[
            { id: 'all', label: 'All Initiatives' },
            { id: 'active', label: 'Available Now' },
            { id: 'planned', label: 'In Development' },
            { id: 'vision', label: 'Long-Term Vision' },
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
                <span className="font-medium text-slate-700">Intended for:</span> {prog.audience}
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
            Looking for guidance for yourself or someone you care about?
          </h2>
          <p className="text-sm sm:text-base text-slate-700 font-light leading-relaxed max-w-xl mx-auto">
            Contact Rehema to discuss your situation and the support or referral options currently available. All conversations are handled with dignity, warmth, and complete discretion.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact?reason=support" className="btn-accent text-xs py-3.5 px-8 w-full sm:w-auto">
              <MessageCircle className="w-4 h-4" />
              <span>Contact Rehema Directly</span>
            </Link>
            <a
              href="tel:+250798618524"
              className="btn-outline text-xs py-3.5 px-8 w-full sm:w-auto bg-white/80"
            >
              <Phone className="w-4 h-4" />
              <span>Call +250 798 618 524</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
