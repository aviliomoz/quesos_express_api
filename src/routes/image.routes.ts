import { Router } from "express";
import { getImageByName } from "../controllers/image.controllers";

const router = Router();

router.get("/:filename", getImageByName);
router.post("/", () => {});
router.delete("/:filename", () => {});

export default router;
