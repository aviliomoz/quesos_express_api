import { Router } from "express";

import authRouter from "../routes/auth.routes";
import productsRouter from "../routes/product.routes";

const router = Router();

router.use("/auth", authRouter);
router.use("/products", productsRouter);

export default router;
