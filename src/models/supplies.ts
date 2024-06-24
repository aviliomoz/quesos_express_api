import { pgTable, uuid, varchar, boolean, numeric } from "drizzle-orm/pg-core";
import { categories } from "./categories";

export const supplies = pgTable("supplies", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name").notNull(),
    taxable: boolean("taxable").default(false).notNull(),
    status: boolean("status").default(true).notNull(),
    price: numeric("price").notNull(),
    category_id: uuid("category_id").references(() => categories.id).notNull()
});

export type Supply = typeof supplies.$inferSelect;
export type NewSupply = typeof supplies.$inferInsert;
