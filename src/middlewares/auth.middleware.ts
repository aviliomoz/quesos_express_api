import { Request, Response, NextFunction } from "express";
import { IRequest } from "../types";
import { verifyToken, createToken } from "../utils/tokens";
import { AuthError, handleErrorResponse, TokenError } from "../utils/errors";
import { validateMemberHelper } from "../helpers/validations.helpers";

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

      (req as IRequest).user_id = decoded_token.uid;
      next();
    } else {
      throw new TokenError("Error validating token");
    }
  } catch (error) {
    return handleErrorResponse(error, res);
  }
};

export const validateMember = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user_id = (req as IRequest).user_id;
  const restaurant_id: string = req.params.restaurant_id;

  try {
    const member = await validateMemberHelper(user_id, restaurant_id);

    if (!member) throw new AuthError("You are not member of the team");

    (req as IRequest).is_admin = member.is_admin;
    (req as IRequest).restaurant_id = restaurant_id;

    next();
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
    const is_admin: boolean = (req as IRequest).is_admin;

    if (!is_admin) throw new AuthError("You are not admin");

    next();
  } catch (error) {
    return handleErrorResponse(error, res);
  }
};
