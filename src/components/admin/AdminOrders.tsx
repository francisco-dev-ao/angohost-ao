import React, { useState } from 'react';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { OrderFilters } from './orders/OrderFilters';
import { OrderStatusChart } from './orders/OrderStatusChart';
import { OrderTimeChart } from './orders/OrderTimeChart';
import { OrderStats } from './orders/OrderStats';
import { OrderProductsChart } from './orders/OrderProductsChart';
import { OrdersList } from './orders/OrdersList';
import { OrdersTabList } from './orders/OrdersTabList';

export const AdminOrders = () => {
  const [dateFilter, setDateFilter] = useState('this-month');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  
  // Example data (keeping the same data structure)
  const orderStatusData = [
    { name: 'Confirmados', value: 78 },
    { name: 'Pendentes', value: 15 },
    { name: 'Cancelados', value: 7 },
  ];
  
  const ordersByProductData = [
    { name: 'Hospedagem cPanel', pedidos: 38, receita: 152000 },
    { name: 'Hospedagem WordPress', pedidos: 25, receita: 87500 },
    { name: 'Domínios .AO', pedidos: 65, receita: 97500 },
    { name: 'Domínios Internacionais', pedidos: 42, receita: 63000 },
    { name: 'Email Profissional', pedidos: 18, receita: 54000 },
  ];
  
  const ordersByTimeData = [
    { name: 'Jan', pedidos: 12 },
    { name: 'Fev', pedidos: 19 },
    { name: 'Mar', pedidos: 15 },
    { name: 'Abr', pedidos: 28 },
    { name: 'Mai', pedidos: 22 },
    { name: 'Jun', pedidos: 31 },
    { name: 'Jul', pedidos: 45 },
    { name: 'Ago', pedidos: 32 },
  ];
  
  const recentOrders = [
    { id: 'ORD-001', customer: 'Carlos Silva', product: 'Hospedagem WordPress', amount: 15000, status: 'completed', date: '2023-08-15' },
    { id: 'ORD-002', customer: 'Maria Santos', product: 'Domínio .ao', amount: 5000, status: 'pending', date: '2023-08-14' },
    { id: 'ORD-003', customer: 'João Pereira', product: 'Email Profissional', amount: 8000, status: 'processing', date: '2023-08-13' },
    { id: 'ORD-004', customer: 'Ana Costa', product: 'Hospedagem cPanel', amount: 12000, status: 'completed', date: '2023-08-12' },
    { id: 'ORD-005', customer: 'Pedro Nunes', product: 'Servidor VPS', amount: 25000, status: 'cancelled', date: '2023-08-11' },
  ];
  
  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Gerenciamento de Pedidos</h2>
          <p className="text-muted-foreground">Visualize e gerencie todos os pedidos do sistema</p>
        </div>
        <OrderFilters
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          isLoading={isLoading}
          onRefresh={refreshData}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <OrderStatusChart data={orderStatusData} />
        <OrderTimeChart data={ordersByTimeData} />
        <OrderStats
          totalOrders={142}
          confirmedOrders={78}
          pendingOrders={15}
          cancelledOrders={7}
          totalRevenue={1850000}
        />
      </div>

      <OrderProductsChart data={ordersByProductData} />
      
      <Tabs defaultValue="all" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center">
          <OrdersTabList activeTab={activeTab} onTabChange={setActiveTab} />
          <Button>
            Novo Pedido
          </Button>
        </div>
        
        <TabsContent value="all" className="mt-6">
          <OrdersList orders={recentOrders} />
        </TabsContent>
        
        <TabsContent value="pending">
          <OrdersList orders={recentOrders.filter(order => order.status === 'pending')} />
        </TabsContent>
        
        <TabsContent value="completed">
          <OrdersList orders={recentOrders.filter(order => order.status === 'completed')} />
        </TabsContent>
        
        <TabsContent value="cancelled">
          <OrdersList orders={recentOrders.filter(order => order.status === 'cancelled')} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
