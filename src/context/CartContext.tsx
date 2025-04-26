
import React, { createContext, useContext, useState, useEffect } from 'react';

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
  idNumber?: string; // Número de Bilhete de Identidade
  // Domain ownership information
  domainOwnership?: {
    ownerName: string;
    ownerNif: string;
    ownerContact: string;
    ownerEmail: string;
    organizationName?: string;
  };
  // Contact profiles
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

interface CartContextType {
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
  addContactProfile: (profile: ContactProfile) => void;
  removeContactProfile: (id: string) => void;
  updateContactProfile: (id: string, profile: Partial<ContactProfile>) => void;
  getContactProfiles: () => ContactProfile[];
  setSelectedContactProfile: (id: string | null) => void;
  selectedContactProfileId: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const defaultCustomer: Customer = {
  name: '',
  email: '',
  phone: '',
  nif: '',
  billingAddress: '',
  city: '',
  contactProfiles: [],
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
  const [contactProfiles, setContactProfiles] = useState<ContactProfile[]>([]);
  const [selectedContactProfileId, setSelectedContactProfileId] = useState<string | null>(null);
  
  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('angohost_cart');
    const savedCustomer = localStorage.getItem('angohost_customer');
    const savedPayment = localStorage.getItem('angohost_payment');
    const savedContactProfiles = localStorage.getItem('angohost_contact_profiles');
    const savedSelectedProfile = localStorage.getItem('angohost_selected_profile');
    
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (err) {
        console.error('Failed to parse cart from localStorage', err);
      }
    }
    
    if (savedCustomer) {
      try {
        setCustomer(JSON.parse(savedCustomer));
      } catch (err) {
        console.error('Failed to parse customer from localStorage', err);
      }
    }
    
    if (savedPayment) {
      try {
        setPaymentInfo(JSON.parse(savedPayment));
      } catch (err) {
        console.error('Failed to parse payment from localStorage', err);
      }
    }
    
    if (savedContactProfiles) {
      try {
        setContactProfiles(JSON.parse(savedContactProfiles));
      } catch (err) {
        console.error('Failed to parse contact profiles from localStorage', err);
      }
    }
    
    if (savedSelectedProfile) {
      try {
        setSelectedContactProfileId(JSON.parse(savedSelectedProfile));
      } catch (err) {
        console.error('Failed to parse selected profile from localStorage', err);
      }
    }
  }, []);
  
  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('angohost_cart', JSON.stringify(items));
  }, [items]);
  
  // Save customer to localStorage when it changes
  useEffect(() => {
    if (customer) {
      localStorage.setItem('angohost_customer', JSON.stringify(customer));
    }
  }, [customer]);
  
  // Save payment info to localStorage when it changes
  useEffect(() => {
    if (paymentInfo) {
      localStorage.setItem('angohost_payment', JSON.stringify(paymentInfo));
    }
  }, [paymentInfo]);
  
  // Save contact profiles to localStorage when they change
  useEffect(() => {
    localStorage.setItem('angohost_contact_profiles', JSON.stringify(contactProfiles));
  }, [contactProfiles]);
  
  // Save selected profile to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('angohost_selected_profile', JSON.stringify(selectedContactProfileId));
  }, [selectedContactProfileId]);
  
  const addItem = (newItem: CartItem) => {
    // Check if the item already exists in the cart
    const existingItemIndex = items.findIndex(item => 
      item.type === newItem.type && 
      item.name === newItem.name
    );
    
    if (existingItemIndex >= 0) {
      // Update the existing item
      const updatedItems = [...items];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        ...newItem
      };
      setItems(updatedItems);
    } else {
      // Add as a new item
      setItems([...items, newItem]);
    }
  };
  
  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };
  
  const updateItem = (id: string, updatedFields: Partial<CartItem>) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, ...updatedFields } : item
    ));
  };
  
  const clearCart = () => {
    setItems([]);
    setPaymentInfo(null);
    localStorage.removeItem('angohost_payment');
  };
  
  const getTotalPrice = (): number => {
    return items.reduce((total, item) => total + item.price, 0);
  };
  
  const getRenewalTotal = (): number => {
    return items.reduce((total, item) => {
      // Use renewal price if available, otherwise use the item price
      const renewalPrice = item.details.renewalPrice || item.price;
      return total + renewalPrice;
    }, 0);
  };
  
  const getItemCount = (): number => {
    return items.length;
  };
  
  const hasDomainInCart = (): boolean => {
    return items.some(item => item.type === 'domain');
  };
  
  const hasEmailInCart = (): boolean => {
    return items.some(item => item.type === 'email');
  };
  
  const getDomainNames = (): string[] => {
    return items
      .filter(item => item.type === 'domain' && item.details.domainName)
      .map(item => item.details.domainName as string);
  };
  
  const updateCustomer = (customerData: Customer) => {
    setCustomer(customerData);
  };
  
  const updatePaymentInfo = (info: PaymentInfo) => {
    // Automatically add domain and email flags
    const updatedInfo = {
      ...info,
      hasDomain: hasDomainInCart(),
      hasEmail: hasEmailInCart()
    };
    setPaymentInfo(updatedInfo);
  };
  
  // Contact profiles management
  const addContactProfile = (profile: ContactProfile) => {
    const newProfile = {
      ...profile,
      id: profile.id || `profile-${Date.now()}`
    };
    setContactProfiles([...contactProfiles, newProfile]);
    return newProfile.id;
  };
  
  const removeContactProfile = (id: string) => {
    setContactProfiles(contactProfiles.filter(profile => profile.id !== id));
    if (selectedContactProfileId === id) {
      setSelectedContactProfileId(null);
    }
  };
  
  const updateContactProfile = (id: string, updatedFields: Partial<ContactProfile>) => {
    setContactProfiles(contactProfiles.map(profile => 
      profile.id === id ? { ...profile, ...updatedFields } : profile
    ));
  };
  
  const getContactProfiles = (): ContactProfile[] => {
    return contactProfiles;
  };
  
  // Generate a unique order reference
  const generateOrderReference = (): string => {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `AH${year}${month}${day}${random}`;
  };
  
  const value = {
    items,
    customer,
    paymentInfo,
    contactProfiles,
    selectedContactProfileId,
    addItem,
    removeItem,
    updateItem,
    clearCart,
    setCustomer: updateCustomer,
    setPaymentInfo: updatePaymentInfo,
    getTotalPrice,
    getItemCount,
    getRenewalTotal,
    generateOrderReference,
    hasDomainInCart,
    hasEmailInCart,
    getDomainNames,
    addContactProfile,
    removeContactProfile,
    updateContactProfile,
    getContactProfiles,
    setSelectedContactProfile: setSelectedContactProfileId
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
