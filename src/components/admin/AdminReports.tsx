
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, PieChart, LineChart, Download, Calendar, 
  Filter, RefreshCcw, Printer
} from 'lucide-react';
import { 
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue 
} from "@/components/ui/select";

export const AdminReports = () => {
  const [activeTab, setActiveTab] = useState('financial');
  const [dateFilter, setDateFilter] = useState('this-month');
  const [isLoading, setIsLoading] = useState(false);
  
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
          <h2 className="text-2xl font-bold">Relatórios e Estatísticas</h2>
          <p className="text-muted-foreground">Gerencie e visualize relatórios do sistema</p>
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
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Período
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="financial" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="financial" className="px-4">
            <BarChart3 className="h-4 w-4 mr-2" />
            Financeiro
          </TabsTrigger>
          <TabsTrigger value="clients" className="px-4">
            <PieChart className="h-4 w-4 mr-2" />
            Clientes
          </TabsTrigger>
          <TabsTrigger value="products" className="px-4">
            <LineChart className="h-4 w-4 mr-2" />
            Produtos
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="financial" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="col-span-full">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>Resumo Financeiro</CardTitle>
                  <CardDescription>Visão geral das receitas e despesas</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Printer className="h-4 w-4 mr-2" />
                    Imprimir
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-96 w-full flex items-center justify-center bg-muted/20 rounded-md">
                  <p className="text-muted-foreground">Gráfico de Receitas vs Despesas</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Receita por Serviço</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full flex items-center justify-center bg-muted/20 rounded-md">
                  <p className="text-muted-foreground">Gráfico de Pizza</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Taxa de Inadimplência</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full flex items-center justify-center bg-muted/20 rounded-md">
                  <p className="text-muted-foreground">Gráfico de Linhas</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Métodos de Pagamento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full flex items-center justify-center bg-muted/20 rounded-md">
                  <p className="text-muted-foreground">Gráfico de Barras</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Transações por Dia</CardTitle>
                <CardDescription>Distribuição diária de transações financeiras</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportar Dados
              </Button>
            </CardHeader>
            <CardContent>
              <div className="h-96 w-full flex items-center justify-center bg-muted/20 rounded-md">
                <p className="text-muted-foreground">Gráfico de Transações Diárias</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="clients" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Novos Clientes</CardTitle>
                <CardDescription>Aquisição de clientes ao longo do tempo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full flex items-center justify-center bg-muted/20 rounded-md">
                  <p className="text-muted-foreground">Gráfico de Linha</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Distribuição Geográfica</CardTitle>
                <CardDescription>Clientes por região</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full flex items-center justify-center bg-muted/20 rounded-md">
                  <p className="text-muted-foreground">Mapa de Angola</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Valor Médio do Cliente</CardTitle>
                <CardDescription>Receita média por cliente</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full flex items-center justify-center bg-muted/20 rounded-md">
                  <p className="text-muted-foreground">Gráfico de Barras</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Taxa de Retenção</CardTitle>
                <CardDescription>Retenção de clientes ao longo do tempo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full flex items-center justify-center bg-muted/20 rounded-md">
                  <p className="text-muted-foreground">Gráfico de Coorte</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Histórico de Aquisição de Clientes</CardTitle>
              <CardDescription>Acompanhamento mensal de novos registros</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 w-full flex items-center justify-center bg-muted/20 rounded-md">
                <p className="text-muted-foreground">Tabela de Dados</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="products" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="col-span-full">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>Vendas por Produto</CardTitle>
                  <CardDescription>Quantidade e valor de vendas por tipo de produto</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-96 w-full flex items-center justify-center bg-muted/20 rounded-md">
                  <p className="text-muted-foreground">Gráfico de Vendas por Produto</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Top Domínios</CardTitle>
                <CardDescription>TLDs mais registrados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full flex items-center justify-center bg-muted/20 rounded-md">
                  <p className="text-muted-foreground">Tabela de TLDs</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Top Planos de Hospedagem</CardTitle>
                <CardDescription>Planos mais vendidos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full flex items-center justify-center bg-muted/20 rounded-md">
                  <p className="text-muted-foreground">Tabela de Planos</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Taxa de Renovação</CardTitle>
                <CardDescription>Porcentagem de renovação por serviço</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full flex items-center justify-center bg-muted/20 rounded-md">
                  <p className="text-muted-foreground">Gráfico de Barras</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
