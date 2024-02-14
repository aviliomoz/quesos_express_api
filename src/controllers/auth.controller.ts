import { Request, Response } from "express";
import { prisma } from "../libs/prisma";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "";

export const signup = async (req: Request, res: Response) => {
  const { name, email, password }: User = req.body;

  const foundUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (foundUser)
    return res.json({
      message: "User already signed up",
    });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  const token = jwt.sign({ uid: user.id }, secret, {
    expiresIn: 60 * 60 * 24 * 7,
  });

  return res.json({
    message: "User created",
    token,
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password }: User = req.body;

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user)
    return res.json({
      message: "Invalid credentials",
    });

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword)
    return res.json({
      message: "Invalid credentials",
    });

  const token = jwt.sign({ uid: user.id }, secret, {
    expiresIn: 60 * 60 * 24 * 7,
  });

  return res.status(200).json({ message: "User logged", token });
};

export const refresh = async (req: Request, res: Response) => {
  const session = req.cookies.session;

  if (!session) return res.json({ message: "Token not found" });

  try {
    const decoded = jwt.verify(session, secret);

    const newToken = jwt.sign(decoded, secret, {
      // expiresIn: 60 * 60 * 24 * 7,
    });

    res.json({
      message: "Token refreshed",
      token: newToken,
    });
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Token expired" });
    } else if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Invalid token" });
    } else {
      console.error("Error refreshing token:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
};
