import { useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { supabase, type Product, type Category } from '@/lib/supabase';
import { PUBLIC_CATALOG_PRODUCTS, INITIAL_CATEGORIES, mergeCatalogWithPublicProducts } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

export default function Shop() {
  const [products, setProducts] = useState<Product[]>(PUBLIC_CATALOG_PRODUCTS);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    const loadData = () => {
      Promise.all([
        supabase.from('products').select('*').order('created_at', { ascending: false }),
        supabase.from('categories').select('*').order('sort_order', { ascending: true }),
      ]).then(([prod, cat]) => {
        const merged = mergeCatalogWithPublicProducts(prod.data ?? []);
        setProducts(merged);
        if (cat.data && cat.data.length > 0) {
          const existingNames = new Set(INITIAL_CATEGORIES.map((c) => c.name));
          const extraCats = cat.data.filter((c) => !existingNames.has(c.name));
          setCategories([...INITIAL_CATEGORIES, ...extraCats]);
        } else {
          setCategories(INITIAL_CATEGORIES);
        }
        setLoading(false);
      }).catch(() => {
        setProducts(mergeCatalogWithPublicProducts([]));
        setCategories(INITIAL_CATEGORIES);
        setLoading(false);
      });
    };

    loadData();

    const handleProductsUpdate = () => {
      loadData();
    };

    window.addEventListener('bb_products_updated', handleProductsUpdate);
    window.addEventListener('storage', handleProductsUpdate);

    return () => {
      window.removeEventListener('bb_products_updated', handleProductsUpdate);
      window.removeEventListener('storage', handleProductsUpdate);
    };
  }, []);

  const filtered = useMemo(() => {
    let result = products;
    if (activeCategory) {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        (p.description ?? '').toLowerCase().includes(q) ||
        (p.tags ?? []).some((t) => t.toLowerCase().includes(q))
      );
    }
    return result;
  }, [products, activeCategory, search]);

  return (
    <div className="page-enter">
      {/* Header */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-champagne-100/50">
        <div className="max-w-7xl mx-auto text-center">
          <p className="eyebrow mb-4">The Collection</p>
          <h1 className="section-title">Shop Brenda's Bridal</h1>
          <div className="w-16 h-px bg-champagne-500 mx-auto mt-6" />
          <p className="mt-6 text-ink-500 font-light max-w-2xl mx-auto leading-relaxed">
            Each piece is 100% made to order in our Kigali atelier, crafted with
            the finest fabrics and meticulous attention to detail.
          </p>
        </div>
      </section>

      {/* Search + Filters */}
      <section className="sticky top-20 z-30 bg-champagne-50/90 backdrop-blur-md border-y border-ink-100 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-300" />
              <input
                type="text"
                placeholder="Search the collection..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/60 border border-ink-200 text-sm text-ink-900 placeholder-ink-300 focus:outline-none focus:border-champagne-500 transition-colors"
              />
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-4 py-2 text-xs tracking-[0.15em] uppercase transition-all duration-200 ${
                  activeCategory === null
                    ? 'bg-ink-900 text-champagne-50'
                    : 'border border-ink-200 text-ink-600 hover:border-ink-900 hover:text-ink-900'
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`px-4 py-2 text-xs tracking-[0.15em] uppercase transition-all duration-200 ${
                    activeCategory === cat.name
                      ? 'bg-ink-900 text-champagne-50'
                      : 'border border-ink-200 text-ink-600 hover:border-ink-900 hover:text-ink-900'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product grid */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i}>
                <div className="skeleton aspect-[3/4] mb-4" />
                <div className="skeleton h-4 w-2/3 mx-auto mb-2" />
                <div className="skeleton h-4 w-1/3 mx-auto" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-serif text-2xl text-ink-400 font-light">No pieces found</p>
            <p className="text-sm text-ink-400 mt-2">Try adjusting your search or filters</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-ink-400 mb-8">{filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
