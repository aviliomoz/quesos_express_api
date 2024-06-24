import { pgTable, uuid, boolean } from "drizzle-orm/pg-core";
import { users } from "./users";
import { restaurants } from "./restaurants";

export const teams = pgTable("teams", {
    id: uuid("id").defaultRandom().primaryKey(),
    user_id: uuid("user_id").references(() => users.id).notNull(),
    restaurant_id: uuid("restaurant_id").references(() => restaurants.id).notNull(),
    is_admin: boolean("is_admin").default(false).notNull()
});

export type Team = typeof teams.$inferSelect;
export type NewTeam = typeof teams.$inferInsert;
