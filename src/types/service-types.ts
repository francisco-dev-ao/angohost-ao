
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
