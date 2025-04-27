
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell } from 'lucide-react';
import { NotificationPreferences } from './notifications/NotificationPreferences';

export const NotificationsTab = () => {
  const [emailNotifications, setEmailNotifications] = useState({
    invoices: true,
    support: true,
    marketing: false,
    productUpdates: true,
    expiringServices: true
  });

  const handlePreferenceChange = (key: string, value: boolean) => {
    setEmailNotifications(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferências de Notificação</CardTitle>
        <CardDescription>Configure como deseja receber notificações</CardDescription>
      </CardHeader>
      <CardContent>
        <NotificationPreferences 
          preferences={emailNotifications}
          onPreferenceChange={handlePreferenceChange}
        />
        <Button className="mt-6">
          <Bell className="h-4 w-4 mr-2" />
          Salvar Preferências
        </Button>
      </CardContent>
    </Card>
  );
};
