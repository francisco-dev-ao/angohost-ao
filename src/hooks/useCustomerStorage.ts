
import { useState, useEffect } from 'react';
import { Customer } from '../types/cart';

export const useCustomerStorage = () => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  
  useEffect(() => {
    const savedCustomer = localStorage.getItem('angohost_customer');
    if (savedCustomer) {
      try {
        setCustomer(JSON.parse(savedCustomer));
      } catch (err) {
        console.error('Failed to parse customer from localStorage', err);
      }
    }
  }, []);

  useEffect(() => {
    if (customer) {
      localStorage.setItem('angohost_customer', JSON.stringify(customer));
    }
  }, [customer]);

  return { customer, setCustomer };
};
