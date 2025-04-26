
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Card, CardContent } from '@/components/ui/card';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { paymentInfo, clearCart } = useCart();
  
  // If no payment info, redirect to home
  useEffect(() => {
    if (!paymentInfo || paymentInfo.status !== 'completed') {
      navigate('/');
    }
  }, [paymentInfo, navigate]);
  
  const handleContinueShopping = () => {
    clearCart();
    navigate('/');
  };
  
  const handleAccessPanel = () => {
    clearCart();
    navigate('/painel-cliente');
  };
  
  if (!paymentInfo) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 flex items-center justify-center">
      <div className="container max-w-md mx-auto text-center bg-white rounded-lg shadow-sm p-8">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-20 w-20 text-green-500" />
        </div>
        
        <h1 className="text-2xl font-bold mb-4">Pagamento Confirmado!</h1>
        
        <p className="text-gray-600 mb-6">
          Seu pagamento foi processado com sucesso. Obrigado por escolher a AngoHost!
        </p>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="flex justify-between mb-2">
            <span className="font-medium">Referência:</span>
            <span>{paymentInfo.reference}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-medium">Transação:</span>
            <span>{paymentInfo.transactionId}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-medium">Status:</span>
            <span className="text-green-600 font-medium">Confirmado</span>
          </div>
        </div>
        
        {paymentInfo.hasDomain && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Informações DNS</h3>
              <div className="text-sm text-gray-600 text-left space-y-1">
                <p>Nameserver 1: <span className="font-mono">ns1.angohost.co.ao</span></p>
                <p>Nameserver 2: <span className="font-mono">ns2.angohost.co.ao</span></p>
                <p>Nameserver 3: <span className="font-mono">ns3.angohost.co.ao</span></p>
                <p>Nameserver 4: <span className="font-mono">ns4.angohost.co.ao</span></p>
              </div>
            </CardContent>
          </Card>
        )}
        
        {paymentInfo.hasEmail && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Configuração de Email</h3>
              <div className="text-sm text-gray-600 text-left space-y-1">
                <p>Servidor SMTP: <span className="font-mono">smtp.angohost.co.ao</span></p>
                <p>Servidor POP3: <span className="font-mono">pop3.angohost.co.ao</span></p>
                <p>Servidor IMAP: <span className="font-mono">imap.angohost.co.ao</span></p>
              </div>
            </CardContent>
          </Card>
        )}
        
        <p className="text-sm text-gray-600 mb-8">
          Você receberá um email com os detalhes da sua compra e instruções de acesso.
        </p>
        
        <div className="space-y-4">
          <Button
            className="w-full bg-primary hover:bg-primary/90"
            onClick={handleContinueShopping}
          >
            Continuar Comprando
          </Button>
          
          <Button
            variant="outline"
            className="w-full"
            onClick={handleAccessPanel}
          >
            Acessar Painel do Cliente
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
