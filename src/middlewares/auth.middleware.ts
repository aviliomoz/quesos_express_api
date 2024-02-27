import { Request, Response, NextFunction } from "express";
import { IRequest } from "../types";
import jwt from "jsonwebtoken";
import { verifyToken, createToken, TokenError } from "../utils/tokens";
import { prisma } from "../libs/prisma";

class NotMemberError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.cookies;

    if (!token) throw new TokenError("Token not provided");

    const { error, token: decoded_token } = await verifyToken(token);

    if (error) {
      res.clearCookie("token");

      if (error.expired) throw new TokenError("Unauthorized: Expired token");

      throw new Error(error.message);
    }

    if (decoded_token) {
      const expiresIn: number = decoded_token.exp * 1000;

      // Verifica si esta a menos de dos días para expirar
      if (expiresIn - Date.now() < 60 * 60 * 24 * 2 * 1000) {
        const newToken = createToken({ uid: decoded_token.uid });
        res.cookie("token", newToken);
      }

      (req as IRequest).user_id = decoded_token.uid;
      next();
    } else {
      throw new TokenError("Error validating token");
    }
  } catch (error) {
    if (error instanceof TokenError) {
      return res.status(401).json({ error: error.message });
    } else if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

export const validateMember = (from: "body" | "params") => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user_id = (req as IRequest).user_id;
      const restaurant_id: string =
        from === "body" ? req.body.restaurant_id : req.params.id;

      const team = await prisma.team.findFirst({
        where: { user_id, restaurant_id },
      });

      if (!team) throw new NotMemberError("You are not member of the team");

      next();
    } catch (error) {
      if (error instanceof NotMemberError) {
        return res.status(401).json({ error: error.message });
      } else if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
    }
  };
};
