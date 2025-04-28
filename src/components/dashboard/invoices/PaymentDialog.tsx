
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Invoice } from '@/types/database';
import { formatCurrency } from '@/utils/formatters';

interface PaymentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedInvoice: Invoice | null;
  customerBalance: number;
  isProcessing: boolean;
  onPayWithBalance: () => void;
  onPayWithCreditCard: () => void;
}

export const PaymentDialog = ({
  isOpen,
  onOpenChange,
  selectedInvoice,
  customerBalance,
  isProcessing,
  onPayWithBalance,
  onPayWithCreditCard
}: PaymentDialogProps) => {
  const hasInsufficientBalance = selectedInvoice && customerBalance < (selectedInvoice.total_amount || 0);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pagar Fatura</DialogTitle>
          <DialogDescription>
            Escolha como deseja pagar a fatura #{selectedInvoice?.number}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="flex justify-between items-center">
            <span>Valor Total:</span>
            <span className="font-bold text-lg">
              {selectedInvoice ? formatCurrency(selectedInvoice.total_amount || 0) : ""}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span>Seu Saldo:</span>
            <span className={`font-bold text-lg ${hasInsufficientBalance ? 'text-red-600' : 'text-green-600'}`}>
              {formatCurrency(customerBalance)}
            </span>
          </div>
          
          {hasInsufficientBalance && (
            <Alert variant="destructive" className="mb-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Saldo insuficiente para esta fatura. Por favor, adicione fundos à sua conta ou use outro método de pagamento.
              </AlertDescription>
            </Alert>
          )}
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          {selectedInvoice && !hasInsufficientBalance && (
            <Button 
              className="flex-1" 
              onClick={onPayWithBalance} 
              disabled={isProcessing}
            >
              {isProcessing ? "Processando..." : "Pagar com Saldo"}
            </Button>
          )}
          
          <Button 
            variant="outline" 
            className="flex-1" 
            onClick={onPayWithCreditCard}
            disabled={isProcessing}
          >
            Pagar com Cartão de Crédito
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
