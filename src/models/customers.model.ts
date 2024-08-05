import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const customers = pgTable("customers", {
  id: uuid("id").defaultRandom().primaryKey(),
  dni: varchar("dni").notNull(),
  name: varchar("name").notNull(),
  phone: varchar("phone"),
  address: varchar("address"),
  status: varchar("status").default("active").notNull(),
});

export type Customer = typeof customers.$inferSelect;
export type NewCustomer = typeof customers.$inferInsert;
