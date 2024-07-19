import { z } from "zod";

export const supplierSchema = z.object({
  ruc: z.string().min(11, "Ingresa un RUC válido"),
  name: z.string().min(1, "Ingresa un nombre válido"),
  phone: z.string().optional(),
  status: z.boolean().optional(),
});
