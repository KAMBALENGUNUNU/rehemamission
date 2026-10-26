import { Link } from 'react-router-dom';
import { Scissors, Globe, Sparkles, Star, MapPin, ExternalLink } from 'lucide-react';
import { useWebsiteSettings } from '@/lib/settings';

export default function About() {
  const settings = useWebsiteSettings();

  return (
    <div className="page-enter">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img
          src="https://images.pexels.com/photos/36897262/pexels-photo-36897262.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="African bride"
          className="w-full h-full object-cover animate-ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/50 to-ink-950/70" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <p className="eyebrow text-champagne-200 mb-4">Our Story</p>
          <h1 className="font-serif text-5xl md:text-7xl font-light text-white tracking-tight">
            {settings.hero_title_line1 || 'Dressed in Africa,'}
            <br />
            <span className="italic text-champagne-200">
              {settings.hero_title_line2 || 'worn by the world'}
            </span>
          </h1>
        </div>
      </section>

      {/* Brand story */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative overflow-hidden aspect-[4/5] bg-champagne-100">
            <img
              src="https://images.pexels.com/photos/19229118/pexels-photo-19229118.jpeg?auto=compress&cs=tinysrgb&w=1000"
              alt="Bridal lace detail"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="eyebrow mb-4">{settings.about_subtitle || "The Brenda's Bridal Philosophy"}</p>
            <h2 className="section-title mb-8">{settings.about_headline || 'A Legacy of Elegance'}</h2>
            <div className="space-y-4 text-ink-600 font-light leading-relaxed">
              <p>
                {settings.about_story_p1 ||
                  "Brenda's Bridal was born in the heart of Kigali, Rwanda, with a singular vision: to create bridal wear that celebrates the beauty, grace, and heritage of the African bride."}
              </p>
              <p>
                {settings.about_story_p2 ||
                  "Every gown is 100% made to order, crafted by skilled artisans who pour generations of tailoring expertise into each stitch. We source only the finest French lace, silk mikado, and hand-embroidered beading to ensure every piece is a true work of art."}
              </p>
              <p>
                {settings.about_story_p3 ||
                  "From our Kigali atelier to brides across the globe, we believe every woman deserves to feel extraordinary on her wedding day. That is the Brenda's promise."}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6 mt-10">
              <div className="border-l-2 border-champagne-500 pl-4">
                <p className="font-serif text-3xl text-ink-900">100%</p>
                <p className="text-xs tracking-[0.15em] uppercase text-ink-400 mt-1">Made to Order</p>
              </div>
              <div className="border-l-2 border-champagne-500 pl-4">
                <p className="font-serif text-3xl text-ink-900">Kigali</p>
                <p className="text-xs tracking-[0.15em] uppercase text-ink-400 mt-1">Rwanda · Africa</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 bg-champagne-100/50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="eyebrow mb-4">What We Stand For</p>
            <h2 className="section-title">Our Values</h2>
            <div className="w-16 h-px bg-champagne-500 mx-auto mt-6" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Scissors, title: 'Bespoke Tailoring', desc: 'Every gown is made to your exact measurements and preferences.' },
              { icon: Globe, title: 'Worldwide Shipping', desc: 'From Kigali to your doorstep, wherever you are in the world.' },
              { icon: Sparkles, title: 'Premium Fabrics', desc: 'Only the finest French lace, silk, and hand-embroidered details.' },
              { icon: Star, title: 'Built to Last', desc: 'Heirloom-quality craftsmanship to be treasured for generations.' },
            ].map((v, i) => (
              <div key={v.title} className="text-center p-8 bg-champagne-50 animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <v.icon className="w-10 h-10 mx-auto mb-5 text-champagne-600" strokeWidth={1.2} />
                <h3 className="font-serif text-xl text-ink-900 mb-3">{v.title}</h3>
                <p className="text-sm text-ink-500 font-light leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Location */}
      <section className="py-24 px-4 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne-200/60 border border-champagne-400/40 text-ink-800 text-xs tracking-[0.2em] uppercase mb-4">
          <MapPin className="w-3.5 h-3.5 text-champagne-700" />
          <span>{settings.location_name || 'Gishushu · Kigali, Rwanda'}</span>
        </div>
        <h2 className="font-serif text-4xl md:text-5xl font-light text-ink-900 mb-5">
          Visit Our Kigali Atelier
        </h2>
        <p className="text-ink-600 font-light max-w-xl mx-auto mb-10 leading-relaxed">
          Located in {settings.location_name || 'Gishushu, Kigali'}. Schedule a private fitting consultation or visit our atelier to explore our bridal creations in person.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(settings.address || 'Gishushu, Kigali, Rwanda')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2.5 shadow-lg hover:shadow-champagne-400/20"
          >
            <MapPin className="w-4 h-4 text-gold-400" />
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
          <Link to="/contact" className="btn-outline">
            Book Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
