
import { useCartItemsStorage } from './useCartItemsStorage';
import { useCustomerStorage } from './useCustomerStorage';
import { usePaymentStorage } from './usePaymentStorage';
import { useContactProfilesStorage } from './useContactProfilesStorage';
import { CartItem } from '../types/cart';
import { useState, useCallback } from 'react';

export const useCartStorage = () => {
  const { items, setItems } = useCartItemsStorage();
  const { customer, setCustomer } = useCustomerStorage();
  const { paymentInfo, setPaymentInfo } = usePaymentStorage();
  const {
    contactProfiles,
    setContactProfiles,
    selectedContactProfileId,
    setSelectedContactProfileId
  } = useContactProfilesStorage();

  // Add the missing methods for cart manipulation
  const addItem = useCallback((item: CartItem) => {
    setItems(currentItems => [...currentItems, item]);
  }, [setItems]);
  
  const updateItem = useCallback((id: string, updatedFields: Partial<CartItem>) => {
    setItems(currentItems => 
      currentItems.map(item => item.id === id ? { ...item, ...updatedFields } : item)
    );
  }, [setItems]);
  
  const removeItem = useCallback((id: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== id));
  }, [setItems]);
  
  const clearItems = useCallback(() => {
    setItems([]);
  }, [setItems]);

  return {
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
    // Add the new methods to the return object
    addItem,
    updateItem,
    removeItem,
    clearItems
  };
};
