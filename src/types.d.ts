import type { Request } from "express";
import { UserResponse } from "./models/users";

type CustomRequest = Request & {
  user: UserResponse;
};

type Token = {
  user: UserResponse;
  iat: number;
  exp: number;
};

type TokenVerification = {
  error?: string;
  token?: Token;
};
