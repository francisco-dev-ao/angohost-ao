
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { simulateDbOperation } from '@/integrations/postgres/client';
import { toast } from 'sonner';
import { RefreshCcw, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Order {
  id: string;
  date: string;
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  invoice: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
}

interface CustomerHistoryProps {
  customerId: string | null;
}

export const CustomerHistory: React.FC<CustomerHistoryProps> = ({ customerId }) => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  
  useEffect(() => {
    const fetchOrders = async () => {
      if (!customerId) return;
      
      try {
        setLoading(true);
        
        // Simular busca de pedidos no banco de dados
        const { success, data, error } = await simulateDbOperation('get_customer_orders', { customerId });
        
        if (!success || error) {
          throw new Error(error || 'Falha ao buscar pedidos');
        }
        
        // Dados fictícios para demonstração
        const mockOrders: Order[] = [
          {
            id: 'ORD-001',
            date: '2023-10-15T10:30:00Z',
            total: 50000,
            status: 'completed',
            invoice: 'INV-001',
            items: [
              { name: 'Hospedagem Profissional', quantity: 1, price: 35000 },
              { name: 'Domínio .ao', quantity: 1, price: 15000 }
            ]
          },
          {
            id: 'ORD-002',
            date: '2023-11-20T14:45:00Z',
            total: 75000,
            status: 'processing',
            invoice: 'INV-002',
            items: [
              { name: 'Hospedagem Business', quantity: 1, price: 55000 },
              { name: 'Email Profissional (5 contas)', quantity: 1, price: 20000 }
            ]
          },
          {
            id: 'ORD-003',
            date: '2023-12-05T09:15:00Z',
            total: 25000,
            status: 'pending',
            invoice: 'INV-003',
            items: [
              { name: 'SSL Wildcard', quantity: 1, price: 25000 }
            ]
          }
        ];
        
        setOrders(mockOrders);
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
        toast.error('Erro ao carregar histórico de pedidos');
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, [customerId]);
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500">Concluído</Badge>;
      case 'processing':
        return <Badge className="bg-blue-500">Processando</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">Pendente</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500">Cancelado</Badge>;
      default:
        return <Badge>Desconhecido</Badge>;
    }
  };
  
  const handleDownloadInvoice = (invoiceId: string) => {
    toast.success(`Fatura ${invoiceId} será baixada em breve.`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico de Compras</CardTitle>
        <CardDescription>Todos os pedidos realizados pelo cliente</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <RefreshCcw className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-4 text-muted-foreground">Carregando histórico de pedidos...</p>
          </div>
        ) : orders.length > 0 ? (
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pedido</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <React.Fragment key={order.id}>
                    <TableRow>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{new Date(order.date).toLocaleDateString('pt-AO')}</TableCell>
                      <TableCell>{new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(order.total)}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDownloadInvoice(order.invoice)}
                          title="Baixar fatura"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={5} className="bg-muted/30 p-2">
                        <div className="text-sm font-medium mb-2">Itens do Pedido:</div>
                        <ul className="space-y-1">
                          {order.items.map((item, index) => (
                            <li key={index} className="flex justify-between text-sm">
                              <span>{item.quantity}x {item.name}</span>
                              <span>{new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(item.price)}</span>
                            </li>
                          ))}
                        </ul>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            Este cliente não possui histórico de compras.
          </div>
        )}
      </CardContent>
    </Card>
  );
};
