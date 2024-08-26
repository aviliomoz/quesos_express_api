import { count, eq, ilike, sum } from "drizzle-orm";
import { db } from "../libs/drizzle";
import {
  NewPurchase,
  NewPurchaseDetail,
  purchase_details,
  purchases,
} from "../models/purchases.model";
import { suppliers } from "../models/suppliers.model";
import { products } from "../models/products.model";
import { Status } from "../types";

export const getPurchaseByIdHelper = async (id: string) => {
  const result = await db
    .select({
      id: purchases.id,
      date: purchases.date,
      supplier: {
        id: suppliers.id,
        name: suppliers.name,
      },
      status: purchases.status,
    })
    .from(purchases)
    .innerJoin(suppliers, eq(suppliers.id, purchases.supplierId))
    .where(eq(purchases.id, id));

  return result[0];
};

export const getPurchasesCountHelper = async (filter?: {
  status?: Status;
  search?: string;
}) => {
  let query = db
    .select({ count: count() })
    .from(purchases)
    .innerJoin(suppliers, eq(suppliers.id, purchases.supplierId))
    .$dynamic();

  if (filter) {
    if (filter.status) {
      query = query.where(eq(purchases.status, filter.status));
    }

    if (filter.search) {
      query = query.where(ilike(suppliers.name, `%${filter.search}%`));
    }
  }

  const result = await query.execute();

  return result[0].count;
};

export const getPurchasesHelper = async (filter?: {
  status?: Status;
  search?: string;
  limit?: number;
  offset?: number;
}) => {
  let query = db
    .select({
      id: purchases.id,
      date: purchases.date,
      supplier: {
        id: suppliers.id,
        name: suppliers.name,
      },
      status: purchases.status,
    })
    .from(purchases)
    .innerJoin(suppliers, eq(suppliers.id, purchases.supplierId))
    .$dynamic();

  if (filter) {
    if (filter.status) {
      query = query.where(eq(purchases.status, filter.status));
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

  const result = await query.orderBy(purchases.date).execute();

  return result;
};

export const createPurchaseHelper = async (purchase: NewPurchase) => {
  const result = await db.insert(purchases).values(purchase).returning();

  return result[0];
};

export const updatePurchaseHelper = async (
  id: string,
  purchase: NewPurchase
) => {
  const result = await db
    .update(purchases)
    .set(purchase)
    .where(eq(purchases.id, id))
    .returning();

  return result[0];
};

export const getPurchaseDetailsByPurchaseIdHelper = async (id: string) => {
  const result = await db
    .select({
      id: purchase_details.id,
      product: {
        id: products.id,
        name: products.name,
        status: products.status,
      },
      amount: purchase_details.amount,
      price: purchase_details.price,
      discount: purchase_details.discount,
    })
    .from(purchase_details)
    .innerJoin(products, eq(products.id, purchase_details.productId))
    .where(eq(purchase_details.purchaseId, id));

  return result;
};

export const getPurchaseDetailsByProductIdHelper = async (id: string) => {
  const result = await db
    .select({
      id: purchase_details.id,
      product: {
        id: products.id,
        name: products.name,
        status: products.status,
      },
      amount: purchase_details.amount,
      status: purchases.status,
      date: purchases.date,
    })
    .from(purchase_details)
    .innerJoin(products, eq(products.id, purchase_details.productId))
    .innerJoin(purchases, eq(purchases.id, purchase_details.purchaseId))
    .where(eq(purchase_details.productId, id));

  return result;
};

export const addPurchaseDetailsToPurchaseHelper = async (
  purchaseId: string,
  details: NewPurchaseDetail[]
) => {
  const formattedDetails = details.map((detail) => ({
    ...detail,
    purchaseId,
  }));

  const result = await db
    .insert(purchase_details)
    .values(formattedDetails)
    .returning();

  return result;
};

export const updatePurchaseDetailsByPurchaseIdHelper = async (
  purchaseId: string,
  details: NewPurchaseDetail[]
) => {
  // Puedes manejar la actualización eliminando primero los detalles existentes
  await db
    .delete(purchase_details)
    .where(eq(purchase_details.purchaseId, purchaseId));

  // Luego, agregas los nuevos detalles
  const result = await addPurchaseDetailsToPurchaseHelper(purchaseId, details);

  return result;
};


