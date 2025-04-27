
import React from 'react';
import { Button } from '@/components/ui/button';
import { usePlanSelection } from '@/hooks/usePlanSelection';

export const SharedHostingPlans = () => {
  const { selectPlan } = usePlanSelection();

  const plans = [
    {
      id: 'cpanel-start',
      name: 'cPanel Start',
      price: 24900,
      features: [
        '5GB de Espaço SSD',
        '10 Contas de Email',
        '1 Base de Dados',
        'Certificado SSL Gratuito',
        'Painel cPanel',
        'Suporte 24/7'
      ],
      popular: false
    },
    {
      id: 'cpanel-plus',
      name: 'cPanel Plus',
      price: 39900,
      features: [
        '20GB de Espaço SSD',
        '20 Contas de Email',
        '5 Bases de Dados',
        'Certificado SSL Gratuito',
        'Painel cPanel',
        'Backups Diários',
        'Suporte 24/7'
      ],
      popular: true
    },
    {
      id: 'cpanel-pro',
      name: 'cPanel Pro',
      price: 69900,
      features: [
        '50GB de Espaço SSD',
        'Email Ilimitado',
        'Bases de Dados Ilimitadas',
        'Certificado SSL Gratuito',
        'Painel cPanel',
        'Backups Diários',
        'Alta Performance',
        'Suporte Prioritário'
      ],
      popular: false
    }
  ];

  const handleSelectPlan = (plan: any) => {
    selectPlan({
      id: `hosting-${plan.id}`,
      type: 'hosting',
      name: plan.name,
      price: plan.price,
      period: 'yearly',
      details: {
        space: plan.features[0],
        email: plan.features[1],
        databases: plan.features[2],
        cpanel: true,
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
