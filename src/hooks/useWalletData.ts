
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Transaction {
  id: string;
  created_at: string;
  amount: number;
  previous_balance: number;
  current_balance: number;
  transaction_type: string;
  description: string;
}

export type WalletChartData = {
  name: string;
  amount: number;
};

export const useWalletData = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chartData, setChartData] = useState<WalletChartData[]>([]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-AO', {
      style: 'currency',
      currency: 'AOA',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getLastMonths = (count: number) => {
    const months = [];
    const currentDate = new Date();
    
    for (let i = 0; i < count; i++) {
      const date = new Date();
      date.setMonth(currentDate.getMonth() - i);
      
      months.unshift({
        monthIndex: date.getMonth(),
        year: date.getFullYear(),
        label: date.toLocaleString('pt-BR', { month: 'short' })
      });
    }
    
    return months;
  };

  const fetchWalletData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data: session } = await supabase.auth.getSession();
      
      if (!session?.session?.user) {
        setError("Você precisa estar logado para acessar essa funcionalidade");
        setIsLoading(false);
        return;
      }
      
      // Get the customer details
      const { data: customerData } = await supabase
        .from('customers')
        .select('id, account_balance')
        .eq('user_id', session.session.user.id)
        .single();
      
      if (!customerData) {
        setError("Não foi possível encontrar seus dados de cliente");
        setIsLoading(false);
        return;
      }
      
      setBalance(customerData.account_balance || 0);
      
      // Fetch transactions
      const { data: transactionsData, error: transactionsError } = await supabase
        .from('account_transactions')
        .select('*')
        .eq('customer_id', customerData.id)
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (transactionsError) throw transactionsError;
      
      setTransactions(transactionsData || []);
      
      // Prepare chart data
      if (transactionsData && transactionsData.length > 0) {
        // Group transactions by month
        const last6Months = getLastMonths(6);
        
        // Create data for chart
        const chartData = last6Months.map(month => {
          const monthlyTransactions = transactionsData.filter(t => {
            const transactionDate = new Date(t.created_at);
            return transactionDate.getMonth() === month.monthIndex && 
                  transactionDate.getFullYear() === month.year;
          });
          
          const deposits = monthlyTransactions
            .filter(t => t.transaction_type === 'deposit')
            .reduce((sum, t) => sum + t.amount, 0);
          
          return {
            name: month.label,
            amount: deposits
          };
        });
        
        setChartData(chartData);
      }
      
    } catch (err: any) {
      console.error('Erro ao buscar dados da carteira:', err);
      setError('Não foi possível carregar os dados da sua carteira. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWalletData();
  }, []);

  return {
    balance,
    transactions,
    isLoading,
    error,
    chartData,
    formatCurrency,
    fetchWalletData
  };
};
