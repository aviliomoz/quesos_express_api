import { Request, Response } from "express";
import { prisma } from "../libs/prisma";
import { User } from "@prisma/client";
import { hashPassword, validatePassword } from "../utils/crypto";
import {
  TokenError,
  createAccessToken,
  createRefreshToken,
} from "../utils/tokens";

class AuthError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export const signup = async (req: Request, res: Response) => {
  const { name, email, password }: User = req.body;

  try {
    const foundUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (foundUser) throw new AuthError("User already signed up");

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    const access_token = createAccessToken({ uid: user.id });
    const refresh_token = createRefreshToken({ uid: user.id });

    res.cookie("access_token", access_token, {
      httpOnly: true,
    });

    res.cookie("refresh_token", refresh_token, {
      httpOnly: false,
    });

    return res.status(201).json({
      message: "User created",
    });
  } catch (error) {
    if (error instanceof TokenError) {
      return res.status(498).json({ error: error.message });
    } else if (error instanceof AuthError) {
      return res.status(406).json({ error: error.message });
    } else if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password }: User = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) throw new AuthError("Invalid credentials");

    const validPassword = await validatePassword(password, user.password);

    if (!validPassword) throw new AuthError("Invalid credentials");

    const access_token = createAccessToken({ uid: user.id });
    const refresh_token = createRefreshToken({ uid: user.id });

    res.cookie("access_token", access_token, {
      httpOnly: true,
    });

    res.cookie("refresh_token", refresh_token, {
      httpOnly: false,
    });

    return res.status(200).json({ message: "User logged" });
  } catch (error) {
    if (error instanceof TokenError) {
      return res.status(498).json({ error: error.message });
    } else if (error instanceof AuthError) {
      return res.status(406).json({ error: error.message });
    } else if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
};
