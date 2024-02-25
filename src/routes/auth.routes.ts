import { Router } from "express";
import { login, signup } from "../controllers/auth.controller";
import { validateSchema } from "../middlewares/validations.middleware";
import { loginSchema, signupSchema } from "../schemas/auth.schema";

const router = Router();

router.post("/signup", validateSchema(signupSchema), signup);
router.post("/login", validateSchema(loginSchema), login);

export default router;
