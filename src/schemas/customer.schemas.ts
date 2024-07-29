import { z } from "zod";

export const customerSchema = z.object({
  dni: z.string().min(9, "Ingresa un DNI válido"),
  name: z.string().min(1, "Ingresa un nombre válido"),
  phone: z.string().optional(),
  address: z.string().optional(),
  status: z.string().optional(),
});
