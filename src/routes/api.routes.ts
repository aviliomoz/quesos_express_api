import { Router } from "express";

import authRouter from "../routes/auth.routes";
import productsRouter from "../routes/product.routes";
import imagesRouter from "../routes/image.routes";

const router = Router();

router.use("/auth", authRouter);
router.use("/products", productsRouter);
router.use("/images", imagesRouter);

export default router;
