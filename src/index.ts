import express, { type Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import restaurantsRouter from "./routes/restaurants.routes";
import productsRouter from "./routes/products.routes";

dotenv.config();

const port = process.env.PORT || 5000;
const origins = [process.env.WEB_APP_ORIGIN];

const app: Express = express();

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || origins.includes(origin)) {
        return callback(null, origin);
      }

      return callback(new Error("Unauthorized origin"));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api", restaurantsRouter);
app.use("/api", productsRouter);

app.listen(port, () => {
  console.log(`[server] Server is running at http://localhost:${port}`);
});
