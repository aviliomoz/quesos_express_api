import { Router } from "express";
import { validateToken } from "../middlewares/auth.middlewares";
import {
  createSupplier,
  getSuppliers,
  updateSupplier,
} from "../controllers/supplier.controllers";
import { validateSchema } from "../middlewares/validation.middlewares";
import { supplierSchema } from "../schemas/supplier.schemas";

const router = Router();

router.get("/", validateToken, getSuppliers);
router.post("/", validateToken, validateSchema(supplierSchema), createSupplier);
router.put("/:id", validateSchema(supplierSchema.partial()), updateSupplier);

export default router;
