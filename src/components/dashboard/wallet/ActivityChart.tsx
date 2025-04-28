
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { WalletChart } from './WalletChart';
import { WalletChartData } from '@/hooks/useWalletData';

interface ActivityChartProps {
  isLoading: boolean;
  error: string | null;
  chartData: WalletChartData[];
}

export const ActivityChart: React.FC<ActivityChartProps> = ({ 
  isLoading, 
  error, 
  chartData 
}) => {
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Atividade Recente</CardTitle>
        <CardDescription>Histórico dos últimos 6 meses</CardDescription>
      </CardHeader>
      <CardContent className="h-[220px]">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <WalletChart data={chartData} />
        )}
      </CardContent>
    </Card>
  );
};
