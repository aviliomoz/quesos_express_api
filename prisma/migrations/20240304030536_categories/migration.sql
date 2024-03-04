/*
  Warnings:

  - You are about to drop the `combos_categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `products_categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `subproducts_categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `supplies_categories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "combos_categories";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "products_categories";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "subproducts_categories";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "supplies_categories";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "restaurant_id" TEXT NOT NULL,
    CONSTRAINT "categories_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_combos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL DEFAULT 0,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "category_id" TEXT NOT NULL,
    "restaurant_id" TEXT NOT NULL,
    CONSTRAINT "combos_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "combos_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_combos" ("category_id", "id", "name", "price", "restaurant_id", "status") SELECT "category_id", "id", "name", "price", "restaurant_id", "status" FROM "combos";
DROP TABLE "combos";
ALTER TABLE "new_combos" RENAME TO "combos";
CREATE TABLE "new_products" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL DEFAULT 0,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "category_id" TEXT NOT NULL,
    "restaurant_id" TEXT NOT NULL,
    CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "products_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_products" ("category_id", "id", "name", "price", "restaurant_id", "status") SELECT "category_id", "id", "name", "price", "restaurant_id", "status" FROM "products";
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
    "category_id" TEXT NOT NULL,
    "restaurant_id" TEXT NOT NULL,
    CONSTRAINT "supplies_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "supplies_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_supplies" ("category_id", "equivalence_amount", "equivalence_um", "has_equivalence", "id", "name", "price", "restaurant_id", "status", "taxable", "um", "waste") SELECT "category_id", "equivalence_amount", "equivalence_um", "has_equivalence", "id", "name", "price", "restaurant_id", "status", "taxable", "um", "waste" FROM "supplies";
DROP TABLE "supplies";
ALTER TABLE "new_supplies" RENAME TO "supplies";
CREATE TABLE "new_subproducts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "um" TEXT NOT NULL,
    "yield" REAL NOT NULL DEFAULT 1,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "category_id" TEXT NOT NULL,
    "restaurant_id" TEXT NOT NULL,
    CONSTRAINT "subproducts_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "subproducts_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_subproducts" ("category_id", "id", "name", "restaurant_id", "status", "um", "yield") SELECT "category_id", "id", "name", "restaurant_id", "status", "um", "yield" FROM "subproducts";
DROP TABLE "subproducts";
ALTER TABLE "new_subproducts" RENAME TO "subproducts";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
