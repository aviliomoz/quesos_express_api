import {
  pgTable,
  uuid,
  boolean,
  timestamp,
  doublePrecision,
} from "drizzle-orm/pg-core";
import { customers } from "./customers";
import { users } from "./users";

export const sales = pgTable("sales", {
  id: uuid("id").defaultRandom().primaryKey(),
  customer_id: uuid("customer_id")
    .notNull()
    .references(() => customers.id),
  orderDate: timestamp("order_date").notNull(),
  deliveryDate: timestamp("delivery_date"),
  paymentDate: timestamp("payment_date"),
  delivered: boolean("delivered").notNull().default(false),
  paid: boolean("paid").notNull().default(false),
  total: doublePrecision("total").notNull(),
  user_id: uuid("user_id")
    .notNull()
    .references(() => users.id),
});

export type Sale = typeof sales.$inferSelect;
export type NewSale = typeof sales.$inferInsert;
