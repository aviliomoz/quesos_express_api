import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().trim().min(1, "Name field must be provided"),
  email: z.string().trim().min(1, "Email field must be provided"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const loginSchema = z.object({
  email: z.string().trim().min(1, "Email field must be provided"),
  password: z.string().min(1, "Password field must be provided"),
});
