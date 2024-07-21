import { Router } from "express";
import { validateToken } from "../middlewares/auth.middlewares";
import { validateSchema } from "../middlewares/validation.middlewares";
import { saleSchema } from "../schemas/sale.schemas";
import { getSales } from "../controllers/sale.controllers";

const router = Router();

router.get("/", validateToken, getSales);
router.post("/", validateToken, validateSchema(saleSchema), () => {});
router.put("/:id", validateToken, validateSchema(saleSchema)), () => {};

export default router;
