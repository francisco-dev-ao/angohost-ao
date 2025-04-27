
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Clock, User, Mail, Phone, Home, MapPin, FileText } from 'lucide-react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { ContactProfilesList } from '../client-panel/ContactProfilesList';
import { PasswordChangeTab } from './PasswordChangeTab';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface ProfileTabProps {
  user: SupabaseUser | null;
}

export const ProfileTab = ({ user }: ProfileTabProps) => {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    fullName: user?.user_metadata?.full_name || '',
    phone: user?.user_metadata?.phone || '',
    address: user?.user_metadata?.billing_address || '',
    city: user?.user_metadata?.city || '',
    nif: user?.user_metadata?.nif || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      // Update user metadata
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: userData.fullName,
          phone: userData.phone,
          billing_address: userData.address,
          city: userData.city,
          nif: userData.nif
        }
      });
      
      if (error) throw error;
      
      // Also update customer table
      if (user) {
        const { error: customerError } = await supabase
          .from('customers')
          .update({
            name: userData.fullName,
            phone: userData.phone,
            billing_address: userData.address,
            city: userData.city,
            nif: userData.nif
          })
          .eq('user_id', user.id);
          
        if (customerError) throw customerError;
      }
      
      toast.success('Perfil atualizado com sucesso');
      setEditing(false);
    } catch (error: any) {
      toast.error('Erro ao atualizar perfil: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Meus Dados</CardTitle>
              <CardDescription>Gerencie suas informações pessoais</CardDescription>
            </div>
            {!editing ? (
              <Button variant="outline" onClick={() => setEditing(true)}>
                Editar Perfil
              </Button>
            ) : (
              <Button variant="outline" onClick={() => setEditing(false)}>
                Cancelar
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {!editing ? (
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium">Nome Completo</p>
                  <p className="text-gray-600">{user?.user_metadata?.full_name || 'Não informado'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-600">{user?.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium">Telefone</p>
                  <p className="text-gray-600">{user?.user_metadata?.phone || 'Não informado'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Home className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium">Endereço de Cobrança</p>
                  <p className="text-gray-600">{user?.user_metadata?.billing_address || 'Não informado'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium">Cidade</p>
                  <p className="text-gray-600">{user?.user_metadata?.city || 'Não informado'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium">NIF</p>
                  <p className="text-gray-600">{user?.user_metadata?.nif || 'Não informado'}</p>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="fullName">Nome Completo</Label>
                <Input 
                  id="fullName" 
                  name="fullName" 
                  value={userData.fullName} 
                  onChange={handleChange} 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  value={user?.email || ''} 
                  disabled 
                />
                <p className="text-sm text-gray-500">O email não pode ser alterado</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input 
                  id="phone" 
                  name="phone" 
                  value={userData.phone} 
                  onChange={handleChange} 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Endereço de Cobrança</Label>
                <Input 
                  id="address" 
                  name="address" 
                  value={userData.address} 
                  onChange={handleChange} 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="city">Cidade</Label>
                <Input 
                  id="city" 
                  name="city" 
                  value={userData.city} 
                  onChange={handleChange} 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="nif">NIF</Label>
                <Input 
                  id="nif" 
                  name="nif" 
                  value={userData.nif} 
                  onChange={handleChange} 
                />
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2"></div>
                    Salvando...
                  </>
                ) : "Salvar Alterações"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
      
      <div className="space-y-6">
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
            </div>
          </CardContent>
        </Card>

        <PasswordChangeTab />
      </div>

      {/* Contact Profiles Section */}
      <div className="md:col-span-2">
        <ContactProfilesList />
      </div>
    </div>
  );
};
