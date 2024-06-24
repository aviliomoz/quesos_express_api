import { pgTable, uuid, numeric } from "drizzle-orm/pg-core";
import { subproducts } from "./subproducts";

export const subproduct_subproducts = pgTable("subproduct_subproducts", {
    id: uuid("id").defaultRandom().primaryKey(),
    base_subproduct_id: uuid("base_subproduct_id").references(() => subproducts.id).notNull(),
    ingredient_subproduct_id: uuid("ingredient_subproduct_id").references(() => subproducts.id).notNull(),
    amount: numeric("amount").notNull(),
    waste: numeric("waste").default("0").notNull()
});

export type SubproductSubproduct = typeof subproduct_subproducts.$inferSelect;
export type NewSubproductSubproduct = typeof subproduct_subproducts.$inferInsert;
