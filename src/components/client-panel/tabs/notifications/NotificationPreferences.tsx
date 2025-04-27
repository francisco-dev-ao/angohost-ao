
import React from 'react';
import { NotificationPreferenceItem } from './NotificationPreferenceItem';

interface NotificationPreferencesProps {
  preferences: {
    invoices: boolean;
    support: boolean;
    marketing: boolean;
    productUpdates: boolean;
    expiringServices: boolean;
  };
  onPreferenceChange: (key: string, value: boolean) => void;
}

export const NotificationPreferences = ({
  preferences,
  onPreferenceChange
}: NotificationPreferencesProps) => {
  return (
    <div className="space-y-4">
      <NotificationPreferenceItem
        title="Faturas e Pagamentos"
        description="Notificações sobre novas faturas e lembretes de pagamento"
        checked={preferences.invoices}
        onCheckedChange={(checked) => onPreferenceChange('invoices', checked)}
      />
      
      <NotificationPreferenceItem
        title="Tickets de Suporte"
        description="Atualizações sobre seus tickets de suporte"
        checked={preferences.support}
        onCheckedChange={(checked) => onPreferenceChange('support', checked)}
      />
      
      <NotificationPreferenceItem
        title="Atualização de Produtos"
        description="Informações sobre atualizações de serviços contratados"
        checked={preferences.productUpdates}
        onCheckedChange={(checked) => onPreferenceChange('productUpdates', checked)}
      />
      
      <NotificationPreferenceItem
        title="Serviços Expirando"
        description="Alertas sobre serviços prestes a expirar"
        checked={preferences.expiringServices}
        onCheckedChange={(checked) => onPreferenceChange('expiringServices', checked)}
      />
      
      <NotificationPreferenceItem
        title="Marketing"
        description="Promoções, novidades e comunicados da AngoHost"
        checked={preferences.marketing}
        onCheckedChange={(checked) => onPreferenceChange('marketing', checked)}
      />
    </div>
  );
};
