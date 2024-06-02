import { pgTable, uuid, varchar, smallint, boolean } from "drizzle-orm/pg-core";
import { currencies } from "./currencies";

export const restaurants = pgTable("restaurants", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name").notNull(),
    currency_code: varchar("currency_code", { length: 3 }).references(() => currencies.code).notNull(),
    purchase_tax: smallint("purchase_tax").default(18).notNull(),
    sales_tax: smallint("purchase_tax").default(18).notNull(),
    status: boolean("status").default(true).notNull()
})

export type Restaurant = typeof restaurants.$inferSelect
export type NewRestaurant = typeof restaurants.$inferInsert