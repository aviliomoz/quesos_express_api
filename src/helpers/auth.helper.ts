import { db } from "../libs/drizzle";
import { NewUser, users } from "../models/users.model";
import { eq } from "drizzle-orm";

export const getUserByEmail = async (email: string) => {
  const result = await db.select().from(users).where(eq(users.email, email));

  return result[0];
};

export const createUser = async (usuario: NewUser) => {
  const result = await db.insert(users).values(usuario).returning();

  return result[0];
};
