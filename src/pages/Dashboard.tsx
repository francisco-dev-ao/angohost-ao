
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { User } from '@supabase/supabase-js';
import { ServicesTab } from '@/components/dashboard/ServicesTab';
import { InvoicesTab } from '@/components/dashboard/InvoicesTab';
import { TicketsTab } from '@/components/dashboard/TicketsTab';
import { ProfileTab } from '@/components/dashboard/ProfileTab';
import { RequireAuth } from '@/components/auth/RequireAuth';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.auth.getUser();
        
        if (error || !data?.user) {
          navigate('/auth', { state: { from: location.pathname } });
          return;
        }
        
        setUser(data.user);
        
        // Verificar se é admin
        const { data: adminData } = await supabase.rpc('is_admin');
        setIsAdmin(!!adminData);
        
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        toast.error('Erro ao carregar dados do usuário');
      } finally {
        setLoading(false);
      }
    };
    
    getUser();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          navigate('/auth', { state: { from: location.pathname } });
        } else if (session?.user) {
          setUser(session.user);
          // Verificar status de admin ao mudar autenticação
          supabase.rpc('is_admin').then(({ data }) => {
            setIsAdmin(!!data);
          });
        }
      }
    );
    
    return () => subscription.unsubscribe();
  }, [navigate, location.pathname]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/auth');
      toast.success('Sessão encerrada com sucesso');
    } catch (error: any) {
      console.error('Erro ao sair:', error);
      toast.error('Erro ao encerrar sessão');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
        <span>Carregando painel do cliente...</span>
      </div>
    );
  }

  return (
    <RequireAuth>
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Painel do Cliente</h1>
            <p className="text-gray-500">
              Bem-vindo, {user?.user_metadata?.full_name || user?.email}
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            {isAdmin && (
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

        <section className="mb-8">
          <DashboardOverview />
        </section>
        
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
    </RequireAuth>
  );
};

export default Dashboard;
