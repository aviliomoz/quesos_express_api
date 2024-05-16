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
CREATE TABLE "users_on_restaurants" (
    "is_admin" BOOLEAN NOT NULL DEFAULT false,
    "user_id" TEXT NOT NULL,
    "restaurant_id" TEXT NOT NULL,

    PRIMARY KEY ("user_id", "restaurant_id"),
    CONSTRAINT "users_on_restaurants_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "users_on_restaurants_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
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
CREATE TABLE "supply_categories" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "restaurant_id" TEXT NOT NULL,
    CONSTRAINT "supply_categories_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "subproduct_categories" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "restaurant_id" TEXT NOT NULL,
    CONSTRAINT "subproduct_categories_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "product_categories" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "restaurant_id" TEXT NOT NULL,
    CONSTRAINT "product_categories_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "combo_categories" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "restaurant_id" TEXT NOT NULL,
    CONSTRAINT "combo_categories_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "supplies" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "taxable" BOOLEAN NOT NULL DEFAULT true,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "category_id" TEXT NOT NULL,
    "restaurant_id" TEXT NOT NULL,
    CONSTRAINT "supplies_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "supply_categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "supplies_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "supply_presentations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "price" REAL NOT NULL DEFAULT 0.00,
    "um" TEXT NOT NULL,
    "supply_id" TEXT NOT NULL,
    CONSTRAINT "supply_presentations_supply_id_fkey" FOREIGN KEY ("supply_id") REFERENCES "supplies" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
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
    CONSTRAINT "subproducts_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "subproduct_categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "subproducts_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL DEFAULT 0,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "category_id" TEXT NOT NULL,
    "restaurant_id" TEXT NOT NULL,
    CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "product_categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "products_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "combos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL DEFAULT 0.00,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "category_id" TEXT NOT NULL,
    "restaurant_id" TEXT NOT NULL,
    CONSTRAINT "combos_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "combo_categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "combos_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "supply_presentations_on_subproducts" (
    "amount" REAL NOT NULL DEFAULT 1,
    "waste" REAL NOT NULL DEFAULT 0,
    "subproduct_id" TEXT NOT NULL,
    "supply_presentation_id" TEXT NOT NULL,

    PRIMARY KEY ("supply_presentation_id", "subproduct_id"),
    CONSTRAINT "supply_presentations_on_subproducts_subproduct_id_fkey" FOREIGN KEY ("subproduct_id") REFERENCES "subproducts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "supply_presentations_on_subproducts_supply_presentation_id_fkey" FOREIGN KEY ("supply_presentation_id") REFERENCES "supply_presentations" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "subproducts_on_subproducts" (
    "amount" REAL NOT NULL DEFAULT 1,
    "waste" REAL NOT NULL DEFAULT 0,
    "base_subproduct_id" TEXT NOT NULL,
    "ingredient_subproduct_id" TEXT NOT NULL,

    PRIMARY KEY ("base_subproduct_id", "ingredient_subproduct_id"),
    CONSTRAINT "subproducts_on_subproducts_base_subproduct_id_fkey" FOREIGN KEY ("base_subproduct_id") REFERENCES "subproducts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "subproducts_on_subproducts_ingredient_subproduct_id_fkey" FOREIGN KEY ("ingredient_subproduct_id") REFERENCES "subproducts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "supply_presentations_on_products" (
    "amount" REAL NOT NULL DEFAULT 1,
    "waste" REAL NOT NULL DEFAULT 0,
    "supply_presentation_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,

    PRIMARY KEY ("supply_presentation_id", "product_id"),
    CONSTRAINT "supply_presentations_on_products_supply_presentation_id_fkey" FOREIGN KEY ("supply_presentation_id") REFERENCES "supply_presentations" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "supply_presentations_on_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "subproducts_on_products" (
    "amount" REAL NOT NULL DEFAULT 1,
    "waste" REAL NOT NULL DEFAULT 0,
    "subproduct_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,

    PRIMARY KEY ("subproduct_id", "product_id"),
    CONSTRAINT "subproducts_on_products_subproduct_id_fkey" FOREIGN KEY ("subproduct_id") REFERENCES "subproducts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "subproducts_on_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "products_on_combos" (
    "amount" INTEGER NOT NULL DEFAULT 1,
    "combo_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,

    PRIMARY KEY ("product_id", "combo_id"),
    CONSTRAINT "products_on_combos_combo_id_fkey" FOREIGN KEY ("combo_id") REFERENCES "combos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "products_on_combos_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
