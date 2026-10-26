import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { ensureSimulatedOrdersExist } from '@/lib/orders';
import KazeLogo from '@/components/logos/KazeLogo';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { session, isAdmin, signIn } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAdmin) {
      ensureSimulatedOrdersExist();
      navigate('/admin/dashboard');
    }
  }, [isAdmin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      setError(error);
    } else {
      ensureSimulatedOrdersExist();
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-ink-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 flex flex-col items-center">
          <KazeLogo variant="dark" size="lg" showSubtitle={false} className="justify-center mb-4" />
          <p className="font-serif text-3xl font-light text-champagne-50">Kaze Collection</p>
          <p className="text-[10px] tracking-[0.3em] uppercase text-gold-400 mt-2">
            Gallery Administration · Rehema Mission Rwanda
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 bg-ink-900 p-8 border border-champagne-200/10">
          {error && (
            <div className="p-3 bg-rose-900/30 border border-rose-700 text-rose-300 text-sm">
              {error}
            </div>
          )}
          <div>
            <label className="block text-xs tracking-[0.15em] uppercase text-champagne-200/60 mb-2">Email</label>
            <input
              type="email" required value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-ink-950 border border-champagne-200/20 text-champagne-50 placeholder-champagne-200/30 focus:outline-none focus:border-gold-400 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs tracking-[0.15em] uppercase text-champagne-200/60 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPwd ? 'text' : 'password'} required value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-ink-950 border border-champagne-200/20 text-champagne-50 placeholder-champagne-200/30 focus:outline-none focus:border-gold-400 transition-colors pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPwd(!showPwd)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-champagne-200/40 hover:text-champagne-200"
              >
                {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading} className="w-full px-8 py-3 bg-gold-500 text-ink-950 font-sans text-sm tracking-[0.2em] uppercase hover:bg-gold-400 transition-colors disabled:opacity-40">
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
