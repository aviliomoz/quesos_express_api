import { pgTable, uuid, date, boolean, numeric } from "drizzle-orm/pg-core";
import { customers } from "./customers";
import { users } from "./users";

export const sales = pgTable("sales", {
  id: uuid("id").defaultRandom().primaryKey(),
  customer_id: uuid("customer_id")
    .notNull()
    .references(() => customers.id),
  orderDate: date("order_date").notNull(),
  deliveryDate: date("delivery_date"),
  paymentDate: date("payment_date"),
  delivered: boolean("delivered").notNull().default(false),
  paid: boolean("paid").notNull().default(false),
  total: numeric("total").notNull(),
  user_id: uuid("user_id")
    .notNull()
    .references(() => users.id),
});

export type Sale = typeof sales.$inferSelect;
export type NewSale = typeof sales.$inferInsert;
