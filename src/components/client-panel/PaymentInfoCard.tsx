
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CircleDollarSign, FileText, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PaymentInfoCardProps {
  accountBalance?: number;
}

export const PaymentInfoCard: React.FC<PaymentInfoCardProps> = ({ accountBalance = 0 }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-AO', {
      style: 'currency',
      currency: 'AOA',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <CircleDollarSign className="mr-2 h-5 w-5 text-primary" />
          Informações de Pagamento
        </CardTitle>
        <CardDescription>
          Gerencie suas faturas e saldo de conta
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          <div className="p-4 bg-background border rounded-md">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Saldo da Conta:</span>
              <span className={`text-xl font-semibold ${accountBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(accountBalance)}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link to="/painel-cliente/faturas" className="flex items-center justify-center">
                <FileText className="mr-2 h-4 w-4" />
                Ver Faturas
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/checkout" className="flex items-center justify-center">
                <PlusCircle className="mr-2 h-4 w-4" />
                Adicionar Saldo
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button className="w-full" asChild>
          <Link to="/payment/instructions">
            Métodos de Pagamento
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
