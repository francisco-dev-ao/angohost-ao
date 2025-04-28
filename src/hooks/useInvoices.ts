
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Invoice } from '@/types/database';

interface CustomerData {
  id: string;
  account_balance: number;
}

// Define a more specific type for database invoices
interface DatabaseInvoice {
  id: string;
  invoice_number: string;
  amount: number;
  created_at: string;
  customer_id: string;
  due_date: string | null;
  status: string | null;
  paid_date: string | null;
  payment_method: string | null;
  order_id: string;
  notification_sent: boolean | null;
  payment_deadline: string | null;
  updated_at: string;
}

export const useInvoices = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [customerData, setCustomerData] = useState<CustomerData | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data: session } = await supabase.auth.getSession();
      
      if (!session?.session?.user) {
        setError("Você precisa estar logado para ver suas faturas");
        setLoading(false);
        return;
      }
      
      const { data: customer, error: customerError } = await supabase
        .from('customers')
        .select('id, account_balance')
        .eq('user_id', session.session.user.id)
        .single();
        
      if (customerError) {
        console.error('Erro ao buscar dados do cliente:', customerError);
        setError('Não foi possível carregar seus dados de cliente');
        setLoading(false);
        return;
      }
      
      setCustomerData(customer);
      
      let query = supabase
        .from('invoices')
        .select('*')
        .eq('customer_id', customer.id)
        .order('created_at', { ascending: false });
        
      if (filterStatus) {
        query = query.eq('status', filterStatus);
      }
        
      const { data, error } = await query;
      
      if (error) throw error;
      
      // Transform the data to match the Invoice type
      const transformedInvoices: Invoice[] = (data || []).map((invoice: DatabaseInvoice) => ({
        id: invoice.id,
        customer_id: invoice.customer_id,
        number: invoice.invoice_number || `INV-${invoice.id.slice(0, 8)}`,
        total_amount: invoice.amount || 0,
        created_at: invoice.created_at,
        due_date: invoice.due_date || invoice.payment_deadline,
        status: invoice.status,
        paid_date: invoice.paid_date,
        payment_method: invoice.payment_method,
        notes: "", // Default empty notes since it's not in the database
        reference_id: invoice.order_id // Use order_id as reference_id
      }));
      
      setInvoices(transformedInvoices);
    } catch (err: any) {
      console.error('Erro ao buscar faturas:', err);
      setError('Não foi possível carregar suas faturas. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

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
      fetchInvoices();
      
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

  useEffect(() => {
    fetchInvoices();
  }, [filterStatus]);

  const hasUnpaidInvoices = invoices.some(invoice => 
    ['unpaid', 'pending', 'overdue', 'não pago', 'pendente', 'vencido'].includes(invoice.status?.toLowerCase() || '')
  );

  return {
    invoices,
    loading,
    error,
    selectedInvoice,
    isPaymentDialogOpen,
    isProcessing,
    customerData,
    filterStatus,
    hasUnpaidInvoices,
    setFilterStatus,
    setIsPaymentDialogOpen,
    handlePayInvoice,
    handlePayWithBalance,
    handlePayWithCreditCard,
    fetchInvoices
  };
};
