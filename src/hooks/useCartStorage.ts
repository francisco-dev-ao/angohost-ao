
import { useState, useEffect } from 'react';
import { CartItem, Customer, PaymentInfo, ContactProfile } from '../types/cart';

export const useCartStorage = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
  const [contactProfiles, setContactProfiles] = useState<ContactProfile[]>([]);
  const [selectedContactProfileId, setSelectedContactProfileId] = useState<string | null>(null);

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

  useEffect(() => {
    localStorage.setItem('angohost_cart', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (customer) {
      localStorage.setItem('angohost_customer', JSON.stringify(customer));
    }
  }, [customer]);

  useEffect(() => {
    if (paymentInfo) {
      localStorage.setItem('angohost_payment', JSON.stringify(paymentInfo));
    }
  }, [paymentInfo]);

  useEffect(() => {
    localStorage.setItem('angohost_contact_profiles', JSON.stringify(contactProfiles));
  }, [contactProfiles]);

  useEffect(() => {
    localStorage.setItem('angohost_selected_profile', JSON.stringify(selectedContactProfileId));
  }, [selectedContactProfileId]);

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
  };
};
