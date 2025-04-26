
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const AdminHosting = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gerenciamento de Hospedagem</CardTitle>
        <CardDescription>Visualize e gerencie todos os serviços de hospedagem</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center p-12">
        <div className="text-center">
          <p className="text-lg font-medium mb-4">Módulo em desenvolvimento</p>
          <p className="text-gray-600 max-w-md mx-auto">
            O gerenciamento de hospedagem estará disponível em breve.
            Este módulo permitirá a visualização e edição de planos de hospedagem,
            configuração de servidores e monitoramento de recursos.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
