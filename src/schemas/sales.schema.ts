import { z } from "zod";

export const saleDetailSchema = z.object({
  productId: z.string().uuid(),
  amount: z.number().min(0, "Número inválido").default(0),
  price: z.number().min(0, "Precio inválido").default(0),
  discount: z.number().min(0, "Descuento inválido").default(0),
});

export const saleSchema = z.object({
  customerId: z.string().uuid(),
  date: z.string(),
  delivered: z.boolean().default(false),
  paid: z.boolean().default(false),
  status: z.enum(["pending", "deleted", "completed"]).default("pending"),
});
