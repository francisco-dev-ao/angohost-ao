
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useClientPanel = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [accountBalance, setAccountBalance] = useState<number | null>(254600);
  const [services, setServices] = useState<any[]>([]);
  const [domains, setDomains] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);

  // Use default mock data if no real data is available
  const mockData = {
    services: [
      {
        id: '1',
        name: 'Hospedagem Web Premium',
        type: 'hosting',
        status: 'active',
        expires_at: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(),
        details: { storage: '50GB', domains: 10, email_accounts: 50 }
      },
      {
        id: '2',
        name: 'Email Profissional',
        type: 'email',
        status: 'active',
        expires_at: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
        details: { accounts: 5, storage_per_account: '10GB' }
      }
    ],
    domains: [
      {
        id: '1',
        name: 'exemplo',
        tld: '.ao',
        status: 'active',
        registration_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        expiry_date: new Date(Date.now() + 335 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '2',
        name: 'meusite',
        tld: '.ao',
        status: 'pending',
        registration_date: new Date().toISOString(),
        expiry_date: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      }
    ],
    invoices: [
      {
        id: '1',
        invoice_number: 'ANHO-2025-001',
        created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        due_date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
        amount: 25000,
        status: 'não pago',
        description: 'Renovação de Domínio - exemplo.ao'
      },
      {
        id: '2',
        invoice_number: 'ANHO-2025-002',
        created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        due_date: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
        amount: 45000,
        status: 'não pago',
        description: 'Hospedagem Web - Plano Premium'
      }
    ]
  };

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
        const { data: customerData, error: customerError } = await supabase
          .from('customers')
          .select('*')
          .eq('user_id', user.id)
          .single();
          
        if (customerError) {
          console.error('Erro ao buscar dados do cliente:', customerError);
          
          // If no customer data, try to create it
          if (customerError.code === 'PGRST116') {
            const { error: insertError } = await supabase
              .from('customers')
              .insert({
                user_id: user.id,
                name: user.user_metadata?.full_name || 'Usuário',
                email: user.email,
                phone: user.user_metadata?.phone || '',
                nif: user.user_metadata?.nif || '',
                billing_address: user.user_metadata?.billing_address || '',
                city: user.user_metadata?.city || ''
              });
              
            if (insertError) {
              console.error('Erro ao criar perfil de cliente:', insertError);
            }
          }
          
          // Use mock data for now
          setServices(mockData.services);
          setDomains(mockData.domains);
          setInvoices(mockData.invoices);
          setLoading(false);
          return;
        }
          
        if (customerData) {
          // Set account balance
          setAccountBalance(254600); // Example balance in Kwanza
          
          // Fetch user's services, domains and invoices
          const customerId = customerData.id;
          
          // Fetch hosting services
          const { data: hostingData, error: hostingError } = await supabase
            .from('hosting_services')
            .select('*, hosting_plans(*)')
            .eq('customer_id', customerId);
            
          if (hostingError) {
            console.error('Erro ao buscar serviços de hospedagem:', hostingError);
            setServices(mockData.services);
          } else {
            setServices(hostingData?.length ? hostingData : mockData.services);
          }
          
          // Fetch domains
          const { data: domainsData, error: domainsError } = await supabase
            .from('domains')
            .select('*')
            .eq('customer_id', customerId);
            
          if (domainsError) {
            console.error('Erro ao buscar domínios:', domainsError);
            setDomains(mockData.domains);
          } else {
            setDomains(domainsData?.length ? domainsData : mockData.domains);
          }
          
          // Fetch invoices
          const { data: invoicesData, error: invoicesError } = await supabase
            .from('invoices')
            .select('*')
            .eq('customer_id', customerId)
            .order('created_at', { ascending: false });
            
          if (invoicesError) {
            console.error('Erro ao buscar faturas:', invoicesError);
            setInvoices(mockData.invoices);
          } else {
            setInvoices(invoicesData?.length ? invoicesData : mockData.invoices);
          }
        }
        
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        // Use mock data as fallback
        setServices(mockData.services);
        setDomains(mockData.domains);
        setInvoices(mockData.invoices);
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
        // Refresh data when signing in
        getUserData();
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
      if (amount <= 0) {
        toast.error('Por favor, insira um valor válido');
        return false;
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('É necessário estar logado para adicionar fundos');
        return false;
      }

      // Get or create customer record
      let customerId;
      const { data: customerData } = await supabase
        .from('customers')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!customerData) {
        const { data: newCustomer, error: newCustomerError } = await supabase
          .from('customers')
          .insert({
            user_id: user.id,
            name: user.user_metadata?.full_name || 'Cliente',
            email: user.email
          })
          .select('id')
          .single();
          
        if (newCustomerError) {
          console.error('Erro ao criar perfil de cliente:', newCustomerError);
          toast.error('Erro ao processar solicitação');
          return false;
        }
        
        customerId = newCustomer.id;
      } else {
        customerId = customerData.id;
      }

      // Create an order for the funds
      const orderReference = `FUND-${Date.now()}`;
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_id: customerId,
          total_amount: amount,
          status: 'pending',
          payment_method: 'pending',
          payment_id: orderReference,
        })
        .select()
        .single();

      if (orderError) {
        console.error('Erro ao criar ordem:', orderError);
        toast.error('Erro ao processar solicitação de fundos');
        return false;
      }

      // Create invoice
      const invoiceNumber = `INV-FUND-${Date.now()}`;
      const { error: invoiceError } = await supabase
        .from('invoices')
        .insert({
          order_id: orderData.id,
          customer_id: customerId,
          invoice_number: invoiceNumber,
          amount: amount,
          status: 'unpaid',
          due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        });

      if (invoiceError) {
        console.error('Erro ao criar fatura:', invoiceError);
        toast.error('Erro ao gerar fatura');
        return false;
      }
      
      // Redirect to checkout
      navigate('/checkout', {
        state: {
          paymentType: 'funds',
          amount: amount,
          description: 'Adição de Fundos',
          reference: orderReference
        }
      });
      
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
      
      // Get or create customer record
      let customerId;
      const { data: customerData } = await supabase
        .from('customers')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!customerData) {
        const { data: newCustomer, error: newCustomerError } = await supabase
          .from('customers')
          .insert({
            user_id: user.id,
            name: user.user_metadata?.full_name || 'Cliente',
            email: user.email
          })
          .select('id')
          .single();
          
        if (newCustomerError) {
          console.error('Erro ao criar perfil de cliente:', newCustomerError);
          toast.error('Erro ao processar solicitação');
          return false;
        }
        
        customerId = newCustomer.id;
      } else {
        customerId = customerData.id;
      }
      
      // Get service plan details
      const { data: planData } = await supabase
        .from('hosting_plans')
        .select('*')
        .eq('id', planId)
        .single();
        
      const price = planData?.price || 0;
      
      // Create a new order
      const orderReference = `SVC-${Date.now()}`;
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_id: customerId,
          status: 'pending',
          total_amount: price,
          payment_id: orderReference
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
          price: price,
          quantity: 1
        });
        
      if (itemError) throw itemError;
      
      // Create invoice
      const invoiceNumber = `INV-SVC-${Date.now()}`;
      const { error: invoiceError } = await supabase
        .from('invoices')
        .insert({
          order_id: orderData.id,
          customer_id: customerId,
          invoice_number: invoiceNumber,
          amount: price,
          status: 'unpaid',
          due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        });

      if (invoiceError) {
        console.error('Erro ao criar fatura:', invoiceError);
        toast.error('Erro ao gerar fatura');
      }
      
      // Redirect to checkout
      navigate('/checkout', {
        state: {
          paymentType: 'service',
          amount: price,
          description: `Novo serviço: ${serviceType}`,
          reference: orderReference
        }
      });
      
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

  const updateUserProfile = async (userData: any) => {
    try {
      // Update user metadata
      const { error: authError } = await supabase.auth.updateUser({
        data: {
          full_name: userData.fullName,
          phone: userData.phone,
          billing_address: userData.address,
          city: userData.city,
          nif: userData.nif
        }
      });
      
      if (authError) throw authError;
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error('Não foi possível atualizar o perfil. Usuário não encontrado.');
        return false;
      }
      
      // Update customer table
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
        
      if (customerError) {
        console.error('Erro ao atualizar tabela de clientes:', customerError);
        
        // If customer record doesn't exist, create it
        if (customerError.code === 'PGRST116') {
          const { error: insertError } = await supabase
            .from('customers')
            .insert({
              user_id: user.id,
              name: userData.fullName,
              email: user.email,
              phone: userData.phone,
              billing_address: userData.address,
              city: userData.city,
              nif: userData.nif
            });
            
          if (insertError) {
            console.error('Erro ao criar registro de cliente:', insertError);
            toast.error('Erro ao atualizar dados do cliente');
            return false;
          }
        } else {
          toast.error('Erro ao atualizar dados do cliente');
          return false;
        }
      }
      
      toast.success('Perfil atualizado com sucesso!');
      return true;
    } catch (error: any) {
      console.error('Erro ao atualizar perfil:', error);
      toast.error(error.message || 'Erro ao atualizar perfil');
      return false;
    }
  };

  const refreshData = async () => {
    setLoading(true);
    try {
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
        const customerId = customerData.id;
        
        // Fetch hosting services
        const { data: hostingData } = await supabase
          .from('hosting_services')
          .select('*, hosting_plans(*)')
          .eq('customer_id', customerId);
          
        setServices(hostingData || mockData.services);
        
        // Fetch domains
        const { data: domainsData } = await supabase
          .from('domains')
          .select('*')
          .eq('customer_id', customerId);
          
        setDomains(domainsData || mockData.domains);
        
        // Fetch invoices
        const { data: invoicesData } = await supabase
          .from('invoices')
          .select('*')
          .eq('customer_id', customerId)
          .order('created_at', { ascending: false });
          
        setInvoices(invoicesData || mockData.invoices);
        
        toast.success('Dados atualizados com sucesso!');
      } else {
        // Use mock data as fallback
        setServices(mockData.services);
        setDomains(mockData.domains);
        setInvoices(mockData.invoices);
      }
    } catch (error) {
      console.error('Erro ao atualizar dados:', error);
      toast.error('Erro ao atualizar dados');
    } finally {
      setLoading(false);
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
    changePassword,
    updateUserProfile,
    refreshData
  };
};
