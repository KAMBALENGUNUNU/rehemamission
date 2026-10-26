import { useState, useEffect } from 'react';
import { Instagram, Heart, MessageCircle, ExternalLink, Sparkles, MapPin, CheckCircle2, Film, Image as ImageIcon, X } from 'lucide-react';
import { useWebsiteSettings } from '@/lib/settings';

type InstagramPost = {
  id: string;
  type: 'image' | 'video' | 'carousel';
  mediaUrl: string;
  caption: string;
  likes: number;
  comments: number;
  category: 'all' | 'gowns' | 'robes' | 'traditional' | 'reels';
  date: string;
  permalink: string;
};

const SAMPLE_POSTS: InstagramPost[] = [
  {
    id: 'post-1',
    type: 'image',
    mediaUrl: '/group photo.jpg',
    caption: 'Dressed in Africa, worn by the world. Our breathtaking bridal party ensemble handcrafted in our Kigali atelier. 👑✨ #BrendasBridal #HauteCouture #RwandaBride #AfricanLuxury',
    likes: 482,
    comments: 39,
    category: 'gowns',
    date: '2 days ago',
    permalink: 'https://www.instagram.com/brendas_bridal',
  },
  {
    id: 'post-2',
    type: 'image',
    mediaUrl: '/1.jpg',
    caption: 'Pure silk organza floating like poetry. Bespoke couture tailored for the bride who commands grace with every step. 🕊️💫 #BridalGown #KigaliBridal #BespokeDress',
    likes: 367,
    comments: 28,
    category: 'gowns',
    date: '4 days ago',
    permalink: 'https://www.instagram.com/brendas_bridal',
  },
  {
    id: 'post-3',
    type: 'image',
    mediaUrl: '/2.jpg',
    caption: 'Intricate French lace meets handcrafted Swarovski crystal accents. Timeless, royal, unforgettable. 💎✨ #LaceGown #LuxuryBride #BrendasBridal',
    likes: 512,
    comments: 44,
    category: 'gowns',
    date: '1 week ago',
    permalink: 'https://www.instagram.com/brendas_bridal',
  },
  {
    id: 'post-4',
    type: 'image',
    mediaUrl: '/6.jpg',
    caption: 'Honoring Rwandan heritage with our bespoke Umushanana creations. Golden filigree draping tailored for Gusaba & traditional ceremonies. 🇷🇼💛 #Umushanana #Gusaba #RwandanWedding',
    likes: 620,
    comments: 57,
    category: 'traditional',
    date: '1 week ago',
    permalink: 'https://www.instagram.com/brendas_bridal',
  },
  {
    id: 'post-5',
    type: 'image',
    mediaUrl: '/3.png',
    caption: 'Regal sculpted corset with dramatic cathedral train. Every stitch created to celebrate your silhouette. 👑🤍 #SignatureGown #AtelierKigali #AfricanHauteCouture',
    likes: 389,
    comments: 31,
    category: 'gowns',
    date: '2 weeks ago',
    permalink: 'https://www.instagram.com/brendas_bridal',
  },
  {
    id: 'post-6',
    type: 'image',
    mediaUrl: '/5.jpg',
    caption: 'The morning of your wedding deserves pure silk luxury. Custom monogrammed silk mikado bridal robes for the bride & bridal party. 🌸🥂 #BridalRobe #WeddingMorning',
    likes: 295,
    comments: 19,
    category: 'robes',
    date: '2 weeks ago',
    permalink: 'https://www.instagram.com/brendas_bridal',
  },
  {
    id: 'post-7',
    type: 'image',
    mediaUrl: '/4.png',
    caption: 'Architectural minimalism tailored with hand-beaded glass pearls. Modern romance for the contemporary bride. ✨ #ModernBride #CoutureFashion',
    likes: 418,
    comments: 36,
    category: 'gowns',
    date: '3 weeks ago',
    permalink: 'https://www.instagram.com/brendas_bridal',
  },
  {
    id: 'post-8',
    type: 'image',
    mediaUrl: '/red.jpg',
    caption: 'Reception transition in scarlet silk. Opulent evening gowns designed for unforgettable celebrations. 🌹💃 #ReceptionDress #EveningGown #BrendasBridal',
    likes: 443,
    comments: 27,
    category: 'traditional',
    date: '3 weeks ago',
    permalink: 'https://www.instagram.com/brendas_bridal',
  },
  {
    id: 'post-9',
    type: 'image',
    mediaUrl: '/7.png',
    caption: 'Cathedral illusion lace trims and matching artisan freshwater pearl headpiece. The final crown to your bridal perfection. 👰‍♀️✨ #BridalVeil #CathedralVeil',
    likes: 334,
    comments: 22,
    category: 'robes',
    date: '1 month ago',
    permalink: 'https://www.instagram.com/brendas_bridal',
  },
];

