
import React from 'react';
import {
  LayoutDashboard,
  FileText,
  Globe,
  Server,
  LifeBuoy,
  Bell,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface PanelNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  loading?: boolean;
}

export const PanelNavigation = ({ activeTab, onTabChange, loading = false }: PanelNavigationProps) => {
  const tabs = [
    {
      id: 'visao-geral',
      name: 'Visão Geral',
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      id: 'faturas',
      name: 'Faturas',
      icon: <FileText className="h-4 w-4" />,
    },
    {
      id: 'dominios',
      name: 'Domínios',
      icon: <Globe className="h-4 w-4" />,
    },
    {
      id: 'hospedagem',
      name: 'Hospedagem',
      icon: <Server className="h-4 w-4" />,
    },
    {
      id: 'suporte',
      name: 'Suporte',
      icon: <LifeBuoy className="h-4 w-4" />,
    },
    {
      id: 'notificacoes',
      name: 'Notificações',
      icon: <Bell className="h-4 w-4" />,
    },
  ];

  return (
    <nav className="flex items-center overflow-x-auto p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          disabled={loading}
          className={cn(
            'flex items-center px-4 py-2 whitespace-nowrap text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
            activeTab === tab.id
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-accent'
          )}
        >
          {tab.icon}
          <span className="ml-2">{tab.name}</span>
        </button>
      ))}

      {loading && (
        <div className="ml-2 flex items-center text-muted-foreground">
          <Loader2 className="h-3 w-3 animate-spin mr-1" />
          <span className="text-xs">Carregando...</span>
        </div>
      )}
    </nav>
  );
};
