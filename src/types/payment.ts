
export type PaymentMethod = 'emis' | 'bank-transfer' | 'credit-card' | 'account_balance';

export interface PaymentDetails {
  amount: number;
  reference: string;
  description?: string;
  paymentMethod?: PaymentMethod;
}
