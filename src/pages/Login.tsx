import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useStore } from '@/store/StoreContext';

export default function Login() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const redirect = params.get('redirect') || '/';
  const { signIn } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      setError(error);
    } else {
      navigate(redirect);
    }
  };

  return (
    <div className="page-enter min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link to="/" className="font-serif text-3xl font-light text-ink-900">Brenda's Bridal</Link>
          <p className="eyebrow mt-2">Welcome Back</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 bg-champagne-100/40 p-8">
          {error && (
            <div className="p-3 bg-rose-100 border border-rose-300 text-rose-700 text-sm">
              {error}
            </div>
          )}
          <div>
            <label className="block text-xs tracking-[0.15em] uppercase text-ink-500 mb-2">Email</label>
            <input
              type="email" required value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-xs tracking-[0.15em] uppercase text-ink-500 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPwd ? 'text' : 'password'} required value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPwd(!showPwd)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700"
              >
                {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-sm text-ink-500 mt-6">
          New to Brenda's?{' '}
          <Link to={`/signup${redirect !== '/' ? `?redirect=${redirect}` : ''}`} className="text-champagne-700 hover:text-champagne-600 font-medium">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
