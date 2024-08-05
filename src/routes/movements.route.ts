import { Router } from "express";
import {
  addMovementDetailsToMovement,
  createMovement,
  getMovementById,
  getMovementDetailsByMovementId,
  updateMovement,
  updateMovementDetailsByMovementId,
} from "../controllers/movements.controller";
import { validateToken } from "../middlewares/validations.middleware";
import { validateSchema } from "../middlewares/validations.middleware";
import {
  movementDetailSchema,
  movementSchema,
} from "../schemas/movements.schema";

const router = Router();

router.get("/:id", validateToken, getMovementById);
router.post("/", validateToken, validateSchema(movementSchema), createMovement);
router.put(
  "/:id",
  validateToken,
  validateSchema(movementSchema.partial()),
  updateMovement
);

router.get("/details/:id", validateToken, getMovementDetailsByMovementId);

router.post(
  "/details/:id",
  validateToken,
  validateSchema(movementDetailSchema),
  addMovementDetailsToMovement
);

router.put(
  "/details/:id",
  validateToken,
  validateSchema(movementDetailSchema.partial()),
  updateMovementDetailsByMovementId
);

export default router;
