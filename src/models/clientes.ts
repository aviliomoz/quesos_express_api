import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const clientes = pgTable("clientes", {
  id: uuid("id").defaultRandom().primaryKey(),
  dni: varchar("dni").notNull(),
  nombre: varchar("nombre").notNull(),
  apellido: varchar("apellido").notNull(),
  telefono: varchar("telefono"),
  direccion: varchar("direccion"),
});

export type Cliente = typeof clientes.$inferSelect;
export type NewCliente = typeof clientes.$inferInsert;
