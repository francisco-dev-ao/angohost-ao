
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RefreshCcw, DownloadIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RevenueChart } from './invoices/RevenueChart';
import { PaymentMethodsChart } from './invoices/PaymentMethodsChart';
import { InvoiceStats } from './invoices/InvoiceStats';
import { InvoicesTable } from './invoices/InvoicesTable';

export const AdminInvoices = () => {
  const [dateFilter, setDateFilter] = useState('this-month');
  const [isLoading, setIsLoading] = useState(false);
  
  // Dados de exemplo
  const monthlyRevenue = [
    { name: 'Jan', valor: 1200000 },
    { name: 'Fev', valor: 1500000 },
    { name: 'Mar', valor: 1300000 },
    { name: 'Abr', valor: 1800000 },
    { name: 'Mai', valor: 1600000 },
    { name: 'Jun', valor: 2000000 },
    { name: 'Jul', valor: 2200000 },
    { name: 'Ago', valor: 1900000 },
  ];
  
  const paymentMethodsData = [
    { name: 'Transferência', valor: 850000 },
    { name: 'Cartão de Crédito', valor: 650000 },
    { name: 'Multicaixa Express', valor: 420000 },
    { name: 'PayPal', valor: 150000 },
  ];
  
  // Adicionando alguns exemplos com desconto
  const recentInvoices = [
    { id: 'INV-001', customer: 'Carlos Silva', service: 'Hospedagem WordPress', amount: 15000, status: 'paid', date: '2023-08-15', dueDate: '2023-09-15' },
    { id: 'INV-002', customer: 'Maria Santos', service: 'Domínio .ao', amount: 5000, status: 'pending', date: '2023-08-14', dueDate: '2023-09-14' },
    { id: 'INV-003', customer: 'João Pereira', service: 'Email Profissional', amount: 8000, originalAmount: 10000, discount: 20, status: 'overdue', date: '2023-08-13', dueDate: '2023-08-30' },
    { id: 'INV-004', customer: 'Ana Costa', service: 'Hospedagem cPanel', amount: 12000, status: 'paid', date: '2023-08-12', dueDate: '2023-09-12' },
    { id: 'INV-005', customer: 'Pedro Nunes', service: 'Servidor VPS', amount: 25000, originalAmount: 30000, discount: 15, status: 'cancelled', date: '2023-08-11', dueDate: '2023-09-11' },
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
          <h2 className="text-2xl font-bold">Gerenciamento de Faturas</h2>
          <p className="text-muted-foreground">Visualize e gerencie todas as faturas do sistema</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hoje</SelectItem>
              <SelectItem value="this-week">Esta Semana</SelectItem>
              <SelectItem value="this-month">Este Mês</SelectItem>
              <SelectItem value="last-month">Mês Passado</SelectItem>
              <SelectItem value="this-year">Este Ano</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={refreshData} disabled={isLoading}>
            <RefreshCcw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          </Button>
          <Button variant="outline" size="sm">
            <DownloadIcon className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <InvoiceStats />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart data={monthlyRevenue} />
        <PaymentMethodsChart data={paymentMethodsData} />
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="pending">Pendentes</TabsTrigger>
            <TabsTrigger value="paid">Pagas</TabsTrigger>
            <TabsTrigger value="overdue">Vencidas</TabsTrigger>
          </TabsList>
          <Button>
            Nova Fatura
          </Button>
        </div>
        
        <TabsContent value="all" className="mt-6">
          <InvoicesTable invoices={recentInvoices} />
        </TabsContent>
        
        <TabsContent value="pending">
          <InvoicesTable invoices={recentInvoices.filter(invoice => invoice.status === 'pending')} />
        </TabsContent>
        
        <TabsContent value="paid">
          <InvoicesTable invoices={recentInvoices.filter(invoice => invoice.status === 'paid')} />
        </TabsContent>
        
        <TabsContent value="overdue">
          <InvoicesTable invoices={recentInvoices.filter(invoice => invoice.status === 'overdue')} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
