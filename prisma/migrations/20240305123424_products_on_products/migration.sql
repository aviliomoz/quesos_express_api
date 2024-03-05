/*
  Warnings:

  - You are about to drop the `combos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `products_on_combos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "combos";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "products_on_combos";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "products_on_products" (
    "amount" INTEGER NOT NULL DEFAULT 1,
    "base_product_id" TEXT NOT NULL,
    "ingredient_product_id" TEXT NOT NULL,

    PRIMARY KEY ("base_product_id", "ingredient_product_id"),
    CONSTRAINT "products_on_products_base_product_id_fkey" FOREIGN KEY ("base_product_id") REFERENCES "products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "products_on_products_ingredient_product_id_fkey" FOREIGN KEY ("ingredient_product_id") REFERENCES "products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
