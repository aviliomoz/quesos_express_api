import { pgTable, uuid, numeric } from "drizzle-orm/pg-core";
import { combos } from "./combos";
import { products } from "./products";

export const combo_products = pgTable("combo_products", {
    id: uuid("id").defaultRandom().primaryKey(),
    combo_id: uuid("combo_id").references(() => combos.id).notNull(),
    product_id: uuid("product_id").references(() => products.id).notNull(),
    amount: numeric("amount").notNull()
});

export type ComboProduct = typeof combo_products.$inferSelect;
export type NewComboProduct = typeof combo_products.$inferInsert;
