
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useNotifications = (userId: string | undefined) => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchNotifications();
    }
  }, [userId]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      setNotifications(data || []);
      
      // Show new unread notifications as toasts
      const unreadNotifications = data?.filter(notification => !notification.is_read) || [];
      unreadNotifications.forEach(notification => {
        toast.info(notification.title, {
          description: notification.message,
          duration: 5000,
        });
      });
      
      // Mark notifications as read if needed
      if (unreadNotifications.length > 0) {
        const notificationIds = unreadNotifications.map(n => n.id);
        await supabase
          .from('notifications')
          .update({ is_read: true })
          .in('id', notificationIds);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  return { notifications, loading, fetchNotifications };
};
