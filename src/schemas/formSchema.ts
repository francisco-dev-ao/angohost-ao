
import { z } from "zod";

export const formSchema = z.object({
  ownerName: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  ownerNif: z.string().min(8, "NIF/BI deve ter pelo menos 8 caracteres"),
  ownerContact: z.string().min(9, "Contato deve ter pelo menos 9 caracteres"),
  ownerEmail: z.string().email("Email inválido"),
  organizationName: z.string().optional(),
});

// Adding checkout form schema for BillingForm component
export const checkoutFormSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(9, "Contato deve ter pelo menos 9 caracteres"),
  nif: z.string().min(8, "NIF/BI deve ter pelo menos 8 caracteres"),
  billingAddress: z.string().min(5, "Endereço deve ter pelo menos 5 caracteres"),
  city: z.string().min(2, "Cidade deve ter pelo menos 2 caracteres"),
  paymentMethod: z.enum(["emis", "bank-transfer", "credit-card"]),
});

// Export the type inference
export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;
