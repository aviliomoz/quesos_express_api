import type { Request } from "express";
import { UsuarioResponse } from "./models/usuarios";
import { Restaurant } from "./models/restaurants";

type CustomRequest = Request & {
  usuario: UsuarioResponse;
};

type Token = {
  usuario: UsuarioResponse;
  iat: number;
  exp: number;
};

type TokenVerification = {
  error?: string;
  token?: Token;
};
