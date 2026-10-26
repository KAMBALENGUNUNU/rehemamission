import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Lock, Sparkles, ArrowRight, Heart } from 'lucide-react';
import { useWebsiteSettings } from '@/lib/settings';

export default function Footer() {
  const settings = useWebsiteSettings();

  return (
    <footer className="relative bg-gradient-to-b from-slate-900 via-slate-950 to-neutral-950 text-slate-300 overflow-hidden border-t border-amber-500/20">
      {/* Radiant ambient gradient light beams in background */}
      <div className="absolute -top-32 right-1/4 w-[500px] h-[350px] bg-gradient-to-b from-amber-500/10 via-amber-600/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 left-10 w-96 h-96 bg-gradient-to-tr from-amber-700/10 via-amber-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Top delicate amber accent hairline */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          {/* Brand & Purpose Column (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase font-semibold text-amber-400">
                Faith · Recovery · Purpose
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-white tracking-tight mt-1">
                Rehema Mission Rwanda
              </h3>
            </div>

            {/* Ebenezer Verse - organically integrated without boxed cards */}
            <div className="border-l-2 border-amber-500/60 pl-3.5 py-0.5">
              <p className="font-serif italic text-amber-300 text-sm font-normal">
                “Thus far the Lord has helped us”
              </p>
              <p className="text-[11px] uppercase tracking-wider text-slate-400 font-sans mt-0.5">
                1 Samuel 7:12 · Ebenezer
              </p>
            </div>

            <p className="text-sm text-slate-300 font-light leading-relaxed max-w-md">
              A faith-rooted, youth-centered global mission founded in 1998 in Kigali. Walking alongside young people and families facing addiction and related challenges through listening, follow-up support, prevention, and creative expression.
            </p>

            {/* Natural Organic Bridge to Kaze Collection */}
            <div className="pt-2">
              <Link
                to="/gallery"
                className="group inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-300 hover:text-amber-200 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition-transform" />
                <span>Explore Original Youth Artworks at Kaze Collection</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Quick Links Column 1: Our Mission (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold tracking-[0.22em] uppercase text-amber-300">
              Our Mission
            </h4>
            <ul className="space-y-2.5 text-sm font-light">
              <li>
                <Link to="/our-story" className="text-slate-300 hover:text-white transition-colors">
                  Our Story & Origins
                </Link>
              </li>
              <li>
                <Link to="/our-work" className="text-slate-300 hover:text-white transition-colors">
                  Programmes & Pillars
                </Link>
              </li>
              <li>
                <Link to="/our-story" className="text-slate-300 hover:text-white transition-colors">
                  Faith & Core Values
                </Link>
              </li>
              <li>
                <Link to="/partner" className="text-slate-300 hover:text-white transition-colors">
                  Partner With Us
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-slate-300 hover:text-amber-300 transition-colors inline-flex items-center gap-1.5">
                  <span>Kaze Collection</span>
                  <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">Art</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links Column 2: Involve & Support (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold tracking-[0.22em] uppercase text-amber-300">
              Get Involved
            </h4>
            <ul className="space-y-2.5 text-sm font-light">
              <li>
                <Link to="/visit" className="text-slate-300 hover:text-white transition-colors">
                  Arrange a Visit in Kigali
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-300 hover:text-white transition-colors">
                  Start a Conversation
                </Link>
              </li>
              <li>
                <Link to="/partner" className="text-slate-300 hover:text-white transition-colors">
                  Church & Ministry Links
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="text-slate-300 hover:text-white transition-colors inline-flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-rose-400" />
                  <span>Saved Artworks</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details Column (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold tracking-[0.22em] uppercase text-amber-300">
              Kigali Office
            </h4>
            <ul className="space-y-3 text-sm font-light">
              <li className="flex items-start gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-400" />
                <span>{settings.address || 'Kicukiro, Kigali, Rwanda'}</span>
              </li>
              <li className="flex items-center gap-2.5 text-slate-300">
                <Phone className="w-4 h-4 flex-shrink-0 text-amber-400" />
                <a href={`tel:${settings.phone || '+250798618524'}`} className="hover:text-amber-300 transition-colors">
                  {settings.phone || '+250 798 618 524'}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-slate-300">
                <Mail className="w-4 h-4 flex-shrink-0 text-amber-400" />
                <a href={`mailto:${settings.contact_email || 'assumptakayiranga05@gmail.com'}`} className="hover:text-amber-300 transition-colors break-all">
                  {settings.contact_email || 'assumptakayiranga05@gmail.com'}
                </a>
              </li>
            </ul>

            {/* Organic, un-boxed ethical note */}
            <p className="text-[11px] text-slate-400 font-light leading-relaxed pt-2">
              <span className="text-slate-200 font-normal">Service Boundary:</span> A social & emotional support mission. We connect individuals with accredited clinical detoxification when specialized medical care is required.
            </p>
          </div>
        </div>

        {/* Bottom Sub-Footer Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} Rehema Mission Rwanda. All rights reserved. Kicukiro, Kigali.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/contact" className="hover:text-slate-200 transition-colors">
              Privacy & Inquiries
            </Link>
            <Link to="/gallery" className="hover:text-amber-300 transition-colors">
              Kaze Collection Gallery
            </Link>
            <Link to="/admin/login" className="flex items-center gap-1.5 hover:text-amber-300 transition-colors text-[11px]">
              <Lock className="w-3 h-3 text-amber-400" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
