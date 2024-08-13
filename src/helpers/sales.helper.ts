import { count, eq, ilike, sum } from "drizzle-orm";
import { db } from "../libs/drizzle";
import {
  NewSale,
  NewSaleDetail,
  sale_details,
  sales,
} from "../models/sales.model";
import { customers } from "../models/customers.model";
import { products } from "../models/products.model";
import { SaleStatus } from "../types";

export const getSaleByIdHelper = async (id: string) => {
  const result = await db
    .select({
      id: sales.id,
      date: sales.date,
      customer: {
        id: customers.id,
        name: customers.name,
      },
      status: sales.status,
      delivered: sales.delivered,
      paid: sales.paid,
    })
    .from(sales)
    .innerJoin(customers, eq(customers.id, sales.customerId))
    .where(eq(sales.id, id));

  return result[0];
};

export const getSalesCountHelper = async (filter?: {
  status?: SaleStatus;
  search?: string;
}) => {
  let query = db
    .select({ count: count() })
    .from(sales)
    .innerJoin(customers, eq(customers.id, sales.customerId))
    .$dynamic();

  if (filter) {
    if (filter.status) {
      query = query.where(eq(sales.status, filter.status));
    }

    if (filter.search) {
      query = query.where(ilike(customers.name, `%${filter.search}%`));
    }
  }

  const result = await query.execute();

  return result[0].count;
};

export const getSalesHelper = async (filter?: {
  status?: SaleStatus;
  search?: string;
  limit?: number;
  offset?: number;
}) => {
  let query = db
    .select({
      id: sales.id,
      date: sales.date,
      customer: {
        id: customers.id,
        name: customers.name,
      },
      status: sales.status,
      delivered: sales.delivered,
      paid: sales.paid,
    })
    .from(sales)
    .innerJoin(customers, eq(customers.id, sales.customerId))
    .$dynamic();

  if (filter) {
    if (filter.status) {
      query = query.where(eq(sales.status, filter.status));
    }

    if (filter.search) {
      query = query.where(ilike(customers.name, `%${filter.search}%`));
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
      amount: sale_details.amount,
      price: sale_details.price,
      discount: sale_details.discount,
    })
    .from(sale_details)
    .innerJoin(products, eq(products.id, sale_details.productId))
    .where(eq(sale_details.saleId, id));

  return result;
};

export const getSaleDetailsByProductIdHelper = async (id: string) => {
  const result = await db
    .select({
      id: sale_details.id,
      product: {
        id: products.id,
        name: products.name,
        status: products.status,
      },
      amount: sale_details.amount,
      status: sales.status,
      date: sales.date,
    })
    .from(sale_details)
    .innerJoin(products, eq(products.id, sale_details.productId))
    .innerJoin(sales, eq(sales.id, sale_details.saleId))
    .where(eq(sale_details.productId, id));

  return result;
};

export const addSaleDetailsToSaleHelper = async (
  saleId: string,
  details: NewSaleDetail[]
) => {
  const formattedDetails = details.map((detail) => ({
    ...detail,
    saleId,
  }));

  const result = await db
    .insert(sale_details)
    .values(formattedDetails)
    .returning();

  return result;
};

export const updateSaleDetailsBySaleIdHelper = async (
  saleId: string,
  details: NewSaleDetail[]
) => {
  await db.delete(sale_details).where(eq(sale_details.saleId, saleId));

  const result = await addSaleDetailsToSaleHelper(saleId, details);

  return result;
};
