import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  doublePrecision,
} from "drizzle-orm/pg-core";
import { users } from "./users";

import { products } from "./products";

export const movements = pgTable("movements", {
  id: uuid("id").defaultRandom().primaryKey(),
  type: varchar("type").notNull(),
  date: timestamp("date").notNull(),
  description: varchar("description").notNull(),
  user_id: uuid("user_id")
    .notNull()
    .references(() => users.id),
  status: varchar("status").default("active").notNull(),
});

export const movement_details = pgTable("movement_details", {
  id: uuid("id").defaultRandom().primaryKey(),
  product_id: uuid("product_id")
    .notNull()
    .references(() => products.id),
  movement_id: uuid("movement_id")
    .notNull()
    .references(() => movements.id),
  amount: doublePrecision("amount").notNull(),
});

export type Movement = typeof movements.$inferSelect;
export type NewMovement = typeof movements.$inferInsert;

export type MovementDetail = typeof movement_details.$inferSelect;
export type NewMovementDetail = typeof movement_details.$inferInsert;
