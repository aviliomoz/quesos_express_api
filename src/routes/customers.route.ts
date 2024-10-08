import { Router } from "express";
import { validateToken } from "../middlewares/validations.middleware";
import {
  createCustomer,
  getCustomerById,
  getCustomers,
  updateCustomer,
} from "../controllers/customers.controller";
import { validateSchema } from "../middlewares/validations.middleware";
import { customerSchema } from "../schemas/customers.schema";

const router = Router();

router.get("/", validateToken, getCustomers);
router.get("/:id", validateToken, getCustomerById);
router.post("/", validateToken, validateSchema(customerSchema), createCustomer);
router.put("/:id", validateSchema(customerSchema.partial()), updateCustomer);

export default router;
