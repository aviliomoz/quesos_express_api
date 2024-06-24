import { pgTable, uuid, numeric, pgEnum } from "drizzle-orm/pg-core";
import { subproducts } from "./subproducts";
import { supply_presentations } from "./supply_presentations";

const umEnum = pgEnum("um", ["und", "kg", "lt", "oz"]);

export const subproduct_supplies = pgTable("subproduct_supplies", {
    id: uuid("id").defaultRandom().primaryKey(),
    subproduct_id: uuid("subproduct_id").references(() => subproducts.id).notNull(),
    supply_presentation_id: uuid("supply_presentation_id").references(() => supply_presentations.id).notNull(),
    um: umEnum("um").notNull(),
    amount: numeric("amount").notNull(),
    waste: numeric("waste").default("0").notNull()
});

export type SubproductSupply = typeof subproduct_supplies.$inferSelect;
export type NewSubproductSupply = typeof subproduct_supplies.$inferInsert;
