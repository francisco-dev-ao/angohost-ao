
import { useState, useEffect } from 'react';
import { Invoice } from '@/types/database-types';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export const useInvoicesList = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Obter dados do usuário logado via Supabase
      const { data: sessionData } = await supabase.auth.getSession();
      
      if (!sessionData.session?.user) {
        setError("Você precisa estar logado para ver suas faturas");
        setInvoices([]);
        return;
      }
      
      const userId = sessionData.session.user.id;
      
      // Buscar dados das faturas no Supabase
      let query = supabase
        .from('invoices')
        .select('*')
        .eq('customer_id', userId);
      
      // Aplicar filtro de status se existir
      if (filterStatus) {
        query = query.eq('status', filterStatus.toLowerCase());
      }
      
      const { data, error: supabaseError } = await query;
      
      if (supabaseError) {
        throw supabaseError;
      }
      
      // Transform data from database format to application format
      const transformedInvoices: Invoice[] = (data || []).map((invoice: any) => ({
        id: invoice.id,
        customer_id: invoice.customer_id,
        number: invoice.number || invoice.invoice_number || `INV-${invoice.id.slice(0, 8)}`,
        total_amount: invoice.total_amount || invoice.amount || 0,
        created_at: invoice.created_at,
        due_date: invoice.due_date || invoice.payment_deadline,
        status: invoice.status,
        paid_date: invoice.paid_date,
        payment_method: invoice.payment_method,
        notes: invoice.notes || "",
        reference_id: invoice.reference_id || invoice.order_id
      }));
      
      setInvoices(transformedInvoices);
    } catch (err: any) {
      console.error('Erro ao buscar faturas:', err);
      setError('Não foi possível carregar suas faturas. Tente novamente mais tarde.');
      setInvoices([]);
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
