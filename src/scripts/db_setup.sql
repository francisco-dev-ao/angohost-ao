
-- This SQL script creates all necessary tables for the application
-- Note: This is for reference. You should execute it directly on your PostgreSQL server

-- Customers table
CREATE TABLE IF NOT EXISTS customers (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  nif TEXT,
  billing_address TEXT,
  city TEXT,
  postal_code TEXT,
  country TEXT DEFAULT 'Angola',
  account_balance NUMERIC DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Contact profiles table
CREATE TABLE IF NOT EXISTS contact_profiles (
  id TEXT PRIMARY KEY,
  customer_id TEXT REFERENCES customers(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  nif TEXT,
  profile_name TEXT,
  billing_address TEXT,
  city TEXT,
  postal_code TEXT,
  country TEXT DEFAULT 'Angola',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  customer_id TEXT NOT NULL,
  total_amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'pending',
  payment_method TEXT,
  payment_id TEXT,
  reference TEXT,
  invoice_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  order_id TEXT REFERENCES orders(id),
  product_name TEXT NOT NULL,
  product_type TEXT NOT NULL,
  product_id TEXT,
  price NUMERIC NOT NULL,
  period TEXT,
  quantity INTEGER DEFAULT 1,
  details TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Invoices table
CREATE TABLE IF NOT EXISTS invoices (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  order_id TEXT REFERENCES orders(id),
  customer_id TEXT REFERENCES customers(id),
  invoice_number TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'unpaid',
  payment_method TEXT,
  due_date TIMESTAMP WITH TIME ZONE,
  paid_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Domains table
CREATE TABLE IF NOT EXISTS domains (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  name TEXT NOT NULL,
  tld TEXT NOT NULL,
  customer_id TEXT REFERENCES customers(id),
  registration_date TIMESTAMP WITH TIME ZONE,
  expiry_date TIMESTAMP WITH TIME ZONE,
  auto_renew BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'pending',
  ns1 TEXT,
  ns2 TEXT,
  ns3 TEXT,
  ns4 TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Hosting plans table
CREATE TABLE IF NOT EXISTS hosting_plans (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  price NUMERIC NOT NULL,
  period TEXT,
  renewal_price NUMERIC,
  features TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Support tickets table
CREATE TABLE IF NOT EXISTS support_tickets (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  customer_id TEXT REFERENCES customers(id),
  subject TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT DEFAULT 'open',
  priority TEXT DEFAULT 'medium',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Ticket messages table
CREATE TABLE IF NOT EXISTS ticket_messages (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  ticket_id TEXT REFERENCES support_tickets(id),
  user_id TEXT,
  message TEXT NOT NULL,
  is_staff BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

