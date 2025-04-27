
import { useState, useEffect } from 'react';
import { CartItem } from '../types/cart';

export const useCartItemsStorage = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  
  useEffect(() => {
    const savedCart = localStorage.getItem('angohost_cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setItems(Array.isArray(parsedCart) ? parsedCart : []);
      } catch (err) {
        console.error('Failed to parse cart from localStorage', err);
        setItems([]);
      }
    }
  }, []);

  useEffect(() => {
    if (items && Array.isArray(items)) {
      localStorage.setItem('angohost_cart', JSON.stringify(items));
    }
  }, [items]);

  return { items, setItems };
};
