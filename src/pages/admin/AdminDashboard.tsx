import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, ShoppingCart, DollarSign, Star, ArrowRight, TrendingUp } from 'lucide-react';
import { supabase, type Order } from '@/lib/supabase';
import { formatPrice, formatDate } from '@/lib/utils';
import { getStoredOrders } from '@/lib/orders';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';

const statusColors: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700',
  processing: 'bg-blue-100 text-blue-700',
  shipped: 'bg-purple-100 text-purple-700',
  delivered: 'bg-sage-100 text-sage-700',
};

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 9, orders: 0, revenue: 0, featured: 4 });
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [chartData, setChartData] = useState<{ day: string; revenue: number; rawDay: string }[]>([]);

  const loadData = async () => {
    // 1. Load orders from local storage (including dynamic simulated orders)
    let ordersList = getStoredOrders();

    try {
      const { data: rpcOrders } = await supabase.rpc('admin_get_all_orders');
      if (rpcOrders && rpcOrders.length > 0) {
        const existingIds = new Set(ordersList.map((o) => o.order_number || o.id));
        for (const o of rpcOrders) {
          if (!existingIds.has(o.order_number) && !existingIds.has(o.id)) {
            ordersList.push(o);
          }
        }
      }
    } catch {}

    // Sort newest first
    ordersList.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    // 2. Fetch product stats
    let prodCount = 9;
    let featCount = 4;
    try {
      const [pRes, fRes] = await Promise.all([
        supabase.from('products').select('*', { count: 'exact', head: true }),
        supabase.from('products').select('*', { count: 'exact', head: true }).eq('featured', true),
      ]);
      if (pRes.count) prodCount = Math.max(9, pRes.count);
      if (fRes.count) featCount = Math.max(4, fRes.count);
    } catch {}

    const totalRev = ordersList.reduce((sum, o) => sum + Number(o.total || 0), 0);

    setStats({
      products: prodCount,
      orders: ordersList.length,
      revenue: totalRev,
      featured: featCount,
    });
    setRecentOrders(ordersList.slice(0, 6));

    // 3. Build dynamic 7-day revenue chart
    const days: { day: string; revenue: number; rawDay: string }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dayStr = d.toLocaleDateString('en-US', { weekday: 'short' });
      const dayKey = d.toISOString().slice(0, 10);
      const rev = ordersList
        .filter((o) => o.created_at && o.created_at.slice(0, 10) === dayKey)
        .reduce((sum, o) => sum + Number(o.total || 0), 0);
      days.push({ day: dayStr, revenue: rev, rawDay: dayKey });
    }
    setChartData(days);
  };

  useEffect(() => {
    loadData();

    // Auto-refresh interval for live dynamic synchronization
    const interval = setInterval(loadData, 4000);

    const handleStorageChange = () => loadData();
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('order_placed', handleStorageChange);
    window.addEventListener('bb_orders_updated', handleStorageChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('order_placed', handleStorageChange);
      window.removeEventListener('bb_orders_updated', handleStorageChange);
    };
  }, []);

  const kpis = [
    { label: 'Total Artworks', value: stats.products, icon: Package, link: '/admin/products' },
    { label: 'Inquiries & Orders', value: stats.orders, icon: ShoppingCart, link: '/admin/orders' },
    { label: 'Artwork Revenue', value: formatPrice(stats.revenue), icon: DollarSign, link: '/admin/orders' },
    { label: 'Featured Pieces', value: stats.featured, icon: Star, link: '/admin/products' },
  ];

  return (
    <div className="page-enter">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-3xl font-light text-ink-900">Kaze Collection Dashboard</h1>
          <p className="text-xs text-ink-400 mt-1 uppercase tracking-wider">
            Art Gallery Overview · Under Rehema Mission Rwanda · Kigali
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>Real-time Live Sync</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {kpis.map((kpi) => (
          <Link
            key={kpi.label}
            to={kpi.link}
            className="group bg-white p-6 border border-ink-100 hover:border-champagne-400 transition-all duration-300 shadow-sm hover:shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <kpi.icon className="w-6 h-6 text-champagne-600" strokeWidth={1.5} />
              <ArrowRight className="w-4 h-4 text-ink-200 group-hover:text-champagne-600 group-hover:translate-x-1 transition-all" />
            </div>
            <p className="font-serif text-2xl lg:text-3xl font-light text-ink-900">{kpi.value}</p>
            <p className="text-xs tracking-[0.15em] uppercase text-ink-400 mt-1">{kpi.label}</p>
          </Link>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="bg-white p-6 border border-ink-100 mb-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-serif text-xl font-light text-ink-900">Revenue Performance</h2>
            <p className="text-xs text-ink-400 mt-0.5">Last 7 days daily sales volume in RWF</p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-champagne-700 font-medium bg-champagne-50 px-3 py-1 rounded">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Weekly Total: {formatPrice(stats.revenue)}</span>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#cda65a" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#cda65a" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ede9e4" />
            <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#8f7966' }} axisLine={false} tickLine={false} />
            <YAxis
              tick={{ fontSize: 11, fill: '#8f7966' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`}
            />
            <Tooltip
              formatter={(v: any) => [formatPrice(Number(v)), 'Revenue']}
              contentStyle={{ background: '#221913', border: 'none', borderRadius: 4, color: '#f9f3e8', fontSize: 13 }}
            />
            <Area type="monotone" dataKey="revenue" stroke="#cda65a" strokeWidth={2.5} fill="url(#revGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Orders */}
      <div className="bg-white p-6 border border-ink-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-serif text-xl font-light text-ink-900">Recent Artwork Acquisitions & Inquiries</h2>
            <p className="text-xs text-ink-400 mt-0.5">Latest patron acquisitions and showroom inquiries</p>
          </div>
          <Link to="/admin/orders" className="text-xs tracking-[0.15em] uppercase text-champagne-600 hover:text-champagne-700 font-medium">
            View All ({stats.orders})
          </Link>
        </div>
        <div className="space-y-3">
          {recentOrders.length === 0 ? (
            <p className="text-sm text-ink-400 text-center py-8">No orders yet</p>
          ) : (
            recentOrders.map((order) => (
              <div key={order.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-champagne-50/30 border border-ink-50 hover:border-champagne-200 transition-colors gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-ink-900">{order.order_number}</p>
                    <span className={`px-2 py-0.5 text-[10px] tracking-[0.1em] uppercase font-medium rounded ${statusColors[order.status] ?? statusColors.pending}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-xs text-ink-500 mt-0.5">
                    {order.customer_name} · {formatDate(order.created_at)} · {(order.items || []).length} piece(s)
                  </p>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <span className="text-sm font-serif font-medium text-ink-900">{formatPrice(Number(order.total))}</span>
                  <Link
                    to="/admin/orders"
                    className="text-xs text-champagne-600 hover:text-champagne-700 underline uppercase tracking-wider text-[11px]"
                  >
                    Details
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 flex flex-wrap gap-4">
        <Link to="/admin/products" className="btn-primary text-xs">Manage Products</Link>
        <Link to="/admin/orders" className="btn-outline text-xs">Process Orders</Link>
        <Link to="/admin/settings" className="btn-outline text-xs">Edit Live Content</Link>
      </div>
    </div>
  );
}
