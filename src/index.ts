import express, { type Express } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { corsConfig } from "./config/cors";
import api from "./routes/api.route";

dotenv.config({ path: ".env" });

const app: Express = express();

app.use(corsConfig());
app.use(cookieParser());
app.use(express.json());
app.use(api);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`[server] Server is running at http://localhost:${port}`);
});
