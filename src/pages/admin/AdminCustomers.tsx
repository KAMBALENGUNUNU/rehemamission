import { useEffect, useState } from 'react';
import { X, Mail, Phone, MapPin, ShoppingBag } from 'lucide-react';
import { supabase, type Customer, type Order } from '@/lib/supabase';
import { formatPrice, formatDate } from '@/lib/utils';
import { getStoredOrders } from '@/lib/orders';

export default function AdminCustomers() {
  const [customers, setCustomers] = useState<(Customer & { order_count: number; total_spent: number })[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<(Customer & { orders: Order[] }) | null>(null);

  const loadCustomers = async () => {
    let ordersList = getStoredOrders();

    const customerMap = new Map<string, { customer: Customer; orders: Order[] }>();

    // Add customers from orders
    for (const ord of ordersList) {
      if (!ord.customer_email) continue;
      const emailKey = ord.customer_email.toLowerCase();
      const existing = customerMap.get(emailKey);
      if (existing) {
        existing.orders.push(ord);
      } else {
        customerMap.set(emailKey, {
          customer: {
            id: ord.user_id || 'cust_' + Date.now(),
            name: ord.customer_name || emailKey.split('@')[0],
            email: ord.customer_email,
            phone: (ord as any).customer_phone || '+250 788 000 000',
            address: (ord as any).customer_address || 'Kigali, Rwanda',
            user_id: ord.user_id || '',
            created_at: ord.created_at || new Date().toISOString(),
          },
          orders: [ord],
        });
      }
    }

    try {
      const { data: custs } = await supabase.rpc('admin_get_all_customers');
      if (custs && custs.length > 0) {
        for (const c of custs) {
          const emailKey = c.email.toLowerCase();
          if (!customerMap.has(emailKey)) {
            customerMap.set(emailKey, { customer: c, orders: [] });
          }
        }
      }
    } catch {}

    const list: (Customer & { order_count: number; total_spent: number; orders: Order[] })[] = [];
    for (const [_, entry] of customerMap.entries()) {
      const order_count = entry.orders.length;
      const total_spent = entry.orders.reduce((sum, o) => sum + Number(o.total || 0), 0);
      list.push({
        ...entry.customer,
        order_count,
        total_spent,
        orders: entry.orders,
      });
    }

    setCustomers(list);
    setLoading(false);
  };

  useEffect(() => {
    loadCustomers();
    const interval = setInterval(loadCustomers, 4000);
    const handleStorage = () => loadCustomers();
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

  const openCustomer = async (c: any) => {
    setSelected(c);
  };

  if (loading) return <div className="skeleton h-96" />;

  return (
    <div className="page-enter">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-light text-ink-900">Registered Brides & Clients</h1>
          <p className="text-xs text-ink-400 mt-1 uppercase tracking-wider">{customers.length} Total Client Profiles</p>
        </div>
      </div>

      {customers.length === 0 ? (
        <div className="text-center py-20 bg-white border border-ink-100">
          <p className="font-serif text-xl text-ink-400 font-light">No customers yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {customers.map((c) => (
            <button
              key={c.id}
              onClick={() => openCustomer(c)}
              className="bg-white border border-ink-100 p-6 text-left hover:border-champagne-400 transition-all duration-300 shadow-sm hover:shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-ink-900 text-champagne-50 flex items-center justify-center font-serif text-xl shadow-sm border border-gold-400">
                  {c.name[0]?.toUpperCase()}
                </div>
                <div>
                  <p className="font-serif text-lg text-ink-900 font-medium">{c.name}</p>
                  <p className="text-xs text-ink-400">{c.email}</p>
                </div>
              </div>
              <div className="flex justify-between text-sm border-t border-ink-50 pt-4 mt-2">
                <div>
                  <p className="text-[10px] tracking-wider uppercase text-ink-400">Orders</p>
                  <p className="text-ink-900 font-medium">{c.order_count} order(s)</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] tracking-wider uppercase text-ink-400">Total Spent</p>
                  <p className="text-ink-900 font-serif font-medium">{formatPrice(Number(c.total_spent))}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Customer detail drawer */}
      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end animate-fade-up">
          <div className="absolute inset-0 bg-ink-950/40 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <div className="relative w-full max-w-md bg-white h-full overflow-y-auto animate-slide-in-right shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-ink-100 p-5 flex items-center justify-between">
              <h2 className="font-serif text-xl text-ink-900">{selected.name}</h2>
              <button onClick={() => setSelected(null)}><X className="w-5 h-5 text-ink-400" /></button>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-3 bg-champagne-50/50 p-4 border border-ink-100 rounded">
                <div className="flex items-center gap-2 text-sm text-ink-700">
                  <Mail className="w-4 h-4 text-champagne-600 flex-shrink-0" /> {selected.email}
                </div>
                {selected.phone && (
                  <div className="flex items-center gap-2 text-sm text-ink-700">
                    <Phone className="w-4 h-4 text-champagne-600 flex-shrink-0" /> {selected.phone}
                  </div>
                )}
                {selected.address && (
                  <div className="flex items-start gap-2 text-sm text-ink-700">
                    <MapPin className="w-4 h-4 text-champagne-600 mt-0.5 flex-shrink-0" /> {selected.address}
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif text-lg text-ink-900">Order History</h3>
                  <span className="text-xs text-ink-400 uppercase tracking-wider">{selected.orders.length} order(s)</span>
                </div>
                {selected.orders.length === 0 ? (
                  <p className="text-sm text-ink-400">No orders</p>
                ) : (
                  <div className="space-y-3">
                    {selected.orders.map((o) => (
                      <div key={o.id} className="border border-ink-100 p-4 bg-white hover:border-champagne-300 transition-colors">
                        <div className="flex justify-between mb-2">
                          <p className="text-sm font-mono font-medium text-ink-900">{o.order_number}</p>
                          <p className="text-sm font-serif font-medium text-ink-900">{formatPrice(Number(o.total))}</p>
                        </div>
                        <div className="flex items-center justify-between text-xs text-ink-500">
                          <span>{formatDate(o.created_at)}</span>
                          <span className="uppercase tracking-wider font-medium text-champagne-700">{o.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
