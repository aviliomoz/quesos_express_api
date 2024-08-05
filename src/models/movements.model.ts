import {
  pgTable,
  uuid,
  varchar,
  doublePrecision,
  date,
} from "drizzle-orm/pg-core";
import { users } from "./users.model";

import { products } from "./products.model";

export const movements = pgTable("movements", {
  id: uuid("id").defaultRandom().primaryKey(),
  type: varchar("type").notNull(), // entry | output
  date: date("date").notNull(),
  description: varchar("description"),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  status: varchar("status").default("active").notNull(),
});

export const movement_details = pgTable("movement_details", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id),
  movementId: uuid("movement_id")
    .notNull()
    .references(() => movements.id),
  amount: doublePrecision("amount").notNull(),
});

export type Movement = typeof movements.$inferSelect;
export type NewMovement = typeof movements.$inferInsert;

export type MovementDetail = typeof movement_details.$inferSelect;
export type NewMovementDetail = typeof movement_details.$inferInsert;
