
export interface EmailPlan {
  id: string;
  title: string;
  price: number;
  renewalPrice: number;
  storage: string;
  features: string[];
  minQuantity: number;
  maxQuantity: number;
  isPopular?: boolean;
}

export interface DomainOption {
  type: 'existing' | 'new';
  domainName?: string;
}

export interface PlanSelectionProps {
  selectedPlan: EmailPlan | null;
  onPlanSelect: (plan: EmailPlan) => void;
}

export interface QuantityDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPlan: EmailPlan | null;
  quantity: number;
  selectedPeriod: string;
  onQuantityChange: (value: number) => void;
  onPeriodChange: (period: string) => void;
  onConfirm: () => void;
  getDiscountedPrice: (basePrice: number, years: number) => number;
}

export interface DomainDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  domainOption: DomainOption;
  setDomainOption: (option: DomainOption) => void;
  existingDomain: string;
  setExistingDomain: (domain: string) => void;
  domainsInCart: string[];
  onConfirm: () => void;
}
