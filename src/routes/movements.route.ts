import { Router } from "express";
import {
  createMovement,
  getMovementById,
  updateMovement,
} from "../controllers/movements.controller";
import { validateToken } from "../middlewares/validations.middleware";
import { validateSchema } from "../middlewares/validations.middleware";
import { movementSchema } from "../schemas/movements.schema";

const router = Router();

router.get("/:id", validateToken, getMovementById);
router.post("/", validateToken, validateSchema(movementSchema), createMovement);
router.put(
  "/:id",
  validateToken,
  validateSchema(movementSchema.partial()),
  updateMovement
);

export default router;
