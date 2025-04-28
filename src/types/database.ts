
// Database types that match your PostgreSQL schema

export interface Customer {
  id: string;
  user_id: string | null;
  name: string;
  email: string;
  phone: string | null;
  nif: string | null;
  id_number: string | null;
  billing_address: string | null;
  city: string | null;
  country: string | null;
  postal_code: string | null;
  created_at: string;
  updated_at: string | null;
  account_balance: number | null;
}

export interface ContactProfile {
  id: string;
  customer_id: string;
  profile_name: string | null;
  name: string;
  email: string;
  phone: string | null;
  nif: string | null;
  billing_address: string | null;
  city: string | null;
  postal_code: string | null;
  country: string | null;
  created_at: string;
  updated_at: string | null;
}

export interface AccountTransaction {
  id: string;
  customer_id: string;
  amount: number;
  description: string | null;
  previous_balance: number | null;
  current_balance: number | null;
  created_at: string;
  reference_id: string | null;
  transaction_type: string | null;
}

export interface DedicatedServer {
  id: string;
  customer_id: string;
  plan_id: string | null;
  server_name: string | null;
  ip_address: string | null;
  cpu: string | null;
  ram: number | null;
  storage: number | null;
  bandwidth: number | null;
  os: string | null;
  status: string | null;
  created_at: string;
  updated_at: string | null;
}

export interface Domain {
  id: string;
  customer_id: string;
  name: string | null;
  tld: string | null;
  status: string | null;
  registration_date: string | null;
  expiry_date: string | null;
  auto_renew: boolean;
  ns1: string | null;
  ns2: string | null;
  ns3: string | null;
  ns4: string | null;
  created_at: string;
  updated_at: string | null;
}

export interface EmailAccount {
  id: string;
  customer_id: string;
  domain_id: string;
  email_address: string | null;
  plan_id: string | null;
  status: string | null;
  quota: number | null;
  created_at: string;
  updated_at: string | null;
}

export interface HostingPlan {
  id: string;
  name: string | null;
  type: string | null;
  price: number | null;
  renewal_price: number | null;
  period: string | null;
  features: any;
  is_active: boolean;
  created_at: string;
  updated_at: string | null;
}

export interface HostingService {
  id: string;
  customer_id: string;
  plan_id: string | null;
  domain_id: string | null;
  status: string | null;
  server_name: string | null;
  ip_address: string | null;
  username: string | null;
  password: string | null;
  created_at: string;
  updated_at: string | null;
}

export interface Invoice {
  id: string;
  customer_id: string;
  number: string | null;
  total_amount: number | null;
  status: string | null;
  due_date: string | null;
  paid_date: string | null;
  payment_method: string | null;
  notes: string | null;
  created_at: string;
}

export interface NotificationPreference {
  id: string;
  customer_id: string;
  email: boolean;
  sms: boolean;
  whatsapp: boolean;
  push_notifications: boolean;
  created_at: string;
}

export interface Notification {
  id: string;
  customer_id: string;
  title: string | null;
  message: string | null;
  type: string | null;
  is_read: boolean;
  sent_at: string;
}

export interface Order {
  id: string;
  customer_id: string;
  status: string | null;
  total_amount: number | null;
  created_at: string;
  updated_at: string | null;
}

export interface OrderItem {
  id: string;
  order_id: string;
  description: string | null;
  type: string | null;
  reference_id: string | null;
  price: number | null;
  quantity: number;
  total: number | null;
  created_at: string;
}

export interface Profile {
  id: string;
  customer_id: string;
  profile_type: string | null;
  name: string | null;
  email: string | null;
  phone: string | null;
  created_at: string;
}

export interface SupportTicket {
  id: string;
  customer_id: string;
  subject: string | null;
  department: string | null;
  priority: string | null;
  status: string | null;
  created_at: string;
  updated_at: string | null;
}

export interface TicketMessage {
  id: string;
  ticket_id: string;
  sender_type: string | null;
  message: string | null;
  attachments: string | null;
  sent_at: string;
}
