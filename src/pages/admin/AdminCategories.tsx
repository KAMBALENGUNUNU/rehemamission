import { useEffect, useState, useCallback } from 'react';
import { Plus, ArrowUp, ArrowDown, Pencil, Trash2, X } from 'lucide-react';
import { supabase, type Category } from '@/lib/supabase';
import { slugify } from '@/lib/utils';

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);

  const fetchCategories = useCallback(async () => {
    const { data } = await supabase.from('categories').select('*').order('sort_order');
    setCategories(data ?? []);
  }, []);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);

  const openAdd = () => {
    setEditing(null); setName(''); setSlug(''); setDrawerOpen(true);
  };

  const openEdit = (c: Category) => {
    setEditing(c); setName(c.name); setSlug(c.slug); setDrawerOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { name, slug: slug || slugify(name) };
    if (editing) {
      await supabase.from('categories').update(payload).eq('id', editing.id);
    } else {
      await supabase.from('categories').insert({ ...payload, sort_order: categories.length });
    }
    setDrawerOpen(false);
    fetchCategories();
  };

  const move = async (c: Category, dir: 'up' | 'down') => {
    const idx = categories.findIndex((cat) => cat.id === c.id);
    const swapIdx = dir === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= categories.length) return;
    const swapCat = categories[swapIdx];
    await Promise.all([
      supabase.from('categories').update({ sort_order: swapCat.sort_order }).eq('id', c.id),
      supabase.from('categories').update({ sort_order: c.sort_order }).eq('id', swapCat.id),
    ]);
    fetchCategories();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await supabase.from('categories').delete().eq('id', deleteTarget.id);
    setDeleteTarget(null);
    fetchCategories();
  };

  return (
    <div className="page-enter">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl font-light text-ink-900">Categories</h1>
        <button onClick={openAdd} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      <div className="bg-white border border-ink-100">
        {categories.map((c, i) => (
          <div key={c.id} className="flex items-center justify-between p-4 border-b border-ink-50 last:border-0">
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <button onClick={() => move(c, 'up')} disabled={i === 0} className="text-ink-300 hover:text-ink-700 disabled:opacity-30">
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button onClick={() => move(c, 'down')} disabled={i === categories.length - 1} className="text-ink-300 hover:text-ink-700 disabled:opacity-30">
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>
              <div>
                <p className="text-sm font-medium text-ink-900">{c.name}</p>
                <p className="text-xs text-ink-400">/{c.slug}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => openEdit(c)} className="p-2 border border-ink-200 text-ink-500 hover:text-ink-900 transition-colors">
                <Pencil className="w-4 h-4" />
              </button>
              <button onClick={() => setDeleteTarget(c)} className="p-2 border border-ink-200 text-ink-300 hover:text-rose-500 hover:border-rose-300 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-ink-950/40 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} />
          <div className="relative w-full max-w-sm bg-white h-full overflow-y-auto animate-slide-in-right">
            <div className="sticky top-0 bg-white border-b border-ink-100 p-5 flex items-center justify-between">
              <h2 className="font-serif text-xl text-ink-900">{editing ? 'Edit Category' : 'Add Category'}</h2>
              <button onClick={() => setDrawerOpen(false)}><X className="w-5 h-5 text-ink-400" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-xs tracking-wide uppercase text-ink-400 mb-1.5">Name</label>
                <input
                  type="text" required value={name}
                  onChange={(e) => { setName(e.target.value); if (!editing) setSlug(slugify(e.target.value)); }}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-xs tracking-wide uppercase text-ink-400 mb-1.5">Slug</label>
                <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} className="input-field" />
              </div>
              <button type="submit" className="btn-primary w-full">{editing ? 'Save' : 'Add'}</button>
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
            <h3 className="font-serif text-xl text-ink-900 mb-2">Delete Category?</h3>
            <p className="text-sm text-ink-500 mb-2">Products in <strong>{deleteTarget.name}</strong> will lose their category label.</p>
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
