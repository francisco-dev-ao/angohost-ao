
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Server, Globe, Mail } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

type ServiceCount = {
  hosting: number;
  domains: number;
  email: number;
}

type InvoiceData = {
  month: string;
  total: number;
}

export const DashboardOverview = () => {
  const [loading, setLoading] = useState(true);
  const [serviceCounts, setServiceCounts] = useState<ServiceCount>({
    hosting: 0,
    domains: 0,
    email: 0
  });
  const [unpaidInvoices, setUnpaidInvoices] = useState(0);
  const [spendingData, setSpendingData] = useState<InvoiceData[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { data: session } = await supabase.auth.getSession();
        
        if (!session?.session?.user) {
          setLoading(false);
          return;
        }
        
        // Buscar dados do cliente
        const { data: customerData } = await supabase
          .from('customers')
          .select('id')
          .eq('user_id', session.session.user.id)
          .single();
          
        if (!customerData) {
          setLoading(false);
          return;
        }
        
        const customerId = customerData.id;
        
        // Buscar contagem de serviços
        const [
          { data: hostingData },
          { data: domainData },
          { data: emailData },
          { data: invoiceData }
        ] = await Promise.all([
          supabase.from('hosting_services').select('id').eq('customer_id', customerId),
          supabase.from('domains').select('id').eq('customer_id', customerId),
          supabase.from('email_accounts').select('id').eq('customer_id', customerId),
          supabase.from('invoices')
            .select('*')
            .eq('customer_id', customerId)
            .in('status', ['unpaid', 'pending', 'overdue'])
        ]);
        
        // Buscar histórico de gastos por mês
        const { data: invoiceHistory } = await supabase
          .from('invoices')
          .select('amount, created_at')
          .eq('customer_id', customerId)
          .eq('status', 'paid')
          .order('created_at', { ascending: true });
          
        const monthlySpending = processInvoiceHistory(invoiceHistory || []);
        
        setServiceCounts({
          hosting: hostingData?.length || 0,
          domains: domainData?.length || 0,
          email: emailData?.length || 0
        });
        
        setUnpaidInvoices(invoiceData?.length || 0);
        setSpendingData(monthlySpending);
        
      } catch (error) {
        console.error('Erro ao carregar dados do dashboard:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);
  
  const processInvoiceHistory = (invoices: any[]): InvoiceData[] => {
    const months: {[key: string]: number} = {};
    
    // Agrupar faturas por mês
    invoices.forEach(invoice => {
      const date = new Date(invoice.created_at);
      const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
      
      if (!months[monthYear]) {
        months[monthYear] = 0;
      }
      
      months[monthYear] += invoice.amount;
    });
    
    // Converter para array de objetos para o gráfico
    return Object.keys(months).map(monthYear => ({
      month: monthYear,
      total: months[monthYear]
    }));
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-AO', {
      style: 'currency',
      currency: 'AOA',
      minimumFractionDigits: 0
    }).format(value);
  };
  
  const totalServices = serviceCounts.hosting + serviceCounts.domains + serviceCounts.email;

  const chartConfig = {
    total: { label: "Valor Gasto" },
  };
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Serviços</CardTitle>
          <Server className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{loading ? '...' : totalServices}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Todos os seus serviços ativos
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Hospedagem</CardTitle>
          <Server className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{loading ? '...' : serviceCounts.hosting}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Planos de hospedagem ativos
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Domínios</CardTitle>
          <Globe className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{loading ? '...' : serviceCounts.domains}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Domínios registrados
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Faturas Pendentes</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{loading ? '...' : unpaidInvoices}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Faturas aguardando pagamento
          </p>
        </CardContent>
      </Card>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Histórico de Gastos</CardTitle>
          <CardDescription>
            Seus gastos com serviços ao longo do tempo
          </CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          {loading ? (
            <div className="flex items-center justify-center h-[350px]">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : spendingData.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[350px] text-center">
              <FileText className="h-16 w-16 text-muted-foreground/60 mb-4" />
              <p className="text-muted-foreground">Nenhum histórico de gastos encontrado</p>
              <p className="text-xs text-muted-foreground mt-2">
                Seus gastos serão exibidos aqui após o pagamento de faturas
              </p>
            </div>
          ) : (
            <div className="h-[350px] w-full">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={spendingData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 12 }}
                      tickLine={false}
                    />
                    <YAxis
                      tickFormatter={(value) => formatCurrency(value)}
                      width={80}
                    />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="total"
                      name="total"
                      stroke="#8884d8"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
