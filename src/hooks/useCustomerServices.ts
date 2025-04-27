
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Service {
  id: string;
  type: 'domain' | 'hosting' | 'email';
  name: string;
  status: 'active' | 'suspended' | 'expired' | 'pending';
  expiryDate?: string;
  details?: any;
}

export const useCustomerServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setError("Usuário não autenticado");
          return;
        }
        
        const { data: customerData } = await supabase
          .from('customers')
          .select('id')
          .eq('user_id', user.id)
          .single();
          
        if (!customerData) {
          setError("Dados do cliente não encontrados");
          return;
        }
        
        const customerId = customerData.id;
        
        const { data: hostingData } = await supabase
          .from('hosting_services')
          .select('*, hosting_plans(*)')
          .eq('customer_id', customerId);
          
        const { data: domainsData } = await supabase
          .from('domains')
          .select('*')
          .eq('customer_id', customerId);
          
        const { data: emailData } = await supabase
          .from('email_accounts')
          .select('*')
          .eq('customer_id', customerId);
        
        const formattedServices: Service[] = [
          ...(hostingData?.map(hosting => ({
            id: hosting.id,
            type: 'hosting' as const,
            name: hosting.hosting_plans?.name || 'Plano de Hospedagem',
            status: (hosting.status || 'pending') as 'active' | 'suspended' | 'expired' | 'pending',
            details: hosting
          })) || []),
          
          ...(domainsData?.map(domain => ({
            id: domain.id,
            type: 'domain' as const,
            name: `${domain.name}.${domain.tld}`,
            status: (domain.status || 'pending') as 'active' | 'suspended' | 'expired' | 'pending',
            expiryDate: domain.expiry_date,
            details: domain
          })) || []),
          
          ...(emailData?.map(email => ({
            id: email.id,
            type: 'email' as const,
            name: email.email_address,
            status: (email.status || 'pending') as 'active' | 'suspended' | 'expired' | 'pending',
            details: email
          })) || [])
        ];
        
        setServices(formattedServices);
      } catch (err: any) {
        console.error('Erro ao buscar serviços:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchServices();
  }, []);

  return { services, loading, error };
};
