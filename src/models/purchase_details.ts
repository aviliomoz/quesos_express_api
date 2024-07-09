import { doublePrecision, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { products } from "./products";
import { purchases } from "./purchases";

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
  discount_description: varchar("discount_description").notNull(),
});

// Tipos inferidos para purchase_details
export type PurchaseDetail = typeof purchase_details.$inferSelect;
export type NewPurchaseDetail = typeof purchase_details.$inferInsert;
