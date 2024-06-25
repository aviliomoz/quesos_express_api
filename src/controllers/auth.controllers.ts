import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { hashPassword, validatePassword } from "../utils/crypto";
import { createToken } from "../utils/tokens";
import { createUser, getUserByEmail } from "../helpers/auth.helpers";
import { handleErrorResponse, AuthError } from "../utils/errors";
import { NewUsuario, Usuario } from "../models/usuarios";
import { Token } from "../types";

export const signup = async (req: Request, res: Response) => {
  const { nombre, email, password }: NewUsuario = req.body;

  try {
    const foundUser = await getUserByEmail(email);

    if (foundUser)
      throw new AuthError("El correo ingresado ya se encuentra registrado");

    const hashedPassword = await hashPassword(password);

    const usuario = await createUser({ nombre, email, password: hashedPassword });

    const token = createToken(usuario);

    return res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
      })
      .json({
        usuario: {
          id: usuario.id,
          nombre: usuario.nombre,
          email: usuario.email,
        },
      });
  } catch (error) {
    return handleErrorResponse(error, res);
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password }: Usuario = req.body;

  try {
    const usuario = await getUserByEmail(email);

    if (!usuario) throw new AuthError("Credenciales inválidas");

    const validPassword = await validatePassword(password, usuario.password);

    if (!validPassword) throw new AuthError("Credenciales inválidas");

    const token = createToken(usuario);

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
      })
      .json({
        usuario: {
          id: usuario.id,
          nombre: usuario.nombre,
          email: usuario.email,
        },
      });
  } catch (error) {
    return handleErrorResponse(error, res);
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    res.clearCookie("token");

    return res.status(200).json({ usuario: undefined });
  } catch (error) {
    return handleErrorResponse(error, res);
  }
};

export const check = (req: Request, res: Response) => {
  const token: string = req.cookies.token;

  if (!token) return res.status(200).json({ usuario: undefined });

  try {
    const { usuario } = jwt.decode(token) as Token;
    if (!usuario) return res.status(200).json({ usuario: undefined });

    return res.status(200).json({ usuario });
  } catch (error) {
    return handleErrorResponse(error, res);
  }
};
