/*
  Warnings:

  - Added the required column `restaurant_id` to the `subproducts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `restaurant_id` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `restaurant_id` to the `supplies` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_subproducts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "um" TEXT NOT NULL,
    "yield" REAL NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "restaurant_id" TEXT NOT NULL,
    CONSTRAINT "subproducts_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_subproducts" ("id", "name", "status", "um", "yield") SELECT "id", "name", "status", "um", "yield" FROM "subproducts";
DROP TABLE "subproducts";
ALTER TABLE "new_subproducts" RENAME TO "subproducts";
CREATE TABLE "new_products" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "restaurant_id" TEXT NOT NULL,
    CONSTRAINT "products_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_products" ("id", "name", "price", "status") SELECT "id", "name", "price", "status" FROM "products";
DROP TABLE "products";
ALTER TABLE "new_products" RENAME TO "products";
CREATE TABLE "new_supplies" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL DEFAULT 0.00,
    "um" TEXT NOT NULL,
    "waste" REAL NOT NULL DEFAULT 0,
    "taxable" BOOLEAN NOT NULL DEFAULT true,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "has_equivalence" BOOLEAN NOT NULL DEFAULT false,
    "equivalence_um" TEXT,
    "equivalence_amount" REAL,
    "restaurant_id" TEXT NOT NULL,
    CONSTRAINT "supplies_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_supplies" ("equivalence_amount", "equivalence_um", "has_equivalence", "id", "name", "price", "status", "taxable", "um", "waste") SELECT "equivalence_amount", "equivalence_um", "has_equivalence", "id", "name", "price", "status", "taxable", "um", "waste" FROM "supplies";
DROP TABLE "supplies";
ALTER TABLE "new_supplies" RENAME TO "supplies";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
