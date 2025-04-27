
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const RevenueChart = () => {
  // Generate sample data for the last 12 months
  const generateData = () => {
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const currentMonth = new Date().getMonth();
    const data = [];

    for (let i = 0; i < 12; i++) {
      // Calculate the month index (wrapping around for previous year)
      const monthIndex = (currentMonth - 11 + i + 12) % 12;
      
      // Generate realistic but random revenue (between 2.5M and 4.5M)
      const baseValue = 2500000;
      const variableValue = Math.floor(Math.random() * 2000000);
      
      data.push({
        name: months[monthIndex],
        receita: baseValue + variableValue,
      });
    }

    return data;
  };

  const data = generateData();

  const formatValue = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value;
  };

  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis 
            tickFormatter={formatValue}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip 
            formatter={(value: number) => [
              new Intl.NumberFormat('pt-AO', {
                style: 'currency',
                currency: 'AOA',
                maximumFractionDigits: 0,
              }).format(value),
              'Receita'
            ]}
          />
          <Bar dataKey="receita" fill="#4f46e5" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
