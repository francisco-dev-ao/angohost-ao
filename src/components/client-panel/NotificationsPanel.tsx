
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, Info, CreditCard, AlertCircle, CheckCircle, ShieldCheck,
  Clock, RefreshCcw, Trash2, Check
} from 'lucide-react';

export const NotificationsPanel = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Fatura #INV-2025-002 aguardando pagamento',
      message: 'Você tem uma fatura pendente no valor de 35.000 kz com vencimento em 30/04/2025.',
      type: 'invoice',
      read: false,
      date: '15/04/2025',
      time: '10:30'
    },
    {
      id: 2,
      title: 'Ticket #12345 foi respondido',
      message: 'O departamento de suporte respondeu ao seu ticket sobre configuração de DNS.',
      type: 'support',
      read: false,
      date: '14/04/2025',
      time: '15:45'
    },
    {
      id: 3,
      title: 'Domínio exemplo.ao expira em 30 dias',
      message: 'Seu domínio exemplo.ao expira em 30 dias. Renove agora para evitar a perda do domínio.',
      type: 'domain',
      read: false,
      date: '12/04/2025',
      time: '09:15'
    },
    {
      id: 4,
      title: 'Manutenção programada',
      message: 'Informamos que haverá manutenção programada nos servidores de email no dia 30/04/2025.',
      type: 'system',
      read: true,
      date: '10/04/2025',
      time: '11:20'
    },
    {
      id: 5,
      title: 'Pagamento confirmado',
      message: 'Seu pagamento da fatura #INV-2025-001 foi confirmado. Obrigado!',
      type: 'invoice',
      read: true,
      date: '01/04/2025',
      time: '14:05'
    }
  ]);
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'invoice':
        return <CreditCard className="h-6 w-6 text-blue-500" />;
      case 'support':
        return <Info className="h-6 w-6 text-purple-500" />;
      case 'domain':
        return <AlertCircle className="h-6 w-6 text-amber-500" />;
      case 'system':
        return <ShieldCheck className="h-6 w-6 text-green-500" />;
      default:
        return <Bell className="h-6 w-6 text-gray-500" />;
    }
  };
  
  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };
  
  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Notificações e Alertas</CardTitle>
          <CardDescription>Acompanhe atualizações importantes</CardDescription>
        </div>
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            <Check className="h-4 w-4 mr-2" />
            Marcar Todas Como Lidas
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCcw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.map(notification => (
            <div 
              key={notification.id} 
              className={`flex gap-3 p-4 rounded-lg border ${!notification.read ? 'bg-blue-50' : 'bg-white'}`}
            >
              <div className="flex-shrink-0">
                {getNotificationIcon(notification.type)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-medium">
                    {notification.title}
                    {!notification.read && (
                      <Badge className="ml-2 bg-blue-500">Nova</Badge>
                    )}
                  </h4>
                  <div className="flex items-center space-x-1">
                    {!notification.read && (
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => markAsRead(notification.id)}
                        className="h-7 w-7"
                      >
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => deleteNotification(notification.id)}
                      className="h-7 w-7"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm">{notification.message}</p>
                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{notification.date} às {notification.time}</span>
                </div>
              </div>
            </div>
          ))}
          
          {notifications.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              <Bell className="h-12 w-12 mx-auto mb-3 text-muted-foreground/60" />
              <p>Nenhuma notificação disponível</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
