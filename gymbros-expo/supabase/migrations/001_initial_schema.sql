-- GymBros Database Schema Migration
-- Created: 2025-12-31
-- Description: Initial schema for GymBros e-commerce app

-- =====================================================
-- EXTENSIONS
-- =====================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- CUSTOM TYPES
-- =====================================================
CREATE TYPE order_status AS ENUM (
    'pending',
    'confirmed',
    'processing',
    'shipped',
    'delivered',
    'cancelled',
    'refunded'
);

-- =====================================================
-- TABLES
-- =====================================================

-- 1. Profiles (extends auth.users)
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    phone TEXT,
    avatar_url TEXT,
    preferred_currency TEXT DEFAULT 'MXN' CHECK (preferred_currency IN ('MXN', 'USD')),
    language TEXT DEFAULT 'es' CHECK (language IN ('es', 'en')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Addresses
CREATE TABLE addresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    address_type TEXT NOT NULL DEFAULT 'shipping' CHECK (address_type IN ('shipping', 'billing')),
    full_name TEXT NOT NULL,
    street_line1 TEXT NOT NULL,
    street_line2 TEXT,
    city TEXT NOT NULL,
    state_province TEXT,
    postal_code TEXT NOT NULL,
    country_code CHAR(2) NOT NULL DEFAULT 'MX',
    phone TEXT,
    is_default BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Categories
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    image_url TEXT,
    parent_id UUID REFERENCES categories(id),
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Products
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sku TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    category_id UUID REFERENCES categories(id),
    images TEXT[] NOT NULL DEFAULT '{}',
    sizes TEXT[] NOT NULL DEFAULT '{}',
    features TEXT[] NOT NULL DEFAULT '{}',
    is_new BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    inventory_count INTEGER DEFAULT 0 CHECK (inventory_count >= 0),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Orders
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number TEXT UNIQUE NOT NULL,
    user_id UUID NOT NULL REFERENCES profiles(id),
    status order_status NOT NULL DEFAULT 'pending',
    shipping_address_id UUID REFERENCES addresses(id),
    billing_address_id UUID REFERENCES addresses(id),
    subtotal DECIMAL(10,2) NOT NULL CHECK (subtotal >= 0),
    tax_amount DECIMAL(10,2) DEFAULT 0 CHECK (tax_amount >= 0),
    shipping_amount DECIMAL(10,2) DEFAULT 0 CHECK (shipping_amount >= 0),
    total_amount DECIMAL(10,2) NOT NULL CHECK (total_amount >= 0),
    currency TEXT DEFAULT 'MXN',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Order Items
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    size TEXT,
    unit_price DECIMAL(10,2) NOT NULL CHECK (unit_price >= 0),
    total_price DECIMAL(10,2) NOT NULL CHECK (total_price >= 0),
    -- Snapshot fields for order history
    product_name TEXT NOT NULL,
    product_image TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Wishlists
CREATE TABLE wishlists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, product_id)
);

-- 8. Cart Items (server-side persistence)
CREATE TABLE cart_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    size TEXT,
    quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, product_id, size)
);

-- =====================================================
-- INDEXES
-- =====================================================
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_is_active ON products(is_active);
CREATE INDEX idx_products_is_new ON products(is_new);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_addresses_user_id ON addresses(user_id);
CREATE INDEX idx_cart_items_user_id ON cart_items(user_id);
CREATE INDEX idx_wishlists_user_id ON wishlists(user_id);

-- =====================================================
-- FUNCTIONS
-- =====================================================

-- Auto-generate order number
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TRIGGER AS $$
BEGIN
    NEW.order_number := 'GB-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || 
                        LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_order_number
    BEFORE INSERT ON orders
    FOR EACH ROW
    EXECUTE FUNCTION generate_order_number();

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_cart_items_updated_at
    BEFORE UPDATE ON cart_items
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO profiles (id, email, full_name)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', '')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION handle_new_user();

-- =====================================================
-- ROW LEVEL SECURITY
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
    ON profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id);

-- Addresses policies
CREATE POLICY "Users can view own addresses"
    ON addresses FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create own addresses"
    ON addresses FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own addresses"
    ON addresses FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own addresses"
    ON addresses FOR DELETE
    USING (auth.uid() = user_id);

-- Categories policies (public read)
CREATE POLICY "Anyone can view categories"
    ON categories FOR SELECT
    TO anon, authenticated
    USING (true);

-- Products policies (public read)
CREATE POLICY "Anyone can view active products"
    ON products FOR SELECT
    TO anon, authenticated
    USING (is_active = true);

-- Orders policies
CREATE POLICY "Users can view own orders"
    ON orders FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create orders"
    ON orders FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Order Items policies
CREATE POLICY "Users can view own order items"
    ON order_items FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM orders
            WHERE orders.id = order_items.order_id
            AND orders.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can create order items for own orders"
    ON order_items FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM orders
            WHERE orders.id = order_items.order_id
            AND orders.user_id = auth.uid()
        )
    );

-- Wishlists policies
CREATE POLICY "Users can view own wishlist"
    ON wishlists FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can add to own wishlist"
    ON wishlists FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove from own wishlist"
    ON wishlists FOR DELETE
    USING (auth.uid() = user_id);

-- Cart Items policies
CREATE POLICY "Users can view own cart"
    ON cart_items FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can add to own cart"
    ON cart_items FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own cart"
    ON cart_items FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can remove from own cart"
    ON cart_items FOR DELETE
    USING (auth.uid() = user_id);
