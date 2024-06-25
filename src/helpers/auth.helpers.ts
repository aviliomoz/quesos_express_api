import { db } from "../libs/drizzle";
import { NewUsuario, Usuario, usuarios } from "../models/usuarios";
import { eq } from "drizzle-orm";

export const getUserByEmail = async (email: string): Promise<Usuario> => {
  const res = await db.select().from(usuarios).where(eq(usuarios.email, email));

  return res[0] || undefined;
};

export const createUser = async (usuario: NewUsuario): Promise<Usuario> => {
  const res = await db.insert(usuarios).values(usuario).returning();

  return res[0] || undefined;
};
