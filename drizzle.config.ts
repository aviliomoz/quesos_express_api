import { defineConfig } from "drizzle-kit";

export default defineConfig({
    out: "./src/migrations",
    schema: "./src/models/*.ts",
    dialect: "postgresql"
});