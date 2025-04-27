
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
  onPreferenceChange,
}: NotificationPreferencesProps) => {
  return (
    <div className="space-y-1">
      <NotificationPreferenceItem
        title="Faturas e Pagamentos"
        description="Notificações sobre novas faturas e confirmações de pagamentos"
        info="Você receberá emails quando novas faturas forem geradas ou quando seus pagamentos forem processados."
        checked={preferences.invoices}
        onCheckedChange={(checked) => onPreferenceChange('invoices', checked)}
      />
      
      <NotificationPreferenceItem
        title="Suporte e Tickets"
        description="Atualizações sobre seus tickets de suporte"
        checked={preferences.support}
        onCheckedChange={(checked) => onPreferenceChange('support', checked)}
      />
      
      <NotificationPreferenceItem
        title="Marketing e Promoções"
        description="Ofertas especiais e promoções exclusivas"
        info="Você pode se descadastrar a qualquer momento dessas comunicações."
        checked={preferences.marketing}
        onCheckedChange={(checked) => onPreferenceChange('marketing', checked)}
      />
      
      <NotificationPreferenceItem
        title="Atualizações de Produtos"
        description="Novidades sobre nossos serviços e funcionalidades"
        checked={preferences.productUpdates}
        onCheckedChange={(checked) => onPreferenceChange('productUpdates', checked)}
      />
      
      <NotificationPreferenceItem
        title="Serviços a Expirar"
        description="Lembretes sobre serviços que estão próximos do vencimento"
        info="Estes avisos são enviados 30, 15 e 5 dias antes do vencimento."
        checked={preferences.expiringServices}
        onCheckedChange={(checked) => onPreferenceChange('expiringServices', checked)}
      />
    </div>
  );
};
