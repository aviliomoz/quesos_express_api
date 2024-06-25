import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const usuarios = pgTable("usuarios", {
  id: uuid("id").defaultRandom().primaryKey(),
  nombre: varchar("nombre").notNull(),
  email: varchar("email").unique().notNull(),
  password: varchar("password").notNull(),
});

export type Usuario = typeof usuarios.$inferSelect;
export type NewUsuario = typeof usuarios.$inferInsert;
export type UsuarioResponse = Omit<Usuario, "password">;
