
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const ServiceUsageStats = () => {
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Uso de Recursos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <UsageBar label="Espaço em Disco" used="2.1 GB" total="20 GB" percentage={10} color="blue" />
          <UsageBar label="Banda" used="45 GB" total="200 GB" percentage={22} color="green" />
          <UsageBar label="Contas de Email" used="3" total="10" percentage={30} color="purple" />
          <UsageBar label="Bancos de Dados" used="2" total="10" percentage={20} color="amber" />
        </div>
      </CardContent>
    </Card>
  );
};

interface UsageBarProps {
  label: string;
  used: string;
  total: string;
  percentage: number;
  color: string;
}

const UsageBar = ({ label, used, total, percentage, color }: UsageBarProps) => (
  <div>
    <div className="flex justify-between text-sm mb-1">
      <span>{label}</span>
      <span>{used} / {total}</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div className={`bg-${color}-500 h-2 rounded-full`} style={{ width: `${percentage}%` }}></div>
    </div>
  </div>
);
