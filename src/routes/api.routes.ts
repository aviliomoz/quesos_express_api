import { Router } from "express";

import authRouter from "../routes/auth.routes";
import restaurantsRouter from "../routes/restaurants.routes";

const router = Router();

router.use("/auth", authRouter);
router.use("/restaurants", restaurantsRouter);

export default router;
