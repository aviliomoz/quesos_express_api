import { Router } from "express";
import { getRestaurants } from "../controllers/restaurants.controller";

const router = Router();

router.get("/restaurants", getRestaurants);

export default router;
