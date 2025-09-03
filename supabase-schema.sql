-- Dcube Store E-Commerce Database Schema
-- Run this in Supabase SQL Editor

-- Create products table
CREATE TABLE products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(100),
    brand VARCHAR(100),
    images JSONB DEFAULT '[]',
    stock_quantity INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table
CREATE TABLE orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50),
    shipping_address JSONB NOT NULL,
    billing_address JSONB,
    items JSONB NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    shipping_cost DECIMAL(10, 2) DEFAULT 0,
    tax DECIMAL(10, 2) DEFAULT 0,
    total DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    payment_method VARCHAR(50),
    payment_status VARCHAR(50) DEFAULT 'pending',
    tracking_number VARCHAR(100),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create categories table
CREATE TABLE categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    image_url TEXT,
    parent_id UUID REFERENCES categories(id),
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admins table
CREATE TABLE admins (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'admin',
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Products are viewable by everyone" ON products
    FOR SELECT USING (is_active = true);

CREATE POLICY "Orders are viewable by customer" ON orders
    FOR SELECT USING (customer_email = auth.email());

-- Insert sample categories
INSERT INTO categories (name, slug, display_order) VALUES
    ('Clothing', 'clothing', 1),
    ('Toys', 'toys', 2),
    ('Nursery', 'nursery', 3),
    ('Feeding', 'feeding', 4),
    ('Bath & Care', 'bath-care', 5),
    ('Travel', 'travel', 6);

-- Insert sample products
INSERT INTO products (name, slug, description, price, category, brand, stock_quantity, is_featured, is_active, images) VALUES
    ('Organic Cotton Onesie Set', 'organic-cotton-onesie-set', 'Soft and comfortable organic cotton onesies perfect for newborns', 29.99, 'clothing', 'Dcube Store', 50, true, true, '["https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400"]'),
    ('Wooden Rattle Toy', 'wooden-rattle-toy', 'Handcrafted wooden rattle toy, safe and eco-friendly', 15.99, 'toys', 'EcoBaby', 30, true, true, '["https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400"]'),
    ('Baby Crib Mobile', 'baby-crib-mobile', 'Musical crib mobile with soft hanging toys', 39.99, 'nursery', 'DreamyNights', 20, true, true, '["https://images.unsplash.com/photo-1519689680058-324335c77eba?w=400"]');