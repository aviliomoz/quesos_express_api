import { pgTable, uuid, varchar, numeric, boolean } from "drizzle-orm/pg-core";
import { categories } from "./categories";

export const combos = pgTable("combos", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name").notNull(),
    price: numeric("price").notNull(),
    status: boolean("status").default(true).notNull(),
    category_id: uuid("category_id").references(() => categories.id).notNull()
});

export type Combo = typeof combos.$inferSelect;
export type NewCombo = typeof combos.$inferInsert;
