import { and, count, eq, gte, lte } from "drizzle-orm";
import { db } from "../libs/drizzle";
import { NewSale, NewSaleDetail, sale_details, sales } from "../models/sales";
import { Status } from "../types";
import { customers } from "../models/customers";
import { users } from "../models/users";
import { products } from "../models/products";

export const getSaleByIdHelper = async (id: string) => {
  const result = await db
    .select({
      id: sales.id,
      date: sales.date,
      customer: {
        id: customers.id,
        dni: customers.dni,
        name: customers.name,
      },
      user: {
        id: users.id,
        name: users.name,
      },
      delivered: sales.delivered,
      paid: sales.paid,
      status: sales.status,
    })
    .from(sales)
    .innerJoin(sale_details, eq(sales.id, sale_details.sale_id))
    .innerJoin(customers, eq(customers.id, sales.customer_id))
    .innerJoin(users, eq(users.id, sales.user_id))
    .where(eq(sales.id, id));

  return result[0];
};

export const getSalesCountHelper = async (filter?: {
  status?: Status;
  initial_date?: Date;
  final_date?: Date;
}) => {
  let query = db.select({ count: count() }).from(sales).$dynamic();

  if (filter) {
    if (filter.status) {
      query = query.where(eq(sales.status, filter.status));
    }

    if (filter.initial_date) {
      query = query.where(gte(sales.date, filter.initial_date));
    }

    if (filter.final_date) {
      query = query.where(lte(sales.date, filter.final_date));
    }
  }

  const result = await query.execute();

  return result[0].count;
};

export const getSalesHelper = async (filter?: {
  status?: Status;
  initial_date?: Date;
  final_date?: Date;
  limit?: number;
  offset?: number;
}) => {
  let query = db.select().from(sales).$dynamic();

  if (filter) {
    if (filter.status) {
      query = query.where(eq(sales.status, filter.status));
    }

    if (filter.initial_date) {
      query = query.where(gte(sales.date, filter.initial_date));
    }

    if (filter.final_date) {
      query = query.where(lte(sales.date, filter.final_date));
    }

    if (filter.limit) {
      query = query.limit(filter.limit);
    }

    if (filter.offset) {
      query = query.offset(filter.offset);
    }
  }

  const result = await query.orderBy(sales.date).execute();

  return result;
};

export const createSaleHelper = async (sale: NewSale) => {
  const result = await db.insert(sales).values(sale).returning();

  return result[0];
};

export const updateSaleHelper = async (id: string, sale: NewSale) => {
  const result = await db
    .update(sales)
    .set(sale)
    .where(eq(sales.id, id))
    .returning();

  return result[0];
};

export const getSaleDetailsBySaleIdHelper = async (id: string) => {
  const result = await db
    .select({
      id: sale_details.id,
      product: {
        id: products.id,
        name: products.name,
        status: products.status,
      },
      price: sale_details.price,
      amount: sale_details.amount,
      discount: sale_details.discount,
    })
    .from(sale_details)
    .innerJoin(products, eq(products.id, sale_details.product_id))
    .where(eq(sale_details.sale_id, id));

  return result;
};

export const addSaleDetailsToSaleHelper = async (details: NewSaleDetail[]) => {
  const result = await db.insert(sale_details).values(details).returning();

  return result;
};

export const updateSaleDetailsBySaleIdHelper = async (
  id: string,
  details: NewSaleDetail[]
) => {
  await deleteSaleDetailsBySaleIdHelper(id);
  const result = await addSaleDetailsToSaleHelper(details);

  return result;
};

export const deleteSaleDetailsBySaleIdHelper = async (id: string) => {
  const result = await db
    .delete(sale_details)
    .where(eq(sale_details.sale_id, id))
    .returning();

  return result;
};
