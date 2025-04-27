
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Clock, Edit } from 'lucide-react';
import { User } from '@supabase/supabase-js';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface ProfileTabProps {
  user: User | null;
}

export const ProfileTab = ({ user }: ProfileTabProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.user_metadata?.full_name || '');
  const [editedPhone, setEditedPhone] = useState(user?.user_metadata?.phone || '');

  const handleSaveProfile = async () => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: { 
          full_name: editedName, 
          phone: editedPhone 
        }
      });

      if (error) throw error;

      toast.success('Perfil atualizado com sucesso!');
      setIsEditing(false);
    } catch (error: any) {
      toast.error(error.message || 'Erro ao atualizar perfil');
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Meus Dados</CardTitle>
          <CardDescription>Gerencie suas informações pessoais</CardDescription>
        </CardHeader>
        <CardContent>
          {!isEditing ? (
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
              <Button 
                className="mt-6 w-full" 
                onClick={() => setIsEditing(true)}
              >
                <Edit className="mr-2 h-4 w-4" /> Atualizar Meus Dados
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <Label>Email</Label>
                <Input 
                  type="email" 
                  value={user?.email || ''} 
                  disabled 
                  className="bg-gray-100" 
                />
              </div>
              <div>
                <Label>Nome</Label>
                <Input 
                  value={editedName} 
                  onChange={(e) => setEditedName(e.target.value)} 
                />
              </div>
              <div>
                <Label>Telefone</Label>
                <Input 
                  value={editedPhone} 
                  onChange={(e) => setEditedPhone(e.target.value)} 
                />
              </div>
              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => setIsEditing(false)}
                >
                  Cancelar
                </Button>
                <Button 
                  className="w-full" 
                  onClick={handleSaveProfile}
                >
                  Salvar
                </Button>
              </div>
            </div>
          )}
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
