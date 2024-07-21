import {
  pgTable,
  uuid,
  boolean,
  timestamp,
  varchar,
  doublePrecision,
} from "drizzle-orm/pg-core";
import { customers } from "./customers";
import { users } from "./users";
import { products } from "./products";

export const sales = pgTable("sales", {
  id: uuid("id").defaultRandom().primaryKey(),
  customer_id: uuid("customer_id")
    .notNull()
    .references(() => customers.id),
  date: timestamp("date").notNull(),
  delivered: boolean("delivered").notNull().default(false),
  paid: boolean("paid").notNull().default(false),
  user_id: uuid("user_id")
    .notNull()
    .references(() => users.id),
  status: varchar("status").default("active").notNull(),
});

export const sale_details = pgTable("sale_details", {
  id: uuid("id").defaultRandom().primaryKey(),
  sale_id: uuid("sale_id")
    .notNull()
    .references(() => sales.id),
  product_id: uuid("product_id")
    .notNull()
    .references(() => products.id),
  amount: doublePrecision("amount").notNull(),
  price: doublePrecision("price").notNull(),
  discount: doublePrecision("discount"),
});

export type Sale = typeof sales.$inferSelect;
export type NewSale = typeof sales.$inferInsert;

export type SaleDetail = typeof sale_details.$inferSelect;
export type NewSaleDetail = typeof sale_details.$inferInsert;
