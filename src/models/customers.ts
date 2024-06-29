import { boolean, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const customers = pgTable("customers", {
  id: uuid("id").defaultRandom().primaryKey(),
  dni: varchar("dni").notNull(),
  name: varchar("name").notNull(),
  lastname: varchar("lastname").notNull(),
  phone: varchar("phone"),
  address: varchar("address"),
  status: boolean("status").default(true).notNull()
});

export type Customer = typeof customers.$inferSelect;
export type NewCustomer = typeof customers.$inferInsert;
