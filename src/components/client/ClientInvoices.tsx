
import React, { useEffect, useState } from 'react';
import { useUser } from '@/hooks/useUser';
import { supabase } from '@/integrations/supabase/client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Download, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { formatCurrency } from "@/utils/formatters";
import { toast } from 'sonner';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';

interface Invoice {
  id: string;
  number: string;
  invoice_number: string;
  total_amount: number;
  status: string;
  created_at: string;
  due_date: string;
  paid_date: string | null;
}

export const ClientInvoices = () => {
  const { user } = useUser();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  useEffect(() => {
    const fetchInvoices = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        let query = supabase
          .from('invoices')
          .select('*')
          .eq('customer_id', user.id)
          .order('created_at', { ascending: false });
          
        if (statusFilter) {
          query = query.eq('status', statusFilter);
        }
        
        const { data, error } = await query;
        
        if (error) throw error;
        setInvoices(data || []);
      } catch (error) {
        console.error('Error fetching invoices:', error);
        toast.error('Erro ao carregar faturas');
      } finally {
        setLoading(false);
      }
    };
    
    fetchInvoices();
  }, [user, statusFilter]);
  
  const handleViewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setDialogOpen(true);
  };
  
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
      case 'paga':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            <CheckCircle className="mr-1 h-3 w-3" /> Paga
          </Badge>
        );
      case 'unpaid':
      case 'pendente':
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200">
            <Clock className="mr-1 h-3 w-3" /> Pendente
          </Badge>
        );
      case 'overdue':
      case 'vencida':
        return (
          <Badge variant="destructive">
            <AlertCircle className="mr-1 h-3 w-3" /> Vencida
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary">
            {status}
          </Badge>
        );
    }
  };
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return format(new Date(dateString), 'dd/MM/yyyy', { locale: pt });
  };

  const mockPayInvoice = async (invoiceId: string) => {
    try {
      // Simulate payment processing
      toast.loading('Processando pagamento...');
      
      // Mock payment request
      setTimeout(async () => {
        try {
          // Update the invoice status in the database
          const { error } = await supabase
            .from('invoices')
            .update({ 
              status: 'paid', 
              paid_date: new Date().toISOString() 
            })
            .eq('id', invoiceId);
          
          if (error) throw error;
          
          // Update the local state
          setInvoices(prev => 
            prev.map(inv => 
              inv.id === invoiceId 
                ? { ...inv, status: 'paid', paid_date: new Date().toISOString() } 
                : inv
            )
          );
          
          toast.dismiss();
          toast.success('Fatura paga com sucesso!');
          setDialogOpen(false);
        } catch (error) {
          console.error('Error updating invoice:', error);
          toast.dismiss();
          toast.error('Erro ao processar pagamento');
        }
      }, 2000);
    } catch (error) {
      console.error('Error processing payment:', error);
      toast.error('Erro ao processar pagamento');
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Minhas Faturas</h1>
        
        <Select value={statusFilter || ''} onValueChange={(value) => setStatusFilter(value || null)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todas as faturas</SelectItem>
            <SelectItem value="unpaid">Pendentes</SelectItem>
            <SelectItem value="paid">Pagas</SelectItem>
            <SelectItem value="overdue">Vencidas</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {invoices.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <div className="rounded-full bg-blue-50 p-3">
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
            <h3 className="mt-4 text-lg font-medium">Nenhuma fatura encontrada</h3>
            <p className="mt-2 text-sm text-gray-500 text-center">
              {statusFilter 
                ? "Não há faturas com o status selecionado." 
                : "Você ainda não possui nenhuma fatura."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Lista de Faturas</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nº da Fatura</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Vencimento</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>{invoice.invoice_number || invoice.number || `INV-${invoice.id.substring(0, 8)}`}</TableCell>
                    <TableCell>{formatDate(invoice.created_at)}</TableCell>
                    <TableCell>{formatDate(invoice.due_date)}</TableCell>
                    <TableCell>{formatCurrency(invoice.total_amount)}</TableCell>
                    <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleViewInvoice(invoice)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
      
      {/* Invoice Detail Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Detalhes da Fatura</DialogTitle>
            <DialogDescription>
              Informações completas sobre a fatura selecionada.
            </DialogDescription>
          </DialogHeader>
          
          {selectedInvoice && (
            <div className="space-y-6">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-bold">ANGOHOST</h3>
                  <p className="text-sm text-gray-500">Nº {selectedInvoice.invoice_number || selectedInvoice.number || `INV-${selectedInvoice.id.substring(0, 8)}`}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">Emitido em: {formatDate(selectedInvoice.created_at)}</p>
                  <p className="font-medium">Vencimento: {formatDate(selectedInvoice.due_date)}</p>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Detalhes</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Descrição</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Serviços AngoHost</TableCell>
                      <TableCell className="text-right">{formatCurrency(selectedInvoice.total_amount)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-bold">Total</TableCell>
                      <TableCell className="text-right font-bold">{formatCurrency(selectedInvoice.total_amount)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Status: {getStatusBadge(selectedInvoice.status)}</p>
                    {selectedInvoice.paid_date && (
                      <p className="text-sm text-gray-500">Pago em: {formatDate(selectedInvoice.paid_date)}</p>
                    )}
                  </div>
                  
                  {selectedInvoice.status.toLowerCase() === 'unpaid' && (
                    <Button onClick={() => mockPayInvoice(selectedInvoice.id)}>
                      Pagar Fatura
                    </Button>
                  )}
                  
                  {selectedInvoice.status.toLowerCase() === 'overdue' && (
                    <Button onClick={() => mockPayInvoice(selectedInvoice.id)}>
                      Pagar Fatura Vencida
                    </Button>
                  )}
                  
                  {['paid', 'paga'].includes(selectedInvoice.status.toLowerCase()) && (
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" /> Baixar PDF
                    </Button>
                  )}
                </div>
              </div>
              
              {['unpaid', 'overdue', 'pendente', 'vencida'].includes(selectedInvoice.status.toLowerCase()) && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Para pagar esta fatura, clique no botão 'Pagar Fatura' e siga as instruções.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
