-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_supplies_on_subproducts" (
    "amount" REAL NOT NULL,
    "use_equivalence" BOOLEAN NOT NULL DEFAULT false,
    "subproduct_id" TEXT NOT NULL,
    "supply_id" TEXT NOT NULL,

    PRIMARY KEY ("subproduct_id", "supply_id"),
    CONSTRAINT "supplies_on_subproducts_subproduct_id_fkey" FOREIGN KEY ("subproduct_id") REFERENCES "subproducts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "supplies_on_subproducts_supply_id_fkey" FOREIGN KEY ("supply_id") REFERENCES "supplies" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_supplies_on_subproducts" ("amount", "subproduct_id", "supply_id") SELECT "amount", "subproduct_id", "supply_id" FROM "supplies_on_subproducts";
DROP TABLE "supplies_on_subproducts";
ALTER TABLE "new_supplies_on_subproducts" RENAME TO "supplies_on_subproducts";
CREATE TABLE "new_supplies_on_products" (
    "amount" REAL NOT NULL,
    "use_equivalence" BOOLEAN NOT NULL DEFAULT false,
    "supply_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,

    PRIMARY KEY ("supply_id", "product_id"),
    CONSTRAINT "supplies_on_products_supply_id_fkey" FOREIGN KEY ("supply_id") REFERENCES "supplies" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "supplies_on_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_supplies_on_products" ("amount", "product_id", "supply_id") SELECT "amount", "product_id", "supply_id" FROM "supplies_on_products";
DROP TABLE "supplies_on_products";
ALTER TABLE "new_supplies_on_products" RENAME TO "supplies_on_products";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
