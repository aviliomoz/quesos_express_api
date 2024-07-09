import type { Request } from "express";
import type { UserResponse } from "./models/users";

type CustomRequest = Request & {
  user: UserResponse;
};

type Token = {
  user: UserResponse;
  iat: number;
  exp: number;
};

type TokenVerification = {
  error: string | null;
  token: Token | null;
};

type ErrorResponse = {
  status: number;
  code: string;
  details: string;
};
