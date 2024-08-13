import { z } from "zod";

export const movementSchema = z.object({
  type: z.enum(["entry", "output"]),
  date: z.string(),
  description: z.string().optional(),
  status: z.enum(["active", "inactive"]).default("active"),
  productId: z.string().uuid(),
  amount: z.number().min(0, "Número inválido").default(0),
});
