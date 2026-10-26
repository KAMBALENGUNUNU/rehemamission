import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { supabase, DEFAULT_SETTINGS, type Settings } from '@/lib/supabase';
import { formatPrice, generateOrderNumber } from '@/lib/utils';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart, session } = useStore();
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [form, setForm] = useState({ full_name: '', email: '', phone: '', address: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    supabase.from('settings').select('data').eq('id', 1).maybeSingle().then(({ data }) => {
      if (data?.data) setSettings({ ...DEFAULT_SETTINGS, ...data.data });
    });
  }, []);

  useEffect(() => {
    if (!session) {
      navigate('/login?redirect=/checkout');
      return;
    }
    if (cart.length === 0 && !success) {
      navigate('/shop');
      return;
    }
    if (session?.user) {
      setForm((prev) => ({
        ...prev,
        full_name: prev.full_name || (session.user.user_metadata?.full_name ?? ''),
        email: prev.email || (session.user.email ?? ''),
      }));
    }
  }, [session, cart.length, navigate, success]);

  const shipping = settings.shipping_fee;
  const total = cartTotal + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.full_name || !form.email || !form.phone || !form.address) {
      return;
    }
    setSubmitting(true);

    const orderNumber = generateOrderNumber();
    const items = cart.map((i) => ({
      id: i.id,
      name: i.name,
      price: i.price,
      quantity: i.quantity,
      image_url: i.image_url,
      category: i.category,
    }));

    const newOrder = {
      id: 'ord_' + Date.now(),
      order_number: orderNumber,
      customer_name: form.full_name,
      customer_email: form.email,
      customer_phone: form.phone,
      customer_address: form.address,
      items,
      total,
      status: 'pending',
      user_id: session?.user?.id || 'usr_' + Date.now(),
      created_at: new Date().toISOString(),
    };

    // Store in localStorage immediately so it is 100% available in Profile and Admin
    try {
      const storedOrdersRaw = localStorage.getItem('bb_orders');
      const storedOrders = storedOrdersRaw ? JSON.parse(storedOrdersRaw) : [];
      storedOrders.unshift(newOrder);
      localStorage.setItem('bb_orders', JSON.stringify(storedOrders));
    } catch (e) {
      console.error('Error saving local order:', e);
    }

    // Try remote database insert
    try {
      await supabase.from('orders').insert({
        order_number: orderNumber,
        customer_name: form.full_name,
        customer_email: form.email,
        customer_phone: form.phone,
        items,
        total,
        status: 'pending',
        user_id: session?.user?.id,
      });

      await supabase.from('customers').upsert({
        name: form.full_name,
        email: form.email,
        phone: form.phone,
        address: form.address,
        user_id: session?.user?.id,
      }, { onConflict: 'email' });
    } catch (e) {
      console.log('Supabase sync notice:', e);
    }

    clearCart();
    setSuccess(orderNumber);
    setSubmitting(false);

    try {
      window.dispatchEvent(new Event('order_placed'));
      window.dispatchEvent(new Event('storage'));
    } catch {}
  };

  if (success) {
    return (
      <div className="page-enter max-w-2xl mx-auto px-4 py-32 text-center">
        <div className="w-20 h-20 rounded-full bg-sage-100 flex items-center justify-center mx-auto mb-8 animate-scale-in">
          <Check className="w-10 h-10 text-sage-600" strokeWidth={1.5} />
        </div>
        <h1 className="font-serif text-4xl font-light text-ink-900 mb-4">Order Confirmed</h1>
        <p className="text-ink-500 font-light mb-2">Thank you for your purchase.</p>
        <p className="text-sm text-ink-400 mb-6">Your order number is</p>
        <p className="font-serif text-3xl text-champagne-700 mb-10 tracking-wider font-medium">{success}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => navigate('/profile')} className="btn-primary">
            Visualize My Orders
          </button>
          <button onClick={() => navigate('/shop')} className="btn-outline">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-enter max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <h1 className="font-serif text-4xl md:text-5xl font-light text-ink-900 mb-12 text-center">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Form */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="font-serif text-2xl font-light text-ink-900 mb-4">Contact & Shipping</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs tracking-[0.15em] uppercase text-ink-500 mb-2">Full Name</label>
              <input
                type="text" required value={form.full_name}
                onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-xs tracking-[0.15em] uppercase text-ink-500 mb-2">Email</label>
              <input
                type="email" required value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-xs tracking-[0.15em] uppercase text-ink-500 mb-2">Phone</label>
              <input
                type="tel" required value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-xs tracking-[0.15em] uppercase text-ink-500 mb-2">Address</label>
              <input
                type="text" required value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-champagne-100/50 p-8 sticky top-28">
            <h2 className="font-serif text-xl font-light text-ink-900 mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="w-14 h-18 bg-champagne-200 flex-shrink-0 overflow-hidden">
                    {item.image_url && <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />}
                  </div>
                  <div className="flex-1 text-sm">
                    <p className="text-ink-900 font-medium">{item.name}</p>
                    <p className="text-ink-400 text-xs">Qty: {item.quantity}</p>
                    <p className="text-ink-600">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-2 pb-4 border-b border-ink-200">
              <div className="flex justify-between text-sm text-ink-600">
                <span>Subtotal</span><span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-ink-600">
                <span>Shipping</span><span>{formatPrice(shipping)}</span>
              </div>
            </div>
            <div className="flex justify-between items-center py-4 mb-6">
              <span className="font-serif text-lg text-ink-900">Total</span>
              <span className="font-serif text-2xl text-ink-900">{formatPrice(total)}</span>
            </div>
            <button type="submit" disabled={submitting} className="btn-primary w-full">
              {submitting ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
