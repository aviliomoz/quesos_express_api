-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_teams" (
    "is_admin" BOOLEAN NOT NULL DEFAULT false,
    "user_id" TEXT NOT NULL,
    "restaurant_id" TEXT NOT NULL,

    PRIMARY KEY ("user_id", "restaurant_id"),
    CONSTRAINT "teams_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "teams_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_teams" ("restaurant_id", "user_id") SELECT "restaurant_id", "user_id" FROM "teams";
DROP TABLE "teams";
ALTER TABLE "new_teams" RENAME TO "teams";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
