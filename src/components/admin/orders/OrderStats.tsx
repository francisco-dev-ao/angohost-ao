
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, CheckCircle, Clock, XCircle } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';

interface OrderStatsProps {
  totalOrders: number;
  confirmedOrders: number;
  pendingOrders: number;
  cancelledOrders: number;
  totalRevenue: number;
}

export const OrderStats = ({
  totalOrders,
  confirmedOrders,
  pendingOrders,
  cancelledOrders,
  totalRevenue
}: OrderStatsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Visão Geral</CardTitle>
        <CardDescription>Resumo dos pedidos</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Total de Pedidos</span>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              <span className="text-2xl font-bold">{totalOrders}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Confirmados</span>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="font-medium">{confirmedOrders}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Pendentes</span>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-yellow-500" />
                <span className="font-medium">{pendingOrders}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Cancelados</span>
              <div className="flex items-center gap-1">
                <XCircle className="h-4 w-4 text-red-500" />
                <span className="font-medium">{cancelledOrders}</span>
              </div>
            </div>
          </div>
          
          <div className="pt-4">
            <span className="text-sm text-muted-foreground">Faturamento Total</span>
            <div className="text-2xl font-bold text-primary">
              {formatCurrency(totalRevenue)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
