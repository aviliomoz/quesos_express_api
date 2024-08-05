import { count, eq, ilike } from "drizzle-orm";
import { db } from "../libs/drizzle";
import { suppliers, NewSupplier } from "../models/suppliers.model";
import { Status } from "../types";

export const getSupplierByNameHelper = async (name: string) => {
  const result = await db
    .select()
    .from(suppliers)
    .where(eq(suppliers.name, name));

  return result[0];
};

export const getSupplierByIdHelper = async (id: string) => {
  const result = await db.select().from(suppliers).where(eq(suppliers.id, id));

  return result[0];
};

export const getSuppliersCountHelper = async (filter?: {
  status?: Status;
  search?: string;
}) => {
  let query = db.select({ count: count() }).from(suppliers).$dynamic();

  const result = await query.execute();

  if (filter) {
    if (filter.status) {
      query = query.where(eq(suppliers.status, filter.status));
    }

    if (filter.search) {
      query = query.where(ilike(suppliers.name, `%${filter.search}%`));
    }
  }

  return result[0].count;
};

export const getSuppliersHelper = async (filter?: {
  status?: Status;
  search?: string;
  limit?: number;
  offset?: number;
}) => {
  let query = db.select().from(suppliers).$dynamic();

  if (filter) {
    if (filter.status) {
      query = query.where(eq(suppliers.status, filter.status));
    }

    if (filter.search) {
      query = query.where(ilike(suppliers.name, `%${filter.search}%`));
    }

    if (filter.limit) {
      query = query.limit(filter.limit);
    }

    if (filter.offset) {
      query = query.offset(filter.offset);
    }
  }

  const result = await query.orderBy(suppliers.name).execute();

  return result;
};

export const createSupplierHelper = async (supplier: NewSupplier) => {
  const result = await db.insert(suppliers).values(supplier).returning();

  return result[0];
};

export const updateSupplierHelper = async (
  id: string,
  supplier: NewSupplier
) => {
  const result = await db
    .update(suppliers)
    .set(supplier)
    .where(eq(suppliers.id, id))
    .returning();

  return result[0];
};
