
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Package, Search, RefreshCcw } from 'lucide-react';
import { ServicesPanelProps } from './dashboard/types';
import { ServicesList } from './services/ServicesList';
import { ServiceDetails } from './services/ServiceDetails';
import { QuickAccess } from './services/QuickAccess';
import { ServiceUsageStats } from './services/ServiceUsageStats';
import { mockServices } from './services/utils';

export const ServicesPanel = ({ services = [] }: ServicesPanelProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const displayServices = services.length > 0 ? services : mockServices;
  
  const filteredServices = displayServices.filter(service => 
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (service.domain && service.domain.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Gerenciamento de Serviços</CardTitle>
          <CardDescription>Gerencie seus produtos e serviços ativos</CardDescription>
        </div>
        <div className="space-x-2">
          <Button variant="outline" size="sm">
            <RefreshCcw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
          <Button size="sm">
            <Package className="h-4 w-4 mr-2" />
            Adquirir Novo Serviço
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            <TabsList>
              <TabsTrigger value="all">Todos Serviços</TabsTrigger>
              <TabsTrigger value="hosting">Hospedagem Web</TabsTrigger>
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="vps">Servidores VPS</TabsTrigger>
              <TabsTrigger value="dedicated">Servidores Dedicados</TabsTrigger>
            </TabsList>
            
            <div className="relative w-full md:max-w-xs">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar serviços..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <TabsContent value="all" className="m-0">
            <ServicesList services={filteredServices} />
          </TabsContent>
          
          <TabsContent value="hosting" className="m-0">
            <ServicesList services={filteredServices} />
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <ServiceDetails />
              <QuickAccess />
              <ServiceUsageStats />
            </div>
          </TabsContent>
          
          <TabsContent value="email" className="m-0">
            <ServicesList services={filteredServices.filter(s => s.type === 'email')} />
          </TabsContent>
          
          <TabsContent value="vps" className="m-0">
            <ServicesList services={filteredServices.filter(s => s.type === 'vps')} />
          </TabsContent>
          
          <TabsContent value="dedicated" className="m-0">
            <ServicesList services={filteredServices.filter(s => s.type === 'dedicated')} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
