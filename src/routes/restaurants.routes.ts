import { Router } from "express";
import {
  createRestaurant,
  getRestaurants,
} from "../controllers/restaurants.controller";
import { validateToken } from "../middlewares/auth.middleware";
import { validateSchema } from "../middlewares/validations.middleware";
import { createRestaurantSchema } from "../schemas/restaurant.schema";

const router = Router();

router.get("/", validateToken, getRestaurants);
router.post(
  "/",
  validateToken,
  validateSchema(createRestaurantSchema),
  createRestaurant
);

export default router;
