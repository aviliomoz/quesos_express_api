import { Router } from "express";
import {
  getFullProductRecipe,
  getProductById,
  getProductRecipe,
  getProducts,
} from "../controllers/products.controller";

const router = Router();

router.get("/products", getProducts);
router.get("/products/:product_id", getProductById);
router.get("/products/recipe/:product_id", getProductRecipe);
router.get("/products/full_recipe/:product_id", getFullProductRecipe);

export default router;
