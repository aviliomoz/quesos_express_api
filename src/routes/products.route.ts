import { Router } from "express";
import { validateSchema } from "../middlewares/validations.middleware";
import { productSchema } from "../schemas/products.schema";
import {
  createProduct,
  getKardex,
  getProductById,
  getProducts,
  getStock,
  updateProduct,
} from "../controllers/products.controller";
import { validateToken } from "../middlewares/validations.middleware";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", validateToken, validateSchema(productSchema), createProduct);
router.put(
  "/:id",
  validateToken,
  validateSchema(productSchema.partial()),
  updateProduct
);

router.get("/kardex/:id", getKardex);
router.get("/stock/:id", getStock);

export default router;
