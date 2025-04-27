
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  nif: string | null;
  city: string | null;
  created_at: string;
  is_admin?: boolean;
}
