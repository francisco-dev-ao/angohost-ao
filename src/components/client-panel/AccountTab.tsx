
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from 'lucide-react';
import { useClientDashboardContext } from '@/context/ClientDashboardContext';

export const AccountTab = () => {
  const { customerData } = useClientDashboardContext();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Minha Conta</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center p-12">
          <div className="text-center">
            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium">Funcionalidade em Desenvolvimento</h3>
            <p className="text-gray-600 mt-2 mb-6">
              Esta funcionalidade estará disponível em breve.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
