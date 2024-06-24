import { pgTable, uuid, boolean, numeric, pgEnum } from "drizzle-orm/pg-core";
import { supplies } from "./supplies";

const umEnum = pgEnum("um", ["und", "kg", "lt"]);

export const supply_presentations = pgTable("supply_presentations", {
    id: uuid("id").defaultRandom().primaryKey(),
    status: boolean("status").default(true).notNull(),
    amount: numeric("amount").notNull(),
    um: umEnum("um").notNull(),
    is_main: boolean("is_main").default(false).notNull(),
    supply_id: uuid("supply_id").references(() => supplies.id).notNull()
});

export type SupplyPresentation = typeof supply_presentations.$inferSelect;
export type NewSupplyPresentation = typeof supply_presentations.$inferInsert;
