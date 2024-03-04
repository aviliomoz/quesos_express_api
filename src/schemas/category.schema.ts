import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "Invalid category name"),
  type: z.string(),
  restaurant_id: z.string(),
});
