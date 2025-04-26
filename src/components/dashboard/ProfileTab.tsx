
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Clock } from 'lucide-react';
import { User } from '@supabase/supabase-js';

interface ProfileTabProps {
  user: User | null;
}

export const ProfileTab = ({ user }: ProfileTabProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Meus Dados</CardTitle>
          <CardDescription>Gerencie suas informações pessoais</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="font-medium">Email</p>
              <p className="text-gray-600">{user?.email}</p>
            </div>
            <div>
              <p className="font-medium">Nome</p>
              <p className="text-gray-600">{user?.user_metadata?.full_name || 'Não informado'}</p>
            </div>
            <div>
              <p className="font-medium">Telefone</p>
              <p className="text-gray-600">{user?.user_metadata?.phone || 'Não informado'}</p>
            </div>
          </div>
          <Button className="mt-6 w-full">Atualizar Meus Dados</Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="mr-2 h-5 w-5 text-blue-500" />
            Formas de Pagamento
          </CardTitle>
          <CardDescription>Gerencie suas formas de pagamento</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center p-4 border rounded-md">
              <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-gray-500" />
              </div>
              <div className="ml-4">
                <p className="font-medium">Multicaixa Express</p>
                <p className="text-sm text-gray-500">Pagamentos instantâneos</p>
              </div>
              <Badge className="ml-auto">Ativo</Badge>
            </div>
            <div className="flex items-center p-4 border rounded-md">
              <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Clock className="h-5 w-5 text-gray-500" />
              </div>
              <div className="ml-4">
                <p className="font-medium">Transferência Bancária</p>
                <p className="text-sm text-gray-500">Processamento em até 24h</p>
              </div>
              <Badge variant="outline" className="ml-auto">Disponível</Badge>
            </div>
            <div className="flex items-center p-4 border rounded-md">
              <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-gray-500" />
              </div>
              <div className="ml-4">
                <p className="font-medium">Cartão de Crédito</p>
                <p className="text-sm text-gray-500">Pagamentos internacionais</p>
              </div>
              <Badge variant="outline" className="ml-auto">Disponível</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
