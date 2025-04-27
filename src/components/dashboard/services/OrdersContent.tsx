
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCcw, Package, AlertCircle } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';
import type { Order } from '../types';

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

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'concluído':
        return <Badge className="bg-green-500">Concluído</Badge>;
      case 'pending':
      case 'pendente':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-300">Pendente</Badge>;
      case 'processing':
      case 'processando':
        return <Badge variant="outline" className="text-blue-600 border-blue-300">Processando</Badge>;
      case 'cancelled':
      case 'cancelado':
        return <Badge variant="destructive">Cancelado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
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
          {loading ? (
            <div className="p-8 text-center text-muted-foreground">
              <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-3"></div>
              <p>Carregando pedidos...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center text-muted-foreground">
              <AlertCircle className="h-6 w-6 mx-auto mb-3 text-red-500" />
              <p>{error}</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <Package className="h-12 w-12 mx-auto mb-3 text-muted-foreground/60" />
              <p>Nenhum pedido encontrado</p>
            </div>
          ) : (
            <div className="divide-y">
              {orders.map((order) => (
                <div key={order.id} className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="font-medium">Pedido #{order.invoice_number || order.id.slice(0, 8)}</p>
                      <p className="text-sm text-muted-foreground">Data: {formatDate(order.created_at)}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium">
                        {formatCurrency(order.total_amount)}
                      </span>
                      {getStatusBadge(order.status)}
                    </div>
                  </div>
                  <div className="bg-muted/50 rounded-md p-3">
                    <p className="text-sm font-medium mb-2">Itens do pedido:</p>
                    <ul className="space-y-2">
                      {order.items.map((item) => (
                        <li key={item.id} className="text-sm flex justify-between">
                          <div>
                            <span>
                              {item.product_name} 
                              {item.quantity > 1 ? ` (${item.quantity}x)` : ''}
                            </span>
                            <span className="text-xs text-muted-foreground ml-2">
                              {item.period === 'yearly' ? 'Anual' : 'Mensal'}
                            </span>
                          </div>
                          <span>{formatCurrency(item.price)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
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
