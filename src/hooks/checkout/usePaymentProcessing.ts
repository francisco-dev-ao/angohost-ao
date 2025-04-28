
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { PaymentMethod } from '@/types/payment';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

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
      console.log('Salvando pedido no Supabase:', { orderId });
      
      if (!customer) {
        throw new Error('Informações do cliente ausentes');
      }
      
      // Verificar se o usuário está autenticado
      const { data } = await supabase.auth.getSession();
      if (!data.session?.user) {
        throw new Error('Usuário não está autenticado');
      }
      
      const userId = data.session.user.id;
      
      // Obter ID do cliente a partir do userId
      const { data: customerData, error: customerError } = await supabase
        .from('customers')
        .select('id')
        .eq('user_id', userId)
        .single();
        
      if (customerError || !customerData) {
        throw new Error('Cliente não encontrado');
      }
      
      const customerId = customerData.id;
      
      // Criar registro de pedido
      const { error: orderError } = await supabase
        .from('orders')
        .insert([{
          id: orderId,
          customer_id: customerId,
          status: paymentMethod === 'emis' ? 'processing' : 'pending',
          total_amount: getTotalPrice(),
        }]);
      
      if (orderError) {
        throw new Error(orderError.message);
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
      
      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);
      
      if (itemsError) {
        throw new Error(itemsError.message);
      }
      
      // Criar fatura
      const invoiceNumber = `INV-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
      
      const { error: invoiceError } = await supabase
        .from('invoices')
        .insert([{
          customer_id: customerId,
          number: invoiceNumber,
          total_amount: getTotalPrice(),
          status: 'unpaid',
          due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // Vencimento em 7 dias
        }]);
      
      if (invoiceError) {
        throw new Error(invoiceError.message);
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
