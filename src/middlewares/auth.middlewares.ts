import { Request, Response, NextFunction } from "express";
import { CustomRequest } from "../types";
import { verifyToken, createToken } from "../utils/tokens";
import { AuthError, handleErrorResponse, TokenError } from "../utils/errors";

export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token: string = req.cookies.token;

    if (!token) throw new TokenError("Token not provided");

    const { error, token: decoded_token } = verifyToken(token);

    if (error) {
      res.clearCookie("token");
      throw new TokenError(error);
    }

    if (decoded_token) {
      const expiresIn: number = decoded_token.exp * 1000;

      // Verifica si esta a menos de dos días para expirar
      if (expiresIn - Date.now() < 60 * 60 * 24 * 2 * 1000) {
        const newToken = createToken({ uid: decoded_token.uid });
        res.cookie("token", newToken, { httpOnly: true });
      }

      (req as CustomRequest).user_id = decoded_token.uid;
      next();
    } else {
      throw new TokenError("Error validating token");
    }
  } catch (error) {
    return handleErrorResponse(error, res);
  }
};

export const validateAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const is_admin: boolean = (req as CustomRequest).is_admin;

    if (!is_admin) throw new AuthError("You are not admin");

    next();
  } catch (error) {
    return handleErrorResponse(error, res);
  }
};
