
import React from 'react';
import PlanComparisonTable from '../PlanComparisonTable';
import { PlanComparison } from '@/types/pricing';

const hostingComparisons: PlanComparison[] = [
  { feature: "Espaço em Disco", basic: "5GB", professional: "20GB", enterprise: "50GB" },
  { feature: "Contas de Email", basic: "10", professional: "30", enterprise: "Ilimitado" },
  { feature: "Certificado SSL", basic: true, professional: true, enterprise: true },
  { feature: "Backup Diário", basic: false, professional: true, enterprise: true },
  { feature: "CDN Premium", basic: false, professional: false, enterprise: true }
];

export const HostingPlansComparison = () => {
  return (
    <div className="mt-12 overflow-x-auto">
      <h4 className="text-xl font-semibold mb-4 text-center">Comparativo de Planos</h4>
      <PlanComparisonTable comparisons={hostingComparisons} />
    </div>
  );
};
