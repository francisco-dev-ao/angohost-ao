
import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronRight, FileText, Home } from 'lucide-react';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get payment details from state
  const paymentDetails = location.state;
  
  // If no payment details, redirect to home
  useEffect(() => {
    if (!paymentDetails) {
      navigate('/');
    }
  }, [paymentDetails, navigate]);
  
  if (!paymentDetails) {
    return null;
  }
  
  const { amount, reference, description } = paymentDetails;
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-AO', {
      style: 'currency',
      currency: 'AOA',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="container max-w-2xl mx-auto py-12 px-4">
      <Card className="border-2 border-green-500">
        <CardHeader className="bg-green-50 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <CheckCircle2 className="h-12 w-12 text-green-500" />
          </div>
          <CardTitle className="text-center text-2xl text-green-700">Pagamento Bem Sucedido!</CardTitle>
          <CardDescription className="text-center text-green-600">
            Seu pagamento foi processado com sucesso.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 pb-2">
          <div className="space-y-4">
            <div className="border rounded-md p-4 bg-gray-50">
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">Valor Pago:</span>
                <span className="font-bold text-lg">{formatCurrency(amount)}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">Descrição:</span>
                <span className="font-medium">{description}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Referência:</span>
                <span className="font-medium">{reference}</span>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <p className="text-blue-700 text-sm">
                Um recibo foi enviado para o seu endereço de email. Você também pode acessar seus recibos e faturas a qualquer momento em seu painel de cliente.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 pt-2">
          <Button asChild className="w-full">
            <Link to="/painel-cliente/faturas">
              <FileText className="mr-2 h-4 w-4" />
              Ver Minhas Faturas
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link to="/painel-cliente">
              <Home className="mr-2 h-4 w-4" />
              Voltar ao Painel
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
