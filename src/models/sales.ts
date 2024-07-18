import { pgTable, uuid, boolean, timestamp } from "drizzle-orm/pg-core";
import { customers } from "./customers";
import { users } from "./users";

export const sales = pgTable("sales", {
  id: uuid("id").defaultRandom().primaryKey(),
  customer_id: uuid("customer_id")
    .notNull()
    .references(() => customers.id),
  date: timestamp("date").notNull(),
  delivery_date: timestamp("delivery_date"),
  payment_date: timestamp("payment_date"),
  delivered: boolean("delivered").notNull().default(false),
  paid: boolean("paid").notNull().default(false),
  user_id: uuid("user_id")
    .notNull()
    .references(() => users.id),
  status: boolean("status").default(true).notNull(),
});

export type Sale = typeof sales.$inferSelect;
export type NewSale = typeof sales.$inferInsert;
