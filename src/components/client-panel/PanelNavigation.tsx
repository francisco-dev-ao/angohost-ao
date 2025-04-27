
import React from 'react';
import { CreditCard, FileText, Globe, Bell, Server, UserCircle, User } from 'lucide-react';

interface PanelNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  loading?: boolean;
}

export const PanelNavigation = ({ activeTab, onTabChange, loading = false }: PanelNavigationProps) => {
  const tabs = [
    { id: 'visao-geral', label: 'Visão Geral', icon: <CreditCard className="h-4 w-4" /> },
    { id: 'faturas', label: 'Faturas', icon: <FileText className="h-4 w-4" /> },
    { id: 'dominios', label: 'Domínios', icon: <Globe className="h-4 w-4" /> },
    { id: 'hospedagem', label: 'Hospedagem', icon: <Server className="h-4 w-4" /> },
    { id: 'notificacoes', label: 'Notificações', icon: <Bell className="h-4 w-4" /> },
    { id: 'perfis-de-contato', label: 'Perfis de Contato', icon: <UserCircle className="h-4 w-4" /> },
    { id: 'dados-pessoais', label: 'Dados Pessoais', icon: <User className="h-4 w-4" /> },
  ];

  return (
    <nav className="overflow-x-auto whitespace-nowrap">
      <ul className="flex border-b w-full px-2">
        {tabs.map((tab) => (
          <li key={tab.id}>
            <button
              className={`flex items-center px-4 py-3 border-b-2 ${
                activeTab === tab.id
                  ? 'border-primary text-primary font-medium'
                  : 'border-transparent text-muted-foreground hover:text-gray-700 hover:border-gray-300'
              } transition-all disabled:opacity-60`}
              onClick={() => onTabChange(tab.id)}
              disabled={loading}
            >
              {tab.icon}
              <span className="ml-2">{tab.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
