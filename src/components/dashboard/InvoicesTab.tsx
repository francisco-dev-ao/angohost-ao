
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCcw, AlertCircle, Filter } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Invoice, CustomerData } from '@/types/database';
import { InvoicesList } from './invoices/InvoicesList';
import { InvoiceCard } from './invoices/InvoiceCard';
import { PaymentDialog } from './invoices/PaymentDialog';

export const InvoicesTab = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [customerData, setCustomerData] = useState<CustomerData | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  const filterOptions = [
    { value: null, label: 'Todas' },
    { value: 'unpaid', label: 'Não pagas' },
    { value: 'paid', label: 'Pagas' },
    { value: 'pending', label: 'Pendentes' },
    { value: 'overdue', label: 'Vencidas' }
  ];

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

  const hasUnpaidInvoices = invoices.some(invoice => 
    ['unpaid', 'pending', 'overdue', 'não pago', 'pendente', 'vencido'].includes(invoice.status?.toLowerCase() || '')
  );

  const handlePayInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsPaymentDialogOpen(true);
  };

  const handlePayWithBalance = async () => {
    if (!selectedInvoice || !customerData) return;
    
    try {
      setIsProcessing(true);
      
      if (customerData.account_balance < (selectedInvoice.total_amount || 0)) {
        toast.error('Saldo insuficiente para pagar esta fatura');
        return;
      }
      
      const newBalance = customerData.account_balance - (selectedInvoice.total_amount || 0);
      
      const { error: updateBalanceError } = await supabase
        .from('customers')
        .update({ account_balance: newBalance })
        .eq('id', customerData.id);
        
      if (updateBalanceError) throw updateBalanceError;
      
      const { error: updateInvoiceError } = await supabase
        .from('invoices')
        .update({ 
          status: 'paid', 
          paid_date: new Date().toISOString(),
          payment_method: 'account_balance'
        })
        .eq('id', selectedInvoice.id);
        
      if (updateInvoiceError) throw updateInvoiceError;
      
      await supabase
        .from('account_transactions')
        .insert({
          customer_id: customerData.id,
          amount: selectedInvoice.total_amount,
          previous_balance: customerData.account_balance,
          current_balance: newBalance,
          transaction_type: 'payment',
          description: `Pagamento da fatura #${selectedInvoice.number}`,
          reference_id: selectedInvoice.id
        });
      
      if (selectedInvoice.order_id) {
        await supabase
          .from('orders')
          .update({ status: 'paid' })
          .eq('id', selectedInvoice.order_id);
      }
      
      toast.success('Pagamento realizado com sucesso!');
      setIsPaymentDialogOpen(false);
      fetchInvoices();
      
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
    toast.info('Redirecionando para o processador de pagamentos...');
    setIsPaymentDialogOpen(false);
  };

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
            <InvoicesList 
              loading={loading}
              error={error}
              invoices={invoices}
              onPayInvoice={handlePayInvoice}
            />
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
                  <InvoiceCard 
                    key={invoice.id}
                    invoice={invoice}
                    onPayInvoice={handlePayInvoice}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        <PaymentDialog
          isOpen={isPaymentDialogOpen}
          onOpenChange={setIsPaymentDialogOpen}
          selectedInvoice={selectedInvoice}
          customerBalance={customerData?.account_balance || 0}
          isProcessing={isProcessing}
          onPayWithBalance={handlePayWithBalance}
          onPayWithCreditCard={handlePayWithCreditCard}
        />
      </CardContent>
    </Card>
  );
};
