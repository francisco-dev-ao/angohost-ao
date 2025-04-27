
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useNotifications = (userId: string | undefined) => {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    if (userId) {
      fetchNotifications();
    }
  }, [userId]);

  const fetchNotifications = async () => {
    try {
      const { data: customer } = await supabase
        .from('customers')
        .select('id')
        .eq('user_id', userId)
        .maybeSingle();

      if (customer) {
        const { data } = await supabase
          .from('notifications')
          .select('*')
          .eq('customer_id', customer.id)
          .eq('status', 'pending')
          .order('scheduled_for', { ascending: true });

        if (data) {
          setNotifications(data);
          data.forEach(notification => {
            toast.info(notification.message, {
              description: notification.title,
              duration: 5000,
            });
          });

          // Mark notifications as read
          const notificationIds = data.map(n => n.id);
          await supabase
            .from('notifications')
            .update({ status: 'read' })
            .in('id', notificationIds);
        }
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  return { notifications };
};
