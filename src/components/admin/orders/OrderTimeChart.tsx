
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface OrderTimeData {
  name: string;
  pedidos: number;
}

interface OrderTimeChartProps {
  data: OrderTimeData[];
}

export const OrderTimeChart = ({ data }: OrderTimeChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pedidos ao Longo do Tempo</CardTitle>
        <CardDescription>Total de pedidos por período</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => [`${value} pedidos`, 'Quantidade']} />
            <Bar dataKey="pedidos" fill="#8884d8" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
