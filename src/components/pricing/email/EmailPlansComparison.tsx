
import React from 'react';
import PlanComparisonTable from '../PlanComparisonTable';
import { PlanComparison } from '@/types/pricing';

const emailComparisons: PlanComparison[] = [
  { 
    feature: "Espaço por Usuário", 
    basic: "5GB", 
    professional: "50GB", 
    enterprise: "30GB" 
  },
  { 
    feature: "IMAP/POP", 
    basic: true, 
    professional: true, 
    enterprise: true 
  },
  { 
    feature: "Anti-spam", 
    basic: "Básico", 
    professional: "Avançado", 
    enterprise: "Básico" 
  },
  { 
    feature: "Reputação IP", 
    basic: true, 
    professional: true, 
    enterprise: true 
  }
];

export const EmailPlansComparison = () => {
  return (
    <div className="mt-12 overflow-x-auto">
      <h4 className="text-xl font-semibold mb-4 text-center">Comparativo de Planos</h4>
      <PlanComparisonTable comparisons={emailComparisons} />
    </div>
  );
};

