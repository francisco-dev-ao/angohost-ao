
import React, { useEffect, useState } from 'react';
import { useUser } from '@/hooks/useUser';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Check, Info, AlertCircle, AlertTriangle } from "lucide-react";
import { toast } from 'sonner';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string;
}

export const ClientNotifications = () => {
  const { user } = useUser();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('notifications')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        setNotifications(data || []);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        toast.error('Erro ao carregar notificações');
      } finally {
        setLoading(false);
      }
    };
    
    fetchNotifications();
  }, [user]);
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return format(new Date(dateString), 'dd/MM/yyyy HH:mm', { locale: pt });
  };
  
  const getNotificationIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'error':
      case 'danger':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'success':
        return <Check className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const markAsRead = async (notification: Notification) => {
    if (notification.is_read) return;
    
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', notification.id);
        
      if (error) throw error;
      
      // Update local state
      setNotifications(notifications.map(n => 
        n.id === notification.id ? { ...n, is_read: true } : n
      ));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };
  
  const markAllAsRead = async () => {
    try {
      const unreadIds = notifications
        .filter(n => !n.is_read)
        .map(n => n.id);
        
      if (unreadIds.length === 0) return;
      
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .in('id', unreadIds);
        
      if (error) throw error;
      
      // Update local state
      setNotifications(notifications.map(n => ({ ...n, is_read: true })));
      
      toast.success('Todas as notificações marcadas como lidas');
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      toast.error('Erro ao marcar notificações como lidas');
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Notificações</h1>
        
        <Button variant="outline" onClick={markAllAsRead}>
          Marcar todas como lidas
        </Button>
      </div>
      
      {notifications.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <div className="rounded-full bg-blue-50 p-3">
              <Bell className="h-8 w-8 text-blue-500" />
            </div>
            <h3 className="mt-4 text-lg font-medium">Nenhuma notificação</h3>
            <p className="mt-2 text-sm text-gray-500 text-center">
              Você não possui notificações no momento.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={`transition-all hover:shadow-md cursor-pointer ${
                notification.is_read ? 'bg-white' : 'bg-blue-50'
              }`}
              onClick={() => markAsRead(notification)}
            >
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className={`text-lg font-medium ${!notification.is_read && 'font-bold'}`}>
                        {notification.title}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {formatDate(notification.created_at)}
                      </span>
                    </div>
                    <p className="text-gray-700 mt-1">{notification.message}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
