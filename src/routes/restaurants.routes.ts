import { Router } from "express";
import {
  createRestaurant,
  getRestaurants,
  toggleRestaurantStatus,
  updateRestaurant,
} from "../controllers/restaurants.controller";
import {
  validateAdmin,
  validateMember,
  validateToken,
} from "../middlewares/auth.middleware";
import { validateSchema } from "../middlewares/validations.middleware";
import {
  createRestaurantSchema,
  updateRestaurantSchema,
} from "../schemas/restaurant.schema";

const router = Router();

router.get("/", validateToken, getRestaurants);

router.post(
  "/",
  validateToken,
  validateSchema(createRestaurantSchema),
  createRestaurant
);

router.put(
  "/:id",
  validateToken,
  validateMember("params"),
  validateAdmin,
  validateSchema(updateRestaurantSchema),
  updateRestaurant
);

router.patch(
  "/:id",
  validateToken,
  validateMember("params"),
  validateAdmin,
  toggleRestaurantStatus
);

export default router;
