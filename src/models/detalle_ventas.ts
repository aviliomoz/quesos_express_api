import { pgTable, uuid, numeric, varchar, integer } from "drizzle-orm/pg-core";
import { ventas } from "./ventas";
import { productos } from "./productos";

export const detalle_ventas = pgTable("detalle_ventas", {
  id: uuid("id").defaultRandom().primaryKey(),
  venta_id: uuid("venta_id")
    .notNull()
    .references(() => ventas.id),
  producto_id: uuid("producto_id")
    .notNull()
    .references(() => productos.id),
  cantidad: integer("cantidad").notNull(),
  precio: numeric("precio").notNull(),
  descuento: numeric("descuento"),
  concepto_descuento: varchar("concepto_descuento"),
  total: numeric("total").notNull(),
});

export type DetalleVenta = typeof detalle_ventas.$inferSelect;
export type NewDetalleVenta = typeof detalle_ventas.$inferInsert;
