import { useState } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import {
  LayoutDashboard, Package, ShoppingCart, Users, FolderTree,
  Settings, Megaphone, Star, LogOut, Menu, X, BadgePercent,
} from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import KazeLogo from '@/components/logos/KazeLogo';

const adminNav = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/products', label: 'Artworks', icon: Package },
  { to: '/admin/orders', label: 'Inquiries & Sales', icon: ShoppingCart },
  { to: '/admin/customers', label: 'Art Buyers & Visitors', icon: Users },
  { to: '/admin/categories', label: 'Categories', icon: FolderTree },
  { to: '/admin/settings', label: 'Website Settings', icon: Settings },
  { to: '/admin/announcements', label: 'Announcements', icon: BadgePercent },
  { to: '/admin/campaigns', label: 'Exhibitions', icon: Megaphone },
  { to: '/admin/reviews', label: 'Testimonials', icon: Star },
];

export default function AdminLayout() {
  const { session, isAdmin, signOut } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isAdmin) {
    navigate('/admin/login');
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-ink-50 flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-ink-950 text-champagne-100 z-50 transition-transform duration-300 flex flex-col justify-between border-r border-champagne-200/10 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-champagne-200/10 flex-shrink-0">
          <Link to="/admin/dashboard" className="block group">
            <KazeLogo variant="dark" size="sm" showSubtitle={false} />
            <div className="mt-2.5">
              <p className="text-[10px] tracking-[0.25em] uppercase text-gold-400 font-semibold">
                Kaze Collection Portal
              </p>
              <p className="text-[9px] text-champagne-200/50 uppercase tracking-widest mt-0.5">
                Under Rehema Mission Rwanda
              </p>
            </div>
          </Link>
        </div>

        {/* Scrollable Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1.5 custom-scrollbar">
          {adminNav.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3.5 px-3.5 py-2.5 text-sm rounded-sm transition-all duration-200 ${
                  active
                    ? 'bg-gold-500/15 text-gold-400 font-medium border-l-2 border-gold-400 pl-3'
                    : 'text-champagne-200/70 hover:text-champagne-50 hover:bg-champagne-200/5'
                }`}
              >
                <item.icon className={`w-4 h-4 flex-shrink-0 ${active ? 'text-gold-400' : 'text-champagne-200/50'}`} strokeWidth={1.5} />
                <span className="tracking-wide text-xs uppercase">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Sign Out (Never overlapping) */}
        <div className="p-4 border-t border-champagne-200/10 flex-shrink-0 bg-ink-950">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3.5 px-3.5 py-2.5 text-xs uppercase tracking-wider text-champagne-200/60 hover:text-rose-400 hover:bg-rose-500/10 rounded-sm transition-all w-full text-left"
          >
            <LogOut className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-ink-950/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between p-4 bg-ink-950 text-champagne-50 sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)}>
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <span className="font-serif text-lg text-gold-400">Kaze Collection Admin</span>
          <div className="w-6" />
        </div>

        <main className="p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
