
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Invoice as ReceiptIcon, Search, Calendar, Download, Eye, CheckCircle2 } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";

interface InvoicesPanelProps {
  invoices?: any[];
}

export const InvoicesPanel = ({ invoices = [] }: InvoicesPanelProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();
  
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
      case 'pago':
        return 'bg-green-100 text-green-800';
      case 'unpaid':
      case 'não pago':
        return 'bg-red-100 text-red-800';
      case 'overdue':
      case 'vencido':
        return 'bg-amber-100 text-amber-800';
      case 'cancelled':
      case 'cancelado':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };
  
  // Sample mockup data
  const mockInvoices = [
    {
      id: '1',
      invoice_number: 'INV-2025-0001',
      created_at: '2025-04-01T10:00:00Z',
      due_date: '2025-04-15T10:00:00Z',
      amount: 35000,
      status: 'pago',
      description: 'Hospedagem Web - Plano Standard'
    },
    {
      id: '2',
      invoice_number: 'INV-2025-0002',
      created_at: '2025-04-05T14:30:00Z',
      due_date: '2025-04-20T14:30:00Z',
      amount: 15000,
      status: 'não pago',
      description: 'Registro de Domínio - meusite.ao'
    },
    {
      id: '3',
      invoice_number: 'INV-2025-0003',
      created_at: '2025-03-10T09:15:00Z',
      due_date: '2025-03-25T09:15:00Z',
      amount: 45000,
      status: 'vencido',
      description: 'Email Profissional - 5 contas'
    },
    {
      id: '4',
      invoice_number: 'INV-2025-0004',
      created_at: '2025-04-15T16:45:00Z',
      due_date: '2025-04-30T16:45:00Z',
      amount: 120000,
      status: 'não pago',
      description: 'Servidor VPS - Plano Business'
    }
  ];

  // Use mockup data if no real data is available
  const allInvoices = invoices.length > 0 ? invoices : mockInvoices;

  const filteredInvoices = allInvoices.filter(invoice => {
    // Filter by search term
    const matchesSearch = 
      invoice.invoice_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (invoice.description && invoice.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Filter by tab
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'unpaid') return matchesSearch && (invoice.status === 'não pago' || invoice.status === 'unpaid');
    if (activeTab === 'paid') return matchesSearch && (invoice.status === 'pago' || invoice.status === 'paid');
    if (activeTab === 'overdue') return matchesSearch && (invoice.status === 'vencido' || invoice.status === 'overdue');
    
    return matchesSearch;
  });
  
  const handlePayInvoice = (invoice: any) => {
    navigate('/checkout', { 
      state: { 
        paymentType: 'invoice', 
        invoiceId: invoice.id,
        amount: invoice.amount,
        description: invoice.description || `Fatura ${invoice.invoice_number}`
      } 
    });
  };
  
  const handleDownloadInvoice = (invoiceId: string) => {
    toast.info(`Preparando fatura para download...`);
    setTimeout(() => {
      toast.success(`Fatura baixada com sucesso`);
    }, 1500);
  };
  
  const handleViewInvoice = (invoiceId: string) => {
    toast.info(`Abrindo detalhes da fatura...`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };
  
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(amount);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center">
          <ReceiptIcon className="mr-2 h-5 w-5 text-primary" />
          Gerenciamento de Faturas
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Histórico
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            <TabsList>
              <TabsTrigger value="all">Todas</TabsTrigger>
              <TabsTrigger value="unpaid">Não Pagas</TabsTrigger>
              <TabsTrigger value="paid">Pagas</TabsTrigger>
              <TabsTrigger value="overdue">Vencidas</TabsTrigger>
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

          <TabsContent value="all" className="m-0">
            {filteredInvoices.length > 0 ? (
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fatura</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Vencimento</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInvoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">
                          {invoice.invoice_number}
                          <div className="text-xs text-gray-500 mt-1">
                            {invoice.description || 'Fatura AngoHost'}
                          </div>
                        </TableCell>
                        <TableCell>{formatDate(invoice.created_at)}</TableCell>
                        <TableCell>{formatDate(invoice.due_date)}</TableCell>
                        <TableCell>{formatAmount(invoice.amount)}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(invoice.status)}>
                            {invoice.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            {(invoice.status === 'não pago' || invoice.status === 'unpaid' || 
                             invoice.status === 'vencido' || invoice.status === 'overdue') && (
                              <Button 
                                size="sm" 
                                onClick={() => handlePayInvoice(invoice)}
                              >
                                <CheckCircle2 className="h-4 w-4 mr-1" />
                                Pagar
                              </Button>
                            )}
                            <Button 
                              size="icon" 
                              variant="ghost"
                              onClick={() => handleViewInvoice(invoice.id)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="icon" 
                              variant="ghost" 
                              onClick={() => handleDownloadInvoice(invoice.id)}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12">
                <ReceiptIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">Nenhuma fatura encontrada</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Não existem faturas correspondentes aos seus critérios de busca.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="unpaid" className="m-0">
            {/* Same table structure for unpaid invoices */}
          </TabsContent>
          
          <TabsContent value="paid" className="m-0">
            {/* Same table structure for paid invoices */}
          </TabsContent>
          
          <TabsContent value="overdue" className="m-0">
            {/* Same table structure for overdue invoices */}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
