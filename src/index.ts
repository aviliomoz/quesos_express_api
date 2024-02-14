import express, { type Express } from "express";
import dotenv from "dotenv";
import cors from "cors";

import restaurantsRouter from "./routes/restaurants.routes";
import productsRouter from "./routes/products.routes";
import authRouter from "./routes/auth.routes";

dotenv.config();

const port = process.env.PORT || 5000;
const origins = [process.env.WEB_APP_ORIGIN];

const app: Express = express();

app.use(express.json());

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

// Routes
app.use("/api", restaurantsRouter);
app.use("/api", productsRouter);
app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log(`[server] Server is running at http://localhost:${port}`);
});
