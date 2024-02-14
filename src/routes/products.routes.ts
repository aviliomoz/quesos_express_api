import { Router } from "express";
import {
  getProductById,
  getProducts,
} from "../controllers/products.controller";

const router = Router();

router.get("/products", getProducts);
router.get("/products/:product_id", getProductById);

export default router;
