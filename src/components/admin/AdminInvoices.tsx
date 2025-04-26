
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Calendar, RefreshCcw, DownloadIcon, FileText, CreditCard, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { DataTable } from "../ui/data-table";

export const AdminInvoices = () => {
  const [dateFilter, setDateFilter] = useState('this-month');
  const [isLoading, setIsLoading] = useState(false);
  
  // Dados de exemplo para os gráficos
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
  
  // Lista de faturas de exemplo
  const recentInvoices = [
    { id: 'INV-001', customer: 'Carlos Silva', service: 'Hospedagem WordPress', amount: 15000, status: 'paid', date: '2023-08-15', dueDate: '2023-09-15' },
    { id: 'INV-002', customer: 'Maria Santos', service: 'Domínio .ao', amount: 5000, status: 'pending', date: '2023-08-14', dueDate: '2023-09-14' },
    { id: 'INV-003', customer: 'João Pereira', service: 'Email Profissional', amount: 8000, status: 'overdue', date: '2023-08-13', dueDate: '2023-08-30' },
    { id: 'INV-004', customer: 'Ana Costa', service: 'Hospedagem cPanel', amount: 12000, status: 'paid', date: '2023-08-12', dueDate: '2023-09-12' },
    { id: 'INV-005', customer: 'Pedro Nunes', service: 'Servidor VPS', amount: 25000, status: 'cancelled', date: '2023-08-11', dueDate: '2023-09-11' },
  ];
  
  const refreshData = () => {
    setIsLoading(true);
    // Simular uma atualização de dados
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-500">Paga</Badge>;
      case 'pending':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-300">Pendente</Badge>;
      case 'overdue':
        return <Badge className="bg-red-500">Vencida</Badge>;
      case 'cancelled':
        return <Badge variant="secondary">Cancelada</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-AO', {
      style: 'currency',
      currency: 'AOA',
      minimumFractionDigits: 0
    }).format(value);
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Faturas Emitidas</CardDescription>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">142</CardTitle>
              <FileText className="h-6 w-6 text-primary opacity-75" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Esse mês</span>
              <div className="flex items-center text-green-600">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                <span>12%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Faturado</CardDescription>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">{formatCurrency(2070000)}</CardTitle>
              <CreditCard className="h-6 w-6 text-primary opacity-75" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Esse mês</span>
              <div className="flex items-center text-green-600">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                <span>8%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Faturas Pagas</CardDescription>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">108</CardTitle>
              <Badge className="bg-green-500">76%</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total: {formatCurrency(1620000)}</span>
              <div className="flex items-center text-green-600">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                <span>5%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Faturas Vencidas</CardDescription>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">15</CardTitle>
              <Badge className="bg-red-500">11%</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total: {formatCurrency(225000)}</span>
              <div className="flex items-center text-red-600">
                <ArrowDownRight className="mr-1 h-4 w-4" />
                <span>2%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Receita Mensal</CardTitle>
            <CardDescription>Valor total de faturas emitidas por mês</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={monthlyRevenue}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => `${value/1000}K`} />
                <Tooltip formatter={(value) => [formatCurrency(value as number), "Valor"]} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="valor" 
                  name="Receita" 
                  stroke="#8884d8" 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Métodos de Pagamento</CardTitle>
            <CardDescription>Distribuição por método de pagamento</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={paymentMethodsData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" tickFormatter={(value) => `${value/1000}K`} />
                <YAxis dataKey="name" type="category" width={150} />
                <Tooltip formatter={(value) => [formatCurrency(value as number), "Valor"]} />
                <Legend />
                <Bar dataKey="valor" name="Valor" fill="#82ca9d" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
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
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <div className="grid grid-cols-7 p-4 font-medium border-b">
                  <div>Nº</div>
                  <div>Cliente</div>
                  <div>Serviço</div>
                  <div>Emissão</div>
                  <div>Vencimento</div>
                  <div>Valor</div>
                  <div className="text-right">Status</div>
                </div>
                
                {recentInvoices.map((invoice) => (
                  <div key={invoice.id} className="grid grid-cols-7 p-4 items-center border-b">
                    <div>{invoice.id}</div>
                    <div>{invoice.customer}</div>
                    <div>{invoice.service}</div>
                    <div>{invoice.date}</div>
                    <div>{invoice.dueDate}</div>
                    <div>{formatCurrency(invoice.amount)}</div>
                    <div className="text-right">{getStatusBadge(invoice.status)}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pending">
          {/* Conteúdo para faturas pendentes */}
        </TabsContent>
        
        <TabsContent value="paid">
          {/* Conteúdo para faturas pagas */}
        </TabsContent>
        
        <TabsContent value="overdue">
          {/* Conteúdo para faturas vencidas */}
        </TabsContent>
      </Tabs>
    </div>
  );
};
