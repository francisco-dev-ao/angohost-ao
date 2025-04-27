
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Loader2 } from 'lucide-react';
import { NotificationPreferences } from './notifications/NotificationPreferences';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const NotificationsTab = () => {
  const [emailNotifications, setEmailNotifications] = useState({
    invoices: true,
    support: true,
    marketing: false,
    productUpdates: true,
    expiringServices: true
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
          setEmailNotifications({
            invoices: data.invoices || true,
            support: data.support || true,
            marketing: data.marketing || false,
            productUpdates: data.product_updates || true,
            expiringServices: data.expiring_services || true,
          });
        }
      } catch (error) {
        console.error('Error fetching notification preferences:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPreferences();
  }, []);

  const handlePreferenceChange = (key: string, value: boolean) => {
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
          invoices: emailNotifications.invoices,
          support: emailNotifications.support,
          marketing: emailNotifications.marketing,
          product_updates: emailNotifications.productUpdates,
          expiring_services: emailNotifications.expiringServices,
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
              preferences={emailNotifications}
              onPreferenceChange={handlePreferenceChange}
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
