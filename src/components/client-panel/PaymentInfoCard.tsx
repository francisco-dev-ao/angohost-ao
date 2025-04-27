
import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CircleDollarSign, FileText, PlusCircle, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAccountBalance } from '@/hooks/useAccountBalance';
import { formatCurrency } from '@/utils/format';

interface PaymentInfoCardProps {
  accountBalance?: number;
}

export const PaymentInfoCard: React.FC<PaymentInfoCardProps> = ({ accountBalance: propAccountBalance }) => {
  const { balance, loading, fetchBalance } = useAccountBalance();

  useEffect(() => {
    if (propAccountBalance === undefined) {
      fetchBalance();
    }
  }, [propAccountBalance, fetchBalance]);

  const displayBalance = propAccountBalance !== undefined ? propAccountBalance : balance;

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
              {loading ? (
                <div className="flex items-center">
                  <Loader2 className="h-4 w-4 animate-spin mr-1" />
                  <span>Carregando...</span>
                </div>
              ) : (
                <span className={`text-xl font-semibold ${displayBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(displayBalance || 0)}
                </span>
              )}
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
