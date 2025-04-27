
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from '@/utils/formatters';
import { RefreshCcw, Users } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface Order {
  id: string;
  customer: string;
  product: string;
  amount: number;
  status: string;
  date: string;
}

interface OrdersListProps {
  orders: Order[];
}

export const OrdersList = ({ orders }: OrdersListProps) => {
  const [renewingOrder, setRenewingOrder] = useState<string | null>(null);
  const [isTransferDialogOpen, setIsTransferDialogOpen] = useState(false);
  const [transferOrderId, setTransferOrderId] = useState<string | null>(null);
  const [transferEmail, setTransferEmail] = useState('');
  const [isTransferring, setIsTransferring] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500">Confirmado</Badge>;
      case 'pending':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-300">Pendente</Badge>;
      case 'processing':
        return <Badge variant="outline" className="text-blue-600 border-blue-300">Processando</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500">Cancelado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleRenewOrder = (orderId: string) => {
    setRenewingOrder(orderId);
    
    // Simulando uma requisição de renovação
    setTimeout(() => {
      toast.success(`Pedido de renovação para ${orderId} iniciado com sucesso`);
      setRenewingOrder(null);
    }, 1500);
  };

  const openTransferDialog = (orderId: string) => {
    setTransferOrderId(orderId);
    setTransferEmail('');
    setIsTransferDialogOpen(true);
  };

  const handleTransferService = () => {
    if (!transferEmail || !transferEmail.includes('@')) {
      toast.error('Por favor, insira um email válido');
      return;
    }

    setIsTransferring(true);
    
    // Simulando uma requisição de transferência
    setTimeout(() => {
      toast.success(`Serviço ${transferOrderId} transferido para ${transferEmail} com sucesso`);
      setIsTransferring(false);
      setIsTransferDialogOpen(false);
      setTransferOrderId(null);
    }, 1500);
  };

  return (
    <>
      <Card>
        <CardContent className="p-0">
          <div className="rounded-md border">
            <div className="grid grid-cols-7 p-4 font-medium border-b">
              <div>ID</div>
              <div>Cliente</div>
              <div>Produto/Serviço</div>
              <div>Valor</div>
              <div>Status</div>
              <div className="text-center">Renovar</div>
              <div className="text-right">Ações</div>
            </div>
            
            {orders.map((order) => (
              <div key={order.id} className="grid grid-cols-7 p-4 items-center border-b">
                <div>{order.id}</div>
                <div>{order.customer}</div>
                <div>{order.product}</div>
                <div>{formatCurrency(order.amount)}</div>
                <div>{getStatusBadge(order.status)}</div>
                <div className="text-center">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleRenewOrder(order.id)}
                    disabled={order.status === 'cancelled' || renewingOrder === order.id}
                  >
                    {renewingOrder === order.id ? (
                      <RefreshCcw className="h-4 w-4 animate-spin mr-1" />
                    ) : (
                      <RefreshCcw className="h-4 w-4 mr-1" />
                    )}
                    Renovar
                  </Button>
                </div>
                <div className="text-right flex gap-2 justify-end">
                  <Button variant="ghost" size="sm" onClick={() => openTransferDialog(order.id)}>
                    <Users className="h-4 w-4 mr-1" />
                    Transferir
                  </Button>
                  <Button variant="ghost" size="sm">
                    Ver Detalhes
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isTransferDialogOpen} onOpenChange={setIsTransferDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transferir Serviço</DialogTitle>
            <DialogDescription>
              Digite o email do cliente para o qual deseja transferir este serviço.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="transfer-email">Email do Destinatário</Label>
              <Input 
                id="transfer-email" 
                type="email" 
                placeholder="email@exemplo.com" 
                value={transferEmail}
                onChange={(e) => setTransferEmail(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsTransferDialogOpen(false)}
              disabled={isTransferring}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleTransferService}
              disabled={isTransferring}
            >
              {isTransferring ? 'Transferindo...' : 'Confirmar Transferência'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
