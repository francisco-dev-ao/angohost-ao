
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

export interface Profile {
  id: string;
  customer_id: string;
  profile_type: string | null;
  name: string | null;
  email: string | null;
  phone: string | null;
  created_at: string;
  first_name?: string | null;
  last_name?: string | null;
}
