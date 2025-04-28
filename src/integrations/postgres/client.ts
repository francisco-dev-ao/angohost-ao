
import { supabase } from '@/integrations/supabase/client';
import { 
  Customer, 
  Domain, 
  EmailAccount, 
  HostingService, 
  Invoice, 
  Order, 
  OrderItem, 
  SupportTicket 
} from '@/types/supabase';

interface DbOperationResult<T> {
  data: T | null;
  success: boolean;
  error?: Error;
}

// Serviço para cliente
const customerService = {
  async getById(id: string): Promise<DbOperationResult<Customer>> {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      return { data, success: true };
    } catch (error: any) {
      console.error('Erro ao buscar cliente:', error);
      return { data: null, success: false, error };
    }
  },

  async getByUserId(userId: string): Promise<DbOperationResult<Customer>> {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      
      return { data, success: true };
    } catch (error: any) {
      console.error('Erro ao buscar cliente por user_id:', error);
      return { data: null, success: false, error };
    }
  },

  async create(customer: any): Promise<DbOperationResult<Customer>> {
    try {
      const { data, error } = await supabase
        .from('customers')
        .insert([customer])
        .select()
        .single();

      if (error) throw error;
      
      return { data, success: true };
    } catch (error: any) {
      console.error('Erro ao criar cliente:', error);
      return { data: null, success: false, error };
    }
  },

  async update(id: string, customer: any): Promise<DbOperationResult<Customer>> {
    try {
      const { data, error } = await supabase
        .from('customers')
        .update(customer)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      return { data, success: true };
    } catch (error: any) {
      console.error('Erro ao atualizar cliente:', error);
      return { data: null, success: false, error };
    }
  },

  async delete(id: string): Promise<DbOperationResult<boolean>> {
    try {
      const { error } = await supabase
        .from('customers')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      return { data: true, success: true };
    } catch (error: any) {
      console.error('Erro ao excluir cliente:', error);
      return { data: false, success: false, error };
    }
  }
};

// Serviço para fatura
const invoiceService = {
  async getById(id: string): Promise<DbOperationResult<Invoice>> {
    try {
      const { data, error } = await supabase
        .from('invoices')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      return { data, success: true };
    } catch (error: any) {
      console.error('Erro ao buscar fatura:', error);
      return { data: null, success: false, error };
    }
  },

  async getByUserId(userId: string): Promise<DbOperationResult<Invoice[]>> {
    try {
      const { data, error } = await supabase
        .from('invoices')
        .select('*')
        .eq('customer_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      return { data: data || [], success: true };
    } catch (error: any) {
      console.error('Erro ao buscar faturas do usuário:', error);
      return { data: [], success: false, error };
    }
  },

  async create(invoice: any): Promise<DbOperationResult<Invoice>> {
    try {
      const { data, error } = await supabase
        .from('invoices')
        .insert([invoice])
        .select()
        .single();

      if (error) throw error;
      
      return { data, success: true };
    } catch (error: any) {
      console.error('Erro ao criar fatura:', error);
      return { data: null, success: false, error };
    }
  },

  async update(id: string, invoice: any): Promise<DbOperationResult<Invoice>> {
    try {
      const { data, error } = await supabase
        .from('invoices')
        .update(invoice)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      return { data, success: true };
    } catch (error: any) {
      console.error('Erro ao atualizar fatura:', error);
      return { data: null, success: false, error };
    }
  },

  async updateStatus(id: string, status: string, paidDate?: string): Promise<DbOperationResult<Invoice>> {
    try {
      const updateData: any = { status };
      if (paidDate) updateData.paid_date = paidDate;

      const { data, error } = await supabase
        .from('invoices')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      return { data, success: true };
    } catch (error: any) {
      console.error('Erro ao atualizar status da fatura:', error);
      return { data: null, success: false, error };
    }
  },

  async getUnpaid(): Promise<DbOperationResult<Invoice[]>> {
    try {
      const { data, error } = await supabase
        .from('invoices')
        .select('*')
        .eq('status', 'unpaid')
        .order('due_date', { ascending: true });

      if (error) throw error;
      
      return { data: data || [], success: true };
    } catch (error: any) {
      console.error('Erro ao buscar faturas não pagas:', error);
      return { data: [], success: false, error };
    }
  },

  async delete(id: string): Promise<DbOperationResult<boolean>> {
    try {
      const { error } = await supabase
        .from('invoices')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      return { data: true, success: true };
    } catch (error: any) {
      console.error('Erro ao excluir fatura:', error);
      return { data: false, success: false, error };
    }
  }
};

// Serviço para transações
const transactionService = {
  async create(transaction: any): Promise<DbOperationResult<any>> {
    try {
      const { data, error } = await supabase
        .from('account_transactions')
        .insert([transaction])
        .select()
        .single();

      if (error) throw error;
      
      return { data, success: true };
    } catch (error: any) {
      console.error('Erro ao criar transação:', error);
      return { data: null, success: false, error };
    }
  }
};

// Serviço para pedidos
const orderService = {
  async createItems(items: any[]): Promise<DbOperationResult<OrderItem[]>> {
    try {
      const { data, error } = await supabase
        .from('order_items')
        .insert(items)
        .select();

      if (error) throw error;
      
      return { data: data || [], success: true };
    } catch (error: any) {
      console.error('Erro ao criar itens do pedido:', error);
      return { data: [], success: false, error };
    }
  },

  async getById(id: string): Promise<DbOperationResult<Order>> {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      return { data, success: true };
    } catch (error: any) {
      console.error('Erro ao buscar pedido:', error);
      return { data: null, success: false, error };
    }
  },

  async getByUserId(userId: string): Promise<DbOperationResult<Order[]>> {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('customer_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      return { data: data || [], success: true };
    } catch (error: any) {
      console.error('Erro ao buscar pedidos do usuário:', error);
      return { data: [], success: false, error };
    }
  },

  async create(order: any): Promise<DbOperationResult<Order>> {
    try {
      const { data, error } = await supabase
        .from('orders')
        .insert([order])
        .select()
        .single();

      if (error) throw error;
      
      return { data, success: true };
    } catch (error: any) {
      console.error('Erro ao criar pedido:', error);
      return { data: null, success: false, error };
    }
  },

  async update(id: string, order: any): Promise<DbOperationResult<Order>> {
    try {
      const { data, error } = await supabase
        .from('orders')
        .update(order)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      return { data, success: true };
    } catch (error: any) {
      console.error('Erro ao atualizar pedido:', error);
      return { data: null, success: false, error };
    }
  },

  async updateStatus(id: string, status: string): Promise<DbOperationResult<Order>> {
    try {
      const { data, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      return { data, success: true };
    } catch (error: any) {
      console.error('Erro ao atualizar status do pedido:', error);
      return { data: null, success: false, error };
    }
  },

  async delete(id: string): Promise<DbOperationResult<boolean>> {
    try {
      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      return { data: true, success: true };
    } catch (error: any) {
      console.error('Erro ao excluir pedido:', error);
      return { data: false, success: false, error };
    }
  }
};

// Exportar todos os serviços
export {
  customerService,
  invoiceService,
  transactionService,
  orderService
};
