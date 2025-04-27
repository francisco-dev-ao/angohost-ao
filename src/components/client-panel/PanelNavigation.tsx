
import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PanelNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const PanelNavigation = ({ activeTab, onTabChange }: PanelNavigationProps) => {
  return (
    <TabsList className="flex flex-wrap border-b overflow-x-auto">
      <TabsTrigger value="overview" className="py-3 px-4">Visão Geral</TabsTrigger>
      <TabsTrigger value="services" className="py-3 px-4">Meus Serviços</TabsTrigger>
      <TabsTrigger value="domains" className="py-3 px-4">Domínios</TabsTrigger>
      <TabsTrigger value="invoices" className="py-3 px-4">Faturas</TabsTrigger>
      <TabsTrigger value="tickets" className="py-3 px-4">Tickets de Suporte</TabsTrigger>
      <TabsTrigger value="profile" className="py-3 px-4">Meu Perfil</TabsTrigger>
      <TabsTrigger value="downloads" className="py-3 px-4">Downloads</TabsTrigger>
      <TabsTrigger value="knowledge" className="py-3 px-4">Base de Conhecimento</TabsTrigger>
      <TabsTrigger value="notifications" className="py-3 px-4">Notificações</TabsTrigger>
      <TabsTrigger value="affiliate" className="py-3 px-4">Programa de Afiliados</TabsTrigger>
    </TabsList>
  );
};
