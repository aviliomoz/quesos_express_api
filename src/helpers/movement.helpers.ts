import { and, count, eq, gte, lte } from "drizzle-orm";
import { db } from "../libs/drizzle";
import {
  NewMovement,
  NewMovementDetail,
  movement_details,
  movements,
} from "../models/movements";
import { Status } from "../types";
import { users } from "../models/users";
import { products } from "../models/products";

export const getMovementByIdHelper = async (id: string) => {
  const result = await db
    .select({
      id: movements.id,
      type: movements.type,
      date: movements.date,
      description: movements.description,
      user: {
        id: users.id,
        name: users.name,
      },
      status: movements.status,
    })
    .from(movements)
    .innerJoin(movement_details, eq(movements.id, movement_details.movement_id))
    .innerJoin(users, eq(users.id, movements.user_id))
    .where(eq(movements.id, id));

  return result[0];
};

export const getMovementsCountHelper = async (filter?: {
  status?: Status;
  initial_date?: Date;
  final_date?: Date;
}) => {
  let query = db.select({ count: count() }).from(movements).$dynamic();

  if (filter) {
    if (filter.status) {
      query = query.where(eq(movements.status, filter.status));
    }

    if (filter.initial_date) {
      query = query.where(gte(movements.date, filter.initial_date));
    }

    if (filter.final_date) {
      query = query.where(lte(movements.date, filter.final_date));
    }
  }

  const result = await query.execute();

  return result[0].count;
};

export const getMovementsHelper = async (filter?: {
  status?: Status;
  initial_date?: Date;
  final_date?: Date;
  limit?: number;
  offset?: number;
}) => {
  let query = db.select().from(movements).$dynamic();

  if (filter) {
    if (filter.status) {
      query = query.where(eq(movements.status, filter.status));
    }

    if (filter.initial_date) {
      query = query.where(gte(movements.date, filter.initial_date));
    }

    if (filter.final_date) {
      query = query.where(lte(movements.date, filter.final_date));
    }

    if (filter.limit) {
      query = query.limit(filter.limit);
    }

    if (filter.offset) {
      query = query.offset(filter.offset);
    }
  }

  const result = await query.orderBy(movements.date).execute();

  return result;
};

export const createMovementHelper = async (movement: NewMovement) => {
  const result = await db.insert(movements).values(movement).returning();

  return result[0];
};

export const updateMovementHelper = async (
  id: string,
  movement: NewMovement
) => {
  const result = await db
    .update(movements)
    .set(movement)
    .where(eq(movements.id, id))
    .returning();

  return result[0];
};

export const getMovementDetailsByMovementIdHelper = async (id: string) => {
  const result = await db
    .select({
      id: movement_details.id,
      product: {
        id: products.id,
        name: products.name,
        status: products.status,
      },
      amount: movement_details.amount,
    })
    .from(movement_details)
    .innerJoin(products, eq(products.id, movement_details.product_id))
    .where(eq(movement_details.movement_id, id));

  return result;
};

export const addMovementDetailsToMovementHelper = async (
  details: NewMovementDetail[]
) => {
  const result = await db.insert(movement_details).values(details).returning();

  return result;
};

export const updateMovementDetailsByMovementIdHelper = async (
  id: string,
  details: NewMovementDetail[]
) => {
  await deleteMovementDetailsByMovementIdHelper(id);
  const result = await addMovementDetailsToMovementHelper(details);

  return result;
};

export const deleteMovementDetailsByMovementIdHelper = async (id: string) => {
  const result = await db
    .delete(movement_details)
    .where(eq(movement_details.movement_id, id))
    .returning();

  return result;
};
