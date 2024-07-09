import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { hashPassword, validatePassword } from "../utils/crypto";
import { createToken } from "../utils/tokens";
import { createUser, getUserByEmail } from "../helpers/auth.helpers";
import { getErrorResponse, AuthError } from "../utils/errors";
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
        ok: true,
        message: "Usuario registrado correctamente",
        error: null,
        data: {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        },
      });
  } catch (error) {
    const { status, code, details } = getErrorResponse(error);

    return res.status(status).json({
      ok: false,
      message: "Error al registrar usuario",
      error: { code, details },
      data: null,
    });
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
      })
      .json({
        ok: true,
        message: "Inicio de sesión exitoso",
        error: null,
        data: {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        },
      });
  } catch (error) {
    const { status, code, details } = getErrorResponse(error);

    return res.status(status).json({
      ok: false,
      message: "Error al iniciar sesión",
      error: { code, details },
      data: null,
    });
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    res.clearCookie("token");

    return res.status(200).json({
      ok: true,
      message: "Se ha cerrado la sesión",
      error: null,
      data: null,
    });
  } catch (error) {
    const { status, code, details } = getErrorResponse(error);

    return res.status(status).json({
      ok: false,
      messages: ["Error al cerrar sesión"],
      error: { code, details },
      data: null,
    });
  }
};

export const check = (req: Request, res: Response) => {
  const token: string = req.cookies.token;

  if (!token) throw new AuthError("Token no encontrado");

  try {
    const { user } = jwt.decode(token) as Token;
    if (!user) throw new AuthError("Usuario no encontrado");

    return res.status(200).json({
      ok: true,
      message: "Sesión verificada",
      error: null,
      data: { user },
    });
  } catch (error) {
    const { status, code, details } = getErrorResponse(error);

    return res.status(status).json({
      ok: false,
      message: "No se pudo verificar la sesión",
      error: { code, details },
      data: null,
    });
  }
};
