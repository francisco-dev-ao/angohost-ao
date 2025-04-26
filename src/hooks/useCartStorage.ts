
import { useCartItemsStorage } from './useCartItemsStorage';
import { useCustomerStorage } from './useCustomerStorage';
import { usePaymentStorage } from './usePaymentStorage';
import { useContactProfilesStorage } from './useContactProfilesStorage';

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
