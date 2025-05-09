
import { EmailPlan } from '@/types/email';

export const emailPlans: EmailPlan[] = [
  {
    id: 'email-premium',
    title: 'Email Premium',
    storage: '5GB',
    price: 12000,
    renewalPrice: 14500,
    minQuantity: 1,
    maxQuantity: 1000,
    features: [
      '5GB por usuário',
      'IMAP/POP',
      'Reputação do IP limpo',
      'Classificado pelo Google',
      'Suporte 24/7'
    ]
  },
  {
    id: 'email-pro',
    title: 'Avançado Pro',
    storage: '50GB',
    price: 40000,
    renewalPrice: 42000,
    minQuantity: 1,
    maxQuantity: 1000,
    features: [
      '50GB por usuário',
      'Regras de Encaminhamento',
      'Aliases de email',
      'Verificação Antivírus',
      'Anti-spam avançado',
      'Infraestrutura baseada na cloud',
      'Suporte prioritário 24/7'
    ]
  },
  {
    id: 'email-business',
    title: 'Business',
    storage: '30GB',
    price: 30000,
    renewalPrice: 32000,
    minQuantity: 1,
    maxQuantity: 1000,
    features: [
      '30GB por usuário',
      'IMAP/POP',
      'Reputação do IP limpo',
      'Classificado pelo Google',
      'Suporte VIP 24/7'
    ]
  }
];
