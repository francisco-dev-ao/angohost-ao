
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAddFunds } from '@/hooks/useAddFunds';

interface AddFundsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAddFunds: () => void;
}

export const AddFundsDialog = ({ isOpen, onOpenChange, onAddFunds }: AddFundsDialogProps) => {
  const { amount, setAmount, isLoading, handleAddFunds } = useAddFunds(onSuccess);
  
  function onSuccess() {
    onOpenChange(false);
    onAddFunds();
  }

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
