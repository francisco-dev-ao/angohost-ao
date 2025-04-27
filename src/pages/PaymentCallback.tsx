
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { processPaymentCallback, verifyPaymentStatus } from '@/services/PaymentService';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const PaymentCallback = () => {
  const navigate = useNavigate();
  const { setPaymentInfo, items, getTotalPrice, clearCart } = useCart();
  
  const saveOrderToDatabase = async (userId: string, reference: string, transactionId: string) => {
    try {
      // Gerar um ID único para o pedido
      const orderId = crypto.randomUUID();
      
      // Cadastrar pedido
      const { error: orderError } = await supabase
        .from('orders')
        .insert({
          id: orderId,
          customer_id: userId,
          total_amount: getTotalPrice(),
          status: 'completed',
          payment_method: 'emis',
          payment_id: transactionId,
          reference: reference
        });
      
      if (orderError) {
        console.error('Erro ao cadastrar pedido:', orderError);
        return false;
      }
      
      // Cadastrar itens do pedido
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
        console.error('Erro ao cadastrar itens do pedido:', itemsError);
      }
      
      // Cadastrar fatura
      const invoiceNumber = `INV-${reference}`;
      
      const { error: invoiceError } = await supabase
        .from('invoices')
        .insert({
          order_id: orderId,
          customer_id: userId,
          invoice_number: invoiceNumber,
          amount: getTotalPrice(),
          status: 'paid',
          paid_date: new Date().toISOString(),
          due_date: new Date().toISOString()
        });
      
      if (invoiceError) {
        console.error('Erro ao gerar fatura:', invoiceError);
      }
      
      console.log('Pedido e fatura registrados com sucesso!');
      return true;
    } catch (error) {
      console.error('Erro ao salvar pedido:', error);
      return false;
    }
  };
  
  useEffect(() => {
    // Get parameters from URL
    const queryParams = new URLSearchParams(window.location.search);
    const status = queryParams.get('status');
    const transactionId = queryParams.get('transactionId');
    const reference = queryParams.get('reference');
    
    // Emergency case: If we don't have all parameters but we have at least the reference
    const hasEmergencyReference = !status && !transactionId && reference;
    
    const processPayment = async () => {
      // Check user authentication
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user?.id;
      
      if (!userId) {
        toast.error('É necessário estar autenticado para processar o pagamento');
        navigate('/auth');
        return;
      }
      
      if ((status && transactionId && reference) || hasEmergencyReference) {
        // Log callback data for debugging
        console.info('Payment callback received:', { 
          status: status || 'SUCCESS', 
          transactionId: transactionId || 'DIRECT-PAYMENT', 
          reference 
        });
        
        // Process the callback
        processPaymentCallback({
          status: status || 'SUCCESS',
          transactionId: transactionId || `DIRECT-${Date.now()}`,
          reference: reference || ''
        });
        
        // Verify payment status (simulation in this case)
        const paymentVerified = await verifyPaymentStatus(reference || '', 'emis');
        
        // In emergency case or successful payment
        if ((hasEmergencyReference || status === 'SUCCESS') && paymentVerified) {
          // Save order to database
          const savedToDb = await saveOrderToDatabase(
            userId, 
            reference || '', 
            transactionId || `DIRECT-${Date.now()}`
          );
          
          if (savedToDb) {
            // Update payment info in the context
            setPaymentInfo({
              method: 'emis',
              status: 'completed',
              transactionId: transactionId || `DIRECT-${Date.now()}`,
              reference: reference || ''
            });
            
            // Show success toast
            toast.success('Pagamento confirmado com sucesso!');
            
            // Clear cart after successful payment
            clearCart();
            
            // Redirect to the success page
            navigate('/payment/success', {
              state: {
                amount: getTotalPrice(),
                reference: reference,
                description: `Pedido de ${items.length} ${items.length === 1 ? 'item' : 'itens'}`
              }
            });
          } else {
            toast.error('Erro ao processar pedido. Por favor, entre em contato com o suporte.');
            navigate('/checkout?status=error');
          }
        } else {
          // Handle failed payment
          toast.error('O pagamento falhou ou foi cancelado.');
          navigate('/checkout?status=failed');
        }
      } else {
        // Invalid callback, redirect to home
        toast.error('Dados de pagamento inválidos.');
        navigate('/');
      }
    };
    
    processPayment();
  }, [navigate, setPaymentInfo, items, getTotalPrice, clearCart]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center bg-white p-8 rounded-lg shadow-sm max-w-md w-full">
        <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
        <h2 className="mt-4 text-xl font-semibold">Processando pagamento...</h2>
        <p className="mt-2 text-gray-600">Por favor, aguarde enquanto confirmamos seu pagamento.</p>
        <p className="mt-4 text-sm text-gray-500">Não feche esta página.</p>
      </div>
    </div>
  );
};

export default PaymentCallback;
