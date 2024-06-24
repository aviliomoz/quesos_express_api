import { pgTable, uuid, varchar, numeric, boolean, pgEnum } from "drizzle-orm/pg-core";
import { categories } from "./categories";

const umEnum = pgEnum("um", ["und", "kg", "lt"]);

export const subproducts = pgTable("subproducts", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name").notNull(),
    um: umEnum("um").notNull(),
    yield: numeric("yield").notNull(),
    status: boolean("status").default(true).notNull(),
    category_id: uuid("category_id").references(() => categories.id).notNull()
});

export type Subproduct = typeof subproducts.$inferSelect;
export type NewSubproduct = typeof subproducts.$inferInsert;
