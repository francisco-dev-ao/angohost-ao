
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { PaymentMethod } from '@/types/payment';
import { toast } from '@/hooks/use-toast';
import { orderService, invoiceService } from '@/integrations/postgres/client';
import AuthService from '@/services/AuthService';

export const usePaymentProcessing = () => {
  const navigate = useNavigate();
  const { 
    items, 
    customer,
    paymentInfo, 
    getTotalPrice,
    setPaymentInfo, 
    generateOrderReference,
    selectedContactProfileId,
  } = useCart();
  
  const [isLoading, setIsLoading] = useState(false);
  const [showPaymentFrame, setShowPaymentFrame] = useState(false);
  const [orderReference, setOrderReference] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);

  const saveOrderToDatabase = async (orderId: string) => {
    try {
      console.log('Salvando pedido no banco de dados:', { orderId });
      
      if (!customer) {
        throw new Error('Informações do cliente ausentes');
      }
      
      // Verificar se o usuário está autenticado
      const session = AuthService.getSession();
      if (!session || !session.user) {
        throw new Error('Usuário não está autenticado');
      }
      
      // Criar registro de pedido
      const { success: orderSuccess, data: newOrder, error: orderError } = await orderService.create({
        id: orderId,
        customer_id: session.user.id,
        status: paymentMethod === 'emis' ? 'processing' : 'pending',
        total_amount: getTotalPrice(),
      });
      
      if (!orderSuccess || !newOrder) {
        throw new Error(orderError?.message || 'Falha ao criar pedido');
      }
      
      // Criar itens do pedido
      const orderItems = items.map(item => {
        return {
          order_id: orderId,
          description: item.name,
          type: item.type,
          price: item.price,
          quantity: item.details.quantity || 1,
          total: item.price * (item.details.quantity || 1)
        };
      });
      
      const { success: itemsSuccess, error: itemsError } = await orderService.createItems(orderItems);
      
      if (!itemsSuccess) {
        throw new Error(itemsError?.message || 'Falha ao criar itens do pedido');
      }
      
      // Criar fatura
      const invoiceNumber = `INV-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
      
      const { success: invoiceSuccess, error: invoiceError } = await invoiceService.create({
        customer_id: session.user.id,
        number: invoiceNumber,
        total_amount: getTotalPrice(),
        status: 'unpaid',
        due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // Vencimento em 7 dias
      });
      
      if (!invoiceSuccess) {
        throw new Error(invoiceError?.message || 'Falha ao criar fatura');
      }
      
      console.log('Pedido salvo com sucesso:', orderId);
    } catch (error: any) {
      console.error('Erro ao salvar pedido:', error);
      throw error;
    }
  };

  return {
    isLoading,
    showPaymentFrame,
    orderReference,
    paymentMethod,
    setPaymentMethod,
    saveOrderToDatabase,
    setShowPaymentFrame,
    setOrderReference,
    setIsLoading
  };
};
