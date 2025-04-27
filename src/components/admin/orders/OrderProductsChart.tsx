
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '@/utils/formatters';

interface OrderProductData {
  name: string;
  pedidos: number;
  receita: number;
}

interface OrderProductsChartProps {
  data: OrderProductData[];
}

export const OrderProductsChart = ({ data }: OrderProductsChartProps) => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Produtos Mais Vendidos</CardTitle>
        <CardDescription>Distribuição de pedidos e receita por produto</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
            <Tooltip formatter={(value, name) => {
              if (name === "pedidos") return [`${value} pedidos`, "Quantidade"];
              if (name === "receita") return [formatCurrency(value as number), "Receita"];
              return [value, name];
            }} />
            <Legend />
            <Bar yAxisId="left" dataKey="pedidos" name="Quantidade" fill="#8884d8" radius={[4, 4, 0, 0]} />
            <Bar yAxisId="right" dataKey="receita" name="Receita" fill="#82ca9d" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
