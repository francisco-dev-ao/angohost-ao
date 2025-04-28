
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      customers: {
        Row: {
          id: string
          user_id: string | null
          name: string
          email: string
          phone: string | null
          nif: string | null
          billing_address: string | null
          city: string | null
          postal_code: string | null
          country: string | null
          account_balance: number | null
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          name: string
          email: string
          phone?: string | null
          nif?: string | null
          billing_address?: string | null
          city?: string | null
          postal_code?: string | null
          country?: string | null
          account_balance?: number | null
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          name?: string
          email?: string
          phone?: string | null
          nif?: string | null
          billing_address?: string | null
          city?: string | null
          postal_code?: string | null
          country?: string | null
          account_balance?: number | null
          created_at?: string | null
        }
      }
      domains: {
        Row: {
          id: string
          name: string
          tld: string
          customer_id: string
          status: string | null
          registration_date: string | null
          expiry_date: string | null
          auto_renew: boolean | null
          created_at: string | null
        }
        Insert: {
          id?: string
          name: string
          tld: string
          customer_id: string
          status?: string | null
          registration_date?: string | null
          expiry_date?: string | null
          auto_renew?: boolean | null
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          tld?: string
          customer_id?: string
          status?: string | null
          registration_date?: string | null
          expiry_date?: string | null
          auto_renew?: boolean | null
          created_at?: string | null
        }
      }
      email_accounts: {
        Row: {
          id: string
          customer_id: string
          domain_id: string
          plan_name: string
          email_address: string
          status: string | null
          created_at: string | null
          expires_at: string | null
        }
        Insert: {
          id?: string
          customer_id: string
          domain_id: string
          plan_name: string
          email_address: string
          status?: string | null
          created_at?: string | null
          expires_at?: string | null
        }
        Update: {
          id?: string
          customer_id?: string
          domain_id?: string
          plan_name?: string
          email_address?: string
          status?: string | null
          created_at?: string | null
          expires_at?: string | null
        }
      }
      hosting_services: {
        Row: {
          id: string
          customer_id: string
          plan_name: string
          plan_type: string | null
          status: string | null
          period: string | null
          auto_renew: boolean | null
          created_at: string | null
          expires_at: string | null
        }
        Insert: {
          id?: string
          customer_id: string
          plan_name: string
          plan_type?: string | null
          status?: string | null
          period?: string | null
          auto_renew?: boolean | null
          created_at?: string | null
          expires_at?: string | null
        }
        Update: {
          id?: string
          customer_id?: string
          plan_name?: string
          plan_type?: string | null
          status?: string | null
          period?: string | null
          auto_renew?: boolean | null
          created_at?: string | null
          expires_at?: string | null
        }
      }
      invoices: {
        Row: {
          id: string
          customer_id: string
          order_id: string | null
          number: string | null
          invoice_number: string | null
          total_amount: number
          status: string | null
          created_at: string | null
          due_date: string | null
          paid_date: string | null
          payment_method: string | null
          notes: string | null
          reference_id: string | null
        }
        Insert: {
          id?: string
          customer_id: string
          order_id?: string | null
          number?: string | null
          invoice_number?: string | null
          total_amount: number
          status?: string | null
          created_at?: string | null
          due_date?: string | null
          paid_date?: string | null
          payment_method?: string | null
          notes?: string | null
          reference_id?: string | null
        }
        Update: {
          id?: string
          customer_id?: string
          order_id?: string | null
          number?: string | null
          invoice_number?: string | null
          total_amount?: number
          status?: string | null
          created_at?: string | null
          due_date?: string | null
          paid_date?: string | null
          payment_method?: string | null
          notes?: string | null
          reference_id?: string | null
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_name: string
          product_type: string
          product_id: string | null
          price: number
          period: string | null
          details: Json | null
          created_at: string | null
        }
        Insert: {
          id?: string
          order_id: string
          product_name: string
          product_type: string
          product_id?: string | null
          price: number
          period?: string | null
          details?: Json | null
          created_at?: string | null
        }
        Update: {
          id?: string
          order_id?: string
          product_name?: string
          product_type?: string
          product_id?: string | null
          price?: number
          period?: string | null
          details?: Json | null
          created_at?: string | null
        }
      }
      orders: {
        Row: {
          id: string
          customer_id: string
          total_amount: number
          status: string | null
          payment_method: string | null
          payment_id: string | null
          reference: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          customer_id: string
          total_amount: number
          status?: string | null
          payment_method?: string | null
          payment_id?: string | null
          reference?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          customer_id?: string
          total_amount?: number
          status?: string | null
          payment_method?: string | null
          payment_id?: string | null
          reference?: string | null
          created_at?: string | null
        }
      }
      profiles: {
        Row: {
          id: string
          is_admin: boolean | null
          created_at: string | null
        }
        Insert: {
          id: string
          is_admin?: boolean | null
          created_at?: string | null
        }
        Update: {
          id?: string
          is_admin?: boolean | null
          created_at?: string | null
        }
      }
      support_tickets: {
        Row: {
          id: string
          customer_id: string
          subject: string
          description: string
          status: string | null
          priority: string | null
          created_at: string | null
          updated_at: string | null
          closed_at: string | null
        }
        Insert: {
          id?: string
          customer_id: string
          subject: string
          description: string
          status?: string | null
          priority?: string | null
          created_at?: string | null
          updated_at?: string | null
          closed_at?: string | null
        }
        Update: {
          id?: string
          customer_id?: string
          subject?: string
          description?: string
          status?: string | null
          priority?: string | null
          created_at?: string | null
          updated_at?: string | null
          closed_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      set_admin_status: {
        Args: {
          user_id: string
          is_admin_status: boolean
        }
        Returns: void
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

