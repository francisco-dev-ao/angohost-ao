
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Clock } from 'lucide-react';

export const PaymentMethodsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CreditCard className="mr-2 h-5 w-5 text-blue-500" />
          Formas de Pagamento
        </CardTitle>
        <CardDescription>Gerencie suas formas de pagamento</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center p-4 border rounded-md">
            <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-gray-500" />
            </div>
            <div className="ml-4">
              <p className="font-medium">Multicaixa Express</p>
              <p className="text-sm text-gray-500">Pagamentos instantâneos</p>
            </div>
            <Badge className="ml-auto">Ativo</Badge>
          </div>
          <div className="flex items-center p-4 border rounded-md">
            <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
              <Clock className="h-5 w-5 text-gray-500" />
            </div>
            <div className="ml-4">
              <p className="font-medium">Transferência Bancária</p>
              <p className="text-sm text-gray-500">Processamento em até 24h</p>
            </div>
            <Badge variant="outline" className="ml-auto">Disponível</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
