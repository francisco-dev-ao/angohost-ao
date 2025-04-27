
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { UserService } from '@/services/UserService';

export const useClientDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [customerData, setCustomerData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [services, setServices] = useState({
    domains: [],
    hosting: [],
    emails: []
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        
        const { data } = await supabase.auth.getUser();
        if (!data.user) {
          navigate('/auth');
          return;
        }
        
        setUser(data.user);
        
        // Fetch customer profile
        const customerProfile = await UserService.getCustomerProfile(data.user.id);
        setCustomerData(customerProfile);
        
        // Fetch customer orders
        const { data: ordersData } = await supabase
          .from('orders')
          .select('*')
          .eq('customer_id', customerProfile?.id)
          .order('created_at', { ascending: false });
          
        setOrders(ordersData || []);
        
        // Fetch customer services
        const { data: domainsData } = await supabase
          .from('domains')
          .select('*')
          .eq('customer_id', customerProfile?.id);
          
        const { data: hostingData } = await supabase
          .from('hosting_services')
          .select('*')
          .eq('customer_id', customerProfile?.id);
          
        const { data: emailsData } = await supabase
          .from('email_accounts')
          .select('*')
          .eq('customer_id', customerProfile?.id);
          
        setServices({
          domains: domainsData || [],
          hosting: hostingData || [],
          emails: emailsData || []
        });
          
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error('Erro ao carregar os dados do painel. Por favor, tente novamente.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [navigate]);

  return {
    user,
    customerData,
    loading,
    orders,
    services
  };
};
