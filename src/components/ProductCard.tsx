import { Link } from 'react-router-dom';
import { Heart, Plus } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/lib/supabase';

export default function ProductCard({
  product,
  showBadges = true,
}: {
  product: Product;
  showBadges?: boolean;
}) {
  const { addToCart, toggleFavorite, isFavorite } = useStore();
  const fav = isFavorite(product.id);

  const badges: { label: string; className: string }[] = [];
  if (showBadges) {
    if (product.featured) badges.push({ label: 'Featured', className: 'bg-gold-500 text-ink-900' });
    if (product.best_seller) badges.push({ label: 'Best Seller', className: 'bg-sage-600 text-white' });
    if (product.signature) badges.push({ label: 'Signature', className: 'bg-ink-900 text-champagne-50' });
  }
  if (!product.available) badges.push({ label: 'Sold Out', className: 'bg-rose-500 text-white' });

  return (
    <div className="group relative animate-fade-up">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden bg-champagne-100 aspect-[3/4] mb-4">
          {product.image_url && (
            <img
              src={product.image_url}
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          )}
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {badges.map((b) => (
              <span
                key={b.label}
                className={`px-3 py-1 text-[10px] tracking-[0.15em] uppercase font-medium ${b.className}`}
              >
                {b.label}
              </span>
            ))}
          </div>
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </Link>

      {/* Favorite */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleFavorite(product.id);
        }}
        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:scale-110 active:scale-95 transition-all duration-200 z-10 shadow-sm"
        aria-label="Toggle favorite"
      >
        <Heart className={`w-4 h-4 transition-colors ${fav ? 'fill-rose-500 text-rose-500' : 'text-ink-700'}`} />
      </button>

      {/* Info */}
      <div className="text-center">
        <p className="text-[10px] tracking-[0.2em] uppercase text-champagne-600 mb-1">
          {product.category}
        </p>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-serif text-lg font-medium text-ink-900 hover:text-champagne-700 transition-colors duration-200">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-ink-600 mt-1.5 font-light">{formatPrice(product.price)}</p>

        {/* Add button */}
        <button
          onClick={() => addToCart({
            id: product.id,
            name: product.name,
            price: Number(product.price),
            image_url: product.image_url,
            category: product.category,
          })}
          disabled={!product.available}
          className="mt-4 w-full py-2.5 border border-ink-300 text-ink-700 text-xs tracking-[0.2em] uppercase hover:bg-ink-900 hover:text-champagne-50 hover:border-ink-900 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          {product.available ? 'Add to Cart' : 'Unavailable'}
        </button>
      </div>
    </div>
  );
}
