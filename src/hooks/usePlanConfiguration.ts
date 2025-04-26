
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import { CartItem } from '@/types/cart';

export const usePlanConfiguration = () => {
  const navigate = useNavigate();
  const { addItem } = useCart();

  const createHostingItem = (
    id: string,
    type: string,
    title: string,
    totalPrice: number,
    years: number,
    yearlyRenewalPrice: number,
    planDetails: Record<string, any>
  ): CartItem => {
    return {
      id: `${type}-${id}-${Date.now()}`,
      type,
      name: title,
      price: totalPrice,
      period: 'yearly',
      details: {
        ...planDetails,
        renewalPrice: yearlyRenewalPrice,
        contractYears: years
      }
    };
  };

  const handlePlanSelection = (
    type: string,
    id: string,
    title: string,
    totalPrice: number,
    years: number,
    yearlyRenewalPrice: number
  ) => {
    if (type === 'email') {
      navigate('/email/profissional');
      return;
    }

    let newItem: CartItem | null = null;

    if (type === 'hosting') {
      if (id.includes('basic') || id === 'starter') {
        newItem = createHostingItem(id, type, 'Plano Básico de Hospedagem', totalPrice, years, yearlyRenewalPrice, {
          diskSpace: '5GB',
          emailAccounts: '10',
          databases: 'Ilimitado'
        });
      } else if (id.includes('professional') || id === 'business') {
        newItem = createHostingItem(id, type, 'Plano Profissional de Hospedagem', totalPrice, years, yearlyRenewalPrice, {
          diskSpace: '20GB',
          emailAccounts: '30',
          databases: 'Ilimitado'
        });
      } else if (id.includes('enterprise')) {
        newItem = createHostingItem(id, type, 'Plano Empresarial de Hospedagem', totalPrice, years, yearlyRenewalPrice, {
          diskSpace: '50GB',
          emailAccounts: 'Ilimitado',
          databases: 'Ilimitado'
        });
      } else if (id.includes('dedicated-basic')) {
        newItem = createHostingItem(id, type, 'Servidor Dedicado Básico', totalPrice, years, yearlyRenewalPrice, {
          cpu: '4 Cores',
          ram: '8GB',
          storage: '1TB HDD',
          bandwidth: 'Ilimitado',
          ips: '1 IP Dedicado'
        });
      } else if (id.includes('dedicated-pro')) {
        newItem = createHostingItem(id, type, 'Servidor Dedicado Pro', totalPrice, years, yearlyRenewalPrice, {
          cpu: '8 Cores',
          ram: '16GB',
          storage: '2TB HDD',
          bandwidth: 'Ilimitado',
          ips: '2 IPs Dedicados'
        });
      } else if (id.includes('dedicated-enterprise')) {
        newItem = createHostingItem(id, type, 'Servidor Dedicado Enterprise', totalPrice, years, yearlyRenewalPrice, {
          cpu: '16 Cores',
          ram: '32GB',
          storage: '4TB HDD',
          bandwidth: 'Ilimitado',
          ips: '4 IPs Dedicados'
        });
      } else if (id.includes('wp-')) {
        const wpPlanNames = {
          'wp-basic': 'WordPress Básico',
          'wp-pro': 'WordPress Pro',
          'wp-agency': 'WordPress Agency'
        };
        
        const wpPlanDetails = {
          'wp-basic': { diskSpace: '10GB', emailAccounts: '15' },
          'wp-pro': { diskSpace: '25GB', emailAccounts: '30' },
          'wp-agency': { diskSpace: '50GB', emailAccounts: 'Ilimitado' }
        };
        
        const planKey = id as keyof typeof wpPlanNames;
        newItem = createHostingItem(id, type, wpPlanNames[planKey] || title, totalPrice, years, yearlyRenewalPrice, {
          ...wpPlanDetails[planKey as keyof typeof wpPlanDetails],
          databases: 'Ilimitado',
          isWordPress: true
        });
      }
    } else if (type === 'office365') {
      const o365Plans: Record<string, string> = {
        'o365-basic': 'Office 365 Business Basic',
        'o365-standard': 'Office 365 Business Standard',
        'o365-premium': 'Office 365 Business Premium'
      };

      if (o365Plans[id]) {
        newItem = createHostingItem(id, type, o365Plans[id], totalPrice, years, yearlyRenewalPrice, {
          users: 1
        });
      }
    }

    if (newItem) {
      addItem(newItem);
      toast.success(`${newItem.name} adicionado ao carrinho!`);
      
      const currentPath = window.location.pathname;
      if ((currentPath.includes('/hospedagem/cpanel') || currentPath.includes('/hospedagem/wordpress')) && type === 'hosting') {
        navigate('/dominios/registrar?fromHosting=true');
      } else {
        navigate('/carrinho');
      }
    }
  };

  return { handlePlanSelection };
};
