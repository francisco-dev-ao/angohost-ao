
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { PaymentMethod } from '@/types/payment';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const usePaymentProcessing = () => {
  const navigate = useNavigate();
  const { 
    items, 
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

  const saveOrderToDatabase = async (orderId: string, userId: string) => {
    try {
      console.log('Saving order to database:', { orderId, userId });
      
      // Get the customer ID first
      const { data: customerData } = await supabase
        .from('customers')
        .select('id')
        .eq('user_id', userId)
        .single();
      
      if (!customerData) {
        throw new Error('Customer not found');
      }
      
      // Create the order
      const { error: orderError } = await supabase
        .from('orders')
        .insert({
          id: orderId,
          customer_id: customerData.id,
          total_amount: getTotalPrice(),
          status: paymentMethod === 'emis' ? 'processing' : 'pending',
          payment_method: paymentMethod || 'unknown',
          payment_id: orderReference,
          reference: orderReference
        });
      
      if (orderError) {
        throw orderError;
      }
      
      // Create order items
      const orderItems = items.map(item => ({
        order_id: orderId,
        product_name: item.name,
        product_type: item.type,
        product_id: item.id,
        price: item.price,
        period: item.period,
        details: item.details
      }));
      
      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);
      
      if (itemsError) {
        throw itemsError;
      }
      
      // Create invoice
      const invoiceNumber = `INV-${orderReference}`;
      
      const { error: invoiceError } = await supabase
        .from('invoices')
        .insert({
          order_id: orderId,
          customer_id: customerData.id,
          invoice_number: invoiceNumber,
          amount: getTotalPrice(),
          status: 'unpaid',
          payment_method: paymentMethod,
          due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        });
      
      if (invoiceError) {
        throw invoiceError;
      }
      
      console.log('Order saved successfully:', orderId);
    } catch (error) {
      console.error('Error saving order:', error);
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
