
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, RefreshCcw } from "lucide-react";
import { AddFundsDialog } from './AddFundsDialog';

interface BalanceCardProps {
  balance: number;
  isLoading: boolean;
  onRefresh: () => void;
  formatCurrency: (amount: number) => string;
}

export const BalanceCard = ({ balance, isLoading, onRefresh, formatCurrency }: BalanceCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Seu Saldo</CardTitle>
        <CardDescription>Saldo disponível na sua conta</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <div className="text-3xl font-bold text-primary">
            {isLoading ? "Carregando..." : formatCurrency(balance)}
          </div>
          <p className="text-muted-foreground mt-2">
            Use seu saldo para pagar por serviços e faturas
          </p>
          <div className="flex gap-3 mt-6">
            <Button onClick={() => setIsDialogOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Adicionar Fundos
            </Button>
            <Button variant="outline" onClick={onRefresh} disabled={isLoading}>
              <RefreshCcw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Atualizar
            </Button>
          </div>
        </div>
      </CardContent>
      <AddFundsDialog 
        isOpen={isDialogOpen} 
        onOpenChange={setIsDialogOpen}
        onAddFunds={onRefresh}
      />
    </Card>
  );
};
