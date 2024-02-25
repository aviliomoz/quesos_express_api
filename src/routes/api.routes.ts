import { Router } from "express";

import authRouter from "../routes/auth.routes";
import productsRouter from "../routes/products.routes";
import restaurantsRouter from "../routes/restaurants.routes";

const router = Router();

router.use("/auth", authRouter);
router.use("/products", productsRouter);
router.use("/restaurants", restaurantsRouter);

export default router;
