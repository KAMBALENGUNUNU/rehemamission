import { useEffect, useState, useCallback } from 'react';
import { Plus, Star, Eye, Pencil, Trash2, X, Search } from 'lucide-react';
import { supabase, type Product, type Category } from '@/lib/supabase';
import { formatPrice, slugify } from '@/lib/utils';
import { getStoredProducts, saveStoredProducts, mergeCatalogWithPublicProducts, INITIAL_CATEGORIES } from '@/lib/products';

type FormData = {
  name: string; description: string; price: string; category: string;
  subcategory: string; image_url: string; materials: string; lead_time: string;
  tags: string; available: boolean; featured: boolean; best_seller: boolean;
  seasonal: boolean; signature: boolean;
};

const emptyForm: FormData = {
  name: '', description: '', price: '', category: '', subcategory: '',
  image_url: '', materials: '', lead_time: '', tags: '',
  available: true, featured: false, best_seller: false, seasonal: false, signature: false,
};

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>(getStoredProducts);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      const merged = mergeCatalogWithPublicProducts(data ?? []);
      setProducts(merged);
      saveStoredProducts(merged);
    } catch {
      setProducts(getStoredProducts());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    supabase.from('categories').select('*').order('sort_order').then(({ data }) => {
      if (data && data.length > 0) {
        setCategories(data);
      }
    });
  }, [fetchProducts]);

  const filtered = products.filter((p) => {
    if (activeCategory && p.category !== activeCategory) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return p.name.toLowerCase().includes(q) || (p.description ?? '').toLowerCase().includes(q);
    }
    return true;
  });

  const openAdd = () => {
    setForm(emptyForm);
    setEditingId(null);
    setDrawerOpen(true);
  };

  const openEdit = (p: Product) => {
    setForm({
      name: p.name, description: p.description ?? '', price: String(p.price),
      category: p.category ?? '', subcategory: p.subcategory ?? '',
      image_url: p.image_url ?? '', materials: p.materials ?? '',
      lead_time: p.lead_time ?? '', tags: (p.tags ?? []).join(', '),
      available: p.available, featured: p.featured, best_seller: p.best_seller,
      seasonal: p.seasonal, signature: p.signature,
    });
    setEditingId(p.id);
    setDrawerOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newId = editingId || 'prod_' + Date.now();
    const payload: Product = {
      id: newId,
      name: form.name,
      description: form.description,
      price: parseFloat(form.price) || 0,
      category: form.category,
      subcategory: form.subcategory,
      image_url: form.image_url,
      materials: form.materials,
      lead_time: form.lead_time,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      available: form.available,
      featured: form.featured,
      best_seller: form.best_seller,
      seasonal: form.seasonal,
      signature: form.signature,
      created_at: new Date().toISOString(),
    };

    // 1. Immediately update local state & cache
    let updatedProducts: Product[];
    if (editingId) {
      updatedProducts = products.map((p) => (p.id === editingId ? { ...p, ...payload } : p));
    } else {
      updatedProducts = [payload, ...products];
    }
    setProducts(updatedProducts);
    saveStoredProducts(updatedProducts);
    setDrawerOpen(false);

    // 2. Persist to Supabase
    try {
      if (editingId && !editingId.startsWith('prod-')) {
        await supabase.from('products').update(payload).eq('id', editingId);
      } else {
        await supabase.from('products').upsert(payload);
      }
    } catch {
      /* ignore */
    }
  };

  const toggleFeatured = async (p: Product) => {
    const updated = products.map((item) => (item.id === p.id ? { ...item, featured: !item.featured } : item));
    setProducts(updated);
    saveStoredProducts(updated);
    try {
      await supabase.from('products').update({ featured: !p.featured }).eq('id', p.id);
    } catch {
      /* ignore */
    }
  };

  const toggleAvailable = async (p: Product) => {
    const updated = products.map((item) => (item.id === p.id ? { ...item, available: !item.available } : item));
    setProducts(updated);
    saveStoredProducts(updated);
    try {
      await supabase.from('products').update({ available: !p.available }).eq('id', p.id);
    } catch {
      /* ignore */
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const targetId = deleteTarget.id;
    const updated = products.filter((item) => item.id !== targetId);
    setProducts(updated);
    saveStoredProducts(updated);
    setDeleteTarget(null);
    try {
      await supabase.from('products').delete().eq('id', targetId);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="page-enter">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-light text-ink-900">Kaze Collection Artworks</h1>
          <p className="text-sm text-ink-400 mt-1">{products.length} cataloged pieces created by Rehema youth</p>
        </div>
        <button onClick={openAdd} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Artwork
        </button>
      </div>

      {/* Search + filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-300" />
          <input
            type="text" placeholder="Search products..."
            value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-ink-200 text-sm focus:outline-none focus:border-champagne-500"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-3 py-2 text-xs tracking-wide uppercase transition-colors ${activeCategory === null ? 'bg-ink-900 text-champagne-50' : 'border border-ink-200 text-ink-500'}`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.name)}
              className={`px-3 py-2 text-xs tracking-wide uppercase transition-colors ${activeCategory === c.name ? 'bg-ink-900 text-champagne-50' : 'border border-ink-200 text-ink-500'}`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => <div key={i} className="skeleton h-64" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p) => (
            <div key={p.id} className="bg-white border border-ink-100 overflow-hidden group">
              <div className="relative h-48 bg-champagne-100 overflow-hidden">
                {p.image_url && <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" />}
                <div className="absolute top-2 left-2 flex gap-1.5">
                  {p.featured && <span className="px-2 py-0.5 text-[9px] tracking-wide uppercase bg-gold-500 text-ink-900">Featured</span>}
                  {p.signature && <span className="px-2 py-0.5 text-[9px] tracking-wide uppercase bg-ink-900 text-champagne-50">Signature</span>}
                  {!p.available && <span className="px-2 py-0.5 text-[9px] tracking-wide uppercase bg-rose-500 text-white">Sold Out</span>}
                </div>
              </div>
              <div className="p-4">
                <p className="text-[10px] tracking-wide uppercase text-champagne-600">{p.category}</p>
                <h3 className="font-serif text-lg text-ink-900 mt-1">{p.name}</h3>
                <p className="text-sm text-ink-600 mt-1">{formatPrice(Number(p.price))}</p>
                <div className="flex items-center gap-2 mt-4">
                  <button onClick={() => toggleFeatured(p)} className={`p-2 border transition-colors ${p.featured ? 'border-gold-400 text-gold-500' : 'border-ink-200 text-ink-300 hover:text-ink-700'}`} title="Toggle Featured">
                    <Star className={`w-4 h-4 ${p.featured ? 'fill-gold-400' : ''}`} />
                  </button>
                  <button onClick={() => toggleAvailable(p)} className={`p-2 border transition-colors ${p.available ? 'border-sage-300 text-sage-600' : 'border-ink-200 text-ink-300'}`} title="Toggle Available">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button onClick={() => openEdit(p)} className="p-2 border border-ink-200 text-ink-500 hover:text-ink-900 transition-colors" title="Edit">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => setDeleteTarget(p)} className="p-2 border border-ink-200 text-ink-300 hover:text-rose-500 hover:border-rose-300 transition-colors" title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-ink-950/40 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} />
          <div className="relative w-full max-w-md bg-white h-full overflow-y-auto animate-slide-in-right">
            <div className="sticky top-0 bg-white border-b border-ink-100 p-5 flex items-center justify-between z-10">
              <h2 className="font-serif text-xl text-ink-900">{editingId ? 'Edit Product' : 'Add Product'}</h2>
              <button onClick={() => setDrawerOpen(false)}><X className="w-5 h-5 text-ink-400" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-xs tracking-wide uppercase text-ink-400 mb-1.5">Name</label>
                <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" />
              </div>
              <div>
                <label className="block text-xs tracking-wide uppercase text-ink-400 mb-1.5">Description</label>
                <textarea required rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input-field resize-none" />
              </div>
              <div>
                <label className="block text-xs tracking-wide uppercase text-ink-400 mb-1.5">Price (USD)</label>
                <input type="number" step="0.01" required value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="input-field" />
              </div>
              <div>
                <label className="block text-xs tracking-wide uppercase text-ink-400 mb-1.5">Category</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input-field">
                  <option value="">Select category</option>
                  {categories.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs tracking-wide uppercase text-ink-400 mb-1.5">Subcategory</label>
                <input type="text" value={form.subcategory} onChange={(e) => setForm({ ...form, subcategory: e.target.value })} className="input-field" />
              </div>
              <div>
                <label className="block text-xs tracking-wide uppercase text-ink-400 mb-1.5">Image URL</label>
                <input type="url" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} className="input-field" />
                {form.image_url && <img src={form.image_url} alt="Preview" className="mt-2 w-full h-40 object-cover bg-champagne-100" />}
              </div>
              <div>
                <label className="block text-xs tracking-wide uppercase text-ink-400 mb-1.5">Materials</label>
                <input type="text" value={form.materials} onChange={(e) => setForm({ ...form, materials: e.target.value })} className="input-field" />
              </div>
              <div>
                <label className="block text-xs tracking-wide uppercase text-ink-400 mb-1.5">Lead Time</label>
                <input type="text" value={form.lead_time} onChange={(e) => setForm({ ...form, lead_time: e.target.value })} className="input-field" />
              </div>
              <div>
                <label className="block text-xs tracking-wide uppercase text-ink-400 mb-1.5">Tags (comma-separated)</label>
                <input type="text" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} className="input-field" />
              </div>
              <div className="space-y-2 pt-2">
                {[
                  { key: 'available', label: 'Available' },
                  { key: 'featured', label: 'Featured' },
                  { key: 'best_seller', label: 'Best Seller' },
                  { key: 'seasonal', label: 'Seasonal' },
                  { key: 'signature', label: 'Signature' },
                ].map((s) => (
                  <label key={s.key} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form[s.key as keyof FormData] as boolean}
                      onChange={(e) => setForm({ ...form, [s.key]: e.target.checked })}
                      className="w-4 h-4 accent-champagne-600"
                    />
                    <span className="text-sm text-ink-700">{s.label}</span>
                  </label>
                ))}
              </div>
              <button type="submit" className="btn-primary w-full mt-4">
                {editingId ? 'Save Changes' : 'Add Product'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete dialog */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm" onClick={() => setDeleteTarget(null)} />
          <div className="relative bg-white p-8 max-w-sm w-full text-center animate-scale-in">
            <Trash2 className="w-12 h-12 mx-auto text-rose-400 mb-4" strokeWidth={1} />
            <h3 className="font-serif text-xl text-ink-900 mb-2">Delete Product?</h3>
            <p className="text-sm text-ink-500 mb-2">You are about to delete <strong>{deleteTarget.name}</strong>.</p>
            <p className="text-xs text-rose-500 mb-6">This action is irreversible.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setDeleteTarget(null)} className="btn-outline">Cancel</button>
              <button onClick={handleDelete} className="px-8 py-3 bg-rose-500 text-white text-sm tracking-[0.2em] uppercase hover:bg-rose-600 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
