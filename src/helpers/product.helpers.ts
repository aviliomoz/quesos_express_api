import { count, eq, ilike } from "drizzle-orm";
import { db } from "../libs/drizzle";
import { NewProduct, products } from "../models/products";

export const getProductByName = async (name: string) => {
  const res = await db.select().from(products).where(eq(products.name, name));

  return res[0];
};

export const getProductById = async (id: string) => {
  const res = await db.select().from(products).where(eq(products.id, id));

  return res[0];
};

export const getProductsHelper = async (
  search: string,
  limit: number,
  offset: number
) => {
  const [res, [{ c }]] = await Promise.all([
    db
      .select()
      .from(products)
      .limit(limit)
      .offset(offset)
      .where(ilike(products.name, `%${search}%`))
      .orderBy(products.name),
    db
      .select({ c: count() })
      .from(products)
      .where(ilike(products.name, `%${search}%`)),
  ]);

  return { products: res, count: c };
};

export const createProductHelper = async (product: NewProduct) => {
  const res = await db.insert(products).values(product).returning();

  return res[0];
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
