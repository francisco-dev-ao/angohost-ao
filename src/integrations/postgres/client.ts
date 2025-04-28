
// Este arquivo foi mantido apenas para referência.
// O projeto agora usa Supabase como banco de dados.
// Para usar o Supabase, conecte seu projeto Lovable ao Supabase clicando no botão verde no canto superior direito.

import { 
  Customer, 
  ContactProfile, 
  AccountTransaction, 
  Domain, 
  Order, 
  OrderItem, 
  Invoice,
  SupportTicket,
  TicketMessage,
  HostingService,
  EmailAccount,
  Notification
} from '@/types/database-types';

// Configuração removida - Usando Supabase agora
export const pgConfig = {
  host: '',
  port: 5432,
  database: '',
  user: '',
  password: ''
};

// Interface para resultados de operações no banco de dados
interface DbOperationResult<T> {
  success: boolean;
  data?: T;
  error?: any;
}

// Função para simular consultas ao banco de dados
export const simulateDbOperation = async <T>(operation: string, data: any): Promise<DbOperationResult<T>> => {
  console.log(`Operação simulada (use Supabase): ${operation}`, data);
  
  return { 
    success: false, 
    error: 'Banco de dados PostgreSQL desativado. Conecte ao Supabase.' 
  };
};

// Funções de serviço simuladas para evitar erros durante a transição
const createSimulatedService = <T>(name: string) => {
  return {
    getById: async () => simulateDbOperation<T>(`${name}_get_by_id`, {}),
    getByUserId: async () => simulateDbOperation<T>(`${name}_get_by_user_id`, {}),
    getByEmail: async () => simulateDbOperation<T>(`${name}_get_by_email`, {}),
    getByCustomerId: async () => simulateDbOperation<T[]>(`${name}_get_by_customer_id`, {}),
    create: async () => simulateDbOperation<T>(`${name}_create`, {}),
    update: async () => simulateDbOperation<T>(`${name}_update`, {}),
    delete: async () => simulateDbOperation<{ success: boolean }>(`${name}_delete`, {})
  };
};

// Serviços simulados
export const customerService = createSimulatedService<Customer>('customer');
export const contactProfileService = createSimulatedService<ContactProfile>('contact_profile');
export const transactionService = createSimulatedService<AccountTransaction>('transaction');
export const orderService = {
  ...createSimulatedService<Order>('order'),
  createItems: async () => simulateDbOperation<OrderItem[]>('create_order_items', {})
};
export const invoiceService = createSimulatedService<Invoice>('invoice');
export const domainService = createSimulatedService<Domain>('domain');
export const emailService = createSimulatedService<EmailAccount>('email');
export const hostingService = createSimulatedService<HostingService>('hosting');
export const ticketService = {
  ...createSimulatedService<SupportTicket>('ticket'),
  addMessage: async () => simulateDbOperation<TicketMessage>('add_ticket_message', {}),
  getMessages: async () => simulateDbOperation<TicketMessage[]>('get_ticket_messages', {})
};
export const notificationService = createSimulatedService<Notification>('notification');

console.warn(
  'AVISO: As conexões PostgreSQL diretas foram desativadas. ' +
  'Conecte seu projeto ao Supabase clicando no botão verde no canto superior direito da interface do Lovable.'
);
