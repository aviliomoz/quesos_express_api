import { pgTable, unique, uuid, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name").notNull(),
    email: varchar("email").unique().notNull(),
    password: varchar("password").notNull()
})

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;