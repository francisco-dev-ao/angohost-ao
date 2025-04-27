
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
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setLoading(false);
          return;
        }
        
        const { data: customerData } = await supabase
          .from('customers')
          .select('id')
          .eq('user_id', user.id)
          .single();
          
        if (!customerData) {
          setLoading(false);
          return;
        }
        
        const customerId = customerData.id;
        
        // Fetch service counts
        const [
          { data: hostingData },
          { data: domainData },
          { data: emailData },
          { data: unpaidInvoicesData }
        ] = await Promise.all([
          supabase.from('hosting_services').select('id').eq('customer_id', customerId),
          supabase.from('domains').select('id').eq('customer_id', customerId),
          supabase.from('email_accounts').select('id').eq('customer_id', customerId),
          supabase.from('invoices')
            .select('id')
            .eq('customer_id', customerId)
            .in('status', ['unpaid', 'pending', 'overdue'])
        ]);
        
        // Generate spending data (for demonstration we'll create mock data)
        const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];
        const mockSpendingData = months.map(month => ({
          month,
          total: Math.floor(Math.random() * 50000) + 10000
        }));
        
        setServiceCounts({
          hosting: hostingData?.length || 0,
          domains: domainData?.length || 0,
          email: emailData?.length || 0
        });
        
        setUnpaidInvoices(unpaidInvoicesData?.length || 0);
        setSpendingData(mockSpendingData);
        
      } catch (error) {
        console.error('Erro ao carregar dados do dashboard:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  return {
    loading,
    serviceCounts,
    unpaidInvoices,
    spendingData
  };
};
