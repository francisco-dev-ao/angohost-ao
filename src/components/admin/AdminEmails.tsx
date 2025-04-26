
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { RefreshCcw, Search, Mail, Server, AlertCircle, Database, Plus } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const AdminEmails = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  
  // Dados de exemplo para os gráficos
  const emailQuotaData = [
    { name: 'Utilizado', value: 35 },
    { name: 'Livre', value: 65 },
  ];
  
  const emailsByDomainData = [
    { name: 'exemplo.ao', value: 28 },
    { name: 'mycompany.com', value: 15 },
    { name: 'cliente.com.ao', value: 12 },
    { name: 'negocio.ao', value: 8 },
    { name: 'others.com', value: 14 },
  ];
  
  const emailsGrowthData = [
    { name: 'Jan', value: 45 },
    { name: 'Fev', value: 58 },
    { name: 'Mar', value: 62 },
    { name: 'Abr', value: 70 },
    { name: 'Mai', value: 85 },
    { name: 'Jun', value: 94 },
    { name: 'Jul', value: 102 },
    { name: 'Ago', value: 115 },
  ];
  
  // Lista de contas de email de exemplo
  const emailAccounts = [
    { id: 1, email: 'info@exemplo.ao', domain: 'exemplo.ao', quota: '5 GB', used: '2.3 GB', status: 'active', owner: 'João Silva' },
    { id: 2, email: 'suporte@mycompany.com', domain: 'mycompany.com', quota: '10 GB', used: '1.5 GB', status: 'active', owner: 'Maria Santos' },
    { id: 3, email: 'vendas@cliente.com.ao', domain: 'cliente.com.ao', quota: '5 GB', used: '4.1 GB', status: 'warning', owner: 'Carlos Ferreira' },
    { id: 4, email: 'admin@negocio.ao', domain: 'negocio.ao', quota: '20 GB', used: '5.6 GB', status: 'active', owner: 'Ana Costa' },
    { id: 5, email: 'marketing@mycompany.com', domain: 'mycompany.com', quota: '10 GB', used: '0.8 GB', status: 'suspended', owner: 'Pedro Nunes' },
  ];
  
  const refreshData = () => {
    setIsLoading(true);
    // Simular uma atualização de dados
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  
  const filteredEmails = emailAccounts.filter(account => {
    const matchesSearch = account.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.owner.toLowerCase().includes(searchTerm.toLowerCase());
                         
    if (statusFilter === 'all') return matchesSearch;
    return matchesSearch && account.status === statusFilter;
  });
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Ativo</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-500">Alerta</Badge>;
      case 'suspended':
        return <Badge className="bg-red-500">Suspenso</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Gerenciamento de Email</h2>
          <p className="text-muted-foreground">Visualize e gerencie todas as contas de email</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={refreshData} disabled={isLoading}>
            <RefreshCcw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          </Button>
          <Button>
            <Mail className="mr-2 h-4 w-4" />
            Nova Conta
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total de Contas</CardDescription>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">115</CardTitle>
              <Mail className="h-6 w-6 text-primary opacity-75" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              Em 28 domínios ativos
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Espaço Total</CardDescription>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">850 GB</CardTitle>
              <Database className="h-6 w-6 text-primary opacity-75" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              298 GB utilizados (35%)
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Contas com Alerta</CardDescription>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">8</CardTitle>
              <AlertCircle className="h-6 w-6 text-yellow-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              Próximas do limite de quota
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Servidor Principal</CardDescription>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">Online</CardTitle>
              <Server className="h-6 w-6 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              Uptime: 99.98% (últimas 24h)
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Utilização de Quota</CardTitle>
            <CardDescription>Espaço utilizado vs. disponível</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={emailQuotaData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {emailQuotaData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Domínio</CardTitle>
            <CardDescription>Contas de email por domínio</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={emailsByDomainData}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" name="Contas" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Crescimento Mensal</CardTitle>
            <CardDescription>Total de contas por mês</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={emailsGrowthData}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#82ca9d" name="Contas" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Contas de Email</CardTitle>
          <CardDescription>Gerenciamento de contas de email</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 justify-between mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Pesquisar por email, domínio ou proprietário..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="active">Ativos</SelectItem>
                  <SelectItem value="warning">Alerta</SelectItem>
                  <SelectItem value="suspended">Suspensos</SelectItem>
                </SelectContent>
              </Select>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Adicionar
              </Button>
            </div>
          </div>
          
          <div className="rounded-md border">
            <div className="grid grid-cols-6 p-4 font-medium border-b">
              <div>Email</div>
              <div>Domínio</div>
              <div>Proprietário</div>
              <div>Quota</div>
              <div>Status</div>
              <div className="text-right">Ações</div>
            </div>
            
            {filteredEmails.length > 0 ? (
              filteredEmails.map((account) => (
                <div key={account.id} className="grid grid-cols-6 p-4 items-center border-b">
                  <div>{account.email}</div>
                  <div>{account.domain}</div>
                  <div>{account.owner}</div>
                  <div>
                    {account.used} / {account.quota}
                  </div>
                  <div>{getStatusBadge(account.status)}</div>
                  <div className="text-right space-x-2">
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                      Suspender
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                Nenhuma conta de email encontrada com os filtros atuais.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
