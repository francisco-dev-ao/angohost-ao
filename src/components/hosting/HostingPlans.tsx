
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SharedHostingPlans } from './plans/SharedHostingPlans';
import { WordPressHostingPlans } from './plans/WordPressHostingPlans';
import { ResellerHostingPlans } from './plans/ResellerHostingPlans';

export const HostingPlans = () => {
  return (
    <section id="plans" className="py-16 px-4 bg-gray-50">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Planos de Hospedagem</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Escolha o plano ideal para o seu projeto ou negócio
          </p>
        </div>

        <Tabs defaultValue="shared" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="shared">cPanel</TabsTrigger>
            <TabsTrigger value="wordpress">WordPress</TabsTrigger>
            <TabsTrigger value="reseller">Revenda</TabsTrigger>
          </TabsList>
          
          <TabsContent value="shared">
            <SharedHostingPlans />
          </TabsContent>
          
          <TabsContent value="wordpress">
            <WordPressHostingPlans />
          </TabsContent>
          
          <TabsContent value="reseller">
            <ResellerHostingPlans />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
