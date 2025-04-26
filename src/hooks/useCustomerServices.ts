
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Service {
  id: string;
  name: string;
  type: 'domain' | 'hosting' | 'email' | 'server';
  status: string;
  expiryDate: string | null;
  details: any;
}

export const useCustomerServices = (userId?: string) => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);

        // Obter ID do usuário atual se não fornecido
        let currentUserId = userId;
        if (!currentUserId) {
          const { data: { user } } = await supabase.auth.getUser();
          currentUserId = user?.id;
        }
        
        if (!currentUserId) {
          throw new Error('Usuário não autenticado');
        }

        // Buscar domínios
        const [
          { data: domains, error: domainsError },
          { data: hostings, error: hostingsError },
          { data: emails, error: emailsError }
        ] = await Promise.all([
          supabase
            .from('domains')
            .select('*')
            .eq('customer_id', currentUserId),
            
          supabase
            .from('hosting_services')
            .select(`
              *,
              plan:hosting_plans(name, features, type)
            `)
            .eq('customer_id', currentUserId),
            
          supabase
            .from('email_accounts')
            .select('*')
            .eq('customer_id', currentUserId)
        ]);

        if (domainsError) throw domainsError;
        if (hostingsError) throw hostingsError;
        if (emailsError) throw emailsError;

        // Transformar dados em formato unificado
        const allServices: Service[] = [
          ...(domains?.map(domain => ({
            id: domain.id,
            name: `${domain.name}.${domain.tld}`,
            type: 'domain' as const,
            status: domain.status || 'pending',
            expiryDate: domain.expiry_date,
            details: domain,
          })) || []),
          
          ...(hostings?.map(hosting => ({
            id: hosting.id,
            name: hosting.plan?.name || 'Plano de Hospedagem',
            type: 'hosting' as const,
            status: hosting.status || 'active',
            expiryDate: null, // Adicionar data de expiração quando disponível
            details: {
              ...hosting,
              planType: hosting.plan?.type,
              planFeatures: hosting.plan?.features
            },
          })) || []),
          
          ...(emails?.map(email => ({
            id: email.id,
            name: email.email_address,
            type: 'email' as const,
            status: email.status || 'active',
            expiryDate: null,
            details: email,
          })) || [])
        ];

        setServices(allServices);
      } catch (err: any) {
        console.error('Erro ao buscar serviços:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId || supabase.auth.getSession()) {
      fetchServices();
    } else {
      setLoading(false);
    }
  }, [userId]);

  return { services, loading, error };
};
