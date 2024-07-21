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

type ErrorInfo = {
  status: number;
  code: string;
  details: string;
};

type Status = "active" | "inactive";
