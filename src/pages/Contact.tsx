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

export default function Contact() {
  const settings = useWebsiteSettings();
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
      setMessage(`Hello, I would like to inquire about the artwork "${title}" (Reference: ${code}). Please let me know its current availability and purchase details.`);
    }
  }, [searchParams]);

  const faqs = settings.faq || [
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
            Connect With Rehema
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-slate-950 tracking-tight leading-tight">
            Start with a conversation.
          </h1>
          <p className="mt-6 text-base sm:text-lg text-slate-700 font-light max-w-2xl mx-auto leading-relaxed">
            Whether you are looking for guidance, exploring an artwork, planning a visit, or interested in working with us, we welcome your message. Tell us briefly what you need and how we can reach you.
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
                Direct Contact
              </h2>
              <div className="w-12 h-[2px] bg-amber-500" />

              <div className="space-y-5 text-sm text-slate-700">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-amber-100 text-amber-800 flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Mission Location</p>
                    <p className="text-xs text-slate-600 mt-0.5">{settings.address || 'Kicukiro, Kigali, Rwanda'}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Visiting arranged by appointment</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-amber-100 text-amber-800 flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Phone & WhatsApp</p>
                    <a
                      href={`tel:${settings.phone || '+250798618524'}`}
                      className="text-xs text-slate-900 hover:text-amber-700 font-medium mt-0.5 block"
                    >
                      {settings.phone || '+250 798 618 524'}
                    </a>
                    <p className="text-[11px] text-slate-400 mt-0.5">Direct line to our Kigali team</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-amber-100 text-amber-800 flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Email Communication</p>
                    <a
                      href={`mailto:${settings.contact_email || 'assumptakayiranga05@gmail.com'}`}
                      className="text-xs text-slate-900 hover:text-amber-700 font-medium mt-0.5 block break-all"
                    >
                      {settings.contact_email || 'assumptakayiranga05@gmail.com'}
                    </a>
                    <p className="text-[11px] text-slate-400 mt-0.5">Assumpta Kayiranga & Mission Team</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Privacy & Confidentiality Guarantee — CLEAR LIGHT WARM */}
            <div className="bg-gradient-to-r from-amber-50 via-yellow-50/70 to-amber-50 border border-amber-200 p-6 rounded-sm space-y-2 shadow-sm">
              <div className="flex items-center gap-2 text-amber-800 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>Confidentiality & Care</span>
              </div>
              <p className="text-xs text-slate-700 font-light leading-relaxed">
                We handle every inquiry with dignity and respect. If you or a family member are navigating addiction, you can speak with us honestly without fear of judgment.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white border border-slate-200 p-8 sm:p-10 shadow-sm rounded-sm">
            <h2 className="font-serif text-2xl text-slate-950 font-medium mb-2">
              Send Us a Message
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-light mb-8 leading-relaxed">
              Fill out this simple form and tell us how we can best assist you.
            </p>

            {submitted ? (
              <div className="p-8 bg-emerald-50 border border-emerald-200 text-center space-y-3 rounded animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-medium text-emerald-950">
                  Message Sent Successfully
                </h3>
                <p className="text-xs sm:text-sm text-emerald-800 font-light max-w-md mx-auto">
                  Thank you for reaching out to Rehema Mission Rwanda. We will reply via your preferred contact method shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                    Reason for Contact *
                  </label>
                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="input-field cursor-pointer font-medium"
                  >
                    <option value="support">Seeking Support or Guidance (Individual or Family)</option>
                    <option value="artwork">Artwork Inquiry or Purchase</option>
                    <option value="visit">Schedule a Showroom Viewing in Kicukiro</option>
                    <option value="partner">Discuss a Partnership or School Collaboration</option>
                    <option value="other">General Question or Fellowship</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Optional or First Name"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                      Email Address *
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
                      Phone Number (Optional)
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
                      Preferred Reply Method
                    </label>
                    <select
                      value={preferredReply}
                      onChange={(e) => setPreferredReply(e.target.value)}
                      className="input-field cursor-pointer"
                    >
                      <option value="email">Reply via Email</option>
                      <option value="phone">Reply via Phone / WhatsApp</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us briefly how we can help you..."
                    className="input-field resize-none"
                  />
                </div>

                <div className="text-[11px] text-slate-500 leading-relaxed pt-1">
                  By submitting this form, you consent to Rehema Mission Rwanda contacting you regarding your message. We protect your privacy and never share your details.
                </div>

                <button type="submit" className="btn-accent w-full text-xs py-3.5 justify-center shadow">
                  <span>Send Message to Rehema</span>
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
          <p className="eyebrow mb-2">Common Inquiries</p>
          <h2 className="section-title text-2xl sm:text-3xl md:text-4xl">
            Frequently Asked Questions
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
