import { doublePrecision, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";
import { suppliers } from "./suppliers";

export const purchases = pgTable("purchases", {
  id: uuid("id").defaultRandom().primaryKey(),
  timestamp: timestamp("timestamp").notNull(),
  user_id: uuid("user_id")
    .notNull()
    .references(() => users.id),
  supplier_id: uuid("supplier_id")
    .notNull()
    .references(() => suppliers.id),
  total: doublePrecision("total").notNull(),
});

// Tipos inferidos para purchases
export type Purchase = typeof purchases.$inferSelect;
export type NewPurchase = typeof purchases.$inferInsert;
