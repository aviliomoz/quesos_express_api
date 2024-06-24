import { pgTable, uuid, numeric } from "drizzle-orm/pg-core";
import { combo_products } from "./combo_products";
import { products } from "./products";

export const combo_product_replacements = pgTable("combo_product_replacements", {
    id: uuid("id").defaultRandom().primaryKey(),
    combo_product_id: uuid("combo_product_id").references(() => combo_products.id).notNull(),
    product_id: uuid("product_id").references(() => products.id).notNull(),
    amount: numeric("amount").notNull()
});

export type ComboProductReplacement = typeof combo_product_replacements.$inferSelect;
export type NewComboProductReplacement = typeof combo_product_replacements.$inferInsert;
