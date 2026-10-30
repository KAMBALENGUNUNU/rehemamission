import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Heart,
  Sparkles,
  Users,
  Compass,
  Palette,
  ShieldCheck,
  Calendar,
  MessageCircle,
  Award,
} from 'lucide-react';
import { useWebsiteSettings } from '@/lib/settings';
import { REHEMA_ARTWORKS, type Artwork } from '@/lib/artworks';
import { useStore } from '@/store/StoreContext';
import { formatPrice } from '@/lib/utils';
import AnnouncementBar from '@/components/AnnouncementBar';

export default function Home() {
  const settings = useWebsiteSettings();
  const { toggleFavorite, isFavorite } = useStore();
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  const featuredArtworks = REHEMA_ARTWORKS.slice(0, 4);

  return (
    <div className="page-enter bg-slate-50 min-h-screen text-slate-900">
      {/* 1. HERO SECTION — FULL-WIDTH IMAGE WITH CENTERED TEXT DIRECTLY ON TOP */}
      <section className="relative w-full min-h-[85vh] sm:min-h-[88vh] lg:min-h-[92vh] flex items-center justify-center overflow-hidden border-b border-slate-200/80 bg-slate-950">
        {/* Full-Width Artwork Canvas */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src={REHEMA_ARTWORKS[0].image}
            alt={REHEMA_ARTWORKS[0].title}
            className="w-full h-full object-cover object-center transform scale-100 transition-transform duration-1000"
          />
          {/* Subtle balanced dark vignette overlay: keeps artwork vivid and visible, while white typography has strong readability */}
          <div className="absolute inset-0 bg-slate-950/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-slate-950/50" />
        </div>

        {/* Centered Content Directly on the Image (No Container Box) */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center flex flex-col items-center">
          {/* Scripture badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-amber-300 text-xs tracking-[0.2em] uppercase font-semibold font-sans mb-6 shadow-md animate-fade-up">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>1 Samuel 7:12 · Ebenezer</span>
          </div>

          {/* Centered Main Title */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white tracking-tight leading-[1.08] drop-shadow-md animate-fade-up">
            {settings.hero_title_line1 || 'A difficult chapter'}
            <br />
            <span className="italic font-normal text-amber-300">
              {settings.hero_title_line2 || 'does not define a whole life.'}
            </span>
          </h1>

          {/* Centered Subtitle */}
          <p
            className="mt-6 text-base sm:text-lg md:text-xl text-slate-100 font-light leading-relaxed max-w-2xl mx-auto drop-shadow animate-fade-up"
            style={{ animationDelay: '0.12s' }}
          >
            {settings.hero_subtitle ||
              'Rehema Mission Rwanda walks alongside young people and families facing addiction and life challenges. Through listening, restorative care, and creative mastery in Kaze Collection, we help youth rediscover purpose and self-worth.'}
          </p>

          {/* Centered CTAs */}
          <div
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto animate-fade-up"
            style={{ animationDelay: '0.24s' }}
          >
            <Link
              to="/gallery"
              className="btn-accent shadow-lg text-xs sm:text-sm px-8 py-3.5 text-center font-semibold uppercase tracking-wider"
            >
              <span>Explore Kaze Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/our-story"
              className="px-8 py-3.5 rounded text-xs sm:text-sm font-semibold tracking-wider uppercase text-white border border-white/40 hover:bg-white/15 hover:border-white transition-all backdrop-blur-sm"
            >
              <span>Discover Our Mission</span>
            </Link>
          </div>

          {/* Centered Trust Subtext */}
          <div className="mt-8 pt-6 border-t border-white/20 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-slate-200 font-sans">
            <span className="font-semibold text-white">Est. 1998</span>
            <span>•</span>
            <span>Kicukiro, Kigali</span>
            <span>•</span>
            <span className="font-medium text-amber-300">Kaze Collection Art Atelier</span>
          </div>
        </div>
      </section>

      {/* 2. ANNOUNCEMENT RIBBON */}
      <AnnouncementBar />

      {/* 3. SECTION 1: A MISSION BUILT ON LISTENING */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Image composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] rounded-none overflow-hidden shadow-xl bg-slate-100 border border-slate-200">
              <img
                src="/artworks/founder-portrait.jpg"
                alt="Mama Assumpta Kayiranga — Founder of Rehema Mission Rwanda"
                className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="font-serif text-xl italic text-amber-200">
                  “Listening comes before advice.”
                </p>
                <p className="text-xs uppercase tracking-wider text-slate-200 mt-1 font-medium">
                  Mama Assumpta Kayiranga · Founder (Est. 1998)
                </p>
                <p className="text-[11px] text-amber-300/90 font-light">
                  Original portrait painted by Kaze Collection youth
                </p>
              </div>
            </div>
            {/* Ambient accent square */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-amber-200/50 -z-10 hidden sm:block rounded" />
          </div>

          {/* Copy block */}
          <div className="lg:col-span-7 space-y-6">
            <p className="eyebrow">Our Philosophy</p>
            <h2 className="section-title">
              Everyone deserves to be heard.
            </h2>
            <div className="w-16 h-[2px] bg-amber-500" />
            <p className="text-base sm:text-lg text-slate-700 font-light leading-relaxed">
              A young person is more than a struggle, a mistake, or a difficult season. We create space for honest conversations, supportive relationships, and practical next steps — helping young people and families rebuild trust and see new possibilities.
            </p>
            <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
              Founded in 1998 by Assumpta Kayiranga in the aftermath of the 1994 genocide against the Tutsi in Rwanda, Rehema Mission Rwanda grew from a fundamental conviction: when people are met with genuine respect and listened to without condemnation, healing begins.
            </p>

            <div className="pt-4">
              <Link
                to="/our-story"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase text-slate-900 hover:text-amber-700 transition-colors group"
              >
                <span>Meet Rehema Mission Rwanda</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECTION 2: WHAT WE DO (4 PILLARS) */}
      <section className="py-20 md:py-28 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="eyebrow mb-3">Our Core Pillars</p>
            <h2 className="section-title">What We Do</h2>
            <p className="text-sm sm:text-base text-slate-600 font-light mt-4">
              Holistic support designed to strengthen individuals, rebuild family relationships, and open sustainable paths forward.
            </p>
            <div className="w-16 h-[2px] bg-amber-500 mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Card 1 */}
            <div className="p-8 bg-slate-50 border border-slate-200 hover:border-amber-500 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group rounded-sm">
              <div>
                <div className="w-12 h-12 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-medium text-slate-900 mb-3">
                  Support & Follow-Up
                </h3>
                <p className="text-sm text-slate-600 font-light leading-relaxed">
                  Guidance for individuals navigating addiction and the steps that follow specialized care.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-200/80">
                <Link
                  to="/our-work"
                  className="text-xs font-semibold tracking-wider uppercase text-slate-900 hover:text-amber-700 inline-flex items-center gap-1.5"
                >
                  <span>Explore Support</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-8 bg-slate-50 border border-slate-200 hover:border-amber-500 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group rounded-sm">
              <div>
                <div className="w-12 h-12 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-medium text-slate-900 mb-3">
                  Prevention & Relationships
                </h3>
                <p className="text-sm text-slate-600 font-light leading-relaxed">
                  Awareness, peaceful masculinity, and healthier ways for young people to relate to one another.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-200/80">
                <Link
                  to="/our-work"
                  className="text-xs font-semibold tracking-wider uppercase text-slate-900 hover:text-amber-700 inline-flex items-center gap-1.5"
                >
                  <span>Explore Prevention</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-8 bg-slate-50 border border-slate-200 hover:border-amber-500 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group rounded-sm">
              <div>
                <div className="w-12 h-12 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-medium text-slate-900 mb-3">
                  Family Engagement
                </h3>
                <p className="text-sm text-slate-600 font-light leading-relaxed">
                  Workshops and conversations that help parents and caregivers strengthen family relationships.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-200/80">
                <Link
                  to="/our-work"
                  className="text-xs font-semibold tracking-wider uppercase text-slate-900 hover:text-amber-700 inline-flex items-center gap-1.5"
                >
                  <span>Explore Family Work</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 4 */}
            <div className="p-8 bg-slate-50 border border-slate-200 hover:border-amber-500 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group rounded-sm">
              <div>
                <div className="w-12 h-12 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                  <Palette className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-medium text-slate-900 mb-3">
                  Talent & Expression
                </h3>
                <p className="text-sm text-slate-600 font-light leading-relaxed">
                  Opportunities to recognize strengths, explore talents, and communicate through creative work.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-200/80">
                <Link
                  to="/gallery"
                  className="text-xs font-semibold tracking-wider uppercase text-slate-900 hover:text-amber-700 inline-flex items-center gap-1.5"
                >
                  <span>Discover the Art</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SECTION 3: THE ART GALLERY SHOWCASE */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <p className="eyebrow mb-3">Kaze Collection · Art by Rehema Youth</p>
            <h2 className="section-title">
              Art holds stories words cannot always tell.
            </h2>
            <div className="w-16 h-[2px] bg-amber-500 mt-4 mb-4" />
            <p className="text-base text-slate-600 font-light leading-relaxed">
              <strong>Kaze Collection</strong> is the dedicated art gallery operating under Rehema Mission Rwanda. Every original painting and mixed-media piece has been created by young people rebuilding their lives through creative expression in our Kigali atelier. Every purchase honors their craft and directly sustains their path forward.
            </p>
          </div>
          <Link to="/gallery" className="btn-primary text-xs flex-shrink-0 self-start md:self-auto">
            <span>Explore Kaze Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Artwork Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {featuredArtworks.map((art) => {
            const fav = isFavorite(art.id);
            return (
              <div
                key={art.id}
                className="bg-white border border-slate-200 overflow-hidden group hover:border-amber-500 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Artwork Image */}
                <div className="relative aspect-[3/4] bg-slate-100 overflow-hidden cursor-pointer" onClick={() => setSelectedArtwork(art)}>
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Status badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`text-[10px] tracking-wider uppercase font-semibold px-2.5 py-1 rounded shadow-sm ${
                        art.status === 'available'
                          ? 'bg-emerald-600 text-white'
                          : art.status === 'showroom'
                          ? 'bg-amber-600 text-white'
                          : 'bg-slate-700 text-white'
                      }`}
                    >
                      {art.status === 'available'
                        ? 'Available'
                        : art.status === 'showroom'
                        ? 'In Showroom'
                        : 'Reserved'}
                    </span>
                  </div>

                  {/* Favorite button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(art.id);
                    }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center hover:bg-white text-slate-800 shadow-sm transition-all"
                    aria-label="Save artwork"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        fav ? 'fill-rose-500 text-rose-500' : 'text-slate-600 hover:text-slate-950'
                      }`}
                    />
                  </button>

                  <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="btn-accent text-[11px] py-2 px-4 shadow">
                      View Story & Details
                    </span>
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                      <p className="text-[10px] tracking-[0.2em] uppercase font-semibold text-amber-700">
                        {art.categoryLabel}
                      </p>
                      {art.emotionalTheme && (
                        <span className="text-[9px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
                          {art.emotionalTheme}
                        </span>
                      )}
                    </div>
                    <h3
                      onClick={() => setSelectedArtwork(art)}
                      className="font-serif text-lg text-slate-950 font-medium group-hover:text-amber-700 transition-colors cursor-pointer"
                    >
                      {art.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-light mt-0.5">
                      {art.artistIdentifier} · {art.year}
                    </p>
                    <p className="text-xs text-slate-600 line-clamp-2 mt-2.5 font-light leading-relaxed">
                      {art.hook}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-serif font-medium text-slate-950">
                        {formatPrice(art.priceRwf)}
                      </p>
                      <p className="text-[10px] text-slate-400">~${art.priceUsd} USD</p>
                    </div>
                    <button
                      onClick={() => setSelectedArtwork(art)}
                      className="text-xs font-semibold text-slate-900 hover:text-amber-700 uppercase tracking-wider underline text-[11px]"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. SECTION 4: WORK WITH US — CLEAR, WARM AMBER BANNER */}
      <section className="py-20 md:py-24 bg-gradient-to-r from-amber-100/70 via-yellow-50 to-amber-100/70 border-y border-amber-200/90 text-slate-900 relative overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold tracking-[0.25em] uppercase text-amber-800 mb-3">
            Collaboration & Community
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-slate-950 tracking-tight mb-6">
            Stronger futures are built together.
          </h2>
          <p className="text-base sm:text-lg text-slate-700 font-light leading-relaxed max-w-2xl mx-auto mb-10">
            Schools, community organizations, galleries, institutions, and individuals can help expand opportunities for young people and families. Let’s discuss a practical way to work together.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/partner" className="btn-accent shadow-md w-full sm:w-auto">
              <span>Start a Conversation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/visit" className="btn-outline w-full sm:w-auto bg-white/80">
              <Calendar className="w-4 h-4" />
              <span>Schedule a Visit in Kicukiro</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. CLOSING STATEMENT BANNER */}
      <section className="py-12 bg-amber-200/70 text-slate-900 text-center px-4 border-b border-amber-300">
        <p className="font-serif text-xl sm:text-2xl md:text-3xl font-light tracking-wide">
          “One person. One family. One community at a time.”
        </p>
      </section>

      {/* ARTWORK DETAIL MODAL */}
      {selectedArtwork && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="relative bg-white max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row border border-slate-200 rounded-sm">
            {/* Left: Artwork image */}
            <div className="md:w-1/2 bg-slate-100 flex flex-col justify-between p-6 sm:p-8 border-b md:border-b-0 md:border-r border-slate-200">
              <div className="flex-1 flex flex-col items-center justify-center">
                <img
                  src={selectedArtwork.image}
                  alt={selectedArtwork.title}
                  className="max-h-[58vh] w-auto object-contain shadow-lg rounded-sm"
                />
                <div className="mt-4 flex items-center gap-1.5 px-3 py-1 bg-amber-100/80 rounded-full border border-amber-200 text-amber-900 text-[11px] font-medium">
                  <Award className="w-3.5 h-3.5 text-amber-700" />
                  <span>Kaze Collection · Signed Original with Certificate</span>
                </div>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-200 text-center space-y-1">
                <p className="text-xs text-slate-800 font-semibold">{selectedArtwork.dimensions}</p>
                <p className="text-[11px] text-slate-600 font-light">{selectedArtwork.medium}</p>
                <p className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded inline-block mt-1 font-medium border border-emerald-200">
                  100% of proceeds fund youth recovery & artisan vocational independence
                </p>
              </div>
            </div>

            {/* Right: 5-Part Artwork Story & Inquire */}
            <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
                        {selectedArtwork.categoryLabel}
                      </span>
                      {selectedArtwork.emotionalTheme && (
                        <span className="text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                          {selectedArtwork.emotionalTheme}
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif text-2xl text-slate-950 font-medium mt-1">
                      {selectedArtwork.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {selectedArtwork.artistIdentifier} · Created in {selectedArtwork.year}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedArtwork(null)}
                    className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-900 text-lg font-bold transition-colors"
                  >
                    ✕
                  </button>
                </div>

                {/* 5-Part Story */}
                <div className="mt-5 space-y-4 text-sm text-slate-700 font-light leading-relaxed">
                  {/* Part 1: The Hook */}
                  <div>
                    <p className="text-[11px] uppercase tracking-wider font-bold text-amber-800">
                      1. The Visual Hook
                    </p>
                    <p className="font-serif text-base italic font-normal text-slate-950 mt-1">
                      {selectedArtwork.hook}
                    </p>
                  </div>

                  {/* Part 2: What You See */}
                  <div>
                    <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
                      2. What the Viewer Sees
                    </p>
                    <p className="mt-1 text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {selectedArtwork.whatViewerSees}
                    </p>
                  </div>

                  {/* Part 3: Artist's Voice */}
                  <div>
                    <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
                      3. The Artist’s Story & Testimony
                    </p>
                    <div className="bg-amber-50 border-l-3 border-amber-500 p-3.5 my-1 text-xs italic text-slate-900 leading-relaxed rounded-r">
                      {selectedArtwork.artistPerspective}
                    </div>
                  </div>

                  {/* Part 4: Why This Artwork Belongs in Your Space */}
                  <div>
                    <p className="text-[11px] uppercase tracking-wider font-bold text-amber-800">
                      4. Why This Piece Belongs in Your Home
                    </p>
                    <p className="mt-1 text-xs sm:text-sm text-slate-800 font-normal leading-relaxed bg-slate-50 p-3 rounded border border-slate-100">
                      {selectedArtwork.whyBuy}
                    </p>
                  </div>

                  {/* Part 5: Craftsmanship & Provenance */}
                  <div>
                    <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
                      5. Craftsmanship & Provenance
                    </p>
                    <div className="border border-slate-100 bg-slate-50 p-3 text-xs text-slate-600 space-y-1.5 mt-1 rounded">
                      <p><strong>Medium:</strong> {selectedArtwork.medium}</p>
                      <p><strong>Support:</strong> {selectedArtwork.craftDetails.support}</p>
                      <p><strong>Technique:</strong> {selectedArtwork.craftDetails.technique}</p>
                      <p><strong>Framing:</strong> {selectedArtwork.framed}</p>
                      <p><strong>Signature:</strong> {selectedArtwork.craftDetails.signature}</p>
                      <p><strong>Location:</strong> {selectedArtwork.craftDetails.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price & Action */}
              <div className="pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Original Artwork Price</p>
                    <p className="font-serif text-2xl font-medium text-slate-950">
                      {formatPrice(selectedArtwork.priceRwf)}
                    </p>
                    <p className="text-xs text-slate-500 font-medium">~${selectedArtwork.priceUsd} USD</p>
                  </div>
                  <span className="px-3 py-1 rounded bg-emerald-100 text-emerald-900 text-xs font-semibold uppercase tracking-wider border border-emerald-300">
                    {selectedArtwork.status === 'available' ? 'Available for Acquisition' : selectedArtwork.status}
                  </span>
                </div>

                {/* Instant WhatsApp Action */}
                <div className="space-y-2.5">
                  <a
                    href={`https://wa.me/250798618524?text=${encodeURIComponent(
                      `Hello Kaze Collection, I am interested in acquiring the original artwork "${selectedArtwork.title}" (${formatPrice(selectedArtwork.priceRwf)} / ~$${selectedArtwork.priceUsd} USD). Please let me know availability and how to arrange viewing or delivery.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-4 rounded text-xs flex items-center justify-center gap-2 shadow transition-all duration-200 group"
                  >
                    <MessageCircle className="w-4 h-4 fill-white text-emerald-600 group-hover:scale-110 transition-transform" />
                    <span>Inquire / Reserve via WhatsApp (+250 798 618 524)</span>
                  </a>

                  <Link
                    to={`/contact?reason=artwork&title=${encodeURIComponent(selectedArtwork.title)}&code=${selectedArtwork.id}`}
                    onClick={() => setSelectedArtwork(null)}
                    className="btn-outline w-full text-center text-xs py-2.5 justify-center"
                  >
                    <span>Send Atelier Message Online</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
