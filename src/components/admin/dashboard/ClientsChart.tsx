
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const ClientsChart = () => {
  // Generate sample data for the last 12 months
  const generateData = () => {
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const currentMonth = new Date().getMonth();
    const data = [];
    let totalClients = 80; // Starting number

    for (let i = 0; i < 12; i++) {
      // Calculate the month index (wrapping around for previous year)
      const monthIndex = (currentMonth - 11 + i + 12) % 12;
      
      // Add new clients (between 3 and 15)
      const newClients = Math.floor(Math.random() * 12) + 3;
      totalClients += newClients;
      
      // Some clients become inactive (between 1 and 5)
      const inactiveClients = Math.floor(Math.min(totalClients * 0.1, Math.random() * 5 + 1));
      const activeClients = totalClients - inactiveClients;
      
      data.push({
        name: months[monthIndex],
        ativos: activeClients,
        inativos: inactiveClients,
        novos: newClients,
      });
    }

    return data;
  };

  const data = generateData();

  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
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
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip />
          <Line 
            type="monotone" 
            dataKey="ativos" 
            stroke="#10b981" 
            strokeWidth={2}
            dot={{ r: 4, strokeWidth: 1 }}
            name="Clientes Ativos"
          />
          <Line 
            type="monotone" 
            dataKey="inativos" 
            stroke="#94a3b8" 
            strokeWidth={2}
            dot={{ r: 4, strokeWidth: 1 }}
            name="Clientes Inativos"
          />
          <Line 
            type="monotone" 
            dataKey="novos" 
            stroke="#3b82f6" 
            strokeWidth={2}
            dot={{ r: 4, strokeWidth: 1 }}
            name="Novos Clientes"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
