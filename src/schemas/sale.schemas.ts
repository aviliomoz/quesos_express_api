import { z } from "zod";

export const saleDetailSchema = z.object({
  product_id: z.string().uuid(),
  amount: z.number().min(0, "Número inválido").default(0),
  price: z.number().min(0, "Número inválido").default(0),
  discount: z.number().min(0).max(100).default(0),
  discount_description: z.string().optional(),
});

export const saleSchema = z.object({
  customer_id: z.string().uuid(),
  date: z.date(),
  delivered: z.boolean().default(false),
  paid: z.boolean().default(false),
  user_id: z.string().uuid(),
  status: z.boolean().default(true),
  details: z.array(saleDetailSchema).default([]),
});
