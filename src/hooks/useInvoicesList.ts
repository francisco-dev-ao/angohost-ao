
import { useState, useEffect } from 'react';
import { Invoice } from '@/types/database-types';
import { toast } from 'sonner';
import { invoiceService } from '@/integrations/postgres/client';

// Define the DatabaseInvoice interface that matches the structure from the database
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
      
      // Obter dados do usuário logado via serviço de autenticação local
      const userId = localStorage.getItem('userId');
      
      if (!userId) {
        setError("Você precisa estar logado para ver suas faturas");
        return;
      }
      
      const { data: customer, success } = await invoiceService.getByCustomerId(userId);
      
      if (!success || !customer) {
        setError('Não foi possível carregar suas faturas');
        return;
      }
      
      // Ensure customer data is treated as an array
      let invoicesData = Array.isArray(customer) ? customer : [];
      
      // Aplicar filtro se houver
      if (filterStatus && invoicesData.length > 0) {
        invoicesData = invoicesData.filter(invoice => 
          invoice.status?.toLowerCase() === filterStatus.toLowerCase()
        );
      }
      
      // Type safety: We need to treat the raw data as unknown first, then as DatabaseInvoice[]
      // This tells TypeScript we are intentionally doing this conversion
      const databaseInvoices = invoicesData as unknown as DatabaseInvoice[];
      
      const transformedInvoices: Invoice[] = databaseInvoices.map((invoice: DatabaseInvoice) => ({
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
