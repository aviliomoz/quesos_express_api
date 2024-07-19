import { Router } from "express";

import authRouter from "../routes/auth.routes";
import productsRouter from "../routes/product.routes";
import customersRouter from "./customer.routes";
import suppliersRouter from "./supplier.routes";

const router = Router();

router.use("/auth", authRouter);
router.use("/products", productsRouter);
router.use("/customers", customersRouter);
router.use("/suppliers", suppliersRouter);

export default router;
