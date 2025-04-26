
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const AdminTickets = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gerenciamento de Tickets de Suporte</CardTitle>
        <CardDescription>Visualize e responda aos tickets de suporte</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center p-12">
        <div className="text-center">
          <p className="text-lg font-medium mb-4">Módulo em desenvolvimento</p>
          <p className="text-gray-600 max-w-md mx-auto">
            O gerenciamento de tickets de suporte estará disponível em breve.
            Este módulo permitirá a visualização e resposta de tickets de suporte,
            atribuição de prioridades e monitoramento de prazos de atendimento.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
