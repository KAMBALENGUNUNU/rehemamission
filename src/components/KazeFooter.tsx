import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Lock, Palette, ArrowRight, Heart, Sparkles, CheckCircle2 } from 'lucide-react';
import { useWebsiteSettings } from '@/lib/settings';

export default function KazeFooter() {
  const settings = useWebsiteSettings();

  return (
    <footer className="relative bg-gradient-to-b from-stone-950 via-slate-950 to-neutral-950 text-stone-300 overflow-hidden border-t border-amber-500/30">
      {/* Ambient artistic studio light glow in background */}
      <div className="absolute -top-32 left-1/3 w-[600px] h-[350px] bg-gradient-to-b from-amber-500/15 via-amber-700/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 right-10 w-80 h-80 bg-gradient-to-tl from-amber-600/10 via-amber-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Top delicate amber accent hairline */}
      <div className="h-[2px] w-full bg-gradient-to-r from-amber-500/20 via-amber-400 to-amber-500/20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          {/* Atelier Brand & Story (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] tracking-[0.25em] uppercase font-semibold mb-2">
                <Palette className="w-3 h-3 text-amber-400" />
                <span>Atelier Rehema · Kigali</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl font-light text-white tracking-tight">
                Kaze Collection
              </h3>
            </div>

            <p className="text-sm text-stone-300 font-light leading-relaxed max-w-md">
              Where artistic mastery meets human restoration. Every original painting, drawing, and mixed-media piece in Kaze Collection has been created by young people rebuilding their lives with hope and dignity.
            </p>

            {/* Clear, elegant bridge back to parent mission */}
            <div className="pt-2 border-t border-white/10 max-w-md">
              <Link
                to="/our-story"
                className="group inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-300 hover:text-amber-200 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition-transform" />
                <span>An initiative of Rehema Mission Rwanda · Learn Our Story</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Mediums & Catalog Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold tracking-[0.22em] uppercase text-amber-300">
              Mediums
            </h4>
            <ul className="space-y-2.5 text-sm font-light">
              <li>
                <Link to="/gallery" className="text-stone-300 hover:text-white transition-colors">
                  Acrylic & Clay Canvas
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-stone-300 hover:text-white transition-colors">
                  Charcoal & Graphite
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-stone-300 hover:text-white transition-colors">
                  Mixed Media & Sisal
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-stone-300 hover:text-white transition-colors">
                  Rwandan Bark Cloth
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-stone-300 hover:text-amber-300 transition-colors font-medium">
                  View All Artworks →
                </Link>
              </li>
            </ul>
          </div>

          {/* Gallery Experience & Services (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold tracking-[0.22em] uppercase text-amber-300">
              Showroom & Service
            </h4>
            <ul className="space-y-2.5 text-sm font-light">
              <li>
                <Link to="/visit" className="text-stone-300 hover:text-white transition-colors">
                  Atelier Appointments
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="text-stone-300 hover:text-white transition-colors inline-flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-rose-400" />
                  <span>Saved Pieces</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-stone-300 hover:text-white transition-colors">
                  Inquire on Availability
                </Link>
              </li>
              <li>
                <Link to="/partner" className="text-stone-300 hover:text-white transition-colors">
                  Institutional Patrons
                </Link>
              </li>
            </ul>
          </div>

          {/* Atelier Contact & Location (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold tracking-[0.22em] uppercase text-amber-300">
              Kicukiro Atelier
            </h4>
            <ul className="space-y-3 text-sm font-light">
              <li className="flex items-start gap-2.5 text-stone-300">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-400" />
                <span>{settings.address || 'Kicukiro, Kigali, Rwanda'}</span>
              </li>
              <li className="flex items-center gap-2.5 text-stone-300">
                <Phone className="w-4 h-4 flex-shrink-0 text-amber-400" />
                <a href={`tel:${settings.phone || '+250798618524'}`} className="hover:text-amber-300 transition-colors">
                  {settings.phone || '+250 798 618 524'}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-stone-300">
                <Mail className="w-4 h-4 flex-shrink-0 text-amber-400" />
                <a href={`mailto:${settings.contact_email || 'assumptakayiranga05@gmail.com'}`} className="hover:text-amber-300 transition-colors break-all">
                  {settings.contact_email || 'assumptakayiranga05@gmail.com'}
                </a>
              </li>
            </ul>

            {/* Ethical Sales Assurance */}
            <div className="flex items-center gap-2 text-xs text-stone-400 pt-2 font-light">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>Ethical acquisition · Direct youth support</span>
            </div>
          </div>
        </div>

        {/* Bottom Sub-Footer Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>
            © {new Date().getFullYear()} Kaze Collection. All artworks created under Rehema Mission Rwanda.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/" className="hover:text-stone-200 transition-colors">
              Rehema Mission Home
            </Link>
            <Link to="/our-story" className="hover:text-stone-200 transition-colors">
              Our Story
            </Link>
            <Link to="/contact" className="hover:text-stone-200 transition-colors">
              Contact
            </Link>
            <Link to="/admin/login" className="flex items-center gap-1.5 hover:text-amber-300 transition-colors text-[11px]">
              <Lock className="w-3 h-3 text-amber-400" />
              <span>Kaze Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
