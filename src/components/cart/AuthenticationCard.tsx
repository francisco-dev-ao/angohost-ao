
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { LogIn, User, AlertCircle } from 'lucide-react';

export const AuthenticationCard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleRedirect = (mode?: string) => {
    // Guarda o caminho atual completo, incluindo a rota e query params
    const currentPath = location.pathname + location.search;
    sessionStorage.setItem('redirect_after_login', currentPath);
    console.log('AuthenticationCard: Salvando redirecionamento após login:', currentPath);
    navigate(`/auth${mode ? `?mode=${mode}` : ''}`);
  };
  
  return (
    <Card className="mt-8 border-2 border-blue-200">
      <CardHeader className="bg-blue-50">
        <CardTitle className="flex items-center">
          <LogIn className="h-5 w-5 mr-2 text-blue-500" />
          Autenticação Necessária
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 pb-6">
        <Alert variant="default" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Atenção</AlertTitle>
          <AlertDescription>
            É necessário fazer login ou criar uma conta para finalizar a compra.
          </AlertDescription>
        </Alert>
        
        <div className="flex justify-center space-x-4">
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => handleRedirect()}
          >
            <LogIn className="mr-2 h-4 w-4" /> Fazer Login
          </Button>
          
          <Button 
            className="w-full" 
            onClick={() => handleRedirect('register')}
          >
            <User className="mr-2 h-4 w-4" /> Criar Conta
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
