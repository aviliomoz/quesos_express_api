import { Router } from "express";

import authRouter from "./auth.route";
import productsRouter from "./products.route";
import customersRouter from "./customers.route";
import suppliersRouter from "./suppliers.route";
import movementsRouter from "./movements.route";
import purchasesRouter from "./purchases.route";
import salesRouter from "./sales.route";

const router = Router();

router.use("/auth", authRouter);
router.use("/products", productsRouter);
router.use("/customers", customersRouter);
router.use("/suppliers", suppliersRouter);
router.use("/movements", movementsRouter);
router.use("/purchases", purchasesRouter);
router.use("/sales", salesRouter);

export default router;
