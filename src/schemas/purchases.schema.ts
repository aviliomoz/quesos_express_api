import { z } from "zod";

export const purchaseDetailSchema = z.object({
  productId: z.string().uuid(),
  amount: z.number().min(0, "Número inválido").default(0),
  price: z.number().min(0, "Precio inválido").default(0),
  discount: z.number().min(0, "Descuento inválido").default(0),
});

export const purchaseSchema = z.object({
  date: z.string(),
  supplierId: z.string().uuid(),
  status: z.enum(["active", "inactive"]).default("active"),
});
