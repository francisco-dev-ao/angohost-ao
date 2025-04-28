
import React, { useEffect, useState } from 'react';
import { useUser } from '@/hooks/useUser';
import { supabase } from '@/integrations/supabase/client';
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { 
  AlertCircle, Globe, Server, FileText, LifeBuoy, ArrowRight, Info, Mail
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

export const ClientDashboard = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState({
    domains: 0,
    hosting: 0,
    emails: 0,
    tickets: 0,
    unpaidInvoices: 0
  });
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        // Get domains count
        const { count: domainsCount } = await supabase
          .from('domains')
          .select('*', { count: 'exact', head: true })
          .eq('customer_id', user.id);
          
        // Get hosting services count  
        const { count: hostingCount } = await supabase
          .from('hosting_services')
          .select('*', { count: 'exact', head: true })
          .eq('customer_id', user.id);
          
        // Get email accounts count
        const { count: emailCount } = await supabase
          .from('email_accounts')
          .select('*', { count: 'exact', head: true })
          .eq('customer_id', user.id);
          
        // Get open tickets count
        const { count: ticketsCount } = await supabase
          .from('tickets')
          .select('*', { count: 'exact', head: true })
          .eq('customer_id', user.id)
          .eq('status', 'open');
          
        // Get unpaid invoices count
        const { count: unpaidInvoicesCount } = await supabase
          .from('invoices')
          .select('*', { count: 'exact', head: true })
          .eq('customer_id', user.id)
          .eq('status', 'unpaid');
          
        setServices({
          domains: domainsCount || 0,
          hosting: hostingCount || 0,
          emails: emailCount || 0,
          tickets: ticketsCount || 0,
          unpaidInvoices: unpaidInvoicesCount || 0
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error('Erro ao carregar informações do painel');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [user]);
  
  // Function to handle tab switching
  const handleTabClick = (tabName: string) => {
    // Find the parent component and call its setActiveTab function
    const event = new CustomEvent('client-dashboard-tab-change', { detail: { tab: tabName } });
    document.dispatchEvent(event);
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard do Cliente</h1>
      
      {services.unpaidInvoices > 0 && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Atenção!</AlertTitle>
          <AlertDescription>
            Você possui {services.unpaidInvoices} fatura(s) pendente(s). 
            <Button variant="link" className="p-0 h-auto font-normal" onClick={() => handleTabClick('invoices')}>
              Clique aqui para visualizar
            </Button>
          </AlertDescription>
        </Alert>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Domínios</CardTitle>
            <Globe className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{services.domains}</div>
            <p className="text-xs text-muted-foreground">Domínios registrados</p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="w-full" onClick={() => handleTabClick('domains')}>
              Ver domínios <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Serviços</CardTitle>
            <Server className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{services.hosting}</div>
            <p className="text-xs text-muted-foreground">Hospedagens ativas</p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="w-full" onClick={() => handleTabClick('hosting')}>
              Ver serviços <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Faturas</CardTitle>
            <FileText className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{services.unpaidInvoices}</div>
            <p className="text-xs text-muted-foreground">Faturas pendentes</p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="w-full" onClick={() => handleTabClick('invoices')}>
              Ver faturas <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Suporte</CardTitle>
            <LifeBuoy className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{services.tickets}</div>
            <p className="text-xs text-muted-foreground">Tickets abertos</p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="w-full" onClick={() => handleTabClick('support')}>
              Ver suporte <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button asChild variant="outline">
              <Link to="/dominios/registrar">
                <Globe className="mr-2 h-4 w-4" /> Registrar Domínio
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/hospedagem-de-sites">
                <Server className="mr-2 h-4 w-4" /> Contratar Hospedagem
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/email/profissional">
                <Mail className="mr-2 h-4 w-4" /> Adquirir Email Pro
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Alert className="mt-6 bg-blue-50">
        <Info className="h-4 w-4" />
        <AlertTitle>Precisa de ajuda?</AlertTitle>
        <AlertDescription>
          Nossa equipe de suporte está disponível 24/7. Crie um ticket ou entre em contato pelo WhatsApp.
        </AlertDescription>
      </Alert>
    </div>
  );
};
