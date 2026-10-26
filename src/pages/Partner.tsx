import { useState } from 'react';
import {
  GraduationCap,
  Users,
  Palette,
  Briefcase,
  HeartHandshake,
  ArrowRight,
  Check,
} from 'lucide-react';
import { useWebsiteSettings } from '@/lib/settings';

export default function Partner() {
  const settings = useWebsiteSettings();
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
      title: 'Youth Awareness & Prevention Workshops',
      icon: GraduationCap,
      description:
        'Collaborations with secondary schools, universities, and youth clubs to conduct peaceful masculinity discussions, non-violent communication seminars, and substance prevention workshops.',
    },
    {
      title: 'Family-Strengthening Activities',
      icon: Users,
      description:
        'Partnerships with community leaders, faith communities, and local authorities to co-host parenthood workshops, dialogue circles, and caregiver support forums.',
    },
    {
      title: 'Art Exhibition & Gallery Partnerships',
      icon: Palette,
      description:
        'Working with independent art galleries, cultural centers, and exhibition spaces to showcase youth creations, promote ethical art sales, and amplify artist voices.',
    },
    {
      title: 'Talent & Skills Opportunities',
      icon: Briefcase,
      description:
        'Engaging artisan workshops, vocational trainers, and private enterprises to create apprenticeship pathways, studio access, and market exposure for young artists.',
    },
    {
      title: 'Professional Guidance & Social-Work Collaboration',
      icon: HeartHandshake,
      description:
        'Coordinating with healthcare practitioners, accredited detoxification centers, and social workers to ensure seamless, dignified referral networks for specialized care.',
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
            Collaboration & Community Alliances
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-slate-950 tracking-tight leading-tight">
            Let’s create stronger futures together.
          </h1>
          <p className="mt-6 text-base sm:text-lg text-slate-700 font-light max-w-2xl mx-auto leading-relaxed">
            Rehema Mission Rwanda welcomes conversations with schools, community organizations, public institutions, private organizations, galleries, social workers, and individuals who share a commitment to young people and stronger families. Partnerships can help make prevention, family engagement, creative expression, and practical support more accessible.
          </p>
        </div>
      </section>

      {/* 5 Partnership Areas Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="eyebrow mb-2">How We Collaborate</p>
          <h2 className="section-title text-2xl sm:text-3xl md:text-4xl">
            Possible Partnership Areas
          </h2>
          <div className="w-16 h-[2px] bg-amber-500 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partnershipAreas.map((area) => {
            const Icon = area.icon;
            return (
              <div
                key={area.title}
                className="bg-white border border-slate-200 p-8 hover:border-amber-500 hover:shadow-lg transition-all duration-300 flex flex-col justify-between rounded-sm"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-medium text-slate-950 mb-3">
                    {area.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                    {area.description}
                  </p>
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
              Start a Partnership Conversation
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
              Tell us about your organization and how we can work together to serve young people and families in Rwanda.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 bg-emerald-50 border border-emerald-200 text-center space-y-3 rounded animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-medium text-emerald-950">
                Message Received with Gratitude
              </h3>
              <p className="text-xs sm:text-sm text-emerald-800 font-light max-w-md mx-auto">
                Thank you, {formData.name}. Our mission leadership will review your collaboration proposal and reply to {formData.email} promptly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Marie Claire Uwera"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                    Organization / Institution *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="e.g. Kigali Youth Initiative / School"
                    className="input-field"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                    Work Email *
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
                    Phone / WhatsApp *
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
                  Primary Area of Collaboration
                </label>
                <select
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="input-field cursor-pointer"
                >
                  <option value="Youth awareness and prevention workshops">Youth Awareness & Prevention Workshops</option>
                  <option value="Family-strengthening activities">Family-Strengthening Activities</option>
                  <option value="Art exhibition and gallery partnerships">Art Exhibition & Gallery Collaborations</option>
                  <option value="Talent and skills opportunities">Talent, Vocation & Skills Opportunities</option>
                  <option value="Professional guidance and social-work collaboration">Professional Guidance & Social-Work Network</option>
                  <option value="Other collaborative proposal">Other Collaborative Initiative</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                  Brief Overview of What You Have in Mind *
                </label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share a short summary of the people you serve, your location, and the collaborative initiative you would like to explore with Rehema..."
                  className="input-field resize-none"
                />
              </div>

              <button type="submit" className="btn-accent w-full text-xs py-3.5 justify-center shadow">
                <span>Send Partnership Inquiry</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
