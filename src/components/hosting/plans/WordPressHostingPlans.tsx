
import React from 'react';
import { Button } from '@/components/ui/button';
import { usePlanSelection } from '@/hooks/usePlanSelection';

export const WordPressHostingPlans = () => {
  const { selectPlan } = usePlanSelection();

  const plans = [
    {
      id: 'wp-blog',
      name: 'WordPress Blog',
      price: 29900,
      features: [
        '10GB de Espaço SSD',
        '10 Contas de Email',
        'Plugin de Cache',
        'Certificado SSL Gratuito',
        'Painel de Controle',
        'Suporte 24/7'
      ],
      popular: false
    },
    {
      id: 'wp-business',
      name: 'WordPress Business',
      price: 49900,
      features: [
        '30GB de Espaço SSD',
        '30 Contas de Email',
        'Plugin de Cache Avançado',
        'Certificado SSL Gratuito',
        'Painel de Controle',
        'Backups Diários',
        'CDN Integrado',
        'Suporte 24/7'
      ],
      popular: true
    },
    {
      id: 'wp-ecommerce',
      name: 'WordPress E-commerce',
      price: 79900,
      features: [
        '100GB de Espaço SSD',
        'Email Ilimitado',
        'Plugin de Cache Avançado',
        'Certificado SSL Gratuito',
        'Painel de Controle',
        'Backups Diários',
        'CDN Integrado',
        'WooCommerce Otimizado',
        'Suporte Prioritário'
      ],
      popular: false
    }
  ];

  const handleSelectPlan = (plan: any) => {
    selectPlan({
      id: `wordpress-${plan.id}`,
      type: 'hosting',
      name: plan.name,
      price: plan.price,
      period: 'yearly',
      details: {
        space: plan.features[0],
        email: plan.features[1],
        isWordPress: true,
        ssl: true
      }
    });
  };

  return (
    <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {plans.map((plan) => (
        <div 
          key={plan.id}
          className={`rounded-lg border overflow-hidden ${plan.popular ? 'border-primary shadow-lg' : ''}`}
        >
          <div className={`p-6 ${plan.popular ? 'bg-primary text-white' : 'bg-card'}`}>
            <h3 className="text-2xl font-bold">{plan.name}</h3>
            <div className="mt-4">
              <span className="text-3xl font-bold">{(plan.price / 100).toLocaleString('pt-AO')}</span>
              <span className="text-sm ml-1">Kz/ano</span>
            </div>
          </div>
          
          <div className="p-6">
            <ul className="space-y-3">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            
            <Button 
              className={`w-full mt-6 ${plan.popular ? 'bg-primary hover:bg-primary-dark' : ''}`}
              onClick={() => handleSelectPlan(plan)}
            >
              Selecionar
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
