
import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface OrdersTabListProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

export const OrdersTabList = ({ activeTab, onTabChange }: OrdersTabListProps) => {
  return (
    <TabsList>
      <TabsTrigger value="all">Todos</TabsTrigger>
      <TabsTrigger value="pending">Pendentes</TabsTrigger>
      <TabsTrigger value="completed">Confirmados</TabsTrigger>
      <TabsTrigger value="cancelled">Cancelados</TabsTrigger>
    </TabsList>
  );
};
