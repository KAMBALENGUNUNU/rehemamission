import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useStore } from '@/store/StoreContext';

export default function SignUp() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const redirect = params.get('redirect') || '/';
  const { signUp } = useStore();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    const { error } = await signUp(form.email, form.password, form.name);
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
          <p className="eyebrow mt-2">Create Your Account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 bg-champagne-100/40 p-8">
          {error && (
            <div className="p-3 bg-rose-100 border border-rose-300 text-rose-700 text-sm">
              {error}
            </div>
          )}
          <div>
            <label className="block text-xs tracking-[0.15em] uppercase text-ink-500 mb-2">Full Name</label>
            <input
              type="text" required value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
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
            <label className="block text-xs tracking-[0.15em] uppercase text-ink-500 mb-2">Password</label>
            <input
              type="password" required value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="input-field"
            />
            <p className="text-xs text-ink-400 mt-1.5">Minimum 6 characters</p>
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-sm text-ink-500 mt-6">
          Already have an account?{' '}
          <Link to={`/login${redirect !== '/' ? `?redirect=${redirect}` : ''}`} className="text-champagne-700 hover:text-champagne-600 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
