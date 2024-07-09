import {
  pgTable,
  uuid,
  varchar,
  pgEnum,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const movementTypeEnum = pgEnum("movementTypeEnum", ["entry", "output"]);

export const movements = pgTable("movements", {
  id: uuid("id").defaultRandom().primaryKey(),
  type: movementTypeEnum("type").notNull(),
  date: timestamp("date").notNull(),
  description: varchar("description").notNull(),
  user_id: uuid("user_id")
    .notNull()
    .references(() => users.id),
  status: boolean("status").default(true).notNull(),
});

export type Movement = typeof movements.$inferSelect;
export type NewMovement = typeof movements.$inferInsert;
