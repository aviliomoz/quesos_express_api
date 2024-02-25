import { Request, Response, NextFunction } from "express";
import { ZodError, ZodSchema } from "zod";

export const validateSchema = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      error instanceof ZodError &&
        res.status(400).json({ error: error.errors[0].message });
    }
  };
};
