import { pgTable, uuid, date, boolean, numeric } from "drizzle-orm/pg-core";
import { clientes } from "./clientes";
import { usuarios } from "./usuarios";

export const ventas = pgTable("ventas", {
  id: uuid("id").defaultRandom().primaryKey(),
  cliente_id: uuid("cliente_id")
    .notNull()
    .references(() => clientes.id),
  fecha_pedido: date("fecha_pedido").notNull(),
  fecha_entrega: date("fecha_entrega"),
  fecha_pago: date("fecha_pago"),
  entregado: boolean("entregado").notNull().default(false),
  pagado: boolean("pagado").notNull().default(false),
  total: numeric("total").notNull(),
  usuario_id: uuid("usuario_id")
    .notNull()
    .references(() => usuarios.id),
});

export type Venta = typeof ventas.$inferSelect;
export type NewVenta = typeof ventas.$inferInsert;
