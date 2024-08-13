import { Router } from "express";
import {
  addSaleDetailsToSale,
  createSale,
  getSaleById,
  getSaleDetailsBySaleId,
  getSales,
  getSaleTotal,
  updateSale,
  updateSaleDetailsBySaleId,
} from "../controllers/sales.controller";
import {
  validateSchema,
  validateToken,
} from "../middlewares/validations.middleware";
import { saleDetailSchema, saleSchema } from "../schemas/sales.schema";

const router = Router();

router.get("/", validateToken, getSales);
router.get("/:id", validateToken, getSaleById);
router.get("/total/:id", validateToken, getSaleTotal);
router.get("/details/:id", validateToken, getSaleDetailsBySaleId);
router.post("/", validateToken, validateSchema(saleSchema), createSale);
router.post(
  "/details/:id",
  validateToken,
  validateSchema(saleDetailSchema),
  addSaleDetailsToSale
);
router.put(
  "/:id",
  validateToken,
  validateSchema(saleSchema.partial()),
  updateSale
);
router.put(
  "/details/:id",
  validateToken,
  validateSchema(saleDetailSchema.partial()),
  updateSaleDetailsBySaleId
);

export default router;
