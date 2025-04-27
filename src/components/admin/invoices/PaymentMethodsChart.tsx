
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { formatCurrency } from '@/utils/formatters';

interface PaymentMethodData {
  name: string;
  valor: number;
}

interface PaymentMethodsChartProps {
  data: PaymentMethodData[];
}

export const PaymentMethodsChart = ({ data }: PaymentMethodsChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Métodos de Pagamento</CardTitle>
        <CardDescription>Distribuição por método de pagamento</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            layout="vertical"
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
            <XAxis type="number" tickFormatter={(value) => `${value/1000}K`} />
            <YAxis dataKey="name" type="category" width={150} />
            <Tooltip formatter={(value) => [formatCurrency(value as number), "Valor"]} />
            <Legend />
            <Bar dataKey="valor" name="Valor" fill="#82ca9d" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
