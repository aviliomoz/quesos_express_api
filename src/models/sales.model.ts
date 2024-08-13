import {
  pgTable,
  uuid,
  boolean,
  date,
  varchar,
  doublePrecision,
} from "drizzle-orm/pg-core";
import { customers } from "./customers.model";
import { products } from "./products.model";

export const sales = pgTable("sales", {
  id: uuid("id").defaultRandom().primaryKey(),
  customerId: uuid("customer_id")
    .notNull()
    .references(() => customers.id),
  date: date("date").notNull(),
  delivered: boolean("delivered").notNull().default(false),
  paid: boolean("paid").notNull().default(false),
  status: varchar("status").default("active").notNull(),
});

export const sale_details = pgTable("sale_details", {
  id: uuid("id").defaultRandom().primaryKey(),
  saleId: uuid("sale_id")
    .notNull()
    .references(() => sales.id),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id),
  amount: doublePrecision("amount").notNull(),
  price: doublePrecision("price").notNull(),
  discount: doublePrecision("discount").notNull(),
});

export type Sale = typeof sales.$inferSelect;
export type NewSale = typeof sales.$inferInsert;

export type SaleDetail = typeof sale_details.$inferSelect;
export type NewSaleDetail = typeof sale_details.$inferInsert;
