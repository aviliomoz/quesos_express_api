import { Router } from "express";
import {
  createRestaurant,
  getRestaurants,
  updateRestaurant,
} from "../controllers/restaurants.controller";
import {
  validateAdmin,
  validateMember,
  validateToken,
} from "../middlewares/auth.middleware";
import { validateSchema } from "../middlewares/validations.middleware";
import { restaurantSchema } from "../schemas/restaurant.schema";
import membersRouter from "../routes/members.routes";

const router = Router();

router.get("/", validateToken, getRestaurants);

router.post(
  "/",
  validateToken,
  validateSchema(restaurantSchema),
  createRestaurant
);

router.put(
  "/:restaurant_id",
  validateToken,
  validateMember,
  validateAdmin,
  validateSchema(restaurantSchema.partial()),
  updateRestaurant
);

router.use("/:restaurant_id", validateToken, validateMember, membersRouter);

export default router;
