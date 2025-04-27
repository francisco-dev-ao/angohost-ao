
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { CheckCircle, Clock, XCircle } from 'lucide-react';

interface OrderStatusData {
  name: string;
  value: number;
}

interface OrderStatusChartProps {
  data: OrderStatusData[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export const OrderStatusChart = ({ data }: OrderStatusChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Status dos Pedidos</CardTitle>
        <CardDescription>Distribuição dos pedidos por status</CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value} pedidos`, 'Quantidade']} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex justify-center mt-4 gap-4">
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 text-[#0088FE] mr-1" /> 
            <span className="text-xs">Confirmados</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-[#00C49F] mr-1" /> 
            <span className="text-xs">Pendentes</span>
          </div>
          <div className="flex items-center">
            <XCircle className="h-4 w-4 text-[#FFBB28] mr-1" /> 
            <span className="text-xs">Cancelados</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
