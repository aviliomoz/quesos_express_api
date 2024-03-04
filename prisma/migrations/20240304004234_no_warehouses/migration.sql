/*
  Warnings:

  - You are about to drop the `subproducts_on_warehouses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `supplies_on_warehouses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `warehouses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "subproducts_on_warehouses";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "supplies_on_warehouses";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "warehouses";
PRAGMA foreign_keys=on;
