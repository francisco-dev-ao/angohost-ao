
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Invoice } from '@/types/billing-types';
import { toast } from 'sonner';

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

export const useInvoicesList = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data: session } = await supabase.auth.getSession();
      
      if (!session?.session?.user) {
        setError("Você precisa estar logado para ver suas faturas");
        return;
      }
      
      const { data: customer } = await supabase
        .from('customers')
        .select('id')
        .eq('user_id', session.session.user.id)
        .single();
        
      if (!customer) {
        setError('Não foi possível carregar seus dados de cliente');
        return;
      }
      
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
        notes: "",
        reference_id: invoice.order_id
      }));
      
      setInvoices(transformedInvoices);
    } catch (err: any) {
      console.error('Erro ao buscar faturas:', err);
      setError('Não foi possível carregar suas faturas. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
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
    filterStatus,
    hasUnpaidInvoices,
    setFilterStatus,
    fetchInvoices
  };
};
