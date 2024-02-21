-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

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
CREATE TABLE "teams" (
    "user_id" TEXT NOT NULL,
    "restaurant_id" TEXT NOT NULL,

    PRIMARY KEY ("user_id", "restaurant_id"),
    CONSTRAINT "teams_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "teams_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "areas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "restaurant_id" TEXT NOT NULL,
    CONSTRAINT "areas_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "supplies_categories" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "restaurant_id" TEXT NOT NULL,
    CONSTRAINT "supplies_categories_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
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
    "equivalence_amount" REAL,
    "category_id" TEXT NOT NULL,
    "restaurant_id" TEXT NOT NULL,
    CONSTRAINT "supplies_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "supplies_categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "supplies_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "subproducts_categories" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "restaurant_id" TEXT NOT NULL,
    CONSTRAINT "subproducts_categories_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "subproducts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "um" TEXT NOT NULL,
    "yield" REAL NOT NULL DEFAULT 1,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "category_id" TEXT NOT NULL,
    "restaurant_id" TEXT NOT NULL,
    CONSTRAINT "subproducts_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "subproducts_categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "subproducts_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "products_categories" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "restaurant_id" TEXT NOT NULL,
    CONSTRAINT "products_categories_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL DEFAULT 0,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "category_id" TEXT NOT NULL,
    "restaurant_id" TEXT NOT NULL,
    CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "products_categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "products_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "combos_categories" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "restaurant_id" TEXT NOT NULL,
    CONSTRAINT "combos_categories_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "combos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL DEFAULT 0,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "category_id" TEXT NOT NULL,
    "restaurant_id" TEXT NOT NULL,
    CONSTRAINT "combos_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "combos_categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "combos_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "products_on_combos" (
    "amount" INTEGER NOT NULL DEFAULT 1,
    "product_id" TEXT NOT NULL,
    "combo_id" TEXT NOT NULL,

    PRIMARY KEY ("product_id", "combo_id"),
    CONSTRAINT "products_on_combos_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "products_on_combos_combo_id_fkey" FOREIGN KEY ("combo_id") REFERENCES "combos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "warehouses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "restaurant_id" TEXT NOT NULL,
    CONSTRAINT "warehouses_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "supplies_on_warehouses" (
    "min_stock" REAL,
    "max_stock" REAL,
    "supply_id" TEXT NOT NULL,
    "warehouse_id" TEXT NOT NULL,

    PRIMARY KEY ("supply_id", "warehouse_id"),
    CONSTRAINT "supplies_on_warehouses_supply_id_fkey" FOREIGN KEY ("supply_id") REFERENCES "supplies" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "supplies_on_warehouses_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "warehouses" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "subproducts_on_warehouses" (
    "min_stock" REAL,
    "max_stock" REAL,
    "subproduct_id" TEXT NOT NULL,
    "warehouse_id" TEXT NOT NULL,

    PRIMARY KEY ("subproduct_id", "warehouse_id"),
    CONSTRAINT "subproducts_on_warehouses_subproduct_id_fkey" FOREIGN KEY ("subproduct_id") REFERENCES "subproducts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "subproducts_on_warehouses_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "warehouses" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "supplies_on_subproducts" (
    "amount" REAL NOT NULL DEFAULT 1,
    "use_equivalence" BOOLEAN NOT NULL DEFAULT false,
    "subproduct_id" TEXT NOT NULL,
    "supply_id" TEXT NOT NULL,

    PRIMARY KEY ("subproduct_id", "supply_id"),
    CONSTRAINT "supplies_on_subproducts_subproduct_id_fkey" FOREIGN KEY ("subproduct_id") REFERENCES "subproducts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "supplies_on_subproducts_supply_id_fkey" FOREIGN KEY ("supply_id") REFERENCES "supplies" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "subproducts_on_subproducts" (
    "amount" REAL NOT NULL DEFAULT 1,
    "base_subproduct_id" TEXT NOT NULL,
    "ingredient_subproduct_id" TEXT NOT NULL,

    PRIMARY KEY ("base_subproduct_id", "ingredient_subproduct_id"),
    CONSTRAINT "subproducts_on_subproducts_base_subproduct_id_fkey" FOREIGN KEY ("base_subproduct_id") REFERENCES "subproducts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "subproducts_on_subproducts_ingredient_subproduct_id_fkey" FOREIGN KEY ("ingredient_subproduct_id") REFERENCES "subproducts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "supplies_on_products" (
    "amount" REAL NOT NULL DEFAULT 1,
    "use_equivalence" BOOLEAN NOT NULL DEFAULT false,
    "supply_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,

    PRIMARY KEY ("supply_id", "product_id"),
    CONSTRAINT "supplies_on_products_supply_id_fkey" FOREIGN KEY ("supply_id") REFERENCES "supplies" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "supplies_on_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "subproducts_on_products" (
    "amount" REAL NOT NULL DEFAULT 1,
    "subproduct_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,

    PRIMARY KEY ("subproduct_id", "product_id"),
    CONSTRAINT "subproducts_on_products_subproduct_id_fkey" FOREIGN KEY ("subproduct_id") REFERENCES "subproducts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "subproducts_on_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
