import { pgTable, uuid, numeric, varchar, integer, doublePrecision } from "drizzle-orm/pg-core";
import { sales } from "./sales";
import { products } from "./products";

export const saleDetails = pgTable("sale_details", {
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
  discountDescription: varchar("discount_description"),
  total: doublePrecision("total").notNull(),
});

export type SaleDetail = typeof saleDetails.$inferSelect;
export type NewSaleDetail = typeof saleDetails.$inferInsert;
