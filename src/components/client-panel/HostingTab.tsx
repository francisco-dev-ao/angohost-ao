
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Server } from 'lucide-react';

export const HostingTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hospedagem Web</CardTitle>
        <CardDescription>
          Gerencie seus serviços de hospedagem
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center p-12">
          <div className="text-center">
            <Server className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium">Nenhum serviço de hospedagem</h3>
            <p className="text-gray-600 mt-2 mb-6">
              Você ainda não tem serviços de hospedagem ativos na sua conta.
            </p>
            <Button asChild>
              <Link to="/">Ver Planos de Hospedagem</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
