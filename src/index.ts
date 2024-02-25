import express, { type Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import apiRouter from "./routes/api.routes";

dotenv.config();

const port = process.env.PORT || 5000;
const origins = [process.env.WEB_APP_ORIGIN];

const app: Express = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || origins.includes(origin)) {
        return callback(null, origin);
      }

      return callback(new Error("Unauthorized origin"));
    },
  })
);

app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`[server] Server is running at http://localhost:${port}`);
});
