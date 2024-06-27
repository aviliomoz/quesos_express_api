import { pgTable, uuid, varchar, doublePrecision } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name").notNull(),
  price: doublePrecision("price").default(0.0).notNull(),
  stock: doublePrecision("stock").default(0.0).notNull(),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
