
import React from 'react';
import PlanComparisonTable from '../PlanComparisonTable';
import { PlanComparison } from '@/types/pricing';

const hostingComparisons: PlanComparison[] = [
  { feature: "Espaço em Disco", basic: "1GB", professional: "5GB", enterprise: "10GB" },
  { feature: "Contas de Email", basic: "5", professional: "20", enterprise: "Ilimitado" },
  { feature: "Bancos de Dados", basic: "2", professional: "10", enterprise: "Ilimitado" },
  { feature: "Sites", basic: "1", professional: "5", enterprise: "Ilimitado" },
  { feature: "Certificado SSL", basic: true, professional: true, enterprise: true },
  { feature: "Backup Diário", basic: false, professional: true, enterprise: true },
  { feature: "CDN Premium", basic: false, professional: false, enterprise: true },
  { feature: "Domínio Grátis", basic: false, professional: true, enterprise: true }
];

export const HostingPlansComparison = () => {
  return (
    <div className="mt-12 overflow-x-auto">
      <h4 className="text-xl font-semibold mb-4 text-center">Comparativo de Planos</h4>
      <PlanComparisonTable comparisons={hostingComparisons} />
    </div>
  );
};
