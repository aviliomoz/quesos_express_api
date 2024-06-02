import { pgTable, varchar } from "drizzle-orm/pg-core";

export const currencies = pgTable("currencies", {
    code: varchar("code", { length: 3 }).primaryKey(),
    country: varchar("country").notNull(),
    name: varchar("name").notNull(),
    symbol: varchar("symbol", { length: 10 }).notNull(),
    flag: varchar("flag", { length: 10 }).notNull()
})

export type Currency = typeof currencies.$inferSelect
export type NewCurrency = typeof currencies.$inferInsert