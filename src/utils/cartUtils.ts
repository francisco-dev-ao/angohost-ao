
import { CartItem, Customer, PaymentInfo, ContactProfile } from '../types/cart';

export const calculateTotalPrice = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.price, 0);
};

export const calculateRenewalTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => {
    const renewalPrice = item.details.renewalPrice || item.price;
    return total + renewalPrice;
  }, 0);
};

export const checkDomainInCart = (items: CartItem[]): boolean => {
  return items.some(item => item.type === 'domain');
};

export const checkEmailInCart = (items: CartItem[]): boolean => {
  return items.some(item => item.type === 'email');
};

export const getDomainNamesFromCart = (items: CartItem[]): string[] => {
  return items
    .filter(item => item.type === 'domain' && item.details.domainName)
    .map(item => item.details.domainName as string);
};

export const generateOrderRef = (): string => {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `AH${year}${month}${day}${random}`;
};
