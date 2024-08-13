import {
  pgTable,
  uuid,
  varchar,
  doublePrecision,
  date,
} from "drizzle-orm/pg-core";

import { products } from "./products.model";

export const movements = pgTable("movements", {
  id: uuid("id").defaultRandom().primaryKey(),
  type: varchar("type").notNull(), // entry | output
  date: date("date").notNull(),
  description: varchar("description"),
  status: varchar("status").default("active").notNull(),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id),
  amount: doublePrecision("amount").notNull(),
});

export type Movement = typeof movements.$inferSelect;
export type NewMovement = typeof movements.$inferInsert;
