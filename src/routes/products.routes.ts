import { Router } from "express";
import {
  getProductById,
  getProductRecipe,
  getProducts,
} from "../controllers/products.controller";

const router = Router();

router.get("/products", getProducts);
router.get("/products/:product_id", getProductById);
router.get("/products/recipe/:product_id", getProductRecipe);

export default router;
