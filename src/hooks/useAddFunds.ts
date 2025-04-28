
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useAddFunds = (onSuccess: () => void) => {
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAddFunds = async () => {
    try {
      const amountValue = parseInt(amount);
      
      if (isNaN(amountValue) || amountValue <= 0) {
        toast.error('Por favor, insira um valor válido.');
        return;
      }
      
      setIsLoading(true);
      
      const { data: session } = await supabase.auth.getSession();
      
      if (!session?.session?.user) {
        toast.error('Você precisa estar logado para adicionar fundos');
        setIsLoading(false);
        return;
      }
      
      const { data: customerData } = await supabase
        .from('customers')
        .select('id, account_balance')
        .eq('user_id', session.session.user.id)
        .single();
      
      if (!customerData) {
        toast.error('Não foi possível encontrar seus dados de cliente');
        setIsLoading(false);
        return;
      }
      
      const currentBalance = customerData.account_balance || 0;
      const newBalance = currentBalance + amountValue;
      
      const { error: updateError } = await supabase
        .from('customers')
        .update({ account_balance: newBalance })
        .eq('id', customerData.id);
      
      if (updateError) throw updateError;
      
      const { error: transactionError } = await supabase
        .from('account_transactions')
        .insert({
          customer_id: customerData.id,
          amount: amountValue,
          previous_balance: currentBalance,
          current_balance: newBalance,
          transaction_type: 'deposit',
          description: 'Depósito de fundos'
        });
      
      if (transactionError) throw transactionError;
      
      toast.success(`AOA ${amountValue.toLocaleString()} adicionados à sua conta!`);
      setAmount('');
      onSuccess();
      
    } catch (err: any) {
      console.error('Erro ao adicionar fundos:', err);
      toast.error('Não foi possível adicionar fundos. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    amount,
    setAmount,
    isLoading,
    handleAddFunds
  };
};
