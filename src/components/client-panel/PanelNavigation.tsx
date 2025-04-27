
import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from 'react-router-dom';

interface PanelNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const PanelNavigation = ({ activeTab, onTabChange }: PanelNavigationProps) => {
  return (
    <nav className="flex flex-wrap border-b overflow-x-auto">
      <Link 
        to="/painel-cliente/visao-geral"
        className={`py-3 px-4 ${activeTab === 'visao-geral' ? 'border-b-2 border-primary' : ''}`}
        onClick={() => onTabChange('visao-geral')}
      >
        Visão Geral
      </Link>
      <Link 
        to="/painel-cliente/servicos"
        className={`py-3 px-4 ${activeTab === 'servicos' ? 'border-b-2 border-primary' : ''}`}
        onClick={() => onTabChange('servicos')}
      >
        Meus Serviços
      </Link>
      <Link 
        to="/painel-cliente/dominios"
        className={`py-3 px-4 ${activeTab === 'dominios' ? 'border-b-2 border-primary' : ''}`}
        onClick={() => onTabChange('dominios')}
      >
        Domínios
      </Link>
      <Link 
        to="/painel-cliente/faturas"
        className={`py-3 px-4 ${activeTab === 'faturas' ? 'border-b-2 border-primary' : ''}`}
        onClick={() => onTabChange('faturas')}
      >
        Faturas
      </Link>
      <Link 
        to="/painel-cliente/tickets"
        className={`py-3 px-4 ${activeTab === 'tickets' ? 'border-b-2 border-primary' : ''}`}
        onClick={() => onTabChange('tickets')}
      >
        Tickets de Suporte
      </Link>
      <Link 
        to="/painel-cliente/perfil"
        className={`py-3 px-4 ${activeTab === 'perfil' ? 'border-b-2 border-primary' : ''}`}
        onClick={() => onTabChange('perfil')}
      >
        Meu Perfil
      </Link>
      <Link 
        to="/painel-cliente/downloads"
        className={`py-3 px-4 ${activeTab === 'downloads' ? 'border-b-2 border-primary' : ''}`}
        onClick={() => onTabChange('downloads')}
      >
        Downloads
      </Link>
      <Link 
        to="/painel-cliente/knowledge"
        className={`py-3 px-4 ${activeTab === 'knowledge' ? 'border-b-2 border-primary' : ''}`}
        onClick={() => onTabChange('knowledge')}
      >
        Base de Conhecimento
      </Link>
      <Link 
        to="/painel-cliente/notificacoes"
        className={`py-3 px-4 ${activeTab === 'notificacoes' ? 'border-b-2 border-primary' : ''}`}
        onClick={() => onTabChange('notificacoes')}
      >
        Notificações
      </Link>
      <Link 
        to="/painel-cliente/afiliados"
        className={`py-3 px-4 ${activeTab === 'afiliados' ? 'border-b-2 border-primary' : ''}`}
        onClick={() => onTabChange('afiliados')}
      >
        Programa de Afiliados
      </Link>
    </nav>
  );
};
