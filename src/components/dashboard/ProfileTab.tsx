
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { useUser } from '@/hooks/useUser';
import { Loader2, Save, KeyRound } from 'lucide-react';
import { CustomerProfile } from '@/components/dashboard/types';
import { supabase } from '@/integrations/supabase/client';

export function ProfileTab() {
  const { user, isLoading: userLoading } = useUser();
  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    nif: '',
    billingAddress: '',
    city: '',
    postalCode: '',
    country: 'Angola'
  });
  
  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('customers')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();
        
        if (error) {
          throw error;
        }
        
        if (data) {
          setProfile(data);
          setFormData({
            name: data.name || '',
            email: data.email || '',
            phone: data.phone || '',
            nif: data.nif || '',
            billingAddress: data.billing_address || '',
            city: data.city || '',
            postalCode: data.postal_code || '',
            country: data.country || 'Angola'
          });
        }
      } catch (error) {
        console.error('Error loading profile:', error);
        toast.error('Erro ao carregar perfil');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProfile();
  }, [user]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !profile) return;
    
    try {
      setIsSaving(true);
      
      const { error } = await supabase
        .from('customers')
        .update({
          name: formData.name,
          phone: formData.phone,
          billing_address: formData.billingAddress,
          city: formData.city,
          postal_code: formData.postalCode,
          country: formData.country
        })
        .eq('id', profile.id);
      
      if (error) throw error;
      
      toast.success('Perfil atualizado com sucesso');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Erro ao atualizar perfil');
    } finally {
      setIsSaving(false);
    }
  };
  
  if (isLoading || userLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (!user || !profile) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <p className="text-center text-muted-foreground mb-4">
          Não foi possível carregar seu perfil. Por favor, faça login novamente.
        </p>
        <Button asChild>
          <Link to="/auth">Fazer Login</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Perfil de Usuário</h3>
          <p className="text-sm text-muted-foreground">
            Gerencie suas informações de perfil e preferências
          </p>
        </div>
        <Link to="/alterar-senha">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <KeyRound className="h-4 w-4" />
            <span>Alterar Senha</span>
          </Button>
        </Link>
      </div>
      
      <Separator />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Informações do Perfil</CardTitle>
              <CardDescription>Atualize suas informações pessoais</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email"
                    name="email"
                    value={formData.email}
                    disabled
                    readOnly
                  />
                  <p className="text-xs text-muted-foreground">
                    O email não pode ser alterado
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input 
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nif">NIF</Label>
                  <Input 
                    id="nif"
                    name="nif"
                    value={formData.nif}
                    disabled
                    readOnly
                  />
                  <p className="text-xs text-muted-foreground">
                    O NIF não pode ser alterado
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="billingAddress">Endereço</Label>
                <Input 
                  id="billingAddress"
                  name="billingAddress"
                  value={formData.billingAddress}
                  onChange={handleChange}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">Cidade</Label>
                  <Input 
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Código Postal</Label>
                  <Input 
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">País</Label>
                  <Input 
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                disabled={isSaving}
                className="flex items-center"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Salvar Alterações
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Seu Perfil</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src="/user.png" alt="Avatar" />
              <AvatarFallback>{profile.name?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
            <h4 className="font-semibold text-lg">{profile.name}</h4>
            <p className="text-sm text-muted-foreground mb-2">{profile.email}</p>
            <p className="text-sm text-muted-foreground">Cliente desde {new Date(profile.created_at).toLocaleDateString('pt-BR')}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
