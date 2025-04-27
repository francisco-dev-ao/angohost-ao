import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  FileText, Search, Download, CreditCard, AlertCircle, 
  CheckCircle, Clock, XCircle, Filter
} from 'lucide-react';
import { InvoicesPanelProps } from './dashboard/types';

export const InvoicesPanel = ({ invoices = [] }: InvoicesPanelProps) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');
  
  const filteredInvoices = invoices.filter(invoice => {
    // Filter by search term
    const matchesSearch = 
      invoice.invoice_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by status
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-500">Pago</Badge>;
      case 'unpaid':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-300">Pendente</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="text-gray-600 border-gray-300">Cancelado</Badge>;
      case 'refunded':
        return <Badge className="bg-blue-500">Reembolsado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-AO', {
      style: 'currency',
      currency: 'AOA'
    }).format(amount);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Minhas Faturas</CardTitle>
          <CardDescription>Gerencie e visualize suas faturas</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            <TabsList>
              <TabsTrigger value="all" onClick={() => setStatusFilter('all')}>Todas</TabsTrigger>
              <TabsTrigger value="unpaid" onClick={() => setStatusFilter('unpaid')}>Pendentes</TabsTrigger>
              <TabsTrigger value="paid" onClick={() => setStatusFilter('paid')}>Pagas</TabsTrigger>
              <TabsTrigger value="cancelled" onClick={() => setStatusFilter('cancelled')}>Canceladas</TabsTrigger>
            </TabsList>
            
            <div className="flex gap-2">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar faturas..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <TabsContent value="all" className="m-0">
            {filteredInvoices.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-3 text-muted-foreground/60" />
                <p>Nenhuma fatura encontrada</p>
              </div>
            ) : (
              <div className="rounded-md border overflow-hidden">
                <div className="grid grid-cols-6 p-4 font-medium border-b bg-muted/50">
                  <div>Nº Fatura</div>
                  <div>Data</div>
                  <div>Vencimento</div>
                  <div>Valor</div>
                  <div>Status</div>
                  <div className="text-right">Ações</div>
                </div>
                
                {filteredInvoices.map(invoice => (
                  <div key={invoice.id} className="grid grid-cols-6 p-4 items-center border-b hover:bg-muted/50">
                    <div className="font-medium">{invoice.invoice_number}</div>
                    <div>{formatDate(invoice.created_at)}</div>
                    <div>{formatDate(invoice.due_date)}</div>
                    <div>{formatCurrency(invoice.total_amount)}</div>
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
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="unpaid" className="m-0">
            {filteredInvoices.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <CheckCircle className="h-12 w-12 mx-auto mb-3 text-green-500" />
                <p>Você não tem faturas pendentes</p>
              </div>
            ) : (
              <div className="rounded-md border overflow-hidden">
                <div className="grid grid-cols-6 p-4 font-medium border-b bg-muted/50">
                  <div>Nº Fatura</div>
                  <div>Data</div>
                  <div>Vencimento</div>
                  <div>Valor</div>
                  <div>Status</div>
                  <div className="text-right">Ações</div>
                </div>
                
                {filteredInvoices.map(invoice => (
                  <div key={invoice.id} className="grid grid-cols-6 p-4 items-center border-b hover:bg-muted/50">
                    <div className="font-medium">{invoice.invoice_number}</div>
                    <div>{formatDate(invoice.created_at)}</div>
                    <div>{formatDate(invoice.due_date)}</div>
                    <div>{formatCurrency(invoice.total_amount)}</div>
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
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="paid" className="m-0">
            {filteredInvoices.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-3 text-muted-foreground/60" />
                <p>Nenhuma fatura paga encontrada</p>
              </div>
            ) : (
              <div className="rounded-md border overflow-hidden">
                <div className="grid grid-cols-6 p-4 font-medium border-b bg-muted/50">
                  <div>Nº Fatura</div>
                  <div>Data</div>
                  <div>Pago em</div>
                  <div>Valor</div>
                  <div>Status</div>
                  <div className="text-right">Ações</div>
                </div>
                
                {filteredInvoices.map(invoice => (
                  <div key={invoice.id} className="grid grid-cols-6 p-4 items-center border-b hover:bg-muted/50">
                    <div className="font-medium">{invoice.invoice_number}</div>
                    <div>{formatDate(invoice.created_at)}</div>
                    <div>{formatDate(invoice.paid_at || invoice.created_at)}</div>
                    <div>{formatCurrency(invoice.total_amount)}</div>
                    <div>{getStatusBadge(invoice.status)}</div>
                    <div className="text-right space-x-1">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        PDF
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="cancelled" className="m-0">
            {filteredInvoices.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <XCircle className="h-12 w-12 mx-auto mb-3 text-muted-foreground/60" />
                <p>Nenhuma fatura cancelada encontrada</p>
              </div>
            ) : (
              <div className="rounded-md border overflow-hidden">
                <div className="grid grid-cols-6 p-4 font-medium border-b bg-muted/50">
                  <div>Nº Fatura</div>
                  <div>Data</div>
                  <div>Cancelada em</div>
                  <div>Valor</div>
                  <div>Status</div>
                  <div className="text-right">Ações</div>
                </div>
                
                {filteredInvoices.map(invoice => (
                  <div key={invoice.id} className="grid grid-cols-6 p-4 items-center border-b hover:bg-muted/50">
                    <div className="font-medium">{invoice.invoice_number}</div>
                    <div>{formatDate(invoice.created_at)}</div>
                    <div>{formatDate(invoice.cancelled_at || invoice.created_at)}</div>
                    <div>{formatCurrency(invoice.total_amount)}</div>
                    <div>{getStatusBadge(invoice.status)}</div>
                    <div className="text-right space-x-1">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        PDF
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
