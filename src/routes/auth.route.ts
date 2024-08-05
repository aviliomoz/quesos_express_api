import { Router } from "express";
import { check, login, logout, signup } from "../controllers/auth.controller";
import { validateSchema } from "../middlewares/validations.middleware";
import { loginSchema, signupSchema } from "../schemas/auth.schema";

const router = Router();

router.post("/signup", validateSchema(signupSchema), signup);
router.post("/login", validateSchema(loginSchema), login);
router.get("/logout", logout);
router.get("/check", check);

export default router;
