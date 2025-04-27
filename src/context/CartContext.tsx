
import React, { createContext, useContext, FC } from 'react';
import { CartContextType, CartItem, Customer, PaymentInfo, ContactProfile } from '../types/cart';
import { useCartStorage } from '../hooks/useCartStorage';
import {
  calculateTotalPrice,
  calculateRenewalTotal,
  checkDomainInCart,
  checkEmailInCart,
  getDomainNamesFromCart,
  generateOrderRef,
} from '../utils/cartUtils';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    items,
    setItems,
    customer,
    setCustomer,
    paymentInfo,
    setPaymentInfo,
    contactProfiles,
    setContactProfiles,
    selectedContactProfileId,
    setSelectedContactProfileId,
  } = useCartStorage();
  
  const addItem = (newItem: CartItem) => {
    const existingItemIndex = items.findIndex(item => 
      item.type === newItem.type && 
      item.name === newItem.name
    );
    
    if (existingItemIndex >= 0) {
      const updatedItems = [...items];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        ...newItem
      };
      setItems(updatedItems);
    } else {
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
    localStorage.removeItem('angohost_cart');
    localStorage.removeItem('angohost_payment');
  };
  
  const addContactProfile = (profile: Omit<ContactProfile, 'id'> | ContactProfile): string => {
    const newProfileId = `profile-${Date.now()}`;
    const newProfile = {
      ...profile,
      id: 'id' in profile ? profile.id : newProfileId
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

  const value: CartContextType = {
    items,
    customer,
    paymentInfo,
    contactProfiles,
    selectedContactProfileId,
    addItem,
    removeItem,
    updateItem,
    clearCart,
    setCustomer: (newCustomer: Customer) => setCustomer(newCustomer),
    setPaymentInfo: (info: PaymentInfo) => setPaymentInfo(info),
    getTotalPrice: () => calculateTotalPrice(items),
    getItemCount: () => items.length,
    getRenewalTotal: () => calculateRenewalTotal(items),
    generateOrderReference: generateOrderRef,
    hasDomainInCart: () => checkDomainInCart(items),
    hasEmailInCart: () => checkEmailInCart(items),
    getDomainNames: () => getDomainNamesFromCart(items),
    addContactProfile,
    removeContactProfile,
    updateContactProfile,
    getContactProfiles: () => contactProfiles,
    setSelectedContactProfile: setSelectedContactProfileId
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export type { CartItem, Customer, PaymentInfo, ContactProfile, CartContextType };
