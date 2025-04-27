
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { PaymentMethod } from '@/types/payment';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ensureCustomerExists } from '@/utils/customerUtils';

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

  // Utility function to generate a valid UUID
  const generateValidUUID = () => {
    return crypto.randomUUID();
  };

  const saveOrderToDatabase = async (orderId: string, userId: string) => {
    try {
      console.log('Saving order to database:', { orderId, userId });
      
      if (!customer) {
        throw new Error('Customer information is missing');
      }
      
      // Ensure customer exists and get their ID
      const { id: customerId, error: customerError } = await ensureCustomerExists(userId, customer);
      
      if (customerError || !customerId) {
        throw new Error('Failed to create/fetch customer');
      }
      
      // Create the order
      const { error: orderError } = await supabase
        .from('orders')
        .insert({
          id: orderId,
          customer_id: customerId,
          total_amount: getTotalPrice(),
          status: paymentMethod === 'emis' ? 'processing' : 'pending',
          payment_method: paymentMethod || 'unknown',
          payment_id: orderReference,
          reference: orderReference
        });
      
      if (orderError) {
        throw orderError;
      }
      
      // Create order items with valid UUIDs for product_id
      const orderItems = items.map(item => {
        // Generate a valid UUID for product_id if the existing one is not in UUID format
        const productId = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(item.id) 
          ? item.id 
          : generateValidUUID();
          
        return {
          order_id: orderId,
          product_name: item.name,
          product_type: item.type,
          product_id: productId,
          price: item.price,
          period: item.period,
          details: item.details
        };
      });
      
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
          customer_id: customerId,
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
