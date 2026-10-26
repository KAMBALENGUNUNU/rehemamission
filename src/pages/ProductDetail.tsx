import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, Minus, Plus, Truck, Clock, Star } from 'lucide-react';
import { supabase, type Product } from '@/lib/supabase';
import { PUBLIC_CATALOG_PRODUCTS } from '@/lib/products';
import { useStore } from '@/store/StoreContext';
import { formatPrice } from '@/lib/utils';
import ProductCard from '@/components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, toggleFavorite, isFavorite } = useStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [reviews, setReviews] = useState<{ name: string; rating: number; comment: string }[]>([
    { name: 'Aisha K.', rating: 5, comment: 'Absolutely breathtaking. The craftsmanship is unmatched — I felt like royalty on my day.' },
    { name: 'Claire M.', rating: 5, comment: 'The lace detail is stunning in person. Worth every franc. Thank you Brenda!' },
    { name: 'Diane U.', rating: 4, comment: 'Beautiful gown, perfect fit after the complimentary alterations. Highly recommend.' },
  ]);

  useEffect(() => {
    if (!id) return;
    setLoading(true);

    const publicMatch = PUBLIC_CATALOG_PRODUCTS.find((p) => p.id === id);

    async function loadProduct() {
      try {
        const { data } = await supabase.from('products').select('*').eq('id', id).maybeSingle();
        const activeProd = data || publicMatch || null;
        setProduct(activeProd);
        setLoading(false);

        if (activeProd?.category) {
          const { data: rel } = await supabase
            .from('products')
            .select('*')
            .eq('category', activeProd.category)
            .neq('id', id)
            .limit(4);

          if (rel && rel.length > 0) {
            setRelated(rel);
          } else {
            const publicRelated = PUBLIC_CATALOG_PRODUCTS.filter((p) => p.id !== id).slice(0, 4);
            setRelated(publicRelated);
          }
        }
      } catch {
        setProduct(publicMatch || null);
        if (publicMatch) {
          const publicRelated = PUBLIC_CATALOG_PRODUCTS.filter((p) => p.id !== id).slice(0, 4);
          setRelated(publicRelated);
        }
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="skeleton aspect-[3/4] max-w-md mx-auto mb-8" />
        <div className="skeleton h-8 w-1/2 mx-auto mb-4" />
        <div className="skeleton h-6 w-1/3 mx-auto" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-32 px-4">
        <p className="font-serif text-3xl text-ink-400 font-light">Product not found</p>
        <Link to="/shop" className="btn-outline mt-8 inline-block">Back to Shop</Link>
      </div>
    );
  }

  const fav = isFavorite(product.id);
  const badges: { label: string; className: string }[] = [];
  if (product.featured) badges.push({ label: 'Featured', className: 'bg-gold-500 text-ink-900' });
  if (product.signature) badges.push({ label: 'Signature', className: 'bg-ink-900 text-champagne-50' });
  if (!product.available) badges.push({ label: 'Sold Out', className: 'bg-rose-500 text-white' });

  return (
    <div className="page-enter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Breadcrumb */}
        <nav className="text-xs tracking-[0.15em] uppercase text-ink-400 mb-8">
          <Link to="/" className="hover:text-champagne-600">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="hover:text-champagne-600">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-ink-700">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image */}
          <div className="relative overflow-hidden bg-champagne-100 aspect-[3/4] animate-scale-in">
            {product.image_url && (
              <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
            )}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {badges.map((b) => (
                <span key={b.label} className={`px-4 py-1.5 text-[10px] tracking-[0.15em] uppercase font-medium ${b.className}`}>
                  {b.label}
                </span>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center animate-fade-up">
            <p className="eyebrow mb-3">{product.category}{product.subcategory ? ` · ${product.subcategory}` : ''}</p>
            <h1 className="font-serif text-4xl md:text-5xl font-light text-ink-900 mb-4">{product.name}</h1>
            <p className="text-2xl text-ink-700 font-light mb-6">{formatPrice(Number(product.price))}</p>

            <p className="text-ink-600 font-light leading-relaxed mb-8">{product.description}</p>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {product.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 text-[10px] tracking-[0.15em] uppercase border border-ink-200 text-ink-500">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Details grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {product.materials && (
                <div className="flex items-start gap-3 p-4 bg-champagne-100/50">
                  <span className="text-xs tracking-[0.15em] uppercase text-champagne-600">Materials</span>
                  <span className="text-sm text-ink-600 font-light">{product.materials}</span>
                </div>
              )}
              {product.lead_time && (
                <div className="flex items-start gap-3 p-4 bg-champagne-100/50">
                  <Clock className="w-4 h-4 text-champagne-600 mt-0.5" />
                  <div>
                    <span className="text-xs tracking-[0.15em] uppercase text-champagne-600 block">Lead Time</span>
                    <span className="text-sm text-ink-600 font-light">{product.lead_time}</span>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-3 p-4 bg-champagne-100/50">
                <Truck className="w-4 h-4 text-champagne-600 mt-0.5" />
                <div>
                  <span className="text-xs tracking-[0.15em] uppercase text-champagne-600 block">Shipping</span>
                  <span className="text-sm text-ink-600 font-light">Worldwide from Kigali</span>
                </div>
              </div>
            </div>

            {/* Quantity + Add to cart */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-ink-300">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-4 py-3 text-ink-700 hover:bg-ink-100 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-6 py-3 text-ink-900 font-medium min-w-[3rem] text-center">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="px-4 py-3 text-ink-700 hover:bg-ink-100 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => {
                  addToCart({
                    id: product.id,
                    name: product.name,
                    price: Number(product.price),
                    image_url: product.image_url,
                    category: product.category,
                  }, qty);
                  navigate('/cart');
                }}
                disabled={!product.available}
                className="btn-primary flex-1"
              >
                {product.available ? 'Add to Cart' : 'Unavailable'}
              </button>
              <button
                onClick={() => toggleFavorite(product.id)}
                className="p-3 border border-ink-300 hover:border-rose-400 transition-colors"
                aria-label="Toggle favorite"
              >
                <Heart className={`w-5 h-5 ${fav ? 'fill-rose-500 text-rose-500' : 'text-ink-700'}`} />
              </button>
            </div>

            {/* Reviews */}
            <div className="mt-10 pt-8 border-t border-ink-100">
              <h3 className="font-serif text-2xl font-light text-ink-900 mb-6">Customer Reviews</h3>
              <div className="space-y-6">
                {reviews.map((r, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-champagne-200 flex items-center justify-center text-ink-700 font-serif text-lg">
                        {r.name[0]}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-ink-900">{r.name}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, s) => (
                            <Star key={s} className={`w-3 h-3 ${s < r.rating ? 'fill-gold-400 text-gold-400' : 'text-ink-200'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-ink-500 font-light leading-relaxed">{r.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-24">
            <h2 className="font-serif text-3xl font-light text-ink-900 text-center mb-12">You May Also Like</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
