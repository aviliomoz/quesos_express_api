import { count, eq, ilike } from "drizzle-orm";
import { db } from "../libs/drizzle";
import { customers, NewCustomer } from "../models/customers.model";
import { Status } from "../types";

export const getCustomerByNameHelper = async (name: string) => {
  const result = await db
    .select()
    .from(customers)
    .where(eq(customers.name, name));

  return result[0];
};

export const getCustomerByIdHelper = async (id: string) => {
  const result = await db.select().from(customers).where(eq(customers.id, id));

  return result[0];
};

export const getCustomersCountHelper = async (filter?: {
  status?: Status;
  search?: string;
}) => {
  let query = db.select({ count: count() }).from(customers).$dynamic();

  if (filter) {
    if (filter.status) {
      query = query.where(eq(customers.status, filter.status));
    }

    if (filter.search) {
      query = query.where(ilike(customers.name, `%${filter.search}%`));
    }
  }

  const result = await query.execute();

  return result[0].count;
};

export const getCustomersHelper = async (filter?: {
  status?: Status;
  search?: string;
  limit?: number;
  offset?: number;
}) => {
  let query = db.select().from(customers).$dynamic();

  if (filter) {
    if (filter.status) {
      query = query.where(eq(customers.status, filter.status));
    }

    if (filter.search) {
      query = query.where(ilike(customers.name, `%${filter.search}`));
    }

    if (filter.limit) {
      query = query.limit(filter.limit);
    }

    if (filter.offset) {
      query = query.offset(filter.offset);
    }
  }

  const result = await query.orderBy(customers.name).execute();

  return result;
};

export const createCustomerHelper = async (customer: NewCustomer) => {
  const result = await db.insert(customers).values(customer).returning();

  return result[0];
};

export const updateCustomerHelper = async (
  id: string,
  customer: NewCustomer
) => {
  const result = await db
    .update(customers)
    .set(customer)
    .where(eq(customers.id, id))
    .returning();

  return result[0];
};
