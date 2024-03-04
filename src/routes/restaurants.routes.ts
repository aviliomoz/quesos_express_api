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
import { restaurantSchema } from "../schemas/restaurant.schema";
import membersRouter from "../routes/members.routes";

const router = Router();

router.get("/", validateToken, getRestaurants);

router.get("/:restaurant_id", validateToken, validateMember, (req, res) => {
  return res.status(200).json({
    route: "Get restaurant",
  });
});

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

router.patch(
  "/:restaurant_id",
  validateToken,
  validateMember,
  validateAdmin,
  toggleRestaurantStatus
);

router.use("/:restaurant_id", membersRouter);

export default router;
