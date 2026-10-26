import { useState } from 'react';
import {
  Clock,
  MapPin,
  Phone,
  Shield,
  ArrowRight,
  Check,
} from 'lucide-react';
import { useWebsiteSettings } from '@/lib/settings';

export default function Visit() {
  const settings = useWebsiteSettings();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    artworksOfInterest: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        artworksOfInterest: '',
        notes: '',
      });
    }, 4000);
  };

  return (
    <div className="page-enter bg-slate-50 min-h-screen text-slate-900 pb-24">
      {/* Header — CLEAR & LIGHT */}
      <section className="bg-gradient-to-b from-amber-50/80 via-white to-slate-50 text-slate-900 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200 relative">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold tracking-[0.25em] uppercase text-amber-800 mb-3">
            Kaze Collection Atelier & Showroom Appointments
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-slate-950 tracking-tight leading-tight">
            See the work in person.
          </h1>
          <p className="mt-6 text-base sm:text-lg text-slate-700 font-light max-w-2xl mx-auto leading-relaxed">
            A photograph reveals part of an artwork; seeing it in person reveals its true scale, rich texture, and human presence. Kaze Collection and Rehema Mission Rwanda are located in Kicukiro, Kigali. Please contact us in advance so our team can prepare the atelier and have your preferred pieces ready.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Visit Guidance & Information */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-slate-200 p-8 shadow-sm space-y-6 rounded-sm">
              <h2 className="font-serif text-2xl text-slate-950 font-medium">
                Viewing Arrangements
              </h2>
              <div className="w-12 h-[2px] bg-amber-500" />

              <p className="text-sm text-slate-600 font-light leading-relaxed">
                To ensure a thoughtful experience and ensure the specific artworks you wish to view are mounted and available, visits to our Kicukiro office and atelier are arranged by prior appointment.
              </p>

              <div className="space-y-4 pt-2 text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-slate-900">Location</p>
                    <p className="text-xs text-slate-600">{settings.address || 'Kicukiro, Kigali, Rwanda'}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Exact directions provided upon confirmation</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-slate-900">Appointment Hours</p>
                    <p className="text-xs text-slate-600">Monday – Saturday, by arranged time</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-slate-900">Direct Contact</p>
                    <p className="text-xs text-slate-600">{settings.phone || '+250 798 618 524'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Respectful Atmosphere Card — CLEAR LIGHT WARM */}
            <div className="bg-gradient-to-r from-amber-50 via-yellow-50/70 to-amber-50 border border-amber-200 p-6 rounded-sm space-y-3 shadow-sm">
              <div className="flex items-center gap-2 text-amber-800 text-xs tracking-wider uppercase font-bold">
                <Shield className="w-4 h-4 text-amber-600" />
                <span>Our Setting</span>
              </div>
              <p className="text-xs text-slate-700 font-light leading-relaxed">
                Our space is a quiet, working environment dedicated to mentoring youth, community listening, and studio work. We look forward to welcoming you warmly.
              </p>
            </div>
          </div>

          {/* Right: Appointment Request Form */}
          <div className="lg:col-span-7 bg-white border border-slate-200 p-8 sm:p-10 shadow-sm rounded-sm">
            <h2 className="font-serif text-2xl text-slate-950 font-medium mb-2">
              Request an Art Viewing Appointment
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-light mb-8 leading-relaxed">
              Complete the form below and our team will get back to you within 24 hours to confirm appointment time and location details.
            </p>

            {submitted ? (
              <div className="p-8 bg-emerald-50 border border-emerald-200 text-center space-y-3 rounded animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-medium text-emerald-950">
                  Appointment Request Received
                </h3>
                <p className="text-xs sm:text-sm text-emerald-800 font-light max-w-md mx-auto">
                  Thank you, {formData.name || 'friend'}. We have received your request and will contact you via email or phone to confirm your visit to Kicukiro.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Jean-Paul Kagabo"
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
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                      Phone Number (WhatsApp) *
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
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                      Preferred Date & Time Window
                    </label>
                    <input
                      type="text"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      placeholder="e.g. Next Tuesday morning"
                      className="input-field"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                    Artworks You Wish to View (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.artworksOfInterest}
                    onChange={(e) => setFormData({ ...formData, artworksOfInterest: e.target.value })}
                    placeholder="e.g. Mururanyi, Light of Ebenezer, or all acrylic paintings"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                    Any Additional Notes or Inquiries
                  </label>
                  <textarea
                    rows={4}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Tell us if you are an art enthusiast, supporter, representing an organization, or have specific schedule needs..."
                    className="input-field resize-none"
                  />
                </div>

                <button type="submit" className="btn-accent w-full text-xs py-3.5 justify-center shadow">
                  <span>Send Viewing Appointment Request</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
