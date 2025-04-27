
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, CreditCard, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';

interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    positive: boolean;
  };
  badge?: {
    value: string;
    color?: string;
  };
}

const StatsCard = ({ title, value, description, icon, trend, badge }: StatsCardProps) => (
  <Card>
    <CardHeader className="pb-2">
      <CardDescription>{title}</CardDescription>
      <div className="flex items-center justify-between">
        <CardTitle className="text-2xl">{value}</CardTitle>
        {badge && (
          <Badge className={badge.color}>{badge.value}</Badge>
        )}
        {!badge && icon}
      </div>
    </CardHeader>
    <CardContent>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{description}</span>
        {trend && (
          <div className={`flex items-center ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
            {trend.positive ? (
              <ArrowUpRight className="mr-1 h-4 w-4" />
            ) : (
              <ArrowDownRight className="mr-1 h-4 w-4" />
            )}
            <span>{trend.value}</span>
          </div>
        )}
      </div>
    </CardContent>
  </Card>
);

export const InvoiceStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        title="Faturas Emitidas"
        value="142"
        description="Esse mês"
        icon={<FileText className="h-6 w-6 text-primary opacity-75" />}
        trend={{
          value: "12%",
          positive: true
        }}
      />
      <StatsCard
        title="Total Faturado"
        value={formatCurrency(2070000)}
        description="Esse mês"
        icon={<CreditCard className="h-6 w-6 text-primary opacity-75" />}
        trend={{
          value: "8%",
          positive: true
        }}
      />
      <StatsCard
        title="Faturas Pagas"
        value="108"
        description={`Total: ${formatCurrency(1620000)}`}
        icon={<FileText className="h-6 w-6 text-primary opacity-75" />}
        badge={{
          value: "76%",
          color: "bg-green-500"
        }}
      />
      <StatsCard
        title="Faturas Vencidas"
        value="15"
        description={`Total: ${formatCurrency(225000)}`}
        icon={<FileText className="h-6 w-6 text-primary opacity-75" />}
        badge={{
          value: "11%",
          color: "bg-red-500"
        }}
      />
    </div>
  );
};
