import { Link } from 'react-router-dom';
import { Heart, ArrowRight, Trash2 } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { REHEMA_ARTWORKS } from '@/lib/artworks';
import { formatPrice } from '@/lib/utils';

export default function Favorites() {
  const { favorites, toggleFavorite } = useStore();

  const savedArtworks = REHEMA_ARTWORKS.filter((art) => favorites.includes(art.id));

  if (savedArtworks.length === 0) {
    return (
      <div className="page-enter max-w-2xl mx-auto px-4 py-32 text-center text-slate-900">
        <Heart className="w-16 h-16 mx-auto text-slate-300 mb-8" strokeWidth={1} />
        <h1 className="font-serif text-3xl sm:text-4xl font-light text-slate-950 mb-4">
          No Saved Artworks Yet
        </h1>
        <p className="text-slate-600 font-light mb-8 max-w-md mx-auto text-sm sm:text-base">
          Click the heart icon on any artwork in Kaze Collection to keep track of pieces that speak to you.
        </p>
        <Link to="/gallery" className="btn-accent inline-block text-xs py-3 px-8">
          Browse Kaze Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="page-enter max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-slate-900">
      <div className="text-center mb-12">
        <p className="eyebrow mb-2">Kaze Collection · Your Saved Pieces</p>
        <h1 className="section-title text-3xl sm:text-4xl">
          Saved Artworks ({savedArtworks.length})
        </h1>
        <div className="w-16 h-[2px] bg-amber-500 mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
        {savedArtworks.map((art) => (
          <div
            key={art.id}
            className="bg-white border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between group"
          >
            <div className="relative aspect-[3/4] bg-slate-100 overflow-hidden">
              <img
                src={art.image}
                alt={art.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <button
                type="button"
                onClick={() => toggleFavorite(art.id)}
                className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-rose-500 hover:bg-white shadow"
                title="Remove from saved"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <p className="text-[10px] tracking-wider uppercase font-semibold text-amber-700">
                  {art.categoryLabel}
                </p>
                <h3 className="font-serif text-lg font-medium text-slate-950 mt-1">
                  {art.title}
                </h3>
                <p className="text-xs text-slate-500">{art.artistIdentifier} · {art.year}</p>
                <p className="text-sm font-serif font-medium text-slate-950 mt-2">
                  {formatPrice(art.priceRwf)} <span className="text-xs font-sans text-slate-400 font-normal">(~${art.priceUsd} USD)</span>
                </p>
              </div>

              <Link
                to={`/contact?reason=artwork&title=${encodeURIComponent(art.title)}&code=${art.id}`}
                className="btn-accent w-full text-xs py-2.5 justify-center shadow"
              >
                <span>Inquire About This Piece</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
