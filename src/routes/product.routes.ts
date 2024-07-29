import { Router } from "express";
import { validateSchema } from "../middlewares/validation.middlewares";
import { productSchema } from "../schemas/product.schemas";
import {
  createProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/product.controllers";
import { validateToken } from "../middlewares/auth.middlewares";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.get("/kardex/:id", () => {});
router.post("/", validateToken, validateSchema(productSchema), createProduct);
router.put(
  "/:id",
  validateToken,
  validateSchema(productSchema.partial()),
  updateProduct
);

export default router;
