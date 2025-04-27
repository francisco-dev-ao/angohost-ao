
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

type WalletChartProps = {
  data: Array<{
    name: string;
    amount: number;
  }>;
};

export const WalletChart: React.FC<WalletChartProps> = ({ data }) => {
  // Generate gradient colors from light purple to dark purple
  const colors = ['#D6BCFA', '#B794F4', '#9B87F5', '#805AD5', '#6B46C1', '#553C9A'];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 5,
          left: 5,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
        <XAxis 
          dataKey="name" 
          tickLine={false}
          axisLine={false}
          fontSize={12}
        />
        <YAxis 
          tickFormatter={(value) => `${value / 1000}k`}
          tickLine={false}
          axisLine={false}
          fontSize={12}
        />
        <Tooltip 
          formatter={(value: number) => new Intl.NumberFormat('pt-AO', {
            style: 'currency',
            currency: 'AOA',
            minimumFractionDigits: 0
          }).format(value)}
          labelStyle={{ color: '#1A1F2C' }}
          contentStyle={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            border: 'none'
          }}
        />
        <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={colors[index % colors.length]} 
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
