
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useClientPanel = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [accountBalance, setAccountBalance] = useState<number | null>(null);
  const [services, setServices] = useState<any[]>([]);
  const [domains, setDomains] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          navigate('/auth');
          return;
        }
        
        setUserData(user);
        
        // Fetch customer data for the user
        const { data: customerData } = await supabase
          .from('customers')
          .select('*')
          .eq('user_id', user.id)
          .single();
          
        if (customerData) {
          // Set account balance
          setAccountBalance(254600); // Example balance in Kwanza
          
          // Fetch user's services, domains and invoices
          const customerId = customerData.id;
          
          // Fetch hosting services
          const { data: hostingData } = await supabase
            .from('hosting_services')
            .select('*, hosting_plans(*)')
            .eq('customer_id', customerId);
            
          setServices(hostingData || []);
          
          // Fetch domains
          const { data: domainsData } = await supabase
            .from('domains')
            .select('*')
            .eq('customer_id', customerId);
            
          setDomains(domainsData || []);
          
          // Fetch invoices
          const { data: invoicesData } = await supabase
            .from('invoices')
            .select('*')
            .eq('customer_id', customerId)
            .order('created_at', { ascending: false });
            
          setInvoices(invoicesData || []);
        }
        
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
      } finally {
        setLoading(false);
      }
    };

    getUserData();
    
    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        navigate('/auth');
        setUserData(null);
      } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        setUserData(session?.user || null);
      }
    });
    
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/auth');
      toast.success('Sessão encerrada com sucesso');
    } catch (error) {
      console.error('Erro ao sair:', error);
      toast.error('Erro ao encerrar sessão');
    }
  };

  const addFunds = async (amount: number) => {
    try {
      // In a real app, this would create a payment transaction
      // For demo purposes, we'll just update the state
      setAccountBalance((prev) => (prev || 0) + amount);
      toast.success(`${amount}kz adicionado à sua conta`);
      return true;
    } catch (error) {
      console.error('Erro ao adicionar fundos:', error);
      toast.error('Erro ao processar a transação');
      return false;
    }
  };

  const requestService = async (serviceType: string, planId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;
      
      const { data: customerData } = await supabase
        .from('customers')
        .select('id')
        .eq('user_id', user.id)
        .single();
      
      if (!customerData) return false;
      
      // Create a new order
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_id: customerData.id,
          status: 'pending',
          total_amount: 0, // Will be calculated based on items
          invoice_number: `INV-${Date.now()}`
        })
        .select()
        .single();
        
      if (orderError) throw orderError;
      
      // Add order item
      const { error: itemError } = await supabase
        .from('order_items')
        .insert({
          order_id: orderData.id,
          product_type: serviceType,
          product_id: planId,
          product_name: `Novo ${serviceType}`,
          price: 0, // Would be fetched from plans table in real implementation
          quantity: 1
        });
        
      if (itemError) throw itemError;
      
      toast.success('Serviço solicitado com sucesso! Em breve entraremos em contato.');
      return true;
    } catch (error) {
      console.error('Erro ao solicitar serviço:', error);
      toast.error('Erro ao processar sua solicitação');
      return false;
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    try {
      const { error } = await supabase.auth.updateUser({ 
        password: newPassword 
      });
      
      if (error) throw error;
      
      toast.success('Senha alterada com sucesso!');
      return true;
    } catch (error: any) {
      console.error('Erro ao alterar senha:', error);
      toast.error(error.message || 'Erro ao alterar senha');
      return false;
    }
  };

  return {
    loading,
    userData,
    accountBalance,
    services,
    domains,
    invoices,
    handleSignOut,
    addFunds,
    requestService,
    changePassword
  };
};
