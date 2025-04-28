
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Invoice } from '@/types/billing-types';
import { toast } from 'sonner';

interface CustomerData {
  id: string;
  account_balance: number;
}

export const useInvoicePayment = (onSuccess?: () => void) => {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [customerData, setCustomerData] = useState<CustomerData | null>(null);

  const handlePayInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsPaymentDialogOpen(true);
  };

  const handlePayWithBalance = async () => {
    if (!selectedInvoice || !customerData) return;
    
    try {
      setIsProcessing(true);
      
      if (customerData.account_balance < (selectedInvoice.total_amount || 0)) {
        toast.error('Saldo insuficiente para pagar esta fatura');
        return;
      }
      
      const newBalance = customerData.account_balance - (selectedInvoice.total_amount || 0);
      
      const { error: updateBalanceError } = await supabase
        .from('customers')
        .update({ account_balance: newBalance })
        .eq('id', customerData.id);
        
      if (updateBalanceError) throw updateBalanceError;
      
      const { error: updateInvoiceError } = await supabase
        .from('invoices')
        .update({ 
          status: 'paid', 
          paid_date: new Date().toISOString(),
          payment_method: 'account_balance'
        })
        .eq('id', selectedInvoice.id);
        
      if (updateInvoiceError) throw updateInvoiceError;
      
      await supabase
        .from('account_transactions')
        .insert({
          customer_id: customerData.id,
          amount: selectedInvoice.total_amount,
          previous_balance: customerData.account_balance,
          current_balance: newBalance,
          transaction_type: 'payment',
          description: `Pagamento da fatura #${selectedInvoice.number}`,
          reference_id: selectedInvoice.reference_id
        });
      
      if (selectedInvoice.reference_id) {
        await supabase
          .from('orders')
          .update({ status: 'paid' })
          .eq('id', selectedInvoice.reference_id);
      }
      
      toast.success('Pagamento realizado com sucesso!');
      setIsPaymentDialogOpen(false);
      
      if (onSuccess) {
        onSuccess();
      }
      
      setCustomerData({
        ...customerData,
        account_balance: newBalance
      });
      
    } catch (err: any) {
      console.error('Erro ao processar pagamento:', err);
      toast.error('Não foi possível processar o pagamento. Tente novamente mais tarde.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePayWithCreditCard = () => {
    toast.info('Redirecionando para o processador de pagamentos...');
    setIsPaymentDialogOpen(false);
  };

  return {
    selectedInvoice,
    isPaymentDialogOpen,
    isProcessing,
    customerData,
    setCustomerData,
    setIsPaymentDialogOpen,
    handlePayInvoice,
    handlePayWithBalance,
    handlePayWithCreditCard,
  };
};
