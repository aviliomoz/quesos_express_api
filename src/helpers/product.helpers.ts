import { eq } from "drizzle-orm";
import { db } from "../libs/drizzle";
import { NewProduct, products } from "../models/products";

export const getProductByName = async (name: string) => {
  const res = await db.select().from(products).where(eq(products.name, name));

  return res[0] || undefined;
};

export const getProductsHelper = async () => {
  const res = await db.select().from(products);

  return res;
};

export const createProductHelper = async (product: NewProduct) => {
  const res = await db.insert(products).values(product).returning();

  return res[0] || undefined;
};
