import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  price: z.number().default(0),
  initial_stock: z.number().default(0),
  status: z.string().optional(),
});
