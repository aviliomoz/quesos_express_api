import { Router } from "express";
import { validateSchema } from "../middlewares/validation.middlewares";
import { productSchema } from "../schemas/product.schemas";
import {
  createProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controllers";
import { validateToken } from "../middlewares/auth.middlewares";

const router = Router();

router.get("/", getProducts);
router.post("/", validateToken, validateSchema(productSchema), createProduct);
router.put(
  "/:id",
  validateToken,
  validateSchema(productSchema.partial()),
  updateProduct
);

export default router;
