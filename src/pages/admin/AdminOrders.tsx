import { useEffect, useState } from 'react';
import { supabase, type Order } from '@/lib/supabase';
import { formatPrice, formatDate } from '@/lib/utils';
import { getStoredOrders, saveStoredOrders } from '@/lib/orders';

const statusColors: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700 border-amber-300',
  processing: 'bg-blue-100 text-blue-700 border-blue-300',
  shipped: 'bg-purple-100 text-purple-700 border-purple-300',
  delivered: 'bg-sage-100 text-sage-700 border-sage-300',
};

const statuses = ['pending', 'processing', 'shipped', 'delivered'];

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>(getStoredOrders);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);

  const loadOrders = async () => {
    let list = getStoredOrders();

    try {
      const { data } = await supabase.rpc('admin_get_all_orders');
      if (data && data.length > 0) {
        const existingIds = new Set(list.map((o) => o.order_number || o.id));
        for (const o of data) {
          if (!existingIds.has(o.order_number) && !existingIds.has(o.id)) {
            list.push(o);
          }
        }
      }
    } catch {}

    list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    setOrders(list);
    setLoading(false);
  };

  useEffect(() => {
    loadOrders();
    const interval = setInterval(loadOrders, 4000);
    const handleStorage = () => loadOrders();
    window.addEventListener('storage', handleStorage);
    window.addEventListener('order_placed', handleStorage);
    window.addEventListener('bb_orders_updated', handleStorage);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('order_placed', handleStorage);
      window.removeEventListener('bb_orders_updated', handleStorage);
    };
  }, []);

  const updateStatus = async (orderId: string, status: string, orderNumber: string) => {
    const updated = orders.map((o) => (o.id === orderId || o.order_number === orderNumber ? { ...o, status } : o));
    setOrders(updated);
    saveStoredOrders(updated);

    setToast(`Order ${orderNumber} marked as ${status.toUpperCase()}`);
    setTimeout(() => setToast(null), 3500);

    try {
      await supabase.rpc('admin_update_order_status', { p_order_id: orderId, p_status: status });
    } catch {}
  };

  return (
    <div className="page-enter">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-light text-ink-900">Orders Management</h1>
          <p className="text-xs text-ink-400 mt-1 uppercase tracking-wider">{orders.length} Total Boutique Orders</p>
        </div>
      </div>

      {toast && (
        <div className="mb-6 p-3.5 bg-sage-100 border border-sage-300 text-sage-800 text-sm font-medium animate-fade-up">
          {toast}
        </div>
      )}

      {loading ? (
        <div className="skeleton h-96" />
      ) : orders.length === 0 ? (
        <div className="text-center py-20 bg-white border border-ink-100">
          <p className="font-serif text-xl text-ink-400 font-light">No orders yet</p>
        </div>
      ) : (
        <div className="bg-white border border-ink-100 overflow-x-auto shadow-sm">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-ink-100 text-left bg-champagne-50/50">
                <th className="px-5 py-3.5 text-xs tracking-wide uppercase text-ink-500">Order #</th>
                <th className="px-5 py-3.5 text-xs tracking-wide uppercase text-ink-500">Customer</th>
                <th className="px-5 py-3.5 text-xs tracking-wide uppercase text-ink-500">Phone & Items</th>
                <th className="px-5 py-3.5 text-xs tracking-wide uppercase text-ink-500">Total (RWF)</th>
                <th className="px-5 py-3.5 text-xs tracking-wide uppercase text-ink-500">Date</th>
                <th className="px-5 py-3.5 text-xs tracking-wide uppercase text-ink-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-ink-50 hover:bg-champagne-50/30 transition-colors">
                  <td className="px-5 py-4 text-sm font-medium text-ink-900 font-mono">{order.order_number}</td>
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-ink-900">{order.customer_name}</p>
                    <p className="text-xs text-ink-400">{order.customer_email}</p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-xs text-ink-700 font-medium">{(order as any).customer_phone || '+250 788 000 000'}</p>
                    <p className="text-xs text-ink-400 mt-0.5">{(order.items ?? []).length} piece(s)</p>
                  </td>
                  <td className="px-5 py-4 text-sm font-serif font-medium text-ink-900">{formatPrice(Number(order.total))}</td>
                  <td className="px-5 py-4 text-xs text-ink-500">{formatDate(order.created_at)}</td>
                  <td className="px-5 py-4">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value, order.order_number)}
                      className={`px-3 py-1.5 text-xs tracking-wide uppercase font-medium border rounded ${statusColors[order.status] ?? statusColors.pending} cursor-pointer focus:outline-none`}
                    >
                      {statuses.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
