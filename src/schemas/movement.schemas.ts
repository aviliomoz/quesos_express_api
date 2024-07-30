import { z } from "zod";

export const movementDetailSchema = z.object({
  product_id: z.string().uuid(),
  amount: z.number().min(0, "Número inválido").default(0),
});

export const movementSchema = z.object({
  type: z.enum(["entry", "output"]),
  date: z.date(),
  description: z.string().min(1, "Descripción requerida"),
  user_id: z.string().uuid(),
  status: z.string().default("active"),
  details: z.array(movementDetailSchema).default([]),
});
