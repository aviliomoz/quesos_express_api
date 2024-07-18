import { z } from "zod";

export const productSchema = z.object({
  id: z.string().uuid().optional(), // uuid para el id, opcional para inserciones
  name: z.string().min(1, "El nombre es obligatorio").optional(), // cadena no vacía para el nombre
  price: z.string().or(z.number()).default("0"), // numérico como cadena o número, por defecto "0"
  cost: z.string().or(z.number()).default("0"), // numérico como cadena o número, por defecto "0"
  stock: z.string().or(z.number()).default("0"), // numérico como cadena o número, por defecto "0"
});
