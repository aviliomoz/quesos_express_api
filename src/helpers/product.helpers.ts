import { eq } from "drizzle-orm";
import { db } from "../libs/drizzle";
import { NewProduct, Product, products } from "../models/products";

export const getProductByName = async (name: string) => {
  const res = await db.select().from(products).where(eq(products.name, name));

  return res[0] || undefined;
};

export const getProductById = async (id: string) => {
  const res = await db.select().from(products).where(eq(products.id, id));

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

export const updateProductHelper = async (id: string, product: NewProduct) => {
  const res = await db
    .update(products)
    .set(product)
    .where(eq(products.id, id))
    .returning();

  return res[0];
};

export const toggleProductHelper = async (id: string) => {
  const res = await db
    .update(products)
    .set({ status: !products.status })
    .where(eq(products.id, id))
    .returning();

  return res[0];
};
