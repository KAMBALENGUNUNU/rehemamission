import { useState } from 'react';
import { Check, X, Star } from 'lucide-react';

type Review = {
  id: number;
  customer: string;
  date: string;
  rating: number;
  product: string;
  comment: string;
  status: 'pending' | 'approved' | 'rejected';
};

const initialReviews: Review[] = [
  { id: 1, customer: 'Aisha K.', date: '2026-08-10', rating: 5, product: 'Amahoro Gown', comment: 'Absolutely breathtaking craftsmanship. I felt like royalty.', status: 'pending' },
  { id: 2, customer: 'Claire M.', date: '2026-08-08', rating: 5, product: 'Cathedral Lace Veil', comment: 'The lace detail is stunning in person. Worth every franc!', status: 'pending' },
  { id: 3, customer: 'Diane U.', date: '2026-08-05', rating: 4, product: 'Ineza A-Line Gown', comment: 'Beautiful gown, perfect fit after alterations.', status: 'approved' },
  { id: 4, customer: 'Grace I.', date: '2026-08-01', rating: 5, product: 'Pearl Bridal Necklace', comment: 'Elegant and timeless. Completed my look perfectly.', status: 'approved' },
  { id: 5, customer: 'Marie I.', date: '2026-07-28', rating: 3, product: 'Bridal Silk Robe', comment: 'Lovely robe but sizing runs small.', status: 'rejected' },
];

export default function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [tab, setTab] = useState<'all' | 'pending' | 'approved'>('all');

  const pendingCount = reviews.filter((r) => r.status === 'pending').length;
  const filtered = reviews.filter((r) => tab === 'all' ? true : r.status === tab);

  const updateStatus = (id: number, status: 'approved' | 'rejected') => {
    setReviews((prev) => prev.map((r) => r.id === id ? { ...r, status } : r));
  };

  const tabs = [
    { key: 'all' as const, label: 'All', count: reviews.length },
    { key: 'pending' as const, label: 'Pending', count: pendingCount },
    { key: 'approved' as const, label: 'Approved', count: reviews.filter((r) => r.status === 'approved').length },
  ];

  const statusBadge: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-700',
    approved: 'bg-sage-100 text-sage-700',
    rejected: 'bg-rose-100 text-rose-700',
  };

  return (
    <div className="page-enter">
      <div className="mb-6">
        <h1 className="font-serif text-3xl font-light text-ink-900">Reviews</h1>
        <p className="text-sm text-amber-600 mt-2 flex items-center gap-1.5">
          <span className="px-2 py-0.5 bg-amber-100 text-xs tracking-wide uppercase">Prototype</span>
          In-memory only — resets on page reload
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 text-sm transition-colors flex items-center gap-2 ${
              tab === t.key ? 'bg-ink-900 text-champagne-50' : 'bg-white border border-ink-200 text-ink-500 hover:text-ink-900'
            }`}
          >
            {t.label}
            {t.count > 0 && (
              <span className={`px-1.5 py-0.5 text-[10px] rounded-full ${tab === t.key ? 'bg-champagne-50/20' : 'bg-ink-100'}`}>
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Reviews */}
      <div className="space-y-4">
        {filtered.map((r) => (
          <div key={r.id} className="bg-white border border-ink-100 p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-champagne-200 flex items-center justify-center font-serif text-lg text-ink-700">
                  {r.customer[0]}
                </div>
                <div>
                  <p className="text-sm font-medium text-ink-900">{r.customer}</p>
                  <p className="text-xs text-ink-400">{r.date} · {r.product}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i < r.rating ? 'fill-gold-400 text-gold-400' : 'text-ink-200'}`} />
                  ))}
                </div>
                <span className={`px-2 py-0.5 text-[10px] tracking-wide uppercase ${statusBadge[r.status]}`}>
                  {r.status}
                </span>
              </div>
            </div>
            <p className="text-sm text-ink-600 font-light leading-relaxed mb-3">{r.comment}</p>
            {r.status === 'pending' && (
              <div className="flex gap-2">
                <button
                  onClick={() => updateStatus(r.id, 'approved')}
                  className="flex items-center gap-1.5 px-4 py-2 bg-sage-600 text-white text-xs tracking-wide uppercase hover:bg-sage-700 transition-colors"
                >
                  <Check className="w-3.5 h-3.5" /> Approve
                </button>
                <button
                  onClick={() => updateStatus(r.id, 'rejected')}
                  className="flex items-center gap-1.5 px-4 py-2 bg-rose-500 text-white text-xs tracking-wide uppercase hover:bg-rose-600 transition-colors"
                >
                  <X className="w-3.5 h-3.5" /> Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
