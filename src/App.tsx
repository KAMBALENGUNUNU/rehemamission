import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect, Component, type ReactNode } from 'react';

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; error: Error | null }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Unhandled runtime error in React tree:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-slate-800/90 border border-slate-700 p-8 rounded-2xl shadow-2xl space-y-4">
            <h2 className="font-serif text-2xl text-amber-400">Rehema Mission Rwanda</h2>
            <p className="text-slate-300 text-sm">
              We encountered a temporary display issue. Please refresh or return to the home page.
            </p>
            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="px-5 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs uppercase tracking-wider transition-all"
              >
                Reload Page
              </button>
              <a
                href="/"
                className="px-5 py-2 rounded-full bg-slate-700 hover:bg-slate-600 text-white text-xs uppercase tracking-wider transition-all"
              >
                Go Home
              </a>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
import { StoreProvider } from '@/store/StoreContext';
import Header from '@/components/Header';
import KazeHeader from '@/components/KazeHeader';
import Footer from '@/components/Footer';
import KazeFooter from '@/components/KazeFooter';

import Home from '@/pages/Home';
import OurStory from '@/pages/OurStory';
import OurWork from '@/pages/OurWork';
import ArtGallery from '@/pages/ArtGallery';
import Visit from '@/pages/Visit';
import Partner from '@/pages/Partner';
import Contact from '@/pages/Contact';
import Favorites from '@/pages/Favorites';
import Login from '@/pages/Login';
import SignUp from '@/pages/SignUp';
import Profile from '@/pages/Profile';

import AdminLogin from '@/pages/admin/AdminLogin';
import AdminLayout from '@/pages/admin/AdminLayout';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminProducts from '@/pages/admin/AdminProducts';
import AdminOrders from '@/pages/admin/AdminOrders';
import AdminCustomers from '@/pages/admin/AdminCustomers';
import AdminCategories from '@/pages/admin/AdminCategories';
import AdminSettings from '@/pages/admin/AdminSettings';
import AdminCampaigns from '@/pages/admin/AdminCampaigns';
import AdminReviews from '@/pages/admin/AdminReviews';
import AdminAnnouncements from '@/pages/admin/AdminAnnouncements';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function StorefrontLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isKazePage =
    location.pathname.startsWith('/gallery') ||
    location.pathname.startsWith('/kaze');

  return (
    <div className={`min-h-screen flex flex-col ${isKazePage ? 'bg-[#F9EB9A] text-stone-900' : 'bg-slate-50 text-slate-900'}`}>
      {isKazePage ? <KazeHeader /> : <Header />}
      <main className={`flex-1 ${isKazePage ? '' : 'pt-16 sm:pt-20'}`}>{children}</main>
      {isKazePage ? <KazeFooter /> : <Footer />}
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <StoreProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="customers" element={<AdminCustomers />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="campaigns" element={<AdminCampaigns />} />
            <Route path="reviews" element={<AdminReviews />} />
            <Route path="announcements" element={<AdminAnnouncements />} />
          </Route>

          {/* Rehema Mission Rwanda storefront routes */}
          <Route path="/" element={<StorefrontLayout><Home /></StorefrontLayout>} />
          <Route path="/our-story" element={<StorefrontLayout><OurStory /></StorefrontLayout>} />
          <Route path="/about" element={<Navigate to="/our-story" replace />} />
          <Route path="/our-work" element={<StorefrontLayout><OurWork /></StorefrontLayout>} />
          <Route path="/gallery" element={<StorefrontLayout><ArtGallery /></StorefrontLayout>} />
          <Route path="/kaze" element={<Navigate to="/gallery" replace />} />
          <Route path="/kaze-collection" element={<Navigate to="/gallery" replace />} />
          <Route path="/shop" element={<Navigate to="/gallery" replace />} />
          <Route path="/visit" element={<StorefrontLayout><Visit /></StorefrontLayout>} />
          <Route path="/partner" element={<StorefrontLayout><Partner /></StorefrontLayout>} />
          <Route path="/contact" element={<StorefrontLayout><Contact /></StorefrontLayout>} />
          <Route path="/favorites" element={<StorefrontLayout><Favorites /></StorefrontLayout>} />
          <Route path="/login" element={<StorefrontLayout><Login /></StorefrontLayout>} />
          <Route path="/signup" element={<StorefrontLayout><SignUp /></StorefrontLayout>} />
          <Route path="/profile" element={<StorefrontLayout><Profile /></StorefrontLayout>} />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  </ErrorBoundary>
  );
}

export default App;
