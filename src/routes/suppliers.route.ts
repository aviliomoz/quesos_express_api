import { Router } from "express";
import { validateToken } from "../middlewares/validations.middleware";
import {
  createSupplier,
  getSupplierById,
  getSuppliers,
  updateSupplier,
} from "../controllers/suppliers.controller";
import { validateSchema } from "../middlewares/validations.middleware";
import { supplierSchema } from "../schemas/suppliers.schema";

const router = Router();

router.get("/", validateToken, getSuppliers);
router.get("/:id", validateToken, getSupplierById);
router.post("/", validateToken, validateSchema(supplierSchema), createSupplier);
router.put("/:id", validateSchema(supplierSchema.partial()), updateSupplier);

export default router;
