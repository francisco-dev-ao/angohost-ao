
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

interface PanelNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  loading?: boolean;
}

export const PanelNavigation = ({ activeTab, onTabChange, loading = false }: PanelNavigationProps) => {
  const location = useLocation();
  
  const isActive = (tabName: string) => {
    return activeTab === tabName || location.pathname === `/painel-cliente/${tabName}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-4 border-b">
        <Loader2 className="h-5 w-5 animate-spin text-primary mr-2" />
        <span>Carregando...</span>
      </div>
    );
  }

  return (
    <nav className="flex flex-wrap border-b overflow-x-auto">
      <Link 
        to="/painel-cliente/visao-geral"
        className={`py-3 px-4 transition-colors ${isActive('visao-geral') ? 'border-b-2 border-primary text-primary font-medium' : 'hover:bg-gray-50'}`}
        onClick={() => onTabChange('visao-geral')}
      >
        Visão Geral
      </Link>
      <Link 
        to="/painel-cliente/servicos"
        className={`py-3 px-4 transition-colors ${isActive('servicos') ? 'border-b-2 border-primary text-primary font-medium' : 'hover:bg-gray-50'}`}
        onClick={() => onTabChange('servicos')}
      >
        Meus Serviços
      </Link>
      <Link 
        to="/painel-cliente/dominios"
        className={`py-3 px-4 transition-colors ${isActive('dominios') ? 'border-b-2 border-primary text-primary font-medium' : 'hover:bg-gray-50'}`}
        onClick={() => onTabChange('dominios')}
      >
        Domínios
      </Link>
      <Link 
        to="/painel-cliente/faturas"
        className={`py-3 px-4 transition-colors ${isActive('faturas') ? 'border-b-2 border-primary text-primary font-medium' : 'hover:bg-gray-50'}`}
        onClick={() => onTabChange('faturas')}
      >
        Faturas
      </Link>
      <Link 
        to="/painel-cliente/tickets"
        className={`py-3 px-4 transition-colors ${isActive('tickets') ? 'border-b-2 border-primary text-primary font-medium' : 'hover:bg-gray-50'}`}
        onClick={() => onTabChange('tickets')}
      >
        Tickets de Suporte
      </Link>
      <Link 
        to="/painel-cliente/perfil"
        className={`py-3 px-4 transition-colors ${isActive('perfil') ? 'border-b-2 border-primary text-primary font-medium' : 'hover:bg-gray-50'}`}
        onClick={() => onTabChange('perfil')}
      >
        Meu Perfil
      </Link>
      <Link 
        to="/painel-cliente/downloads"
        className={`py-3 px-4 transition-colors ${isActive('downloads') ? 'border-b-2 border-primary text-primary font-medium' : 'hover:bg-gray-50'}`}
        onClick={() => onTabChange('downloads')}
      >
        Downloads
      </Link>
      <Link 
        to="/painel-cliente/knowledge"
        className={`py-3 px-4 transition-colors ${isActive('knowledge') ? 'border-b-2 border-primary text-primary font-medium' : 'hover:bg-gray-50'}`}
        onClick={() => onTabChange('knowledge')}
      >
        Base de Conhecimento
      </Link>
      <Link 
        to="/painel-cliente/notificacoes"
        className={`py-3 px-4 transition-colors ${isActive('notificacoes') ? 'border-b-2 border-primary text-primary font-medium' : 'hover:bg-gray-50'}`}
        onClick={() => onTabChange('notificacoes')}
      >
        Notificações
      </Link>
      <Link 
        to="/painel-cliente/afiliados"
        className={`py-3 px-4 transition-colors ${isActive('afiliados') ? 'border-b-2 border-primary text-primary font-medium' : 'hover:bg-gray-50'}`}
        onClick={() => onTabChange('afiliados')}
      >
        Programa de Afiliados
      </Link>
    </nav>
  );
};
