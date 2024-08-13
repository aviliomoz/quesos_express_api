import { Router } from "express";
import {
  addPurchaseDetailsToPurchase,
  createPurchase,
  getPurchaseById,
  getPurchaseDetailsByPurchaseId,
  getPurchases,
  getPurchaseTotal,
  updatePurchase,
  updatePurchaseDetailsByPurchaseId,
} from "../controllers/purchases.controller";
import { validateToken } from "../middlewares/validations.middleware";
import { validateSchema } from "../middlewares/validations.middleware";
import {
  purchaseDetailSchema,
  purchaseSchema,
} from "../schemas/purchases.schema";

const router = Router();

router.get("/", validateToken, getPurchases);
router.get("/:id", validateToken, getPurchaseById);
router.get("/total/:id", validateToken, getPurchaseTotal);
router.post("/", validateToken, validateSchema(purchaseSchema), createPurchase);
router.put(
  "/:id",
  validateToken,
  validateSchema(purchaseSchema.partial()),
  updatePurchase
);

router.get("/details/:id", validateToken, getPurchaseDetailsByPurchaseId);

router.post(
  "/details/:id",
  validateToken,
  validateSchema(purchaseDetailSchema),
  addPurchaseDetailsToPurchase
);

router.put(
  "/details/:id",
  validateToken,
  validateSchema(purchaseDetailSchema.partial()),
  updatePurchaseDetailsByPurchaseId
);

export default router;
