import { Router } from "express";
import { login, logout, signup } from "../controllers/auth.controllers";
import { validateSchema } from "../middlewares/validation.middlewares";
import { loginSchema, signupSchema } from "../schemas/auth.schemas";

const router = Router();

router.post("/signup", validateSchema(signupSchema), signup);
router.post("/login", validateSchema(loginSchema), login);
router.get("/logout", logout);

export default router;
