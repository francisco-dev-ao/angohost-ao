
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard, AlertCircle } from "lucide-react";
import { formatDate, formatCurrency } from '@/utils/formatters';
import { Invoice } from '@/types/database-types';

interface InvoicesListProps {
  loading: boolean;
  error: string | null;
  invoices: Invoice[];
  onPayInvoice: (invoice: Invoice) => void;
}

export const getStatusBadge = (status: string) => {
  const lowercaseStatus = status.toLowerCase();
  
  switch (lowercaseStatus) {
    case 'paid':
    case 'pago':
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-900">Pago</Badge>;
      
    case 'unpaid':
    case 'não pago':
      return <Badge variant="destructive">Não Pago</Badge>;
      
    case 'pending':
    case 'pendente':
      return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 hover:text-yellow-900">Pendente</Badge>;
      
    case 'overdue':
    case 'vencido':
      return <Badge variant="destructive">Vencido</Badge>;
      
    case 'canceled':
    case 'cancelado':
      return <Badge variant="secondary">Cancelado</Badge>;
      
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export const InvoicesList: React.FC<InvoicesListProps> = ({ loading, error, invoices, onPayInvoice }) => {
  if (loading) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-3"></div>
        <p>Carregando faturas...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <AlertCircle className="h-6 w-6 mx-auto mb-3 text-red-500" />
        <p>{error}</p>
      </div>
    );
  }
  
  if (invoices.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <p>Nenhuma fatura encontrada.</p>
      </div>
    );
  }
  
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Número</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Vencimento</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>{invoice.number}</TableCell>
              <TableCell>{formatDate(invoice.created_at)}</TableCell>
              <TableCell>{formatDate(invoice.due_date)}</TableCell>
              <TableCell>{formatCurrency(invoice.total_amount || 0)}</TableCell>
              <TableCell>{getStatusBadge(invoice.status || '')}</TableCell>
              <TableCell className="text-right">
                {['unpaid', 'pending', 'overdue', 'não pago', 'pendente', 'vencido'].includes(invoice.status?.toLowerCase() || '') && (
                  <Button variant="outline" size="sm" onClick={() => onPayInvoice(invoice)}>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Pagar
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
