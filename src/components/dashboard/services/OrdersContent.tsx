
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';
import type { Order } from '../types';
import { OrderStatusBadge } from './orders/OrderStatusBadge';
import { OrderItemsList } from './orders/OrderItemsList';
import { OrdersLoadingError } from './orders/OrdersLoadingError';

interface OrdersContentProps {
  orders: Order[];
  loading: boolean;
  error: string | null;
  fetchOrders: () => void;
}

export const OrdersContent = ({ orders, loading, error, fetchOrders }: OrdersContentProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR').format(date);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Histórico de Pedidos</CardTitle>
          <CardDescription>Todos os seus pedidos realizados</CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={fetchOrders} disabled={loading}>
          <RefreshCcw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Atualizar
        </Button>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <OrdersLoadingError 
            loading={loading}
            error={error}
            isEmpty={orders.length === 0}
          />
          
          {!loading && !error && orders.length > 0 && (
            <div className="divide-y">
              {orders.map((order) => (
                <div key={order.id} className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="font-medium">
                        Pedido #{order.invoice_number || order.id.slice(0, 8)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Data: {formatDate(order.created_at)}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium">
                        {formatCurrency(order.total_amount)}
                      </span>
                      <OrderStatusBadge status={order.status} />
                    </div>
                  </div>
                  
                  <OrderItemsList items={order.items} />
                  
                  {order.payment_method && (
                    <p className="text-sm text-right mt-2">
                      Método de pagamento: {order.payment_method}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
