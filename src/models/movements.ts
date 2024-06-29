import {
  pgTable,
  uuid,
  varchar,
  pgEnum,
  timestamp,
  doublePrecision,
} from "drizzle-orm/pg-core";
import { products } from "./products";
import { users } from "./users";

export const movementTypeEnum = pgEnum("movementTypeEnum", ["entry", "output"]);

export const movements = pgTable("movements", {
  id: uuid("id").defaultRandom().primaryKey(),
  type: movementTypeEnum("type").notNull(),
  product_id: uuid("product_id")
    .notNull()
    .references(() => products.id),
  amount: doublePrecision("amount").notNull(),
  date: timestamp("date").notNull(),
  description: varchar("description").notNull(),
  stock: doublePrecision("stock").notNull(),
  user_id: uuid("user_id")
    .notNull()
    .references(() => users.id),
});

export type Movement = typeof movements.$inferSelect;
export type NewMovement = typeof movements.$inferInsert;
