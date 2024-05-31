import { Request, Response } from "express";
import { hashPassword, validatePassword } from "../utils/crypto";
import { createToken } from "../utils/tokens";
import { createUser, getUserByEmail } from "../helpers/auth.helpers";
import { handleErrorResponse, AuthError } from "../utils/errors";
import { NewUser, User } from "../models/users";

export const signup = async (req: Request, res: Response) => {
  const { name, email, password }: NewUser = req.body;

  try {
    const foundUser = await getUserByEmail(email);

    if (foundUser) throw new AuthError("User already signed up");

    const hashedPassword = await hashPassword(password);

    const user = await createUser({ name, email, password: hashedPassword });

    const token = createToken({ uid: user.id });

    return res.status(201).cookie("token", token, {
      httpOnly: true,
    }).json({
      id: user.id,
      name: user.name,
      email: user.email
    });
  } catch (error) {
    return handleErrorResponse(error, res);
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password }: User = req.body;

  try {
    const user = await getUserByEmail(email);

    if (!user) throw new AuthError("Invalid credentials");

    const validPassword = await validatePassword(password, user.password);

    if (!validPassword) throw new AuthError("Invalid credentials");

    const token = createToken({ uid: user.id });

    res.cookie("token", token, {
      httpOnly: true,
    });

    return res.status(200).cookie("token", token, {
      httpOnly: true,
    }).json({
      id: user.id,
      name: user.name,
      email: user.email
    });
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
