
export const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-500';
    case 'pending':
      return 'text-yellow-600 border-yellow-300';
    case 'suspended':
      return 'bg-red-500';
    default:
      return 'outline';
  }
};

export const mockServices = [
  {
    id: '1',
    name: 'Hospedagem cPanel',
    plan: 'Plano Profissional',
    status: 'active',
    domain: 'exemplo.ao',
    expiryDate: '20/12/2025',
    serverName: 'server01.angohost.ao',
    username: 'cliente1',
  },
  {
    id: '2',
    name: 'Hospedagem WordPress',
    plan: 'Plano Básico',
    status: 'active',
    domain: 'outrosite.ao',
    expiryDate: '15/10/2025',
    serverName: 'wp01.angohost.ao',
    username: 'cliente1_wp',
  }
];
