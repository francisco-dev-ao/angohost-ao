
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';

export const TabsHeader = () => {
  return (
    <div className="flex justify-center mb-8">
      <TabsList className="grid grid-cols-3 w-full max-w-md">
        <TabsTrigger value="hosting">Hospedagem</TabsTrigger>
        <TabsTrigger value="email">Email</TabsTrigger>
        <TabsTrigger value="servers">Servidores</TabsTrigger>
      </TabsList>
    </div>
  );
};
