
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useAccountBalance = () => {
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchBalance = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke('manage-balance', {
        body: { action: 'get' }
      });

      if (error) {
        console.error('Error fetching balance:', error);
        toast.error('Erro ao buscar saldo da conta');
        return null;
      }

      setBalance(data.balance);
      return data.balance;
    } catch (error) {
      console.error('Error in fetchBalance:', error);
      toast.error('Erro ao buscar saldo da conta');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const addFunds = async (amount: number) => {
    if (amount <= 0) {
      toast.error('O valor deve ser maior que zero');
      return false;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke('manage-balance', {
        body: { action: 'add', amount }
      });

      if (error) {
        console.error('Error adding funds:', error);
        toast.error('Erro ao adicionar fundos à conta');
        return false;
      }

      setBalance(data.balance);
      toast.success(`${amount} AOA adicionado à sua conta`);
      return true;
    } catch (error) {
      console.error('Error in addFunds:', error);
      toast.error('Erro ao adicionar fundos');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deductFunds = async (amount: number, description?: string) => {
    if (amount <= 0) {
      toast.error('O valor deve ser maior que zero');
      return false;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke('manage-balance', {
        body: { action: 'deduct', amount, description }
      });

      if (error) {
        console.error('Error deducting funds:', error);
        if (error.message?.includes('Insufficient funds')) {
          toast.error('Saldo insuficiente para esta operação');
        } else {
          toast.error('Erro ao deduzir fundos da conta');
        }
        return false;
      }

      setBalance(data.balance);
      toast.success(`${amount} AOA deduzido da sua conta`);
      return true;
    } catch (error) {
      console.error('Error in deductFunds:', error);
      toast.error('Erro ao deduzir fundos');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    balance,
    loading,
    fetchBalance,
    addFunds,
    deductFunds
  };
};
