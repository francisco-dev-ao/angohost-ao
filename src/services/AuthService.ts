
import { customerService } from '@/integrations/postgres/client';

// Tipos para autenticação
export type AuthUser = {
  id: string;
  email: string;
  name: string;
};

export type Session = {
  user: AuthUser;
  token: string;
  expires: Date;
};

// Serviço de autenticação simulando integração com seu banco
export const AuthService = {
  // Login do usuário
  login: async (email: string, password: string): Promise<{ user: AuthUser | null; error: string | null }> => {
    try {
      // Simular validação de senha (em produção isso seria feito no servidor)
      if (!email || !password) {
        return { user: null, error: 'Email e senha são obrigatórios' };
      }
      
      // Verificar se o cliente existe com esse email
      const { success, data: customer, error } = await customerService.getByEmail(email);
      
      if (!success || !customer) {
        return { user: null, error: 'Usuário não encontrado' };
      }
      
      // Simular autenticação bem sucedida
      // Em produção, a verificação de senha seria feita no backend
      const user: AuthUser = {
        id: customer.id,
        email: customer.email,
        name: customer.name
      };
      
      // Salvar sessão no localStorage
      localStorage.setItem('auth_user', JSON.stringify(user));
      localStorage.setItem('auth_token', `simulated_token_${Date.now()}`);
      localStorage.setItem('auth_expires', new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString());
      
      return { user, error: null };
    } catch (err: any) {
      console.error('Erro na autenticação:', err);
      return { user: null, error: err.message || 'Erro ao autenticar usuário' };
    }
  },
  
  // Registro de novo usuário
  register: async (name: string, email: string, password: string): Promise<{ user: AuthUser | null; error: string | null }> => {
    try {
      // Verificar se já existe um usuário com esse email
      const { success, data: existingCustomer } = await customerService.getByEmail(email);
      
      if (success && existingCustomer) {
        return { user: null, error: 'Email já está em uso' };
      }
      
      // Criar um novo cliente
      const { success: createSuccess, data: newCustomer, error: createError } = await customerService.create({
        name,
        email,
        account_balance: 0
      });
      
      if (!createSuccess || !newCustomer) {
        return { user: null, error: createError?.message || 'Erro ao criar usuário' };
      }
      
      // Criar usuário autenticado
      const user: AuthUser = {
        id: newCustomer.id,
        email: newCustomer.email,
        name: newCustomer.name
      };
      
      // Salvar sessão no localStorage
      localStorage.setItem('auth_user', JSON.stringify(user));
      localStorage.setItem('auth_token', `simulated_token_${Date.now()}`);
      localStorage.setItem('auth_expires', new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString());
      
      return { user, error: null };
    } catch (err: any) {
      console.error('Erro no registro:', err);
      return { user: null, error: err.message || 'Erro ao registrar usuário' };
    }
  },
  
  // Logout
  logout: () => {
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_expires');
  },
  
  // Verificar se o usuário está autenticado
  getSession: (): Session | null => {
    const userStr = localStorage.getItem('auth_user');
    const token = localStorage.getItem('auth_token');
    const expiresStr = localStorage.getItem('auth_expires');
    
    if (!userStr || !token || !expiresStr) {
      return null;
    }
    
    try {
      const user = JSON.parse(userStr);
      const expires = new Date(expiresStr);
      
      // Verificar se a sessão expirou
      if (expires < new Date()) {
        AuthService.logout();
        return null;
      }
      
      return {
        user,
        token,
        expires
      };
    } catch (err) {
      console.error('Erro ao recuperar sessão:', err);
      return null;
    }
  },
  
  // Verificar se o usuário está autenticado
  isAuthenticated: (): boolean => {
    return !!AuthService.getSession();
  },
  
  // Atualizar dados do usuário
  updateUser: async (userId: string, data: Partial<AuthUser>): Promise<{ success: boolean; error: string | null }> => {
    try {
      const { success } = await customerService.update(userId, data);
      
      if (!success) {
        return { success: false, error: 'Erro ao atualizar usuário' };
      }
      
      // Atualizar dados no localStorage se necessário
      const session = AuthService.getSession();
      if (session) {
        const updatedUser = {
          ...session.user,
          ...data
        };
        localStorage.setItem('auth_user', JSON.stringify(updatedUser));
      }
      
      return { success: true, error: null };
    } catch (err: any) {
      console.error('Erro ao atualizar usuário:', err);
      return { success: false, error: err.message || 'Erro ao atualizar usuário' };
    }
  }
};

export default AuthService;
