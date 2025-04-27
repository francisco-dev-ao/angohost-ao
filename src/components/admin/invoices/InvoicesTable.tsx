
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from '@/utils/formatters';
import { Tag } from 'lucide-react';

interface Invoice {
  id: string;
  customer: string;
  service: string;
  amount: number;
  status: string;
  date: string;
  dueDate: string;
  discount?: number; // Campo opcional para desconto
  originalAmount?: number; // Campo opcional para preço original
}

interface InvoicesTableProps {
  invoices: Invoice[];
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'paid':
      return <Badge className="bg-green-500">Paga</Badge>;
    case 'pending':
      return <Badge variant="outline" className="text-yellow-600 border-yellow-300">Pendente</Badge>;
    case 'overdue':
      return <Badge className="bg-red-500">Vencida</Badge>;
    case 'cancelled':
      return <Badge variant="secondary">Cancelada</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export const InvoicesTable = ({ invoices }: InvoicesTableProps) => {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="rounded-md border">
          <div className="grid grid-cols-7 p-4 font-medium border-b">
            <div>Nº</div>
            <div>Cliente</div>
            <div>Serviço</div>
            <div>Emissão</div>
            <div>Vencimento</div>
            <div>Valor</div>
            <div className="text-right">Status</div>
          </div>
          
          {invoices.map((invoice) => (
            <div key={invoice.id} className="grid grid-cols-7 p-4 items-center border-b">
              <div>{invoice.id}</div>
              <div>{invoice.customer}</div>
              <div>{invoice.service}</div>
              <div>{invoice.date}</div>
              <div>{invoice.dueDate}</div>
              <div>
                {invoice.discount && invoice.originalAmount ? (
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <span className="font-medium">{formatCurrency(invoice.amount)}</span>
                      <Badge className="bg-green-500 text-xs">
                        <Tag className="h-3 w-3 mr-1" />
                        {invoice.discount}% OFF
                      </Badge>
                    </div>
                    <span className="text-xs text-muted-foreground line-through">
                      {formatCurrency(invoice.originalAmount)}
                    </span>
                  </div>
                ) : (
                  formatCurrency(invoice.amount)
                )}
              </div>
              <div className="text-right">{getStatusBadge(invoice.status)}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
