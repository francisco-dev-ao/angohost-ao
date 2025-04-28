
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
  reference_id?: string | null;
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
