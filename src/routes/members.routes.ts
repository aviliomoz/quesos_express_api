import { Router } from "express";

import categoriesRouter from "../routes/categories.routes";

const router = Router();

router.use("/categories", categoriesRouter);
// areas
// supplies
// subproducts
// products
// combos

export default router;
