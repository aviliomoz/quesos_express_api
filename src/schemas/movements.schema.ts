import { z } from "zod";

export const movementDetailSchema = z.object({
  productId: z.string().uuid(),
  amount: z.number().min(0, "Número inválido").default(0),
});

export const movementSchema = z.object({
  type: z.enum(["entry", "output"]),
  date: z.string(),
  description: z.string().optional(),
  userId: z.string().uuid(),
  status: z.enum(["active", "inactive"]).default("active"),
});
