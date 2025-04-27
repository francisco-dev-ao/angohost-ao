
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CircleDollarSign, PlusCircle, ArrowRight } from 'lucide-react';
import { formatCurrency } from '@/utils/format';
import { Link } from 'react-router-dom';

export interface PaymentInfoCardProps {
  accountBalance?: number;
}

export const PaymentInfoCard = ({ accountBalance = 254600 }: PaymentInfoCardProps) => {
  return (
    <Card className="border-green-100 bg-green-50">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-green-800">
          <CircleDollarSign className="mr-2 h-5 w-5 text-green-600" />
          Saldo da Conta
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-2">
          <div className="text-3xl font-bold text-green-700">
            {formatCurrency(accountBalance)}
          </div>
          <p className="text-sm text-green-600 mt-1">
            Saldo disponível para pagamento de serviços
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full space-y-2">
          <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
            <Link to="/payment/add-funds">
              <PlusCircle className="mr-2 h-4 w-4" />
              Adicionar Fundos
            </Link>
          </Button>
          <Button variant="outline" className="w-full border-green-200 text-green-700 hover:bg-green-100" asChild>
            <Link to="/painel-cliente/faturas">
              Ver Histórico
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
