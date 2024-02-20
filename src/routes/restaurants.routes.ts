import { Router } from "express";
import { getRestaurants } from "../controllers/restaurants.controller";
import { validateToken } from "../middlewares/auth.middleware";

const router = Router();

router.get("/restaurants", validateToken, getRestaurants);

export default router;
