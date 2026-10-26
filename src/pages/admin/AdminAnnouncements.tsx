import { useEffect, useState, useCallback } from 'react';
import { Plus, Trash2, Megaphone, X, ToggleLeft, ToggleRight } from 'lucide-react';
import { supabase, type Announcement } from '@/lib/supabase';

export default function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('discount');
  const [toast, setToast] = useState<string | null>(null);

  const fetchAnnouncements = useCallback(async () => {
    const { data } = await supabase.from('announcements').select('*').order('created_at', { ascending: false });
    setAnnouncements(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchAnnouncements(); }, [fetchAnnouncements]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.from('announcements').insert({ message, type, active: true });
    setDrawerOpen(false);
    setMessage('');
    setType('discount');
    setToast('Announcement published — visible on storefront');
    setTimeout(() => setToast(null), 3000);
    fetchAnnouncements();
  };

  const toggleActive = async (a: Announcement) => {
    await supabase.from('announcements').update({ active: !a.active }).eq('id', a.id);
    setToast(a.active ? 'Announcement hidden' : 'Announcement is now live');
    setTimeout(() => setToast(null), 3000);
    fetchAnnouncements();
  };

  const handleDelete = async (id: string) => {
    await supabase.from('announcements').delete().eq('id', id);
    fetchAnnouncements();
  };

  const typeBadge: Record<string, string> = {
    discount: 'bg-gold-100 text-gold-700 border-gold-300',
    offer: 'bg-sage-100 text-sage-700 border-sage-300',
    announcement: 'bg-blue-100 text-blue-700 border-blue-300',
  };

  return (
    <div className="page-enter">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-light text-ink-900">Announcements</h1>
          <p className="text-sm text-ink-400 mt-1">Discount & offer banners shown on the storefront</p>
        </div>
        <button onClick={() => setDrawerOpen(true)} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Announcement
        </button>
      </div>

      {toast && (
        <div className="mb-6 p-4 bg-sage-100 border border-sage-300 text-sage-700 text-sm animate-fade-up">
          {toast}
        </div>
      )}

      {loading ? (
        <div className="skeleton h-32" />
      ) : announcements.length === 0 ? (
        <div className="text-center py-20">
          <Megaphone className="w-12 h-12 mx-auto text-ink-200 mb-4" strokeWidth={1} />
          <p className="font-serif text-xl text-ink-400 font-light">No announcements yet</p>
          <p className="text-sm text-ink-400 mt-2">Create a discount or offer banner for your storefront</p>
        </div>
      ) : (
        <div className="space-y-4">
          {announcements.map((a) => (
            <div key={a.id} className={`bg-white border p-5 flex items-start justify-between gap-4 ${a.active ? 'border-champagne-300' : 'border-ink-100 opacity-60'}`}>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2.5 py-0.5 text-[10px] tracking-wide uppercase border ${typeBadge[a.type] ?? typeBadge.announcement}`}>
                    {a.type}
                  </span>
                  {a.active ? (
                    <span className="px-2.5 py-0.5 text-[10px] tracking-wide uppercase bg-sage-100 text-sage-700">Live</span>
                  ) : (
                    <span className="px-2.5 py-0.5 text-[10px] tracking-wide uppercase bg-ink-100 text-ink-500">Hidden</span>
                  )}
                </div>
                <p className="text-sm text-ink-700 font-light leading-relaxed">{a.message}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => toggleActive(a)}
                  className="p-2 border border-ink-200 text-ink-500 hover:text-ink-900 transition-colors"
                  title={a.active ? 'Hide' : 'Show'}
                >
                  {a.active ? <ToggleRight className="w-5 h-5 text-sage-600" /> : <ToggleLeft className="w-5 h-5" />}
                </button>
                <button
                  onClick={() => handleDelete(a.id)}
                  className="p-2 border border-ink-200 text-ink-300 hover:text-rose-500 hover:border-rose-300 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
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
            <div className="sticky top-0 bg-white border-b border-ink-100 p-5 flex items-center justify-between">
              <h2 className="font-serif text-xl text-ink-900">New Announcement</h2>
              <button onClick={() => setDrawerOpen(false)}><X className="w-5 h-5 text-ink-400" /></button>
            </div>
            <form onSubmit={handleCreate} className="p-5 space-y-4">
              <div>
                <label className="block text-xs tracking-wide uppercase text-ink-400 mb-1.5">Type</label>
                <select value={type} onChange={(e) => setType(e.target.value)} className="input-field">
                  <option value="discount">Discount</option>
                  <option value="offer">Offer</option>
                  <option value="announcement">Announcement</option>
                </select>
              </div>
              <div>
                <label className="block text-xs tracking-wide uppercase text-ink-400 mb-1.5">Message</label>
                <textarea
                  required rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. Enjoy 15% off all Signature Gowns this season. Use code BRENDA15 at checkout."
                  className="input-field resize-none"
                />
                <p className="text-xs text-ink-400 mt-1.5">This message will appear as an announcement banner on the storefront.</p>
              </div>
              <button type="submit" className="btn-primary w-full">Publish Announcement</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
