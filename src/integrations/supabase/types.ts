export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      customers: {
        Row: {
          account_balance: number | null
          billing_address: string | null
          city: string | null
          country: string | null
          created_at: string | null
          email: string
          id: string
          name: string
          nif: string | null
          phone: string | null
          postal_code: string | null
          user_id: string | null
        }
        Insert: {
          account_balance?: number | null
          billing_address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          email: string
          id?: string
          name: string
          nif?: string | null
          phone?: string | null
          postal_code?: string | null
          user_id?: string | null
        }
        Update: {
          account_balance?: number | null
          billing_address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          nif?: string | null
          phone?: string | null
          postal_code?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      domains: {
        Row: {
          auto_renew: boolean | null
          created_at: string | null
          customer_id: string | null
          expiry_date: string | null
          id: string
          name: string
          registration_date: string | null
          status: string | null
          tld: string
        }
        Insert: {
          auto_renew?: boolean | null
          created_at?: string | null
          customer_id?: string | null
          expiry_date?: string | null
          id?: string
          name: string
          registration_date?: string | null
          status?: string | null
          tld: string
        }
        Update: {
          auto_renew?: boolean | null
          created_at?: string | null
          customer_id?: string | null
          expiry_date?: string | null
          id?: string
          name?: string
          registration_date?: string | null
          status?: string | null
          tld?: string
        }
        Relationships: [
          {
            foreignKeyName: "domains_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      email_accounts: {
        Row: {
          created_at: string | null
          customer_id: string | null
          domain_id: string | null
          email_address: string
          expires_at: string | null
          id: string
          plan_name: string
          status: string | null
        }
        Insert: {
          created_at?: string | null
          customer_id?: string | null
          domain_id?: string | null
          email_address: string
          expires_at?: string | null
          id?: string
          plan_name: string
          status?: string | null
        }
        Update: {
          created_at?: string | null
          customer_id?: string | null
          domain_id?: string | null
          email_address?: string
          expires_at?: string | null
          id?: string
          plan_name?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_accounts_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_accounts_domain_id_fkey"
            columns: ["domain_id"]
            isOneToOne: false
            referencedRelation: "domains"
            referencedColumns: ["id"]
          },
        ]
      }
      hosting_services: {
        Row: {
          auto_renew: boolean | null
          created_at: string | null
          customer_id: string | null
          expires_at: string | null
          id: string
          period: string | null
          plan_name: string
          plan_type: string | null
          status: string | null
        }
        Insert: {
          auto_renew?: boolean | null
          created_at?: string | null
          customer_id?: string | null
          expires_at?: string | null
          id?: string
          period?: string | null
          plan_name: string
          plan_type?: string | null
          status?: string | null
        }
        Update: {
          auto_renew?: boolean | null
          created_at?: string | null
          customer_id?: string | null
          expires_at?: string | null
          id?: string
          period?: string | null
          plan_name?: string
          plan_type?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "hosting_services_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          created_at: string | null
          customer_id: string | null
          due_date: string | null
          id: string
          invoice_number: string | null
          notes: string | null
          number: string | null
          order_id: string | null
          paid_date: string | null
          payment_method: string | null
          reference_id: string | null
          status: string | null
          total_amount: number
        }
        Insert: {
          created_at?: string | null
          customer_id?: string | null
          due_date?: string | null
          id?: string
          invoice_number?: string | null
          notes?: string | null
          number?: string | null
          order_id?: string | null
          paid_date?: string | null
          payment_method?: string | null
          reference_id?: string | null
          status?: string | null
          total_amount: number
        }
        Update: {
          created_at?: string | null
          customer_id?: string | null
          due_date?: string | null
          id?: string
          invoice_number?: string | null
          notes?: string | null
          number?: string | null
          order_id?: string | null
          paid_date?: string | null
          payment_method?: string | null
          reference_id?: string | null
          status?: string | null
          total_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "invoices_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          created_at: string | null
          details: Json | null
          id: string
          order_id: string | null
          period: string | null
          price: number
          product_id: string | null
          product_name: string
          product_type: string
        }
        Insert: {
          created_at?: string | null
          details?: Json | null
          id?: string
          order_id?: string | null
          period?: string | null
          price: number
          product_id?: string | null
          product_name: string
          product_type: string
        }
        Update: {
          created_at?: string | null
          details?: Json | null
          id?: string
          order_id?: string | null
          period?: string | null
          price?: number
          product_id?: string | null
          product_name?: string
          product_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string | null
          customer_id: string | null
          id: string
          payment_id: string | null
          payment_method: string | null
          reference: string | null
          status: string | null
          total_amount: number
        }
        Insert: {
          created_at?: string | null
          customer_id?: string | null
          id?: string
          payment_id?: string | null
          payment_method?: string | null
          reference?: string | null
          status?: string | null
          total_amount: number
        }
        Update: {
          created_at?: string | null
          customer_id?: string | null
          id?: string
          payment_id?: string | null
          payment_method?: string | null
          reference?: string | null
          status?: string | null
          total_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          id: string
          is_admin: boolean | null
        }
        Insert: {
          created_at?: string | null
          id: string
          is_admin?: boolean | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_admin?: boolean | null
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          closed_at: string | null
          created_at: string | null
          customer_id: string | null
          description: string
          id: string
          priority: string | null
          status: string | null
          subject: string
          updated_at: string | null
        }
        Insert: {
          closed_at?: string | null
          created_at?: string | null
          customer_id?: string | null
          description: string
          id?: string
          priority?: string | null
          status?: string | null
          subject: string
          updated_at?: string | null
        }
        Update: {
          closed_at?: string | null
          created_at?: string | null
          customer_id?: string | null
          description?: string
          id?: string
          priority?: string | null
          status?: string | null
          subject?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "support_tickets_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
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
        Args: { user_id: string; is_admin_status: boolean }
        Returns: undefined
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
