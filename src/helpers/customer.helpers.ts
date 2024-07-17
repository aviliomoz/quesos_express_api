import { eq } from "drizzle-orm";
import { db } from "../libs/drizzle";
import { customers } from "../models/customers";

export const getCustomerByName = async (name: string) => {
  const res = await db.select().from(customers).where(eq(customers.name, name));

  return res[0];
};

export const getCustomerById = async (id: string) => {
  const res = await db.select().from(customers).where(eq(customers.id, id));

  return res[0];
};
