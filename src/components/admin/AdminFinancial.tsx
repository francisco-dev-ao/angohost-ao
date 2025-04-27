
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Download, Search, RefreshCcw, PlusCircle, Filter, CreditCard, DollarSign, 
  Calendar, Clock, FileText, BarChart4
} from 'lucide-react';
import { Input } from "@/components/ui/input";
import { InvoicesTable } from './invoices/InvoicesTable';

export const AdminFinancial = () => {
  const [activeTab, setActiveTab] = useState('invoices');
  const [dateFilter, setDateFilter] = useState('this-month');
  const [isLoading, setIsLoading] = useState(false);

  // Sample invoices data
  const invoices = [
    { id: 'INV-001', customer: 'Carlos Silva', service: 'Hospedagem WordPress', amount: 15000, status: 'paid', date: '2023-08-15', dueDate: '2023-09-15' },
    { id: 'INV-002', customer: 'Maria Santos', service: 'Domínio .ao', amount: 5000, status: 'pending', date: '2023-08-14', dueDate: '2023-09-14' },
    { id: 'INV-003', customer: 'João Pereira', service: 'Email Profissional', amount: 8000, originalAmount: 10000, discount: 20, status: 'overdue', date: '2023-08-13', dueDate: '2023-08-30' },
    { id: 'INV-004', customer: 'Ana Costa', service: 'Hospedagem cPanel', amount: 12000, status: 'paid', date: '2023-08-12', dueDate: '2023-09-12' },
    { id: 'INV-005', customer: 'Pedro Nunes', service: 'Servidor VPS', amount: 25000, originalAmount: 30000, discount: 15, status: 'cancelled', date: '2023-08-11', dueDate: '2023-09-11' },
  ];

  // Sample transactions data
  const transactions = [
    { id: 'TRX-001', customer: 'Carlos Silva', type: 'payment', amount: 15000, method: 'Cartão de Crédito', date: '2023-08-15', status: 'completed' },
    { id: 'TRX-002', customer: 'Ana Costa', type: 'payment', amount: 12000, method: 'Transferência Bancária', date: '2023-08-12', status: 'completed' },
    { id: 'TRX-003', customer: 'João Pereira', type: 'refund', amount: 8000, method: 'Crédito na Conta', date: '2023-08-10', status: 'completed' },
    { id: 'TRX-004', customer: 'Maria Santos', type: 'credit', amount: 5000, method: 'Manual', date: '2023-08-08', status: 'completed' },
    { id: 'TRX-005', customer: 'Pedro Nunes', type: 'payment', amount: 25000, method: 'Multicaixa Express', date: '2023-08-05', status: 'pending' },
  ];

  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold">Gerenciamento Financeiro</h2>
          <p className="text-muted-foreground">Gerencie faturas, pagamentos e relatórios financeiros</p>
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
              <SelectItem value="custom">Personalizado</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={refreshData} disabled={isLoading}>
            <RefreshCcw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          </Button>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Faturado (Mês)</p>
                <h3 className="text-2xl font-bold">4.250.000 Kz</h3>
                <p className="text-xs text-emerald-600 mt-1">▲ 12% em relação ao mês anterior</p>
              </div>
              <div className="bg-blue-100 p-2 rounded-full text-blue-700">
                <CreditCard className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Recebido (Mês)</p>
                <h3 className="text-2xl font-bold">3.850.000 Kz</h3>
                <p className="text-xs text-emerald-600 mt-1">▲ 8% em relação ao mês anterior</p>
              </div>
              <div className="bg-green-100 p-2 rounded-full text-green-700">
                <DollarSign className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Faturas Vencidas</p>
                <h3 className="text-2xl font-bold">650.000 Kz</h3>
                <p className="text-xs text-red-600 mt-1">12 faturas pendentes</p>
              </div>
              <div className="bg-amber-100 p-2 rounded-full text-amber-700">
                <Clock className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Próximos Vencimentos</p>
                <h3 className="text-2xl font-bold">1.875.000 Kz</h3>
                <p className="text-xs text-blue-600 mt-1">Nos próximos 7 dias</p>
              </div>
              <div className="bg-purple-100 p-2 rounded-full text-purple-700">
                <Calendar className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for different financial sections */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="invoices" className="px-4">
              <FileText className="h-4 w-4 mr-2" />
              Faturas
            </TabsTrigger>
            <TabsTrigger value="transactions" className="px-4">
              <CreditCard className="h-4 w-4 mr-2" />
              Transações
            </TabsTrigger>
            <TabsTrigger value="reports" className="px-4">
              <BarChart4 className="h-4 w-4 mr-2" />
              Relatórios
            </TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input placeholder="Buscar..." className="pl-8 w-[250px]" />
            </div>
            <Button className="gap-1">
              <PlusCircle className="h-4 w-4" />
              Nova Fatura
            </Button>
            <Button variant="outline" className="gap-1">
              <Download className="h-4 w-4" />
              Exportar
            </Button>
          </div>
        </div>
        
        <TabsContent value="invoices" className="mt-0">
          <Card>
            <CardContent className="p-0">
              <InvoicesTable invoices={invoices} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="transactions" className="mt-0">
          <Card>
            <CardContent className="p-6">
              <p className="text-lg font-medium mb-4">Transações Recentes</p>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">ID</th>
                      <th className="text-left py-3 px-4 font-medium">Cliente</th>
                      <th className="text-left py-3 px-4 font-medium">Tipo</th>
                      <th className="text-left py-3 px-4 font-medium">Valor</th>
                      <th className="text-left py-3 px-4 font-medium">Método</th>
                      <th className="text-left py-3 px-4 font-medium">Data</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                      <th className="text-right py-3 px-4 font-medium">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-900/10">
                        <td className="py-3 px-4">{transaction.id}</td>
                        <td className="py-3 px-4">{transaction.customer}</td>
                        <td className="py-3 px-4 capitalize">
                          <Badge type={transaction.type === 'payment' ? 'success' : 
                                     transaction.type === 'refund' ? 'warning' : 'info'}>
                            {transaction.type === 'payment' ? 'Pagamento' : 
                             transaction.type === 'refund' ? 'Reembolso' : 'Crédito'}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          {new Intl.NumberFormat('pt-AO', {
                            style: 'currency',
                            currency: 'AOA',
                            maximumFractionDigits: 0,
                          }).format(transaction.amount)}
                        </td>
                        <td className="py-3 px-4">{transaction.method}</td>
                        <td className="py-3 px-4">
                          {new Date(transaction.date).toLocaleDateString('pt-AO')}
                        </td>
                        <td className="py-3 px-4">
                          <Badge type={transaction.status === 'completed' ? 'success' : 'warning'}>
                            {transaction.status === 'completed' ? 'Concluído' : 'Pendente'}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="ghost" size="sm">
                            Detalhes
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios Financeiros</CardTitle>
              <CardDescription>Análise detalhada da saúde financeira</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Receita Mensal</CardTitle>
                  </CardHeader>
                  <CardContent className="h-80">
                    <p className="text-center text-muted-foreground mt-32">
                      Gráfico de receita mensal será exibido aqui
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Distribuição por Serviço</CardTitle>
                  </CardHeader>
                  <CardContent className="h-80">
                    <p className="text-center text-muted-foreground mt-32">
                      Gráfico de distribuição por serviço será exibido aqui
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Badge component for status indicators
const Badge = ({ children, type = 'default' }) => {
  const styles = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-amber-100 text-amber-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[type]}`}>
      {children}
    </span>
  );
};
