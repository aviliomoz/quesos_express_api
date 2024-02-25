import { Request, Response, NextFunction } from "express";
import { IRequest } from "../types";
import jwt from "jsonwebtoken";
import { loginSchema, signupSchema } from "../schemas/auth.schema";
import { ZodError } from "zod";

export const validateSignupBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    signupSchema.parse(req.body);

    next();
  } catch (error) {
    error instanceof ZodError &&
      res.status(400).json({ error: error.errors[0].message });
  }
};

export const validateLoginBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    loginSchema.parse(req.body);

    next();
  } catch (error) {
    error instanceof ZodError &&
      res.status(400).json({ error: error.errors[0].message });
  }
};
