import { db } from "../libs/drizzle";
import { NewMovement, movements } from "../models/movements";

export const createMovementHelper = async (movement: NewMovement) => {
  const res = await db.insert(movements).values(movement).returning();

  return res[0] || undefined;
};
