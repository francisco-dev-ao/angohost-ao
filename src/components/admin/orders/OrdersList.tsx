
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from '@/utils/formatters';

interface Order {
  id: string;
  customer: string;
  product: string;
  amount: number;
  status: string;
  date: string;
}

interface OrdersListProps {
  orders: Order[];
}

export const OrdersList = ({ orders }: OrdersListProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500">Confirmado</Badge>;
      case 'pending':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-300">Pendente</Badge>;
      case 'processing':
        return <Badge variant="outline" className="text-blue-600 border-blue-300">Processando</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500">Cancelado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardContent className="p-0">
        <div className="rounded-md border">
          <div className="grid grid-cols-6 p-4 font-medium border-b">
            <div>ID</div>
            <div>Cliente</div>
            <div>Produto/Serviço</div>
            <div>Valor</div>
            <div>Status</div>
            <div className="text-right">Ações</div>
          </div>
          
          {orders.map((order) => (
            <div key={order.id} className="grid grid-cols-6 p-4 items-center border-b">
              <div>{order.id}</div>
              <div>{order.customer}</div>
              <div>{order.product}</div>
              <div>{formatCurrency(order.amount)}</div>
              <div>{getStatusBadge(order.status)}</div>
              <div className="text-right">
                <Button variant="ghost" size="sm">
                  Ver Detalhes
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
