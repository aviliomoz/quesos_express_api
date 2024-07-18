import { db } from "../libs/drizzle";
import { NewUser, users } from "../models/users";
import { eq } from "drizzle-orm";

export const getUserByEmail = async (email: string) => {
  const res = await db.select().from(users).where(eq(users.email, email));

  return res[0];
};

export const createUser = async (usuario: NewUser) => {
  const res = await db.insert(users).values(usuario).returning();

  return res[0];
};
