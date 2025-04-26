
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { User } from '@supabase/supabase-js';
import { ServicesTab } from '@/components/dashboard/ServicesTab';
import { InvoicesTab } from '@/components/dashboard/InvoicesTab';
import { TicketsTab } from '@/components/dashboard/TicketsTab';
import { ProfileTab } from '@/components/dashboard/ProfileTab';

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      
      if (error || !data?.user) {
        navigate('/auth');
        return;
      }
      
      setUser(data.user);
      setLoading(false);
    };
    
    getUser();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          navigate('/auth');
        } else if (session?.user) {
          setUser(session.user);
        }
      }
    );
    
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/auth');
    } catch (error: any) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando painel do cliente...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Painel do Cliente</h1>
          <p className="text-gray-500">
            Bem-vindo, {user?.user_metadata?.full_name || user?.email}
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          {user?.app_metadata?.is_admin && (
            <Button variant="outline" onClick={() => navigate('/admin')}>
              Painel Admin
            </Button>
          )}
          <Button variant="outline" onClick={handleSignOut}>
            Sair
          </Button>
        </div>
      </div>
      
      <Separator className="my-6" />
      
      <Tabs defaultValue="servicos" className="w-full">
        <TabsList className="mb-8 flex flex-wrap gap-2">
          <TabsTrigger value="servicos">Meus Serviços</TabsTrigger>
          <TabsTrigger value="faturas">Faturas</TabsTrigger>
          <TabsTrigger value="tickets">Tickets de Suporte</TabsTrigger>
          <TabsTrigger value="perfil">Meu Perfil</TabsTrigger>
        </TabsList>
        
        <TabsContent value="servicos">
          <ServicesTab />
        </TabsContent>
        
        <TabsContent value="faturas">
          <InvoicesTab />
        </TabsContent>
        
        <TabsContent value="tickets">
          <TicketsTab />
        </TabsContent>
        
        <TabsContent value="perfil">
          <ProfileTab user={user} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
