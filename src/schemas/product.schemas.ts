import { z } from "zod";

export const productSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, "El nombre es obligatorio"),
  price: z.number().default(0),
  cost: z.number().default(0),
  stock: z.number().default(0),
});
