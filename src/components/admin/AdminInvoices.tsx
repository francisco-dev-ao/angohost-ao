
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const AdminInvoices = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gerenciamento de Faturas</CardTitle>
        <CardDescription>Visualize e gerencie todas as faturas do sistema</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center p-12">
        <div className="text-center">
          <p className="text-lg font-medium mb-4">Módulo em desenvolvimento</p>
          <p className="text-gray-600 max-w-md mx-auto">
            O gerenciamento de faturas estará disponível em breve.
            Este módulo permitirá a visualização e edição de faturas,
            geração de novos documentos e monitoramento de pagamentos.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
