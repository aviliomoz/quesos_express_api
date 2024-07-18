import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { sendErrorResponse } from "../utils/responses";

export const validateSchema = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      return sendErrorResponse(res, error, "Error de validación");
    }
  };
};
