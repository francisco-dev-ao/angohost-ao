
import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, FileText, Home, Info } from 'lucide-react';
import { toast } from 'sonner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const PaymentInstructions = () => {
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
  
  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    toast.success(message);
  };
  
  const bankDetails = {
    bank: "Banco BIC",
    accountName: "AngoHost - Prestação de Serviços, Lda",
    accountNumber: "123456789012345",
    iban: "AO02000600000123456789012345",
  };

  return (
    <div className="container max-w-2xl mx-auto py-12 px-4">
      <Card className="border-2 border-blue-500">
        <CardHeader className="bg-blue-50">
          <CardTitle className="text-center text-xl text-blue-700">Instruções de Pagamento</CardTitle>
          <CardDescription className="text-center text-blue-600">
            Por favor, complete o pagamento utilizando transferência bancária
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 pb-2">
          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertTitle>Importante</AlertTitle>
            <AlertDescription>
              Para que possamos processar seu pagamento rapidamente, inclua o código de referência no campo de descrição da transferência.
            </AlertDescription>
          </Alert>
          
          <div className="space-y-4">
            <div className="border rounded-md p-4 bg-gray-50">
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">Valor a Pagar:</span>
                <span className="font-bold text-lg">{formatCurrency(amount)}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">Descrição:</span>
                <span className="font-medium">{description}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Referência:</span>
                <div className="flex items-center">
                  <span className="font-medium mr-2">{reference}</span>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-6 w-6" 
                    onClick={() => copyToClipboard(reference, "Referência copiada!")}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-3">Dados Bancários</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Banco:</span>
                  <span className="font-medium">{bankDetails.bank}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Titular da Conta:</span>
                  <span className="font-medium">{bankDetails.accountName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Número da Conta:</span>
                  <div className="flex items-center">
                    <span className="font-medium mr-2">{bankDetails.accountNumber}</span>
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="h-6 w-6" 
                      onClick={() => copyToClipboard(bankDetails.accountNumber, "Número da conta copiado!")}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">IBAN:</span>
                  <div className="flex items-center">
                    <span className="font-medium mr-2">{bankDetails.iban}</span>
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="h-6 w-6" 
                      onClick={() => copyToClipboard(bankDetails.iban, "IBAN copiado!")}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
              <h4 className="font-medium text-amber-800 mb-1">Próximos Passos</h4>
              <ol className="list-decimal list-inside text-sm text-amber-700 space-y-1">
                <li>Realize a transferência para a conta indicada acima</li>
                <li>Inclua a referência <strong>{reference}</strong> na descrição da transferência</li>
                <li>Salve o comprovante de transferência</li>
                <li>Após confirmarmos o recebimento, seu pagamento será processado</li>
              </ol>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 pt-4">
          <Button asChild className="w-full">
            <Link to="/painel-cliente/faturas">
              <FileText className="mr-2 h-4 w-4" />
              Ver Minhas Faturas
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

export default PaymentInstructions;
