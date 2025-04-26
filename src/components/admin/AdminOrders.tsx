
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const AdminOrders = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gerenciamento de Pedidos</CardTitle>
        <CardDescription>Visualize e gerencie todos os pedidos do sistema</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center p-12">
        <div className="text-center">
          <p className="text-lg font-medium mb-4">Módulo em desenvolvimento</p>
          <p className="text-gray-600 max-w-md mx-auto">
            O gerenciamento de pedidos estará disponível em breve.
            Este módulo permitirá a visualização e processamento de pedidos,
            confirmação de pagamentos e ativação de serviços.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
