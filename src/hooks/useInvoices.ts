
import { useInvoicesList } from './useInvoicesList';
import { useInvoicePayment } from './useInvoicePayment';

export const useInvoices = () => {
  const {
    invoices,
    loading,
    error,
    filterStatus,
    hasUnpaidInvoices,
    setFilterStatus,
    fetchInvoices
  } = useInvoicesList();

  const {
    selectedInvoice,
    isPaymentDialogOpen,
    isProcessing,
    customerData,
    setCustomerData,
    setIsPaymentDialogOpen,
    handlePayInvoice,
    handlePayWithBalance,
    handlePayWithCreditCard,
  } = useInvoicePayment(fetchInvoices);

  return {
    // List related
    invoices,
    loading,
    error,
    filterStatus,
    hasUnpaidInvoices,
    setFilterStatus,
    fetchInvoices,

    // Payment related
    selectedInvoice,
    isPaymentDialogOpen,
    isProcessing,
    customerData,
    setIsPaymentDialogOpen,
    handlePayInvoice,
    handlePayWithBalance,
    handlePayWithCreditCard
  };
};
