import { and, count, eq, ilike } from "drizzle-orm";
import { db } from "../libs/drizzle";
import { NewProduct, products } from "../models/products";
import { Status } from "../types";

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

export const getProductsCountHelper = async (filter?: {
  status?: Status;
  search?: string;
}) => {
  let query = db.select({ count: count() }).from(products).$dynamic();

  if (filter) {
    if (filter.status) {
      query = query.where(eq(products.status, filter.status));
    }

    if (filter.search) {
      query = query.where(ilike(products.name, `%${filter.search}%`));
    }
  }

  const result = await query.execute();

  return result[0].count;
};

export const getProductsHelper = async (filter?: {
  status?: Status;
  search?: string;
  limit?: number;
  offset?: number;
}) => {
  let query = db.select().from(products).$dynamic();

  if (filter) {
    if (filter.status) {
      query = query.where(eq(products.status, filter.status));
    }

    if (filter.search) {
      query = query.where(ilike(products.name, `%${filter.search}%`));
    }

    if (filter.limit) {
      query = query.limit(filter.limit);
    }

    if (filter.offset) {
      query = query.offset(filter.offset);
    }
  }

  const result = await query.orderBy(products.name).execute();

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
