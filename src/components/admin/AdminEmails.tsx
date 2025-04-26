
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const AdminEmails = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gerenciamento de Email</CardTitle>
        <CardDescription>Visualize e gerencie todas as contas de email</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center p-12">
        <div className="text-center">
          <p className="text-lg font-medium mb-4">Módulo em desenvolvimento</p>
          <p className="text-gray-600 max-w-md mx-auto">
            O gerenciamento de contas de email estará disponível em breve.
            Este módulo permitirá a visualização e edição de contas de email,
            configuração de redirecionamentos e monitoramento de espaço em disco.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
