
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://jyqekseqbbpgupuotuin.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5cWVrc2VxYmJwZ3VwdW90dWluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4NDI0NTksImV4cCI6MjA2MTQxODQ1OX0.NTaNilqKyq2xjNXh0P6VdMJgGfvwtWzP0CgQEE1moYY";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

interface AuthError {
  message: string;
  status?: number;
}

interface AuthResponse<T = any> {
  data: T | null;
  error: AuthError | null;
}

class AuthService {
  /**
   * Login com email e senha
   */
  async loginWithEmail(email: string, password: string): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        return {
          data: null,
          error: {
            message: error.message,
            status: error.status
          }
        };
      }

      return {
        data,
        error: null
      };
    } catch (err: any) {
      return {
        data: null,
        error: {
          message: err.message || 'Erro ao realizar login'
        }
      };
    }
  }

  /**
   * Registro de novo usuário
   */
  async register(email: string, password: string, userData?: any): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      });

      if (error) {
        return {
          data: null,
          error: {
            message: error.message,
            status: error.status
          }
        };
      }

      return {
        data,
        error: null
      };
    } catch (err: any) {
      return {
        data: null,
        error: {
          message: err.message || 'Erro ao registrar usuário'
        }
      };
    }
  }

  /**
   * Logout do usuário atual
   */
  async logout(): Promise<AuthResponse> {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        return {
          data: null,
          error: {
            message: error.message,
            status: error.status
          }
        };
      }

      return {
        data: { success: true },
        error: null
      };
    } catch (err: any) {
      return {
        data: null,
        error: {
          message: err.message || 'Erro ao realizar logout'
        }
      };
    }
  }

  /**
   * Obter o usuário atual
   */
  async getCurrentUser(): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        return {
          data: null,
          error: {
            message: error.message,
            status: error.status
          }
        };
      }

      return {
        data: data.user,
        error: null
      };
    } catch (err: any) {
      return {
        data: null,
        error: {
          message: err.message || 'Erro ao obter usuário atual'
        }
      };
    }
  }

  /**
   * Atualizar dados do usuário
   */
  async updateUserData(userData: any): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: userData
      });

      if (error) {
        return {
          data: null,
          error: {
            message: error.message,
            status: error.status
          }
        };
      }

      return {
        data: data.user,
        error: null
      };
    } catch (err: any) {
      return {
        data: null,
        error: {
          message: err.message || 'Erro ao atualizar dados do usuário'
        }
      };
    }
  }

  /**
   * Resetar senha
   */
  async resetPassword(email: string): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email);

      if (error) {
        return {
          data: null,
          error: {
            message: error.message,
            status: error.status
          }
        };
      }

      return {
        data,
        error: null
      };
    } catch (err: any) {
      return {
        data: null,
        error: {
          message: err.message || 'Erro ao enviar email de recuperação de senha'
        }
      };
    }
  }
}

export default new AuthService();
