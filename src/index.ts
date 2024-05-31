import express, { type Express } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { corsConfig } from "./config/cors";

import apiRouter from "./routes/api.routes";

dotenv.config({ path: ".env" });

const port = process.env.PORT || 5000;

const app: Express = express();

app.use(express.json());
app.use(cookieParser());
app.use(corsConfig());

app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`[server] Server is running at http://localhost:${port}`);
});
