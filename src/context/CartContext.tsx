
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  type: 'domain' | 'hosting' | 'vps' | 'email';
  name: string;
  price: number;
  period: 'monthly' | 'yearly';
  details: {
    [key: string]: any;
    renewalPrice?: number;
  };
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
}

interface CartContextType {
  items: CartItem[];
  customer: Customer | null;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, item: Partial<CartItem>) => void;
  clearCart: () => void;
  setCustomer: (customer: Customer) => void;
  getTotalPrice: () => number;
  getItemCount: () => number;
  getRenewalTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const defaultCustomer: Customer = {
  name: '',
  email: '',
  phone: '',
  nif: '',
  billingAddress: '',
  city: '',
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [customer, setCustomer] = useState<Customer | null>(null);
  
  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('angohost_cart');
    const savedCustomer = localStorage.getItem('angohost_customer');
    
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
  
  const updateCustomer = (customerData: Customer) => {
    setCustomer(customerData);
  };
  
  const value = {
    items,
    customer,
    addItem,
    removeItem,
    updateItem,
    clearCart,
    setCustomer: updateCustomer,
    getTotalPrice,
    getItemCount,
    getRenewalTotal
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
