
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Globe, Mail, CreditCard, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProfileOverviewProps {
  userData: any;
}

export const ProfileOverview = ({ userData }: ProfileOverviewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="mr-2 h-5 w-5" />
            Informações da Conta
          </CardTitle>
        </CardHeader>
        <CardContent>
          {userData ? (
            <div className="space-y-2">
              <p><span className="font-medium">Nome:</span> {userData.user_metadata?.full_name || 'Não especificado'}</p>
              <p><span className="font-medium">Email:</span> {userData.email}</p>
              <p><span className="font-medium">Telefone:</span> {userData.user_metadata?.phone || 'Não especificado'}</p>
              <p><span className="font-medium">NIF:</span> {userData.user_metadata?.nif || 'Não especificado'}</p>
            </div>
          ) : (
            <p>Faça login para ver suas informações</p>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="mr-2 h-5 w-5" />
            Ações Rápidas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button asChild className="w-full" variant="outline">
              <Link to="/dominios/registrar">
                <Globe className="mr-2 h-4 w-4" />
                Registrar Novo Domínio
              </Link>
            </Button>
            
            <Button asChild className="w-full" variant="outline">
              <Link to="/email/profissional">
                <Mail className="mr-2 h-4 w-4" />
                Adicionar Email Profissional
              </Link>
            </Button>
            
            <Button asChild className="w-full bg-primary hover:bg-primary/90">
              <Link to="/carrinho">
                <CreditCard className="mr-2 h-4 w-4" />
                Ir para Carrinho
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
