
import React from 'react';
import { User, CreditCard, TicketIcon, ShoppingCart, Globe } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";

export const RecentActivities = () => {
  // Sample activities data
  const activities = [
    {
      id: 1,
      type: 'user',
      action: 'registrou-se',
      subject: 'João Silva',
      time: '10 minutos atrás',
      icon: <User className="h-4 w-4" />,
      iconBg: 'bg-blue-100 text-blue-800'
    },
    {
      id: 2,
      type: 'ticket',
      action: 'abriu um ticket',
      subject: 'Meu site está fora do ar',
      time: '25 minutos atrás',
      icon: <TicketIcon className="h-4 w-4" />,
      iconBg: 'bg-amber-100 text-amber-800'
    },
    {
      id: 3,
      type: 'invoice',
      action: 'pagou a fatura',
      subject: 'INV-00123',
      time: '1 hora atrás',
      amount: '150.000 AOA',
      icon: <CreditCard className="h-4 w-4" />,
      iconBg: 'bg-green-100 text-green-800'
    },
    {
      id: 4,
      type: 'order',
      action: 'fez um pedido',
      subject: 'Hospedagem WordPress',
      time: '2 horas atrás',
      icon: <ShoppingCart className="h-4 w-4" />,
      iconBg: 'bg-purple-100 text-purple-800'
    },
    {
      id: 5,
      type: 'domain',
      action: 'registrou o domínio',
      subject: 'exemplo.ao',
      time: '3 horas atrás',
      icon: <Globe className="h-4 w-4" />,
      iconBg: 'bg-indigo-100 text-indigo-800'
    },
  ];

  return (
    <div className="space-y-5">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-4">
          <div className={`${activity.iconBg} p-2 rounded-full`}>
            {activity.icon}
          </div>
          <div className="flex-1">
            <p className="text-sm">
              <span className="font-medium">{activity.subject}</span>{' '}
              <span className="text-muted-foreground">{activity.action}</span>
              {activity.amount && <span className="font-medium"> • {activity.amount}</span>}
            </p>
            <p className="text-xs text-muted-foreground">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
