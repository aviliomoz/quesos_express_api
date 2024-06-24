import { pgTable, uuid, varchar, boolean } from "drizzle-orm/pg-core";
import { restaurants } from "./restaurants";

export const areas = pgTable("areas", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name").notNull(),
    status: boolean("status").default(true).notNull(),
    restaurant_id: uuid("restaurant_id").references(() => restaurants.id).notNull()
});

export type Area = typeof areas.$inferSelect;
export type NewArea = typeof areas.$inferInsert;
