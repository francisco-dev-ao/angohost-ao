
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { FileText } from 'lucide-react';
import type { InvoiceData } from '@/hooks/useCustomerStatistics';

interface SpendingChartProps {
  loading: boolean;
  spendingData: InvoiceData[];
}

export const SpendingChart: React.FC<SpendingChartProps> = ({
  loading,
  spendingData
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-AO', {
      style: 'currency',
      currency: 'AOA',
      minimumFractionDigits: 0
    }).format(value);
  };

  const chartConfig = {
    total: { label: "Valor Gasto" },
  };

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Histórico de Gastos</CardTitle>
        <CardDescription>
          Seus gastos com serviços ao longo do tempo
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        {loading ? (
          <div className="flex items-center justify-center h-[350px]">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : spendingData.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[350px] text-center">
            <FileText className="h-16 w-16 text-muted-foreground/60 mb-4" />
            <p className="text-muted-foreground">Nenhum histórico de gastos encontrado</p>
            <p className="text-xs text-muted-foreground mt-2">
              Seus gastos serão exibidos aqui após o pagamento de faturas
            </p>
          </div>
        ) : (
          <div className="h-[350px] w-full">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={spendingData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                  />
                  <YAxis
                    tickFormatter={(value) => formatCurrency(value)}
                    width={80}
                  />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="total"
                    name="total"
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
