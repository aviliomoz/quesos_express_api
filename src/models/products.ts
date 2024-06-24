import { pgTable, uuid, varchar, numeric, boolean } from "drizzle-orm/pg-core";
import { areas } from "./areas";
import { categories } from "./categories";

export const products = pgTable("products", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name").notNull(),
    price: numeric("price").notNull(),
    status: boolean("status").default(true).notNull(),
    area_id: uuid("area_id").references(() => areas.id).notNull(),
    category_id: uuid("category_id").references(() => categories.id).notNull()
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
