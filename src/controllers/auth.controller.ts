import { Request, Response } from "express";
import { User } from "@prisma/client";
import { hashPassword, validatePassword } from "../utils/crypto";
import { createToken } from "../utils/tokens";
import {
  createUserHelper,
  getUserByEmailHelper,
} from "../helpers/auth.helpers";
import { handleErrorResponse, AuthError } from "../utils/errors";

export const signup = async (req: Request, res: Response) => {
  const { name, email, password }: User = req.body;

  try {
    const foundUser = await getUserByEmailHelper(email);

    if (foundUser) throw new AuthError("User already signed up");

    const hashedPassword = await hashPassword(password);

    const user = await createUserHelper({
      email,
      password: hashedPassword,
      name,
    });

    const token = createToken({ uid: user.id });

    res.cookie("token", token, {
      httpOnly: true,
    });

    return res.status(201).json({
      message: "User created",
    });
  } catch (error) {
    return handleErrorResponse(error, res);
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password }: User = req.body;

  try {
    const user = await getUserByEmailHelper(email);

    if (!user) throw new AuthError("Invalid credentials");

    const validPassword = await validatePassword(password, user.password);

    if (!validPassword) throw new AuthError("Invalid credentials");

    const token = createToken({ uid: user.id });

    res.cookie("token", token, {
      httpOnly: true,
    });

    return res.status(200).json({ message: "User logged" });
  } catch (error) {
    return handleErrorResponse(error, res);
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    res.clearCookie("token");

    return res.status(200).json({ message: "User logged out" });
  } catch (error) {
    return handleErrorResponse(error, res);
  }
};
