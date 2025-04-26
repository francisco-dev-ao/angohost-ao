
import { z } from "zod";

export const formSchema = z.object({
  ownerName: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  ownerNif: z.string().min(8, "NIF/BI deve ter pelo menos 8 caracteres"),
  ownerContact: z.string().min(9, "Contato deve ter pelo menos 9 caracteres"),
  ownerEmail: z.string().email("Email inválido"),
  organizationName: z.string().optional(),
});
