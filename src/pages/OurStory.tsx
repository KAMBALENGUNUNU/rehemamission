import { Link } from 'react-router-dom';
import { ArrowRight, Shield, HeartHandshake, Eye, Sparkles, CheckCircle2 } from 'lucide-react';
import { useWebsiteSettings } from '@/lib/settings';

export default function OurStory() {
  const settings = useWebsiteSettings();

  const values = [
    {
      title: 'Empowerment',
      description: 'We help people recognize their strengths and take meaningful steps forward.',
      icon: Sparkles,
    },
    {
      title: 'Respect and Dignity',
      description: 'We treat every person with compassion, without reducing them to their past.',
      icon: HeartHandshake,
    },
    {
      title: 'Integrity and Decency',
      description: 'We communicate honestly, act responsibly, and protect trust.',
      icon: Shield,
    },
    {
      title: 'Faith-Driven Success',
      description: 'Our faith in Jesus Christ informs our purpose, choices, and commitment to serving others.',
      icon: Eye,
    },
  ];

  return (
    <div className="page-enter bg-slate-50 min-h-screen text-slate-900 pb-24">
      {/* Page Header — CLEAR & LIGHT */}
      <section className="bg-gradient-to-b from-amber-50/80 via-white to-slate-50 text-slate-900 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs tracking-[0.2em] uppercase font-semibold font-sans mb-4 shadow-sm">
            <span>Our Foundation · Est. 1998</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-slate-950 tracking-tight leading-tight">
            {settings.about_headline || 'A place to be heard. A path toward possibility.'}
          </h1>
          <p className="mt-6 text-base sm:text-lg text-slate-700 font-light max-w-2xl mx-auto leading-relaxed">
            Rehema Mission Rwanda began with a belief: when young people are listened to, respected, and supported, they can begin to see beyond the challenges in front of them.
          </p>
        </div>
      </section>

      {/* Main Narrative Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 md:pt-16">
        <div className="bg-white border border-slate-200 p-8 sm:p-12 md:p-16 shadow-sm space-y-8">
          <div>
            <p className="eyebrow mb-2">Our Origins</p>
            <h2 className="section-title text-2xl sm:text-3xl md:text-4xl">
              From Listening to New Beginnings
            </h2>
            <div className="w-16 h-[2px] bg-amber-500 mt-4" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="relative aspect-[3/4] overflow-hidden shadow-lg border border-slate-200">
                <img
                  src="/artworks/founder-portrait.jpg"
                  alt="Assumpta Kayiranga — Founder of Rehema Mission Rwanda"
                  className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <p className="font-serif text-lg font-medium text-amber-200">Assumpta Kayiranga</p>
                  <p className="text-xs text-slate-200 font-light">Founder, Rehema Mission Rwanda (Est. 1998)</p>
                  <p className="text-[11px] text-amber-300/90 mt-0.5 font-light">Original portrait by Kaze Collection youth</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 space-y-5 text-slate-700 font-light text-base leading-relaxed">
              <p>
                Founded by <strong>Assumpta Kayiranga</strong> in 1998, in the years following the 1994 genocide against the Tutsi in Rwanda, Rehema Mission Rwanda grew from a commitment to listen to young people and respond to their needs. Many young people carry difficult questions about identity, belonging, relationships, and their future. They need more than judgment; they need space to speak, caring guidance, and adults who take their experiences seriously.
              </p>
              <p>
                Our work focuses on young people and families facing substance use and related challenges. We support individuals as they navigate recovery, help connect them with specialized services when needed, encourage healthier relationships, and strengthen the role of parents and communities. We also believe that every person has talents worth discovering and a future worth working toward.
              </p>
            </div>
          </div>

          {/* Ebenezer Faith Callout — CLEAR, WARM AMBER CARD */}
          <div className="bg-gradient-to-r from-amber-50 via-yellow-50/70 to-amber-50 border border-amber-300 p-8 sm:p-10 rounded-sm space-y-4 my-8 shadow-sm">
            <div className="flex items-center gap-2 text-amber-800 text-xs tracking-[0.2em] uppercase font-bold">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Faith & The Meaning of Ebenezer</span>
            </div>
            <p className="font-serif italic text-2xl sm:text-3xl text-amber-950 font-normal">
              “Thus far the Lord has helped us”
            </p>
            <p className="text-xs uppercase tracking-widest text-slate-500 font-medium">
              1 Samuel 7:12
            </p>
            <p className="text-sm sm:text-base text-slate-700 font-light leading-relaxed pt-2 border-t border-amber-200">
              Our mission is rooted in faith in Jesus Christ and inspired by this biblical reminder. For us, Ebenezer is a living testament that the past does not have to be the end of the story. With supportive community, personal responsibility, and God-given purpose, a brand new chapter can begin.
            </p>
          </div>

          {/* Vision & Mission Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-sm">
              <h3 className="font-serif text-xl font-medium text-slate-900 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-amber-600" />
                <span>Our Vision</span>
              </h3>
              <p className="text-sm text-slate-600 font-light leading-relaxed">
                Young people and families strengthened by hope, trust, and purpose — able to build healthier relationships and contribute positively to their communities.
              </p>
            </div>

            <div className="p-6 bg-slate-50 border border-slate-200 rounded-sm">
              <h3 className="font-serif text-xl font-medium text-slate-900 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-amber-600" />
                <span>Our Mission</span>
              </h3>
              <p className="text-sm text-slate-600 font-light leading-relaxed">
                To inspire hope by helping individuals in Rwanda navigate addiction and related challenges, rebuild confidence and relationships, discover their strengths, and move toward sustainable personal and community well-being.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="text-center mb-12">
          <p className="eyebrow mb-2">Guiding Principles</p>
          <h2 className="section-title text-2xl sm:text-3xl md:text-4xl">Our Core Values</h2>
          <div className="w-16 h-[2px] bg-amber-500 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                className="bg-white border border-slate-200 p-8 hover:border-amber-500 hover:shadow-md transition-all duration-300 rounded-sm"
              >
                <div className="w-12 h-12 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-medium text-slate-900 mb-2">
                  {v.title}
                </h3>
                <p className="text-sm text-slate-600 font-light leading-relaxed">
                  {v.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Next Step Call to Action */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="bg-gradient-to-r from-amber-100/80 via-yellow-50 to-amber-100/80 border border-amber-200 p-8 sm:p-12 text-center rounded-sm flex flex-col items-center justify-center space-y-4 shadow-sm">
          <h3 className="font-serif text-2xl sm:text-3xl font-light text-slate-950">
            Want to see how these values translate into everyday practice?
          </h3>
          <p className="text-sm sm:text-base font-light max-w-xl text-slate-700 leading-relaxed">
            Explore our active community programmes, family workshops, and youth support initiatives.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-4">
            <Link to="/our-work" className="btn-primary text-xs py-3 px-8">
              <span>Explore Our Programmes</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/gallery" className="btn-outline text-xs py-3 px-8 bg-white/80">
              <span>View The Art Gallery</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
