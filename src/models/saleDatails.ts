import { pgTable, uuid, numeric, varchar, integer } from "drizzle-orm/pg-core";
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
  amount: integer("amount").notNull(),
  price: numeric("price").notNull(),
  discount: numeric("discount"),
  discountDescription: varchar("discount_description"),
  total: numeric("total").notNull(),
});

export type SaleDetail = typeof saleDetails.$inferSelect;
export type NewSaleDetail = typeof saleDetails.$inferInsert;
