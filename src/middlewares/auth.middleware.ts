import { Request, Response, NextFunction } from "express";
import { IRequest } from "../types";
import jwt from "jsonwebtoken";

export const validateToken = (req: Request, res: Response, next: NextFunction) => {};
