
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
