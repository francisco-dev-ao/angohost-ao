
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Bell } from 'lucide-react';

export const NotificationsTab = () => {
  const [emailNotifications, setEmailNotifications] = useState({
    invoices: true,
    support: true,
    marketing: false,
    productUpdates: true,
    expiringServices: true
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferências de Notificação</CardTitle>
        <CardDescription>Configure como deseja receber notificações</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h4 className="font-medium">Faturas e Pagamentos</h4>
              <p className="text-sm text-muted-foreground">
                Notificações sobre novas faturas e lembretes de pagamento
              </p>
            </div>
            <Switch 
              checked={emailNotifications.invoices} 
              onCheckedChange={(checked) => 
                setEmailNotifications({...emailNotifications, invoices: checked})
              } 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h4 className="font-medium">Tickets de Suporte</h4>
              <p className="text-sm text-muted-foreground">
                Atualizações sobre seus tickets de suporte
              </p>
            </div>
            <Switch 
              checked={emailNotifications.support} 
              onCheckedChange={(checked) => 
                setEmailNotifications({...emailNotifications, support: checked})
              } 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h4 className="font-medium">Atualização de Produtos</h4>
              <p className="text-sm text-muted-foreground">
                Informações sobre atualizações de serviços contratados
              </p>
            </div>
            <Switch 
              checked={emailNotifications.productUpdates} 
              onCheckedChange={(checked) => 
                setEmailNotifications({...emailNotifications, productUpdates: checked})
              } 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h4 className="font-medium">Serviços Expirando</h4>
              <p className="text-sm text-muted-foreground">
                Alertas sobre serviços prestes a expirar
              </p>
            </div>
            <Switch 
              checked={emailNotifications.expiringServices} 
              onCheckedChange={(checked) => 
                setEmailNotifications({...emailNotifications, expiringServices: checked})
              } 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h4 className="font-medium">Marketing</h4>
              <p className="text-sm text-muted-foreground">
                Promoções, novidades e comunicados da AngoHost
              </p>
            </div>
            <Switch 
              checked={emailNotifications.marketing} 
              onCheckedChange={(checked) => 
                setEmailNotifications({...emailNotifications, marketing: checked})
              } 
            />
          </div>
          
          <Button>
            <Bell className="h-4 w-4 mr-2" />
            Salvar Preferências
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
