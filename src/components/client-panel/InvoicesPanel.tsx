
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  AlertCircle, RefreshCcw, Search, FileText, Download,
  CreditCard, Receipt, CheckCircle, Calendar
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';

export const InvoicesPanel = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  // In a real app, these would be fetched from the database
  // For now, let's simulate some sample invoices
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const { data: session } = await supabase.auth.getSession();
        
        if (!session?.session?.user) return;
        
        // In a real app, use actual data from the database
        setInvoices([
          {
            id: '1',
            invoice_number: 'INV-2025-001',
            created_at: '2025-04-01',
            due_date: '2025-04-15',
            paid_date: '2025-04-10',
            amount: 25000,
            status: 'paid',
            payment_method: 'bank_transfer'
          },
          {
            id: '2',
            invoice_number: 'INV-2025-002',
            created_at: '2025-04-15',
            due_date: '2025-04-30',
            paid_date: null,
            amount: 35000,
            status: 'unpaid',
            payment_method: null
          }
        ]);
      } catch (err) {
        console.error('Erro ao buscar faturas:', err);
        setError('Não foi possível carregar suas faturas. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchInvoices();
  }, []);
  
  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-AO').format(date);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-AO', {
      style: 'currency',
      currency: 'AOA',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
      case 'pago':
        return <Badge className="bg-green-500">Pago</Badge>;
      case 'pending':
      case 'pendente':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-300">Pendente</Badge>;
      case 'unpaid':
      case 'não pago':
        return <Badge variant="outline" className="text-red-600 border-red-300">Não Pago</Badge>;
      case 'overdue':
      case 'vencido':
        return <Badge className="bg-red-500">Vencido</Badge>;
      case 'cancelled':
      case 'cancelado':
        return <Badge variant="secondary">Cancelado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const getPaymentMethodDisplay = (method: string | null) => {
    if (!method) return '-';
    
    switch (method.toLowerCase()) {
      case 'credit_card':
        return (
          <div className="flex items-center">
            <CreditCard className="h-4 w-4 mr-1 text-blue-500" />
            <span>Cartão de Crédito</span>
          </div>
        );
      case 'bank_transfer':
        return (
          <div className="flex items-center">
            <Receipt className="h-4 w-4 mr-1 text-green-500" />
            <span>Transferência Bancária</span>
          </div>
        );
      default:
        return method;
    }
  };

  const filteredInvoices = invoices.filter(invoice => 
    invoice.invoice_number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const unpaidInvoices = invoices.filter(invoice => 
    ['unpaid', 'pending', 'overdue'].includes(invoice.status.toLowerCase())
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Faturas e Pagamentos</CardTitle>
          <CardDescription>Histórico de faturas e pagamentos</CardDescription>
        </div>
        <div className="space-x-2">
          <Button variant="outline" size="sm">
            <RefreshCcw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            <TabsList>
              <TabsTrigger value="all">Todas Faturas</TabsTrigger>
              <TabsTrigger value="unpaid">Não Pagas</TabsTrigger>
              <TabsTrigger value="paid">Pagas</TabsTrigger>
              <TabsTrigger value="automatic">Pagamento Automático</TabsTrigger>
            </TabsList>
            
            <div className="relative w-full md:max-w-xs">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar faturas..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {unpaidInvoices.length > 0 && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Você tem {unpaidInvoices.length} faturas pendentes de pagamento. Por favor, efetue o pagamento para manter seus serviços ativos.
              </AlertDescription>
            </Alert>
          )}
          
          <TabsContent value="all" className="m-0">
            <div className="rounded-md border">
              <div className="grid grid-cols-7 p-4 font-medium border-b bg-muted/50">
                <div>Nº Fatura</div>
                <div>Data</div>
                <div>Vencimento</div>
                <div>Valor</div>
                <div>Método</div>
                <div>Status</div>
                <div className="text-right">Ações</div>
              </div>
              
              {loading ? (
                <div className="p-8 text-center text-muted-foreground">
                  <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-3"></div>
                  <p>Carregando faturas...</p>
                </div>
              ) : error ? (
                <div className="p-8 text-center text-muted-foreground">
                  <AlertCircle className="h-6 w-6 mx-auto mb-3 text-red-500" />
                  <p>{error}</p>
                </div>
              ) : filteredInvoices.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-3 text-muted-foreground/60" />
                  <p>Nenhuma fatura encontrada</p>
                </div>
              ) : (
                filteredInvoices.map((invoice) => (
                  <div key={invoice.id} className="grid grid-cols-7 p-4 items-center border-b hover:bg-muted/50">
                    <div>{invoice.invoice_number}</div>
                    <div>{formatDate(invoice.created_at)}</div>
                    <div>{formatDate(invoice.due_date)}</div>
                    <div>{formatCurrency(invoice.amount)}</div>
                    <div>{getPaymentMethodDisplay(invoice.payment_method)}</div>
                    <div>{getStatusBadge(invoice.status)}</div>
                    <div className="text-right space-x-1">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        PDF
                      </Button>
                      {invoice.status === 'unpaid' && (
                        <Button size="sm">
                          <CreditCard className="h-4 w-4 mr-1" />
                          Pagar
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="unpaid" className="m-0">
            {/* Similar content to "all" tab but filtered for unpaid invoices */}
            <div className="rounded-md border">
              <div className="grid grid-cols-7 p-4 font-medium border-b bg-muted/50">
                <div>Nº Fatura</div>
                <div>Data</div>
                <div>Vencimento</div>
                <div>Valor</div>
                <div>Método</div>
                <div>Status</div>
                <div className="text-right">Ações</div>
              </div>
              
              {unpaidInvoices.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  <CheckCircle className="h-12 w-12 mx-auto mb-3 text-green-500/60" />
                  <p>Você não possui faturas pendentes</p>
                </div>
              ) : (
                unpaidInvoices.map((invoice) => (
                  <div key={invoice.id} className="grid grid-cols-7 p-4 items-center border-b hover:bg-muted/50">
                    <div>{invoice.invoice_number}</div>
                    <div>{formatDate(invoice.created_at)}</div>
                    <div>{formatDate(invoice.due_date)}</div>
                    <div>{formatCurrency(invoice.amount)}</div>
                    <div>{getPaymentMethodDisplay(invoice.payment_method)}</div>
                    <div>{getStatusBadge(invoice.status)}</div>
                    <div className="text-right space-x-1">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        PDF
                      </Button>
                      <Button size="sm">
                        <CreditCard className="h-4 w-4 mr-1" />
                        Pagar
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="paid" className="m-0">
            {/* Similar content to "all" tab but filtered for paid invoices */}
            <div className="rounded-md border">
              <div className="grid grid-cols-7 p-4 font-medium border-b bg-muted/50">
                <div>Nº Fatura</div>
                <div>Data</div>
                <div>Data Pagamento</div>
                <div>Valor</div>
                <div>Método</div>
                <div>Status</div>
                <div className="text-right">Ações</div>
              </div>
              
              {invoices.filter(i => i.status === 'paid').length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-3 text-muted-foreground/60" />
                  <p>Nenhuma fatura paga encontrada</p>
                </div>
              ) : (
                invoices.filter(i => i.status === 'paid').map((invoice) => (
                  <div key={invoice.id} className="grid grid-cols-7 p-4 items-center border-b hover:bg-muted/50">
                    <div>{invoice.invoice_number}</div>
                    <div>{formatDate(invoice.created_at)}</div>
                    <div>{formatDate(invoice.paid_date)}</div>
                    <div>{formatCurrency(invoice.amount)}</div>
                    <div>{getPaymentMethodDisplay(invoice.payment_method)}</div>
                    <div>{getStatusBadge(invoice.status)}</div>
                    <div className="text-right space-x-1">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        PDF
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="automatic" className="m-0">
            <Card>
              <CardHeader>
                <CardTitle>Configurar Pagamento Automático</CardTitle>
                <CardDescription>Configure o pagamento automático para suas faturas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted rounded-md flex items-center gap-4">
                  <Calendar className="h-10 w-10 text-primary" />
                  <div>
                    <h4 className="font-medium mb-1">Pagamento Automático</h4>
                    <p className="text-sm text-muted-foreground">
                      Habilite o pagamento automático para que suas faturas sejam pagas automaticamente no vencimento,
                      evitando a suspensão de serviços.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="auto-payment" />
                  <label htmlFor="auto-payment">Ativar pagamento automático para todas as faturas</label>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Método de Pagamento Padrão</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="card" name="payment-method" />
                      <label htmlFor="card" className="flex items-center">
                        <CreditCard className="h-4 w-4 mr-1" />
                        Cartão de Crédito
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="bank" name="payment-method" />
                      <label htmlFor="bank" className="flex items-center">
                        <Receipt className="h-4 w-4 mr-1" />
                        Transferência Bancária
                      </label>
                    </div>
                  </div>
                </div>
                
                <Button>Salvar Configurações</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
