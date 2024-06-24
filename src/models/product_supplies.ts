import { pgTable, uuid, numeric, pgEnum } from "drizzle-orm/pg-core";
import { products } from "./products";
import { supply_presentations } from "./supply_presentations";

const umEnum = pgEnum("um", ["und", "kg", "lt", "oz"]);

export const product_supplies = pgTable("product_supplies", {
    id: uuid("id").defaultRandom().primaryKey(),
    product_id: uuid("product_id").references(() => products.id).notNull(),
    supply_presentation_id: uuid("supply_presentation_id").references(() => supply_presentations.id).notNull(),
    um: umEnum("um").notNull(),
    amount: numeric("amount").notNull(),
    waste: numeric("waste").default("0").notNull()
});

export type ProductSupply = typeof product_supplies.$inferSelect;
export type NewProductSupply = typeof product_supplies.$inferInsert;
