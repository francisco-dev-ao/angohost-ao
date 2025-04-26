
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Calendar, RefreshCcw, DownloadIcon, FileText, CheckCircle, Clock, AlertCircle, XCircle } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export const AdminOrders = () => {
  const [dateFilter, setDateFilter] = useState('this-month');
  const [isLoading, setIsLoading] = useState(false);
  
  // Dados de exemplo para os gráficos
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
  
  // Lista de pedidos de exemplo
  const recentOrders = [
    { id: 'ORD-001', customer: 'Carlos Silva', product: 'Hospedagem WordPress', amount: 15000, status: 'completed', date: '2023-08-15' },
    { id: 'ORD-002', customer: 'Maria Santos', product: 'Domínio .ao', amount: 5000, status: 'pending', date: '2023-08-14' },
    { id: 'ORD-003', customer: 'João Pereira', product: 'Email Profissional', amount: 8000, status: 'processing', date: '2023-08-13' },
    { id: 'ORD-004', customer: 'Ana Costa', product: 'Hospedagem cPanel', amount: 12000, status: 'completed', date: '2023-08-12' },
    { id: 'ORD-005', customer: 'Pedro Nunes', product: 'Servidor VPS', amount: 25000, status: 'cancelled', date: '2023-08-11' },
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
          <h2 className="text-2xl font-bold">Gerenciamento de Pedidos</h2>
          <p className="text-muted-foreground">Visualize e gerencie todos os pedidos do sistema</p>
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Status dos Pedidos</CardTitle>
            <CardDescription>Distribuição dos pedidos por status</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} pedidos`, 'Quantidade']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center mt-4 gap-4">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-[#0088FE] mr-1" /> 
                <span className="text-xs">Confirmados</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-[#00C49F] mr-1" /> 
                <span className="text-xs">Pendentes</span>
              </div>
              <div className="flex items-center">
                <XCircle className="h-4 w-4 text-[#FFBB28] mr-1" /> 
                <span className="text-xs">Cancelados</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pedidos ao Longo do Tempo</CardTitle>
            <CardDescription>Total de pedidos por período</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={ordersByTimeData}
                margin={{ top: 20, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} pedidos`, 'Quantidade']} />
                <Bar dataKey="pedidos" fill="#8884d8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

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
                  <span className="text-2xl font-bold">142</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Confirmados</span>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="font-medium">78</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Pendentes</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-yellow-500" />
                    <span className="font-medium">15</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Cancelados</span>
                  <div className="flex items-center gap-1">
                    <XCircle className="h-4 w-4 text-red-500" />
                    <span className="font-medium">7</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <span className="text-sm text-muted-foreground">Faturamento Total</span>
                <div className="text-2xl font-bold text-primary">
                  {formatCurrency(1850000)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Produtos Mais Vendidos</CardTitle>
          <CardDescription>Distribuição de pedidos e receita por produto</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={ordersByProductData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip formatter={(value, name) => {
                if (name === "pedidos") return [`${value} pedidos`, "Quantidade"];
                if (name === "receita") return [formatCurrency(value as number), "Receita"];
                return [value, name];
              }} />
              <Legend />
              <Bar yAxisId="left" dataKey="pedidos" name="Quantidade" fill="#8884d8" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="right" dataKey="receita" name="Receita" fill="#82ca9d" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="all" className="w-full">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="pending">Pendentes</TabsTrigger>
            <TabsTrigger value="completed">Confirmados</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelados</TabsTrigger>
          </TabsList>
          <Button>
            Novo Pedido
          </Button>
        </div>
        
        <TabsContent value="all" className="mt-6">
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
                
                {recentOrders.map((order) => (
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
        </TabsContent>
        
        <TabsContent value="pending">
          {/* Conteúdo para pedidos pendentes */}
        </TabsContent>
        
        <TabsContent value="completed">
          {/* Conteúdo para pedidos confirmados */}
        </TabsContent>
        
        <TabsContent value="cancelled">
          {/* Conteúdo para pedidos cancelados */}
        </TabsContent>
      </Tabs>
    </div>
  );
};
