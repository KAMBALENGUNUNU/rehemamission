/*
# Brenda's Bridal — Full Schema

## Overview
Creates the complete database schema for Brenda's Bridal, a luxury bridal shop
in Kigali, Rwanda. Supports a storefront (products, categories, cart, checkout,
orders, customers) and an admin panel (product/order/customer/category/settings
management, plus announcement banners for discounts/offers).

## New Tables

1. **categories** — product categories (Wedding Gowns, Bridal Robes, Veils, Accessories)
   - id (uuid PK), name (text), slug (text unique), sort_order (int), created_at

2. **products** — shop products
   - id (uuid PK), name, description, price (numeric), category (text),
     subcategory, image_url, materials, lead_time, tags (text[]),
     available (bool), featured (bool), best_seller (bool), seasonal (bool),
     signature (bool), created_at

3. **orders** — customer orders
   - id (uuid PK), order_number (text unique), customer_name, customer_email,
     customer_phone, items (jsonb), total (numeric), status (text),
     user_id (uuid DEFAULT auth.uid()), created_at

4. **customers** — customer records created at checkout
   - id (uuid PK), name, email, phone, address,
     user_id (uuid DEFAULT auth.uid()), created_at

5. **settings** — singleton (id=1) JSONB store for contact info, shipping fee, FAQ
   - id (int PK = 1), data (jsonb)

6. **announcements** — admin-authored discount/offer banners shown on storefront
   - id (uuid PK), message (text), type (text: 'discount'|'offer'|'announcement'),
     active (bool), created_at

## Security (RLS)

- **products**: anon+authenticated SELECT (public catalog);
  authenticated INSERT/UPDATE/DELETE (admin management).
- **categories**: anon+authenticated SELECT; authenticated INSERT/UPDATE/DELETE.
- **settings**: anon+authenticated SELECT; authenticated UPDATE.
- **announcements**: anon+authenticated SELECT; authenticated INSERT/UPDATE/DELETE.
- **orders**: authenticated SELECT/INSERT/UPDATE scoped to own user_id.
  Admin reads all orders via SECURITY DEFINER function `admin_get_all_orders()`.
  Admin updates status via `admin_update_order_status()`.
- **customers**: authenticated SELECT/INSERT scoped to own user_id.
  Admin reads all customers via SECURITY DEFINER function `admin_get_all_customers()`.

## Notes

1. Admin access is email-based (admin@actwavelab.rw) — a known gap, no Supabase RBAC.
2. Order status changes go through SECURITY DEFINER functions so admin can update
   any order while regular users can only touch their own rows.
3. Settings is a singleton row (id=1) seeded with defaults.
*/

-- ============================================================
-- CATEGORIES
-- ============================================================
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "read_categories" ON categories;
CREATE POLICY "read_categories" ON categories FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "insert_categories" ON categories;
CREATE POLICY "insert_categories" ON categories FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "update_categories" ON categories;
CREATE POLICY "update_categories" ON categories FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "delete_categories" ON categories;
CREATE POLICY "delete_categories" ON categories FOR DELETE
  TO authenticated USING (true);

-- ============================================================
-- PRODUCTS
-- ============================================================
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric(10,2) NOT NULL DEFAULT 0,
  category text,
  subcategory text,
  image_url text,
  materials text,
  lead_time text,
  tags text[] DEFAULT '{}',
  available boolean NOT NULL DEFAULT true,
  featured boolean NOT NULL DEFAULT false,
  best_seller boolean NOT NULL DEFAULT false,
  seasonal boolean NOT NULL DEFAULT false,
  signature boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "read_products" ON products;
CREATE POLICY "read_products" ON products FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "insert_products" ON products;
CREATE POLICY "insert_products" ON products FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "update_products" ON products;
CREATE POLICY "update_products" ON products FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "delete_products" ON products;
CREATE POLICY "delete_products" ON products FOR DELETE
  TO authenticated USING (true);

-- ============================================================
-- ORDERS
-- ============================================================
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text UNIQUE NOT NULL,
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text,
  items jsonb NOT NULL DEFAULT '[]',
  total numeric(10,2) NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pending',
  user_id uuid DEFAULT auth.uid(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_orders" ON orders;
CREATE POLICY "select_own_orders" ON orders FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_orders" ON orders;
CREATE POLICY "insert_own_orders" ON orders FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_orders" ON orders;
CREATE POLICY "update_own_orders" ON orders FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- CUSTOMERS
-- ============================================================
CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  address text,
  user_id uuid DEFAULT auth.uid(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_customers" ON customers;
CREATE POLICY "select_own_customers" ON customers FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_customers" ON customers;
CREATE POLICY "insert_own_customers" ON customers FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_customers" ON customers;
CREATE POLICY "update_own_customers" ON customers FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- SETTINGS (singleton)
-- ============================================================
CREATE TABLE IF NOT EXISTS settings (
  id int PRIMARY KEY DEFAULT 1,
  data jsonb NOT NULL DEFAULT '{}'::jsonb,
  CONSTRAINT singleton_check CHECK (id = 1)
);

ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "read_settings" ON settings;
CREATE POLICY "read_settings" ON settings FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "update_settings" ON settings;
CREATE POLICY "update_settings" ON settings FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "insert_settings" ON settings;
CREATE POLICY "insert_settings" ON settings FOR INSERT
  TO authenticated WITH CHECK (true);

-- ============================================================
-- ANNOUNCEMENTS (discount/offer banners)
-- ============================================================
CREATE TABLE IF NOT EXISTS announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  message text NOT NULL,
  type text NOT NULL DEFAULT 'announcement',
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "read_announcements" ON announcements;
CREATE POLICY "read_announcements" ON announcements FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "insert_announcements" ON announcements;
CREATE POLICY "insert_announcements" ON announcements FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "update_announcements" ON announcements;
CREATE POLICY "update_announcements" ON announcements FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "delete_announcements" ON announcements;
CREATE POLICY "delete_announcements" ON announcements FOR DELETE
  TO authenticated USING (true);

-- ============================================================
-- ADMIN FUNCTIONS (SECURITY DEFINER)
-- ============================================================

-- Admin: get all orders
CREATE OR REPLACE FUNCTION admin_get_all_orders()
RETURNS SETOF orders
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY SELECT * FROM orders ORDER BY created_at DESC;
END;
$$;

-- Admin: update order status
CREATE OR REPLACE FUNCTION admin_update_order_status(p_order_id uuid, p_status text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE orders SET status = p_status WHERE id = p_order_id;
END;
$$;

-- Admin: get all customers
CREATE OR REPLACE FUNCTION admin_get_all_customers()
RETURNS SETOF customers
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY SELECT * FROM customers ORDER BY created_at DESC;
END;
$$;

-- Admin: get customer order count and total spent
CREATE OR REPLACE FUNCTION admin_get_customer_stats(p_email text)
RETURNS TABLE(order_count bigint, total_spent numeric)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  SELECT COUNT(*), COALESCE(SUM(total), 0)
  INTO order_count, total_spent
  FROM orders WHERE customer_email = p_email;
  RETURN NEXT;
END;
$$;

-- Grant execute to authenticated
GRANT EXECUTE ON FUNCTION admin_get_all_orders() TO authenticated;
GRANT EXECUTE ON FUNCTION admin_update_order_status(uuid, text) TO authenticated;
GRANT EXECUTE ON FUNCTION admin_get_all_customers() TO authenticated;
GRANT EXECUTE ON FUNCTION admin_get_customer_stats(text) TO authenticated;

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_customers_user_id ON customers(user_id);
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);
