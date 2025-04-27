
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, Users } from 'lucide-react';

export const SubAccountsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sub-Contas</CardTitle>
        <CardDescription>Gerencie as contas secundárias com acesso ao seu painel</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            As sub-contas permitem que você dê acesso ao seu painel para outros usuários com permissões específicas.
          </p>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Adicionar Sub-Conta
          </Button>
        </div>
        
        <div className="rounded-md border">
          <div className="grid grid-cols-4 p-4 font-medium border-b bg-muted/50">
            <div>Nome</div>
            <div>Email</div>
            <div>Tipo</div>
            <div className="text-right">Ações</div>
          </div>
          
          <div className="p-8 text-center text-muted-foreground">
            <Users className="h-12 w-12 mx-auto mb-3 text-muted-foreground/60" />
            <p>Nenhuma sub-conta adicionada</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
