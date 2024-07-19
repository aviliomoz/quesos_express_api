import { count, eq, ilike } from "drizzle-orm";
import { db } from "../libs/drizzle";
import { suppliers, NewSupplier } from "../models/suppliers";

export const getSupplierByNameHelper = async (name: string) => {
  const res = await db.select().from(suppliers).where(eq(suppliers.name, name));

  return res[0];
};

export const getSupplierByIdHelper = async (id: string) => {
  const res = await db.select().from(suppliers).where(eq(suppliers.id, id));

  return res[0];
};

export const getSuppliersCountHelper = async (filter: { search: string }) => {
  const res = await db
    .select({ count: count() })
    .from(suppliers)
    .where(ilike(suppliers.name, `%${filter.search}%`));

  return res[0].count;
};

export const getSuppliersHelper = async (
  search: string,
  limit: number,
  offset: number
) => {
  const res = await db
    .select()
    .from(suppliers)
    .limit(limit)
    .offset(offset)
    .where(ilike(suppliers.name, `%${search}%`))
    .orderBy(suppliers.name);

  return res;
};

export const createSupplierHelper = async (supplier: NewSupplier) => {
  const res = await db.insert(suppliers).values(supplier).returning();

  return res[0];
};

export const updateSupplierHelper = async (
  id: string,
  supplier: NewSupplier
) => {
  const res = await db
    .update(suppliers)
    .set(supplier)
    .where(eq(suppliers.id, id))
    .returning();

  return res[0];
};
