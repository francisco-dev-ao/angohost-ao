
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface AddFundsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAddFunds: () => void;
}

export const AddFundsDialog = ({ isOpen, onOpenChange, onAddFunds }: AddFundsDialogProps) => {
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
      onOpenChange(false);
      onAddFunds();
      
    } catch (err: any) {
      console.error('Erro ao adicionar fundos:', err);
      toast.error('Não foi possível adicionar fundos. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Fundos</DialogTitle>
          <DialogDescription>
            Insira o valor que deseja adicionar à sua conta.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <Label htmlFor="amount">Valor (AOA)</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="10000"
              className="mt-1"
              min="1"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleAddFunds} disabled={isLoading}>
            {isLoading ? "Processando..." : "Adicionar Fundos"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
