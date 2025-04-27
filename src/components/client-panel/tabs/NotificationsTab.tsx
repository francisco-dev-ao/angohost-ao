
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Loader2 } from 'lucide-react';
import { NotificationPreferences } from './notifications/NotificationPreferences';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Tables } from '@/types/supabase';

export const NotificationsTab = () => {
  const [emailNotifications, setEmailNotifications] = useState<Tables<'notification_preferences'>>({
    id: '',
    user_id: '',
    invoices: true,
    support: true,
    marketing: false,
    product_updates: true,
    expiring_services: true,
    updated_at: new Date().toISOString()
  });
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchPreferences = async () => {
      setLoading(true);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
          .from('notification_preferences')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();
          
        if (error) throw error;
        
        if (data) {
          setEmailNotifications(data);
        }
      } catch (error) {
        console.error('Error fetching notification preferences:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPreferences();
  }, []);

  const handlePreferenceChange = (key: keyof Tables<'notification_preferences'>, value: boolean) => {
    setEmailNotifications(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const handleSavePreferences = async () => {
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Usuário não autenticado');
        return;
      }

      const { error } = await supabase
        .from('notification_preferences')
        .upsert({
          user_id: user.id,
          ...emailNotifications,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });
        
      if (error) throw error;
      toast.success('Preferências de notificação salvas com sucesso');
    } catch (error) {
      console.error('Error saving notification preferences:', error);
      toast.error('Erro ao salvar preferências de notificação');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferências de Notificação</CardTitle>
        <CardDescription>Configure como deseja receber notificações</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
            <span className="ml-2">Carregando preferências...</span>
          </div>
        ) : (
          <>
            <NotificationPreferences 
              preferences={{
                invoices: emailNotifications.invoices,
                support: emailNotifications.support,
                marketing: emailNotifications.marketing,
                productUpdates: emailNotifications.product_updates,
                expiringServices: emailNotifications.expiring_services,
              }}
              onPreferenceChange={(key, value) => {
                if (key === 'productUpdates') {
                  handlePreferenceChange('product_updates', value);
                } else if (key === 'expiringServices') {
                  handlePreferenceChange('expiring_services', value);
                } else {
                  handlePreferenceChange(key as keyof Tables<'notification_preferences'>, value);
                }
              }}
            />
            <Button 
              className="mt-6"
              onClick={handleSavePreferences}
              disabled={saving}
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Bell className="h-4 w-4 mr-2" />
                  Salvar Preferências
                </>
              )}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};
