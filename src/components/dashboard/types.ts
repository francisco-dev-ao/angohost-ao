
export type OrderItem = {
  id: string;
  order_id: string;
  product_name: string;
  product_type: string;
  price: number;
  quantity: number;
  period: string;
}

export type Order = {
  id: string;
  invoice_number: string | null;
  created_at: string;
  status: string;
  total_amount: number;
  payment_method: string | null;
  items: OrderItem[];
}
