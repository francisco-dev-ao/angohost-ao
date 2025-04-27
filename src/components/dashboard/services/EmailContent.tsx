
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { EmailContentProps } from '@/components/client-panel/dashboard/types';

export const EmailContent = ({ loading = false }: EmailContentProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Email Profissional</CardTitle>
            <CardDescription>Contas de email do seu domínio</CardDescription>
          </div>
          <AlertCircle className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full"></div>
            <span className="ml-2">Carregando emails...</span>
          </div>
        ) : (
          <div className="text-center p-8">
            <AlertCircle className="h-12 w-12 mx-auto mb-3 text-muted-foreground/60" />
            <p className="mb-4">Você não tem contas de email registradas</p>
            <Button>
              Configurar Email Profissional
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
