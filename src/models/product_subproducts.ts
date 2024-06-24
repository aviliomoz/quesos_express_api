import { pgTable, uuid, numeric } from "drizzle-orm/pg-core";
import { products } from "./products";
import { subproducts } from "./subproducts";

export const product_subproducts = pgTable("product_subproducts", {
    id: uuid("id").defaultRandom().primaryKey(),
    product_id: uuid("product_id").references(() => products.id).notNull(),
    subproduct_id: uuid("subproduct_id").references(() => subproducts.id).notNull(),
    amount: numeric("amount").notNull(),
    waste: numeric("waste").default("0").notNull()
});

export type ProductSubproduct = typeof product_subproducts.$inferSelect;
export type NewProductSubproduct = typeof product_subproducts.$inferInsert;
