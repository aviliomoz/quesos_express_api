import { z } from "zod";

export const createRestaurantSchema = z.object({
  name: z.string().min(1, "Name field must be provided"),
  currency_code: z.string().length(3),
  purchase_tax: z.number().min(0, "Invalid number").max(100, "Invalid number"),
  sales_tax: z.number().min(0, "Invalid number").max(100, "Invalid number"),
});

export const updateRestaurantSchema = z.object({
  name: z.string().min(1, "Name field must be provided").optional(),
  currency_code: z.string().length(3).optional(),
  purchase_tax: z.number().min(0, "Invalid number").max(100, "Invalid number").optional(),
  sales_tax: z.number().min(0, "Invalid number").max(100, "Invalid number").optional(),
  status: z.boolean().optional()
});
