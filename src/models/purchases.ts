import {
  doublePrecision,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { suppliers } from "./suppliers";
import { products } from "./products";

export const purchases = pgTable("purchases", {
  id: uuid("id").defaultRandom().primaryKey(),
  date: timestamp("date").notNull(),
  user_id: uuid("user_id")
    .notNull()
    .references(() => users.id),
  supplier_id: uuid("supplier_id")
    .notNull()
    .references(() => suppliers.id),
  status: varchar("status").default("active").notNull(),
});

export const purchase_details = pgTable("purchase_details", {
  id: uuid("id").defaultRandom().primaryKey(),
  product_id: uuid("product_id")
    .notNull()
    .references(() => products.id),
  purchase_id: uuid("purchase_id")
    .notNull()
    .references(() => purchases.id),
  amount: doublePrecision("amount").notNull(),
  price: doublePrecision("price").notNull(),
  discount: doublePrecision("discount").notNull(),
});

export type Purchase = typeof purchases.$inferSelect;
export type NewPurchase = typeof purchases.$inferInsert;

export type PurchaseDetail = typeof purchase_details.$inferSelect;
export type NewPurchaseDetail = typeof purchase_details.$inferInsert;
