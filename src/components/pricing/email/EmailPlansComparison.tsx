
import React from 'react';
import PlanComparisonTable from '../PlanComparisonTable';
import { PlanComparison } from '@/types/pricing';

const emailComparisons: PlanComparison[] = [
  { feature: "Espaço", basic: "5GB", professional: "15GB", enterprise: "50GB" },
  { feature: "Anti-spam", basic: "Básico", professional: "Avançado", enterprise: "Premium" },
  { feature: "Antivírus", basic: false, professional: true, enterprise: true },
  { feature: "Arquivamento", basic: false, professional: false, enterprise: true }
];

export const EmailPlansComparison = () => {
  return (
    <div className="mt-12 overflow-x-auto">
      <h4 className="text-xl font-semibold mb-4 text-center">Comparativo de Planos</h4>
      <PlanComparisonTable comparisons={emailComparisons} />
    </div>
  );
};
