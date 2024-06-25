import { pgTable, uuid, varchar, numeric, integer } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("nombre").notNull(),
  price: numeric("price").notNull(),
  stock: integer("stock").notNull(),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
