import { count, eq, ilike } from "drizzle-orm";
import { db } from "../libs/drizzle";
import { customers, NewCustomer } from "../models/customers";

export const getCustomerByNameHelper = async (name: string) => {
  const res = await db.select().from(customers).where(eq(customers.name, name));

  return res[0];
};

export const getCustomerByIdHelper = async (id: string) => {
  const res = await db.select().from(customers).where(eq(customers.id, id));

  return res[0];
};

export const getCustomersCountHelper = async (filter: { search: string }) => {
  const res = await db
    .select({ count: count() })
    .from(customers)
    .where(ilike(customers.name, `%${filter.search}%`));

  return res[0].count;
};

export const getCustomersHelper = async (
  search: string,
  limit: number,
  offset: number
) => {
  const res = await db
    .select()
    .from(customers)
    .limit(limit)
    .offset(offset)
    .where(ilike(customers.name, `%${search}%`))
    .orderBy(customers.name);

  return res;
};

export const createCustomerHelper = async (customer: NewCustomer) => {
  const res = await db.insert(customers).values(customer).returning();

  return res[0];
};

export const updateCustomerHelper = async (
  id: string,
  customer: NewCustomer
) => {
  const res = await db
    .update(customers)
    .set(customer)
    .where(eq(customers.id, id))
    .returning();

  return res[0];
};

export const toggleCustomerHelper = async (id: string) => {
  const res = await db
    .update(customers)
    .set({ status: !customers.status })
    .where(eq(customers.id, id))
    .returning();

  return res[0];
};
