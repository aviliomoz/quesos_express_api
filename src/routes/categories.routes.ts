import { Router } from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/categories.controller";
import { validateCategoryType } from "../middlewares/categories.middleware";

const router = Router();

router.get("/", validateCategoryType, getCategories);
router.get("/:id", getCategoryById);
router.post("/", validateCategoryType, createCategory);
router.put("/:id", updateCategory);

export default router;
