import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { StoreProvider } from '@/store/StoreContext';
import Header from '@/components/Header';
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
  const isHome = location.pathname === '/';
  const isKazePage =
    location.pathname.startsWith('/gallery') ||
    location.pathname.startsWith('/kaze');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header />
      <main className="flex-1 pt-16 sm:pt-20">{children}</main>
      {isKazePage ? <KazeFooter /> : <Footer />}
    </div>
  );
}

function App() {
  return (
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
  );
}

export default App;
