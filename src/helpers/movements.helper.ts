import { eq } from "drizzle-orm";
import { db } from "../libs/drizzle";
import {
  NewMovement,
  NewMovementDetail,
  movement_details,
  movements,
} from "../models/movements.model";
import { users } from "../models/users.model";
import { products } from "../models/products.model";

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
    .innerJoin(users, eq(users.id, movements.userId))
    .where(eq(movements.id, id));

  return result[0];
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
    .innerJoin(products, eq(products.id, movement_details.productId))
    .where(eq(movement_details.movementId, id));

  return result;
};

export const getMovementDetailsByProductIdHelper = async (id: string) => {
  const result = await db
    .select({
      id: movement_details.id,
      product: {
        id: products.id,
        name: products.name,
        status: products.status,
      },
      amount: movement_details.amount,
      status: movements.status,
      date: movements.date,
      type: movements.type,
      description: movements.description,
    })
    .from(movement_details)
    .innerJoin(products, eq(products.id, movement_details.productId))
    .innerJoin(movements, eq(movements.id, movement_details.movementId))
    .where(eq(movement_details.productId, id));

  return result;
};

export const addMovementDetailsToMovementHelper = async (
  id: string,
  details: NewMovementDetail[]
) => {
  details = details.map((detail) => {
    return { ...detail, movementId: id };
  });

  const result = await db.insert(movement_details).values(details).returning();

  return result;
};

export const updateMovementDetailsByMovementIdHelper = async (
  id: string,
  details: NewMovementDetail[]
) => {
  await deleteMovementDetailsByMovementIdHelper(id);
  const result = await addMovementDetailsToMovementHelper(id, details);

  return result;
};

export const deleteMovementDetailsByMovementIdHelper = async (id: string) => {
  const result = await db
    .delete(movement_details)
    .where(eq(movement_details.movementId, id))
    .returning();

  return result;
};
