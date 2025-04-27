
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ServerCog, Shield, Database, BarChart4 } from 'lucide-react';

export const QuickAccess = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Acessos Rápidos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <QuickAccessButton icon={<ServerCog className="h-4 w-4 mr-2" />} label="cPanel Login" />
        <QuickAccessButton icon={<Database className="h-4 w-4 mr-2" />} label="phpMyAdmin" />
        <QuickAccessButton icon={<Shield className="h-4 w-4 mr-2" />} label="SSL/TLS" />
        <QuickAccessButton icon={<BarChart4 className="h-4 w-4 mr-2" />} label="Estatísticas" />
      </CardContent>
    </Card>
  );
};

const QuickAccessButton = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <Button variant="outline" size="sm" className="w-full justify-start">
    {icon}
    {label}
  </Button>
);
