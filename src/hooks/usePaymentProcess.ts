
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { PaymentMethod } from '@/types/payment';
import { processPayment } from '@/services/PaymentService';

export const usePaymentProcess = (onPaymentComplete?: () => void) => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const processPaymentWithMethod = async (
    amount: number, 
    reference: string, 
    method: PaymentMethod,
    description?: string
  ) => {
    try {
      setIsProcessing(true);
      setPaymentError(null);
      
      const { data: session } = await supabase.auth.getSession();
      const user = session?.session?.user;
      
      if (!user) {
        throw new Error('Você precisa estar logado para realizar pagamentos');
      }
      
      // Get user details
      const { data: userData } = await supabase
        .from('profiles')
        .select('email, first_name, last_name')
        .eq('id', user.id)
        .single();
        
      const { success, data, message } = await processPayment({
        reference,
        amount,
        paymentMethod: method,
        callbackUrl: `${window.location.origin}/payment/callback`,
        customerEmail: userData?.email || user.email || '',
        customerName: userData ? `${userData.first_name} ${userData.last_name}` : '',
        description: description || `Pagamento de ${amount} AOA`
      });
      
      if (!success) {
        throw new Error(message || 'Erro ao processar pagamento');
      }
      
      // Handle different payment methods
      if (method === 'emis') {
        // For EMIS, return the token for the frame
        return { success: true, token: data?.token, message: 'Sessão de pagamento criada' };
      } else if (method === 'account_balance') {
        // For account balance, return transaction details
        if (onPaymentComplete) {
          onPaymentComplete();
        }
        return { success: true, transaction: data?.transaction, message: 'Pagamento processado com sucesso' };
      } else if (method === 'bank-transfer') {
        // For bank transfer, return payment instructions
        return { success: true, instructions: data?.paymentInstructions, message: 'Instruções de pagamento geradas' };
      } else {
        // For other methods like credit card, redirect to external payment page
        if (data?.redirectUrl) {
          window.location.href = data.redirectUrl;
        }
        return { success: true, message: 'Redirecionando para página de pagamento' };
      }
      
    } catch (error: any) {
      console.error('Erro no processamento de pagamento:', error);
      setPaymentError(error.message || 'Erro ao processar pagamento');
      return { success: false, message: error.message || 'Erro ao processar pagamento' };
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    isProcessing,
    paymentError,
    processPaymentWithMethod,
    setPaymentError,
  };
};
