import { boolean, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const suppliers = pgTable("suppliers", {
  id: uuid("id").defaultRandom().primaryKey(),
  ruc: varchar("ruc").notNull(),
  name: varchar("name").notNull(),
  phone: varchar("phone").notNull(),
  status: boolean("status").notNull(),
});

// Tipos inferidos para suppliers
export type Supplier = typeof suppliers.$inferSelect;
export type NewSupplier = typeof suppliers.$inferInsert;
