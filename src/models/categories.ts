import { pgTable, uuid, varchar, boolean, pgEnum } from "drizzle-orm/pg-core";
import { restaurants } from "./restaurants";

const categoryTypeEnum = pgEnum("type", ["products", "subproducts", "supplies", "combos"]);

export const categories = pgTable("categories", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name").notNull(),
    status: boolean("status").default(true).notNull(),
    type: categoryTypeEnum("type").notNull(),
    restaurant_id: uuid("restaurant_id").references(() => restaurants.id).notNull()
});

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;
