import { eq } from "drizzle-orm";
import { db } from "../libs/drizzle";
import { NewMovement, movements } from "../models/movements.model";
import { products } from "../models/products.model";

export const getMovementByIdHelper = async (id: string) => {
  const result = await db
    .select({
      id: movements.id,
      type: movements.type,
      date: movements.date,
      description: movements.description,
      status: movements.status,
      amount: movements.amount,
      product: {
        id: products.id,
        name: products.name,
        status: products.status,
      },
    })
    .from(movements)
    .innerJoin(products, eq(products.id, movements.productId))
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

export const getMovementsByProductIdHelper = async (id: string) => {
  const result = await db
    .select({
      id: movements.id,
      product: {
        id: products.id,
        name: products.name,
        status: products.status,
      },
      amount: movements.amount,
      status: movements.status,
      date: movements.date,
      type: movements.type,
      description: movements.description,
    })
    .from(movements)
    .innerJoin(products, eq(products.id, movements.productId))
    .where(eq(movements.productId, id));

  return result;
};
