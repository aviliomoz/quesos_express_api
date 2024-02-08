-- CreateTable
CREATE TABLE "restaurants" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "currency_code" TEXT NOT NULL DEFAULT 'USD',
    "purchase_tax" REAL NOT NULL DEFAULT 18.00,
    "sales_tax" REAL NOT NULL DEFAULT 18.00,
    "status" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "supplies" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL DEFAULT 0.00,
    "um" TEXT NOT NULL,
    "waste" REAL NOT NULL DEFAULT 0,
    "taxable" BOOLEAN NOT NULL DEFAULT true,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "has_equivalence" BOOLEAN NOT NULL DEFAULT false,
    "equivalence_um" TEXT,
    "equivalence_amount" REAL
);

-- CreateTable
CREATE TABLE "subproducts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "um" TEXT NOT NULL,
    "yield" REAL NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "supplies_on_subproducts" (
    "amount" REAL NOT NULL,
    "subproduct_id" TEXT NOT NULL,
    "supply_id" TEXT NOT NULL,

    PRIMARY KEY ("subproduct_id", "supply_id"),
    CONSTRAINT "supplies_on_subproducts_subproduct_id_fkey" FOREIGN KEY ("subproduct_id") REFERENCES "subproducts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "supplies_on_subproducts_supply_id_fkey" FOREIGN KEY ("supply_id") REFERENCES "supplies" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "subproducts_on_subproducts" (
    "amount" REAL NOT NULL,
    "base_subproduct_id" TEXT NOT NULL,
    "ingredient_subproduct_id" TEXT NOT NULL,

    PRIMARY KEY ("base_subproduct_id", "ingredient_subproduct_id"),
    CONSTRAINT "subproducts_on_subproducts_base_subproduct_id_fkey" FOREIGN KEY ("base_subproduct_id") REFERENCES "subproducts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "subproducts_on_subproducts_ingredient_subproduct_id_fkey" FOREIGN KEY ("ingredient_subproduct_id") REFERENCES "subproducts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "supplies_on_products" (
    "amount" REAL NOT NULL,
    "supply_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,

    PRIMARY KEY ("supply_id", "product_id"),
    CONSTRAINT "supplies_on_products_supply_id_fkey" FOREIGN KEY ("supply_id") REFERENCES "supplies" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "supplies_on_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "subproducts_on_products" (
    "amount" REAL NOT NULL,
    "subproduct_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,

    PRIMARY KEY ("subproduct_id", "product_id"),
    CONSTRAINT "subproducts_on_products_subproduct_id_fkey" FOREIGN KEY ("subproduct_id") REFERENCES "subproducts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "subproducts_on_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
