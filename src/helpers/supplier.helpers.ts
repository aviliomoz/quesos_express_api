import { count, eq, ilike } from "drizzle-orm";
import { db } from "../libs/drizzle";
import { suppliers, NewSupplier } from "../models/suppliers";

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

export const getSuppliersCountHelper = async (filter: { search: string }) => {
  const result = await db
    .select({ count: count() })
    .from(suppliers)
    .where(ilike(suppliers.name, `%${filter.search}%`));

  return result[0].count;
};

export const getSuppliersHelper = async (
  search: string,
  limit: number,
  offset: number
) => {
  const result = await db
    .select()
    .from(suppliers)
    .limit(limit)
    .offset(offset)
    .where(ilike(suppliers.name, `%${search}%`))
    .orderBy(suppliers.name);

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
