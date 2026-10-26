import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { formatPrice } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { supabase, DEFAULT_SETTINGS, type Settings } from '@/lib/supabase';

export default function Cart() {
  const { cart, removeFromCart, updateQty, cartTotal, session } = useStore();
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

  useEffect(() => {
    supabase.from('settings').select('data').eq('id', 1).maybeSingle().then(({ data }) => {
      if (data?.data) setSettings({ ...DEFAULT_SETTINGS, ...data.data });
    });
  }, []);

  if (cart.length === 0) {
    return (
      <div className="page-enter max-w-2xl mx-auto px-4 py-32 text-center">
        <ShoppingBag className="w-16 h-16 mx-auto text-ink-200 mb-8" strokeWidth={1} />
        <h1 className="font-serif text-4xl font-light text-ink-900 mb-4">Your Cart is Empty</h1>
        <p className="text-ink-500 font-light mb-10">Discover our exquisite collection of bridal pieces.</p>
        <Link to="/shop" className="btn-primary inline-block">Browse the Collection</Link>
      </div>
    );
  }

  const shipping = settings.shipping_fee;
  const total = cartTotal + shipping;

  return (
    <div className="page-enter max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <h1 className="font-serif text-4xl md:text-5xl font-light text-ink-900 mb-12 text-center">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Items */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-6 pb-6 border-b border-ink-100 animate-fade-up">
              <Link to={`/product/${item.id}`} className="flex-shrink-0">
                <div className="w-24 h-32 bg-champagne-100 overflow-hidden">
                  {item.image_url && <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />}
                </div>
              </Link>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-champagne-600">{item.category}</p>
                  <Link to={`/product/${item.id}`}>
                    <h3 className="font-serif text-lg text-ink-900 hover:text-champagne-700 transition-colors">{item.name}</h3>
                  </Link>
                  <p className="text-sm text-ink-500 mt-1">{formatPrice(item.price)}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center border border-ink-300">
                    <button onClick={() => updateQty(item.id, item.quantity - 1)} className="px-3 py-2 text-ink-700 hover:bg-ink-100 transition-colors">
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-4 py-2 text-sm text-ink-900 min-w-[2.5rem] text-center">{item.quantity}</span>
                    <button onClick={() => updateQty(item.id, item.quantity + 1)} className="px-3 py-2 text-ink-700 hover:bg-ink-100 transition-colors">
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-ink-900">{formatPrice(item.price * item.quantity)}</span>
                    <button onClick={() => removeFromCart(item.id)} className="text-ink-300 hover:text-rose-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-champagne-100/50 p-8 sticky top-28">
            <h2 className="font-serif text-2xl font-light text-ink-900 mb-6">Order Summary</h2>
            <div className="space-y-3 pb-4 border-b border-ink-200">
              <div className="flex justify-between text-sm text-ink-600">
                <span>Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-ink-600">
                <span>Shipping</span>
                <span>{formatPrice(shipping)}</span>
              </div>
              <p className="text-xs text-ink-400 font-light">Worldwide shipping from Kigali, Rwanda</p>
            </div>
            <div className="flex justify-between items-center py-4 mb-6">
              <span className="font-serif text-lg text-ink-900">Total</span>
              <span className="font-serif text-2xl text-ink-900">{formatPrice(total)}</span>
            </div>
            <Link
              to={session ? '/checkout' : '/login?redirect=/checkout'}
              className="btn-primary w-full block text-center"
            >
              Proceed to Checkout
            </Link>
            <Link to="/shop" className="block text-center mt-4 text-xs tracking-[0.15em] uppercase text-ink-500 hover:text-champagne-600 transition-colors">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
