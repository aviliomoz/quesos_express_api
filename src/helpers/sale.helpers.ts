import { and, count, eq, gte, lte } from "drizzle-orm";
import { db } from "../libs/drizzle";
import { sale_details } from "../models/sale_details";
import { sales } from "../models/sales";

export const getSaleByIdHelper = async (id: string) => {
  const result = await db.select().from(sales).where(eq(sales.id, id));

  return result;
};

export const getSalesCountHelper = async () => {
  const result = await db.select({ count: count() }).from(sales);

  return result[0].count;
};

export const getSalesHelper = async (filter: {
  status: "pending" | "completed" | "deleted" | "all";
  initial_date: Date;
  final_date: Date;
  limit: number;
  offset: number;
}) => {
  // Construimos la base de la consulta
  const query = db
    .select()
    .from(sales)
    .innerJoin(sale_details, eq(sales.id, sale_details.sale_id));

  // Creamos la condición base de las fechas
  const dateCondition = and(
    gte(sales.date, filter.initial_date),
    lte(sales.date, filter.final_date)
  );

  // Añadimos la condición de estado si no es "all"
  if (filter.status !== "all") {
    query.where(and(dateCondition, eq(sales.status, filter.status)));
  } else {
    query.where(dateCondition);
  }

  // Añadimos las operaciones de limit y offset
  query.limit(filter.limit).offset(filter.offset);

  // Ejecutamos la consulta
  const result = await query.execute();

  return result;
};
