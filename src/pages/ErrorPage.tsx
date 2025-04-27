
import React from 'react';
import { Link, useRouteError } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ErrorPage = () => {
  const error = useRouteError() as any;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <div className="bg-red-50 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="h-8 w-8 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Oops! Ocorreu um erro</h1>
        <p className="text-gray-600 mb-6">
          {error?.statusText || error?.message || "Algo deu errado. Por favor, tente novamente."}
        </p>
        <div className="flex flex-col space-y-3">
          <Button asChild>
            <Link to="/">Voltar para a página inicial</Link>
          </Button>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Tentar novamente
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