export default function InstagramPosts() {
  const settings = useWebsiteSettings();
  const [activeTab, setActiveTab] = useState<'all' | 'gowns' | 'robes' | 'traditional' | 'reels'>('all');
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);

  const instagramUrl = settings.instagram_url || 'https://www.instagram.com/brendas_bridal';
  const instagramHandle = settings.instagram_handle || '@brendas_bridal';

  const filteredPosts = activeTab === 'all'
    ? SAMPLE_POSTS
    : SAMPLE_POSTS.filter((p) => p.category === activeTab);

  return (
    <div className="page-enter min-h-screen bg-champagne-50 pb-24">
      {/* Profile Header Banner */}
      <section className="bg-ink-950 text-champagne-50 py-16 px-4 sm:px-6 lg:px-8 border-b border-champagne-900/40 relative overflow-hidden">
        {/* Subtle Ambient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-900/60 to-ink-950 pointer-events-none" />
        <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-gold-500/5 blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
          {/* Profile Avatar with Instagram Story Ring */}
          <div className="relative group flex-shrink-0">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full p-1 bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 shadow-xl">
              <div className="w-full h-full rounded-full overflow-hidden bg-ink-900 border-2 border-ink-950">
                <img
                  src="/group photo.jpg"
                  alt="Brenda's Bridal Instagram"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="absolute bottom-1 right-1 bg-gold-500 text-ink-950 p-1.5 rounded-full border-2 border-ink-950 shadow">
              <Instagram className="w-4 h-4" />
            </div>
          </div>

          {/* Profile Bio & Details */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-4">
              <h1 className="font-serif text-3xl sm:text-4xl font-light tracking-tight text-champagne-50">
                {instagramHandle.replace('@', '')}
              </h1>
              <span className="inline-flex items-center gap-1 text-gold-400 text-xs px-2.5 py-0.5 rounded-full bg-gold-500/10 border border-gold-500/20">
                <CheckCircle2 className="w-3.5 h-3.5 fill-gold-400 text-ink-950" />
                <span>Verified Atelier</span>
              </span>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 sm:mt-0 sm:ml-auto btn-primary bg-gradient-to-r from-rose-500 via-purple-600 to-amber-500 text-white hover:opacity-95 text-xs py-2.5 px-6 shadow-md inline-flex items-center gap-2"
              >
                <Instagram className="w-4 h-4" />
                <span>Follow on Instagram</span>
                <ExternalLink className="w-3 h-3 opacity-80" />
              </a>
            </div>

            {/* Profile Statistics */}
            <div className="flex items-center justify-center md:justify-start gap-8 py-3 border-y border-champagne-200/10 mb-4 text-xs sm:text-sm">
              <div>
                <span className="font-serif font-medium text-champagne-50 text-base">9</span>{' '}
                <span className="text-champagne-200/60 uppercase tracking-wider text-[11px]">Posts</span>
              </div>
              <div>
                <span className="font-serif font-medium text-champagne-50 text-base">14.8K</span>{' '}
                <span className="text-champagne-200/60 uppercase tracking-wider text-[11px]">Followers</span>
              </div>
              <div>
                <span className="font-serif font-medium text-champagne-50 text-base">100%</span>{' '}
                <span className="text-champagne-200/60 uppercase tracking-wider text-[11px]">Bespoke Made</span>
              </div>
            </div>

            {/* Bio Text */}
            <div className="space-y-1.5 text-sm text-champagne-100/90 font-light leading-relaxed">
              <p className="font-medium text-gold-300">Brenda's Bridal | Haute Couture & Bespoke Gowns</p>
              <p className="text-champagne-200/80">✨ Dressed in Africa, worn by the world</p>
              <p className="text-champagne-200/80">🕊️ Custom Wedding Gowns · Bridal Robes · Veils · Umushanana</p>
              <p className="flex items-center justify-center md:justify-start gap-1.5 text-gold-400/90 pt-1 text-xs">
                <MapPin className="w-3.5 h-3.5" />
                <span>{settings.location_name || 'Gishushu · Kigali, Rwanda'}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="sticky top-20 z-30 bg-champagne-50/95 backdrop-blur-md border-b border-ink-100 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
          {[
            { id: 'all', label: 'All Posts', icon: ImageIcon },
            { id: 'gowns', label: 'Wedding Gowns', icon: Sparkles },
            { id: 'traditional', label: 'Umushanana & Cultural', icon: Sparkles },
            { id: 'robes', label: 'Robes & Veils', icon: Sparkles },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs tracking-[0.15em] uppercase transition-all duration-200 ${
                  active
                    ? 'bg-ink-900 text-champagne-50 shadow-sm'
                    : 'bg-white border border-ink-200 text-ink-600 hover:border-ink-900 hover:text-ink-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Instagram Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="group relative bg-ink-950 aspect-square overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 animate-fade-up"
            >
              <img
                src={post.mediaUrl}
                alt={post.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Top Type Indicator Badge */}
              <div className="absolute top-3 right-3 p-1.5 rounded-full bg-ink-950/60 text-white backdrop-blur-sm opacity-90 group-hover:opacity-0 transition-opacity">
                {post.type === 'video' ? <Film className="w-3.5 h-3.5" /> : <ImageIcon className="w-3.5 h-3.5" />}
              </div>

              {/* Luxury Instagram Hover Overlay */}
              <div className="absolute inset-0 bg-ink-950/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 text-champagne-50">
                {/* Top: Instagram Logo */}
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs text-gold-300 font-serif">
                    <Instagram className="w-4 h-4" />
                    <span>{instagramHandle}</span>
                  </span>
                  <span className="text-[11px] text-champagne-300/70 tracking-wider">{post.date}</span>
                </div>

                {/* Center: Caption preview */}
                <p className="text-xs text-champagne-100 line-clamp-3 font-light leading-relaxed">
                  {post.caption}
                </p>

                {/* Bottom: Metrics & Action */}
                <div className="flex items-center justify-between border-t border-champagne-200/20 pt-3">
                  <div className="flex items-center gap-4 text-xs font-medium">
                    <span className="flex items-center gap-1.5 text-rose-400">
                      <Heart className="w-4 h-4 fill-rose-400 text-rose-400" />
                      <span>{post.likes}</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-champagne-200">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.comments}</span>
                    </span>
                  </div>
                  <span className="text-[11px] tracking-wider uppercase text-gold-400 group-hover:underline flex items-center gap-1">
                    View Post <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner to Live Profile */}
        <div className="mt-16 text-center bg-white border border-champagne-200/70 p-8 sm:p-12 shadow-sm">
          <Instagram className="w-10 h-10 mx-auto text-rose-500 mb-4" />
          <h2 className="font-serif text-2xl sm:text-3xl text-ink-900 font-light mb-3">
            Join Our Bridal Community on Instagram
          </h2>
          <p className="text-sm text-ink-500 font-light max-w-xl mx-auto mb-6 leading-relaxed">
            Follow <span className="font-medium text-ink-800">{instagramHandle}</span> for behind-the-scenes fitting sessions in our Kigali atelier, real bride stories, and latest couture drops.
          </p>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2.5 shadow-md"
          >
            <Instagram className="w-4 h-4" />
            <span>Open {instagramHandle} on Instagram</span>
            <ExternalLink className="w-4 h-4 opacity-80" />
          </a>
        </div>
      </section>

      {/* Lightbox / Post Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/80 backdrop-blur-md animate-fade-up">
          <div className="relative bg-white max-w-3xl w-full rounded-none overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
            {/* Left: Image */}
            <div className="md:w-1/2 bg-ink-950 flex items-center justify-center aspect-square md:aspect-auto">
              <img
                src={selectedPost.mediaUrl}
                alt={selectedPost.caption}
                className="w-full h-full object-cover max-h-[60vh] md:max-h-full"
              />
            </div>

            {/* Right: Info & Caption */}
            <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-champagne-50/50">
              <div>
                {/* Header */}
                <div className="flex items-center justify-between border-b border-ink-100 pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-ink-900 border border-gold-400">
                      <img src="/group photo.jpg" alt="Brenda's Bridal" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-ink-900 leading-tight">{instagramHandle.replace('@', '')}</p>
                      <p className="text-[11px] text-champagne-600">Kigali, Rwanda</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="p-1.5 text-ink-400 hover:text-ink-900 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Caption */}
                <div className="space-y-3 py-2 text-sm text-ink-700 font-light leading-relaxed">
                  <p>{selectedPost.caption}</p>
                  <p className="text-xs text-ink-400 pt-2">{selectedPost.date}</p>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-ink-100 pt-4 mt-6">
                <div className="flex items-center justify-between mb-4 text-xs font-medium text-ink-700">
                  <span className="flex items-center gap-1.5 text-rose-500">
                    <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                    <span>{selectedPost.likes} likes</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-ink-500">
                    <MessageCircle className="w-4 h-4" />
                    <span>{selectedPost.comments} comments</span>
                  </span>
                </div>

                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full flex items-center justify-center gap-2 text-xs py-3"
                >
                  <Instagram className="w-4 h-4" />
                  <span>View Post on Instagram</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
