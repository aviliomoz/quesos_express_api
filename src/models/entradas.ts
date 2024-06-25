import { pgTable, uuid, date, varchar, integer } from "drizzle-orm/pg-core";
import { productos } from "./productos";
import { usuarios } from "./usuarios";

export const entradas = pgTable("entradas", {
  id: uuid("id").defaultRandom().primaryKey(),
  producto_id: uuid("producto_id")
    .notNull()
    .references(() => productos.id),
  cantidad: integer("cantidad").notNull(),
  fecha: date("fecha").notNull(),
  concepto: varchar("concepto").notNull(),
  usuario_id: uuid("usuario_id")
    .notNull()
    .references(() => usuarios.id),
});

export type Entrada = typeof entradas.$inferSelect;
export type NewEntrada = typeof entradas.$inferInsert;
