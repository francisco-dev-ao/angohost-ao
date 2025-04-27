
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomersList } from './CustomersList';
import { CustomerForm } from './CustomerForm';
import { Button } from '@/components/ui/button';
import { UserPlus, List, History, Ticket } from 'lucide-react';
import { CustomerHistory } from './CustomerHistory';
import { CustomerTickets } from './CustomerTickets';

export const CustomerManagement = () => {
  const [activeTab, setActiveTab] = useState('list');
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  
  const handleEditCustomer = (customerId: string) => {
    setSelectedCustomerId(customerId);
    setActiveTab('edit');
  };
  
  const handleViewHistory = (customerId: string) => {
    setSelectedCustomerId(customerId);
    setActiveTab('history');
  };
  
  const handleViewTickets = (customerId: string) => {
    setSelectedCustomerId(customerId);
    setActiveTab('tickets');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gestão de Clientes</h2>
          <p className="text-muted-foreground">Gerencie todos os clientes do sistema</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="list" className="flex items-center gap-2">
              <List className="h-4 w-4" />
              <span>Lista de Clientes</span>
            </TabsTrigger>
            <TabsTrigger value="create" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              <span>Criar Cliente</span>
            </TabsTrigger>
            {selectedCustomerId && (
              <TabsTrigger value="edit" className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                <span>Editar Cliente</span>
              </TabsTrigger>
            )}
            {selectedCustomerId && (
              <TabsTrigger value="history" className="flex items-center gap-2">
                <History className="h-4 w-4" />
                <span>Histórico de Compras</span>
              </TabsTrigger>
            )}
            {selectedCustomerId && (
              <TabsTrigger value="tickets" className="flex items-center gap-2">
                <Ticket className="h-4 w-4" />
                <span>Tickets de Suporte</span>
              </TabsTrigger>
            )}
          </TabsList>
          {activeTab === 'list' && (
            <Button onClick={() => setActiveTab('create')}>
              <UserPlus className="mr-2 h-4 w-4" />
              Novo Cliente
            </Button>
          )}
        </div>

        <TabsContent value="list" className="space-y-4">
          <CustomersList 
            onEdit={handleEditCustomer} 
            onViewHistory={handleViewHistory} 
            onViewTickets={handleViewTickets}
          />
        </TabsContent>
        
        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Criar Novo Cliente</CardTitle>
              <CardDescription>
                Preencha os dados abaixo para criar um novo cliente no sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CustomerForm 
                onSuccess={() => {
                  setActiveTab('list');
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="edit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Editar Cliente</CardTitle>
              <CardDescription>
                Atualize os dados do cliente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CustomerForm 
                customerId={selectedCustomerId}
                onSuccess={() => {
                  setActiveTab('list');
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="space-y-4">
          <CustomerHistory customerId={selectedCustomerId} />
        </TabsContent>
        
        <TabsContent value="tickets" className="space-y-4">
          <CustomerTickets customerId={selectedCustomerId} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
