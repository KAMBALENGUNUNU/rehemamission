import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, RefreshCw } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { supabase, type Order } from '@/lib/supabase';
import { formatPrice, formatDate } from '@/lib/utils';

const statusColors: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700 border-amber-300',
  processing: 'bg-blue-100 text-blue-700 border-blue-300',
  shipped: 'bg-purple-100 text-purple-700 border-purple-300',
  delivered: 'bg-sage-100 text-sage-700 border-sage-300',
};

export default function Profile() {
  const navigate = useNavigate();
  const { session, signOut } = useStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const [prevStatuses, setPrevStatuses] = useState<Record<string, string>>({});

  const fetchOrders = useCallback(async () => {
    let list: Order[] = [];

    // 1. Check local orders
    try {
      const stored = localStorage.getItem('bb_orders');
      if (stored) {
        const parsed: any[] = JSON.parse(stored);
        if (session?.user?.email) {
          list = parsed.filter(
            (o) =>
              o.customer_email?.toLowerCase() === session.user.email?.toLowerCase() ||
              o.user_id === session.user.id
          );
        } else {
          list = parsed;
        }
      }
    } catch {}

    // 2. Check remote Supabase orders
    if (session?.user?.id) {
      try {
        const { data } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false });

        if (data && data.length > 0) {
          const existingIds = new Set(list.map((o) => o.order_number || o.id));
          for (const o of data) {
            if (!existingIds.has(o.order_number) && !existingIds.has(o.id)) {
              list.push(o);
            }
          }
        }
      } catch {}
    }

    return list;
  }, [session]);

  useEffect(() => {
    if (!session) {
      navigate('/login?redirect=/profile');
      return;
    }
    fetchOrders().then((data) => {
      setOrders(data ?? []);
      const statuses: Record<string, string> = {};
      (data ?? []).forEach((o) => { statuses[o.id] = o.status; });
      setPrevStatuses(statuses);
      setLoading(false);
    });
  }, [session, navigate, fetchOrders]);

  // Poll every 10 seconds
  useEffect(() => {
    if (!session) return;
    const interval = setInterval(async () => {
      const data = await fetchOrders();
      if (!data) return;
      const newStatuses: Record<string, string> = {};
      data.forEach((o) => { newStatuses[o.id] = o.status; });
      // Check for changes
      for (const o of data) {
        if (prevStatuses[o.id] && prevStatuses[o.id] !== o.status) {
          setToast(`Order ${o.order_number} status updated to ${o.status}`);
          setTimeout(() => setToast(null), 4000);
        }
      }
      setPrevStatuses(newStatuses);
      setOrders(data);
    }, 10000);
    return () => clearInterval(interval);
  }, [session, fetchOrders, prevStatuses]);

  if (!session) return null;

  const user = session.user;
  const fullName = user.user_metadata?.full_name ?? user.email ?? '';

  return (
    <div className="page-enter max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Profile header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-12">
        <div className="w-20 h-20 rounded-full bg-ink-900 text-champagne-50 flex items-center justify-center font-serif text-3xl">
          {(fullName[0] || 'B').toUpperCase()}
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h1 className="font-serif text-3xl font-light text-ink-900">{fullName}</h1>
          <p className="text-sm text-ink-500 mt-1">{user.email}</p>
        </div>
        <button
          onClick={async () => { await signOut(); navigate('/'); }}
          className="btn-outline flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>

      {/* Toast */}
      {toast && (
        <div className="mb-6 p-4 bg-champagne-100 border border-champagne-300 text-ink-700 text-sm animate-fade-up">
          {toast}
        </div>
      )}

      {/* Order History */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-2xl font-light text-ink-900">Order History</h2>
        <button
          onClick={async () => {
            setLoading(true);
            const data = await fetchOrders();
            setOrders(data ?? []);
            setLoading(false);
          }}
          className="text-ink-400 hover:text-ink-700 transition-colors"
          aria-label="Refresh"
        >
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="skeleton h-32" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20">
          <p className="font-serif text-xl text-ink-400 font-light">No orders yet</p>
          <p className="text-sm text-ink-400 mt-2">Your orders will appear here</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border border-ink-100 p-6 animate-fade-up">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 pb-4 border-b border-ink-100">
                <div>
                  <p className="font-serif text-lg text-ink-900">{order.order_number}</p>
                  <p className="text-xs text-ink-400 mt-1">{formatDate(order.created_at)}</p>
                </div>
                <div className="flex items-center gap-4 mt-3 sm:mt-0">
                  <span className={`px-3 py-1 text-xs tracking-[0.15em] uppercase border ${statusColors[order.status] ?? statusColors.pending}`}>
                    {order.status}
                  </span>
                  <span className="font-serif text-lg text-ink-900">{formatPrice(Number(order.total))}</span>
                </div>
              </div>
              <div className="space-y-3">
                {(order.items ?? []).map((item: any, i: number) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-12 h-16 bg-champagne-100 flex-shrink-0 overflow-hidden">
                      {item.image_url && <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-ink-900">{item.name}</p>
                      <p className="text-xs text-ink-400">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm text-ink-600">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
