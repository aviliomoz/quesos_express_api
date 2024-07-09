import { doublePrecision, pgTable, uuid } from "drizzle-orm/pg-core";
import { products } from "./products";
import { movements } from "./movements";

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

export type MovementDetail = typeof movement_details.$inferSelect;
export type NewMovementDetail = typeof movement_details.$inferInsert;
