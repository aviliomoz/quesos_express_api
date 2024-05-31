import { db } from "../libs/drizzle";
import { NewUser, User, users } from "../models/users";
import { eq } from "drizzle-orm";

export const getUserByEmail = async (email: string): Promise<User> => {
  const res = await db.select().from(users).where(eq(users.email, email))

  return res[0]
};

export const createUser = async (user: NewUser): Promise<User> => {
  const res = await db.insert(users).values(user).returning()

  return res[0]
}

