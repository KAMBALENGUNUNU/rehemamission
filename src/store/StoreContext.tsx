import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
  category: string | null;
  quantity: number;
};

type StoreContextType = {
  cart: CartItem[];
  favorites: string[];
  session: Session | null;
  isAdmin: boolean;
  addToCart: (item: Omit<CartItem, 'quantity'>, qty?: number) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  language: 'en' | 'fr';
  setLanguage: (lang: 'en' | 'fr') => void;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
};

const StoreContext = createContext<StoreContextType | null>(null);

const CART_KEY = 'bb_cart';
const FAV_KEY = 'bb_favorites';
const ADMIN_SESSION_KEY = 'bb_admin_session';
const CUSTOMER_SESSION_KEY = 'bb_customer_session';
const USERS_STORAGE_KEY = 'bb_registered_users';
const LANG_KEY = 'rehema_language';

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [session, setSession] = useState<Session | null>(null);
  const [adminAuth, setAdminAuth] = useState(false);
  const [language, setLanguageState] = useState<'en' | 'fr'>('en');

  useEffect(() => {
    try {
      const c = localStorage.getItem(CART_KEY);
      if (c) setCart(JSON.parse(c));
      const f = localStorage.getItem(FAV_KEY);
      if (f) setFavorites(JSON.parse(f));
      const a = localStorage.getItem(ADMIN_SESSION_KEY);
      if (a === 'true') setAdminAuth(true);

      const l = localStorage.getItem(LANG_KEY);
      if (l === 'en' || l === 'fr') setLanguageState(l);

      const cust = localStorage.getItem(CUSTOMER_SESSION_KEY);
      if (cust) {
        setSession(JSON.parse(cust));
      }
    } catch {
      /* ignore */
    }
  }, []);

  const setLanguage = useCallback((lang: 'en' | 'fr') => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(FAV_KEY, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        if (data.session.user?.email === 'admin@actwavelab.rw') {
          setAdminAuth(true);
        } else {
          setSession(data.session);
        }
      }
    }).catch(() => {});

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (newSession) {
        if (newSession.user?.email === 'admin@actwavelab.rw') {
          setAdminAuth(true);
        } else {
          setSession(newSession);
        }
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const addToCart = useCallback((item: Omit<CartItem, 'quantity'>, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + qty } : i));
      }
      return [...prev, { ...item, quantity: qty }];
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    if (qty < 1) return;
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i)));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id];
      try {
        localStorage.setItem(FAV_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  const signIn = useCallback(async (email: string, password: string) => {
    const cleanEmail = email.trim().toLowerCase();

    // 1. Dedicated Admin Authentication at /admin/login
    if (cleanEmail === 'admin@actwavelab.rw' && password === 'admin@actwavelab.rw') {
      setAdminAuth(true);
      localStorage.setItem(ADMIN_SESSION_KEY, 'true');
      return { error: null };
    }

    // 2. Try Supabase Auth
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email: cleanEmail, password });
      if (!error && data.session) {
        if (data.session.user?.email === 'admin@actwavelab.rw') {
          setAdminAuth(true);
          localStorage.setItem(ADMIN_SESSION_KEY, 'true');
        } else {
          setSession(data.session);
          localStorage.setItem(CUSTOMER_SESSION_KEY, JSON.stringify(data.session));
        }
        return { error: null };
      }
    } catch {
      // continue to customer fallback
    }

    // 3. Customer Authentication
    try {
      const storedUsersRaw = localStorage.getItem(USERS_STORAGE_KEY);
      const storedUsers = storedUsersRaw ? JSON.parse(storedUsersRaw) : [];
      const foundUser = storedUsers.find((u: any) => u.email.toLowerCase() === cleanEmail);

      if (foundUser) {
        if (foundUser.password && foundUser.password !== password) {
          return { error: 'Invalid password. Please check and try again.' };
        }
        const userSession = {
          user: {
            id: foundUser.id || 'usr_' + Date.now(),
            email: cleanEmail,
            user_metadata: { full_name: foundUser.name || cleanEmail.split('@')[0] },
          },
          access_token: 'cust-token-' + Date.now(),
        } as any;
        setSession(userSession);
        localStorage.setItem(CUSTOMER_SESSION_KEY, JSON.stringify(userSession));
        return { error: null };
      } else {
        // Direct first-time customer registration
        const newUserId = 'usr_' + Date.now();
        const autoUser = {
          id: newUserId,
          email: cleanEmail,
          name: cleanEmail.split('@')[0],
          password,
        };
        storedUsers.push(autoUser);
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(storedUsers));

        const userSession = {
          user: {
            id: newUserId,
            email: cleanEmail,
            user_metadata: { full_name: autoUser.name },
          },
          access_token: 'cust-token-' + Date.now(),
        } as any;
        setSession(userSession);
        localStorage.setItem(CUSTOMER_SESSION_KEY, JSON.stringify(userSession));
        return { error: null };
      }
    } catch (err: any) {
      return { error: err?.message || 'Login failed' };
    }
  }, []);

  const signUp = useCallback(async (email: string, password: string, fullName: string) => {
    const cleanEmail = email.trim().toLowerCase();

    // 1. Try Supabase Auth
    try {
      const { data, error } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: { data: { full_name: fullName } },
      });
      if (!error && data.session) {
        setSession(data.session);
        localStorage.setItem(CUSTOMER_SESSION_KEY, JSON.stringify(data.session));
        return { error: null };
      }
    } catch {
      // continue to fallback
    }

    // 2. Customer Registration
    try {
      const storedUsersRaw = localStorage.getItem(USERS_STORAGE_KEY);
      const storedUsers = storedUsersRaw ? JSON.parse(storedUsersRaw) : [];
      const newUserId = 'usr_' + Date.now();

      const existingIndex = storedUsers.findIndex((u: any) => u.email.toLowerCase() === cleanEmail);
      if (existingIndex >= 0) {
        storedUsers[existingIndex] = { ...storedUsers[existingIndex], name: fullName, password };
      } else {
        storedUsers.push({ id: newUserId, email: cleanEmail, name: fullName, password });
      }
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(storedUsers));

      const userSession = {
        user: {
          id: newUserId,
          email: cleanEmail,
          user_metadata: { full_name: fullName },
        },
        access_token: 'cust-token-' + Date.now(),
      } as any;

      setSession(userSession);
      localStorage.setItem(CUSTOMER_SESSION_KEY, JSON.stringify(userSession));
      return { error: null };
    } catch (err: any) {
      return { error: err?.message || 'Registration failed' };
    }
  }, []);

  const signOut = useCallback(async () => {
    setAdminAuth(false);
    setSession(null);
    localStorage.removeItem(ADMIN_SESSION_KEY);
    localStorage.removeItem(CUSTOMER_SESSION_KEY);
    await supabase.auth.signOut().catch(() => {});
  }, []);

  const effectiveIsAdmin = adminAuth;

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
        cart, favorites,
        session,
        isAdmin: effectiveIsAdmin,
        addToCart, removeFromCart, updateQty, clearCart,
        cartCount, cartTotal,
        toggleFavorite, isFavorite,
        language, setLanguage,
        signIn, signUp, signOut,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
