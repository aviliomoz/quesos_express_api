import { pgTable, uuid, date, varchar, integer } from "drizzle-orm/pg-core";
import { products } from "./products";
import { users } from "./users";

export const stockEntries = pgTable("stock_entries", {
  id: uuid("id").defaultRandom().primaryKey(),
  product_id: uuid("product_id")
    .notNull()
    .references(() => products.id),
  amount: integer("amount").notNull(),
  date: date("date").notNull(),
  description: varchar("description").notNull(),
  user_id: uuid("user_id")
    .notNull()
    .references(() => users.id),
});

export type StockEntry = typeof stockEntries.$inferSelect;
export type NewStockEntry = typeof stockEntries.$inferInsert;
