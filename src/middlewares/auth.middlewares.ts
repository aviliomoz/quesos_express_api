import { Request, Response, NextFunction } from "express";
import { CustomRequest } from "../types";
import { verifyToken, createToken } from "../utils/tokens";
import { handleErrorResponse, TokenError } from "../utils/errors";

export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: string = req.cookies.token;

  try {
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
        const newToken = createToken(decoded_token.user);
        res.cookie("token", newToken, { httpOnly: true });
      }

      (req as CustomRequest).user = decoded_token.user;
      next();
    } else {
      throw new TokenError("Error validating token");
    }
  } catch (error) {
    return handleErrorResponse(error, res);
  }
};
