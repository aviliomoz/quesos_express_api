import { Router } from "express";
import { validateSchema } from "../middlewares/validation.middlewares";
import { productSchema } from "../schemas/product.schemas";
import { createProduct, getProducts } from "../controllers/product.controllers";
import { validateToken } from "../middlewares/auth.middlewares";

const router = Router();

router.get("/", getProducts);
router.post("/", validateSchema(productSchema), validateToken, createProduct);

export default router;
