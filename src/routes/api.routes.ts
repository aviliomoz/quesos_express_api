import { Router } from "express";

import authRouter from "../routes/auth.routes";
import productsRouter from "../routes/product.routes";
import customersRouter from "../routes/customers.routes";

const router = Router();

router.use("/auth", authRouter);
router.use("/products", productsRouter);
router.use("/customers", productsRouter);

export default router;
