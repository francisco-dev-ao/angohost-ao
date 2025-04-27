
import { useState, useEffect } from 'react';
import { CartItem } from '../types/cart';

export const useCartItemsStorage = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  
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

  useEffect(() => {
    localStorage.setItem('angohost_cart', JSON.stringify(items));
  }, [items]);

  return { items, setItems };
};
