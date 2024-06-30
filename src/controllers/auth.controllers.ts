import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { hashPassword, validatePassword } from "../utils/crypto";
import { createToken } from "../utils/tokens";
import { createUser, getUserByEmail } from "../helpers/auth.helpers";
import { handleErrorResponse, AuthError } from "../utils/errors";
import { NewUser, User } from "../models/users";
import { Token } from "../types";

export const signup = async (req: Request, res: Response) => {
  const { name, email, password }: NewUser = req.body;

  try {
    const foundUser = await getUserByEmail(email);

    if (foundUser)
      throw new AuthError("El correo ingresado ya se encuentra registrado");

    const hashedPassword = await hashPassword(password);

    const user = await createUser({ name, email, password: hashedPassword });

    const token = createToken(user);

    return res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
      })
      .json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
  } catch (error) {
    return handleErrorResponse(error, res);
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password }: User = req.body;

  try {
    const user = await getUserByEmail(email);

    if (!user) throw new AuthError("Credenciales inválidas");

    const validPassword = await validatePassword(password, user.password);

    if (!validPassword) throw new AuthError("Credenciales inválidas");

    const token = createToken(user);

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        domain: process.env.WEB_APP_ORIGIN,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      })
      .json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
  } catch (error) {
    return handleErrorResponse(error, res);
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    res.clearCookie("token");

    return res.status(200).json({ user: undefined });
  } catch (error) {
    return handleErrorResponse(error, res);
  }
};

export const check = (req: Request, res: Response) => {
  const token: string = req.cookies.token;

  if (!token) return res.status(200).json({ user: undefined });

  try {
    const { user } = jwt.decode(token) as Token;
    if (!user) return res.status(200).json({ user: undefined });

    return res.status(200).json({ user });
  } catch (error) {
    return handleErrorResponse(error, res);
  }
};
