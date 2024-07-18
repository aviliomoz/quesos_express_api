import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { hashPassword, validatePassword } from "../utils/crypto";
import { createToken } from "../utils/tokens";
import { createUser, getUserByEmail } from "../helpers/auth.helpers";
import { AuthError } from "../utils/errors";
import { NewUser, User } from "../models/users";
import { Token } from "../types";
import { sendErrorResponse, sendSuccessResponse } from "../utils/responses";

export const signup = async (req: Request, res: Response) => {
  const { name, email, password }: NewUser = req.body;

  try {
    const foundUser = await getUserByEmail(email);

    if (foundUser)
      throw new AuthError("El correo ingresado ya se encuentra registrado");

    const hashedPassword = await hashPassword(password);

    const user = await createUser({ name, email, password: hashedPassword });

    const token = createToken(user);

    res.cookie("token", token, {
      httpOnly: true,
    });

    return sendSuccessResponse(res, 201, "Usuario registrado correctamente", {
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    return sendErrorResponse(res, error, "Error al registrar usuario");
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

    res.cookie("token", token, {
      httpOnly: true,
    });

    return sendSuccessResponse(res, 200, "Inicio de sesión exitoso", {
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    return sendErrorResponse(res, error, "Error al iniciar sesión");
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    res.clearCookie("token");
    return sendSuccessResponse(res, 200, "Se ha cerrado la sesión", null);
  } catch (error) {
    return sendErrorResponse(res, error, "Error al cerrar sesión");
  }
};

export const check = (req: Request, res: Response) => {
  const token = req.cookies.token as string;

  try {
    if (!token) throw new AuthError("Token no encontrado");

    const { user } = jwt.decode(token) as Token;
    if (!user) throw new AuthError("Usuario no encontrado");

    return sendSuccessResponse(res, 200, "Sesión verificada", user);
  } catch (error) {
    return sendErrorResponse(res, error, "No se pudo verificar la sesión");
  }
};
