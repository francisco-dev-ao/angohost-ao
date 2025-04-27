
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2,
  FileText,
  AlertCircle,
  Download,
  CreditCard,
  Clock,
  Loader2,
  Building,
  ArrowRight
} from 'lucide-react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { formatCurrency } from "@/utils/format";
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const InvoicesTab = () => {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<string>('all');
  const [processingPayment, setProcessingPayment] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError('Usuário não autenticado');
        return;
      }

      const { data: customerData, error: customerError } = await supabase
        .from('customers')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (customerError || !customerData) {
        setError('Não foi possível encontrar dados do cliente');
        return;
      }

      const { data, error } = await supabase
        .from('invoices')
        .select('*, orders(payment_method)')
        .eq('customer_id', customerData.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao buscar faturas:', error);
        setError('Erro ao carregar faturas');
        return;
      }

      setInvoices(data || []);
    } catch (error) {
      console.error('Erro ao buscar faturas:', error);
      setError('Erro ao carregar faturas');
    } finally {
      setLoading(false);
    }
  };

  const handlePayInvoice = (invoice: any) => {
    setProcessingPayment(invoice.id);

    setTimeout(() => {
      navigate('/checkout', { 
        state: { 
          amount: invoice.amount, 
          reference: invoice.invoice_number,
          description: `Pagamento de Fatura: ${invoice.invoice_number}` 
        } 
      });
    }, 500);
  };

  const handleDownloadInvoice = (invoice: any) => {
    toast.info('Gerando comprovante...');
    setTimeout(() => {
      toast.success('Comprovante baixado com sucesso!');
    }, 1500);
  };

  const formatStatus = (status: string) => {
    if (status === 'paid' || status === 'pago') {
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          Pago
        </Badge>
      );
    } else if (status === 'unpaid' || status === 'pending') {
      return (
        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
          <Clock className="h-3 w-3 mr-1" />
          Pendente
        </Badge>
      );
    } else {
      return (
        <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      );
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('pt-AO');
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'emis':
        return <CreditCard className="h-4 w-4 text-blue-500" />;
      case 'bank-transfer':
        return <Building className="h-4 w-4 text-green-500" />;
      default:
        return <CreditCard className="h-4 w-4" />;
    }
  };

  const filterInvoices = () => {
    if (selectedTab === 'all') {
      return invoices;
    } else if (selectedTab === 'pending') {
      return invoices.filter(inv => inv.status === 'unpaid' || inv.status === 'pending');
    } else if (selectedTab === 'paid') {
      return invoices.filter(inv => inv.status === 'paid' || inv.status === 'pago');
    }
    return invoices;
  };

  const pendingCount = invoices.filter(inv => inv.status === 'unpaid' || inv.status === 'pending').length;
  const paidCount = invoices.filter(inv => inv.status === 'paid' || inv.status === 'pago').length;
  const filteredInvoices = filterInvoices();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Faturas e Pagamentos
            </CardTitle>
            <CardDescription>Visualize e gerencie suas faturas</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Carregando faturas...</span>
          </div>
        ) : error ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <>
            <Tabs defaultValue="all" onValueChange={setSelectedTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="all">
                  Todas ({invoices.length})
                </TabsTrigger>
                <TabsTrigger value="pending">
                  Pendentes ({pendingCount})
                </TabsTrigger>
                <TabsTrigger value="paid">
                  Pagas ({paidCount})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="pt-2">
                {invoices.length === 0 ? (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Nenhuma fatura encontrada</AlertTitle>
                    <AlertDescription>
                      Você ainda não possui faturas registradas em sua conta.
                    </AlertDescription>
                  </Alert>
                ) : null}
              </TabsContent>
              
              <TabsContent value="pending" className="pt-2">
                {pendingCount === 0 ? (
                  <Alert className="bg-green-50 border-green-200">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <AlertTitle className="text-green-800">Pagamentos em dia</AlertTitle>
                    <AlertDescription className="text-green-700">
                      Você não possui faturas pendentes de pagamento.
                    </AlertDescription>
                  </Alert>
                ) : null}
              </TabsContent>
              
              <TabsContent value="paid" className="pt-2">
                {paidCount === 0 ? (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Nenhuma fatura paga</AlertTitle>
                    <AlertDescription>
                      Você ainda não possui faturas pagas em seu histórico.
                    </AlertDescription>
                  </Alert>
                ) : null}
              </TabsContent>
            </Tabs>
            
            {filteredInvoices.length > 0 && (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Referência</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Método</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInvoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.invoice_number}</TableCell>
                        <TableCell>
                          {invoice.status === 'paid' || invoice.status === 'pago'
                            ? formatDate(invoice.paid_date)
                            : formatDate(invoice.due_date)}
                        </TableCell>
                        <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                        <TableCell>{formatStatus(invoice.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {invoice.orders?.payment_method ? 
                              <>
                                {getPaymentMethodIcon(invoice.orders.payment_method)}
                                <span className="ml-2 text-sm">
                                  {invoice.orders.payment_method === 'emis' ? 'Multicaixa Express' : 
                                   invoice.orders.payment_method === 'bank-transfer' ? 'Transferência Bancária' :
                                   invoice.orders.payment_method}
                                </span>
                              </> : 
                              '-'
                            }
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          {(invoice.status === 'paid' || invoice.status === 'pago') ? (
                            <Button variant="outline" size="sm" onClick={() => handleDownloadInvoice(invoice)}>
                              <Download className="h-4 w-4 mr-1" />
                              <span className="hidden sm:inline">Baixar</span>
                            </Button>
                          ) : (
                            <Button 
                              size="sm" 
                              onClick={() => handlePayInvoice(invoice)}
                              disabled={processingPayment === invoice.id}
                            >
                              {processingPayment === invoice.id ? (
                                <>
                                  <Loader2 className="h-4 w-4 animate-spin mr-1" />
                                  <span className="hidden sm:inline">Processando...</span>
                                </>
                              ) : (
                                <>
                                  <CreditCard className="h-4 w-4 mr-1" />
                                  <span className="hidden sm:inline">Pagar</span>
                                </>
                              )}
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {pendingCount > 0 && selectedTab !== 'paid' && (
              <div className="mt-6">
                <Button className="w-full" onClick={() => {
                  const firstPendingInvoice = invoices.find(inv => inv.status === 'unpaid' || inv.status === 'pending');
                  if (firstPendingInvoice) {
                    handlePayInvoice(firstPendingInvoice);
                  }
                }}>
                  Pagar todas as faturas pendentes
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};
