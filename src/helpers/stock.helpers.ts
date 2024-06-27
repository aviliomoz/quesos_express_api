import { db } from "../libs/drizzle";
import { NewStockEntry, stockEntries } from "../models/stockEntries";

export const createStockEntryHelper = async (entry: NewStockEntry) => {
  const res = await db.insert(stockEntries).values(entry).returning();

  return res[0] || undefined;
};
