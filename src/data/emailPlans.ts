
export interface EmailPlan {
  id: string;
  title: string;
  storage: string;
  price: number;
  features: string[];
}

export const emailPlans: EmailPlan[] = [
  {
    id: 'email-start',
    title: 'Email Start',
    storage: '5GB',
    price: 15000,
    features: ['Proteção anti-spam básica', 'Acesso web e mobile', 'Suporte por email']
  },
  {
    id: 'email-business',
    title: 'Email Business',
    storage: '25GB',
    price: 24000,
    features: ['Proteção anti-spam avançada', 'Acesso web e mobile', 'Suporte prioritário', 'Calendário compartilhado']
  },
  {
    id: 'email-premium',
    title: 'Email Premium',
    storage: '50GB',
    price: 36000,
    features: ['Proteção anti-spam premium', 'Acesso web e mobile', 'Suporte VIP 24/7', 'Calendário e contatos compartilhados', 'Colaboração em tempo real']
  }
];
