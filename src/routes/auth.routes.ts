import { Router } from "express";
import { login, signup } from "../controllers/auth.controller";
import {
  validateLoginBody,
  validateSignupBody,
} from "../middlewares/auth.middleware";

const router = Router();

router.post("/signup", validateSignupBody, signup);
router.post("/login", validateLoginBody, login);

export default router;
