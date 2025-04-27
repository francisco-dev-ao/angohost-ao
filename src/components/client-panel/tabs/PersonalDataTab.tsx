
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save } from 'lucide-react';

interface PersonalDataTabProps {
  userData: any;
}

export const PersonalDataTab = ({ userData }: PersonalDataTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dados Pessoais</CardTitle>
        <CardDescription>Atualize suas informações pessoais</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nome Completo</label>
              <Input defaultValue={userData?.user_metadata?.full_name || ""} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input defaultValue={userData?.email || ""} readOnly disabled />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Telefone</label>
              <Input defaultValue={userData?.user_metadata?.phone || ""} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">NIF</label>
              <Input defaultValue={userData?.user_metadata?.nif || ""} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Número de Identificação</label>
              <Input defaultValue={userData?.user_metadata?.id_number || ""} />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Endereço</label>
            <Input defaultValue={userData?.user_metadata?.billing_address || ""} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Cidade</label>
              <Input defaultValue={userData?.user_metadata?.city || ""} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Código Postal</label>
              <Input defaultValue={userData?.user_metadata?.postal_code || ""} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">País</label>
              <Input defaultValue="Angola" readOnly />
            </div>
          </div>
          
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Salvar Alterações
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
