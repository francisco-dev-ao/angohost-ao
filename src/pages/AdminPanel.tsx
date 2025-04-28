
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/hooks/useUser';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LayoutDashboard, Users, Package, Globe, FileText, 
  LifeBuoy, Settings, LogOut, Mail, CreditCard, Shield, BarChart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { AdminCustomers } from '@/components/admin/AdminCustomers';
import { AdminProducts } from '@/components/admin/AdminProducts';
import { AdminDomains } from '@/components/admin/AdminDomains';
import { AdminInvoices } from '@/components/admin/AdminInvoices';
import { AdminSupport } from '@/components/admin/AdminSupport';
import { AdminEmails } from '@/components/admin/AdminEmails';
import { AdminPayments } from '@/components/admin/AdminPayments';
import { AdminSettings } from '@/components/admin/AdminSettings';
import { AdminUsers } from '@/components/admin/AdminUsers';
import { AdminReports } from '@/components/admin/AdminReports';
import { RequireAuth } from '@/components/auth/RequireAuth';
import { toast } from 'sonner';

const AdminPanel = () => {
  const navigate = useNavigate();
  const { user, loading } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        if (!user) return;
        
        const { data, error } = await supabase.rpc('is_admin_with_permission', {
          requested_permission: null
        });
        
        if (error) throw error;
        setIsAdmin(!!data);
        
        if (!data) {
          // If not admin, redirect to client panel
          toast.error('Você não tem permissão para acessar o painel de administração');
          navigate('/painel-cliente');
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        toast.error('Erro ao verificar permissões de administrador');
      }
    };
    
    checkAdminStatus();
  }, [user, navigate]);
  
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success('Sessão encerrada com sucesso');
    navigate('/');
  };
  
  if (loading || !isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return (
    <RequireAuth>
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
        {/* Sidebar */}
        <aside className="lg:w-64 bg-blue-900 text-white shadow-md p-4 lg:p-6 space-y-6">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold">Painel Admin</h2>
            <p className="text-blue-200 text-sm mt-1">Bem-vindo, Admin</p>
          </div>
          
          <nav className="space-y-1">
            <Button 
              variant={activeTab === 'dashboard' ? 'secondary' : 'ghost'} 
              className="w-full justify-start text-white hover:text-blue-900" 
              onClick={() => setActiveTab('dashboard')}
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            
            <Button 
              variant={activeTab === 'customers' ? 'secondary' : 'ghost'} 
              className="w-full justify-start text-white hover:text-blue-900" 
              onClick={() => setActiveTab('customers')}
            >
              <Users className="mr-2 h-4 w-4" />
              Clientes
            </Button>
            
            <Button 
              variant={activeTab === 'products' ? 'secondary' : 'ghost'} 
              className="w-full justify-start text-white hover:text-blue-900" 
              onClick={() => setActiveTab('products')}
            >
              <Package className="mr-2 h-4 w-4" />
              Produtos
            </Button>
            
            <Button 
              variant={activeTab === 'domains' ? 'secondary' : 'ghost'} 
              className="w-full justify-start text-white hover:text-blue-900" 
              onClick={() => setActiveTab('domains')}
            >
              <Globe className="mr-2 h-4 w-4" />
              Domínios
            </Button>
            
            <Button 
              variant={activeTab === 'invoices' ? 'secondary' : 'ghost'} 
              className="w-full justify-start text-white hover:text-blue-900" 
              onClick={() => setActiveTab('invoices')}
            >
              <FileText className="mr-2 h-4 w-4" />
              Faturas
            </Button>
            
            <Button 
              variant={activeTab === 'support' ? 'secondary' : 'ghost'} 
              className="w-full justify-start text-white hover:text-blue-900" 
              onClick={() => setActiveTab('support')}
            >
              <LifeBuoy className="mr-2 h-4 w-4" />
              Suporte
            </Button>
            
            <Button 
              variant={activeTab === 'emails' ? 'secondary' : 'ghost'} 
              className="w-full justify-start text-white hover:text-blue-900" 
              onClick={() => setActiveTab('emails')}
            >
              <Mail className="mr-2 h-4 w-4" />
              E-mails
            </Button>
            
            <Button 
              variant={activeTab === 'payments' ? 'secondary' : 'ghost'} 
              className="w-full justify-start text-white hover:text-blue-900" 
              onClick={() => setActiveTab('payments')}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Pagamentos
            </Button>
            
            <Button 
              variant={activeTab === 'reports' ? 'secondary' : 'ghost'} 
              className="w-full justify-start text-white hover:text-blue-900" 
              onClick={() => setActiveTab('reports')}
            >
              <BarChart className="mr-2 h-4 w-4" />
              Relatórios
            </Button>
            
            <Button 
              variant={activeTab === 'users' ? 'secondary' : 'ghost'} 
              className="w-full justify-start text-white hover:text-blue-900" 
              onClick={() => setActiveTab('users')}
            >
              <Shield className="mr-2 h-4 w-4" />
              Administradores
            </Button>
            
            <Button 
              variant={activeTab === 'settings' ? 'secondary' : 'ghost'} 
              className="w-full justify-start text-white hover:text-blue-900" 
              onClick={() => setActiveTab('settings')}
            >
              <Settings className="mr-2 h-4 w-4" />
              Configurações
            </Button>
          </nav>
          
          <div className="pt-6">
            <Button variant="destructive" className="w-full justify-start" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          {activeTab === 'dashboard' && <AdminDashboard />}
          {activeTab === 'customers' && <AdminCustomers />}
          {activeTab === 'products' && <AdminProducts />}
          {activeTab === 'domains' && <AdminDomains />}
          {activeTab === 'invoices' && <AdminInvoices />}
          {activeTab === 'support' && <AdminSupport />}
          {activeTab === 'emails' && <AdminEmails />}
          {activeTab === 'payments' && <AdminPayments />}
          {activeTab === 'users' && <AdminUsers />}
          {activeTab === 'settings' && <AdminSettings />}
          {activeTab === 'reports' && <AdminReports />}
        </main>
      </div>
    </RequireAuth>
  );
};

export default AdminPanel;
