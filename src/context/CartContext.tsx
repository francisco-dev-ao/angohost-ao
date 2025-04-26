
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  type: 'domain' | 'hosting' | 'vps' | 'email';
  name: string;
  price: number;
  period: 'monthly' | 'yearly';
  details: {
    [key: string]: any;
  };
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, item: Partial<CartItem>) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  
  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('angohost_cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (err) {
        console.error('Failed to parse cart from localStorage', err);
      }
    }
  }, []);
  
  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('angohost_cart', JSON.stringify(items));
  }, [items]);
  
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
  };
  
  const getTotalPrice = (): number => {
    return items.reduce((total, item) => total + item.price, 0);
  };
  
  const getItemCount = (): number => {
    return items.length;
  };
  
  const value = {
    items,
    addItem,
    removeItem,
    updateItem,
    clearCart,
    getTotalPrice,
    getItemCount
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
