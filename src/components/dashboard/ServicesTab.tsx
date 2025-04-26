
import React from 'react';
import { ServiceStatusCard } from './ServiceStatusCard';
import { Globe, Server, Mail } from 'lucide-react';
import { useCustomerServices } from '@/hooks/useCustomerServices';

export const ServicesTab = () => {
  const { services, loading } = useCustomerServices();
  
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <ServiceStatusCard
        title="Domínios"
        description="Gerencie seus domínios"
        icon={<Globe className="mr-2 h-5 w-5 text-blue-500" />}
        services={services.filter(s => s.type === 'domain')}
        loading={loading}
        emptyMessage="Nenhum domínio registrado."
        emptyActionText="Registrar Domínio"
        emptyActionLink="/dominios/registrar"
      />
      
      <ServiceStatusCard
        title="Hospedagem"
        description="Gerencie seus planos de hospedagem"
        icon={<Server className="mr-2 h-5 w-5 text-purple-500" />}
        services={services.filter(s => s.type === 'hosting')}
        loading={loading}
        emptyMessage="Nenhum plano de hospedagem ativo."
        emptyActionText="Contratar Hospedagem"
        emptyActionLink="/hospedagem-de-sites"
      />
      
      <ServiceStatusCard
        title="Email Profissional"
        description="Gerencie suas contas de email"
        icon={<Mail className="mr-2 h-5 w-5 text-orange-500" />}
        services={services.filter(s => s.type === 'email')}
        loading={loading}
        emptyMessage="Nenhuma conta de email."
        emptyActionText="Adicionar Email"
        emptyActionLink="/email/profissional"
      />
    </div>
  );
};
