import { count, eq, ilike } from "drizzle-orm";
import { db } from "../libs/drizzle";
import { NewProduct, products } from "../models/products";

export const getProductByNameHelper = async (name: string) => {
  const result = await db
    .select()
    .from(products)
    .where(eq(products.name, name));

  return result[0];
};

export const getProductByIdHelper = async (id: string) => {
  const result = await db.select().from(products).where(eq(products.id, id));

  return result[0];
};

export const getProductsCountHelper = async (filter: { search: string }) => {
  const result = await db
    .select({ count: count() })
    .from(products)
    .where(ilike(products.name, `%${filter.search}%`));

  return result[0].count;
};

export const getProductsHelper = async (filter: {
  search: string;
  limit: number;
  offset: number;
}) => {
  const result = await db
    .select()
    .from(products)
    .limit(filter.limit)
    .offset(filter.offset)
    .where(ilike(products.name, `%${filter.search}%`))
    .orderBy(products.name);

  return result;
};

export const createProductHelper = async (product: NewProduct) => {
  const result = await db.insert(products).values(product).returning();

  return result[0];
};

export const updateProductHelper = async (id: string, product: NewProduct) => {
  const result = await db
    .update(products)
    .set(product)
    .where(eq(products.id, id))
    .returning();

  return result[0];
};
