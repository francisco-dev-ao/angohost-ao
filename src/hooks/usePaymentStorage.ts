
import { useState, useEffect } from 'react';
import { PaymentInfo } from '../types/cart';

export const usePaymentStorage = () => {
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
  
  useEffect(() => {
    const savedPayment = localStorage.getItem('angohost_payment');
    if (savedPayment) {
      try {
        setPaymentInfo(JSON.parse(savedPayment));
      } catch (err) {
        console.error('Failed to parse payment from localStorage', err);
      }
    }
  }, []);

  useEffect(() => {
    if (paymentInfo) {
      localStorage.setItem('angohost_payment', JSON.stringify(paymentInfo));
    }
  }, [paymentInfo]);

  return { paymentInfo, setPaymentInfo };
};
