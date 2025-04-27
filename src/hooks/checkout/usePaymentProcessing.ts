
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { PaymentMethod } from '@/types/payment';
import { toast } from 'sonner';
import { simulateDbOperation } from '@/integrations/postgres/client';

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
      
      // Create customer record
      const customerData = {
        id: userId,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        nif: customer.nif,
        billing_address: customer.billingAddress,
        city: customer.city,
        postal_code: customer.postalCode,
        country: customer.country || 'Angola'
      };
      
      const { success: customerSuccess, error: customerError } = await simulateDbOperation(
        'create_customer', 
        customerData
      );
      
      if (!customerSuccess) {
        throw new Error('Failed to create customer record');
      }
      
      // Create order record
      const orderData = {
        id: orderId,
        customer_id: userId,
        total_amount: getTotalPrice(),
        status: paymentMethod === 'emis' ? 'processing' : 'pending',
        payment_method: paymentMethod || 'unknown',
        payment_id: orderReference,
        reference: orderReference
      };
      
      const { success: orderSuccess, error: orderError } = await simulateDbOperation(
        'create_order', 
        orderData
      );
      
      if (!orderSuccess) {
        throw new Error('Failed to create order');
      }
      
      // Create order items
      const orderItems = items.map(item => {
        // Generate a valid UUID for product_id
        const productId = generateValidUUID();
          
        return {
          order_id: orderId,
          product_name: item.name,
          product_type: item.type,
          product_id: productId,
          price: item.price,
          period: item.period,
          details: JSON.stringify(item.details)
        };
      });
      
      const { success: itemsSuccess, error: itemsError } = await simulateDbOperation(
        'create_order_items', 
        orderItems
      );
      
      if (!itemsSuccess) {
        throw new Error('Failed to create order items');
      }
      
      // Create invoice
      const invoiceNumber = `INV-${orderReference}`;
      const invoiceData = {
        order_id: orderId,
        customer_id: userId,
        invoice_number: invoiceNumber,
        amount: getTotalPrice(),
        status: 'unpaid',
        payment_method: paymentMethod,
        due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      };
      
      const { success: invoiceSuccess, error: invoiceError } = await simulateDbOperation(
        'create_invoice', 
        invoiceData
      );
      
      if (!invoiceSuccess) {
        throw new Error('Failed to create invoice');
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
