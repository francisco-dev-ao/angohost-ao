
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart } from 'lucide-react';

export const AdminReports = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Relatórios</h1>
      
      <Card className="border-dashed border-2">
        <CardContent className="flex flex-col items-center justify-center p-6">
          <div className="rounded-full bg-blue-50 p-3 mb-4">
            <BarChart className="h-8 w-8 text-blue-500" />
          </div>
          <h3 className="text-lg font-medium">Módulo em Desenvolvimento</h3>
          <p className="mt-2 text-sm text-gray-500 text-center">
            Os relatórios do sistema serão implementados em breve.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
