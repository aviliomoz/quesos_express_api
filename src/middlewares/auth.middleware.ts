import { Request, Response, NextFunction } from "express";
import { IRequest } from "../types";
import jwt from "jsonwebtoken";

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Unauthorized" });

  const decoded = jwt.verify(token, process.env.JWT_SECRET || "");

  if (!decoded)
    return res.status(500).json({ error: "Error validating session" });

  (req as IRequest).user_id = (decoded as { uid: string }).uid;
  next();
};
