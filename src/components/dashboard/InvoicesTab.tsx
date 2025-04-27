
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCcw, FileText, AlertCircle, CreditCard, Filter } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { supabase } from '@/integrations/supabase/client';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Invoice = {
  id: string;
  invoice_number: string;
  created_at: string;
  due_date: string | null;
  amount: number;
  status: string;
  order_id: string;
  payment_method?: string;
}

type CustomerData = {
  id: string;
  account_balance: number;
}

export const InvoicesTab = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [customerData, setCustomerData] = useState<CustomerData | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data: session } = await supabase.auth.getSession();
      
      if (!session?.session?.user) {
        setError("Você precisa estar logado para ver suas faturas");
        setLoading(false);
        return;
      }
      
      // Get customer data first
      const { data: customer, error: customerError } = await supabase
        .from('customers')
        .select('id, account_balance')
        .eq('user_id', session.session.user.id)
        .single();
        
      if (customerError) {
        console.error('Erro ao buscar dados do cliente:', customerError);
        setError('Não foi possível carregar seus dados de cliente');
        setLoading(false);
        return;
      }
      
      setCustomerData(customer);
      
      // Now get invoices
      let query = supabase
        .from('invoices')
        .select('*')
        .eq('customer_id', customer.id)
        .order('created_at', { ascending: false });
        
      if (filterStatus) {
        query = query.eq('status', filterStatus);
      }
        
      const { data, error } = await query;
      
      if (error) throw error;
      
      setInvoices(data || []);
    } catch (err: any) {
      console.error('Erro ao buscar faturas:', err);
      setError('Não foi possível carregar suas faturas. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, [filterStatus]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR').format(date);
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
      case 'processing':
        return <Badge className="bg-blue-500">Processando</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handlePayInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsPaymentDialogOpen(true);
  };

  const handlePayWithBalance = async () => {
    if (!selectedInvoice || !customerData) return;
    
    try {
      setIsProcessing(true);
      
      // Check if customer has enough balance
      if (customerData.account_balance < selectedInvoice.amount) {
        toast.error('Saldo insuficiente para pagar esta fatura');
        return;
      }
      
      const newBalance = customerData.account_balance - selectedInvoice.amount;
      
      // Update customer balance
      const { error: updateBalanceError } = await supabase
        .from('customers')
        .update({ account_balance: newBalance })
        .eq('id', customerData.id);
        
      if (updateBalanceError) {
        throw updateBalanceError;
      }
      
      // Update invoice status
      const { error: updateInvoiceError } = await supabase
        .from('invoices')
        .update({ 
          status: 'paid', 
          paid_date: new Date().toISOString(),
          payment_method: 'account_balance'
        })
        .eq('id', selectedInvoice.id);
        
      if (updateInvoiceError) {
        throw updateInvoiceError;
      }
      
      // Log transaction
      const { error: transactionError } = await supabase
        .from('account_transactions')
        .insert({
          customer_id: customerData.id,
          amount: selectedInvoice.amount,
          previous_balance: customerData.account_balance,
          current_balance: newBalance,
          transaction_type: 'payment',
          description: `Pagamento da fatura #${selectedInvoice.invoice_number}`,
          reference_id: selectedInvoice.id
        });
      
      if (transactionError) {
        throw transactionError;
      }
      
      // Update order status if needed
      if (selectedInvoice.order_id) {
        await supabase
          .from('orders')
          .update({ status: 'paid' })
          .eq('id', selectedInvoice.order_id);
      }
      
      toast.success('Pagamento realizado com sucesso!');
      setIsPaymentDialogOpen(false);
      fetchInvoices(); // Refresh invoices
      
      // Update customer data in memory
      setCustomerData({
        ...customerData,
        account_balance: newBalance
      });
      
    } catch (err: any) {
      console.error('Erro ao processar pagamento:', err);
      toast.error('Não foi possível processar o pagamento. Tente novamente mais tarde.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePayWithCreditCard = () => {
    // In a real implementation, this would redirect to a payment processor
    toast.info('Redirecionando para o processador de pagamentos...');
    // For this demo, we'll just close the dialog
    setIsPaymentDialogOpen(false);
  };

  const hasUnpaidInvoices = invoices.some(invoice => 
    ['unpaid', 'pending', 'overdue', 'não pago', 'pendente', 'vencido'].includes(invoice.status.toLowerCase())
  );

  const filterOptions = [
    { value: null, label: 'Todas' },
    { value: 'unpaid', label: 'Não pagas' },
    { value: 'paid', label: 'Pagas' },
    { value: 'pending', label: 'Pendentes' },
    { value: 'overdue', label: 'Vencidas' }
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Minhas Faturas</CardTitle>
          <CardDescription>Histórico de pagamentos</CardDescription>
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtrar
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {filterOptions.map(option => (
                  <DropdownMenuItem 
                    key={option.label}
                    className={filterStatus === option.value ? "bg-muted" : ""}
                    onClick={() => setFilterStatus(option.value)}
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="outline" size="sm" onClick={fetchInvoices} disabled={loading}>
            <RefreshCcw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {hasUnpaidInvoices && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Você possui faturas pendentes de pagamento. Por favor, efetue o pagamento para manter seus serviços ativos.
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="list">
          <TabsList className="mb-4">
            <TabsTrigger value="list">Lista</TabsTrigger>
            <TabsTrigger value="grid">Grade</TabsTrigger>
          </TabsList>

          <TabsContent value="list">
            <div className="rounded-md border">
              <div className="grid grid-cols-6 p-4 font-medium border-b bg-muted/50">
                <div>Nº Fatura</div>
                <div>Data</div>
                <div>Vencimento</div>
                <div>Valor</div>
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
              ) : invoices.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-3 text-muted-foreground/60" />
                  <p>Nenhuma fatura encontrada</p>
                </div>
              ) : (
                invoices.map((invoice) => (
                  <div key={invoice.id} className="grid grid-cols-6 p-4 items-center border-b hover:bg-muted/50">
                    <div>{invoice.invoice_number}</div>
                    <div>{formatDate(invoice.created_at)}</div>
                    <div>{formatDate(invoice.due_date)}</div>
                    <div>{formatCurrency(invoice.amount)}</div>
                    <div>{getStatusBadge(invoice.status)}</div>
                    <div className="text-right">
                      {['unpaid', 'pending', 'overdue', 'não pago', 'pendente', 'vencido'].includes(invoice.status.toLowerCase()) && (
                        <Button 
                          size="sm"
                          onClick={() => handlePayInvoice(invoice)}
                        >
                          <CreditCard className="h-4 w-4 mr-2" />
                          Pagar
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="grid">
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
            ) : invoices.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-3 text-muted-foreground/60" />
                <p>Nenhuma fatura encontrada</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {invoices.map((invoice) => (
                  <Card key={invoice.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-base">{invoice.invoice_number}</CardTitle>
                        {getStatusBadge(invoice.status)}
                      </div>
                      <CardDescription>
                        Emitida em {formatDate(invoice.created_at)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Vencimento:</span>
                          <span>{formatDate(invoice.due_date)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Total:</span>
                          <span className="font-bold">{formatCurrency(invoice.amount)}</span>
                        </div>
                        
                        {['unpaid', 'pending', 'overdue', 'não pago', 'pendente', 'vencido'].includes(invoice.status.toLowerCase()) && (
                          <Button 
                            className="w-full mt-2"
                            onClick={() => handlePayInvoice(invoice)}
                          >
                            <CreditCard className="h-4 w-4 mr-2" />
                            Pagar Agora
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>

      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pagar Fatura</DialogTitle>
            <DialogDescription>
              Escolha como deseja pagar a fatura #{selectedInvoice?.invoice_number}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="flex justify-between items-center">
              <span>Valor Total:</span>
              <span className="font-bold text-lg">{selectedInvoice ? formatCurrency(selectedInvoice.amount) : ""}</span>
            </div>
            
            {customerData && (
              <div className="flex justify-between items-center">
                <span>Seu Saldo:</span>
                <span className={`font-bold text-lg ${customerData.account_balance >= (selectedInvoice?.amount || 0) ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(customerData.account_balance)}
                </span>
              </div>
            )}
            
            {customerData && selectedInvoice && customerData.account_balance < selectedInvoice.amount && (
              <Alert variant="destructive" className="mb-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Saldo insuficiente para esta fatura. Por favor, adicione fundos à sua conta ou use outro método de pagamento.
                </AlertDescription>
              </Alert>
            )}
          </div>
          
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            {customerData && selectedInvoice && customerData.account_balance >= selectedInvoice.amount && (
              <Button 
                className="flex-1" 
                onClick={handlePayWithBalance} 
                disabled={isProcessing}
              >
                {isProcessing ? "Processando..." : "Pagar com Saldo"}
              </Button>
            )}
            
            <Button 
              variant="outline" 
              className="flex-1" 
              onClick={handlePayWithCreditCard}
              disabled={isProcessing}
            >
              Pagar com Cartão de Crédito
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
