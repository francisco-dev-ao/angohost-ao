
-- This SQL script creates all necessary tables for the application
-- Note: This is for reference. You should execute it directly on your PostgreSQL server

-- 1. Criar extensão para gerar UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Criar tabelas

CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID,
  name TEXT,
  email TEXT UNIQUE,
  phone TEXT,
  nif TEXT,
  id_number TEXT,
  billing_address TEXT,
  city TEXT,
  country TEXT,
  postal_code TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ,
  account_balance INTEGER
);

CREATE TABLE contact_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  profile_name TEXT,
  name TEXT,
  email TEXT,
  phone TEXT,
  nif TEXT,
  billing_address TEXT,
  city TEXT,
  postal_code TEXT,
  country TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

CREATE TABLE account_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  amount INTEGER,
  description TEXT,
  previous_balance INTEGER,
  current_balance INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  reference_id TEXT,
  transaction_type TEXT
);

CREATE TABLE dedicated_servers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  plan_id UUID,
  server_name TEXT,
  ip_address TEXT,
  cpu TEXT,
  ram INTEGER,
  storage INTEGER,
  bandwidth INTEGER,
  os TEXT,
  status TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

CREATE TABLE domains (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  name TEXT,
  tld TEXT,
  status TEXT,
  registration_date TIMESTAMPTZ,
  expiry_date TIMESTAMPTZ,
  auto_renew BOOLEAN DEFAULT FALSE,
  ns1 TEXT,
  ns2 TEXT,
  ns3 TEXT,
  ns4 TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

CREATE TABLE email_accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  domain_id UUID REFERENCES domains(id) ON DELETE CASCADE,
  email_address TEXT,
  plan_id UUID,
  status TEXT,
  quota INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

CREATE TABLE hosting_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT,
  type TEXT,
  price INTEGER,
  renewal_price INTEGER,
  period TEXT,
  features JSONB,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

CREATE TABLE hosting_services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  plan_id UUID REFERENCES hosting_plans(id),
  domain_id UUID REFERENCES domains(id),
  status TEXT,
  server_name TEXT,
  ip_address TEXT,
  username TEXT,
  password TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  number TEXT UNIQUE,
  total_amount INTEGER,
  status TEXT,
  due_date TIMESTAMPTZ,
  paid_date TIMESTAMPTZ,
  payment_method TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE notification_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  email BOOLEAN DEFAULT TRUE,
  sms BOOLEAN DEFAULT FALSE,
  whatsapp BOOLEAN DEFAULT FALSE,
  push_notifications BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  title TEXT,
  message TEXT,
  type TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  sent_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  status TEXT,
  total_amount INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  description TEXT,
  type TEXT,
  reference_id UUID,
  price INTEGER,
  quantity INTEGER DEFAULT 1,
  total INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  profile_type TEXT,
  name TEXT,
  email TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE support_tickets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  subject TEXT,
  department TEXT,
  priority TEXT,
  status TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

CREATE TABLE ticket_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_id UUID REFERENCES support_tickets(id) ON DELETE CASCADE,
  sender_type TEXT,
  message TEXT,
  attachments TEXT,
  sent_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Criar índices principais para melhorar desempenho

CREATE INDEX idx_customer_email ON customers(email);
CREATE INDEX idx_domain_name ON domains(name);
CREATE INDEX idx_invoice_number ON invoices(number);
CREATE INDEX idx_notification_customer ON notifications(customer_id);
CREATE INDEX idx_order_customer ON orders(customer_id);
CREATE INDEX idx_ticket_customer ON support_tickets(customer_id);
