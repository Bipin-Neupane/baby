-- Demo User Setup Script
-- Run this in Supabase SQL Editor to create demo user and sample data

-- Note: You'll need to create the actual auth user manually in Supabase Dashboard
-- Go to Authentication > Users > Add User
-- Email: demo@example.com
-- Password: demo123456

-- Insert sample orders for demo user
INSERT INTO orders (
    order_number,
    customer_email,
    customer_name,
    customer_phone,
    shipping_address,
    billing_address,
    items,
    subtotal,
    shipping_cost,
    tax,
    total,
    status,
    payment_method,
    payment_status,
    created_at
) VALUES 
(
    'DCB-' || EXTRACT(EPOCH FROM NOW())::bigint || '-1',
    'demo@example.com',
    'Demo User',
    '+1 (555) 123-4567',
    '{"street": "123 Demo Street", "city": "Demo City", "state": "CA", "zip": "12345", "country": "US"}',
    '{"street": "123 Demo Street", "city": "Demo City", "state": "CA", "zip": "12345", "country": "US"}',
    '[{"id": "1", "name": "Soft Bamboo Baby Blanket", "price": 29.99, "quantity": 1, "image": "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"}]',
    29.99,
    5.99,
    2.70,
    38.68,
    'delivered',
    'stripe',
    'completed',
    NOW() - INTERVAL '7 days'
),
(
    'DCB-' || EXTRACT(EPOCH FROM NOW())::bigint || '-2',
    'demo@example.com', 
    'Demo User',
    '+1 (555) 123-4567',
    '{"street": "123 Demo Street", "city": "Demo City", "state": "CA", "zip": "12345", "country": "US"}',
    '{"street": "123 Demo Street", "city": "Demo City", "state": "CA", "zip": "12345", "country": "US"}',
    '[{"id": "2", "name": "Organic Cotton Onesie Set", "price": 24.99, "quantity": 2, "image": "https://images.unsplash.com/photo-1522771930-78848d9293e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"}]',
    49.98,
    5.99,
    4.50,
    60.47,
    'shipped',
    'stripe', 
    'completed',
    NOW() - INTERVAL '3 days'
),
(
    'DCB-' || EXTRACT(EPOCH FROM NOW())::bigint || '-3',
    'demo@example.com',
    'Demo User', 
    '+1 (555) 123-4567',
    '{"street": "123 Demo Street", "city": "Demo City", "state": "CA", "zip": "12345", "country": "US"}',
    '{"street": "123 Demo Street", "city": "Demo City", "state": "CA", "zip": "12345", "country": "US"}',
    '[{"id": "3", "name": "Baby Carrier - Ergonomic", "price": 89.99, "quantity": 1, "image": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"}]',
    89.99,
    9.99,
    8.10,
    108.08,
    'processing', 
    'stripe',
    'completed',
    NOW() - INTERVAL '1 day'
);

SELECT 'Demo user orders created! Remember to create the auth user manually in Supabase Dashboard.' as status;