import { pgTable, uuid, varchar, numeric, integer } from "drizzle-orm/pg-core";

export const productos = pgTable("productos", {
  id: uuid("id").defaultRandom().primaryKey(),
  nombre: varchar("nombre").notNull(),
  precio: numeric("precio").notNull(),
  stock: integer("stock").notNull(),
});

export type Producto = typeof productos.$inferSelect;
export type NewProducto = typeof productos.$inferInsert;
