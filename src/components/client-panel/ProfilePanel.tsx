
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Lock, Bell, Users } from 'lucide-react';
import { PersonalDataTab } from './tabs/PersonalDataTab';
import { SecurityTab } from './tabs/SecurityTab';
import { NotificationsTab } from './tabs/NotificationsTab';
import { SubAccountsTab } from './tabs/SubAccountsTab';

type ClientPanelContext = {
  userData: any;
  services: any[];
  domains: any[];
  invoices: any[];
};

export const ProfilePanel = () => {
  const { userData } = useOutletContext<ClientPanelContext>();

  return (
    <Tabs defaultValue="personal">
      <TabsList className="mb-6 flex flex-wrap">
        <TabsTrigger value="personal">Dados Pessoais</TabsTrigger>
        <TabsTrigger value="security">Segurança</TabsTrigger>
        <TabsTrigger value="notifications">Notificações</TabsTrigger>
        <TabsTrigger value="subaccounts">Sub-Contas</TabsTrigger>
      </TabsList>
      
      <TabsContent value="personal">
        <PersonalDataTab userData={userData} />
      </TabsContent>
      
      <TabsContent value="security">
        <SecurityTab />
      </TabsContent>
      
      <TabsContent value="notifications">
        <NotificationsTab />
      </TabsContent>
      
      <TabsContent value="subaccounts">
        <SubAccountsTab />
      </TabsContent>
    </Tabs>
  );
};
