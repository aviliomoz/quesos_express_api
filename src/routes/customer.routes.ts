import { Router } from "express";
import { validateToken } from "../middlewares/auth.middlewares";
import {
  createCustomer,
  getCustomers,
  updateCustomer,
} from "../controllers/customer.controllers";
import { validateSchema } from "../middlewares/validation.middlewares";
import { customerSchema } from "../schemas/customer.schemas";

const router = Router();

router.get("/", validateToken, getCustomers);
router.post("/", validateToken, validateSchema(customerSchema), createCustomer);
router.put("/:id", validateSchema(customerSchema.partial()), updateCustomer);

export default router;
