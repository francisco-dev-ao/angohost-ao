
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type ServiceCount = {
  hosting: number;
  domains: number;
  email: number;
}

export type InvoiceData = {
  month: string;
  total: number;
}

export const useCustomerStatistics = () => {
  const [loading, setLoading] = useState(true);
  const [serviceCounts, setServiceCounts] = useState<ServiceCount>({
    hosting: 0,
    domains: 0,
    email: 0
  });
  const [unpaidInvoices, setUnpaidInvoices] = useState(0);
  const [spendingData, setSpendingData] = useState<InvoiceData[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { data: session } = await supabase.auth.getSession();
        
        if (!session?.session?.user) {
          setLoading(false);
          return;
        }
        
        const { data: customerData } = await supabase
          .from('customers')
          .select('id')
          .eq('user_id', session.session.user.id)
          .single();
          
        if (!customerData) {
          setLoading(false);
          return;
        }
        
        const customerId = customerData.id;
        
        const [
          { data: hostingData },
          { data: domainData },
          { data: emailData },
          { data: invoiceData }
        ] = await Promise.all([
          supabase.from('hosting_services').select('id').eq('customer_id', customerId),
          supabase.from('domains').select('id').eq('customer_id', customerId),
          supabase.from('email_accounts').select('id').eq('customer_id', customerId),
          supabase.from('invoices')
            .select('*')
            .eq('customer_id', customerId)
            .in('status', ['unpaid', 'pending', 'overdue'])
        ]);
        
        const { data: invoiceHistory } = await supabase
          .from('invoices')
          .select('amount, created_at')
          .eq('customer_id', customerId)
          .eq('status', 'paid')
          .order('created_at', { ascending: true });
          
        setServiceCounts({
          hosting: hostingData?.length || 0,
          domains: domainData?.length || 0,
          email: emailData?.length || 0
        });
        
        setUnpaidInvoices(invoiceData?.length || 0);
        setSpendingData(processInvoiceHistory(invoiceHistory || []));
        
      } catch (error) {
        console.error('Erro ao carregar dados do dashboard:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  const processInvoiceHistory = (invoices: any[]): InvoiceData[] => {
    const months: {[key: string]: number} = {};
    
    invoices.forEach(invoice => {
      const date = new Date(invoice.created_at);
      const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
      
      if (!months[monthYear]) {
        months[monthYear] = 0;
      }
      
      months[monthYear] += invoice.amount;
    });
    
    return Object.keys(months).map(monthYear => ({
      month: monthYear,
      total: months[monthYear]
    }));
  };

  return {
    loading,
    serviceCounts,
    unpaidInvoices,
    spendingData
  };
};
