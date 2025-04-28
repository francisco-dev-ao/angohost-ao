
import { useState } from 'react';
import { Invoice } from '@/types/supabase';
import { toast } from 'sonner';

interface CustomerData {
  id: string;
  account_balance: number;
}

interface DbOperationResult<T> {
  data: T | null;
  success: boolean;
  error?: Error;
}

// Interfaces para os serviços que precisamos usar
interface InvoiceService {
  getById: (id: string) => Promise<DbOperationResult<Invoice>>;
  getByUserId: (userId: string) => Promise<DbOperationResult<Invoice[]>>;
  create: (invoice: any) => Promise<DbOperationResult<Invoice>>;
  update: (id: string, data: any) => Promise<DbOperationResult<Invoice>>;
  updateStatus: (id: string, status: string, paidDate?: string) => Promise<DbOperationResult<Invoice>>;
  getUnpaid: () => Promise<DbOperationResult<Invoice[]>>;
  delete: (id: string) => Promise<DbOperationResult<boolean>>;
}

interface TransactionService {
  create: (transaction: any) => Promise<DbOperationResult<any>>;
}

interface CustomerService {
  getById: (id: string) => Promise<DbOperationResult<CustomerData>>;
  update: (id: string, data: any) => Promise<DbOperationResult<any>>;
}

interface OrderService {
  updateStatus: (id: string, status: string) => Promise<DbOperationResult<any>>;
}

// Simulação de serviços que serão injetados
const invoiceService: InvoiceService = {
  getById: () => Promise.resolve({ data: null, success: false }),
  getByUserId: () => Promise.resolve({ data: [], success: true }),
  create: () => Promise.resolve({ data: null, success: false }),
  update: () => Promise.resolve({ data: null, success: false }),
  updateStatus: () => Promise.resolve({ data: null, success: false }),
  getUnpaid: () => Promise.resolve({ data: [], success: true }),
  delete: () => Promise.resolve({ data: true, success: true })
};

const transactionService: TransactionService = {
  create: () => Promise.resolve({ data: null, success: false })
};

const customerService: CustomerService = {
  getById: () => Promise.resolve({ data: null, success: false }),
  update: () => Promise.resolve({ data: null, success: false })
};

const orderService: OrderService = {
  updateStatus: () => Promise.resolve({ data: null, success: false })
};

export const useInvoicePayment = (onSuccess?: () => void) => {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [customerData, setCustomerData] = useState<CustomerData | null>(null);

  const handlePayInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsPaymentDialogOpen(true);
    
    // Carregar os dados do cliente quando uma fatura for selecionada
    loadCustomerData(invoice.customer_id);
  };
  
  const loadCustomerData = async (customerId: string) => {
    try {
      const { data: customer, success } = await customerService.getById(customerId);
      
      if (success && customer) {
        setCustomerData({
          id: customer.id,
          account_balance: customer.account_balance || 0
        });
      } else {
        toast.error('Não foi possível carregar os dados do cliente');
      }
    } catch (err) {
      console.error('Erro ao carregar dados do cliente:', err);
    }
  };

  const handlePayWithBalance = async () => {
    if (!selectedInvoice || !customerData) return;
    
    try {
      setIsProcessing(true);
      
      if (customerData.account_balance < (selectedInvoice.total_amount || 0)) {
        toast.error('Saldo insuficiente para pagar esta fatura');
        return;
      }
      
      const newBalance = customerData.account_balance - (selectedInvoice.total_amount || 0);
      
      // Atualizar saldo do cliente
      const { success: updateBalanceSuccess } = await customerService.update(customerData.id, { 
        account_balance: newBalance 
      });
      
      if (!updateBalanceSuccess) {
        throw new Error('Falha ao atualizar saldo');
      }
      
      // Atualizar status da fatura
      const { success: updateInvoiceSuccess } = await invoiceService.updateStatus(
        selectedInvoice.id, 
        'paid',
        new Date().toISOString()
      );
      
      if (!updateInvoiceSuccess) {
        throw new Error('Falha ao atualizar fatura');
      }
      
      // Registrar a transação
      await transactionService.create({
        customer_id: customerData.id,
        amount: selectedInvoice.total_amount,
        previous_balance: customerData.account_balance,
        current_balance: newBalance,
        transaction_type: 'payment',
        description: `Pagamento da fatura #${selectedInvoice.number}`,
        reference_id: selectedInvoice.reference_id
      });
      
      // Atualizar o pedido relacionado, se existir
      if (selectedInvoice.reference_id) {
        await orderService.updateStatus(selectedInvoice.reference_id, 'paid');
      }
      
      toast.success('Pagamento realizado com sucesso!');
      setIsPaymentDialogOpen(false);
      
      if (onSuccess) {
        onSuccess();
      }
      
      setCustomerData({
        ...customerData,
        account_balance: newBalance
      });
      
    } catch (err: any) {
      console.error('Erro ao processar pagamento:', err);
      toast.error('Não foi possível processar o pagamento. Tente novamente mais tarde.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePayWithCreditCard = () => {
    toast.info('Redirecionando para o processador de pagamentos...');
    setIsPaymentDialogOpen(false);
  };

  return {
    selectedInvoice,
    isPaymentDialogOpen,
    isProcessing,
    customerData,
    setCustomerData,
    setIsPaymentDialogOpen,
    handlePayInvoice,
    handlePayWithBalance,
    handlePayWithCreditCard,
  };
};
