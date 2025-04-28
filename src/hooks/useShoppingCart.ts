
import { useState, useCallback } from 'react';
import { useCartStorage } from './useCartStorage';

export const useShoppingCart = () => {
  const { items, addItem, updateItem, removeItem, clearItems } = useCartStorage();
  
  // Alias for addItem to maintain compatibility with both naming conventions
  const addToCart = useCallback((item: any) => {
    addItem(item);
  }, [addItem]);

  return {
    items,
    addItem,
    addToCart,
    updateItem,
    removeItem,
    clearItems,
    cartCount: items?.length || 0,
    hasItems: (items?.length || 0) > 0
  };
};
