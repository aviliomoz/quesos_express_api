import {
  doublePrecision,
  pgTable,
  date,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { users } from "./users.model";
import { suppliers } from "./suppliers.model";
import { products } from "./products.model";

export const purchases = pgTable("purchases", {
  id: uuid("id").defaultRandom().primaryKey(),
  date: date("date").notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  supplierId: uuid("supplier_id")
    .notNull()
    .references(() => suppliers.id),
  status: varchar("status").default("active").notNull(),
});

export const purchase_details = pgTable("purchase_details", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id),
  purchaseId: uuid("purchase_id")
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
