
export interface CartItem {
  id: string;
  type: 'domain' | 'hosting' | 'vps' | 'email' | 'office365';
  name: string;
  price: number;
  period: 'yearly' | 'monthly';
  details: {
    [key: string]: any;
    renewalPrice?: number;
    quantity?: number;
    domainName?: string;
    contractYears?: number;
  };
}

export interface ContactProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  nif: string;
  billingAddress: string;
  city: string;
  postalCode?: string;
  country?: string;
  idNumber?: string;
}

export interface Customer {
  name: string;
  email: string;
  phone: string;
  nif: string;
  billingAddress: string;
  city: string;
  postalCode?: string;
  country?: string;
  idNumber?: string;
  domainOwnership?: {
    ownerName: string;
    ownerNif: string;
    ownerContact: string;
    ownerEmail: string;
    organizationName?: string;
  };
  contactProfiles?: ContactProfile[];
}

export interface PaymentInfo {
  method: 'credit-card' | 'bank-transfer' | 'emis';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  transactionId?: string;
  reference?: string;
  hasDomain?: boolean;
  hasEmail?: boolean;
}

export interface CartContextType {
  items: CartItem[];
  customer: Customer | null;
  paymentInfo: PaymentInfo | null;
  contactProfiles: ContactProfile[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, item: Partial<CartItem>) => void;
  clearCart: () => void;
  setCustomer: (customer: Customer) => void;
  setPaymentInfo: (info: PaymentInfo) => void;
  getTotalPrice: () => number;
  getItemCount: () => number;
  getRenewalTotal: () => number;
  generateOrderReference: () => string;
  hasDomainInCart: () => boolean;
  hasEmailInCart: () => boolean;
  getDomainNames: () => string[];
  addContactProfile: (profile: Omit<ContactProfile, 'id'> | ContactProfile) => string;
  removeContactProfile: (id: string) => void;
  updateContactProfile: (id: string, profile: Partial<ContactProfile>) => void;
  getContactProfiles: () => ContactProfile[];
  setSelectedContactProfile: (id: string | null) => void;
  selectedContactProfileId: string | null;
}
