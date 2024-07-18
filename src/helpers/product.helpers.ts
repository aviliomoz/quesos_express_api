import { count, eq, ilike } from "drizzle-orm";
import { db } from "../libs/drizzle";
import { NewProduct, products } from "../models/products";

export const getProductByNameHelper = async (name: string) => {
  const res = await db.select().from(products).where(eq(products.name, name));

  return res[0];
};

export const getProductByIdHelper = async (id: string) => {
  const res = await db.select().from(products).where(eq(products.id, id));

  return res[0];
};

export const getProductsCountHelper = async (filter: { search: string }) => {
  const res = await db
    .select({ count: count() })
    .from(products)
    .where(ilike(products.name, `%${filter.search}%`));

  return res[0].count;
};

export const getProductsHelper = async (filter: {
  search: string;
  limit: number;
  offset: number;
}) => {
  const res = await db
    .select()
    .from(products)
    .limit(filter.limit)
    .offset(filter.offset)
    .where(ilike(products.name, `%${filter.search}%`))
    .orderBy(products.name);

  return res;
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
